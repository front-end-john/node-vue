import api from '../index'
import urls from './urls'

const header = {}

export default {
  matches(params) {
    // return 出去了一个promise
    return api.get(urls.matches, params, header)
  }
}
