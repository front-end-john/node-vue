const mongoose = require('mongoose')
const db = require('../common/db')
const tools = require('../common/tools')

const UserModel = function() {
        db.connection() // 连接数据库
        const Schema = mongoose.Schema
            /* use schema 面向对象编程*/
        const userSchema = new Schema({
            // userId: { type: Schema.ObjectId, ref: 'sales' },
            createTime: String, // 時間以字符串形式存儲
            name: String,
            password: String,
            sex: Number, // 0 男，1 女
            en: String, // 英文
            cn: String, // 中文
            tn: String // 繁体
        })
        const sales = new Schema({
            name: { type: String, required: true, unique: true },
            password: String,
            phone: String,
            merchant: { type: Schema.ObjectId, ref: 'merchant' },
            status: { type: Number, default: 0 }
        })
        const merchant = new Schema({
                name: String,
                sName: String,
                type: String
            })
            // mongoose.model User2 是数据库的collection
        this.User2 = mongoose.model('User2', userSchema)
    }
    /*UserModel.methods.speak = function () {
                   const greeting = this.name
                       ? 'user name is ' + this.name : 'not user name!'
                   console.log(greeting);
                };*/
UserModel.prototype.queryByAll = function(callback) {
    console.log('/queryByAll')
    this.User2.find({}, function(err, doc) {
        if (err) return callback(err)
        callback(null, doc)
    })
}

UserModel.prototype.addUser = function(data, callback) {
    // const user = new UserModel(data);
    // console.log('要添加的数据：', data);
    // data = {name: 'aa', password: 'bb'} || null
    data.createTime = tools.formatDate(new Date(), false)
    this.User2.create(data, function(err) {
        if (err) return callback(err)
        callback() // 添加数据成功回调函数
    })
}

UserModel.prototype.deleteUser = function(data, callback) {
    this.User2.findByIdAndRemove(data._id, function(err) {
        if (err) return callback(err)
        callback() // 删除数据成功回调函数
    })
}

UserModel.prototype.updateUser = function(data, callback) {
    this.User2.findByIdAndUpdate(data._id, data, function(err) {
        if (err) return callback(err)
        callback() // 更新数据成功回调函数
    })
}

UserModel.prototype.queryUser = function(data, callback) {
    const keyword = data.keyword // 获取查询的字段
    const _filter = {
        //  $options: '$i' 忽略大小写
        $or: [
            // 多字段同时匹配
            { name: { $regex: keyword, $options: '$i' } }, // 模糊查询姓名
            { cn: { $regex: keyword } },
            { en: { $regex: keyword, $options: '$i' } }
        ]
    }
    let count = 0
    this.User2.countDocuments(_filter, function(err, doc) {
        // 查询总条数（用于分页）
        if (err) {
            console.log(err)
        } else {
            count = doc
        }
    })
    this.User2.find(_filter)
        .limit(10) // 最多显示10条
        .sort({ _id: -1 }) // 倒序
        .exec(function(err, doc) {
            // 回调
            if (err) {
                callback(err)
            } else {
                console.log('查询doc:', doc)
                callback(null, doc) // 查询数据成功回调函数
            }
        })
}

const userModel = new UserModel()
module.exports = userModel