const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes.js');
const eventsRoutes = require('./routes/eventsRoutes');
const scanRoutes = require('./routes/scanRoutes.js');
const conductorRoutes = require('./routes/conductorRoutes.js');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use(bodyParser.json());
app.use(express.json()); 
app.use(cookieParser()); 


app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/conductor', conductorRoutes);



app.get('/', async (req, res) => { //test
    return res.status(200).send("wahoo"); 
});

const PORT = 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))