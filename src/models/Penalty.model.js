const mongoose = require('mongoose');
const { MODEL_NAMES } = require('../global/constant');

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

const LoanPenalty = mongoose.model(MODEL_NAMES.LoanPenalty, loanPenaltySchema);

module.exports = LoanPenalty;
