import axios from './axios' // 统一封装的axios

let instance = axios()
    // const ERR_OK = 200

export default {
    get(url, params, headers) {
        let options = {}

        if (params) {
            options.params = params
        }
        if (headers) {
            options.headers = headers
        }
        return instance.get(url, options)
    },

    post(url, params, headers, data) {
        let options = {}

        if (params) {
            options.params = params
        }
        if (headers) {
            options.headers = headers
        }
        return instance.post(url, data, options)
    },
    put(url, params, headers) {
        let options = {}

        if (headers) {
            options.headers = headers
        }
        return instance.put(url, params, options)
    },
    delete(url, params, headers) {
        let options = {}

        if (params) {
            options.params = params
        }
        if (headers) {
            options.headers = headers
        }
        return instance.delete(url, options)
    }
}