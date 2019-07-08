import axios from 'axios'
import qs from 'qs'

const TYPE_FORM = 'application/x-www-form-urlencoded;charset=UTF-8'
const TYPE_JSON = 'application/json;charset=utf-8'
    // 创建 axios 实例
let instance = axios.create({
    // 使用自定义配置新建一个 axios 实例
    // headers: {'Content-Type: 'application/json'},
    timeout: 60000
        // withCredentials: true
})

// 设置 post、put、delete 跨域请求 Content-Type为 TYPE_FORM
instance.defaults.headers.post['Content-Type'] = TYPE_FORM
instance.defaults.headers.delete['Content-Type'] = TYPE_FORM
instance.defaults.headers.put['Content-Type'] = TYPE_FORM

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        const { method, data } = config
        if (method === 'post' || method === 'put') {
            // post 、 put 提交时，将对象转换为a=a&b=b，为处理后台解析问题
            console.log('接口data:', data)
            config.data = qs.stringify(data)
            console.log('config.data:', config.data)
        }
        // 请求发送前进行处理
        return config
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        let info = {}
        if (!error.response) {
            info = {
                code: 500,
                msg: 'Network Error'
            }
        } else {
            const { status, statusText, data } = error.response
                // 此处整理错误信息格式
            info = {
                data,
                code: status,
                msg: statusText
            }
        }
    }
)

/*
 * 创建统一封装的axios 实例
 * @return {AxiosInstance}
 */
export default function() {
    return instance
}