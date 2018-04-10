<template>
	<div>
		<div>
			<v-header></v-header>
		</div>
		<div class="addAunt_header">
			<el-col :span="12"  class="aunt_left">
				<span>您所在位置：</span>
				<span>首页</span>&gt;<span>我是阿姨</span>&gt;<span>阿姨自主填写</span>
			</el-col>			
		</div>
		<div class="addAunt_section">
			<div class="uploadID">
				<ul>
	              <li class="uploadLabel" @click="updateIdCard('front')">
	                <div>
	                  <i class="iconfont icon-tianjia"></i>
	                  <p>上传身份证人像页</p>
	                </div>
	                <div v-show="aunt_idcard_front">
	                  <img :src="aunt_idcard_front">
	                  <i class="iconfont icon-guanbi" @click.stop="delIdCard('front')"></i>
	                </div>
	              </li>
	              <li class="uploadLabel" @click="updateIdCard('back')">
	                <div>
	                  <i class="iconfont icon-tianjia"></i>
	                  <p>上传身份证国徽页</p>
	                </div>
	                <div v-show="aunt_idcard_back">
	                  <img :src="aunt_idcard_back">
	                  <i class="iconfont icon-guanbi" @click.stop="delIdCard('back')"></i>
	                </div>
	              </li>
                </ul>
                <div>请上传身份证照片，系统将通过公安部数据辨别真伪</div>
			</div>
			<div class="aunt_basic">
				<ul>
					<li>
						<el-row>
							<el-col :span="5">
								<span>姓名</span>
							</el-col>
							<el-col :span="14">
								<el-input placeholder="请输入姓名" v-model="aunt_name"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5">
								<span>手机号</span>
							</el-col>
							<el-col :span="14">
								<el-input placeholder="请输入手机号" v-model="aunt_mobile"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5">
								<span>阿姨星级</span>
							</el-col>
							<el-col :span="14">
								<el-input v-model="aunt_star"></el-input>
							</el-col>
						</el-row>
					</li>
					<li>
						<el-row>
							<el-col :span="6">
								<span>身份证号</span>
							</el-col>
							<el-col :span="14">
								<el-input placeholder="请输入身份证件号" v-model="aunt_idcard"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="6">
								<span>签发机关</span>
							</el-col>
							<el-col :span="14">
								<el-input  placeholder="请输入身份证签发机关" v-model="aunt_idcard_qianfajg"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="6">
								<span>身份证有效期</span>
							</el-col>
							<el-col :span="14">
								<el-input  placeholder="请输入身份证有效期" v-model="aunt_idcard_deadline"></el-input>
							</el-col>
						</el-row>
					</li>
				</ul>
			</div>
			<div class="aunt_basic">
				<ul>
					<li>
						<el-row>
							<el-col :span="5">
								<span>性别</span>
							</el-col>
							<el-col :span="14">
								<el-radio v-model="sex" label="1">男</el-radio>
  								<el-radio v-model="sex" label="2">女</el-radio>
							</el-col>							
						</el-row>
						<el-row>
							<el-col :span="5">
								<span>年龄</span>
							</el-col>
							<el-col :span="14">
								<el-input placeholder="请输入年龄" v-model="age">
								    <template slot="append">岁</template>
								</el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5">
								<span>期望薪资</span>
							</el-col>
							<el-col :span="6">
								<el-input v-model="start_salary">
								    <template slot="append">元</template>
								</el-input>
							</el-col>
							<el-col :span='2'><span>至</span></el-col>
							<el-col :span="6">
								<el-input v-model="end_salary">
								    <template slot="append">元</template>
								</el-input>
							</el-col>
						</el-row>
					</li>
					<li>
						<el-row>
							<el-col :span="5">
								<span>籍贯</span>
							</el-col>
							<el-col :span="14">
								<el-input placehoder="请输入籍贯" v-model="province_id"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5">
								<span>民族</span>
							</el-col>
							<el-col :span="14">
								<el-input placehoder="请输入籍贯"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5">
								<span>籍贯</span>
							</el-col>
							<el-col :span="8">
								<el-input placehoder="请输入籍贯"></el-input>
							</el-col>
							<el-col :span="6">
								<el-radio v-model="IsWeChat" >同手机号</el-radio>
							</el-col>
						</el-row>
					</li>
				</ul>
			</div>
			<div class="aunt_basic">
				<ul>
					<li>
						<el-row>
							<el-col :span="7">
								<span>紧急联系人</span>
							</el-col>
							<el-col :span='14'>
								<el-input v-model="urgent_contact_name"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="7">
								<span>联系电话</span>
							</el-col>
							<el-col :span='14'>
								<el-input v-model="urgent_contact_mobile"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="7">
								<span>紧急联系人关系</span>
							</el-col>
							<el-col :span='14'>
								<el-input v-model="urgent_contact_relation"></el-input>
							</el-col>
						</el-row>
					</li>
				</ul>
			</div>
			<div class="aunt_basic">
				<div class="experienceWrap">
					<span>工作经历</span>					
					<el-button type="success" plain>新增</el-button>					
				</div>
			</div>
			<div class="aunt_basic"></div>			
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
				aunt_idcard_front:'',
				aunt_idcard_back:'',
				aunt_idcard:'',
				aunt_idcard_qianfajg:'',
				aunt_name:'',
				aunt_mobile:'',
				aunt_star:'',
				aunt_idcard_deadline:'',
				province_id:'',//籍贯
				sex:'1',
				age:'',
				start_salary:'',
				end_salary:'',
				IsWeChat:false,
				urgent_contact_name:'',//紧急联系人
				urgent_contact_mobile:'',
				urgent_contact_relation:'',
				
				
			}
		},
		methods:{
			updateIdCard(){
				console.log('身份证');
			},
			delIdCard(){
				console.log('删除');
			},
		}
	}
</script>

<style>
	.addAunt_header{
		margin:20px 0;
		height: 50px;
		line-height: 50px;
		margin-left: -150px;
	}
	.addAunt_section{
		background: #f5f5f5;
		padding:10px 0;
	}
	
	.uploadID,.aunt_basic{
		width:80%;
		height:200px;
		margin: 0 auto;
		background: #fff;
		margin-top: 30px;
		box-sizing: border-box;
	}
	.uploadID{
		height:300px;
	}
	.uploadLabel{
		padding: 10px;
	    width: 42%;
	    margin: 0;
	    float: left;
	    border: 0;
	    height: auto;
	    min-height:200px;
	}
	.uploadLabel>div{
		border: 1px dotted #b2b2b2;
    	height: 200px;
	    box-sizing: border-box;
	    padding: 50px 5px;
	}
	.iconfont.icon-tianjia{
		font-size: 65px;
	}  
	.uploadLabel p{
		margin-top:20px;
	}
	.uploadID>ul{
		width: 50%;
	    overflow: hidden;
	    margin: auto;
	    padding-top: 30px;
	}
	.uploadID>div{
		margin-top:10px;
	} 
	.aunt_basic>ul{
		overflow: hidden;
		margin: 0 auto;
    	width: 85%;
    	padding: 25px 0
	}    
	.aunt_basic>ul>li{
		width:50%;
		float: left;
	}
	.aunt_basic .el-row{
		margin-bottom:15px;	
	}
	.aunt_basic .el-row span{
		line-height: 35px;
	}
	.el-input-group__append{
		    background-color: #fff;
		    border-left: 1px solid transparent;
	}
	.el-input-group--append .el-input__inner{
		border-right: 1px solid transparent;
	}
	.aunt_basic .aunt_basic{
		padding:0;
	}
	.experienceWrap{
		margin:0 auto;
		margin-top:20px;
		margin-bottom: 20px;		
	}
	.experienceWrap>span{
		margin-right: 10px;
		
	}
</style>