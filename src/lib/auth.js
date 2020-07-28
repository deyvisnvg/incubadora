module.exports = {
    isLoggedIn (req, res, next) {
        if (req.session.user) { // Si el usuario esta Autentificado // Esto devuelto un true o un false
            return next();
        }
        res.redirect('/login');
    },

    isNotLoggedIn (req, res, next) {
        if (!req.session.user) { // Si el usuario no esta Autentificado - false
            return next();
        }
        res.redirect('/monitoreo');
    }
}