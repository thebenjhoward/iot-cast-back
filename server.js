const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3002;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/layout', require('./api/layout'));

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Ready at http://localhost:${PORT}`)
})