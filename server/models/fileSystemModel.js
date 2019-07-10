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

    getFile({ dir }, callback) {
        dir = `/${dir}`
        fs.readdir(dir, (err, files) => {
            if (err) return callback(err)
            this.readdirCallback(dir, files, callback)
        })
    }

    readdirCallback(dir, files, callback) {
        const fileList = files.map((item) => {
            const info = fs.statSync(`${dir}/${item}`)
            let fileType = ''
            if (info.isDirectory()) {
                fileType = 'folder'
            } else if (info.isFile()) {
                const extName = path.extname(item).substr(1) // 获取文件后缀名
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
            return {
                name: item,
                fileType
            }
        })
        callback(null, fileList)
    }
}

module.exports = new FileSystemModal()