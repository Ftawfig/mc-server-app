const express = require('express');
const next = require("next");

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost:3000';
const PORT = 3000;

const app = next({ dev, hostname, PORT });
const handle = app.getRequestHandler();

//instantiate next 
app
    .prepare()
    .then( () => {
        const server = express();

        //handle all requests via next.js requestHandler
        server.all('*', (req, res) => {
            return handle(req, res);
        });
        
        //start listening on PORT
        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`listening on *${PORT}`);
        });
            
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });