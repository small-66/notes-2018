<template>
	<div>
		<div>
			<v-header></v-header>
		</div>
		
		<div class="rgs_content">			
			<div  class="loginMessage">
				<el-row class="rgs_inputLine">
					<el-col><h2>忘记密码</h2></el-col>
				</el-row>
				
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label"><span>手机号</span></el-col>
					<el-col :span="15">
						<el-input class="login_input" max='11' placeholder="请输入手机号" ref="user_Mobile" v-model="user_Mobile" clearable></el-input>
					</el-col>
				</el-row>				
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label">
						<span>图片验证</span>
					</el-col>
					<el-col :span="9" class="rgs_label">
						<el-input class="verfiy_input"  placeholder="请输入验证码" v-model="pictureCode" clearable></el-input>
					</el-col>
					<el-col :span="6" class="rgs_code">
						<img  class="vcodeImg" :src="img_url" @click="getImg">
					</el-col>			
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label">
						<span>验证码</span>
					</el-col>
					<el-col :span="9" class="rgs_label">
						<el-input class="verfiy_input"  placeholder="请输入验证码" v-model="SMSCode" clearable></el-input>
					</el-col>
					<el-col :span="6" class="rgs_code">
						<a href="javascript:;" style="font-size: 13px; color: #1aad19;" v-if="time1==120" @click="getCode">发送验证码</a>
						<a href="javascript:;" style="font-size: 13px; color: #1aad19;" v-else>{{time1}}s后发送验证码</a>
					</el-col>			
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col class="rgs_btn">
						<el-button type="success" @click="besure">确定</el-button>
					</el-col>					
				</el-row>
			
			
			</div>
		</div>		
		<div class="rule"></div>
		<footer class="foot">
			<v-footer></v-footer>			
		</footer>
	</div>
</template>

<script>
	import VHeader from '@/components/unit/VHeader'
	import VFooter from '@/components/unit/VFooter'
	export default {
  		name: 'LoginPage',
  		components:{
 			VHeader,
			VFooter
		},
		data(){
			return{
				user_Mobile:'',
				user_password:'',
				pictureCode:'',
				SMSCode:'',
				user_type:1,
				
				company_id:'',
				employee_id:'',
				img_url:'',
				time1:120
			}
		},
		mounted() {
			this.getImg();
			this.company_id=this.$route.query.company_id;
			this.employee_id=this.$route.query.employee_id;
		},
		methods:{
			sel_userType(val){
				console.log(val);
			},
			getImg(){
				this.$http.get(process.env.API_HOST + '/homeController/getLoginTimesAddress',{}).then(response => {
					console.log(response)
					let res = response.data;
					if(res.true){
						this.img_url = process.env.API_HOST +  res.data.verfiy_code_url;
					}
				})
			},
			getCode() {
				let tellReg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				console.log(this.user_Mobile)
				if(!this.user_Mobile){
					this.$message({
			          	showClose: true,
			          	message: "请输入手机号",
			          	type: 'warning'
			       	});
			       	this.$refs.user_Mobile.focus();
		   			return ;
		   		}else if(!tellReg.test(this.user_Mobile)){
		            this.$message({
			          	showClose: true,
			          	message: "请输入有效手机号",
			          	type: 'warning'
			       	});
			       	this.$refs.user_Mobile.focus();
		            return;
          		}else if(this.pictureCode==''){
					this.$message({
			          	showClose: true,
			          	message: "请输入图片验证码",
			          	type: 'warning'
			       	});
					return;
				}else{
					this.time();
					this.$http.post(process.env.API_HOST + 'homeController/sendChangeResetPasswordVerfiyCode', {
						company_id:this.$route.query.company_id,
						user_mobile:this.user_Mobile,
						pictureCode:this.pictureCode,
					}).then(response => {
						console.log(response);
						let res = response.data;
						if(res.true) {
							this.$message({
					          	showClose: true,
					          	message: "验证码已发送",
					          	type: 'success'
					       	});
						}else{
							this.$message({
					          	showClose: true,
					          	message: res.msg,
					          	type: 'warning'
					       	});
						}
					})
				}
				
			},
			time() {
				let _this = this;
			  	if (this.time1 == 0) {
				   	this.time1=120;
					return;
			  	} else { 
			 		this.showYz = false
				  	this.time1--;
			   		console.log(this.time1)
					setTimeout(function() {
				    	_this.time()
				   	},1000)
			  	}
			 },
			
			
			besure(){
		   		let tellReg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		   		let programs={
		   			pictureCode:this.pictureCode,
		   			SMSCode: this.SMSCode,
		   			user_Mobile: this.user_Mobile
		   		}
		   		if(!this.user_Mobile){
		   			this.$message({
			          	showClose: true,
			          	message: "请输入手机号",
			          	type: 'warning'
			       	});
			       	this.$refs.user_Mobile.focus();
		   			return ;
		   		}else if(!tellReg.test(this.user_Mobile)){
		           this.$message({
			          	showClose: true,
			          	message: "请输入有效手机号",
			          	type: 'warning'
			       	});
			       	this.$refs.user_Mobile.focus();
		   			return ;
          		}else if(!this.pictureCode){
		   			this.$message({
			          	showClose: true,
			          	message: "请输入图片验证码",
			          	type: 'warning'
			       	});
		   			return ;
		   		}else if(!this.SMSCode){
		   			this.$message({
			          	showClose: true,
			          	message: "请输入短信验证码",
			          	type: 'warning'
			       	});
		   			return ;
		   		}
		   		this.$http.post(process.env.API_HOST + 'homeController/resetPass', programs).then(response => {
					console.log(response);
					let res = response.data;
					if(res.true) {
						this.$message({
				          	showClose: true,
				          	message: res.msg,
				          	type: 'success'
				       	});
						let _this = this;
						console.log(this.company_id,this.employee_id);
						setTimeout(()=>{
							_this.$router.push({
								path:'/resetPwd',
								query:{
									user_mobile: _this.user_Mobile,
									company_id: this.company_id,
								    employee_id: this.employee_id
								}
							})
						},1000)
						
					}else{
						this.$message({
				          	showClose: true,
				          	message: res.msg,
				          	type: 'warning'
				       	});
					}
				})
		   	}
			
		}
  }
</script>

<style scoped>
	/*.rgs_inputLine{
		margin:20px 5px;
	}*/
	.rgs_userType{
		text-align: left;
	}
	.rgs_content{
		/*height: 523px;*/
		/*width: 100%;
		margin: 0 auto;*/
	}
	.rgs_btn{
		margin-left: 45px;
	}
	.rgs_label span{
		text-align: left;
		margin-top:15px;
		display: inline-block;
	}
	.el-row{
		margin:20px 5px;
	}
	/*.el-col{
		height:40px;
	}*/

	.el-col-5{
		text-align: left;
	}
	.rgs_code{
		margin-left: 15px;
		
	}
	.rgs_code a{
		display: inline-block;
		padding-top:15px;
		
	}
	.verfiy_input{
		/*width:140px;*/
	}
	.loginMessage{
		width: 442px;
    	height: 423px;
		border:2px solid #e2e2e2;
		border-top:4px solid #1aad18;
		padding-top: 10px;
    	margin: 0 auto;
	}
	.content{
		overflow: hidden;		
	}
	.inputLine{
		margin:20px 5px;
	}
	.inputLine span{
		line-height: 33px;
		padding-right:40px;
	}
	.login_btn{
		margin:10px 0px;
		margin-left:88px;
	}
	.el-button{
		width: 270px;	
	}
	.inputLine a{
		margin-right:-270px;
		color:#58c357;
		font-size: 14px;
	}
	p:nth-child(6) .el-button{
		color:#58c357;
	}
	.rule{
		width:100%;
		height:20px;
		background: #f5f5f5;
		margin:40px 0;
	}
	.contact_number{
		margin:25px 0 ;
	}
	.contact_type,.contact_message{
		margin:20px 0;
	}
	.contact_message{
		padding-top:20px;
		border-top:2px solid #f5f5f5;
	}
	.vcodeImg{
		width: 80px;
		height: 32px;
	}
</style>