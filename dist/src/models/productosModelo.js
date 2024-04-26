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
// Importar Express y el modelo de productos
const express_1 = __importDefault(require("express"));
const productosModelo_1 = __importDefault(require("../models/productosModelo"));
// Crear una instancia de Express Router
const router = express_1.default.Router();
// Ruta para obtener todos los productos
router.get('/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield productosModelo_1.default.list();
        res.json(productos);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}));
// Ruta para agregar un nuevo producto
router.post('/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoProducto = req.body;
    try {
        const resultado = yield productosModelo_1.default.add(nuevoProducto);
        res.status(201).json(resultado);
    }
    catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ error: 'Error al agregar producto' });
    }
}));
// Ruta para actualizar un producto existente
router.put('/productos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProducto = req.params.id;
    const datosProducto = req.body;
    try {
        const resultado = yield productosModelo_1.default.update(idProducto, datosProducto);
        res.json(resultado);
    }
    catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
}));
// Ruta para eliminar un producto existente
router.delete('/productos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProducto = req.params.id;
    try {
        const resultado = yield productosModelo_1.default.delete(idProducto);
        res.json(resultado);
    }
    catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
}));
// Exportar el router para ser utilizado en otras partes de la aplicación
exports.default = router;
//# sourceMappingURL=productosModelo.js.map