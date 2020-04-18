const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== "dev";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();


nextApp.prepare().then(() => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use('/api/layout', require('./api/layout'));
    
    app.get('*', (req, res) => {
        return (handle(req, res));
    });

    app.listen(PORT, (err) => {
        if(err) throw err;
        console.log(`Ready at http://localhost:${PORT}`)
    })
})
