"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const utils_1 = require("../utils/utils");
const connection_1 = __importDefault(require("../config/connection"));
//import model from "../models/usuarioModel";
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json({ message: "Listado de Usuario", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
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
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = {
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                };
                // Verifica si el correo electrónico ya está en uso
                const existingUser = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    const [rows] = yield connection.query("SELECT * FROM tbl_usuario WHERE email = ?", [usuario.email]);
                    return rows && rows.length > 0 ? rows[0] : null;
                }));
                if (existingUser) {
                    return res
                        .status(400)
                        .json({ message: "El correo electrónico ya está en uso" });
                }
                // Encripta el password si existe
                if (usuario.password) {
                    usuario.password = yield utils_1.utils.hashPassword(usuario.password);
                }
                // Inserta el usuario en la base de datos
                console.log("Email " + usuario.email);
                console.log("Password " + usuario.password);
                console.log("Role " + usuario.role);
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("INSERT INTO tbl_usuario SET ? ", [
                        usuario,
                    ]);
                }));
                return res.json({ message: "Agregado con éxito" });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
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
    }*/ update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = {
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                };
                // Verifica si el usuario existe
                const existingUser = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    const [rows] = yield connection.query("SELECT * FROM tbl_usuario WHERE email = ?", [usuario.email]);
                    return rows && rows.length > 0 ? rows[0] : null;
                }));
                if (!existingUser) {
                    return res.status(404).json({ message: "no pues no" });
                }
                //if (!existingUser) {
                //    return res.status(404).json({ message: "Usuario no encontrado" });
                //}
                // Actualiza el usuario en la base de datos
                const updateQuery = "UPDATE tbl_usuario SET email = ?, password = ?, role = ? WHERE email = ?";
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query(updateQuery, [
                        usuario.email,
                        usuario.password,
                        usuario.role,
                        usuario.email // Utilizamos el campo 'email' para identificar al usuario en la actualización
                    ]);
                }));
                return res.json({ message: "Usuario actualizado con éxito", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email; // Suponiendo que se proporciona el ID del usuario a eliminar
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("DELETE FROM tbl_usuario where email= ?", [email]);
                }));
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                return res.json({ message: "Usuario eliminado con éxito", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
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
    encryptPassword(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var encryptedText = yield utils_1.utils.hashPassword(usuario.password);
                usuario.password = encryptedText;
            }
            catch (error) {
                throw new Error(`Error al encriptar la contraseña: ${error.message}`);
            }
        });
    }
    // Aquí se agrega el código proporcionado
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lsUsers = []; // Supongamos que lsUsers es un arreglo de usuarios obtenido de alguna fuente
                const password = "password_del_usuario"; // Supongamos que password es la contraseña proporcionada por el usuario
                let result = utils_1.utils.checkPassword(password, lsUsers[0].password);
                result.then((value) => {
                    if (value) {
                        return res.json({ message: "Autenticacion correcta", code: 0 });
                    }
                    else {
                        return res.json({ message: "Password incorrecto", code: 1 });
                    }
                });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=usuarioController.js.map