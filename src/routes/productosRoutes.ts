import { Router } from "express";
//import { productoController } from "../controllers/productoController";
import { productoController } from "../controllers/productosController";

class ProductoRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get("/productos", productoController.list);
    this.router.post("/", productoController.add);
    this.router.put("/", productoController.update);
    this.router.delete("/", productoController.delete);
  }
}

const productoRoutes = new ProductoRoutes();
export default productoRoutes.router;
