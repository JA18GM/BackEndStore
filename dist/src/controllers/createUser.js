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
exports.createUser = void 0;
const usuarioModel_1 = __importDefault(require("../models/usuarioModel"));
// Controlador para crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { email, password, role } = req.body;
        // Verifica si el usuario ya existe en la base de datos
        const existingUser = yield usuarioModel_1.default.findOne(email);
        // Si el usuario ya existe, devuelve un mensaje de error
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        // Crea un nuevo usuario con los datos proporcionados
        const newUser = { email, password, role };
        // Guarda el nuevo usuario en la base de datos
        yield usuarioModel_1.default.add(newUser);
        // Devuelve una respuesta de éxito
        return res.status(201).json({ message: "Usuario creado correctamente", user: newUser });
    }
    catch (error) {
        // Si ocurre algún error, devuelve un mensaje de error
        console.error("Error al crear el usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map