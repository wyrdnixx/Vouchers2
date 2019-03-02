var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();


var app = express();
app.use(bodyParser.json());
app.use(cors());

var testString = "Hallo \n dies ist ein Test-String";

const port = process.env.PORT || 5000;


const posts = require(`./routes/api/posts`);
app.use(`/api/posts`,posts); 


app.get('/', function(req,res) {
    res.send(testString);
})

app.listen(port, () => {
    console.log(`Example Server - process.env.PORT: ${ process.env.PORT}`); 
    console.log(`Started at Port: ${port}`); 
})
