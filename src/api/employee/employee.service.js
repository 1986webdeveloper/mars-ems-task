const {
  parseDate,
  HTTP_STATUS_CODE,
  EMP_STATUS,
  USER_STATUS
} = require("../../global/constant");
const {
  HttpError,
  requiredFields,
  successResponse,
} = require("../../global/handler");
const { Errors, SUCCESS } = require("../../global/string");
const { Employee } = require("../../models/Employ.model");

module.exports.EmploymentService = class {
  constructor() {}

  //#region  create new employee
  async createNewEmploy(body) {
    //check validation
    requiredFields(body, {
      required: [
        "first_name",
        "last_name",
        "gender",
        "position",
        "dob",
        "employeeJMBG",
      ],
    });
    body.dob = parseDate(body.dob);
    body.start_date = parseDate(body.start_date);
    body.employeeJMBG = body.employeeJMBG.toLowerCase();
    const checkEmp = await Employee.findOne({
      employeeJMBG: body.employeeJMBG,
    }).select(["_id"]);
    if (checkEmp)
      throw new HttpError(Errors.recordExists, HTTP_STATUS_CODE.bad_request);
    //create new employee
    const newEmp = await Employee(body).save();
    return successResponse(
      SUCCESS.empCreated,
      HTTP_STATUS_CODE.create_success,
      newEmp
    );
  }
  //#endregion

  //#region get employee list
  async getEmployeeList(body) {
    const list = await Employee.find({ is_released: EMP_STATUS.ACTIVE }).select(
      ["_id", "first_name", "last_name", "dob", "start_date", "position"]
    );

    return successResponse(SUCCESS.dataFetched, HTTP_STATUS_CODE.success, list);
  }
  //#endregion


  //#region get employee list for dropdown
  async getEmployeeListDropdown(body) {
    const list = await Employee.find({ is_released: EMP_STATUS.ACTIVE }).select(
      ["_id", "full_name"]
    );
    return successResponse(SUCCESS.dataFetched, HTTP_STATUS_CODE.success, list);
  }
  //#endregion

  // #region softdelete employee
  async deleteEmployee(body) {
    requiredFields(body,{
        required:["_id"]
    })
    await Employee.updateOne({_id:body._id},{ is_deleted: USER_STATUS.DE_ACTIVE })
    return successResponse(SUCCESS.empDeleted, HTTP_STATUS_CODE.success);
  }
  //#endregion
};
