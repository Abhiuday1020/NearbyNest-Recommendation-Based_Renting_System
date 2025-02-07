const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/authRouter');

require('dotenv').config();
require('./models/db');

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})