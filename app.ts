import express ,{Application} from 'express';
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/authRoutes";
import usuarioRoutes from "./src/routes/usuarioRoutes";
import productosRoutes from './src/routes/productosRoutes';

//import authRoutes from "./routes/authRoutes";
const app=express();


/*DotEnv*/
const dotenv = require('dotenv');
dotenv.config();
const port=process.env.PORT;

app.get('/',(req, res) => {
    res.send('Hola mundo bello')
});

app.listen(port,()=>{
    return console.log(`Express is listening at http://localhost:${port}`)
})

class Server{
    private app: Application;
     constructor(){
        this.app= express();
        this.config();
        this.routes();
        this.app.listen(this.app.get("port"), ()=>{
            console.log("Server on port", this.app.get("port"))
        })
     }

     config(): void {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use("/", authRoutes);
        this.app.use("/usuario", usuarioRoutes);
        this.app.use("/productos", productosRoutes);
    }

}
 const server = new Server();