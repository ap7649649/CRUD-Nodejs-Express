"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employeeServices_1 = __importDefault(require("../services/employeeServices"));
const constants_1 = require("../assets/constants");
class EmployeeController {
    empService;
    constructor() {
        this.empService = new employeeServices_1.default();
    }
    addEmployees = async (req, res) => {
        const isvalid = await this.empService.employeeValidator(req.body, constants_1.constants.createBody);
        if (!isvalid) {
            try {
                const employeeData = req.body;
                const employee = await this.empService.add(employeeData);
                return res.status(200).json(employee);
            }
            catch (err) {
                return res.status(400).json(constants_1.constants.catchBlockError);
            }
        }
        else {
            return res.status(400).json({ "error": (0, constants_1.validationError)(isvalid) });
        }
    };
    getAllEmployees = (req, res) => {
        this.empService.get()
            .then((result) => {
            if (result.length >= 1) {
                return res.status(200).send(result);
            }
            else {
                return res.status(404).json(constants_1.NoEmployeeError);
            }
        })
            .catch(() => res.status(400).json(constants_1.constants.catchBlockError));
    };
    getEmployee = async (req, res) => {
        const employee = await this.empService.getById(Number(req.params.id));
        try {
            if (employee.id) {
                res.status(200).json(employee);
            }
            else {
                res.status(404).json(constants_1.NoEmployeeError);
            }
        }
        catch (err) {
            res.status(400).json(constants_1.constants.catchBlockError);
        }
    };
    deleteEmployee = async (req, res) => {
        const employee = await this.empService.delete(Number(req.params.id));
        try {
            if (employee) {
                res.status(200).json(employee);
            }
            else {
                res.status(404).json(constants_1.NoEmployeeError);
            }
        }
        catch (error) {
            res.status(400).json(constants_1.constants.catchBlockError);
        }
    };
    updateEmployee = async (req, res) => {
        const valid = await this.empService.employeeValidator(req.body, "update");
        if (!valid) {
            try {
                const employeeData = req.body;
                this.empService.update(Number(req.params.id), employeeData)
                    .then((result) => {
                    if (result) {
                        res.status(200).send(result);
                    }
                    else {
                        return res.status(404).json(constants_1.NoEmployeeWithIDError);
                    }
                });
            }
            catch (err) {
                return res.status(400).json(constants_1.InvalidBodyError);
            }
        }
        else {
            return res.status(400).json({ "status": "Fail", "reason": (0, constants_1.validationError)(valid) });
        }
    };
    getSuperiors = async (req, res) => {
        try {
            const employeeSuperiors = await this.empService.superiors(Number(req.params.id));
            if (employeeSuperiors) {
                res.status(200).json(employeeSuperiors);
            }
            else {
                res.status(404).json({ "status": "Fail", "reason": (0, constants_1.error)(req.params.id, "Superior") });
            }
        }
        catch (error) {
            res.status(400).json(constants_1.constants.catchBlockError);
        }
    };
    getSubordinates = async (req, res) => {
        try {
            const employeeSubordinates = await this.empService.subordinates(Number(req.params.id));
            if (employeeSubordinates.length > 0) {
                res.status(200).json(employeeSubordinates);
            }
            else {
                res.status(404).json({ "status": "Fail", "reason": (0, constants_1.error)(req.params.id, "Subordinate") });
            }
        }
        catch (error) {
            res.status(400).json(constants_1.constants.catchBlockError);
        }
    };
    getEmployeesByLevel = async (req, res) => {
        try {
            let leveltype = req.query.type;
            if (leveltype) {
                const employees = await this.empService.getlevel(leveltype.toString());
                if (employees.length > 0) {
                    res.status(200).json(employees);
                }
                else {
                    res.status(404).json({ "status": "Fail", "reason": `No Employee with ${req.query.type} type found` });
                }
            }
        }
        catch (error) {
            res.status(400).json(constants_1.constants.catchBlockError);
        }
    };
}
exports.default = EmployeeController;
