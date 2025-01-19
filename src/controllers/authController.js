const userModel = require('../models/userSchema');
const addressModel = require('../models/userAddressSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateInput = require("../utils/authValidator");
const { SECRET_KEY } = require("../configuration/config");

const registerUser = async (req, res) => {
    const { name, familyName, email, password } = req.body;

    const nameValidation = validateInput("name", name + " " + familyName);
    if (!nameValidation.isValid) {
        // throw { status: 400, message: nameValidation.errors.name };
        res.status(400).json({
            success: false,
            message: nameValidation.errors.name
        })
    }

    // Validate email
    const emailValidation = validateInput("email", email);
    if (!emailValidation.isValid) {
        // throw { status: 400, message: emailValidation.errors.email };
        res.status(400).json({
            success: false,
            message: emailValidation.errors.email
        })
    }

    // Validate password
    const passwordValidation = validateInput("password", password);
    if (!passwordValidation.isValid) {
        // throw { status: 400, message: passwordValidation.errors.password };
        res.status(400).json({
            success: false,
            message:passwordValidation.errors.password
        })
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        // throw { status: 409, message: "User already exists" };
        res.status(409).json({
            success: false,
            message:"User already exists"
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


const loginUser = async (req, res, next) => {
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
        res.status(401).json({
            success: false,
            message: "Password miss matched"
        })
    }
    let { name, familyName, fullName, email: userEmail, _id } = user;

    const payload = {
        name, familyName, fullName, email: userEmail, _id
    }
    const option = {
        expiresIn: '1h'
    }

    const token = jwt.sign(payload, SECRET_KEY, option);


    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        success: true,
        message: 'User logged in successfully'
    })
}


const logoutUser = (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
}


// const updateAddresses = async (req, res, next) => {

//     const {
//         userId,
//         addressType,
//         addressLine1,
//         addressLine2,
//         city,
//         state,
//         zipCode,
//         country,
//     } = req.body;

//     if (!userId) {
//         throw { status: 401, message: "Invalid userId" };
//     }

//     const addressDetails = await addressModel.findOne({ userId, addressType });
//     if (!addressDetails) {
//         throw { status: 404, message: "User not found" };
//     }

//     const address1Validation = validateInput("address", addressLine1);
//     if (!address1Validation.isValid) {
//         throw { status: 400, message: address1Validation.errors.name }; // Bad Request
//     }

//     const address2Validation = validateInput("address", addressLine2);

//     if (!address2Validation.isValid) {
//         throw { status: 400, message: address2Validation.errors.name }; // Bad Request
//     }

//     const cityValidation = validateInput("address", city);

//     if (!cityValidation.isValid) {
//         throw { status: 400, message: cityValidation.errors.name }; // Bad Request
//     }

//     const stateValidation = validateInput("address", state);
//     if (!stateValidation.isValid) {
//         throw { status: 400, message: stateValidation.errors.name }; // Bad Request
//     }

//     const zipCodeValidation = validateInput("address", zipCode);
//     if (!zipCodeValidation.isValid) {
//         throw { status: 400, message: zipCodeValidation.errors.name }; // Bad Request
//     }
//     const countryValidation = validateInput("address", country);
//     if (!countryValidation.isValid) {
//         throw new CustomError(countryValidation.errors.name, 400); // Bad Request
//     }

//     const newAddress = new addressModel({
//         userId,
//         addressType,
//         addressLine1,
//         addressLine2,
//         city,
//         state,
//         zipCode,
//         country
//     });
//     await newAddress.save();

//     const updatedDetails = await addressModel.findOneAndUpdate(
//         { _id: addressDetails._id },
//         { $set: addressCredentials },
//         { new: true }
//     );


//     res.status(200).json({
//         status: 200,
//         message: "Addresses updated successfully",
//         details
//     });
// }


const updateAddresses = async (req, res, next) => {
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

        // const profileDetails = await 

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

const checksError = async (req, res) => {
    throw new Error("Heee");
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateAddresses,
    updateUserProfile,
    checksError
};
