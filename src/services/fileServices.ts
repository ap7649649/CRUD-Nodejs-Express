import fs from 'fs/promises';
import {Employee} from '../interfaces/employeeInterface';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()

export default class FileService {
    private jsonFile: string;
    constructor() {
        if(process.env.environment==="development"){
            this.jsonFile = path.join(process.cwd(), 'assets', 'employee.json');
        }
        else{
            this.jsonFile = path.join(process.cwd(), 'assets', 'employeeTest.json');
        }
    }
    public getData = async (): Promise<Employee[]> => {
        return await fs.readFile(this.jsonFile, "utf-8")
            .then((data) => { 
                    return JSON.parse(data.toString()) as Employee[];
                }
            ).catch(err=>{
                return []
                }
            );
    };

    public setData = async(inputData: Employee[]):Promise<Employee[]> => {
        return await fs.writeFile(this.jsonFile, JSON.stringify(inputData))
            .then(()=>{
                return inputData;
            });
    }
}