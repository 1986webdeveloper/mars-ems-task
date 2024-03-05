const mongoose = require('mongoose');
const { MODEL_NAMES } = require('../global/constant');

const salaryRaiseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    description: {
        type: String,
    },

    employeeJMBG: {
        type: String,
        required: true,
    },
});

const SalaryRaise = mongoose.model(MODEL_NAMES.SalaryRaise, salaryRaiseSchema);

module.exports = SalaryRaise;
