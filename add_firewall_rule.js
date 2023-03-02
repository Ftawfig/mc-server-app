'use strict';

export function add_firewall_rule(firewallPolicy, firewallPolicyRuleResource) {
  // [START compute_v1_generated_FirewallPolicies_AddRule_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Name of the firewall policy to update.
   */
  // const firewallPolicy = 'abc123'
  /**
   *  The body resource for this request
   */
  // const firewallPolicyRuleResource = {}
  /**
   *  An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
   */
  // const requestId = 'abc123'

  // Imports the Compute library
  const {FirewallPoliciesClient} = require('@google-cloud/compute').v1;

  // Instantiates a client
  const computeClient = new FirewallPoliciesClient();

  async function callAddRule() {
    // Construct request
    const request = {
      firewallPolicy,
      firewallPolicyRuleResource,
    };

    // Run request
    const response = await computeClient.addRule(request);
    console.log(response);
  }

  callAddRule();
  // [END compute_v1_generated_FirewallPolicies_AddRule_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));