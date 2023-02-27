"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = __importDefault(require("../contollers/employeeController"));
const employeeController = new employeeController_1.default();
class EmployeeRouter {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.setRoutes();
    }
    getRoutes = () => {
        return this.router;
    };
    setRoutes = () => {
        this.router.get('/level', employeeController.getEmployeesByLevel);
        this.router.get('/', employeeController.getAllEmployees);
        this.router.get('/:id', employeeController.getEmployee);
        this.router.post('/', employeeController.addEmployees);
        this.router.put('/:id', employeeController.updateEmployee);
        this.router.delete('/:id', employeeController.deleteEmployee);
        this.router.get('/:id/superiors', employeeController.getSuperiors);
        this.router.get('/:id/subordinates', employeeController.getSubordinates);
    };
}
exports.default = EmployeeRouter;
