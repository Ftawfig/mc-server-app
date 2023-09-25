# Minecraft Bedrock Server
Minecraft bedrock server management web-app. Server is hosted on GCP Compute Engine VM. Signed-up and approved users can manage the VM via GCP Compute API. 

Users are stored in a firebase document database. Admin can approve/delete users via admin view in web-app. 

VPC firewall ingresss rules are autoamtically created for approved users via the FirewallsClient API and approved users can also update their IP address as well as add a secondary address to their account which will update their firewall rules.  

## Config
To configure, you will first have to create a Google Service account with permissions to manage firebase and VM instances. Download the JSON service account key and keep it in the project root directory. 

Then set up an .env.local file and define the following environment variables:

    TOKEN_SECRET=secret string for encrypting/decoding JWT tokens
    MC_INSTANCE=VM Minecraft instance name in Google Compute Engine
    VH_INSTANCE=VM Valheim instance name in Google Compute Engine
    PROJECT=GCP project name that houses the VM
    ZONE=GCP region that houses the VM
    GOOLGE_APPLICATION_CREDENTIALS=A JSON service acocunt file 

Admin user document will have to be manually created in the firebase console.

## Run Web Server
    node web-server.js

## Build & Deploy Container
### Build docker container
    docker build -t "mc-server-web-app" .

### Tag Artifact Repository Container
    docker tag mc-server-web-app us-east1-docker.pkg.dev/splendid-petal-379101/mc-server-repo/mc-server-web-app

### Push to Artifact Repository
    docker push us-east1-docker.pkg.dev/splendid-petal-379101/mc-server-repo/mc-server-web-app

### Architecture Diagram
![architecture](/public/mcserver.png)