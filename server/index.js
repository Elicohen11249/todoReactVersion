//import "dotenv/config";
import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rootRoute from "./routes/root.js";
import tasksRoute from './routes/tasks.js'
import usersRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
const PORT = process.env.PORT
const app = express()
app.use(cors({ 
   //origin:'http://localhost:5173',
    origin:'http://localhost:7000',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser('A-very-strong-secret'))
app.use('/',rootRoute)
app.use('/tasks', tasksRoute)
app.use('/users', usersRoute)
app.use('/auth',authRoute)


app.use('/images', express.static('uploads'))

app.use(express.static( path.join(__dirname,'..','client','dist')))

// Fallback route to serve index.html for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.use((err,req,res,next)=>{
    res.status(500)
    res.send(`this is a error massege: ${err.message}`)
})
app.listen(PORT, () => {
    
    console.log('the server is now running and listening for requests on PORT:',PORT)
})
