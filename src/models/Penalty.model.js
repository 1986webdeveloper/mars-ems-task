const mongoose = require('mongoose');

const loanPenaltySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },

    unit: {
        type: String,
        enum: ['%', 'BAM'],
        default: '%',
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

const LoanPenalty = mongoose.model('LoanPenalty', loanPenaltySchema);

module.exports = LoanPenalty;
