const jsonwebtoken = require("jsonwebtoken");

const generateToken = (payload,secreteKey,expiresIn) =>{
    try {
        const token = jsonwebtoken.sign(payload,secreteKey,{expiresIn})
        return token
    } catch (error) {
        console.log("Error on generating token: ", error);
    }
}

module.exports = generateToken;