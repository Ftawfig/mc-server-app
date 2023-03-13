export default function ProjectInfo() {
    return (
        <div className="info-page">
            <h2>Project Info</h2>
            <div className="description">
                <h3>Description: </h3>
                <p>Minecraft bedrock server management web-app. Server is hosted on GCP Compute Engine VM. Signed-up and approved users can manage the VM via GCP Compute API.</p> 
                <p>Users are stored in a firebase document database. Admin can approve/delete users via admin view in web-app. </p>
                <p>VPC firewall ingresss rules are autoamtically created for approved users via the FirewallsClient API and approved users can also update their IP address as well as add a secondary address to their account which will update their firewall rules. </p>
            </div>
            <br/>
            <div className="info-wrapper">
                <h3>Front-End: </h3> 
                <ul>
                    <li>React</li>
                    <li>Sass</li>
                </ul>
                <h3>Back-End: </h3> 
                <ul>
                    <li>Node.js</li>
                    <li>Next.js</li>
                    <li>Express</li>
                </ul>
                <h3>Database: </h3> 
                <ul>
                    <li>Firebase</li>
                </ul>
                <h3>Build/Deploy: </h3> 
                <ul>
                    <li>Docker</li>
                </ul>
                <h3>Hosting: </h3> 
                <ul>
                    <li>Google Cloud Run</li>
                </ul>
                <h3>Game Server: </h3> 
                <ul>
                    <li>Google Compute Engine</li>
                    <li>Ubuntu</li>
                </ul>
                <h3>Repo:</h3> 
                <ul>
                    <li><a href="https://github.com/Ftawfig/mc-server-app">Github</a></li>
                </ul>
            </div>
        </div>
    );
}