/* import { Request, Response } from "express";
import validator from "validator";
import { utils } from "../utils/utils";
import pool from "../config/connection";
//import model from "../models/usuarioModel";


class UsuarioController {


  public async list(req: Request, res: Response) {
    try {
      return res.json({ message: "Listado de Usuario", code: 0 });
    } catch (error: any) {
        return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async add(usuario: any) {
    // Valida los datos aquí...

    // Encripta el password si existe
    if (usuario.password) {
        usuario.password = await utils.hashPassword(usuario.password);
    }

    // Inserta el usuario en la base de datos
    const result = await pool.then(async (connection) => {
        return await connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
    });

    return result;
}


public async update(usuario: any) {
    // Valida los datos aquí...

    // Encripta el nuevo password si se proporciona
    if (usuario.password) {
        usuario.password = await utils.hashPassword(usuario.password);
    }

    // Actualiza el usuario en la base de datos
    const updateQuery = "UPDATE tbl_usuario SET password = ? WHERE id = ?";
    const result = await pool.then(async (connection) => {
        return await connection.query(updateQuery, [usuario.password, usuario.id]);
    });

    return result;
}


  public async delete(req: Request, res: Response) {
    try {
      return res.json({ message: "Eliminación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
  public async encryptPassword(usuario: any) {
    try {
      var encryptedText = await utils.hashPassword(usuario.password);
      usuario.password = encryptedText;
    } catch (error: any) {
      throw new Error(`Error al encriptar la contraseña: ${error.message}`);
    }
  }

  
  
}
export const usuarioController = new UsuarioController();

*/
import { Request, Response } from "express";
import validator from "validator";
import { utils } from "../utils/utils";
import pool from "../config/connection";
//import model from "../models/usuarioModel";

class UsuarioController {

  public async list(req: Request, res: Response) {
    try {
      const users = await pool.then(async (connection) => {
        return await connection.query("SELECT * FROM apliweb.tbl_usuario");
      });

      if (users.length === 0) {
        return res.status(404).json({ message: "No hay usuarios encontrados", code: 404 });
      }

      return res.json({ message: "Listado de usuarios", users, code: 200 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}`, code: 500 });
    }
  }


  /*public async add(req: Request, res: Response) {
    try {
      const usuario = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
      // Encripta el password si existe
      if (usuario.password) {
        usuario.password = await utils.hashPassword(usuario.password);
      }

      // Inserta el usuario en la base de datos
      console.log("Email " + usuario.email);
      console.log("Password " + usuario.password);
      console.log("Role " + usuario.role);
      const result = await pool.then(async (connection) => {
        return await connection.query("INSERT INTO tbl_usuario SET ? ", [
          usuario,
        ]);
      });

      return res.json({ message: "Agregado con exito" });
    } catch (error: any) {
      return res.status(500).json({ message: `{error.message}` });
    }
  }*/
  public async add(req: Request, res: Response) {
    try {
      const usuario = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };

      // Validar que no haya campos vacíos
      if (!usuario.email || !usuario.password || !usuario.role) {
        return res.status(400).json({ message: "Todos los campos son obligatorios", code: 400 });
      }

      // Encripta el password si existe
      if (usuario.password) {
        usuario.password = await utils.hashPassword(usuario.password);
      }

      // Inserta el usuario en la base de datos
      const result = await pool.then(async (connection) => {
        return await connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
      });

      return res.json({ message: "Usuario agregado con éxito", code: 200 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}`, code: 500 });
    }
  }

  /*public async update(usuario: any) {
    // Valida los datos aquí...

    // Encripta el nuevo password si se proporciona
    if (usuario.password) {
      usuario.password = await utils.hashPassword(usuario.password);
    }

    // Actualiza el usuario en la base de datos
    const updateQuery = "UPDATE tbl_usuario SET password = ? WHERE id = ?";
    const result = await pool.then(async (connection) => {
      return await connection.query(updateQuery, [
        usuario.password,
        usuario.id,
      ]);
    });

    return result;
  }*/ 
  
  
  /*public async update(req: Request, res: Response) {
    try {
      return res.json({ message: "Modificación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }*/public async update(req: Request, res: Response) {
    try {
      const usuario = {
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
      };

      console.log(usuario.email);

      // Verifica si el usuario existe
      const existingUser = await pool.then(async (connection) => {
          return await connection.query(
              "SELECT * FROM tbl_usuario WHERE email = ?",
              [usuario.email]
          );
      });

      console.log(existingUser);

      // Verifica si el usuario existe antes de actualizarlo
      if (existingUser && existingUser.length > 0) {
          // Actualiza el usuario en la base de datos
          const updateQuery = "UPDATE tbl_usuario SET email = ?, password = ?, role = ? WHERE email = ?";
          await pool.then(async (connection) => {
              await connection.query(updateQuery, [
                  usuario.email,
                  usuario.password,
                  usuario.role,
                  usuario.email // Utilizamos el campo 'email' para identificar al usuario en la actualización
              ]);
          });

          return res.json({ message: "Usuario actualizado con éxito", code: 0 });
      } else {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }
  } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
  }
}



public async delete(req: Request, res: Response) {
  try {
      const email = req.body.email; // Suponiendo que se proporciona el ID del usuario a eliminar
      const result = await pool.then(async (connection) => {
          return await connection.query(
              "DELETE FROM tbl_usuario where email= ?",
              [email]
          );
      });

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json({ message: "Usuario eliminado con éxito", code: 0 });
  } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
  }
  } 
  /*public async delete(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const result = await pool.then(async (connection) => {
        return await connection.query(
          "DELETE FROM tbl_usuario where email= ?",
          [email]
        );
      });

      return res.json({ message: "Eliminación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }*/
  public async encryptPassword(usuario: any) {
    try {
      var encryptedText = await utils.hashPassword(usuario.password);
      usuario.password = encryptedText;
    } catch (error: any) {
      throw new Error(`Error al encriptar la contraseña: ${error.message}`);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const lsUsers: any[] = []; // Supongamos que lsUsers es un arreglo de usuarios obtenido de alguna fuente
      const password: string = "password_del_usuario"; // Supongamos que password es la contraseña proporcionada por el usuario

      let result = utils.checkPassword(password, lsUsers[0].password);
      result.then((value) => {
        if (value) {
          return res.json({ message: "Autenticacion correcta", code: 0 });
        } else {
          return res.json({ message: "Password incorrecto", code: 1 });
        }
      });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
 }
export const usuarioController = new UsuarioController();
