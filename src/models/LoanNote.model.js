const mongoose = require('mongoose');

const loanNoteSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },

    description: {
        type: String,
        default: '',
    },

    employeeJMBG: {
        type: String,
        required: true,
    },


}, { timestamps: true });



const LoanNote = mongoose.model('LoanNote', loanNoteSchema);

module.exports = LoanNote;
