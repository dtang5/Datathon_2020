const express = require('express')
const app = express()
const port = 3001

var cors = require('cors')
var bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.post('/', (req, res) =>
{
        console.log(req.body.drillbit_size);
        console.log(req.body.min_depth);
        console.log(req.body.max_depth);
        res.send('Hello World!')
});

app.get('/', (req, res) => {
        res.send('Hello World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
