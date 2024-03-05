const express = require('express')
const { EmploymentService } = require('./employee.service')
const { asyncHandler } = require('../../global/handler')
const route = express.Router()
//service
const service = new EmploymentService()

//#region  create employee  route
route.post('/create', asyncHandler(async (req, res) => {
    const data = await service.createNewEmploy(req.body)
    return res.status(data.statusCode).json(data)
}))
//#endregion

//#region  get sheet data route
route.get('/get', asyncHandler(async (req, res) => {
    const data = await service.getEmployeeList(req.query)
    return res.status(data.statusCode).json(data)
}))
//#endregion



module.exports.employeeRoute = route