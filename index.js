import express from 'express';
// import dotenv from 'dotenv';
import AppRoutes from './src/routes/index.js';
import cors from 'cors';

// dotenv.config();
const PORT = 5000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
    }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', AppRoutes);

app.listen(PORT, () => console.log(`App is listening at PORT ${PORT}`));
