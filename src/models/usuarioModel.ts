//import pool from '../utils/connection';
import pool from "../config/connection";

class UsuarioModelo {


    public async list() {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " SELECT u.email, u.password, u.role "
                + " FROM tbl_usuario u ")  });
        return result;
    }


    public async add(usuario: any) {
        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await this.findUserByEmail(usuario.email);
        if (existingUser !== null) {
            // Si existe un usuario con el mismo correo electrónico, lanzar un error
            throw new Error("Ya existe un usuario con este correo electrónico.");
        } else {
            // Si no existe un usuario con el mismo correo electrónico, insertar el nuevo usuario
            const result = await pool.then(async (connection) => {
                return await connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
            });
    
            return result;
        }
    }
    


    public async update(usuario: any) {
       const update = "UPDATE tbl_usuario SET password='" + usuario.password +
            "' where email='" + usuario.email + "'";
        console.log("Update  "+ update)
        const result = await pool.then( async (connection) => {
            return await connection.query(update)              
        });
        return result;
    }


    public async delete(email: string) {
        // Verificar si el usuario existe
        const existingUser = await this.findUserByEmail(email);
        if (existingUser === null) {
            // Si el usuario no existe, lanzar un error
            throw new Error("El usuario no existe.");
        } else {
            // Si el usuario existe, proceder con la eliminación
            const result = await pool.then(async (connection) => {
                return await connection.query("DELETE FROM tbl_usuario WHERE email = ?", [email]);
            });
    
            return result;
        }
    }
    
    findUserByEmail(email: string) {
        throw new Error("Method not implemented.");
    }
    
}
const model = new UsuarioModelo();
export default model;
