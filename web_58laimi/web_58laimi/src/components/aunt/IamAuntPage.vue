<template>
	<div>
		<div>
			<v-header></v-header>
		</div>
		<div class="aunt_header">
			<el-col :span="12"  class="aunt_left">
				<span>您所在位置：</span>
				<span>首页</span>&gt;<span>我是阿姨</span>
			</el-col>			
		</div>
		<div class="aunt_title">			
			<p class="aunt_named">阿姨，您好：</p>
			<p class="title_one">作为专业的家政服务公司，我们有大量的客户和工作机会可以跟您的专</p>
			<p>业技能进行匹配，只要您留下信息，我们会优先第一时间联系您，谢谢</p>			
		</div>
		<div class="aunt_foot">
			<div>
				<h4>请您填写基本信息，稍后将有专人联系您</h4>
				<el-row>
					<el-col :span="5">
						<span>姓名</span>
					</el-col>
					<el-col :span="13">						
						<el-input class="aunt_input" type="text" placeholder="请输入您的姓名"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="5">						
						<span>手机号</span>
					</el-col>
					<el-col :span="13">
						<el-input class="aunt_input" ></el-input>
					</el-col>																			
				</el-row>
				<el-row>
					<el-col :span="5">	
						<span>求职类型</span>
					</el-col>
					<el-col :span="13">
						<el-input class="aunt_input" ></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="5">	
						<span>身份证</span>
					</el-col>
					<el-col :span="13">
						<el-input class="aunt_input" ></el-input>
					</el-col>
				</el-row>
				<el-button type="success">提交</el-button>
			</div>
			<!--<el-form ref="form" :model="form" label-width="80px">
			  <el-form-item label="姓名">
			    <el-input v-model="form.name" ></el-input>
			  </el-form-item>			 
			  <el-form-item label="手机号">
			    <el-input v-model="form.mobile"></el-input>
			  </el-form-item>
			<el-form-item label="求职类型">
			    <el-input v-model="form.workType"></el-input>
			  </el-form-item>
			<el-form-item label="身份证">
			    <el-input v-model="form.aunt_ID"></el-input>
			  </el-form-item>
			
			  <el-form-item>
			    <el-button type="success" >提交</el-button>   
			  </el-form-item>
			</el-form>-->
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import VHeader from '@/components/unit/VHeader'
	import VFooter from '@/components/unit/VFooter'
	export default {
  		components:{
 			VHeader,
			VFooter
		},
		data(){
			return{
				form:{
					name:'',
					mobile:'',
					workType:'',
					aunt_ID:''
				},
				
			}
		},
	}
</script>

<style>
	.aunt_header{
		margin:20px 0;
		background: #f5f5f5;
		height: 50px;
		line-height: 50px;
		margin-left: -150px;
	}
	.aunt_title{
		padding:65px 0;
		line-height: 30px;
		height: 86px;
	}
	.title_one{
		margin-left: 60px;;
	}
	.aunt_named{
		margin-left: -400px;
	}
	.aunt_foot{
		background:#f5f5f5 ;
		padding-top: 35px;
    	padding-bottom: 35px;
	}
	.aunt_foot>div{
		width: 45%;
	    background: #fff;
	    margin: 0 auto;
	    padding-top: 20px;
	    padding-bottom: 20px;
	}
	.aunt_foot h4{
		margin:20px 0;
		border-bottom: 1px solid #f5f5f5;
		padding-bottom: 20px;
	}
	.aunt_foot .el-row{
		margin-bottom: 15px;
	}
	.aunt_foot .el-button--success{
		width:120px;
	}
</style>