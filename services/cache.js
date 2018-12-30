const mongoose = require('mongoose');
const redis = require('redis');

const exec = mongoose.Query.prototype.exec;
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');

// redis caching common logic client.flushall() to wipe out all the data

mongoose.Query.prototype.exec = function () {
    console.log('RUNNING A QUERY!');
    return exec.apply(this, arguments);
}