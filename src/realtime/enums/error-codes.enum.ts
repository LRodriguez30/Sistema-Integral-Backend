export enum ErrorCodes {
    // 401 = Unauthorized
    eC40110 = 'AUTH_NO_COOKIES',
    eC40120 = 'ACCESS_TOKEN_MISSING',
    eC40121 = 'ACCESS_TOKEN_INVALID',
    eC40122 = 'ACCESS_TOKEN_EXPIRED',
    eC40130 = 'SESSION_EXPIRED',

    // 404 = Not Found
    eC40410 = 'NO_USER_FOUND',
    eC40420 = 'SESSION_NOT_FOUND'
}