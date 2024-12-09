const userModel = require('../db/userModel');
const { validateUserInput } = require('../schemas/user.schema');
const bcrypt = require('bcrypt');

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