"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const usuarioRoutes_1 = __importDefault(require("./src/routes/usuarioRoutes"));
const productosRoutes_1 = __importDefault(require("./src/routes/productosRoutes"));
//import authRoutes from "./routes/authRoutes";
const app = (0, express_1.default)();
/*DotEnv*/
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hola mundo bello');
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
    config() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/", authRoutes_1.default);
        this.app.use("/usuario", usuarioRoutes_1.default);
        this.app.use("/productos", productosRoutes_1.default);
    }
}
const server = new Server();
//# sourceMappingURL=app.js.map