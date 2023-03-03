const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
import getConfig from 'next/config';

//import { apiHandler } from 'helpers/api';
const { serverRuntimeConfig } = getConfig();

// users in JSON file for simplicity, store in a db for production applications
const users = require('/users.json');

function jwtMiddleware(req, res) {
    const middleware = expressJwt({ secret : serverRuntimeConfig.secret, algorithms: ['HS256'] });
}

export default function handler(req, res) {
    if (req.method == 'POST') {
        return authenticate();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function authenticate() {
        console.log(req.body);
        const { email, password } = req.body;
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) throw 'Username or password is incorrect';
    
        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    
        // return basic user details and token
        return res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token
        });
    }
}