const router = require('express').Router();

const secure = require('../../auth');
const Controller = require('./controller');
const { isNotLoggedIn } = require('../../lib/auth');

router.get('/', isNotLoggedIn, (req, res) => {
    res.render('auth/login');
})

router.post('/', (req, res, next) => {
    const { user, password } = req.body
    
    Controller.login(user, password)
    .then(token => {
        req.session.authorization = token;
        res.redirect('/monitoreo');
    })
    .catch(err => {
        const message = err;
        res.render('auth/login', { message });
    })
})

router.get('/logout', (req, res) => {
    req.session = null
    res.redirect('/login');
})

module.exports = router;