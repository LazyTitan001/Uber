const { z } = require('zod');

const rideSchema = z.object({
    pickup: z.string().min(3, 'Invalid pickup address'),
    destination: z.string().min(3, 'Invalid destination address'),
    vehicleType: z.enum(['auto', 'car', 'moto'], 'Invalid vehicle type'),
});

const validateRide = (data) => {
    const result = rideSchema.safeParse(data);
    return {
        isEmpty: () => result.success,
        array: () => result.success ? [] : result.error.errors.map(err => ({ msg: err.message })),
    };
}

module.exports = { validateRide };