import { Request, Response, response } from 'express';
import EmployeeService from '../services/employeeServices';
import { Employee, EmployeeData } from '../interfaces/employeeInterface';
import { constants,error,validationError,NoEmployeeError,NoEmployeeWithIDError,InvalidBodyError } from '../assets/constants';

export default class EmployeeController {
    private empService: EmployeeService;
    constructor() {
        this.empService = new EmployeeService();
    }

    public addEmployees = async (req: Request, res: Response) => {        
        const isvalid = await this.empService.employeeValidator(req.body,constants.createBody);
        if (!isvalid) {
            try {
                const employeeData: EmployeeData = req.body;
                const employee = await this.empService.add(employeeData);
                return res.status(200).json(employee);
            }
            catch (err) {
                return res.status(400).json(constants.catchBlockError);
            }
        } else {
            return res.status(400).json({ "error": validationError(isvalid) });
        }
    }

    public getAllEmployees = (req: Request, res: Response) => {
        this.empService.get()
            .then((result) => {
                if (result.length >= 1) {
                    return res.status(200).send(result);
                } else {
                    return res.status(404).json(NoEmployeeError);
                }
            })
            .catch (()=>res.status(400).json(constants.catchBlockError))
    }

    public getEmployee = async (req: Request, res: Response) => {
        const employee: Employee = await this.empService.getById(Number(req.params.id));
        try {
            if (employee.id) {
                res.status(200).json(employee);
            } else {
                res.status(404).json(NoEmployeeError);
            }
        }
        catch (err) {
            res.status(400).json(constants.catchBlockError);
        }
    }

    public deleteEmployee = async(req: Request, res: Response) => {
        const employee: EmployeeData = await this.empService.delete(Number(req.params.id));
        try {
            if (employee) {
                res.status(200).json(employee);
            } else {
                res.status(404).json(NoEmployeeError);
            }
        } catch (error) {
            res.status(400).json(constants.catchBlockError);
        }
    }

    public updateEmployee = async(req: Request, res: Response) => {
        const valid = await this.empService.employeeValidator(req.body,"update");
        if (!valid) {
            try {
                const employeeData: EmployeeData = req.body;
                this.empService.update(Number(req.params.id), employeeData)
                .then((result) => {                        
                    if(result){
                        res.status(200).send(result);
                    }else{
                        return res.status(404).json(NoEmployeeWithIDError);
                    }
                });
            }
            catch (err) {
                return res.status(400).json(InvalidBodyError);
            }
        }
        else{
            return res.status(400).json({ "status": "Fail", "reason": validationError(valid)});
        }
    }

    public getSuperiors = async (req: Request, res: Response) => {
        try{
            const employeeSuperiors = await this.empService.superiors(Number(req.params.id));
            if(employeeSuperiors){
                res.status(200).json(employeeSuperiors);
            } else {
                res.status(404).json({ "status": "Fail", "reason": error(req.params.id,"Superior") });
            }            
        } catch (error) {
            res.status(400).json(constants.catchBlockError);
        }
    }

    public getSubordinates = async (req: Request, res: Response) => {
        try {
            const employeeSubordinates = await this.empService.subordinates(Number(req.params.id));            
            if(employeeSubordinates.length>0){
                res.status(200).json(employeeSubordinates);
            } else {
                res.status(404).json({ "status": "Fail", "reason": error(req.params.id,"Subordinate") });
            }            
        } catch (error) {
            res.status(400).json(constants.catchBlockError);
        }
    }

    public getEmployeesByLevel = async (req:Request,res:Response) => {
        try {
            let leveltype = req.query.type;
            if(leveltype){
                const employees:Employee[] = await this.empService.getlevel(leveltype.toString());
                if(employees.length>0){
                    res.status(200).json(employees);
                } else {
                    res.status(404).json({ "status": "Fail", "reason": `No Employee with ${req.query.type} type found` });
                }    
            }
        } catch (error) {
            res.status(400).json(constants.catchBlockError);
        }
    }
}