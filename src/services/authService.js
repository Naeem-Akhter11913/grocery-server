
const userModel = require('../models/userSchema');
const addressModel = require('../models/userAddressSchema');
const bcrypt = require('bcryptjs');
const validateInput = require('../utils/authValidator');
const CustomError = require('../utils/customError');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configuration/config');

const registerUserService = async (userData) => {
    const { name, familyName, email, password } = userData;

    // Validate name
    const nameValidation = validateInput("name", name + " " + familyName);
    if (!nameValidation.isValid) {
        throw new CustomError(nameValidation.errors.name, 400); // Bad Request
    }

    // Validate email
    const emailValidation = validateInput("email", email);
    if (!emailValidation.isValid) {
        throw new CustomError(emailValidation.errors.email, 400); // Bad Request
    }

    // Validate password
    const passwordValidation = validateInput("password", password);
    if (!passwordValidation.isValid) {
        throw new CustomError(passwordValidation.errors.password, 400); // Bad Request
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new CustomError('User already exists', 409); // Conflict
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
};


const loginUserService = async (loginCredentials) => {
    let { email, password } = loginCredentials;

    if (!validateInput("email", email)) {
        throw new CustomError("Invalid email", 400);
    }


    if (!validateInput("password", password)) {
        throw new CustomError("Invalid password", 400);
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new CustomError("Invalid password", 401);
    }
    let { name, familyName, fullName, email: userEmail, _id } = user;

    const payload = {
        name, familyName, fullName, email: userEmail, _id
    }
    const option = {
        expiresIn: '1h'
    }

    const token = jwt.sign(payload, SECRET_KEY, option);

    return token;

}


const updateCreateAddressesService = async (addressCredentials) => {
    const {
        userId,
        addressType,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        country,
    } = addressCredentials;

    if (!userId) {
        throw new CustomError("Invalid userId", 401);
    }

    const addressDetails = await addressModel.findOne({userId, addressType });

    if (!addressDetails) {
        const address1Validation = validateInput("address", addressLine1);
        if (!address1Validation.isValid) {
            throw new CustomError(address1Validation.errors.name, 400); // Bad Request
        }

        const address2Validation = validateInput("address", addressLine2);

        if (!address2Validation.isValid) {
            throw new CustomError(address2Validation.errors.name, 400); // Bad Request
        }

        const cityValidation = validateInput("address", city);

        if (!cityValidation.isValid) {
            throw new CustomError(cityValidation.errors.name, 400); // Bad Request
        }

        const stateValidation = validateInput("address", state);
        if (!stateValidation.isValid) {
            throw new CustomError(stateValidation.errors.name, 400); // Bad Request
        }

        const zipCodeValidation = validateInput("address", zipCode);
        if (!zipCodeValidation.isValid) {
            throw new CustomError(zipCodeValidation.errors.name, 400); // Bad Request
        }
        const countryValidation = validateInput("address", country);
        if (!countryValidation.isValid) {
            throw new CustomError(countryValidation.errors.name, 400); // Bad Request
        }

        const newAddress = new addressModel({
            userId,
            addressType,
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            country
        });
        await newAddress.save();
        return newAddress;
    }

    const updatedDetails = await addressModel.findOneAndUpdate(
        { _id: addressDetails._id },
        { $set: addressCredentials },
        { new: true }
    );

    return updatedDetails;
};

module.exports = {
    registerUserService,
    loginUserService,
    updateCreateAddressesService,
};
