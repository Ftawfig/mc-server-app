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
    const serviceAccount = {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
    }
    
    const computeClient = new InstancesClient({ credentials: serviceAccount });
    
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
