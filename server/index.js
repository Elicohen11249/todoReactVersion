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

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
const PORT = process.env.PORT
const app = express()
app.use(cors({ 
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser('A-very-strong-secret'))
app.use('/',rootRoute)
app.use('/tasks', tasksRoute)
app.use('/users', usersRoute)
app.use('/auth',authRoute)


//app.use('/app',express.static(path.join('..','client','dist')))
app.use('/images', express.static('uploads'))


app.use((err,req,res,next)=>{
    res.status(500)
    res.send(`this is a error massege: ${err.message}`)
})
app.listen(PORT, () => {
    
    console.log('the server is now running and listening for requests on PORT:',PORT)
})
