const express = require('express');
const router = express.Router();
const {
    validateUrlRequest,
    validatePath
} = require('../middlewares/url.middleware');
const {
    handleUrlEncode,
    handleUrlDecode,
    handleUrlStatistics,
    handleUrlRedirect
} = require('../controllers/url.controller');

router.post('/encode', validateUrlRequest, handleUrlEncode);

router.post('/decode', validateUrlRequest, handleUrlDecode);

router.get('/statistic/:urlPath', handleUrlStatistics);

router.get('/:urlPath', validatePath, handleUrlRedirect);

module.exports = router;
