"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { productoController } from "../controllers/productoController";
const productosController_1 = require("../controllers/productosController");
class ProductoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/productos", productosController_1.productoController.list);
        this.router.post("/", productosController_1.productoController.add);
        this.router.put("/", productosController_1.productoController.update);
        this.router.delete("/", productosController_1.productoController.delete);
    }
}
const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
//# sourceMappingURL=productosRoutes.js.map