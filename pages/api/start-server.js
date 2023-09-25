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
    //const instance = process.env.INSTANCE;
    const {instance} = req.body;
    const project = process.env.PROJECT;
    const zone = process.env.ZONE;

    console.log('start_server() begin. instance: ' + instance + ', project: ' + project + ', zone: ' + zone + '');

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

    callStart();

    return res.status(200).json({
      success : true
    });
  }
}
