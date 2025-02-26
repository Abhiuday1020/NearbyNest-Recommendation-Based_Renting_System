import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import postRouter from './routes/postRoute.js';
import authRouter from './routes/authRouter.js';

// require('dotenv').config();
// require('./models/db');
app.use(express.json());
app.use(cors({origin: process.env.CLIENT_URL, credentials:true}));
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})