import { Request, Response } from "express";
import { utils } from "../utils/utils";
import pool from "../config/connection";

class ProductoController {
  public async list(req: Request, res: Response) {
    try {
      const productos = await pool.then(async (connection) => {
        return await connection.query("SELECT * FROM Productos");
      });

      if (productos.length === 0) {
        return res.status(404).json({ message: "No hay productos encontrados", code: 404 });
      }

      return res.json({ message: "Listado de productos", productos, code: 200 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}`, code: 500 });
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        color: req.body.color,
        tipo: req.body.tipo,
        imagen: req.body.imagen,
      };

      // Validar que no haya campos vacíos
      if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.color || !producto.tipo || !producto.imagen) {
        return res.status(400).json({ message: "Todos los campos son obligatorios", code: 400 });
      }

      // Insertar el producto en la base de datos
      const result = await pool.then(async (connection) => {
        return await connection.query("INSERT INTO Productos SET ?", [producto]);
      });

      return res.json({ message: "Producto agregado con éxito", code: 200 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}`, code: 500 });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const producto = {
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        color: req.body.color,
        tipo: req.body.tipo,
        imagen: req.body.imagen,
      };

      // Validar que no haya campos vacíos
      if (!producto.id || !producto.nombre || !producto.descripcion || !producto.precio || !producto.color || !producto.tipo || !producto.imagen) {
        return res.status(400).json({ message: "Todos los campos son obligatorios", code: 400 });
      }

      // Actualizar el producto en la base de datos
      const updateQuery = "UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, color = ?, tipo = ?, imagen = ? WHERE id = ?";
      await pool.then(async (connection) => {
        await connection.query(updateQuery, [producto.nombre, producto.descripcion, producto.precio, producto.color, producto.tipo, producto.imagen, producto.id]);
      });

      return res.json({ message: "Producto actualizado con éxito", code: 200 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}`, code: 500 });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = req.body.id; // Suponiendo que se proporciona el ID del producto a eliminar
      const result = await pool.then(async (connection) => {
        return await connection.query("DELETE FROM Productos WHERE id = ?", [id]);
      });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Producto no encontrado", code: 404 });
      }

      return res.json({ message: "Producto eliminado con éxito", code: 200 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}`, code: 500 });
    }
  }
}

export const productoController = new ProductoController();
