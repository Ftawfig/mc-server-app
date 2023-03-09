const express = require('express');
const next = require("next");
const cookieParser = require('cookie-parser');

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

        server.use(cookieParser());
        

        //handle all requests via next.js requestHandler
        server.all('*', (req, res) => {
            //get the client IP and store it in a cookie
            const requestIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
            res.cookie('client_IP', requestIP);

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