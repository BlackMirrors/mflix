import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Menu',
			components: {
				default: require('../components/HelloWorld.vue').default,
				navbar: require('../components/navbar.vue').default
			}
		},
		{
			path: '/login',
			name: 'login',
			components: {
				default: require('../components/HelloWorld.vue').default,
				navbar: require('../components/navbar.vue').default,
				modal_login: require('../components/modal_login.vue').default
			}
		},
		{
			path: '/browse',
			name: 'Browse',
			components: {
				navbar: require('../components/navbar.vue').default,
				Browse: require('../components/browse.vue').default
			}
		},
		{
			path: '/browse',
			name: 'BrowseSkeleton',
			components: {
				navbar: require('../components/navbar.vue').default,
				Browse: require('../components/browse.vue').default
			}
		},
		{
			path: '/mylist',
			name: 'myList',
			components: {
				navbar: require('../components/navbar.vue').default,
				myList: require('../components/myList.vue').default
			}
		},
		{
			path: '*',
			name: 'default',
			components: {
				navbar: require('../components/HelloWorld.vue').default,
				navbar: require('../components/navbar.vue').default
			}
		}
	],
	 linkActiveClass: "active", 
  linkExactActiveClass: "active",
  inactiveClass: "nonActive",
  scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}

})
