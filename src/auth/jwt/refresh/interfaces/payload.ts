/**
 * Metadatos del token:
 * - ID de usuario (subject)
 * - Versión del token (tokenVersion)
 * - Emisor del token (issuer)
 * - Fecha de creación (issued at)
 * - Expiración (Expiration)
 */
export interface RefreshTokenPayload {
    sub: string;
    tokenVersion: number;
    iat?: number;
    exp?: number;
}