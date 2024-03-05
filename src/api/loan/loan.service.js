const { parseDate, HTTP_STATUS_CODE, USER_STATUS, MODEL_NAMES } = require("../../global/constant")
const { requiredFields, successResponse } = require("../../global/handler")
const { SUCCESS } = require("../../global/string")
const Loan = require("../../models/Loan.model")
const LoanPenalty = require("../../models/Penalty.model")



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

    //#region  get loan list
    async getLoanList(body) {
        const loanList = await Loan.aggregate([
            {
                $match: {
                    is_active: USER_STATUS.ACTIVE
                },
            },
            {
                $lookup: {
                    from: MODEL_NAMES.Employee,
                    localField: 'employee_id',
                    foreignField: '_id',
                    as: 'employeeData',
                    pipeline: [{
                        $project: {
                            first_name: 1,
                            last_name: 1
                        }
                    }]
                }
            },
            {
                $project: {
                    _id: 1,
                    employee_id: 1,
                    amount: 1,
                    installment: 1,
                    date: 1,
                    description: 1,
                    unit: 1,
                    employeeData: 1
                }
            }

        ])
        return successResponse(SUCCESS.loanList, HTTP_STATUS_CODE.success, loanList)
    }
    //#endregion

    //#region  delete loan
    async deleteLoan(body) {
        requiredFields(body, { required: ['loan_id'] })
        await Loan.updateOne({ _id: body.loan_id }, { is_active: USER_STATUS.DE_ACTIVE })
        return successResponse(SUCCESS.loanDeleted, HTTP_STATUS_CODE.create_success)
    }
    // region create penalty
    async createPenalties(penaltiesArray) { // Updated function name and parameter
        // Check if penaltiesArray is an array
        if (!Array.isArray(penaltiesArray)) {
            return errorResponse(ERROR.invalid_request, HTTP_STATUS_CODE.bad_request);
        }
    
        // Check if each penalty object in the array has required fields
        for (const penalty of penaltiesArray) {
            requiredFields(body, { required: ['employee_id', 'amount', 'unit', 'date', 'description'] });
            body.date = parseDate(penalty.date);
        }
        // Save each penalty in the array
        const newPenalties = await Promise.all(penaltiesArray.map(penalty => LoanPenalty(penalty).save()));
        return successResponse(SUCCESS.penalty, HTTP_STATUS_CODE.create_success, newPenalties);

    }
    //enndregion
}