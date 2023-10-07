const express = require('express');
const router = express.Router();

router.post('/encode', (req, res)=> { res.send('encode') });

router.post('/decode', (req, res) => { res.send('decode') });

router.get('/statistic/:urlPath', (req, res) => { res.send('statistic') });

router.get('/:urlPath', (req, res) => { res.send('path redirection') });

module.exports = router;
