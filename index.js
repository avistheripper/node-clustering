const cluster = require('cluster');

// Checking if instance is cluster manager

if(cluster.isMaster) {
    // Executing one more time in childMode
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {
    const express = require('express');

    const app = express();

    // Loading the CPU and blocking the event loop

    // function doWork(duration) {
    //     const start = Date.now();
    //     while(Date.now() - start < duration) { }
    // };

    app.get('/', (req, res) => {
        res.send('Hi there');
    });
    app.get('/fast', (req, res) => {
        res.send('through the cluster');
    });
    app.listen(9090);
}
