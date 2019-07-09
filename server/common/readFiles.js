const fs = require('fs')

function readDir(dirPath, fn) {
    let filesArr = []
    let files = fs.readdirSync(dirPath)
    files.forEach((item, index) => {
        let info = fs.statSync(dirPath + item)
        if (info.isDirectory()) {
            readDir(dirPath + item + '/', () => {})
        } else {
            filesArr.push(dirPath + item)
            callback && callback(dirPath + item)
        }
    })
    return filesArr
}
exports.readFiles = (dir, callback) => {
    return readDir(dir)
}