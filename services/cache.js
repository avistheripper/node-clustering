const mongoose = require('mongoose');
const redis = require('async-redis');

const exec = mongoose.Query.prototype.exec;
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

// redis caching common logic client.flushall() to wipe out all the data
// MUST be hooked in 'async/await' manner! Better use async-redis instead of straight up one.

mongoose.Query.prototype.cache = function () {
    this.useCache = true;
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if(!this.useCache) {
        return exec.apply(this, arguments);
}
    const key = JSON.stringify(
        Object.assign(
            {},
            this.getQuery(),
            {collection: this.mongooseCollection.name}
        )
    );
     const cacheValue = await client.get(key);

    if (cacheValue) {
        const doc = JSON.parse(cacheValue);

        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);

    await client.set(key, JSON.stringify(result));

  return result;
};
