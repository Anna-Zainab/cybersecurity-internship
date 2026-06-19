module.exports = (req, res, next) => {

    const apiKey = req.headers['x-api-key'];

    if (apiKey !== 'my-secret-key') {
        return res.status(403).send('Invalid API Key');
    }

    next();
};