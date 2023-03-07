import { dbService } from "../../../services/db.service";

export default function handler(req, res) {
    if (req.method == 'POST') {
        return remove();
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function remove() {
        const { id } = req.body;
        return dbService.deleteUser(id)
            .then(() => {
                 return res.status(200);
            });
    }
}