const axios = require('axios')
const config = require('../config')

const getIpAddressInfo = async (ipAddress) => {
    const url = `${config.ipaddress.base_url}?api_key=${config.ipaddress.api_key}`
    const apiResponse = await axios.get(url + "&ip_address=" + ipAddress)
    const {
        ip_address,
        region,
        region_iso_code,
        country,
        country_code,
        continent,
        continent_code,
        longitude,
        latitude,
        timezone,
        flag,
        currency,
        connection
    } = apiResponse.data

    return {
        ip_address,
        region,
        region_iso_code,
        country,
        country_code,
        continent,
        continent_code,
        longitude,
        latitude,
        timezone,
        flag,
        currency,
        connection
    }
}

module.exports = {
    getIpAddressInfo
}
