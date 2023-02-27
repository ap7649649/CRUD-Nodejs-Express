"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class FileService {
    jsonFile;
    constructor() {
        if (process.env.environment === "development") {
            this.jsonFile = path_1.default.join(process.cwd(), 'src', 'assets', 'employee.json');
        }
        else {
            this.jsonFile = path_1.default.join(process.cwd(), 'src', 'assets', 'employeeTest.json');
        }
    }
    getData = async () => {
        return await promises_1.default.readFile(this.jsonFile)
            .then((data) => {
            return JSON.parse(data.toString());
        }).catch(err => {
            return [];
        });
    };
    setData = async (inputData) => {
        return await promises_1.default.writeFile(this.jsonFile, JSON.stringify(inputData)).catch((err) => {
            throw err;
        });
    };
}
exports.default = FileService;
