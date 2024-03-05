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

    employee_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:MODEL_NAMES.Employee,
    }
});

const LoanPenalty = mongoose.model(MODEL_NAMES.LoanPenalty, loanPenaltySchema);

module.exports = LoanPenalty;
