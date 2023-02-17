import { constants } from '../assets/constants';
import { Employee, EmployeeData, Emplevels } from '../interfaces/employeeInterface';
import FileService from './fileServices';

export default class employeeData {
    private fService: FileService;
    constructor() {
        this.fService = new FileService();
    }
    public get = (): Promise<Employee[]> => {
        return this.fService.getData()
            .then((result) => {
                result.filter(element => {
                    if (element !== null) {
                        if (element.manager === "na") {
                            Object.defineProperty(element, 'manager', { enumerable: false })
                        }
                    }
                })
                return result.filter(data => data !== null)
            })
            .catch((err) => { return err });
    }
    public getById = (uid: number): Promise<Employee> => {
        return this.fService.getData()
            .then(data => {
                const employee = data.find(item => item.id === uid);
                if (employee) {
                    if (employee.manager === "na") {
                        Object.defineProperty(employee, 'manager', { enumerable: false })
                    }
                    return employee;
                } else {
                    return new Error;
                }
            })
            .catch((err) => { return err })
    }
    public add = (data: EmployeeData): Promise<EmployeeData> => {
        return this.fService.getData()
            .then((result) => {
                const id: number = new Date().valueOf();
                const newEmployee: Employee = { id, ...data };
                result.push(newEmployee);
                this.fService.setData(result);
                return newEmployee;
            })
            .catch(err => { return err });
    }
    public delete = (empid: number): Promise<Employee> => {
        return this.fService.getData()
            .then((result) => {
                const eleIndex: number = result.findIndex(item => item.id === empid);
                if (eleIndex >= 0) {
                    const deleteEmployee = result[eleIndex];
                    delete result[eleIndex];
                    this.fService.setData(result);
                    return deleteEmployee;
                } else {
                    return null;
                }
            })
            .catch((err) => { return err });
    }
    public update = (empid: number, data: EmployeeData): Promise<Employee> => {
        return this.fService.getData().then(result => {
            const index = result.findIndex((data) => data.id === empid);
            if (index > -1) {
                result[index] = { ...result[index], ...data };
                this.fService.setData(result);
                return result[index];
            }
            return result[index];
        })
    }
    public subordinates = (empid: number): Promise<Employee[]> => {
        return this.fService.getData()
            .then((result) => {
                return result.filter((data) => data.manager === empid.toString() && data.level !== Emplevels.manager)
            })
            .catch(err => { return err });
    }
    public superiors = (empid: number): Promise<Employee> => {
        return this.fService.getData()
            .then((result) => {
                const employee = result.find(user => user.id === empid);
                if (employee) {
                    return result.find((data) => data.id === Number(employee.manager) && data.level !== employee.level)
                } else {
                    return null;
                }
            })
            .catch(err => { return err });
    }
    public employeeValidator = async (employeeBody: EmployeeData, flag: string): Promise<string> => {
        if (flag === constants.createBody) {
            if (!employeeBody.firstName || !employeeBody.lastName || !employeeBody.email || !employeeBody.contact || !employeeBody.dob || !employeeBody.doj || !employeeBody.level) {
                return constants.insufficientParametersError;
            }
        }
        if (employeeBody.firstName && !constants.nameRegex.test(employeeBody.firstName) || employeeBody.firstName == "") {
            return constants.invalidFirstNameError;
        }
        if (employeeBody.lastName && !constants.nameRegex.test(employeeBody.lastName) || employeeBody.lastName == "") {
            return constants.invalidLastNameError;
        }
        if (employeeBody.email && !constants.emailRegex.test(employeeBody.email) || employeeBody.email == "") {
            return constants.invalidEmailError;
        }
        if (employeeBody.email) {
            const isDuplicate: boolean = (await Promise.resolve(this.fService.getData())).some((user) => user.email === employeeBody.email);
            if (isDuplicate) {
                return constants.duplicateEmailError;
            }
        }
        if (employeeBody.contact && !constants.contactRegex.test(employeeBody.contact) || employeeBody.contact == "") {
            return constants.invalidContactError;
        }
        if (employeeBody.dob && !constants.dateRegex.test(employeeBody.dob) || employeeBody.dob == "") {
            return constants.invalidDOBError;
        }
        if (employeeBody.doj && !constants.dateRegex.test(employeeBody.doj) || employeeBody.doj == "") {
            return constants.invalidDOJError;
        }
        if (employeeBody.level || employeeBody.level == "") {
            if ((!Object.values(Emplevels).includes(employeeBody.level))) {
                return constants.invalidLevelError;
            }
        }
        return constants.null;
    }
    public getlevel = (level: string): Promise<Employee[]> => {
        return this.fService.getData()
            .then((result) => {
                result.filter(element => {
                    if (element !== null) {
                        if (element.manager === "na") {
                            Object.defineProperty(element, 'manager', { enumerable: false })
                        }
                    }
                })
                return result.filter(data => data !== null && data.level.toLowerCase() === level.toLowerCase())
            })
            .catch((err) => { return err });
    }
}