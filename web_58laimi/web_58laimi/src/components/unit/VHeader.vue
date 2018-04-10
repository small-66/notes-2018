<template>
	<el-row>
		<el-col :span="24">
			<el-col :span="24">
				
				<h2 style="line-height: 28px; border-bottom: 1px solid #f0f0f0; background: #fafafa;">
					<div class="header">
						<nav>
							<a class="header_tag" href="javascript:;">
							    手机版<i class="el-icon-arrow-down el-icon--right"></i>
						  	</a>
						  	<!--<a class="header_tag" href="javascript:;">
							    小程序<i class="el-icon-arrow-down el-icon--right"></i>
						  	</a>-->
						  	<el-dropdown trigger="click">
						      	<a class="header_tag el-dropdown-link" href="javascript:;">
					        		小程序<i class="el-icon-arrow-down el-icon--right"></i>
						      	</a>
						      	<el-dropdown-menu slot="dropdown">
							        <el-dropdown-item>
							        	<img src="../../../static/img/small_2.jpg"/>
							        </el-dropdown-item>
						      	</el-dropdown-menu>
						    </el-dropdown>
						  	
						  	<el-dropdown >
						      	<a class="header_tag el-dropdown-link" href="javascript:;">
					        		公众号<i class="el-icon-arrow-down el-icon--right"></i>
						      	</a>
						      	<el-dropdown-menu slot="dropdown">
							        <el-dropdown-item>
							        	<img src="../../../static/img/wx.jpg"/>
							        </el-dropdown-item>
						      	</el-dropdown-menu>
						    </el-dropdown>
						  	
						  	<!--<a class="header_tag" href="javascript:;">
							    公众号<i class="el-icon-arrow-down el-icon--right"></i>
						  	</a>-->
						  	<!--<a class="header_tag header_tag_text" href="/loginPage">会员登录</a>-->
						  	<router-link  class="header_tag header_tag_text"  :to="{path:'/loginPage',query:{employee_id:employee_id,company_id:company_id}}">
									会员登录
							</router-link>
							<router-link  class="header_tag header_tag_text"  :to="{path:'/register',query:{employee_id:employee_id,company_id:company_id}}">
									快速注册
							</router-link>
							<router-link  class="header_tag header_tag_text"  :to="{path:'/contactUs',query:{employee_id:employee_id,company_id:company_id}}">
									联系我们<i class="el-icon-arrow-down el-icon--right"></i>
							</router-link>
						</nav>
						
					</div>
				</h2>
				
			</el-col>
			<header class="header">
				<el-row>
					<el-col :span="6" class="logo">
						<h1>{{companyMessage.company_name}}</h1>
					</el-col>
					<el-col :span="16" class="h-wrap">
						<el-menu :default-active="this.$store.state.navHeader" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#fff" text-color="#000" active-text-color="#ffd04b">
							<el-menu-item :index="item.index" v-for="item in navList" :key="item.index">{{item.title}}</el-menu-item>
							<!--<el-submenu index="2">
								<template slot="title">我的工作台</template>
								<el-menu-item index="2-1">选项1</el-menu-item>
								<el-menu-item index="2-2">选项2</el-menu-item>
								<el-menu-item index="2-3">选项3</el-menu-item>
								<el-submenu index="2-4">
							  		<template slot="title">选项4</template>
							  		<el-menu-item index="2-4-1">选项1</el-menu-item>
							  		<el-menu-item index="2-4-2">选项2</el-menu-item>
							  		<el-menu-item index="2-4-3">选项3</el-menu-item>
								</el-submenu>
							</el-submenu>
							<el-menu-item index="3" disabled>消息中心</el-menu-item>
							<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
						</el-menu>
					</el-col>
				</el-row>

			</header>
		</el-col>
	</el-row>

</template>

<script>
	export default {
		computed: {},
		data() {
			return {
				company_id:'',
				employee_id:'',
				companyMessage:{},
				navList: [{
						index: '1',
						title: '首页'
					},
					{
						index: '2',
						title: '精选阿姨'
					},
					{
						index: '3',
						title: '优质服务'
					},
					{
						index: '4',
						title: '客户需求'
					},
					{
						index: '5',
						title: '我是阿姨'
					},
					{
						index: '6',
						title: '我是客户'
					}
				]

			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init(){
				this.company_id = this.$route.query.company_id;
				this.employee_id = this.$route.query.employee_id;
				
				console.log(this.$store.state.navHeader)
				let programs = {
					company_id: this.$route.query.company_id,
					employee_id: this.$route.query.employee_id
				}
				this.$http.post(process.env.API_HOST + '/homeController/selectPermissionCompanyByCompanyId', programs).then(response => {
					//console.log(response)
					let res = response.data;
					if(res.true) {
						this.companyMessage = res.data.comPanyDetails;
					}
				})
			},
			handleSelect(key, keyPath) {
			 	this.$store.commit("switch", key);
				console.log(key, keyPath);
				switch (key){
					case '1':
						this.$router.push({
							path:'/',
							query:{
								company_id: this.company_id,
								employee_id: this.employee_id
							}
						})
						break;
					case '2':
						this.$router.push({
							path:'/auntList',
							query:{
								company_id: this.company_id,
								employee_id: this.employee_id
							}
						})
						break;
					case '3':
						this.$router.push({
							path:'/serviceList',
							query:{
								company_id: this.company_id,
								employee_id: this.employee_id
							}
						})
						break;
					case '4':
						this.$router.push({
							path:'/demandList',
							query:{
								company_id: this.company_id,
								employee_id: this.employee_id
							}
						})
						break;
					case '6':
						this.$router.push({
							path:'/iamCustomer',
							query:{
								company_id: this.company_id,
								employee_id: this.employee_id
							}
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style>
	.header nav{
		width: 50%;
		float: right;
	}
	.header .header_tag{
		display: inline-block;
		font-size: 12px;
		color: #7d9ab6;
		line-height: 28px;
	}
	.header .header_tag_text{
		color: #999;	
	}
	.header_tag i{
		margin-left: 8px;
	}
	
	.el-menu-demo {
		border: none !important;
	}
	.header{
		width: 1202px;
		margin: 0 auto;
		overflow: hidden;
	}
	.header .logo h1 {
		font-size: 23px !important;
		line-height: 90px !important;
	}
	.h-wrap{
		margin-top: 15px;
		float: right;
	}
	
	
	.boxs_service .el-tabs__nav{
		transform: translateX(250%) !important;
	}
	
	/*.el-dropdown-menu__item img{
		width: 140px;
		height: 140px;
	}*/
</style>