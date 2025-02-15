const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../configuration/config");

const authorizedUser = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(!token){
            return res.status(401).send({
                status: false,
                message: 'Invalid token'
            });
        }
        const userDetails = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
        if(!userDetails){
            return res.status(403).send({
                status: false,
                message: 'token expired'
            })
        }
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