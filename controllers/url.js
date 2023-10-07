const ip = require('ip')
const ipAddressService = require('../services/ipAddress')
const urlService = require('../services/url')

const handleUrlEncode = async (req, res) => {
    try {
        const { url: newUrl } = req.body
        const { protocol } = req // e.g http, https
        const { host } = req.headers // e.g 127.0.0.1, example.com

        const data = await urlService.encode(newUrl, protocol, host)
        return res.status(200).json({ success: true, data })
    } catch (error) {
        return res.status(500)
            .json({ success: false, error: error.message })
    }
}

const handleUrlDecode = async (req, res) => {
    try {
        const { url } = req.body
        const data = await urlService.decode(url)
        return res.status(200).json({ success: true, data })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const handleUrlRedirect = async (req, res) => {
    try {
        const { urlPath } = req.params
        const urlObject = await urlService.getUrlObject(urlPath)

        // get visitor ip information
        const ipAddress = ip.address()
        const ipAddressInformation = await ipAddressService.getIpAddressInfo(ipAddress)

        // update url stats
        urlObject.statistics.push(ipAddressInformation)
        urlService.updateStats(urlPath, urlObject)

        res.redirect(urlObject.originalUrl)
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const handleUrlStatistics = async (req, res) => {
    try {
        const { urlPath } = req.params
        const urlObject = await urlService.getUrlObject(urlPath)
        const { originalUrl, shortUrl } = urlObject

        // update stats
        const data = {
            originalUrl,
            shortUrl,
            total: urlObject.statistics.length,
            visitors: urlObject.statistics
        }

        return res.status(200).json({ success: true, data })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    handleUrlEncode,
    handleUrlDecode,
    handleUrlRedirect,
    handleUrlStatistics,
}