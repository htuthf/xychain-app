import '@/plugins/polyfills.js' // ✅ 第一行，不能有任何 import 在前面

import Vue from 'vue'

import uView from 'uni_modules/uview-ui/index.js'
Vue.use(uView)

import App from './App'
import store from "./store";
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()