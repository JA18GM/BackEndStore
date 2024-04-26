import pool from "../config/connection";

class UsuarioModelo {
    static findOne: any;
    static add: any;
    
    constructor() {}

    public async findOne(email: string) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT email, password, role FROM tbl_usuario WHERE email = ?",
                [email]
            );
        });

        // Retorna el usuario encontrado o null si no existe
        return result[0][0] || null;
    }


    public async list() {
        const result = await pool.then(async (connection) => {
            return await connection.query("SELECT email, password, role FROM tbl_usuario");
        });
        return result;
    }
    public async add(usuario: any) {
        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await this.findOne(usuario.email);
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
        console.log("Update  " + update)
        const result = await pool.then(async (connection) => {
            return await connection.query(update)
        });
        return result;
    }

    public async delete(email: string) {
        // Verificar si el usuario existe
        const existingUser = await this.findOne(email);
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

}

export default UsuarioModelo;
