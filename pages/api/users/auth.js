const jwt = require('jsonwebtoken');
import { dbService } from "../../../services/db.service";

const secret = process.env.TOKEN_SECRET;

export function verifyToken(token) {
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        return
    }
}

export function createToken(user, expiry) {
    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ 
        sub: user.id,
        email: user.email,
        first: user.first,
        last: user.last,
        role: user.role
    }, secret, { expiresIn: expiry });

    // return  user details and token
    return {
        id: user.id,
        email: user.email,
        first: user.first,
        last: user.last,
        role: user.role,
        token
    };
}

export default function handler(req, res) {
    if (req.method == 'POST') {
        return authenticate();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function authenticate() {
        const { email, password, remember_user } = req.body;
        return dbService.getUser(email, password)
            .then(user => {

                 //if user doesn't exist, rtuurn a 401 error with error message
                 if (!user) {
                    return res.status(401).json({
                        status: 401,
                        message: 'Email or password is incorrect!'
                    });
                }

                let expiry = '1d';

                if (remember_user) {
                    expiry = '7d';
                }

                 // return  user details and token
                 return res.status(200).json(createToken(user, expiry));
            });
    }
}