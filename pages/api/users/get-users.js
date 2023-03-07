import { use } from "react";
import { dbService } from "../../../services/db.service";

export default function handler(req, res) {
    if (req.method == 'GET') {
        return getUsers();
    } else { 
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getUsers() {
        return dbService.getAll()
        .then(userData => {
            console.log(userData);
            return res.status(200).json(userData);
        })
        .catch(e => {
            return res.status(401).json({
                status: 401,
                message: e
            }); 
        });
    }
}