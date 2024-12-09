const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "bike", "auto"]
        },
        location: {
            lat: {
                type: Number,
            },
            long: {
                type: Number,
            }
        }
    }

})
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, 'your_jwt_private_key');
    return token;
};

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;