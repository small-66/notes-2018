<template>
	<div>
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
			</div>
			<section class="cell_box">
				<div class="boxs">
					<h2 class="title_customer">您需要什么服务?</h2>
					<el-col :span="20" :offset="4">
						<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#fff" text-color="#000" active-text-color="#ffd04b">
							<el-menu-item :index="item.index" v-for="item in navList" :key="item.index">{{item.title}}</el-menu-item>
						</el-menu>
					</el-col>
					<el-col :span="24" v-for="(item,index) in list2" :key="index">
						<div  v-if="activeIndex==index">
							<ul class="service_list">
								<li  v-for="em in item.basic_data_service_types">
									<h2>
										<span>{{em.bdst_value}}</span>
									</h2>
									<ul class="service_list_section btn_group">
										<li v-for="i in em.basic_data_services" ><el-radio v-model="serviceChange" :label="i">{{i.bdji_name}}</el-radio></li>
									</ul>
								</li>
								
							</ul>
						</div>
						
					</el-col>
					<el-button type="primary" @click="next">下一步</el-button>
				</div>

			</section>
			
			<div style="background: #fff;">
				<v-footer></v-footer>
			</div>
		</div>

	</div>
</template>

<script>
	import VHeader from '@/components/unit/VHeader'
	import VFooter from '@/components/unit/VFooter'
	export default {
		components: {
			VHeader,
			VFooter
		},
		data() {
			return {
				activeIndex: '0',
				navList: [],
				list2:[],
				serviceChange:''
			}
		},
		mounted() {
			this.$store.commit("switch", '6');
			
			this.queryServices();
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				console.log(this.activeIndex);
				this.activeIndex = key;
			},
			next(){
				console.log(this.serviceChange)
				
				let str = JSON.stringify(this.serviceChange)
		      	localStorage.setItem('chooseServiceH5',str)
		      	
		      	/*this.$router.push({
		      		path:'/customerMessagePage',
		      		query:{
		      			company_id : this.$route.query.company_id,
						employee_id: this.$route.query.employee_id,
						aunt_customer_id: this.$route.query.aunt_customer_id,
						user_id:this.$route.query.user_id
		      		}
		      	})*/
				
				
				this.$router.push({
					path:'/customerMessagePage',
					query:{
						company_id : this.$route.query.company_id,
						employee_id: this.$route.query.employee_id,
						aunt_customer_id: this.$route.query.aunt_customer_id,
						user_id:this.$route.query.user_id
					}
				})
			},
			queryServices() {
				this.list2 = [];
				this.$http.post(process.env.API_HOST + '/websiteDataListController/selectOneLevel',{
					company_id: this.$route.query.company_id
				}).then(response => {
						console.log(response,'list2');
						let res = response.data
						if(res.true) {
							console.log(res)
							this.list2 = res.data
							this.list2.forEach((item,index)=>{
								this.navList.push({
									index: index+'',
									title: item.bdst_value
								})		
							})
							
						}
					})
			},
		}
	}
</script>

<style>
	.title_customer{
		line-height: 74px;
		font-size: 22px;
		color: #3f3f3f;
		font-family: "宋体";
		letter-spacing: 2px;
	}
	
	
	.cell_box{
		background: #f5f5f5;
		overflow: hidden;
		position: relative;
		padding: 9px 0 30px;
	}
	.boxs{
		background: #fff;
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		padding-bottom: 40px;
	}
	.service_list{
		padding:45px 0 0 30px;
	}
	.service_list h2{
		font-size:16px;
		color:#00a10a;
		overflow:hidden;
		line-height:28px;	
	}
	.service_list  h2 span{
		float:left;
	}
	.service_list_section{
		overflow: hidden;
	}
	.service_list_section li{
		float: left;
		width:134px;
		text-align: left;
		line-height:25px;
		margin-bottom: 40px;
		color: #636363;
	}
	
	.service_list>li:last-child{
		border-bottom:  1px solid #f5f5f5;
		margin-bottom: 80px;
	}
	
	
	
	.btn_group{
		text-align: left;
	}
	.btn_group .is-checked{
		background: #fff url(../../assets/img/checked.png) no-repeat 100% 100% !important;
		background-size: 14px 14px !important;
    	border-color: #1aad19 !important;
	}
	.btn_group .el-radio__label{
		border: 1px solid #c9c9c9 !important;
		line-height: 34px !important;
		display: inline-block !important;
	    padding: 0 10px !important;
	}
	.btn_group .el-radio__input.is-checked+.el-radio__label{
		color: #00A10A !important;
		border: 1px solid #00A10A !important;
		line-height: 34px !important;
		display: inline-block !important;
	}
	.btn_group .el-radio__input{
		display: none !important;
	}
	
</style>