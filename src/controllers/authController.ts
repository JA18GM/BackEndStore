/*
import {Request, Response} from "express";
import validator from "validator";
import model from '../models/authModelo';
import { utils } from "../utils/utils";


//import {authController} from '../controllers/authController';

class AuthController {
    
   
    public async iniciarSesion(req: Request, res: Response) {
       
        try {
            const {email, password }= req.body;
     
            // verificar que los datos no esten vacios
            if (validator.isEmpty(email.trim()) ||
                validator.isEmpty(password.trim())) {
            return res
                .status(400)
                .json({ message: "Los campos son requeridos", code: 1 });

                
            }
            const lstUsers = await model.getuserByEmail(email);
            if (lstUsers.length <= 0) {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }

            console.log (lstUsers[0].username, lstUsers[0].password);


            return res.json({ message : "Autenticación correcta", code: 0 });
     
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }

        

        
    }



 
}


export const authController = new AuthController();
*/
import { Request, Response } from "express";
import validator from "validator";
import model from '../models/authModelo';
import { utils } from "../utils/utils";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
 
class AuthController {
   
    public async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            // Verificar que los datos no estén vacíos
            if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
                return res.status(400).json({ message: "Los campos son requeridos", code: 1 });
            }
    
            const lstUsers = await model.getuserByEmail(email);
            if (lstUsers.length <= 0) {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }
            
            const hashedPassword = lstUsers[0].password;
            const passwordMatches = await utils.checkPassword(password, hashedPassword);
            if (email) {
                const newUser = {
                    email: lstUsers[0].email,
                    password: lstUsers[0].password,
                    role: lstUsers[0].role
                };
                console.log(process.env.SECRET)
                const env = require('dotenv').config();
                const token = jwt.sign(newUser, process.env.SECRET, { expiresIn: '1h' });
                return res.json({ message: "Autenticación correcta", token, code: 0 });
            } else {
                return res.json({ message: "Contraseña incorrecta", code: 1 });
            }
        } catch (error: any) {
            return res.status(500).json({ message: '${error.message}' });
        }
    }
    
}
export const authController = new AuthController();