<template>
	<div>
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
			</div>
			<section class="cell_box_center">
				<div class="boxs_center_feed">
					<h2>请留下您的宝贵意见</h2>
					<h4>为了更好的提供服务，请您对{{auntInfo.aunt_name}}的服务进行评价，感谢您的配合，您的意见对我们非常宝贵。</h4>
					<div class="title_center_feed">
						<div class="img_center_feed">
							<img :src="photograph_loc"/>
						</div>
						<div class="message_center_feed">
							<h3>{{auntInfo.aunt_name}}</h3>
							<span>{{auntInfo.aunt_sex}}</span>
							<p>{{auntInfo.aunt_mobile}}</p>
						</div>
					</div>
				</div>
			</section>
			<section style="background: #fff;">
				<div class="boxs_center_aunt" style="text-align: left;">
					<h2>填写评价</h2>
					<el-row class="evaluate_li">
						<el-col :span="12" :offset="6">
						  	<el-col :span="4">综合评价</el-col>
						  	<el-col :span="20">
						  		<el-radio-group v-model="radio2">
	    							<el-radio :label="3">好评</el-radio>
								    <el-radio :label="6">一般</el-radio>
								    <el-radio :label="9">差评</el-radio>
	  							</el-radio-group>
						  	</el-col>
						</el-col>
					</el-row>
					<el-row class="evaluate_li">
						<el-col :span="12" :offset="6">
						  	<el-col :span="4">服务态度</el-col>
						  	<el-col :span="20">
						  		<el-rate
								    v-model="value2"
								    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
							  	</el-rate>
						  	</el-col>
						</el-col>
					</el-row>
					<el-row class="evaluate_li">
						<el-col :span="12" :offset="6">
						  	<el-col :span="4">服务技能</el-col>
						  	<el-col :span="20">
						  		<el-rate
								    v-model="value2"
								    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
							  	</el-rate>
						  	</el-col>
						</el-col>
					</el-row>
					<el-row class="evaluate_li">
						<el-col :span="12" :offset="6">
						  	<el-col :span="4">仪容仪表</el-col>
						  	<el-col :span="20">
						  		<el-rate
								    v-model="value2"
								    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
							  	</el-rate>
						  	</el-col>
						</el-col>
					</el-row>
					<el-row class="evaluate_li">
						<el-col :span="12" :offset="6">
						  	<el-col :span="4">沟通表达</el-col>
						  	<el-col :span="20">
						  		<el-rate
								    v-model="value2"
								    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
							  	</el-rate>
						  	</el-col>
						</el-col>
					</el-row>
					<el-row class="evaluate_li">
						<el-col :span="12" :offset="6">
						  	<el-col :span="4">评&emsp;&emsp;价</el-col>
						  	<el-col :span="20">
						  		<el-input
								  type="textarea"
								  :rows="2"
								  placeholder="请填写您的宝贵意见"
								  v-model="texts">
								</el-input>
						  	</el-col>
						</el-col>
					</el-row>
					<el-row class="evaluate_li">
						<el-col :span="12" :offset="6">
						  	<el-col :span="4">姓&emsp;&emsp;名</el-col>
						  	<el-col :span="20">
						  		<el-input
								  placeholder=""
								  v-model="name"
								  clearable>
								</el-input>
						  	</el-col>
						</el-col>
					</el-row>
					<el-row class="evaluate_li">
						<el-col :span="12" :offset="6">
						  	<el-col :span="4">电&emsp;&emsp;话</el-col>
						  	<el-col :span="20">
						  		<el-input
								  placeholder=""
								  v-model="tel"
								  clearable>
								</el-input>
						  	</el-col>
						</el-col>
					</el-row>
				</div>
				<div style="margin: 40px 0;">
					<el-button type="success" @click="toHome" plain >返回首页</el-button>
					<el-button type="success" @click="" >确定</el-button>
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
        		auntInfo:{},
        		photograph_loc:'',
        		defaultImg:'http://58laimi.oss-cn-zhangjiakou.aliyuncs.com/resouce/img.jpg',
        		
        		radio2:'',
        		value2:null,
        		texts:'',
        		name:'',
        		tel:''
        		
			}
		},
		mounted() {
			this.$store.commit("switch", '');
			
			this.qyeryAuntDetail();
		},
		methods: {
		   toHome () {
	    		this.$router.push({
	    			path:'/',
	    			query:{
	    				company_id: this.$route.query.company_id,
	    				employee_id: this.$route.query.employee_id
	    			}
	    		})
	    	},
			qyeryAuntDetail(){
				
				this.$http.post(process.env.API_HOST + '/websiteAuntController/selectAuntInfomationDetailByAuntId',{aunt_id:this.$route.query.aunt_customer_id}).then(response=>{
					console.log(response,"ay")
					let res = response.data;
					if(res.true){
						this.auntInfo = res.data;
						switch (this.auntInfo.aunt_sex){
							case "0":
								this.auntInfo.aunt_sex="女";
								break;
							case "1":
								this.auntInfo.aunt_sex="男";
								break;
							default:
								break;
						}
						this.aunt_is_checkout = res.data.aunt_is_checkout;
						this.photograph_loc = res.data.aunt_avatar.photograph_loc ? res.data.aunt_avatar.photograph_loc : this.defaultImg
						console.log(this.auntInfo);
					}
				})
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
	.boxs_center_feed{
		width: 1142px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		background: #fff;
		margin-bottom: 20px;
		padding: 0 30px;
	}
	.boxs_center_feed h2{
		font-size: 24px;
		line-height: 56px;
		font-family: "宋体";
	}
	.boxs_center_feed h4{
		font-size: 14px;
		line-height: 1;
		font-weight: 500;
		font-family: "宋体";
		padding-bottom: 30px;
		border-bottom: 1px solid #e2e2e2;
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
	.evaluate_li{
		margin: 20px 0;
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
	.title_center_feed{
		width: 100%;
		height: 120px;
		display: flex;
		justify-content: center;
		padding: 30px 0;
	}
	.img_center_feed{
		width: 120px;
		height: 120px;
		box-sizing: border-box;
		border: 1px solid #cacaca;
		overflow: hidden;
	}
	.img_center_feed img{
		width: 120px;
		height: 120px;
	}
	
	.message_center_feed{
		padding-left: 30px;
		text-align: left;
	}
	.message_center_feed h3{
		letter-spacing: 4px;
		font-size: 22px;
		color: #1aad19;
		line-height: 50px;
		font-family: "宋体";
	}
	.message_center_feed p{
		font-size: 13px;
		line-height: 32px;
	}
	.message_center_feed>span{
		font-size: 13px;
		line-height: 24px;
		display: inline-block;
		padding: 0 20px;
		background: #edf4fa;
		color: #97aec5;
		border-radius: 5px;
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