const { z } = require('zod');

const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    fullname: z.object({
        firstname: z.string().min(3, { message: 'First name must be at least 3 characters long' }),
        lastname: z.string().min(3, { message: 'Last name must be at least 3 characters long' }).optional()
    }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

const validateUserInput = (data) => {
    userSchema.parse(data);
};

module.exports = { validateUserInput };