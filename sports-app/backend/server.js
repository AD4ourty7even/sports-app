const express = require("express");
const cors = require('cors');
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

connectDB();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/games', require('./routes/gamesRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/profile', require('./routes/userProfileRoute'));
app.use('/api/subscribe', require('./routes/subscribeRoute'));

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

