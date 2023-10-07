const shortid = require('shortid')
const connectRedis = require('../utils/redisUtil');
const errorMessages = require('../constants/error_messages');

/**
 * Encode a given url to a short url
 * e.g https://indicina.co -> http://short.est/GeAi9K 
 * @param {string} originalUrl 
 * @param {string} protocol 
 * @param {string} host 
 * @returns object
 */
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

/**
 * Decode a given shortUrl to originalUrl
 * e.g http://short.est/GeAi9K -> https://indicina.co
 * @param {string} shortUrl 
 * @returns Object
 */
const decode = async (shortUrl) => {
    const redisClient = await connectRedis()
    let uniqueID = await redisClient.get(shortUrl)

    if (!uniqueID) throw new Error(errorMessages.URL_NOT_EXIST)

    const urlObject = await redisClient.get(uniqueID)
    const { originalUrl } = JSON.parse(urlObject)

    await redisClient.quit()
    return { originalUrl }
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