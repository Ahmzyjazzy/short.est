const express = require('express');
const router = express.Router();
const { validateUrlRequest } = require('../middlewares/url');
const {
    handleUrlEncode,
    handleUrlDecode,
    handleUrlStatistics,
    handleUrlRedirect
} = require('../controllers/url');

router.post('/encode', validateUrlRequest, handleUrlEncode);

router.post('/decode', handleUrlDecode);

router.get('/statistic/:urlPath', handleUrlStatistics);

router.get('/:urlPath', handleUrlRedirect);

module.exports = router;
