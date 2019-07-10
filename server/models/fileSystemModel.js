const fs = require('fs')
    // const readFiles = require('../common/readFiles')
const path = require('path')
const async = require('async')
    // const EventProxy = require('eventproxy')
    // const ep = new EventProxy()

const getFileType = (extName) => {
    let type = ''
    switch (extName) {
        case 'jpg':
        case 'png':
        case 'psd':
        case 'txt':
        case 'zip':
        case 'pdf':
        case 'ai':
        case 'gif':
        case extName.includes('ppt'):
        case extName.includes('htm'):
            type = extName
            break
        case 'wmv':
        case 'mp4':
            type = 'video'
            break
        case 'mp3':
            type = 'mp'
            break
        case extName.includes('doc'):
            type = 'word'
            break
        case extName.includes('xsl'):
            type = 'excel'
        default:
            type = 'white'
            break
    }
    return type
}
class FileSystemModal {
    constructor() {}

    getFile({ drive, dir }, callback) {
        // dir = new URL(`file:///${drive}:/${dir}`)
        dir = `/${dir}`
        console.log('dir:', dir)
        fs.readdir(dir, (err, files) => {
            if (err) return callback(err)
            this.readdirCallback(dir, files, callback)
        })
    }

    readdirCallback(dir, files, callback) {
        let fileList = []

        async.forEachOf(
            files,
            (value, key, done) => statCallback(value, done),
            (err) => {
                //for之后执行的函数
                if (err) console.error(err.message)
                callback(null, fileList)
            }
        )

        function statCallback(value, done) {
            fs.stat(`${dir}/${value}`, (err, info) => {
                // stat 不支持增加驱动器盘符访问获取文件info
                if (err) return callback(err)
                let fileType = ''
                if (info.isDirectory()) {
                    fileType = 'folder'
                } else if (info.isFile()) {
                    const extName = path.extname(value).substr(1) // 获取文件后缀名
                    fileType = getFileType(extName)
                } else if (info.isBlockDevice()) {
                    fileType = 'isBlockDevice'
                } else if (info.isCharacterDevice()) {
                    fileType = 'isCharacterDevice'
                } else if (info.isFIFO()) {
                    fileType = 'isFIFO'
                } else if (info.isSocket()) {
                    fileType = 'isSocket'
                } else if (info.isSymbolicLink()) {
                    fileType = 'isSymbolicLink'
                }
                fileList.push({
                    name: value,
                    fileType
                })
                done() //通知for本循环完成
            })
        }
    }
}

module.exports = new FileSystemModal()