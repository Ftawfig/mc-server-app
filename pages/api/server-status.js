
export default function handler(req, res) {
    if (req.method === 'GET') {
      //Handle HTTP POST request
      return start_server();
    } else {
      //Handle any other HTTP method
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

  function server_status() {
    const instance = 'mc-server';
    const project = 'splendid-petal-379101';
    const zone = 'us-east1-b';
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

      return response.status; 
    }
  
    const status = callGet();

    return res.status(200).json({
      status : status
    });
  }
}
