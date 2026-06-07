const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');

const authRoutes = require('./routes/auth');

const app = express();

/* Winston Logger Configuration */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'security.log'
        })
    ]
});

app.use(express.json());

app.use(helmet());
app.use(cors());

app.use('/api', authRoutes);

/* Home Route */
app.get('/', (req, res) => {
    logger.info('Home page accessed');
    res.send('SecureApp is running');
});

/* Start Server */
app.listen(3000, () => {
    logger.info('Application started');
    console.log('Server running on port 3000');
});