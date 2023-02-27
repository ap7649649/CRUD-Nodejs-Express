import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import http from 'http';
import EmployeeRouter from './routes/employeeRoutes';
const PORT = process.env.PORT || 3000;

export default class MainServer{
    public initialize = async ():Promise<http.Server> =>{
        const app= express();
        app.use(express.json());
        const router = new EmployeeRouter();

        app.use('/employees',router.getRoutes());
        app.get('/',(req,res)=>{
            res.send('This is a Employee ERP System')
        });
        return app.listen(PORT,() => {
            console.log(`Server Running on PORT ${PORT}`)
        });
    }
}