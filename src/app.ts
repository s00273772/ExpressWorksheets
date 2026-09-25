import express, {Application, Request, Response} from "express"; 
import carRoutes from './routes/cars';
import {CarController} from './controllers/cars';
import { env } from "./config/env";
import {connectDB} from "./config/database";
import { authenticateKey } from "./middleware/auth.middleware";

const PORT = env.port
const app: Application = express(); 

const createCar = new CarController();

app.use((req, _res, next) => { 
    console.log(`${req.method} ${req.originalUrl}`); 
    next(); 

}); 

app.get("/ping", async (_req : Request, res: Response) => { 
    res.json({ 
    message: "hello from Shauna. Web Programming 2 Exercise 1 "
    }); 

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

app.use('/api/v1/cars', authenticateKey, carRoutes);

app.post('/', authenticateKey, createCar.createCar)


 

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
startServer();


   
    