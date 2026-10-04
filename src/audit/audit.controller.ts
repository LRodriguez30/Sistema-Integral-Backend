import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {

  constructor(private readonly auditService: AuditService) {}

  // Obtener logs por entidad (posts, messages, users, etc.)
  @Get(':entity/:entity_id')
  async findByEntity(
    @Param('entity') entity: string,
    @Param('entity_id') entity_id: string
  ) {
    return await this.auditService.findByEntity(entity, entity_id);
  }

  // Filtrar por actor (quién hizo cambios)
  @Get('actor/:actor_id')
  async findByActor(@Param('actor_id') actor_id: string) {
    return await this.auditService.findByActor(actor_id);
  }

  // Query general
  @Get()
  async findAll(@Query() query: any) {
    return await this.auditService.findAll(query);
  }
}