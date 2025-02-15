

const apiKeyMiddleware = async (req, res, next) => {
    const { apikey } = req.headers;

    if (!apikey || apikey !== process.env.PERSONAL_API_KEY) {
        return res.status(401).send({
            status: false,
            message: "Unauthorized user"
        });
    }

    next();
}

module.exports = apiKeyMiddleware;