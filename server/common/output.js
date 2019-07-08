const ERR_OK = 200

const sendSuccessToFront = (req, res, message, result) => {
    const url = req.url
    const msg = message !== undefined ? message : `${url} [Call Succeed]`
    res.status(ERR_OK)
    res.send({
        code: ERR_OK,
        msg,
        result
    })
}

const sendErrorToFront = (req, res, errMessage, errorCode) => {
    const url = req.url
    const code = errorCode !== undefined ? errorCode : -1
    const msg = errMessage !== undefined ? errMessage : `${url} [Call Failed]`
    res.send({
        code,
        msg
    })
}
exports.success = sendSuccessToFront
exports.error = sendErrorToFront