const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('Hi there');
})

app.listen(9090, () => console.log('running'));