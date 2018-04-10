<template>
	<div>
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
			</div>
			
			<section style="background: #fff;">
				<div class="boxs_center_pwd" style="text-align: left;">
					<div class="pwd_box">
						<h2>
							修改密码
						</h2>
						<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
						  	
						  	<el-form-item label="原密码" prop="newPass">
						    	<el-input type="password" v-model="ruleForm.password_old" ></el-input>
						  	</el-form-item>
						  	<el-form-item label="新密码" prop="newPass">
						    	<el-input type="password" v-model="ruleForm.password_new" ></el-input>
						  	</el-form-item>
						  	<el-form-item label="确认密码" prop="newPass_sure">
						    	<el-input type="password" v-model="ruleForm.password_sure" ></el-input>
						  	</el-form-item>
						  	<el-form-item>
						   		<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						  	</el-form-item>
						</el-form>
					</div>
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
				ruleForm:{
					password_old:'',
        			password_new:'',
        			password_sure:''
				}
        		
			}
		},
		mounted() {
			this.$store.commit("switch", '');
		},
		methods: {
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
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
	.boxs_center_pwd{
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		background: #fff;
		padding-top: 29px;
		display: flex;
		justify-content: center;
	}
	.pwd_box{
		width: 476px;
		height: 464px;
		border: 1px solid #e2e2e2;
		border-top: 4px solid #1aad19;
		padding: 6px 74px;
	}
	.pwd_box h2{
		text-align: center;
		line-height: 94px;
		font-size: 22px;
		letter-spacing: 2px;
		color: #3f3f3f;
		font-weight: 500;
		font-family: "宋体";
	}
</style>