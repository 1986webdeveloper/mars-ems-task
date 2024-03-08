const { parseDate, HTTP_STATUS_CODE, USER_STATUS, MODEL_NAMES, PAYMENT_STATUS } = require("../../global/constant")
const { requiredFields, successResponse, HttpError } = require("../../global/handler")
const { SUCCESS, Errors } = require("../../global/string")
const Bonus = require("../../models/Bonus.model")
const Loan = require("../../models/Loan.model")
const LoanPenalty = require("../../models/Penalty.model")



module.exports.LoanService = class {
    constructor() { }

    //#region create loan
    async createLoan(body) {
        requiredFields(body, {
            required: [
                "employee_id",
                "amount",
                "installment",
                "description",
                "unit",
            ],
        });

        // add installmensts array in loan
        body.date = new Date();
        body.amount = +(body?.amount ?? 0)
        body.installment = +(body?.installment ?? 0)
        const installmentsArray = this.generateInstallments(body.amount, body.installment);
        body.installments = installmentsArray;
        //create new loan
        const newLoan = await Loan(body).save();
        return successResponse(
            SUCCESS.loanCreate,
            HTTP_STATUS_CODE.create_success,
            newLoan
        );
    }
    //#endregion

    //#region  get loan list
    async getLoanList(body) {
        const loanList = await Loan.aggregate([
            {
                $match: {
                    is_active: USER_STATUS.ACTIVE,
                },
            },
            {
                $lookup: {
                    from: MODEL_NAMES.Employee,
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employeeData",
                    pipeline: [
                        {
                            $project: {
                                first_name: 1,
                                last_name: 1,
                            },
                        },
                    ],
                },
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
                    employeeData: 1,
                },
            },
        ]);
        return successResponse(
            SUCCESS.loanList,
            HTTP_STATUS_CODE.success,
            loanList
        );
    }
    //#endregion

    //region installments array
    generateInstallments(amount, installment) {
        const totalInstallments = Math.floor(amount / installment);
        const installmentsArray = [];
        // Start date from 1st April
        let currentDate = new Date();
        //set default date
        currentDate.setDate(1)
        for (let i = 0; i < totalInstallments; i++) {
            // start from next month
            try {
                currentDate.setMonth(currentDate.getMonth() + 1);
                const data = {
                    amount: installment,
                    date: new Date(currentDate),
                    paid: PAYMENT_STATUS.UN_PAID,
                    paid_date: null,
                };
                installmentsArray.push(data);
            } catch (error) { }
        }
        return installmentsArray;
    }
    //#endregion

    //#region  delete loan
    async deleteLoan(body) {
        requiredFields(body, { required: ['loan_id'] })
        await Loan.updateOne({ _id: body.loan_id }, { is_active: USER_STATUS.DE_ACTIVE })
        return successResponse(SUCCESS.loanDeleted, HTTP_STATUS_CODE.create_success)
    }
    // region create penalty
    async createPenalties(body) { // Updated function name and parameter
        // Check if payload is an array
        const payload = body?.payload ?? []
        requiredFields(body, { required: ['payload'] })
        // Check if each penalty object in the array has required fields
        for (const penalty of payload) {
            requiredFields(penalty, { required: ['employee_id', 'amount', 'unit', 'description'] });
            penalty.date = new Date()
        }
        await LoanPenalty.insertMany(payload)
        return successResponse(SUCCESS.penalty, HTTP_STATUS_CODE.create_success);
    }
    //#region  delete loan
    async deleteLoan(body) {
        requiredFields(body, { required: ["loan_id"] });
        await Loan.updateOne(
            { _id: body.loan_id },
            { is_active: USER_STATUS.DE_ACTIVE }
        );
        return successResponse(
            SUCCESS.loanDeleted,
            HTTP_STATUS_CODE.create_success
        );
    }
    //#endregion

    // region create bonus
    async createBonus(body) {
        // Check if payload is an array
        const payload = body?.payload ?? []
        requiredFields(body, { required: ['payload'] })
        // Check if each penalty object in the array has required fields
        for (const bonus of payload) {
            requiredFields(bonus, { required: ['employee_id', 'amount', 'unit', 'description'] });
            bonus.date = new Date()
        }
        await Bonus.insertMany(payload)
        return successResponse(SUCCESS.bonus, HTTP_STATUS_CODE.create_success);
    }

    //
};
//  throw new HttpError(ERROR.invalid_request, HTTP_STATUS_CODE.bad_request);