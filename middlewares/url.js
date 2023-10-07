const validateUrlRequest = (req, res, next) =>{
    const { url } = req.body

    if (!url)
        return res.status(400).json({ success: false, error: 'url is required' });

    const result =
        url.match(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/gi);

    if ((result !== null)) {
        next();
    } else {
        return res.status(422).json({ success: false, error: 'Invalid url provided' });
    }
};


module.exports = {
    validateUrlRequest,
}