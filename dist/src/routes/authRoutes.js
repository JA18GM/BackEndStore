"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import {Router, RouterOptions} from 'express';
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
/*class AuthRoutes{
    public router:Router;
    
    constructor(){

    }

    config(){
        this.router.get('/',(req, res)=>{res.send('Invocando autenticacion')})
    }
}
*/
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.config();
    }
    config() {
        this.router.post('/', authController_1.authController.iniciarSesion);
    }
    ;
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
//# sourceMappingURL=authRoutes.js.map