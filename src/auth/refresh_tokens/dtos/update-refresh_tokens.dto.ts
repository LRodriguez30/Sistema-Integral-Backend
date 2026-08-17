import { IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateRefreshTokensDTO {
  @IsOptional()
  @IsDateString()
  expires_at?: Date;

  @IsOptional()
  @IsDateString()
  last_activity_at?: Date;

  @IsOptional()
  @IsBoolean()
  revoked?: boolean;
}