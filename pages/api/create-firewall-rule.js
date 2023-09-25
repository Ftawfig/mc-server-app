const compute = require('@google-cloud/compute');
const computeProtos = compute.protos.google.cloud.compute.v1;

//export default function handler(req, res) {
//    if (req.method === 'POST') {
//      //Handle HTTP POST request
//      console.log('calling start_server()');
//
//      const { ip1, ip2 } = req.body;
//
//      return create_firewall_rule(ip1, ip2, res);
//    } else {
//      //Handle any other HTTP method
//      return res.status(405).end(`Method ${req.method} Not Allowed`)
//    }
//}

export async function createRules(id, ip1, ip2, res) {
    //check that each IP is valid, if so push it to the ranges array
    const ips = [ip1, ip2];
    const ipv4s = [];
    const ipv6s = [];

    let ipv4_regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;   
    let ipv6_regex =/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

    ips.forEach(ip => {
        if (ipv4_regex.test(ip)) {
            ipv4s.push(ip);
            console.log(`${ip} is valid!`)
        } else {
            console.log(`${ip} is not valid!`)
        }
    })

    ips.forEach(ip => {
        if (ipv6_regex.test(ip)) {
            ipv6s.push(ip);
            console.log(`${ip} is valid!`)
        } else {
            console.log(`${ip} is not valid!`)
        }
    })

    if (ipv4s.length > 0 && ipv6s.length > 0) {
        return {
            ipv4Res: await createFirewallRule(id, ipv4s, res, 'ipv4'),
            ipv6Res: await createFirewallRule(id, ipv6s, res, 'ipv6')
        }
    } else if (ipv4s.length > 0) {
        return {
            ipv4Res: await createFirewallRule(id, ipv4s, res, 'ipv4'),
        }
    } else if (ipv6s.length > 0) {
        return {
            ipv6Res: await createFirewallRule(id, ipv6s, res, 'ipv6')
        }
    }
}

export async function createFirewallRule(id, ranges, res, ipType) {
    const projectId = process.env.PROJECT;
    const firewallsClient = new compute.FirewallsClient();
    const operationsClient = new compute.GlobalOperationsClient();  

    console.log(`ranges.length: ${ranges.length}`)

    //if there are no valid IPs, return with error status
    if (ranges.length == 0) {
        return res.status(405);
    }

    const firewallRule = new computeProtos.Firewall();

    firewallRule.name = "allow-" + ipType + "-" + id.toLowerCase();
    firewallRule.direction = 'INGRESS';
    firewallRule.allowed = [
        {
            IPProtocol: 'udp',
            ports: [2456, 2457, 19132, 19133]
        },
        {
            IPProtocol: 'tcp',
            ports: [2456, 2457,19132, 19133]
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
