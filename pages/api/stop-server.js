
export default function handler(req, res) {
    if (req.method === 'POST') {
      stop_server();
    } else {
    //Handle any other HTTP method
    }

  function stop_server() {
    //const instance = process.env.INSTANCE;
    const {instance} = req.body;
    const project = process.env.PROJECT;
    const zone = process.env.ZONE;

    console.log('stop_server() begin. instance: ' + instance + ', project: ' + project + ', zone: ' + zone + '');

    //Imports the Compute library
    const {InstancesClient} = require('@google-cloud/compute').v1;

    // Instantiates a client
    const computeClient = new InstancesClient();

    async function callStop() {
      // Construct request
      const request = {
        instance,
        project,
        zone
      };

      // Run request
      const response = await computeClient.stop(request);
      console.log(response);
      console.log('Server stopped successfully');
    }

    callStop();

    return res.status(200).json({
      success : true
    });
  }
}
