<template>
	<div>
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
			</div>
			<section class="cell_box_center">
				<div class="boxs_center">
					<a href="javascript:;" class="btn_a" @click="quit">退出账号</a>
					<div class="title_center">
						<div class="img_center">
							<img src="http://58laimi.oss-cn-zhangjiakou.aliyuncs.com/resouce/img.jpg"/>
						</div>
						<div class="message_center">
							<h3>{{auntMessage.customer_name}}</h3>
							<p>{{auntMessage.customer_mobile}}</p>
							<p>{{auntMessage.customer_live_place}}</p>
						</div>
					</div>
					<div class="btn_box">
						<el-button  plain @click="toModityPwd(auntMessage.user_id)">修改密码</el-button>
				   		<el-button type="success" @click="toAddDemand">发布需求</el-button>
					</div>
				</div>
			</section>
			<section style="background: #fff;">
				<div class="boxs_center" style="text-align: left;">
					<ul class="demand_list">
						<li v-for="item in demandList">
							<div>
								<h2>{{item.demand_title}}</h2>
								<h3>工作地址：<strong>{{item.demand_location}}</strong></h3>
								<!--<span class="status_demand">正在招聘</span>-->
								<span class="status_demand" :class="{'notAudit':item.demand_status=='未审核','finish':item.demand_status=='已完成'}">{{item.demand_status}}</span> 
								<h4><span>400-4500</span>元</h4>
								<!--<h4>薪资面议</h4>-->
								<el-button type="success" plain @click="toDetails(item)">查看详情</el-button>
							</div>
						</li>
						
					</ul>
				</div>
				<div style="margin: 40px 0;">
					<el-button type="success" @click="backHome">返回首页</el-button>
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
        		auntMessage: {},
        		demandList: [],
        		
        		company_id: '',
				employee_id: '',
				aunt_customer_id: '',
				customer_id: '',
        		
			}
		},
		mounted() {
			this.$store.commit("switch", '');
			
			this.queryMessage();
			this.queryDemand();
		},
		methods: {
			queryMessage() {
				console.log(this.$route.query.user_id, 'ssssssssssssssssssss');
				this.$http.post(process.env.API_HOST + '/homeController/vipDetils', {
					user_id: this.$route.query.user_id
				}).then(response => {
					console.log(response, "详情")
					let res = response.data;
					if(res.true) {
						this.aunt_customer_id = res.data.aunt_customer_id;
						this.company_id = res.data.company_id;
						this.employee_id = res.data.employee_id;
					}
				})
			},
			queryDemand() {
				this.customer_id = this.$route.query.aunt_customer_id || this.$route.query.customer_id;
				this.$http.post(process.env.API_HOST + '/websiteCustomerController/customerDetails', {
					customer_id: this.customer_id
				}).then(response => {
					console.log(response, 'message')
					let res = response.data;
					if(res.true) {
						this.auntMessage = res.data;
						this.demandList = res.data.customer_demand_Pos
						this.demandList.forEach(item => {
							switch(item.demand_status) {
								case "0":
									item.demand_status = '正在招聘'
									break;
								case "1":
									item.demand_status = '已完成'
									break;
								case "2":
									item.demand_status = '未审核'
									break;
								default:
									break;
							}
						})
					}
				})
			},
			toModityPwd(user_id){
				this.$router.push({
		    		path:'/modify_password',
		    		query: {
		    			user_id: user_id,
						company_id: this.$route.query.company_id,
						employee_id: this.$route.query.employee_id
		    		}
		    	})
			},
			toAddDemand(){
				this.$router.push({
					path: '/iamCustomer',
					query: {
						company_id: this.$route.query.company_id,
						employee_id: this.$route.query.employee_id,
						aunt_customer_id: this.$route.query.aunt_customer_id,
						user_id:this.$route.query.user_id
					}
				})
			},
			toDetails(item){
		    	this.$router.push({
		    		path:'/demandDetails',
		    		query: {
		    			demand_id: item.demand_id,
		    			company_id: this.$route.query.company_id,
						employee_id: this.$route.query.employee_id
		    		}
		    	})
		   },
		   quit(){
				this.$http.post(process.env.API_HOST + '/homeController/loginSignOut',{}).then(response=>{
					console.log(response)
					let res = response.data;
					if(res.true){
						this.$router.push({
							path: '/',
							query: {
								company_id: this.$route.query.company_id,
								employee_id: this.$route.query.employee_id
							}
						})
					}
				})
			},
			backHome(){
				this.$router.push({
					path:'/',
					query:{
						company_id:this.$route.query.company_id,
						employee_id:this.$route.query.employee_id
					}
				});
			},
		}
	}
</script>

<style scoped>
	.cell_box_center{
		background: #f5f5f5;
		overflow: hidden;
		position: relative;
		padding: 20px 0;
	}
	.boxs_center{
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		background: #fff;
		padding-top: 29px;
	}
	.btn_a{
		position: absolute;
		top: 40px;
		right: 40px;
		font-size: 13px;
		line-height: 1;
		letter-spacing: 2px;
		color: #1aad19;
	}
	.title_center{
		width: 100%;
		height: 120px;
		display: flex;
		justify-content: center;
	}
	.img_center{
		width: 120px;
		height: 120px;
		box-sizing: border-box;
		border: 1px solid #cacaca;
		border-radius: 50%;
		overflow: hidden;
	}
	.img_center img{
		width: 120px;
		height: 120px;
	}
	
	.message_center{
		padding-left: 30px;
		text-align: left;
	}
	.message_center h3{
		letter-spacing: 4px;
		font-size: 30px;
		color: #3f3f3f;
		line-height: 50px;
	}
	.message_center p{
		font-size: 13px;
		line-height: 32px;
	}
	
	.btn_box{
		padding: 20px 0;
		
	}
	
	
	
	
	.demand_list{
		overflow: hidden;
	}
	.demand_list li{
		float: left;
		width: 30%;
		border: 1px solid #e2e2e2;
		margin: 30px 30px 0 0;
		font-family: "宋体";
		text-align: center;
	}
	.demand_list .status_demand{
		font-size: 13px;
		color: #1aad19;
	}
	.demand_list .notAudit{
		color: #ff7e26;
	}
	.demand_list div{
		padding: 20px 60px;
	}
	.demand_list h2{
		line-height: 46px;
		font-size: 22px;
		color: #3f3f3f;
	}
	.demand_list h3{
		line-height: 24px;
		font-size: 13px;
		color: #747474;
	}
	.demand_list h4{
		line-height: 59px;
		font-size: 13px;
		color: #747474;
	}
	.demand_list h4 span{
		color: #1aad19;
		font-size: 22px;
	}
</style>