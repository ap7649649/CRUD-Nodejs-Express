"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../assets/constants");
const employeeInterface_1 = require("../interfaces/employeeInterface");
const fileServices_1 = __importDefault(require("./fileServices"));
class employeeData {
    fService;
    constructor() {
        this.fService = new fileServices_1.default();
    }
    get = () => {
        return this.fService.getData()
            .then((result) => {
            result.filter(element => {
                if (element !== null) {
                    if (element.manager === "na") {
                        Object.defineProperty(element, 'manager', { enumerable: false });
                    }
                }
            });
            return result.filter(data => data !== null);
        })
            .catch((err) => { return err; });
    };
    getById = (uid) => {
        return this.fService.getData()
            .then(data => {
            const employee = data.find(item => item !== null && item.id === uid);
            if (employee) {
                if (employee.manager === "na") {
                    Object.defineProperty(employee, 'manager', { enumerable: false });
                }
                return employee;
            }
            else {
                return new Error;
            }
        })
            .catch((err) => { return err; });
    };
    add = (data) => {
        return this.fService.getData()
            .then((result) => {
            const id = new Date().valueOf();
            const newEmployee = { id, ...data };
            result.push(newEmployee);
            this.fService.setData(result);
            return newEmployee;
        })
            .catch(err => { return err; });
    };
    delete = (empid) => {
        return this.fService.getData()
            .then((result) => {
            const eleIndex = result.findIndex(item => item !== null && item.id === empid);
            if (eleIndex >= 0) {
                const deleteEmployee = result[eleIndex];
                delete result[eleIndex];
                this.fService.setData(result);
                return deleteEmployee;
            }
            else {
                return null;
            }
        })
            .catch((err) => { return err; });
    };
    update = (empid, data) => {
        return this.fService.getData().then(result => {
            const index = result.findIndex((data) => data !== null && data.id === empid);
            if (index > -1) {
                result[index] = { ...result[index], ...data };
                this.fService.setData(result);
                return result[index];
            }
            return result[index];
        });
    };
    subordinates = async (empid) => {
        const result = [];
        const employees = await this.fService.getData();
        const addSubordinates = (id) => {
            const subordinates = employees.filter((employee) => employee !== null && employee.manager === id.toString() && employee.level !== employeeInterface_1.Emplevels.manager);
            subordinates.forEach((user) => {
                result.push(user);
                addSubordinates(user.id);
            });
        };
        addSubordinates(empid);
        return result;
    };
    superiors = async (empid) => {
        const result = [];
        try {
            const employees = await this.fService.getData();
            const addSuperiors = (id) => {
                const employee = employees.find((employee) => employee !== null && employee.id === id);
                if (employee.manager !== 'na') {
                    const superior = employees.find((user) => {
                        if (user !== null) {
                            return user.id === Number(employee.manager) && user.level !== employee.level;
                        }
                    });
                    if (superior) {
                        result.push(superior);
                        addSuperiors(superior.id);
                    }
                }
            };
            addSuperiors(empid);
            return result;
        }
        catch (error) {
            throw error;
        }
    };
    getlevel = (level) => {
        return this.fService.getData()
            .then((result) => {
            result.filter(element => {
                if (element !== null) {
                    if (element.manager === "na") {
                        Object.defineProperty(element, 'manager', { enumerable: false });
                    }
                }
            });
            return result.filter(data => data !== null && data.level.toLowerCase() === level.toLowerCase());
        })
            .catch((err) => { return err; });
    };
    employeeValidator = async (employeeBody, flag) => {
        if (flag === constants_1.constants.createBody) {
            if (!employeeBody.firstName || !employeeBody.lastName || !employeeBody.email || !employeeBody.contact || !employeeBody.dob || !employeeBody.doj || !employeeBody.level) {
                return constants_1.constants.insufficientParametersError;
            }
        }
        if (employeeBody.firstName && !constants_1.constants.nameRegex.test(employeeBody.firstName) || employeeBody.firstName == "") {
            return constants_1.constants.invalidFirstNameError;
        }
        if (employeeBody.lastName && !constants_1.constants.nameRegex.test(employeeBody.lastName) || employeeBody.lastName == "") {
            return constants_1.constants.invalidLastNameError;
        }
        if (employeeBody.email && !constants_1.constants.emailRegex.test(employeeBody.email) || employeeBody.email == "") {
            return constants_1.constants.invalidEmailError;
        }
        if (employeeBody.email) {
            const isDuplicate = (await Promise.resolve(this.fService.getData())).some((user) => user !== null && user.email === employeeBody.email);
            if (isDuplicate) {
                return constants_1.constants.duplicateEmailError;
            }
        }
        if (employeeBody.contact && !constants_1.constants.contactRegex.test(employeeBody.contact) || employeeBody.contact == "") {
            return constants_1.constants.invalidContactError;
        }
        if (employeeBody.dob && !constants_1.constants.dateRegex.test(employeeBody.dob) || employeeBody.dob == "") {
            return constants_1.constants.invalidDOBError;
        }
        if (employeeBody.doj && !constants_1.constants.dateRegex.test(employeeBody.doj) || employeeBody.doj == "") {
            return constants_1.constants.invalidDOJError;
        }
        if (employeeBody.level || employeeBody.level == "") {
            if ((!Object.values(employeeInterface_1.Emplevels).includes(employeeBody.level))) {
                return constants_1.constants.invalidLevelError;
            }
        }
        return constants_1.constants.null;
    };
}
exports.default = employeeData;
