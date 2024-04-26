import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

//import indexRoutes from './routes/index.routes';
//import cosmeticoRoutes from './routes/cosmetico.routes';
import productosRoutes from './src/routes/productosRoutes';
import usuarioRoutes from './src/routes/usuarioRoutes';
class Server{

    public app: Application = express();
    constructor () {
        this.config();
        this.routes();
    }


    private config(): void {
        // realizar la configuracion del puerto
        this.app.set("port",process.env.PORT || 3000);

        //Mostrar las peticiones en la terminal
        this.app.use(morgan("dev"));

        //configurar el intercambio de recursos de origen
        this.app.use(cors());

        //configurar la entrada de datos por medio de las peticiones (json)
        this.app.use(express.json());

        //Desabilitar la opcion de enviar de URL corruptas
        this.app.use(express.urlencoded({ extended : true }));
    }

    private routes(): void{
        this.app.use("/",);
       // this.app.use("/api/auth", authRoutes);
        //this.app.use("/api/usuario", usuarioRoutes);
        //this.app.use("/api/profesor", registroprofesorRoutes);
        this.app.use("/api/usuario"), usuarioRoutes
        this.app.use("/api/productos", productosRoutes);
        //this.app.use("/api/cosmetico",cosmeticoRoutes);
    }

    public start(): void{
        //Agregar un listener con un callback para ejecutar el servicio
        this.app.listen(this.app.get("port"), () => {
            console.log( `Server on port ${this.app.get("port")} `);
        });
    };

}
const server=new Server();
server.start();