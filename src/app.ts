import express, {Application, Request, Response} from "express"; 
import carRoutes from './routes/cars';
import { env } from "./config/env";

const PORT = env.port
const app: Application = express(); 

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

app.use((req, _res, next) => { 
    console.log(`${req.method} ${req.originalUrl}`); 
    next(); 

}); 

app.use(express.json());

app.use('/api/v1/cars', carRoutes);


 
app.listen(PORT, () => { 
    console.log("Server is running on port", PORT); 
    }); 