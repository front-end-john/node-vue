var userModel = require('../models/userModel');

const ERR_OK = 200;
exports.queryByAll = function (req, res, next) {
    // 从model中获取数据
    userModel.queryByAll(function(err, result) {
        if (err) {
            console.log('err:', err);
            return;
        }
        const info = {
            result: result,
            code: ERR_OK,
            msg: '查询用户数据成功'
        };
        res.status(ERR_OK);
        res.send(info); // 输出结果到前端
    });
};

exports.addUser = function (req, res, next) {
    console.log('req.body:', req.body);
    // post 参数放在body里面
    // 发送数据到model
    const data = req.body || null; // 获取body参数，传给model
    if (!data) return console.error('参数为空');
    userModel.addUser(data,function (err, result) {
        if (err) {
            console.log('err:', err);
            return;
        }
        const info = {
            result: result,
            code: ERR_OK,
            msg: '添加用户数据成功'
        };
        res.status(ERR_OK);
        res.send(info); // 输出结果到前端
    });
};

exports.deleteUser = function (req, res, next) {
    console.log('req.query:', req); // delete 请求参数放在query里面
    // 发送数据到model
    const data = req.query || null;
    if (!data) return console.error('参数为空');
    userModel.deleteUser(data,function (err, result) {
        if (err) {
            console.log('err:', err);
            return;
        }
        const info = {
            result: result,
            code: ERR_OK,
            msg: '删除用户数据成功'
        };
        res.status(ERR_OK);
        res.send(info); // 输出结果到前端
    });
};

exports.updateUser = function (req, res, next) {
    console.log('req.body:', req.body);
    // post 参数放在body里面
    // 发送数据到model
    const data = req.body || null; // 获取body参数，传给model
    if (!data) return console.error('参数为空');
    userModel.updateUser(data,function (err, result) {
        if (err) {
            console.log('err:', err);
            return;
        }
        const info = {
            result: result,
            code: ERR_OK,
            msg: '更新用户数据成功'
        };
        res.status(ERR_OK);
        res.send(info); // 输出结果到前端
    });
};

exports.queryUser = function (req, res, next) {
    console.log('req.query:', req.query);
    // get 参数放在query里面
    // 发送数据到model
    const data = req.query || null; // 获取query参数，传给model
    if (!data) return console.error('参数为空');
    userModel.queryUser(data,function (err, result) {
        if (err) {
            console.log('err:', err);
            return;
        }
        const info = {
            result: result,
            code: ERR_OK,
            msg: '查询用户数据成功'
        };
        res.status(ERR_OK);
        res.send(info); // 输出结果到前端
    });
};