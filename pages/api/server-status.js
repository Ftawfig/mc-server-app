
export default function handler(req, res) {
    if (req.method === 'GET') {
      //Handle HTTP POST request
      return start_server();
    } else {
      //Handle any other HTTP method
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

  function server_status() {
    const instance = process.env.INSTANCE;
    const project = process.env.PROJECT;
    const zone = process.env.ZONE;
    
    console.log('start_server() begin');

    //Imports the Compute library
    const {InstancesClient} = require('@google-cloud/compute').v1;
    
    //Instantiates a client
    const computeClient = new InstancesClient();
    
    async function callGet() {
      //Construct request
      const request = {
        instance,
        project,
        zone,
      };
    
      //Run request
      const response = await computeClient.get(request);

      const serverInfo = {
        status: response.status,
        ip: response.networkInterfaces[0].networkIP
      };

      return response;
    }

    const serverInfo = callGet();

    return res.status(200).json(serverInfo);
  }
}
