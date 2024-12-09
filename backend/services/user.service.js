const userModel = require('../db/userModel');

module.exports.createUser = async (req, res, next) => {
    const { email, fullname, password } = req.body;
    try {
        const user = await userModel.create({ email, fullname, password });
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}