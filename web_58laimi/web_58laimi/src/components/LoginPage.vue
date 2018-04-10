<template>
	<div>
		<div>
			<v-header></v-header>
		</div>
		<el-row>
			<el-col :span="12">
				<img src="../assets/img/login_01.jpg" />
			</el-col>
			<el-col :span="12" class="loginMessage">
				<h2>{{company_name}}</h2>
				<p class="inputLine">
					<span>手机号</span><el-input class="login_input" max='11' placeholder="请输入手机号" ref="user_mobile" v-model="user_mobile" clearable></el-input>
				</p>
				<p class="inputLine">
					<span>密&nbsp;&nbsp;&nbsp;码</span><el-input class="login_input" max='6' placeholder="请输入密码" ref="user_password" v-model="user_password" clearable></el-input>
				</p>
				<p class="inputLine" v-show='isYanzheng'>
					<span>验证码</span><el-input class="verfiy_input"  placeholder="请输入验证码" v-model="verfiyCode" clearable></el-input>
					<img  class="vcodeImg" :src="img_url" @click="getcodeImg">
				</p>
				<p class="login_btn">
					<el-button type="success" @click="login">立即登录</el-button>
				</p>
				<p class="login_btn">
					<el-button plain @click="register">快速注册</el-button>
				</p>
				<p class="inputLine">
					<a href="javascript:;" @click="forget_password">忘记密码？</a>
				</p>
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
				company_name:'',
				company_id:'',
				employee_id:'',
				
				user_mobile:'',
				user_password:'',
				verfiyCode:'',
				img_url:'',
				isYanzheng: false,
				login_times: 0,
			}
		},
		mounted() {
			this.init();
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
						this.company_name = res.data.comPanyDetails.company_name;
					}
				})
			},
			//点击更换验证码
			getcodeImg(){
				console.log(this.user_mobile,'手机号')
				let data = new Date();
				this.$http.get(process.env.API_HOST + '/homeController/createVerfiyCode',{user_mobile:this.user_mobile}).then(response => {
					console.log(response,'更换验证码')
					let res = response;
					if(res.status==200){
						this.img_url+= '&timestamp='+data.getTime();
						//alert(res.config.url);
//						this.img_url = process.env.API_HOST +  res.config.url;

					}
				})
			},
			
			
			login(){
				let programs = {
					company_id: this.company_id,
					user_mobile: this.user_mobile.replace(/^\s+|\s+$/g,""),
					user_password: this.user_password.replace(/^\s+|\s+$/g,""),
					verfiyCode: this.verfiyCode.replace(/^\s+|\s+$/g,"")
	
				}
				this.$http.post(process.env.API_HOST +'/homeController/login',programs).then(response=>{
					console.log(response,'立即登录');
					let res = response.data;
					if(res.true){
						if(res.data.user_type=='1'){
							//跳转阿姨中心
							this.$router.push({
								path:'/auntCenter',
								query:{
									aunt_customer_id: res.data.aunt_customer_id,
									user_id: res.data.user_id,
									company_id: this.$route.query.company_id,
									employee_id: this.$route.query.employee_id
								}
							})
						}else{
							this.$router.push({
								path:'/customerCenter',
								query:{
									aunt_customer_id: res.data.aunt_customer_id,
									user_id: res.data.user_id,
									company_id: this.$route.query.company_id,
									employee_id: this.$route.query.employee_id
								}
							})
							//客户中心
						}
					}else{
						let tellReg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
						if(!this.user_mobile&&!this.user_password){
							this.$message({
					          	showClose: true,
					          	message: "请输入手机号和密码",
					          	type: 'warning'
					       	});
							this.$refs.user_mobile.focus();
						}else if(!this.user_mobile){
							this.$message({
					          	showClose: true,
					          	message: "手机号不能为空",
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
		    		   }else if(!this.user_password){
		    		   		this.$message({
					          	showClose: true,
					          	message: "请输入密码",
					          	type: 'warning'
					       	});
							this.$refs.user_password.focus();
						}else{
						
							this.login_times = res.data.login_times;
							this.err_text = res.data.response_msg;
							this.err = true;
							if(this.login_times > 2) {
								this.isYanzheng = true;
								this.$http.get(process.env.API_HOST + '/homeController/createVerfiyCode?userMobile=' + this.userMobile).then(response => {
									this.img_url = process.env.API_HOST +res.data.verfiy_code_url;
									console.log(res.data.verfiy_code_url,'yanzhengma');
									this.verfiyCode = '';
								})
		
							}
						}
					}
				})	
				
			},
			
			register(){
				//注册
				this.$router.push({
					path:'/register',
					query:{
						employee_id:this.employee_id,
						company_id:this.company_id
					}
				})
			},
			forget_password(){
				this.$router.push({
					path:'/forget_password',
					query:{
						employee_id:this.employee_id,
						company_id:this.company_id
					}
				})
			}
			
			
		}
  }
</script>

<style scoped>
	.login_input,.verfiy_input{
		width:244px;
		height:33px;
	}
	.verfiy_input{
		width:142px;
	}
	.loginMessage{
		width: 442px;
    	height: 423px;
		border:2px solid #e2e2e2;
		border-top:4px solid #1aad18;
		padding-top: 42px;
    	margin: 50px 0 0 40px;
	}
	.content{
		overflow: hidden;		
	}
	.inputLine{
		margin:20px 5px;
		position: relative;
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
		width: 244px	
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
	
	.vcodeImg {
	  height: 40px;
	  position: relative;
	  right: 0;
	  top: 15px;
	  border: 1px solid #bdbdbd;
	}
</style>