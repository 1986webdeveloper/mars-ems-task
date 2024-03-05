const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },

    installment: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    description: {
        type: String,
        default: 'N/A',
    },

    unit: {
        type: String,
        enum: ['BAM', '$'],
        default: 'BAM',
    },

    employeeJMBG: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Loan = mongoose.model('Loan', LoanSchema);

module.exports = Loan;
