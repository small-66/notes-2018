import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
	  	{
  			path:'/',
  			name: 'Home',
  			meta:{title:'首页'},
  			component: resolve => require(['@/components/Home'],resolve)
  		},
  		{
  			path:'/iamAuntPage',
  			name: 'IamAuntPage',
  			meta:{title:'我是阿姨'},
  			component: resolve => require(['@/components/aunt/IamAuntPage'],resolve)
  		},
  		{
  			path:'/aunt_add_message',
  			name: 'Aunt_add_message',
  			meta:{title:'阿姨自主填写'},
  			component: resolve => require(['@/components/aunt/Aunt_add_message'],resolve)
  		},
  		{
  			path:'/auntList',
  			name: 'AuntList',
  			meta:{title:'精选阿姨'},
  			component: resolve => require(['@/components/aunt/AuntList'],resolve)
  		},
  		{
  			path:'/auntDetails',
  			name: 'AuntDetails',
  			meta:{title:'阿姨详情'},
  			component: resolve => require(['@/components/aunt/AuntDetails'],resolve)
  		},
  		{
  			path:'/serviceList',
  			name: 'ServiceList',
  			meta:{title:'优质服务'},
  			component: resolve => require(['@/components/service/ServiceList'],resolve)
  		},
  		{
  			path:'/serviceDetails',
  			name: 'ServiceDetails',
  			meta:{title:'服务详情'},
  			component: resolve => require(['@/components/service/ServiceDetails'],resolve)
  		},
  		{
  			path:'/demandList',
  			name: 'DemandList',
  			meta:{title:'客户需求'},
  			component: resolve => require(['@/components/demand/DemandList'],resolve)
  		},
  		{
  			path:'/demandDetails',
  			name: 'DemandDetails',
  			meta:{title:'需求详情'},
  			component: resolve => require(['@/components/demand/DemandDetails'],resolve)
  		},
  		{
  			path:'/iamCustomer',
  			name: 'IamCustomer',
  			meta:{title:'我是客户'},
  			component: resolve => require(['@/components/customer/IamCustomer'],resolve)
  		},
  		{
  			path:'/customerMessagePage',
  			name: 'CustomerMessagePage',
  			meta:{title:'客户信息'},
  			component: resolve => require(['@/components/customer/CustomerMessagePage'],resolve)
  		},
  		{
  			path:'/customerCenter',
  			name: 'CustomerCenter',
  			meta:{title:'客户中心'},
  			component: resolve => require(['@/components/memberCenter/CustomerCenter'],resolve)
  		},
  		{
  			path:'/auntCenter',
  			name: 'AuntCenter',
  			meta:{title:'阿姨中心'},
  			component: resolve => require(['@/components/memberCenter/AuntCenter'],resolve)
  		},
  		
/*  		{
  			path:'/modityPwd',
  			name: 'ModityPasswd',
  			meta:{title:'修改密码'},
  			component: resolve => require(['@/components/memberCenter/ModityPasswd'],resolve)
  		},*/
  		{
  			path:'/resetPwd',
  			name: 'ResetPwd',
  			meta:{title:'重置密码'},
  			component: resolve => require(['@/components/memberCenter/ResetPwd'],resolve)
  		},
  		{
  			path:'/loginPage',
  			name: 'loginPage',
  			meta:{title:'登录'},
  			component: resolve => require(['@/components/LoginPage'],resolve)
  		},
  		{
  			path:'/register',
  			name: 'register',
  			meta:{title:'注册'},
  			component: resolve => require(['@/components/register'],resolve)
  		},
  		{
  			path:'/forget_password',
  			name: 'Forget_password',
  			meta:{title:'忘记密码'},
  			component: resolve => require(['@/components/Forget_password'],resolve)
  		},
  		{
  			path:'/modify_password',
  			name: 'Modify_password',
  			meta:{title:'修改密码'},
  			component: resolve => require(['@/components/Modify_password'],resolve)
  		},
  		{
  			path:'/contactUs',
  			name: 'ContactUs',
  			meta:{title:'联系我们'},
  			component: resolve => require(['@/components/ContactUs'],resolve)
  		},
  		{
  			path:'/feedBack',
  			name: 'FeedBack',
  			meta:{title:'评价阿姨'},
  			component: resolve => require(['@/components/aunt/FeedBack'],resolve)
  		}
  		
  ]
})
