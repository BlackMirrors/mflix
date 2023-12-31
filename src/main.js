// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VBodyScrollLock from 'v-body-scroll-lock'

import router from './router'

Vue.config.productionTip = false
Vue.use(VBodyScrollLock)


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(require('./App.vue').default)
})
