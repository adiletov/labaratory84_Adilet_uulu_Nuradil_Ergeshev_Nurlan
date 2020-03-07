const User = require('../modules/User');

const auth = async (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        res.status(401).send({error: 'No authorization'})
    }
    const [type, token] = authorization.split(' ');

    if (type !== 'Token' || !token) {
        res.status(401).send({error: 'No type or token'})
    }

    const user = await User.findOne({token});
    if (!user) {
        res.status(404).send('Not found')
    }

    req.user = user;
    next()
};


module.exports = auth;