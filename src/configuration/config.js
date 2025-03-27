const mode = process.env.DEVELOPMENT === 'development'


module.exports = {
    PORT : mode ? Number(process.env.PORT) || 8081 : Number(process.env.PORT),
    MONGODB_URI : mode ? process.env.DATABASE_CONNECTION_STRING : process.env.PRODUCTION_DATABASE_CONNECTION_STRING,
    ACCESS_TOKEN_SECRET_KEY : mode ? process.env.ACCESS_TOKEN_SECRET_KEY : process.env.PRODUCTION_ACCESS_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_EXPIRY : mode ? process.env.ACCESS_TOKEN_EXPIRY : process.env.PRODUCTION_ACCESS_TOKEN_EXPIRY,
    REFERECE_TOKEN_SECRET_KEY : mode ? process.env.REFERECE_TOKEN_SECRET_KEY : process.env.PRODUCTION_REFERECE_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_EXPIRY : mode ? process.env.REFRESH_TOKEN_EXPIRY : process.env.PRODUCTION_REFRESH_TOKEN_EXPIRY,
}