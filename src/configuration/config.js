const mode = process.env.DEVELOPMENT === 'development'


module.exports = {
    PORT : mode ? Number(process.env.PORT) || 8081 : null,
    MONGODB_URI : mode ? process.env.DATABASE_CONNECTION_STRING : null,
    SECRET_KEY : mode ? process.env.SECRET_KEY : null,
}