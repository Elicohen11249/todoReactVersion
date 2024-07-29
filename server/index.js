import "dotenv/config";
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rootRoute from "./routes/root.js";
import tasksRoute from './routes/tasks.js'
import usersRoute from './routes/users.js'
import authRoute from './routes/auth.js'

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

app.use('/images', express.static('uploads'))


app.use((err,req,res,next)=>{
    res.status(500)
    res.send(`this is a error massege: ${err.message}`)
})

app.listen(PORT, () => {
    console.log('the server is now running and listening for requests on PORT:',PORT)
})
/*
const array = [5,6,7,'ll']
array.age = 32 // we can assign custom properties just like with regular objects
for (const i in array) {
    console.log(i, array[i], array.length); 
}
// this will print
// "0 string"
// "1 string"
// "2 string"
// "age string"

const obj = { a: 1, b: 2, c: 3 };
obj.d=4
for (const key of obj) {
  console.log(key);
}
// Output:
// a 1
// b 2
// c 3
const str = 'hello';
for (const char of str) {
  console.log(char);
}


const map = new Map([['a', 1], ['b', 2]]);
console.log(map)
for (const [key, value] of map) {
  console.log(key, value);
}

const set = new Set([1, 2, 3]);
console.log(set)
for (const value of set) {
  console.log(value);
}*/