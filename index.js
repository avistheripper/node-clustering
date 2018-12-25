const cluster = require('cluster');
const express = require('express');
const app = express();




app.get('/', (req, res) => {
    res.send('Hi there');
});
app.get('/fast', (req, res) => {
    res.send('through the cluster');
});
app.listen(9090);
