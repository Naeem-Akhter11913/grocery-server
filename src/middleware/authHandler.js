const jsonwebtoken = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../configuration/config");

const authorizedUser = async (req, res, next) => {

    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const userDetails = jsonwebtoken.verify(token, ACCESS_TOKEN_SECRET_KEY);
        req.userDetails = userDetails
        next();
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || error
        })
    }
}

module.exports = authorizedUser