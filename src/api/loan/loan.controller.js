const express = require('express')
const { asyncHandler } = require('../../global/handler')
const { LoanService } = require('./loan.service')
const route = express.Router()

const loanService = new LoanService()
//#region create new loan
route.post('/create', asyncHandler(async (req, res) => {
    const data = await loanService.createLoan(req.body)
    return res.status(data.statusCode).json(data)
}))

module.exports.loanRoute = route