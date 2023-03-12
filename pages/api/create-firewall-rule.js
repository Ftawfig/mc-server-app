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

    //check that each IP is valid, if so push it to the ranges array
    const ips = [ip1, ip2];
    const ranges = [];

    let ipv4_regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;   

    ips.forEach(ip => {
        if (ipv4_regex.test(ip)) {
            ranges.push(ip);
            console.log(`${ip} is valid!`)
        } else {
            console.log(`${ip} is not valid!`)
        }
    })
    
    console.log(`ranges.length: ${ranges.length}`)

    //if there are no valid IPs, return with error status
    if (ranges.length == 0) {
        return res.status(405);
    }

    const firewallRule = new computeProtos.Firewall();

    firewallRule.name = "allow-" + id.toLowerCase();
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
 
    //call firewallsClient.get() - if error, that means that the rule doesn't exist so create it
    try {
        const [getResponse] = await firewallsClient.get({
            project: projectId,
            firewall: firewallRule.name,
        });
        console.log(getResponse);

        //if the rule exists, update it
        if (getResponse) {
            const [response] = await firewallsClient.patch({
                project: projectId,
                firewall: firewallRule.name,
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
            console.log('Firewall rule updated');
        }
        
        return res.status(200);
    } catch(e) {
        console.log(e);

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
}
