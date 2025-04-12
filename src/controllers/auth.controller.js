const userModel = require('../models/user.schema');
const addressModel = require('../models/user.address.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateInput = require("../utils/authValidator");
const { ACCESS_TOKEN_SECRET_KEY, REFERECE_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRY, ACCESS_TOKEN_EXPIRY } = require("../configuration/config");
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    const { name, familyName, email, password } = req.body;

    const nameValidation = validateInput("name", name + " " + familyName);
    if (!nameValidation.isValid) {
        return res.status(400).json({
            success: false,
            message: nameValidation.errors.name
        })
    }

    // Validate email
    const emailValidation = validateInput("email", email);
    if (!emailValidation.isValid) {
        return res.status(400).json({
            success: false,
            message: emailValidation.errors.email
        })
    }

    // Validate password
    const passwordValidation = validateInput("password", password);
    if (!passwordValidation.isValid) {
        return res.status(400).json({
            success: false,
            message: passwordValidation.errors.password
        })
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "User already exists"
        })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new userModel({
        name,
        familyName,
        fullName: name + " " + familyName,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ status: 201, message: 'User registered successfully' });
};


const loginUser = async (req, res) => {
    let { email, password } = req.body;

    if (!validateInput("email", email)) {
        res.status(400).json({
            success: false,
            message: "Invalid email"
        });
    }


    if (!validateInput("password", password)) {
        res.status(400).json({
            success: false,
            message: "Invalid password"
        })
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        res.status(400).json({
            success: false,
            message: "Password miss matched"
        })
    }
    let { name, familyName, fullName, email: userEmail, _id } = user;

    const payload = {
        name, familyName, fullName, email: userEmail, _id
    }

    // const token = jwt.sign(payload, REFERECE_TOKEN_SECRET_KEY, option);
    const referenceToken = generateToken(payload, REFERECE_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRY);
    const accessToken = generateToken(payload, ACCESS_TOKEN_SECRET_KEY, ACCESS_TOKEN_EXPIRY)

    res.cookie('token', referenceToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        success: true,
        accessToken,
        user: payload,
        message: 'User logged in successfully'
    });
}


const logoutUser = (req, res) => {
    res.clearCookie("token", {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "None",
    });
    res.status(200).send({
        status: 200,
        message: "Logged out successfully",
    });

}

const updateAddresses = async (req, res) => {
    const {
        userId,
        addressType,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        country,
    } = req.body;

    // Validate userId
    if (!userId) {
        // throw { status: 401, message: "Invalid userId" };
        res.status(401).json({
            success: false,
            message: "You are not authorized!. "
        })
    }

    // Fetch address details using the userId and addressType

    const addressDetails = await addressModel.findOne({ userId, addressType });
    if (!addressDetails) {
        // throw { status: 404, message: "Address details not found" };
        res.status(404).json({
            success: false, message: "Address details not found"
        })
    }

    // Perform validation for each field
    const validations = [
        { field: "address", value: addressLine1 },
        { field: "address", value: addressLine2 },
        { field: "address", value: city },
        { field: "address", value: state },
        { field: "address", value: zipCode },
        { field: "address", value: country }
    ];

    for (const { field, value } of validations) {
        const validation = validateInput(field, value);
        if (!validation.isValid) {
            throw { status: 400, message: validation.errors.name };
        }
    }

    // Update the address using the mongoose instance and save
    addressDetails.addressLine1 = addressLine1;
    addressDetails.addressLine2 = addressLine2;
    addressDetails.city = city;
    addressDetails.state = state;
    addressDetails.zipCode = zipCode;
    addressDetails.country = country;


    await addressDetails.save(); // Save the updated instance

    res.status(200).json({
        success: true,
        message: "Addresses updated successfully",
        details: addressDetails,
    });
};



const updateUserProfile = async (req, res, next) => {
    try {
        const { _id } = req.user
        await userModel.findOneAndUpdate(
            { _id }, { $set: req.body })
        res.status(200).send({
            status: 200,
            message: "User profile updated successfully",
        });
    } catch (error) {
        next(error);
    }
};


const generateReferenceToken = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({
            status: true,
            message: "Illigle hitting"
        });
    }

    const userDetails = await jwt.decode(token);

    if (!userDetails) {
        return res.status(401).send({
            status: true,
            message: "Your session is expired!. Please Login"
        })
    }

    const { iat, exp, ...rest } = userDetails;

    const accessToken = generateToken(rest, ACCESS_TOKEN_SECRET_KEY, ACCESS_TOKEN_EXPIRY);

    res.status(200).send({
        status: true,
        accessToken,
        user: userDetails,
        message: "Token generated success"
    })
}

const checksError = async (req, res) => {
    throw new Error("Heee");
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateAddresses,
    updateUserProfile,
    generateReferenceToken,
    checksError
};
