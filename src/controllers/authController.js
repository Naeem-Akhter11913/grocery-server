const { registerUserService, loginUserService, updateCreateAddressesService } = require("../services/authService");
const userModel = require('../models/userSchema');

const registerUser = async (req, res, next) => {
    try {

        await registerUserService(req.body);

        return res.status(201).json({ status: 201, message: 'User registered successfully' });

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ staus: error.statusCode, message: error.message });
        }
        next(error);
    }
};


const loginUser = async (req, res, next) => {
    try {
        const token = await loginUserService(req.body)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            status: 200,
            message: 'User logged in successfully'
        })
    } catch (error) {
        next(error);
    }
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


const updateAddresses = async (req, res, next) => {

    try {
        const details = await updateCreateAddressesService(req.body);

        return res.status(200).json({
            status: 200,
            message: "Addresses updated successfully",
            details
        });
    } catch (error) {
        next(error);
    }
}


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



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateAddresses,
    updateUserProfile
};
