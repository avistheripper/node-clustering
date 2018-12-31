const mongoose = require('mongoose');
const redis = require('redis');

const exec = mongoose.Query.prototype.exec;
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');

// redis caching common logic client.flushall() to wipe out all the data

mongoose.Query.prototype.exec = async function () {
    const key = JSON.stringify(
        Object.assign(
            {},
            this.getQuery(),
            {collection: this.mongooseCollection.name}
        )
    );
     const cacheValue = await client.get(key);
    
    if(cacheValue) {

    }
    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result));
    return result;
}