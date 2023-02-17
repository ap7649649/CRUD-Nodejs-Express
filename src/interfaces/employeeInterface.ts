export enum Emplevels{
    manager = "Manager",
    developer = "Developer",
    tester = "Tester",
    intern = "Intern"
}

export interface EmployeeData{
    firstName:string;
    lastName:string;
    email:string;
    contact:string;
    dob:string;
    doj:string;
    level:Emplevels;
    manager?:string;
}

export interface Employee extends EmployeeData{
    id:number;
}