module.exports.HTTP_STATUS_CODE = {
    not_found: 404,
    found: 403,
    unauthorized: 401,
    bad_request: 400,
    success: 200,
    create_success: 201,
    internal_error: 500,
};
module.exports.parseDate = function (dateString) {
    const [day, month, year] = dateString.split(/[-\/]/).map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
}

module.exports.EMP_STATUS = {
    ACTIVE: 0,
    RELEASED: 1,
    FIRED: 2
}

module.exports.USER_STATUS = {
    ACTIVE: 1,
    DE_ACTIVE: 0
}