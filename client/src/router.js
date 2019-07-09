import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import File from './views/File'
Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/File',
            name: 'File',
            component: File
        }
    ]
})