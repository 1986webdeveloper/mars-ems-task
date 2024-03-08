const mongoose = require('mongoose');
const { MODEL_NAMES, USER_STATUS, CONFIRM_STATUS } = require('../global/constant');

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

    employee_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: MODEL_NAMES.Employee,
    },
    is_active: {
        type: Number,
        default: USER_STATUS.ACTIVE
    },
    is_confirm: {
        type: Number,
        default: CONFIRM_STATUS.PENDING
    },
    installments: [{
        amount: {
            type: Number,
            default: USER_STATUS.ACTIVE
        },
        date: {
            type: Date,
            required: true,
        },
        paid: {
            type: Number,
            enum: [0, 1],
        },
        paid_date: {
            type: Date,
        },
    }]
}, {
    timestamps: true,
});

const Loan = mongoose.model(MODEL_NAMES.Loan, LoanSchema);

module.exports = Loan;
