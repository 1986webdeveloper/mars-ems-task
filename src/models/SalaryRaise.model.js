const mongoose = require('mongoose');

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

const SalaryRaise = mongoose.model('SalaryRaise', salaryRaiseSchema);

module.exports = SalaryRaise;
