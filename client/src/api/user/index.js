import api from '../index'
import urls from './urls'

const header = null // 有些接口需要在header中添加token或是其他，可以按如下配置。

const { queryByAll, addUser, deleteUser, updateUser, queryUser } = urls.user
export default {
    queryByAll(params) {
        // return 出去了一个promise
        return api.get(queryByAll, params, header)
    },
    addUser(data) {
        return api.post(addUser, null, header, data)
    },
    deleteUser(params) {
        return api.delete(deleteUser, params, header)
    },
    updateUser(data) {
        // 发送post请求
        return api.post(updateUser, null, header, data)
    },
    queryUser(params) {
        // 发送get请求
        return api.get(queryUser, params, header)
    }
}