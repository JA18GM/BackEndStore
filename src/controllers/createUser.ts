import { Request, Response } from 'express';
import usuarioModel from '../models/usuarioModel';

// Controlador para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { email, password, role } = req.body;

        // Verifica si el usuario ya existe en la base de datos
        const existingUser = await usuarioModel.findOne(email);

        // Si el usuario ya existe, devuelve un mensaje de error
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Crea un nuevo usuario con los datos proporcionados
        const newUser = { email, password, role };

        // Guarda el nuevo usuario en la base de datos
        await usuarioModel.add(newUser);

        // Devuelve una respuesta de éxito
        return res.status(201).json({ message: "Usuario creado correctamente", user: newUser });
    } catch (error) {
        // Si ocurre algún error, devuelve un mensaje de error
        console.error("Error al crear el usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
