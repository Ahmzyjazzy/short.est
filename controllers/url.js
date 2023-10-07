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
    // TODO: implememt handle url redirect
    res.send('redirect')
}

const handleUrlStatistics = async (req, res) => {
    // TODO: implememt handle url stats
    res.send('stats')
}

module.exports = {
    handleUrlEncode,
    handleUrlDecode,
    handleUrlStatistics,
    handleUrlRedirect,
}