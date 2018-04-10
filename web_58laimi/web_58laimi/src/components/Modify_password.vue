<template>
	<div>
		<div>
			<v-header></v-header>
		</div>
		
		<div class="rgs_content">			
			<div  class="loginMessage">
				<el-row class="rgs_inputLine">
					<el-col><h2>修改密码</h2></el-col>
				</el-row>
				
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label"><span>原密码</span></el-col>
					<el-col :span="15">
						<el-input class="login_input" max='6'  v-model="pwd" type="password" clearable></el-input>
					</el-col>
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label"><span>新密码</span></el-col>
					<el-col :span="15">
						<el-input class="login_input" max='6'  v-model="new_pwd" type="password" clearable></el-input>
					</el-col>
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col :span="5" :offset="2" class="rgs_label"><span>确认密码</span></el-col>
					<el-col :span="15">
						<el-input class="login_input" max='6'  v-model="besure_pwd" type="password" clearable></el-input>
					</el-col>
				</el-row>
				<el-row class="rgs_inputLine">
					<el-col class="rgs_btn">
						<el-button type="success" @click="modityPwd">确定</el-button>
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
				pwd:'',
				new_pwd:'',
				besure_pwd:'',
			}
		},
		methods:{
			modityPwd(){
				let programs={
					user_id:this.$route.query.user_id,
					oldPass: this.pwd,
					newPass: this.besure_pwd
				}
				if(this.pwd==''||this.besure_pwd==''||this.new_pwd==''){
					this.$message({
			          	showClose: true,
			          	message: "输入要修改的密码和原密码",
			          	type: 'warning'
			       	});
					return;
				}else if(this.besure_pwd.length<6){
					this.$message({
			          	showClose: true,
			          	message: "请输入6位数字或者字母组合",
			          	type: 'warning'
			       	});
				}else if(this.besure_pwd==this.new_pwd){
					this.$http.post(process.env.API_HOST + '/homeController/modifyPass',programs).then(response=>{
						console.log(response,"xiugai")
						let res = response.data;
						if(res.true){
							this.$message({
					          	showClose: true,
					          	message: "您的密码已修改成功，请记住新的密码！",
					          	type: 'warning'
					       	});
							setTimeout(function(){
								window.history.go(-1)
							},2000)
						}else{
							this.$message({
					          	showClose: true,
					          	message: res.msg,
					          	type: 'warning'
					       	});
						}
					})
				}else{
					this.$message({
			          	showClose: true,
			          	message: '两个密码不一致',
			          	type: 'warning'
			       	});
				}
				
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
</style>