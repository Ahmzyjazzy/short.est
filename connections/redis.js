const redis = require("redis")
const config = require('../config');

const connectRedis = async () => {
    const RedisClient = redis.createClient({
        socket: {
            host: config.redis.host,
            port: config.redis.port,
        }
    })

    // connect to redis
    await RedisClient.connect()

    // handle error
    RedisClient.on('error', (err) => {
        console.error(`An error occurred with Redis: ${err}`)
    })

    return RedisClient;
}

module.exports = connectRedis;