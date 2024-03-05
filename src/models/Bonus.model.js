const mongoose = require('mongoose');
const { MODEL_NAMES } = require('../global/constant');

const BonusSchema = new mongoose.Schema({
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

const Bonus = mongoose.model(MODEL_NAMES.Bonus, BonusSchema);

module.exports = Bonus;
