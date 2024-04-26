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
const connection_1 = __importDefault(require("../config/connection"));
class UsuarioModelo {
    constructor() { }
    findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("SELECT email, password, role FROM tbl_usuario WHERE email = ?", [email]);
            }));
            // Retorna el usuario encontrado o null si no existe
            return result[0][0] || null;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("SELECT email, password, role FROM tbl_usuario");
            }));
            return result;
        });
    }
    add(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si ya existe un usuario con el mismo correo electrónico
            const existingUser = yield this.findOne(usuario.email);
            if (existingUser !== null) {
                // Si existe un usuario con el mismo correo electrónico, lanzar un error
                throw new Error("Ya existe un usuario con este correo electrónico.");
            }
            else {
                // Si no existe un usuario con el mismo correo electrónico, insertar el nuevo usuario
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
                }));
                return result;
            }
        });
    }
    update(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = "UPDATE tbl_usuario SET password='" + usuario.password +
                "' where email='" + usuario.email + "'";
            console.log("Update  " + update);
            const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(update);
            }));
            return result;
        });
    }
    delete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si el usuario existe
            const existingUser = yield this.findOne(email);
            if (existingUser === null) {
                // Si el usuario no existe, lanzar un error
                throw new Error("El usuario no existe.");
            }
            else {
                // Si el usuario existe, proceder con la eliminación
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("DELETE FROM tbl_usuario WHERE email = ?", [email]);
                }));
                return result;
            }
        });
    }
}
exports.default = UsuarioModelo;
//# sourceMappingURL=usuarioModel.js.map