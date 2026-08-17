/**
 * Metadatos del token:
 * - ID de usuario (subject)
 * - Rol de usuario (role)
 * - Emisor del token (issuer)
 * - Fecha de creación (issued at)
 * - Expiración (Expiration)
 */
export interface AccessTokenPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}