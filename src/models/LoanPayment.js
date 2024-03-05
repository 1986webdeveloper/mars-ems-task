const mongoose = require('mongoose');

const loanPaymentSchema = new mongoose.Schema({
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

const LoanPayment = mongoose.model('LoanPayment', loanPaymentSchema);

module.exports = LoanPayment;