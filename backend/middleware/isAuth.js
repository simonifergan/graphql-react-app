const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) throw 'Invalid credentials';
        const [bearer, token] = authHeader.split(' ');
        if (!token || token === '') throw 'Token expired';
        const decodedToken = jwt.verify(token, 'threecankeepasecretiftwoaredead');
        if (!decodedToken) throw 'Invalid credentials';
        req.isAuth = true;
        req.userId = decodedToken.userId;
        return next();
    } catch (err) {
        req.isAuth = false;
        return next();
    }

}