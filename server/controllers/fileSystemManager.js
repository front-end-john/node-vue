const fileSystemModel = require('../models/fileSystemModel')
const output = require('../common/output')
const { success, error } = output

exports.getFile = (req, res, next) => {
    const data = req.query || null
    if (!data) return console.error('参数为空')
    fileSystemModel.getFile(data, (err, result) => {
        if (err) return error(req, res, err)
        success(req, res, '获取文件数据成功', result)
    })
}