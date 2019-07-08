const express = require('express')
const router = express.Router()
const user = require('../controllers/userManager')

/* GET users listing. */
router.get('/', function(req, res, next) {
    // http://localhost:3000/users
    res.send('respond with a resource')
})

// http://localhost:3000/user/queryByAll

/* 模拟get、post请求
 * get: curl http://localhost:3000/user/addUser
 * querySting: curl http://localhost:3000/user/addUser -x POST -d "name=admin&password=123456"
 * json: curl http://localhost:3000/user/addUser -X POST -H "Content-Type:application/json" -d '{"name":"admin","password":"123456"}'
 * */

router.get('/queryByAll', user.queryByAll)
router.post('/addUser', user.addUser)
router.delete('/deleteUser', user.deleteUser)
router.post('/updateUser', user.updateUser)
router.get('/queryUser', user.queryUser)

module.exports = router