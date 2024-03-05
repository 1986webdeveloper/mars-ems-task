const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },

    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,

    },
    position: {
        type: String,
        default: 'N/A',
        required: true,
    },
    employeeJMBG: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    is_released: {
        type: Number,
        enum: [0, 1, 2],

        default: 0,
    },
    end_date: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = { Employee };
