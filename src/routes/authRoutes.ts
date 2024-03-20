//import {Router, RouterOptions} from 'express';
import express, { Router } from 'express';
import { authController } from '../controllers/authController';


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
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.config();
    }

    config() {
        this.router.post('/', authController.iniciarSesion);        
    };
    
}
const authRoutes = new AuthRoutes();
export default authRoutes.router