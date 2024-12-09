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

        const { email, fullname, password, vehicle} = req.body;
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
