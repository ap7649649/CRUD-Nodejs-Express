import {Router} from 'express';
import EmployeeController from '../contollers/employeeController';
const employeeController = new EmployeeController();

export default class EmployeeRouter{
    private router:Router;
    constructor(){
        this.router = Router();
        this.setRoutes();
    }
    public getRoutes = (): Router =>{
        return this.router;
    }
    private setRoutes = (): void =>{
        this.router.get('/level',employeeController.getEmployeesByLevel);
        this.router.get('/',employeeController.getAllEmployees);
        this.router.get('/:id',employeeController.getEmployee);
        this.router.post('/',employeeController.addEmployees);
        this.router.put('/:id',employeeController.updateEmployee);
        this.router.delete('/:id',employeeController.deleteEmployee);
        this.router.get('/:id/superiors',employeeController.getSuperiors);
        this.router.get('/:id/subordinates',employeeController.getSubordinates);
    }
}