const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
    // jwt.sign(data, secret, { expiresIn: 60*60*24 });
}

function verify(token) {
    return jwt.verify(token, secret)
}

function checkOwn(req, res, next) {
        const decoded = decodeHeader(req, res, next);
        req.session.user = decoded;
        next();
}

function decodeHeader(req, res, next) {
    // const authorization = req.headers.authorization || '';
    // const token = getToken(authorization);
    const token = req.session.authorization || '';

    if (!token) {
        res.redirect('/login');
        throw new Error('No viene token');
    }

    const decoded = verify(token);
    return decoded;
}

module.exports = {
    sign,
    checkOwn,
};