import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ collection: 'audit_logs' })
export class AuditLog {

    @Prop({ required: true })
    entity!: string;

    @Prop({ required: true })
    entity_id!: string;

    @Prop({ required: true })
    operation!: string;

    @Prop({ required: true })
    actor_id!: string;

    @Prop()
    timestamp!: Date;

    @Prop({
        type: {
            source: String,
            reason: String
        }
    })
    context!: {
        source?: string;
        reason?: string;
    };

    @Prop({
        type: {
            before: Object,
            after: Object
        }
    })
    changes!: {
        before: any;
        after: any;
    };

    @Prop([
        {
            field: String,
            old: Object,
            new: Object
        }
    ])
    diff!: any[];
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);