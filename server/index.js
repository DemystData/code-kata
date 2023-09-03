import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';
const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use('/', postRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))

