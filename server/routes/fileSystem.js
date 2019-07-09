const express = require('express')
const router = express.Router()
const fileSystem = require('../controllers/fileSystemManager')

router.get('/getFile', fileSystem.getFile)

module.exports = router