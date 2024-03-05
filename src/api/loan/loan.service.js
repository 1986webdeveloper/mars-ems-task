const { parseDate, HTTP_STATUS_CODE } = require("../../global/constant")
const { requiredFields, successResponse } = require("../../global/handler")
const { SUCCESS } = require("../../global/string")
const Loan = require("../../models/Loan.model")



module.exports.LoanService = class {
    constructor() { }

    //#region create loan
    async createLoan(body) {
        requiredFields(body, { required: ['employee_id', "amount", 'installment', 'date', 'description', 'unit'] })
        body.date = parseDate(body.date)
        //create new loan
        const newLoan = await Loan(body).save()
        return successResponse(SUCCESS.loanCreate, HTTP_STATUS_CODE.create_success, newLoan)
    }
    //#endregion
}