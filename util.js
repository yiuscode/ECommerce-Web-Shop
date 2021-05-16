import jwt from 'jsonwebtoken';

const getToken = (user) => {
    return jwt.sign({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        address: user.address,
        suburb: user.suburb,
        postcode: user.postcode,
        state: user.state,
        isAdmin: user.isAdmin,
    }
        , 'work hard', {
        expiresIn: '24h'
    });
}

const isAuth = (req, res, next) =>{
    const token = req.headers.authorization;


    if(token){
        const onlyToken = token;
        jwt.verify(onlyToken, 'work hard', (err, decode) =>{
            if (err) {
                return res.status(401).send({msg: 'Invalid token.'});
            }
            req.user = decode;
            next();
            return
        });

    }else{
        return res.status(401).send({msg: 'Token is not supplied.'});
    }
    
}

const isAdmin = (req, res, next) =>{
    if (req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg: 'Access denied.'});

}


export {getToken, isAuth, isAdmin};