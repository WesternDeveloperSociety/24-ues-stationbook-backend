const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes.js');
const eventsRoutes = require('./routes/eventsRoutes');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);

app.use(express.json()); 

app.use(cookieParser()); 

app.get('/', async (req, res) => { //test
    return res.status(200).send("wahoo"); 
});

const PORT = 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))