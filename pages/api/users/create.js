import { dbService } from "../../../services/db.service";
import { createToken } from "./auth";

export default function handler(req, res) {
    if (req.method == 'POST') {
        const requestIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        console.log(`requestIP: ${requestIP}`);

        return createUser(requestIP);
    } else { 
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function createUser(requestIP) {
        const userData = dbService.insert({...req.body, ["ip1"] : requestIP})
        .then(userData => {
            console.log(userData);
            return res.status(200).json(createToken(userData, '7d'));
        })
        .catch(e => {
            return res.status(401).json({
                status: 401,
                message: e
            }); 
        });
    }
}