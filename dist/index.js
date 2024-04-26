"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//import indexRoutes from './routes/index.routes';
//import cosmeticoRoutes from './routes/cosmetico.routes';
const productosRoutes_1 = __importDefault(require("./src/routes/productosRoutes"));
const usuarioRoutes_1 = __importDefault(require("./src/routes/usuarioRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        // realizar la configuracion del puerto
        this.app.set("port", process.env.PORT || 3000);
        //Mostrar las peticiones en la terminal
        this.app.use((0, morgan_1.default)("dev"));
        //configurar el intercambio de recursos de origen
        this.app.use((0, cors_1.default)());
        //configurar la entrada de datos por medio de las peticiones (json)
        this.app.use(express_1.default.json());
        //Desabilitar la opcion de enviar de URL corruptas
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use("/");
        // this.app.use("/api/auth", authRoutes);
        //this.app.use("/api/usuario", usuarioRoutes);
        //this.app.use("/api/profesor", registroprofesorRoutes);
        this.app.use("/api/usuario"), usuarioRoutes_1.default;
        this.app.use("/api/productos", productosRoutes_1.default);
        //this.app.use("/api/cosmetico",cosmeticoRoutes);
    }
    start() {
        //Agregar un listener con un callback para ejecutar el servicio
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server on port ${this.app.get("port")} `);
        });
    }
    ;
}
const server = new Server();
server.start();
//# sourceMappingURL=index.js.map