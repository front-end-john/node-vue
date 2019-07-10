import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/install'
import './assets/iconfont/iconfont.js'

Vue.config.productionTip = false
Vue.use(api)

Vue.directive('scroll', {
    // 当绑定元素插入到DOM中
    inserted: (el, binding) => {
        const cb = binding.value
        el.addEventListener('mousewheel', (e) => {
            const direction = e.deltaY > 0 ? 'down' : 'up'
            cb(direction)
        })
    }
})
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')