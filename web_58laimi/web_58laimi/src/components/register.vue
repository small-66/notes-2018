<template>
	<div>
		<div>
			<v-header></v-header>
		</div>
		
		<el-row class="rgs_content">
			<el-col :span="12">
				<img src="../assets/img/login_01.jpg" />
			</el-col>
			<el-col :span="12" class="loginMessage">
				<el-row class="rgs_inputLine">
					<el-col><h2>新用户注册</h2></el-col>
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label">我是</el-col>
					<el-col :span="15" class="rgs_userType">
						<el-radio-group v-model="user_type" @change="sel_userType">
							<el-radio  :label="1">阿姨</el-radio>
	  						<el-radio  :label="0">同行</el-radio>
  						</el-radio-group>
					</el-col>
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label"><span>手机号</span></el-col>
					<el-col :span="15">
						<el-input class="login_input" max='11' placeholder="请输入手机号" ref="user_mobile" v-model="user_mobile" clearable></el-input>
					</el-col>
				</el-row>				
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label">
						<span>验证码</span>
					</el-col>
					<el-col :span="9" class="rgs_label">
						<el-input class="verfiy_input"  placeholder="请输入验证码" ref="verfiyCode"  v-model="verfiyCode" clearable></el-input>
					</el-col>
					<el-col :span="6" class="rgs_code">
						<a href="javascript:;" style="font-size: 13px; color: #1aad19;" @click="getCode">发送验证码</a>
					</el-col>
					
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label">
						<span>设置密码</span>
					</el-col>
					<el-col :span="15">
						<el-input class="login_input" max='6' placeholder="请输入密码" v-model="user_password" clearable></el-input>
					</el-col>					
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col class="rgs_btn">
						<el-button :disabled="submitEnable" type="success" @click="save">立即注册</el-button>
					</el-col>					
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col class="rgs_btn">
						<el-button plain>登录</el-button>
					</el-col>					
				</el-row>
			
			</el-col>
		</el-row>		
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
				user_mobile:'',
				user_password:'',
				verfiyCode:'',
				user_type:null,
				
				company_id: '',
				company_name: '',
				suoshuren_id: '',
				suoshuren_name:'',
				suoshuren_mobile:'',
				submitEnable:false,
				showYz:false
			}
		},
		mounted() {
			this.queryCompany();
		},
		methods:{
			sel_userType(val){
				console.log(val);
			},
			
			getCode() {
				let mobileReg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if(!this.user_type){
					this.$message({
			          	showClose: true,
			          	message: "请选择客户类型",
			          	type: 'warning'
			       	});
			       	
			       	
				}else if(!this.user_mobile){
					this.$message({
			          	showClose: true,
			          	message: "请输入手机号",
			          	type: 'warning'
			       	});
			       	this.$refs.user_mobile.focus();
				}else if(!mobileReg.test(this.user_mobile)){
					this.$message({
			          	showClose: true,
			          	message: "请输入有效手机号",
			          	type: 'warning'
			       	});
			       	this.$refs.user_mobile.focus();
					
				}else{
					this.$http.post(process.env.API_HOST + 'homeController/sendChangePasswordVerfiyCode', {
						user_mobile:this.user_mobile,company_id: this.$route.query.company_id}).then(response => {
						console.log(response);
						let res = response.data;
						if(res.true) {
							this.showYz = true
								 
						}else{
							if(res.code=='22'){
								this.$message({
						          	showClose: true,
						          	message: res.msg,
						          	type: 'warning'
						       	});
								let self = this;
								setTimeout(function(){
									self.$router.push({
										path:'/loginPage',
										query:{
											company_id:self.$route.query.company_id,
											employee_id:self.$route.query.employee_id
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
							
						}
					})
				}
			},
			queryCompany() {
				//查询公司信息
				this.$http.post(process.env.API_HOST + '/homeController/selectPermissionCompanyByCompanyId', {
						company_id: this.$route.query.company_id,
  			  			employee_id: this.$route.query.employee_id
				}).then(response => {
					console.log(response, 'company')
					let res = response.data;
					if(res.true) {
						this.company_id = res.data.comPanyDetails.company_id;
						this.company_name = res.data.comPanyDetails.company_name;
						this.suoshuren_id = res.data.comPanyDetails.suoshuren_id;
						this.suoshuren_name = res.data.comPanyDetails.suoshuren_name;
						this.suoshuren_mobile = res.data.comPanyDetails.suoshuren_mobile;
					}
				})
			},
			save() {
				let programs = {
					company_id: this.company_id,
					company_name: this.company_name,
					user_mobile: this.user_mobile,
					user_password: this.user_password,
					user_type: this.user_type,//1阿姨0客户
					verfiyCode: this.verfiyCode,
					aunt_customer_owner: this.suoshuren_id,
					aunt_customer_owner_name: this.suoshuren_name 
				},
				pwdReg=/^[0-9A-Za-z]{6}$/,
				tellReg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				console.log(this.user_type,'type');
				if(!this.user_type){
	    			this.$message({
			          	showClose: true,
			          	message: "请选择您的身份",
			          	type: 'warning'
			       	});
	    		}else if(this.user_mobile==''||this.user_mobile.indexOf(" ") != -1){
	    			this.$message({
			          	showClose: true,
			          	message: "请输入手机号",
			          	type: 'warning'
			       	});
			       	this.$refs.user_mobile.focus();
	    		}else if(!tellReg.test(this.user_mobile)){
					this.$message({
			          	showClose: true,
			          	message: "请输入有效手机号",
			          	type: 'warning'
			       	});
			       	this.$refs.user_mobile.focus();
	    		}else if(!this.verfiyCode){
	    			this.$message({
			          	showClose: true,
			          	message: "请输入验证码",
			          	type: 'warning'
			       	});
	    		}else if(!pwdReg.test(this.user_password)){
	    			this.$message({
			          	showClose: true,
			          	message: "密码最少6位数字或者字母组合",
			          	type: 'warning'
			       	});
				}else{
					this.submitEnable=true;
					this.$http.post(process.env.API_HOST + 'homeController/addWebsiteCustomerUser', programs).then(response => {
						console.log(response,'sddfds');
						let res = response.data;
						if(res.true) {
							this.$message({
					          	showClose: true,
					          	message: "注册成功,感谢您的注册",
					          	type: 'success'
					       	});
							if(this.user_type=='1'){//1跳转到阿姨中心
								setTimeout(()=>{
									this.$router.push({
										path:'/auntCenter',
										query:{
											aunt_customer_id:res.data.aunt_customer_id,
											user_id:res.data.user_id,
											company_id:this.company_id,
											employee_id: this.$route.query.employee_id
										}
									})
								},2500)
							}else if(this.user_type=='0'){//0跳转到客户中心
								setTimeout(()=>{
									this.$router.push({
										path:'/customerCenter',
										query:{
											aunt_customer_id:res.data.aunt_customer_id,
											user_id:res.data.user_id,
											company_id:this.company_id,
											employee_id: this.$route.query.employee_id
										}
									})
								},2500)
							}
							
							this.submitEnable=false;
						}else{
							this.submitEnable=false;
							console.log(res.data);
							if(res.data=="您已注册！"){
								this.$message({
						          	showClose: true,
						          	message: "您已注册！请直接登录",
						          	type: 'warning'
						       });
								console.log(this.err_text),'err_text';
								setTimeout(()=>{
								this.$router.push({
										path:'/loginPage',
										query:{
											company_id:this.company_id,
											employee_id: this.$route.query.employee_id
										}
								})
								},2500)
							}else{
								this.$message({
						          	showClose: true,
						          	message: res.data,
						          	type: 'warning'
						       });
							}
							
						}
					})
				}
			},
			
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
		height: 523px;
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
		padding-top: 8px;
    	margin: 35px 0 0 40px;
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
</style>