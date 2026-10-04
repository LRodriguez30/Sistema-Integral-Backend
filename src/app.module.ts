import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { RefreshTokensModule } from './auth/refresh_tokens/refresh_tokens.module';
import { JwtAccessModule } from './auth/jwt/access/access.module';
import { RefreshModule } from './auth/jwt/refresh/refresh.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MessagesModule } from './messages/messages.module';
import { MongoDBModule } from './mongodb/mongodb.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { PersonasModule } from './personas/personas.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatalogoCuentasModule } from './contalab/catalogo_cuentas/catalogo_cuentas.module';
import { AsientosContablesModule } from './contalab/asientos_contables/asientos_contables.module';
import { DetallesAsientosContablesModule } from './contalab/detalles_asientos_contables/detalles_asientos_contables.module';
import { EmpleadosModule } from './contalab/empleados/empleados.module';
import { NominaModule } from './contalab/nomina/nomina.module';
import { DetalleNominaModule } from './contalab/detalle_nomina/detalle_nomina.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    RefreshTokensModule,
    JwtAccessModule,
    RefreshModule,
    SupabaseModule,
    MessagesModule,
    MongoDBModule,
    UsersModule,
    PrismaModule,
    RolesModule,
    PersonasModule,
    CatalogoCuentasModule,
    AsientosContablesModule,
    DetallesAsientosContablesModule,
    EmpleadosModule,
    NominaModule,
    DetalleNominaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly configService: ConfigService,
  ) {}
}