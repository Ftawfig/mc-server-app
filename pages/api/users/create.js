import db from '/services/db.service.js';

export default function handler(req, res) {
    if (req.method == 'POST') {
        return authenticate();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function authenticate() {
        const { email, password, remember_user } = req.body;

        //console.log(remember_user);
        const user = users.find(u => u.email === email && u.password === password);

        //if user doesn't exist, reutnr a 401 error with error message
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Email or password is incorrect!'
            });
        }
        
       let expiry = '1d';

       if (remember_user) {
           expiry = '7d';
           console.log(remember_user);
       }

       console.log(expiry);
       
        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ 
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }, secret, { expiresIn: expiry });

        // return  user details and token
        return res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token
        });
    }
}