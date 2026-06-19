const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const authRoutes = require('./routes/auth');
const apiKeyMiddleware = require('./middleware/apiKey');

const app = express();

/* Winston Logger */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'security.log'
        })
    ]
});

/* Rate Limiting */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests. Try again later.'
});

/* Middleware */
app.use(express.json());
app.use(cookieParser());

/* Security Headers */
app.use(
    helmet({
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true
        },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"]
            }
        }
    })
);

/* CORS */
app.use(cors({
    origin: 'http://localhost:3000'
}));

/* Rate Limiter */
app.use(limiter);

/* CSRF Protection */
const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

/* Home Route */
app.get('/', (req, res) => {
    logger.info('Home page accessed');
    res.send({
        message: 'SecureApp is running',
        csrfToken: req.csrfToken()
    });
});

/* Protected Routes */
app.use(
    '/api',
    apiKeyMiddleware,
    authRoutes
);

/* Start Server */
app.listen(3000, () => {
    logger.info('Application started');
    console.log('Server running on port 3000');
});