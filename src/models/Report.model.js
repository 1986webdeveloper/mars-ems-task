const mongoose = require('mongoose')
const { MODEL_NAMES } = require('../global/constant');

const ReportSchema = new mongoose.Schema({
    employees: [{
        type: mongoose.Types.ObjectId,
        ref: MODEL_NAMES.Employee
    }],
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }

})


const Report = mongoose.model(MODEL_NAMES.Report, ReportSchema)
module.exports = { Report }