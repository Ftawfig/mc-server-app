import { dbService } from "../../../services/db.service";
import { createFirewallRule } from "../create-firewall-rule";

export default function handler(req, res) {
    if (req.method == 'POST') {
        return update();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function update() {
        console.log(req.body);
        const { id, ip1, ip2 } = req.body;
        return dbService.updateUserIPs(id, ip1, ip2)
            .then(() => {
                //update firewall rules for user's IP addresses 
                return createFirewallRule(id, ip1, ip2, res);
            });
    }
}