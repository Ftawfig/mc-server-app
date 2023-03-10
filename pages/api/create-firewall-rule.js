const compute = require('@google-cloud/compute');
const computeProtos = compute.protos.google.cloud.compute.v1;

export default function handler(req, res) {
    if (req.method === 'POST') {
      //Handle HTTP POST request
      console.log('calling start_server()');

      const { ip1, ip2 } = req.body;

      return create_firewall_rule(ip1, ip2, res);
    } else {
      //Handle any other HTTP method
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export async function createFirewallRule(id, ip1, ip2, res) {
    const projectId = process.env.PROJECT;
    const firewallsClient = new compute.FirewallsClient();
    const operationsClient = new compute.GlobalOperationsClient();  

    const ranges = [ip1];
    
    if (ip2 != "") {
        ranges.push(ip2);
    }

    const firewallRule = new computeProtos.Firewall();

    firewallRule.name = "allow-" + id;
    firewallRule.direction = 'INGRESS';
    firewallRule.allowed = [
        {
            IPProtocol: 'udp',
            ports: [19132, 19133]
        },
        {
            IPProtocol: 'tcp',
            ports: [19132, 19133]
        }
    ];
    firewallRule.priority = 0;
    firewallRule.targetTags = ['http-server', 'https-server'];
    firewallRule.sourceRanges = ranges;

    const [response] = await firewallsClient.insert({
        project: projectId,
        firewallResource: firewallRule,
    });

    let operation = response.latestResponse;

    // Wait for the create operation to complete.
    while (operation.status !== 'DONE') {
        [operation] = await operationsClient.wait({
        operation: operation.name,
        project: projectId,
        });
    }

    console.log('Firewall rule created');
    return res.status(200);
}
