const userModel = require('../models/userModel')
const output = require('../common/output')
const { success, error } = output
exports.queryByAll = (req, res, next) => {
    // 从model中获取数据
    userModel.queryByAll((err, result) => {
        if (err) return error(req, res, err)
        success(req, res, '查询用户数据成功', result)
    })
}

exports.addUser = (req, res, next) => {
    // post 参数放在body里面
    // 发送数据到model
    const data = req.body || null // 获取body参数，传给model
    if (!data) return console.error('参数为空')
    userModel.addUser(data, (err, result) => {
        if (err) return error(req, res, err)
        success(req, res, '添加用户数据成功', result)
    })
}

exports.deleteUser = (req, res, next) => {
    // delete 请求参数放在query里面
    // 发送数据到model
    const data = req.query || null
    if (!data) return console.error('参数为空')
    userModel.deleteUser(data, (err, result) => {
        if (err) return error(req, res, err)
        success(req, res, '删除用户数据成功', result)
    })
}

exports.updateUser = (req, res, next) => {
    // post 参数放在body里面
    // 发送数据到model
    const data = req.body || null // 获取body参数，传给model
    if (!data) return console.error('参数为空')
    userModel.updateUser(data, (err, result) => {
        if (err) return error(req, res, err)
        success(req, res, '更新用户数据成功', result)
    })
}

exports.queryUser = (req, res, next) => {
    // get 参数放在query里面
    // 发送数据到model
    const data = req.query || null // 获取query参数，传给model
    if (!data) return console.error('参数为空')
    userModel.queryUser(data, (err, result) => {
        if (err) return error(req, res, err)
        success(req, res, '查询用户数据成功', result)
    })
}