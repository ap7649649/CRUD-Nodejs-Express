"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const PORT = process.env.PORT || 3000;
class MainServer {
    initialize = async () => {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        const router = new employeeRoutes_1.default();
        app.use('/employees', router.getRoutes());
        app.get('/', (req, res) => {
            res.send('This is a Employee ERP System');
        });
        return app.listen(PORT, () => {
            console.log(`Server Running on PORT ${PORT}`);
        });
    };
}
exports.default = MainServer;
