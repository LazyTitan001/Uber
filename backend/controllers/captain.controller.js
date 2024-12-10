const captainModel = require("../models/captain.model");
const { validateCaptainInput } = require("../validation/captain.validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const error = validateCaptainInput(req.body);
        if (error) {
            const errorMessage = error.details ? error.details[0].message : error.message;
            return res.status(400).send(errorMessage);
        }

        const { email, fullname, password, vehicle } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const captain = await captainModel.create({
            email,
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            },
        });

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });

    } catch (error) {
        next(error);
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(404).send("Captain not found");
        }

        const isPasswordMatch = await bcrypt.compare(password, captain.password);
        if (!isPasswordMatch) {
            return res.status(401).send("Invalid password");
        }

        const token = captain.generateAuthToken();
        res.status(200).json({ token, captain });

    } catch (error) {
        next(error);
    }
};

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        captain = req.captain;
        res.status(200).json(captain);
    } catch (error) {
        next(error);
    }
};


module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (token) {
            await blacklistModel.create({ token });
            res.clearCookie('token');
        }
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

