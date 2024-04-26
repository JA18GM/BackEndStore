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
exports.productoController = void 0;
const connection_1 = __importDefault(require("../config/connection"));
class ProductoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productos = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("SELECT * FROM Productos");
                }));
                if (productos.length === 0) {
                    return res.status(404).json({ message: "No hay productos encontrados", code: 404 });
                }
                return res.json({ message: "Listado de productos", productos, code: 200 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}`, code: 500 });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("INSERT INTO Productos SET ?", [producto]);
                }));
                return res.json({ message: "Producto agregado con éxito", code: 200 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}`, code: 500 });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(updateQuery, [producto.nombre, producto.descripcion, producto.precio, producto.color, producto.tipo, producto.imagen, producto.id]);
                }));
                return res.json({ message: "Producto actualizado con éxito", code: 200 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}`, code: 500 });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id; // Suponiendo que se proporciona el ID del producto a eliminar
                const result = yield connection_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                    return yield connection.query("DELETE FROM Productos WHERE id = ?", [id]);
                }));
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Producto no encontrado", code: 404 });
                }
                return res.json({ message: "Producto eliminado con éxito", code: 200 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}`, code: 500 });
            }
        });
    }
}
exports.productoController = new ProductoController();
//# sourceMappingURL=productosController.js.map