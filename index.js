const express = require('express');

const app = express();

// Loading the CPU and blocking the event loop

function doWork(duration) {
    const start = Date.now();
    while(Date.now() - start < duration) { }
}

app.get('/', (req, res) => {
    res.send('Hi there');
});

app.listen(9090);