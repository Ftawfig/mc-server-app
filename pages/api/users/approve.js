import { dbService } from "../../../services/db.service";

export default function handler(req, res) {
    if (req.method == 'POST') {
        return approve();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function approve() {
        console.log(req.body);
        const { id } = req.body;
        return dbService.approveUser(id)
            .then(() => {
                 return res.status(200);
            });
    }
}