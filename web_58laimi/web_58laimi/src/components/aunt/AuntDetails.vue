<template>
	<div>
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
				<div class="breadbox">
					<el-col :span='3'>
						<span class="el-breadcrumb__inner el-breadcrumb">您所在的位置：</span>
					</el-col>
					<el-col :span="20">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/' ,query:{company_id:company_id,employee_id:employee_id} }">首页</el-breadcrumb-item>
						 	<el-breadcrumb-item :to="{ path: '/auntList',query:{company_id:company_id,employee_id:employee_id} }">阿姨列表</el-breadcrumb-item>
						  	<el-breadcrumb-item>{{auntInfo.aunt_name}} 阿姨详情</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					
				</div>
			</div>
			<section class="cell_box_aunt">
				<div class="boxs_aunt_details">
					<div class="aunt_img">
						<img style="width: 300px; height: 300px;" src="../../assets/img/login_01.jpg"/>
					</div>
					<div class="aunt_message">
						<div class="aunt_messageLeft">
							<div>
								<h2 class="aunt_name">{{ auntInfo.aunt_name }}</h2>
							</div>
							<ul class="tags clearfix">
								<li v-if="computed_aunt_sex">{{computed_aunt_sex}}</li>
								<li v-if="auntInfo.aunt_work_experience">{{auntInfo.aunt_work_experience}}</li>
								<li v-if="auntInfo.aunt_age">{{auntInfo.aunt_age}}岁</li>
								<li v-if="auntInfo.province">{{auntInfo.province}}人</li>
							</ul>
							<ul class="jineng clearfix" style="width: 634px;border-bottom: 1px dashed #e0e0e0;">
								<li v-for="item in auntInfo.aunt_job_intention_endpoint"><span class="iconfont">{{item.bdji_service_name}}</span></li>
								<!--<li ><span class="iconfont">育儿</span></li>
								<li ><span class="iconfont">育儿</span></li>
								<li ><span class="iconfont">育儿</span></li>
								<li ><span class="iconfont">育儿</span></li>
								<li ><span class="iconfont">育儿</span></li>-->
							</ul>
							<h3 class="mess_tel">
								<span class="iconfont icon-weibiaoti1" style="color: #1cae1b;font-size: 1;"></span>
									电话预定：<a href="tel:4006569579">{{phoneNumber}}</a>周一至周日 9:00-21:00
							</h3>
							
						</div>
						<div class="aunt_messageRight">
							<div class="aunt_salary">
								<h2 v-if="auntInfo.aunt_salary_begin">期望薪资</h2>
								<h2 v-else>薪资面议</h2>
								<ul>
									<li v-if="auntInfo.aunt_salary_begin && auntInfo.aunt_salary_end">
										<span>{{ auntInfo.aunt_salary_begin }}</span><span v-if="auntInfo.aunt_salary_begin !== auntInfo.aunt_salary_end">-{{ auntInfo.aunt_salary_end }}</span>元</li>
									<li v-else-if="auntInfo.aunt_salary_begin && !auntInfo.aunt_salary_end">
										<span>{{ auntInfo.aunt_salary_begin }}</span>元起</li>
									<li v-else-if="!auntInfo.aunt_salary_begin && auntInfo.aunt_salary_end"><span>0-{{ auntInfo.aunt_salary_end}}</span>元</li>
	
								</ul>
							</div>
							<el-button style="width: 100%; line-height: 66px;" type="success" @click="outerVisible=true">预约阿姨</el-button>
							<a class="share_btn" href="javascript:;">
								<span class="iconfont icon-share" style="color: #1cae1b;font-size: 1;"></span>
								分享</a>
						</div>
						
						
					</div>
					
				</div>
				
			</section>

			<section class="boxs_aunt_details">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#fff" text-color="#000" active-text-color="#ffd04b">
					<el-menu-item :index="item.index" v-for="item in navList" :key="item.index">
						<a style="display: inline-block; width: 100%;height: 100%;" :href="'#activeIndex'+item.index">{{item.title}}</a>
					</el-menu-item>
				</el-menu>
				
				<div id="activeIndex1" class="aunt_message_details">
					<h3>基本信息</h3>
					<ul>
						<li>
							<p>姓&emsp;&emsp;名：<span>{{auntInfo.aunt_name}}</span></p>
						</li>
						<li v-if="auntInfo.aunt_star">
							<p>阿姨星级：<span>{{computed_aunt_star}}</span></p>
						</li>
						<li v-if="auntInfo.aunt_marriage">
							<p>婚姻状况：<span>{{ auntInfo.aunt_marriage }}</span></p>
						</li>
						<li>
							<p>性&emsp;&emsp;别：<span>{{computed_aunt_sex}}</span></p>
						</li>
						<li>
							<p>期望薪资：<span v-if="auntInfo.aunt_salary_begin">{{auntInfo.aunt_salary_begin}}-{{auntInfo.aunt_salary_end}}元</span>
								<span v-else>面议</span>
							</p>
						</li>
						<li v-if="auntInfo.aunt_education">
							<p>学&emsp;&emsp;历：<span>{{ auntInfo.aunt_education }}</span></p>
						</li>
						<li v-if="auntInfo.aunt_age">
							<p>年&emsp;&emsp;龄：<span>{{ auntInfo.aunt_age }}岁</span></p>
						</li>
						<li v-if="auntInfo.aunt_employment_type">
							<p>是否住家：<span>{{ auntInfo.aunt_employment_type=='1'?'否':'是'}}</span></p>
						</li>
						<li v-if="auntInfo.aunt_stature">
							<p>身&emsp;&emsp;高：<span>{{ auntInfo.aunt_stature }}cm</span></p>
						</li>
						<li v-if="auntInfo.province">
							<p>籍&emsp;&emsp;贯：<span>{{ auntInfo.province }}</span></p>
						</li>
						<li v-if="auntInfo.nation">
							<p>民&emsp;&emsp;族：<span>{{ auntInfo.nation }}</span></p>
						</li>
						<li v-if="auntInfo.aunt_weight">
							<p>体&emsp;&emsp;重：<span>{{ auntInfo.aunt_weight }}kg</span></p>
						</li>
						<li v-if="auntInfo.aunt_work_experience">
							<p>工作经验：<span>{{ auntInfo.aunt_work_experience }}</span></p>
						</li>
						<li v-if="auntInfo.aunt_area">
							<p>地&emsp;&emsp;域：<span>{{ auntInfo.aunt_area=='0'?'北京':'南方' }}</span></p>
						</li>
					</ul>
				</div>
				<div id="activeIndex2" class="aunt_message_details" v-if="auntInfo.aunt_work_experiences.length>0">
					<h3>工作经历</h3>
					<div v-for="item in auntInfo.aunt_work_experiences">
						<h4>{{ item.aunt_position_type_name }}</h4>
						<strong  v-if="item.aunt_work_start && item.aunt_work_end">
							<el-col :span="2">工作时间:</el-col>
							<el-col :span="22">
								<strong>{{ item.aunt_work_start }} 至 {{ item.aunt_work_end }}</strong>
							</el-col>
						</strong>
						<strong  v-if="item.aunt_work_location">
							<el-col :span="2">工作地点:</el-col>
							<el-col :span="22">
								<strong>{{ item.aunt_work_location }}</strong>
							</el-col>
						</strong>
						<strong v-if="item.aunt_work_salary">
							<el-col :span="2">工&emsp;&emsp;资:</el-col>
							<el-col :span="22">
								<strong>{{ item.aunt_work_salary }}元</strong>
							</el-col>
						</strong>
						<strong  v-if="item.aunt_work_content">
							<el-col :span="2">工作内容:</el-col>
							<el-col :span="22">
								 <strong>{{ item.aunt_work_content }}</strong>
							</el-col>
						</strong>
					</div>
				</div>
				
				<div id="activeIndex3" class="aunt_message_details">
					<h3>求职信息</h3>
					<div v-if="auntInfo.aunt_job_intention_endpoint.length>0">
						<h4>阿姨求职意向</h4>
						<ul class="jineng clearfix">
							<li v-for="item in auntInfo.aunt_job_intention_endpoint"><span class="iconfont">{{ item.bdji_service_name }}</span></li>
							
						</ul>
					</div>
					<div v-if="auntInfo.aunt_skills.length>0">
						<h4>阿姨特长或技能</h4>
						<ul class="jineng clearfix">
							<li v-for="item in auntInfo.aunt_skills"><span class="iconfont">{{ item.bds_value }}</span></li>
						</ul>
					</div>
					<div v-if="auntInfo.aunt_credentials.length>0">
						<h4>阿姨所获证书</h4>
						<ul class="jineng clearfix">
							<li v-for="item in auntInfo.aunt_credentials"><span class="iconfont">{{ item.bdc_name }}</span></li>
						</ul>
					</div>
					<div v-if="auntInfo.aunt_hope_area.length>0">
						<h4>阿姨期望工作区域</h4>
						<ul class="jineng clearfix">
							<li v-for="item in auntInfo.aunt_hope_area"><span class="iconfont">{{ item.area_value }}</span></li>
						</ul>
					</div>
					<div v-if="auntInfo.aunt_appraise">
						<h4>对阿姨的评价</h4>
						<p class="evaluate">
							{{auntInfo.aunt_appraise}}
						</p>
					</div>
					<div v-if="auntInfo.aunt_appraise_self">
						<h4>阿姨自我评价</h4>
						<p class="evaluate" >{{auntInfo.aunt_appraise_self}}</p>
					</div>
					<div v-if="auntInfo.aunt_photograph.length>0">
						<h4>阿姨照片</h4>
						<div class="aunt_img_list">
							<div v-for="item in auntInfo.aunt_photograph">
								<img :src="item.photograph_loc" :name="item.photograph_name">
							</div>
							
						</div>
					</div>
				</div>
				<div id="activeIndex4" class="aunt_message_details" v-if="evaluateList.length>0">
					<h3>客户评价</h3>
					<div  class="evaluate" style="margin-bottom: 30px;" v-for="item in evaluateList">
						<p>{{item.appraise_type}}<em style="float: right;">{{item.appraise_time}}</em></p>
						<p>
							{{item.appraise_content}}
						</p>
					</div>
					
				</div>
			</section>

			
			
			<el-dialog title="请您填写基本信息，稍后将有专人联系您" :visible.sync="outerVisible" :close-on-click-modal="false">
				<el-form :model="form">
				   
				    <el-form-item label="姓名" :label-width="formLabelWidth">
				      	<el-input placeholder="请输入姓名" v-model="form.name" ref="apply_name"  clearable></el-input>
				    </el-form-item>
				    <el-form-item label="手机号" :label-width="formLabelWidth">
				      	<el-input placeholder="请输入手机号码" v-model="form.tel" ref="apply_tell"  clearable></el-input>
				    </el-form-item>
				    <el-form-item label="地址" :label-width="formLabelWidth">
				      	<!--<el-input placeholder="请输入地址" v-model="form.address" ref="liveInput" id="liveInput"  clearable></el-input>
				      	-->
				      	 <input type="text" placeholder="输入地址" class="el-input__inner" ref="liveInput" id="liveInput" />
				      	<!--<textarea class="mapAddress" placeholder="输入地址" ref="liveInput" id="liveInput" rows="3" maxlength="50"></textarea>-->
				    </el-form-item>
				   
			  	</el-form>
				
				
			   <!-- <el-dialog
			      width="30%"
			      title="是否确定提交！"
			      :visible.sync="innerVisible"
			      append-to-body>
			      	<div slot="footer" class="dialog-footer">
			      		<el-button type="primary" @click="besureApply">确定</el-button>
			    	</div>
			    </el-dialog>-->
			    <div slot="footer" class="dialog-footer">
			      <el-button type="primary" @click="besureApply">确定</el-button>
			    </div>
			</el-dialog>
			
			
			<div style="background: #fff;">
				<v-footer></v-footer>
			</div>
		</div>
		
	</div>
</template>

<script>
	import AMap from 'AMap'
	import VHeader from '@/components/unit/VHeader'
	import VFooter from '@/components/unit/VFooter'
	export default {
		components: {
			VHeader,
			VFooter
		},
		data() {
			return {
				outerVisible: false,
        		innerVisible: false,
        		
        		company_id : '',
				employee_id : '',
				aunt_id: '',
        		
        		
        		
        		aunt_name:'',
        		auntInfo:{
        			aunt_salary_begin:'6000',
        			aunt_salary_end:'9800',
        			aunt_work_experiences:[],
        			aunt_job_intention_endpoint:[],
        			aunt_skills:[],
        			aunt_credentials:[],
        			aunt_hope_area:[],
        			aunt_photograph:[]
        			
        		},
        		evaluateList:[], //客户评价
        		currentPageNum:1,
        		
        		
    		 	form: {
			        radio:'',
			        name:'',
			        tel:'',
			        region:'',
			        address:'',
			          
        		},
        		company_id: '',
				company_name: '',
				suoshuren_id: '',
				suoshuren_name: '',
				suoshuren_mobile: '',
				phoneNumber: '', //联系电话
        		
        		formLabelWidth: '120px',
        		
        		activeIndex:'1',
        		navList:[
        			{
	        			index:'1',
	        			title:'基本信息'
	        		},
	        		{
	        			index:'2',
	        			title:'工作经历'
	        		},
	        		{
	        			index:'3',
	        			title:'求职信息'
	        		},
	        		{
	        			index:'4',
	        			title:'客户评价'
	        		},
        		]
        		
			}
		},
		computed: {
			computed_aunt_sex(){
				switch(this.auntInfo.aunt_sex) {
					case '1':
						return '男'
						break;
					case '0':
						return '女'
						break;
					default:
						return ''
						break;
				}
			},
			computed_aunt_star () {
				switch(this.auntInfo.aunt_star) {
					case '1':
						return '一星'
						break;
					case '2':
						return '二星'
						break;
					case '3':
						return '三星'
						break;
					case '4':
						return '四星'
						break;
					case '5':
						return '五星'
						break;
					default:
						return ''
						break;
				}
			}

		},
		mounted() {
			this.getGaode();
			this.$store.commit("switch", '2');
			
			this.queryAuntDetails();
			this.queryEvaluate();
			this.queryCompany();
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				console.log(this.activeIndex);
				this.activeIndex = key;
			},
			
			queryAuntDetails(){
				this.company_id = this.$route.query.company_id;
				this.employee_id = this.$route.query.employee_id;
				this.aunt_id = this.$route.query.aunt_id;
				let programs = {
					aunt_id: this.aunt_id
				}

				this.$http.post(process.env.API_HOST + '/websiteAuntController/selectAuntInfomationDetailByAuntId', programs).then(response => {
					console.log(response,"阿姨详情");
					let res = response.data;
					if(res.true){
						this.auntInfo = res.data;
						
					}
				})
				
				
				this.$http.post(process.env.API_HOST + '/homeController/getPermissionEmployeeById', {
					company_id: this.$route.query.company_id,
					employee_id: this.$route.query.employee_id
				}).then(response => {
					console.log(response, 'emp')
					let res = response.data;
					if(res.true) {
						this.phoneNumber = res.data;
					}
				})
				
			},
			queryEvaluate(){
				//查询评价
				let programs ={
					aunt_customer_appraise: {
						aunt_id: this.$route.query.aunt_id
					},
					pageUtil: {
						currentPageNum: this.currentPageNum
					}
				}
				this.$http.post(process.env.API_HOST + '/websiteAuntController/selectAuntCustomerAppraiseList',programs).then(response=>{
					let res = response.data;
					if(res.true){
						console.log(res,'pingjia1');
						res.data.data.forEach(item=>{
							switch(item.appraise_type){
								case '0':
								  item.appraise_type='好评'
								  break;
								case '1':
								  item.appraise_type='一般'
								  break;
								case '2':
								  item.appraise_type='差评'
								  break;
							}
						})
						this.evaluateList = this.evaluateList.concat(res.data.data)
						//this.evaluateNum = res.data.num;
						console.log(this.evaluateList,'11')
					}
				})
			},
			queryCompany() {
				//查询公司信息
				this.$http.post(process.env.API_HOST + 'homeController/selectPermissionCompanyByCompanyId', {
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
			besureApply() { //预约
				
				
				let tellReg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				
				
				if(!this.form.name){
					this.$message({
			          	showClose: true,
			          	message: '姓名不能为空',
			          	type: 'warning'
			        });
					
					this.$refs.apply_name.focus()
					return;
				}else if(this.form.name.length>10){
					this.$message({
			          	showClose: true,
			          	message: '姓名不能超过10个字',
			          	type: 'warning'
			        });
					this.$refs.apply_name.focus();
					return;
				}else if(this.form.tel==''){
					this.$message({
			          	showClose: true,
			          	message: '手机号不能为空',
			          	type: 'warning'
			        });
					this.$refs.apply_tell.focus();
					return;
				}else if(!tellReg.test(this.form.tel)){
	    			this.$message({
			          	showClose: true,
			          	message: '请输入有效手机号',
			          	type: 'warning'
			        });
	    			this.$refs.apply_tell.focus();
	    			return;
	    		}else if(this.form.address&&this.$refs.form.address.length>50){
	    			this.$message({
			          	showClose: true,
			          	message: '地址不能超过50个字',
			          	type: 'warning'
			        });
	    			this.$refs.liveInput.focus()
	    			return;
	    			
	    		}
				
				const loading = this.$loading({
		          lock: true,
		          text: '提交中',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		       });
				
				
					let arr = []
					this.auntInfo.aunt_job_intention_endpoint.forEach(item => {
						arr.push(item.bdji_service_name)
					})
					//console.log(arr)
					let str = arr.join(',')
					//console.log(str)
					let programs = {
						name: this.form.name, //姓名
						mobile: this.form.tel, //手机号
						place: this.form.address, //地址

						company_id: this.company_id, //公司id
						company_name: this.company_name, //公司名字
						suoshuren_id: this.suoshuren_id, //所属人
						suoshuren_name: this.suoshuren_name,
						suoshuren_mobile: this.suoshuren_mobile,

						i_aunt_id: this.auntInfo.aunt_id, //意向阿姨ID
						i_aunt_contact: this.auntInfo.aunt_mobile, //意向阿姨联系方式
						i_aunt_name: this.auntInfo.aunt_name, //意向阿姨名称
						i_aunt_sex: this.auntInfo.aunt_sex, //意向阿姨性别
						i_aunt_age: this.auntInfo.aunt_age, //意向阿姨年龄
						i_aunt_origin: this.auntInfo.province_id, //意向阿姨籍贯
						i_aunt_exp: this.auntInfo.aunt_work_experience_data, //意向阿姨工作经验
						i_aunt_intention: str //意向阿姨意向

					}
					console.log(programs)

					this.$http.post(process.env.API_HOST + '/detailsMoudleController/addAuntRecommend', programs).then(response => {
						console.log(response,'预约预约')
						let res = response.data;
						if(res.true) {
							loading.close();
							this.$message({
					          	showClose: true,
					          	message: '感谢您的预约，稍后将有专人与您联系，请保持电话畅通，谢谢',
					          	type: 'success'
					       });
					  		this.outerVisible = false
						} else {
						}
					})
			},
			
			
			
			/*高德地图搜索地址*/
			getGaode() {
				let map = new AMap.Map('container');
				let _this = this;
				console.log(AMap,'sdfds')
				AMap.plugin([
					'AMap.Autocomplete'
				], function() {
					let autoOptions = {
						city: "", //城市，默认全国
						input: "liveInput" //使用联想输入的input的id
					};
					let auto = new AMap.Autocomplete(autoOptions);
					AMap.event.addListener(auto, "select", function(e) {
						//TODO 针对选中的poi实现自己的功能
						console.log(e)
						this.form.address = e.poi.name;
						console.log(this.form.address)
					});

				});
				
				console.log(AMap,'sd234fds')
			},
			/*-----------搜索地址end---------*/
			
			
			
		}
	}
</script>

<style scoped>
	.el-menu-demo{
		border-bottom:solid 1px #e6e6e6 !important;
	}
	.breadbox{
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		
	}
	.el-breadcrumb{
		line-height: 48px !important;
	}
	.cell_box_aunt{
		background: #f5f5f5;
		overflow: hidden;
		position: relative;
		padding: 30px 0;
	}
	.boxs_aunt_details{
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
	}
	.aunt_img{
		overflow: hidden;
		float:left;width: 300px; height: 300px; border-radius: 15px; margin-right: 30px;
	}
	.aunt_message{
		float: left; background: #fff; height: 300px; width: 870px;
		text-align: left;
	}
	.aunt_messageLeft{
		float: left;
		padding-left: 20px;
	}
	.aunt_messageLeft .aunt_name {
		text-align: left;
		font-size: 22px;
		color: #1aad19;
		line-height: 64px;
		margin-bottom: 15px;
	}
	.aunt_messageRight{
		width: 196px;
		float: right;
	}
	.aunt_messageRight .aunt_salary {
		height: 85px;
		padding-top: 60px;
		text-align: center;
	}
	.aunt_messageRight .aunt_salary h2{
		font-size: 12px;
		letter-spacing: 2px;
	}
	.aunt_messageRight .aunt_salary span{
		font-size: 20px;
		color: #00A10A;
		line-height: 50px;
		letter-spacing: 2px;
	}
	
	
	.aunt_message .tags {
		display: inline-block;
		color: #7d9ab6;
		font-size: 12px;
		height: 34px;
		line-height: 34px;
		margin-bottom: 36px;
	}
	.aunt_message .tags li {
		float: left;
		margin-right: 20px;
		padding: 0 20px;
		border: 1px solid #d5dbe0;
		background: rgba(237, 244, 250, .8);
	}
	 .jineng {
		overflow: hidden;
		color: #7d9ab6;
		font-size: 12px;
		line-height: 34px;
	}
	 .jineng li {
		float: left;
		width: 30%;
		margin-bottom: 20px;
	}
	 .jineng span{
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    display: block;
	    height: 20px;
	    line-height: 20px;
	    background: #fff;
	    position: relative;
	    font-size: 14px;
	    padding: 0 0 0 38px;
	    color: #3f3f3f;
	    font-family: "iconfont" !important;
	}
	 .jineng span:before {
	    content: "\E709";
	    position: absolute;
	    left: 0;
	    top: 0;
	    font-size: 24px;
	    color: #1aad19;
	}
	.mess_tel{
		color: #929292;
		padding: 20px 0;
		line-height: 27px;
		font-size: 14px;
		font-weight: 600;
		font-family: "微软雅黑";
	}
	.mess_tel a{
		display: inline-block;
		padding: 0 10px;
		color: #414046;
	}
	.share_btn{
		display: inline-block;
		color: #929292;
		padding: 20px 0;
		line-height: 27px;
		font-size: 14px;
		font-weight: 600;
		font-family: "微软雅黑";
	}
	
	
	.aunt_message_details{
		text-align: left;
		border-bottom: 1px solid #e0e0e0;
	}
	.aunt_message_details:last-child{
		border: none;
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
	}
	.aunt_message_details .evaluate {
		padding: 22px 30px;
		line-height: 30px;
		color: #3f3f3f;
		background: #f7f6f6;
		border-radius: 10px;
	}
	
	.aunt_img_list{
		width: 100%;
		overflow: hidden;
		display: flex;
	}
	.aunt_img_list div{
		flex: 1;
	}
	.aunt_img_list img{
		width: 136px;
		height: 136px;
	}
	
	
	
	#container {
    width: 200px;
    height: 200px;
  }
</style>