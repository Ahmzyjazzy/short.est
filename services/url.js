const shortid = require('shortid')
const connectRedis = require('../utils/redis.util');

const encode = async (originalUrl, protocol, host) => {
    const redisClient = await connectRedis()
    let uniqueID = await redisClient.get(originalUrl)
    let urlObject = null

    // return data if exist to avoid override
    if (uniqueID) {
        urlObject = await redisClient.get(uniqueID)
        return JSON.parse(urlObject)
    }

    // create new if not exist
    const id = shortid.generate()
    const shortUrl = `${protocol}://${host}/${id}`
    urlObject = {
        id,
        originalUrl,
        shortUrl,
        createdAt: new Date(),
        statistics: [],
    }

    // set a mapping of the originalUrl to avoid override if exist
    await redisClient.set(originalUrl, id)

    // set a mapping of the shortUrl for easy lookup on decode api request
    await redisClient.set(shortUrl, id)

    // set a mapping of the id to urlObject for retrieving url stats
    await redisClient.set(id, JSON.stringify(urlObject))

    // close redis connection
    await redisClient.quit()

    return urlObject
}

const decode = async () => {
    // TODO: implememt decode service
}

const getUrlObject = async () => {
    // TODO: implememt get url object service
}

const updateStats = async () => {
    // TODO: implememt update stats
}

module.exports = {
    encode,
    decode,
    getUrlObject,
    updateStats
}