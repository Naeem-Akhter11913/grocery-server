const mode = process.env.DEVELOPMENT === 'development'


module.exports = {
    PORT : mode ? Number(process.env.PORT) || 8081 : null,
    MONGODB_URI : mode ? process.env.DATABASE_CONNECTION_STRING : null,
    ACCESS_TOKEN_SECRET_KEY : mode ? process.env.ACCESS_TOKEN_SECRET_KEY : null,
    ACCESS_TOKEN_EXPIRY : mode ? process.env.ACCESS_TOKEN_EXPIRY : null,
    REFERECE_TOKEN_SECRET_KEY : mode ? process.env.REFERECE_TOKEN_SECRET_KEY : null,
    REFRESH_TOKEN_EXPIRY : mode ? process.env.REFRESH_TOKEN_EXPIRY : null,
}