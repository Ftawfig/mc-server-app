
export default function handler(req, res) {
    if (req.method === 'POST') {
      //Handle HTTP POST request
      console.log('calling start_server()');
      return start_server();
    } else {
      //Handle any other HTTP method
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

  function start_server() {
    const instance = process.env.INSTANCE;
    const project = process.env.PROJECT;
    const zone = process.env.ZONE;
    
    console.log('start_server() begin');

    //Imports the Compute library
    const {InstancesClient} = require('@google-cloud/compute').v1;
    
    //Instantiates a client
    const computeClient = new InstancesClient();
    
    async function callStart() {
      //Construct request
      const request = {
        instance,
        project,
        zone,
      };
    
      console.log('Starting server...');

      //Run request
      const response = await computeClient.start(request);
    
      console.log(response);
      console.log('Server started successfully');
    }
    
    //Create firewall rule
    const firewallResource = {};
    
    createFirewall(firewallResource, project);
  
    callStart();

    return res.status(200).json({
      success : true
    });
  }
  
  function createFirewall(firewallResource, project) {
      const {FirewallsClient} = require('@google-cloud/compute').v1;
    
      // Instantiates a client
      const computeClient = new FirewallsClient();
    
      async function callInsert() {
        // Construct request
        const request = {
          firewallResource,
          project,
        };
    
        // Run request
        const response = await computeClient.insert(request);
        console.log(response);
      }
    
      callInsert();
  }
}
