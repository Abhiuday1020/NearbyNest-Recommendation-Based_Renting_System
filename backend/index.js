import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import postRouter from './routes/postRouter.js';
import authRouter from './routes/authRouter.js';
import testRouter from './routes/testRouter.js';
import postRoomRouter from './routes/roomRouter.js';
import cookieParser from "cookie-parser";

// require('dotenv').config();
// require('./models/db');
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials:true}));
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use("/api/posts", postRouter);
app.use("/api/test", testRouter);
app.use("/api/postRoom", postRoomRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})