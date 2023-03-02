export default function ProjectInfo() {
    return (
        <div className="info-page">
            <h2>Project Info</h2>
            <div className="description">
                <h3>Description: </h3>
                <span>
                    Minecraft Bedrock Server. <br/><br/>Features three game modes:
                </span>
                <ul>
                    <li>Same-screen multiplayer</li>
                    <li>Real-time online multiplayer</li>
                    <li>Singleplayer vs. "AI" (not really AI)</li>
                </ul>
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
                    <li>Socket.IO</li>
                </ul>
                <h3>Build/Deploy: </h3> 
                <ul>
                    <li>Docker</li>
                </ul>
                <h3>Hosting: </h3> 
                <ul>
                    <li>Google Cloud Run</li>
                </ul>
                <h3>Repo:</h3> 
                <ul>
                    <li><a href="https://github.com/Ftawfig/react-tic-tac-toe">Github</a></li>
                </ul>
            </div>
        </div>
    );
}