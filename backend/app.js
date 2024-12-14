const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB().catch(error => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});