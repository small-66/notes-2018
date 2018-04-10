<template>
	<div>
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
			</div>
			<section class="cell_box_center">
				<div class="boxs_center">
					<a href="javascript:;" class="btn_a"  @click="quit">退出账号</a>
					<div class="title_center">
						<div class="img_center">
							<img src="http://58laimi.oss-cn-zhangjiakou.aliyuncs.com/resouce/img.jpg"/>
						</div>
						<div class="message_center">
							<h3>{{auntMessage.user_name}}</h3>
							<p>{{auntMessage.user_mobile}}</p>
							<p>{{auntMessage.user_location}}</p>
						</div>
					</div>
					<div class="btn_box">
						<el-button  plain @click="toModityPwd(auntMessage.user_id)">修改密码</el-button>
				  		<el-button type="success" plain>编辑信息</el-button>
				   		<el-button type="success" @click="">我的名片</el-button>
					</div>
				</div>
			</section>
			<section style="background: #fff;">
				<div class="boxs_center_aunt" style="text-align: left;">
					<h2>我的详细信息</h2>
					
					<dl class="housekeepingTop">
						<dt>
	                    	<img :src="photograph_loc">
	                  	</dt>
						<dd>
							<div>
								<h2 class="aunt_name">{{ auntInfo.aunt_name }}</h2>
							</div>
							<ul class="tags clearfix">
								<li v-if="auntInfo.aunt_work_experience">{{ auntInfo.aunt_work_experience }}经验</li>
								<li v-if="auntInfo.aunt_age">{{ auntInfo.aunt_age }}岁</li>
								<li v-if="auntInfo.province">{{ auntInfo.province }}人</li>
							</ul>
							<dl class="aunt_service" v-if="auntInfo.aunt_job_intention_endpoint">
								<dt>意向：</dt>
								<!--<dd>
									<span v-for="service in auntInfo.bdji_service_name">{{ service }}</span>
								</dd>-->
								<dd>
									<span v-for="service in auntInfo.aunt_job_intention_endpoint">{{ service.bdji_service_name }}</span>
								</dd>
							</dl>
							<dl class="aunt_service" v-if="auntInfo.aunt_credentials">
								<dt>证书：</dt>
								<!--<dd>
									<span v-for="item in auntInfo.bdc_name">{{ item }}</span>
								</dd>-->
								<dd>
									<span v-for="item in auntInfo.aunt_credentials">{{ item.bdc_name }}</span>
								</dd>
							</dl>
						</dd>
						<dd class="salary">
							<div>
								<h2 v-if="auntInfo.aunt_salary_begin">期望薪资</h2>
								<h2 v-else>薪资面议</h2>
							</div>
							<ul>
								<li v-if="auntInfo.aunt_salary_begin && auntInfo.aunt_salary_end">
									<span>{{ auntInfo.aunt_salary_begin }}</span><span v-if="auntInfo.aunt_salary_begin !== auntInfo.aunt_salary_end">-{{ auntInfo.aunt_salary_end }}</span>元</li>
								<li v-else-if="auntInfo.aunt_salary_begin && !auntInfo.aunt_salary_end">
									<span>{{ auntInfo.aunt_salary_begin }}</span>元起</li>
								<li v-else-if="!auntInfo.aunt_salary_begin && auntInfo.aunt_salary_end"><span>0-{{ auntInfo.aunt_salary_end}}</span>元</li>

							</ul>
							<el-button plain @click="toAuntDetails(auntInfo)">查看详情</el-button>
						</dd>
					</dl>
					
					
					
				</div>
				<div style="margin: 40px 0;">
					<el-button type="success" @click="toHome" >返回首页</el-button>
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
				company_id:'',
				employee_id: '',
				auntMessage:{},
        		auntInfo:{},
        		photograph_loc:'',
        		defaultImg:'http://58laimi.oss-cn-zhangjiakou.aliyuncs.com/resouce/img.jpg'
        		
			}
		},
		mounted() {
			this.$store.commit("switch", '');
			
			this.queryMessage();
			this.qyeryAuntDetail();
		},
		methods: {
			toModityPwd(user_id){
				this.$router.push({
					path:'/modify_password',
					query:{
						user_id: user_id,
						company_id: this.$route.query.company_id,
	    				employee_id: this.$route.query.employee_id
					}
				})
			},
			toDetails(){
		    	this.$router.push({
		    		path:'/demandDetails',
		    		query: {
		    			demand_id: '123'
		    		}
		    	})
		   },
		   toAuntDetails(item){
				console.log(item)
				this.$router.push({
					path:'/auntDetails',
					query:{
						aunt_id: item.aunt_id,
						company_id: this.company_id,
						employee_id: this.employee_id
					}
				})
			},
		   toHome () {
	    		this.$router.push({
	    			path:'/',
	    			query:{
	    				company_id: this.$route.query.company_id,
	    				employee_id: this.$route.query.employee_id
	    			}
	    		})
	    	},
	    	queryMessage(){
				this.$http.post(process.env.API_HOST + '/homeController/vipDetils',{user_id:this.$route.query.user_id}).then(response=>{
					console.log(response,"名片")
					let res = response.data;
					if(res.true){
						this.company_id = res.data.company_id;
						this.employee_id = this.$route.query.employee_id;
						this.auntMessage = res.data;
						console.log('员工ID',this.employee_id,'阿姨信息',this.auntMessage);
					}
				})
			},
			qyeryAuntDetail(){
				
				this.$http.post(process.env.API_HOST + '/websiteAuntController/selectAuntInfomationDetailByAuntId',{aunt_id:this.$route.query.aunt_customer_id}).then(response=>{
					console.log(response,"ay")
					let res = response.data;
					if(res.true){
						this.auntInfo = res.data;
						this.aunt_is_checkout = res.data.aunt_is_checkout;
						this.photograph_loc = res.data.aunt_avatar.photograph_loc ? res.data.aunt_avatar.photograph_loc : this.defaultImg
						console.log(this.auntInfo);

						/*this.imgList = []
						this.imgList.push({
							src: res.data.aunt_avatar.photograph_loc ? res.data.aunt_avatar.photograph_loc : this.defaultImg
						})*/

						switch (res.data.aunt_salary_unit+''){	
							case '0':
								res.data.aunt_salary_unit='小时'
								break;
							case '1':
								res.data.aunt_salary_unit='天'
								break;
							case '2':
								res.data.aunt_salary_unit='周'
								break;
							case '3':
								res.data.aunt_salary_unit='月'
								break;
							case '4':
								res.data.aunt_salary_unit='年'
								break;
							default:
								break;
						}

						console.log(this.auntInfo,'auntiInfo')
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
			}
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
		margin-bottom: 20px;
	}
	.boxs_center_aunt{
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		background: #fff;
	}
	.boxs_center_aunt h2 {
		line-height: 79px;
		text-align: center;
		font-size: 22px;
		font-family: "宋体";
		color: #3f3f3f;
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
	.demand_list .isNo{
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
	
	
	
	.boxs_center_aunt .housekeepingTop {
		overflow: hidden;
		padding: 30px;
		border: 1px solid #e2e2e2;
	}
	
	.housekeepingTop>dt {
		float: left;
		width: 120px;
		height: 120px;
		border: 1px solid #e2e2e2;
	}
	
	.housekeepingTop dt>img {
		width: 120px;
		height: 120px;
	}
	
	.housekeepingTop dd {
		float: left;
		margin-left: 30px;
	}
	
	.boxs_center_aunt .aunt_name {
		text-align: left;
		font-size: 22px;
		color: #1aad19;
	}
	
	.housekeepingTop .tags {
		display: inline-block;
		overflow: hidden;
		color: #7d9ab6;
		font-size: 12px;
		height: 24px;
		line-height: 24px;
		border-radius: 5px;
	}
	
	.housekeepingTop .tags li {
		float: left;
		margin-right: 20px;
		padding: 0 20px;
		background: rgba(237, 244, 250, .8);
	}
	
	.aunt_service {
		overflow: hidden;
		line-height: 24px;
	}
	
	.aunt_service dt {
		color: #1AAD19;
	}
	
	.aunt_service dt,
	.aunt_service dd {
		float: left;
	}
	
	.aunt_service span:after {
		content: '|';
		padding: 0 18px;
	}
	
	.aunt_service span:last-of-type:after {
		content: '';
	}
	
	.housekeepingTop .salary {
		float: right;
		margin-right: 30px;
		text-align: center;
	}
	.salary h2 {
		font-size: 16px;
		line-height: 30px;
		font-weight: 500;
	}
	
	.salary li span {
		display: inline-block;
		font-size: 20px;
		line-height: 34px;
		color: #1aad19;
	}
	
</style>