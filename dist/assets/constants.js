"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidBodyError = exports.NoEmployeeWithIDError = exports.NoEmployeeError = exports.validationError = exports.error = exports.constants = void 0;
exports.constants = {
    createBody: "create",
    insufficientParametersError: "Please Pass required attributes",
    invalidFirstNameError: "firstName is not valid",
    invalidLastNameError: "lastName is not valid",
    invalidEmailError: "email is not valid",
    duplicateEmailError: "email is Duplicated",
    invalidContactError: "contact is not valid",
    invalidDOBError: "dob is not valid",
    invalidDOJError: "doj is not valid",
    invalidLevelError: "level is not valid",
    null: "",
    nameRegex: /^[a-zA-Z]+$/,
    dateRegex: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    emailRegex: /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
    contactRegex: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
    catchBlockError: { "status": "fail", "reason": "Error" }
};
const error = (id, type) => `No ${type} for ${id} found`;
exports.error = error;
const validationError = (error) => `${error}`;
exports.validationError = validationError;
exports.NoEmployeeError = { "status": "Fail", "reason": "No employee Found" };
exports.NoEmployeeWithIDError = { "status": "Fail", "reason": "No Such Employee with given id present" };
exports.InvalidBodyError = { "status": "Fail", "reason": "Invalid Request Body" };
