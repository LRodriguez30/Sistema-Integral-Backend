import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit_log.schema';

@Injectable()
export class AuditService {
    constructor(
        @InjectModel(AuditLog.name)
        private readonly auditModel: Model<AuditLogDocument>
    ) {}

    async log(data: {
        entity: string;
        entity_id: string;
        operation: string;
        actor_id: string;
        before?: any;
        after?: any;
        context?: {
            source?: string;
            reason?: string;
        };
    }) {
        const diff = this.generateDiff(
            data.before ?? {},
            data.after ?? {}
        );

        return this.auditModel.create({
            entity: data.entity,
            entity_id: data.entity_id.toString(),
            operation: data.operation,
            actor_id: data.actor_id,
            timestamp: new Date(),
            context: data.context ?? {},
            changes: {
                before: data.before ?? null,
                after: data.after ?? null
            },
            diff
        });
    }

    private generateDiff(before: any, after: any) {
        const diff: Array<{
            field: string;
            old: any;
            new: any;
        }> = [];

        const keys = new Set([
            ...Object.keys(before || {}),
            ...Object.keys(after || {})
        ]);

        for (const key of keys) {
            const oldValue = before?.[key];
            const newValue = after?.[key];

            if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                diff.push({
                    field: key,
                    old: oldValue ?? null,
                    new: newValue ?? null
                });
            }
        }

        return diff;
    }

    async findByEntity(entity: string, entity_id: string) {
        return this.auditModel
            .find({ entity, entity_id })
            .sort({ timestamp: -1 })
            .lean();
    }

    async findByActor(actor_id: string) {
        return this.auditModel
            .find({ actor_id })
            .sort({ timestamp: -1 })
            .lean();
    }

    async findAll(query: any) {
        return this.auditModel
            .find(query)
            .sort({ timestamp: -1 })
            .lean();
    }
}