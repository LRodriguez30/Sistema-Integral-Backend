import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleDestroy {
    constructor() {
        const adapter = new PrismaMssql({
            server: process.env.DB_HOST!,
            database: process.env.DB_NAME!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,

            options: {
                trustServerCertificate: true,
            },
        });

        super({ adapter });
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}