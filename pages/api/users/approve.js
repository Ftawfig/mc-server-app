import { dbService } from "../../../services/db.service";
import { createFirewallRule } from "../create-firewall-rule";

export default function handler(req, res) {
    if (req.method == 'POST') {
        return approve();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function approve() {
        console.log(req.body);
        const { id } = req.body;
        dbService.approveUser(id)
            .then(() => {
                return dbService.getUserById(id)
                .then(userData => {
                    console.log(userData);
                    //create firewall rules for user's IP addresses 
                    return createFirewallRule(Object.keys(userData).gamertag, userData.ip1, userData.ip2, res);
                });
                
            });        
    }
}