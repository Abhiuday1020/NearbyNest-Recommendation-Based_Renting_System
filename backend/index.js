import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from "cookie-parser";
import postRouter from './routes/postRouter.js';
import authRouter from './routes/authRouter.js';
import testRouter from './routes/testRouter.js';
import postRoomRouter from './routes/roomRouter.js';
import availableRoom from './routes/availableRoom.js';

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/auth', authRouter);
app.use("/api/posts", postRouter);
app.use("/api/test", testRouter);
app.use("/api/postRoom", postRoomRouter);
app.use("/api/availableRoom", availableRoom);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
