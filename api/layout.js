// api/layout.js
const router = require('express').Router();
const fs = require('fs');


router.get('/', (req, res) => {
    console.log("Recieved GET on /api/layout");
    let layout = JSON.parse(fs.readFileSync('./api/layout.json'));
    res.json(layout);
});

router.post('/', (req, res) => {
    console.log("Recieved POST on /api/layout");
    console.log(req.body);
    if(req.body.newsType && req.body.objects) {
        fs.writeFileSync('./api/layout.json', JSON.stringify(req.body));
    }
    res.json({ done: true });
})

module.exports = router;