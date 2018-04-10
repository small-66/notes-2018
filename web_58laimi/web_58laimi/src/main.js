// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import AMap from 'AMap'

Vue.use(Vuex)
Vue.use(ElementUI)

Vue.prototype.$http = axios;
Vue.config.productionTip = false


import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://58laimi.oss-cn-zhangjiakou.aliyuncs.com/resouce/img.jpg',
  loading: 'static/dist/loading.gif',
  attempt: 1
})

router.beforeEach(function(to, from, next) {
	/*console.log(to,'dfhdsjh')*/
	if (to.query.title) {
		document.title = to.meta.title + to.query.title
	} else {
		document.title = to.meta.title 
	}

	next()
})



const store = new Vuex.Store({
  state:{
    navHeader:'1'
  },
  mutations:{
    change: function(state){
    },
    switch (state, payload) {
      state.navHeader = payload
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
