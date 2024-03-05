const cors = require("cors");
const bodyParser = require("body-parser");
const { employeeRoute } = require("./employee/employee.controller");
const { userRoute } = require("./user/user.controller");
const { loanRoute } = require("./loan/loan.controller");
module.exports.ApplicationRouting = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //routing
    app.use("/api/employee/", employeeRoute);
    app.use("/api/user/", userRoute);
    app.use("/api/loan/", loanRoute);
}