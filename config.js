const dotenv = require('dotenv');
dotenv.config();

const env = process.env;
const config = {
    app: {
        name: env.APP_NAME || 'Short.est',
        url: env.APP_URL || '127.0.0.1:3000'
    },
    redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
    },
    ipaddress: {
        base_url: env.ABSTRACT_BASE_URL,
        api_key: env.ABSTRACT_API_KEY
    }
};

module.exports = config