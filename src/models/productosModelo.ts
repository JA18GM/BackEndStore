// Importar Express y el modelo de productos
import express from 'express';
import productosModelo from '../models/productosModelo';

// Crear una instancia de Express Router
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await productosModelo.list();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Ruta para agregar un nuevo producto
router.post('/productos', async (req, res) => {
  const nuevoProducto = req.body;
  try {
    const resultado = await productosModelo.add(nuevoProducto);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Ruta para actualizar un producto existente
router.put('/productos/:id', async (req, res) => {
  const idProducto = req.params.id;
  const datosProducto = req.body;
  try {
    const resultado = await productosModelo.update(idProducto, datosProducto);
    res.json(resultado);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Ruta para eliminar un producto existente
router.delete('/productos/:id', async (req, res) => {
  const idProducto = req.params.id;
  try {
    const resultado = await productosModelo.delete(idProducto);
    res.json(resultado);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Exportar el router para ser utilizado en otras partes de la aplicación
export default router;
