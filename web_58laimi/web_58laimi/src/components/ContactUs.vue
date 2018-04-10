<template>
	<div>
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
				<!--<div class="breadbox">
					<el-col :span='3'>
						<span class="el-breadcrumb__inner el-breadcrumb">您所在的位置：</span>
					</el-col>
					<el-col :span="20">
						<el-breadcrumb separator-class="el-icon-arrow-right">
						  	<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						 	<el-breadcrumb-item>服务列表</el-breadcrumb-item>
						  	<el-breadcrumb-item>服务详情</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					
				</div>-->
			</div>
			<section class="cell_box">
				<div class="boxs_service" style="margin-top: 30px;">
					<div class="aunt_message_details">
						<h4>{{companyMessage.company_name}}</h4>
						<strong>
							<el-col :span="2" style="text-align: center;">联系人:</el-col>
							<el-col :span="22">
								<strong>{{companyMessage.company_contact_name}}</strong>
							</el-col>
						</strong>
						<strong>
							<el-col :span="2" style="text-align: center;">联系电话:</el-col>
							<el-col :span="22">
								<strong>{{companyMessage.company_contact_mobile}}</strong>
							</el-col>
						</strong>
						<strong>
							<el-col :span="2" style="text-align: center;">公司电话:</el-col>
							<el-col :span="22">
								<strong>{{companyMessage.company_telephone}}</strong>
							</el-col>
						</strong>
						<strong>
							<el-col :span="2" style="text-align: center;">公司地址:</el-col>
							<el-col :span="22">
								 <strong>{{companyMessage.company_location}}</strong>
						
							</el-col>
						</strong>
					</div>
				</div>
				<div class="boxs_service">
					<div>
						<h4>公司介绍</h4>
						<p>
							{{companyMessage.company_content}}
						</p>
					</div>
				</div>
				<div class="boxs_service">
					<div>
						<h4>公司服务介绍</h4>
						<p>
							{{companyMessage.company_service_content}}
						</p>
					</div>
				</div>
				
				<div class="boxs_service" v-if="imgList.length>0">
					<div>
						<h4>公司形象照片</h4>
						<ul class="img_list">
							<li v-for="tmp in imgList" v-if="tmp.src">
								<img :src="tmp.src" @click=""/>
							</li>
							<!--<li><img src="../assets/img/login_03.jpg"/></li>
							<li><img src="../assets/img/login_03.jpg"/></li>
							<li><img src="../assets/img/login_03.jpg"/></li>
							<li><img src="../assets/img/login_03.jpg"/></li>
							<li><img src="../assets/img/login_03.jpg"/></li>-->
						</ul>
					</div>
				</div>
				<div>
					<el-button  plain @click="backHome">返回首页</el-button>
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
				companyMessage:{},
				textLocation:{},
				imgList:[]
			}
		},
		mounted() {
			this.$store.commit("switch", '');
			this.queryMessage();
			this.companyPhoto();
		},
		methods: {
			queryMessage() {
	          	this.$http.post(process.env.API_HOST + '/homeController/contactUs',{
		            company_id: this.$route.query.company_id,
		            employee_id: this.$route.query.employee_id
	          	}).then(response=>{
		            console.log(response,'message')
		            let res = response.data;
		            if(res.true){
		              this.companyMessage = res.data.permission_companyDetails;
		              this.textLocation=this.companyMessage.company_location;
		            }
	          	})
	      	},
			//获取公司形象照
	      	companyPhoto(){
		        this.$http.post(process.env.API_HOST + '/homeController/selectCompanyPhotoByCompanyId',{
		            company_id: this.$route.query.company_id
	          	}).then(response=>{
		            console.log(response,'urlurl')
		            let res = response.data.data;
		            this.imgList = []
		            res.forEach((item,index) => {          
		              if (item.photograph_location!=''&&item.photograph_type == '3') {
		                this.imgList.push({
		                  src: item.photograph_location
		                })
		              }              
		            })
		            console.log('imgList', this.imgList)
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

<style>
	.breadbox{
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		
	}
	.el-breadcrumb{
		line-height: 48px !important;
	}
	.cell_box{
		background: #f5f5f5;
		overflow: hidden;
		position: relative;
		padding: 0 0 30px;
	}
	.boxs_service{
		background: #fff;
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto 30px;
		padding-bottom: 40px;
		
	}
	.tag_service{
		padding: 20px 0;
	}
	.boxs_service h4{
		line-height: 50px;
		font-size: 20px;
		font-family: "宋体";
		color: #3f3f3f;
		white-space: 4px;
	}
	.boxs_service h5{
		line-height: 36px;
		font-family: "宋体";
		color: #3f3f3f;
		letter-spacing:4px;
	}
	.boxs_service .salary_service{
		color: #1aad19;
		font-size: 20px;
	}
	.boxs_service p{
		padding-left: 30px;
		line-height: 25px;
		font-size: 12px;
		letter-spacing:2px;
		text-align: left;
	}
	.img_list{
		overflow: hidden;
		display: flex;
	}
	.img_list li{
		flex: 1;
	}
	.img_list img{
		width: 212px;
		height: 212px;
	}
	.aunt_message_details h3{
		font-family: "宋体";
		font-size: 18px;
		font-weight: 600;
		line-height: 48px;
	}
	.aunt_message_details ul{
		overflow: hidden;
	}
	.aunt_message_details li{
		float: left;
		width: 30%;
	}
	.aunt_message_details li p{
		line-height: 42px;
		font-size: 13px;
		color: #7a7a7a;
	}
	.aunt_message_details  p span{
		display: inline-block;
		width: 60%;
		color: #3f3f3f;
		text-align: center;
	}
	
	.aunt_message_details h4{
		font-family: "宋体";
		font-size: 15px;
		font-weight: 600;
		line-height: 48px;
	}
	.aunt_message_details strong{
		font-size: 14px;
		font-weight: 500;
		line-height: 42px;
		color: #7a7a7a;
		text-align: left;
	}
	.aunt_message_details .evaluate {
		padding: 22px 30px;
		line-height: 30px;
		color: #3f3f3f;
		background: #f7f6f6;
		border-radius: 10px;
	}
</style>