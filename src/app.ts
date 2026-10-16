import express, {Application, Request, Response} from "express"; 
import carRoutes from './routes/cars';
import {CarController} from './controllers/cars';
import {log} from './middleware/logging.middleware'
import { authenticateKey, errorHandler } from "./middleware/auth.middleware";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express"
import cors from "cors";

//const PORT = env.port
export const app: Application = express(); 

const createCar = new CarController();

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(log);

app.get("/ping", async (_req : Request, res: Response) => { 
    res.json({ 
    message: "hello from Shauna"
    }); 

}); 

app.get("/pong", (_req : Request, res: Response) =>{
    console.log("Received request to /pong");
    throw new Error("Simulated error in /pong route");
});

app.get("/pung", (_req : Request, res: Response) => {
    console.log("Received request to /pung");
    throw new Error("Simulated error in /pung route");
});

app.get('/bananas', async (_req : Request, res: Response) => { 
    res.json({ 
    message: "this is bananas", 
}); 

}); 

app.get('/pineapples', async (_req : Request, res: Response) => { 
    res.json({ 
    message: "this is pineapples", 
}); 

}); 

app.get('/squirrels', async (_req : Request, res: Response) => { 
    res.json({ 
    message: "this is squirrels", 
}); 

}); 

app.get('/hellokitty', async (_req : Request, res: Response) => { 
    res.json({ 
    message: "this is Hello Kitty", 
}); 

}); 

app.get('/purple', async (_req : Request, res: Response) => { 
    res.json({ 
    message: "this is purple", 
}); 

}); 



app.use(express.json());

app.use(cors());

app.use('/api/v1/cars', carRoutes);

app.post('/', authenticateKey, log, createCar.createCar)


 

app.use(errorHandler);


   
    