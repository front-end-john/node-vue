import api from '../index'
import urls from './urls'

const header = null // 有些接口需要在header中添加token或是其他，可以按如下配置。

const { getFile } = urls.fileSystem
export default {
    getFile(params) {
        // return 出去了一个promise
        return api.get(getFile, params, header)
    }
}