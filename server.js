import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
// configure  env
dotenv.config();

// database config
connectDB();

// esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Serving static files from:', path.resolve(__dirname, '../../build'));

// create engine
const app = express();

// middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

const rootDirectory = path.resolve(__dirname, '../../');
app.use(express.static(path.join(__dirname, '../../build')))
// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes)

// create rest apis
app.get('*', function(req,res){
    res.sendFile(path.join(rootDirectory, 'build', 'index.html'))
})

// create a port for a node server
const PORT = process.env.PORT;

// run the server
app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on : ${PORT}`)
})