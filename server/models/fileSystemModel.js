const fs = require('fs')
class FileSystemModal {
    constructor() {}

    getFile({ fileUrl }, callback) {
        fs.readdir(fileUrl, (err, doc) => {
            if (err) return callback(err)
            callback(null, doc)
        })
    }
}

module.exports = new FileSystemModal()