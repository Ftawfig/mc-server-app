const region = 'us-east1-b';
const vm_name = 'mc-server';

//Start server, return external IP, create firewall rule
const http = require('http');
const compute = require('@google-cloud/compute');
const zone = compute.zone(region);
const vm = zone.vm(vm_name);
const fw_name = 'minecraft-fw-rule-' + Math.floor(new Date() / 1000);  

async function get_server_ip() {
    return new Promise((resolve, reject) => {
        vm.getMetadata(function(err, metadata, apiResponse) {
            resolve(metadata.networkInterfaces[0].accessConfigs[0].natIP);
        });
    });
}

async function check_if_server_ready() {
    const server_ip = await get_server_ip();
    const ready = !!server_ip;
    return ready;
}

async function sleep(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
}

//Start the VM
exports.startInstance = async function startInstance(req, res) {
    const zone = compute.zone(region);
    const vm = zone.vm(vm_name);
    console.log('Stopping VM');

    vm.start((err, operation, apiResponse) => {
        console.log('VM instance started');
    });

    console.log('VM starting');

    const server_ip = await get_server_ip();

    console.log('Server is stopped');

    //Record the function caller's IPv4 address
    console.log(`Request Headers: ${JSON.stringify(req.headers)}`);

    sourceIP = req.get('X-Forwarded-For');
    let caller_ip = req.query.message || req.body.message || sourceIP;

    //Set firewall settings
    const config = {
        protocols: {
            tcp: [19132, 19133],
            udp: [19132, 19133]
        },
        ranges: [caller_ip + '/32'],
        tags: [vm_name]
    };

    function callback(err, firewall, operation, apiResponse) {
        console.log(`Firewall rule created ${fw_name}`)
    }

    //Create firewall
    compute.createFirewall(fw_name, config, callback);

    req.status(200).send('Server started! <br/>' + server_ip + ':25565' +
     ' <br/>Your IP address is: ' + caller_ip + 
     '<br/>A firewall rule named ' + fw_name + ' has been created for you'
     );
}

//Stop the VM
exports.stopInstance = async function stopInstance(req, res) {
    const zone = compute.zone(region);
    const vm = zone.vm(vm_name);
    console.log('Preparing VM');

    vm.stop((err, operation, apiResponse) => {
        console.log('VM instance stopped');
    });

    console.log('VM stopping');
    
    while(!await check_if_server_ready()) {
        console.log('Server is not readty, waiting 1 second...');
        await sleep(1000);

        console.log('Checking server readiness again...');
    }

    const server_ip = await get_server_ip();

    console.log('server is ready');

    //Record the function caller's IPv4 address
    console.log(`Request Headers: ${JSON.stringify(req.headers)}`);

    sourceIP = req.get('X-Forwarded-For');
    let caller_ip = req.query.message || req.body.message || sourceIP;

    req.status(200).send('Server stopped.');
}

function main(firewallResource, project) {
  // [START compute_v1_generated_Firewalls_Insert_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  The body resource for this request
   */
  // const firewallResource = {}
  /**
   *  Project ID for this request.
   */
  // const project = 'my-project'
  /**
   *  An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
   */
  // const requestId = 'abc123'

  // Imports the Compute library
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
  // [END compute_v1_generated_Firewalls_Insert_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));