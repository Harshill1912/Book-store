import express from 'express';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoutes from './routes/bookRoutes.js'
import cors from 'cors'


const app = express();

// Middleware 
app.use(express.json());

//cors middleware

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));


app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('harshil');
});

app.use('/books', booksRoutes)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Successfully connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`App is started at port no ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });
