const userModel = require('../models/user.model');
const { validateUserInput } = require('../validation/user.validation');
const bcrypt = require('bcrypt');
const blacklistModel = require('../models/blackList.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        // validatin
        validateUserInput(req.body);

        // hashing
        const { email, fullname, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating
        const user = await userModel.create({ email, fullname, password: hashedPassword });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ token, user });
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }

}

module.exports.logoutUser = async (req, res, next) => {
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
}