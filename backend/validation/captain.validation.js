const { z } = require('zod');

const captainSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    fullname: z.object({
        firstname: z.string().min(3, { message: 'First name must be at least 3 characters long' }),
        lastname: z.string().min(3, { message: 'Last name must be at least 3 characters long' })
    }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    socketId: z.string().optional(),
    status: z.enum(["active", "inactive"]).optional(),
    vehicle: z.object({
        color: z.string().min(1, { message: 'Color is required' }),
        plate: z.string().min(1, { message: 'Plate is required' }),
        capacity: z.number().min(1, { message: 'Capacity must be at least 1' }),
        vehicleType: z.enum(["car", "bike", "auto"], { message: 'Invalid vehicle type' }),
        location: z.object({
            lat: z.number().optional(),
            long: z.number().optional()
        }).optional()
    })
});

const validateCaptainInput = (data) => {
    captainSchema.parse(data);
};

module.exports = { validateCaptainInput };