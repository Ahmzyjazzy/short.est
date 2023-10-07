const validateUrlRequest = (req, res, next) =>{
    const { url } = req.body

    if (!url)
        return res
            .status(400)
            .json({ success: false, error: 'url is required' });

    const result =
        url.match(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/gi);

    if ((result !== null)) {
        next();
    } else {
        return res
            .status(422)
            .json({ success: false, error: 'Invalid url provided' });
    }
};

const validatePath = (req, res, next) => {
    const { urlPath } = req.params
    if (!urlPath)
        return res
            .status(400)
            .json({ success: false, message: 'url path is required' });

    next();
};

module.exports = {
    validateUrlRequest,
    validatePath
}