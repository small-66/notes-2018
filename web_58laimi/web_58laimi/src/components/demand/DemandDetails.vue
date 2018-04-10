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
						 	<el-breadcrumb-item :to="{ path: '/demandList',query:{company_id:company_id,employee_id:employee_id} }">需求列表</el-breadcrumb-item>
						  	<el-breadcrumb-item>需求详情</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					
				</div>
			</div>
				
			<section class="boxs_aunt_details">
				
				
				<div class="aunt_message_details">
					<h3>需求信息</h3>
					<div style="overflow: hidden;">
						<el-row>
							<strong>
								<el-col :span="2">需求名称:</el-col>
								<el-col :span="22">
									<strong>{{message.demand_title}}</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong>
								<el-col :span="2">工作地点:</el-col>
								<el-col :span="22">
									<strong>{{message.demand_location}}</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong>
								<el-col :span="2">工&emsp;&emsp;资:</el-col>
								<el-col :span="22">
									<strong v-if="message.demand_salary_end && message.demand_salary_begin">
							            <em class="detailPrice">{{message.demand_salary_begin}}<span v-if="message.demand_salary_begin !== message.demand_salary_end">-{{message.demand_salary_end}}</span></em>元
									</strong>
									<strong v-else-if="!message.demand_salary_end && message.demand_salary_begin">
							            <em class="detailPrice">{{message.demand_salary_begin}}</em>元起</span>
									</strong>
									<strong v-else-if="message.demand_salary_end && !message.demand_salary_begin">
							            <em class="detailPrice">0-{{message.demand_salary_end}}</em>元</span>
									</strong>
									<strong v-else>
							                面议
						            </strong>
									
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="message.demand_age_end!=null&&message.demand_age_end!='0'">
								<el-col :span="2">年&emsp;&emsp;龄:</el-col>
								<el-col :span="22">
									<strong>{{message.demand_age_begin}}-{{message.demand_age_end}}岁</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="message.demand_sex">
								<el-col :span="2">性&emsp;&emsp;别:</el-col>
								<el-col :span="22">
									<strong>{{message.demand_sex}}</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="message.demand_people_num">
								<el-col :span="2">需要人数:</el-col>
								<el-col :span="22">
									<strong>{{message.demand_people_num}}人</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_skills_Vos.length">
								<el-col :span="2">需要要求:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_skills_Vos">
											<span class="yq">{{item.bds_value}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="message.demand_content">
								<el-col :span="2">需求备注:</el-col>
								<el-col :span="22">
									 <strong>{{message.demand_content}}</strong>
							
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="demand_is_live_together">
								<el-col :span="2">是否住家:</el-col>
								<el-col :span="22">
									 <strong>{{demand_is_live_together}}</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="demand_job_type">
								<el-col :span="2">工作性质:</el-col>
								<el-col :span="22">
									 <strong>{{demand_job_type}}</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="demand_jobs_experience">
								<el-col :span="2">工作经验:</el-col>
								<el-col :span="22">
									 <strong>{{demand_jobs_experience}}</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="demand_education">
								<el-col :span="2">学历要求:</el-col>
								<el-col :span="22">
									 <strong>{{demand_education}}</strong>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_credentials_Vos.length">
								<el-col :span="2">证书要求:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_credentials_Vos">
											<span class="yq">{{item.bdc_name}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_constellation_Vos.length">
								<el-col :span="2">优先星座:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_constellation_Vos">
											<span class="yq">{{item.constellation_value}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_constellation_Vos_third.length">
								<el-col :span="2">不要星座:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_constellation_Vos_third">
											<span class="yq">{{item.constellation_value}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_zodiac_Vos.length">
								<el-col :span="2">优先生肖:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_zodiac_Vos">
											<span class="yq">{{item.zodiac_value}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_zodiac_Vos_third.length">
								<el-col :span="2">不要生肖:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_zodiac_Vos_third">
											<span class="yq">{{item.zodiac_value}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_province_Vos.length">
								<el-col :span="2">优先省份:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_province_Vos">
											<span class="yq">{{item.province_value}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_province_Vos_third.length">
								<el-col :span="2">不要省份:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_province_Vos_third">
											<span class="yq">{{item.province_value}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
						<el-row>
							<strong v-if="customer_demand_cook_Vos.length">
								<el-col :span="2">擅长菜系:</el-col>
								<el-col :span="22">
									<ul class="tags clearfix">
										<li class="lis" v-for="item in customer_demand_cook_Vos">
											<span class="yq">{{item.cook_value}}</span>
										</li>
									</ul>
								</el-col>
							</strong>
						</el-row>
							
					</div>
					
				</div>
				<div style="margin-top:20px ;">
					<el-button  plain @click="backHome">返回首页</el-button>
				  	<el-button type="success" plain  @click="outerVisible=true">我来应聘</el-button>
				   	<el-button type="success" @click="toAddDemand">发布需求</el-button>
				</div>
				
			</section>

			
			<el-dialog title="请您填写基本信息，稍后将有专人联系您" :visible.sync="outerVisible" :close-on-click-modal="false">
				<el-form :model="form" style="width: 80%;">
				   
				    <el-form-item label="我是" :label-width="formLabelWidth">
				      	<el-radio v-model="styleType" label="0">阿姨</el-radio>
  						<el-radio v-model="styleType" label="1">同行</el-radio>
				    </el-form-item>
				    <el-form-item label="姓名" :label-width="formLabelWidth">
				      	<el-input placeholder="请输入姓名，最多10个字" v-model="apply_name" ref="apply_name" clearable></el-input>
				    </el-form-item>
				    <el-form-item label="手机号" :label-width="formLabelWidth">
				      	<el-input placeholder="请输入手机号，最多11位" v-model="apply_tell" ref="apply_tell" clearable></el-input>
				    </el-form-item>
			     	<el-form-item label="求职类型" :label-width="formLabelWidth">
				      	<!--<el-select v-model="aunt_job_intentions" placeholder="请选择活动区域">
				        	<el-option label="区域一" value="shanghai"></el-option>
				        	<el-option label="区域二" value="beijing"></el-option>
				      	</el-select>-->
				      	<el-button type="text"  @click="showJob=true">请选择</el-button>
				    </el-form-item>
				    <div class="choseService">
				    	<ul class="tags clearfix">
							<li class="lis" v-for="(ins,index) in service_pop">
								<span class="yq">{{ins.bdji_name}} <span class="el-icon-delete" @click="delThis(index)"></span></span>
							</li>
						</ul>
				    </div>
				    <el-form-item label="地址" :label-width="formLabelWidth">
				    	<input type="text" placeholder="输入地址，最多50个字" class="el-input__inner" ref="liveInput" id="liveInput" />
				      	<!--<el-input placeholder="请输入内容" v-model="address" ref="liveInput"  clearable></el-input>-->
				    </el-form-item>
				   
			  	</el-form>
				
				
			    <!--<el-dialog
			      width="30%"
			      title="是否确定提交！"
			      :visible.sync="innerVisible"
			      append-to-body>
			      	<div slot="footer" class="dialog-footer">
			      		<el-button type="primary" @click="innerVisible = false">确定</el-button>
			    	</div>
			    </el-dialog>-->
			    <div slot="footer" class="dialog-footer">
			      <el-button type="primary" @click="besureApply">确定</el-button>
			    </div>
			</el-dialog>
			
			
			
			
			
			<el-dialog title="请选择您的求职类型" :visible.sync="showJob" :close-on-click-modal="false" width="1202px" center>
		  
				  <section class="cell_box_dialog">
						<div class="boxs">
							<el-col :span="20" :offset="4">
								<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#fff" text-color="#000" active-text-color="#ffd04b">
									<el-menu-item :index="item.index" v-for="item in navList" :key="item.index">{{item.title}}</el-menu-item>
								</el-menu>
							</el-col>
							<el-col :span="24" v-for="(item,index) in list2" :key="index">
								<div  v-if="activeIndex==index">
									<ul class="service_list">
										<li v-for="em in item.basic_data_service_types">
											<h2>
												<span>{{em.bdst_value}}</span>
											</h2>
											<ul class="service_list_section">
												<li v-for="i in em.basic_data_services">
													<span>
							                          <input type="checkbox" name="intentions"  :id="i.bdji_id" :value="i" v-model="service_pop"
							                          	:disabled="service_pop.length >= 6 && service_pop.indexOf(i) < 0"
							                          	 >
							                          <label class="iconfont" :for="i.bdji_id">{{i.bdji_name}}</label>
							                        </span>
												</li>
											</ul>
										</li>
										
									</ul>
								</div>
								
							</el-col>
							
						</div>
		
					</section>
		  
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="service_type=''">取 消</el-button>
				    <el-button type="primary" @click="queryService">确 定</el-button>
				  </span>
		</el-dialog>
			
			
			
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
				outerVisible: false,
        		innerVisible: false,
        		showJob:false,
        		
        		activeIndex: '0',
				navList: [],
				service_pop:[],
				
				
				list2:[],
        		
    		 	form: {
			        radio:'',
			        name:'',
			        tel:'',
			        region:'',
			        address:'',
			          
        		},
        		formLabelWidth: '120px',
        		
        		message:{
        			
        		},
        		
        		styleType: '',
				apply_name: '',
				apply_tell: '',
				address: '',
				aunt_job_intentions: [],
				customer_demand_credentials_Vos: [],
				demand_is_live_together: '',
				demand_job_type: '',
				demand_jobs_experience: '',
				demand_education: '',
				customer_demand_credentials_Vos: [],
				customer_demand_constellation_Vos: [],
				customer_demand_constellation_Vos_third: [],
				customer_demand_zodiac_Vos: [],
				customer_demand_zodiac_Vos_third: [],
				customer_demand_province_Vos: [],
				customer_demand_province_Vos_third: [],
				customer_demand_cook_Vos: [],
				customer_demand_skills_Vos: [],
				
				demand_id: '',
				company_id: '',
				employee_id:'',
				company_name: '',
				suoshuren_id: '',
				suoshuren_name: '',
				suoshuren_mobile: '',
        		
        		
			}
		},
		mounted() {
			this.$store.commit("switch", '4');
			this.queryCompany();
			this.queryServices();
		},
		methods: {
			
			
			delThis(index){
				this.service_pop.splice(index,1)
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
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				console.log(this.activeIndex);
				this.activeIndex = key;
			},
			queryServices() {
				this.company_id=this.$route.query.company_id;
				this.employee_id=this.$route.query.employee_id;
				this.$http.post(process.env.API_HOST + '/websiteDataListController/selectOneLevel',{
					company_id: this.$route.query.company_id
				}).then(response => {
						console.log(response,'list2');
						let res = response.data
						if(res.true) {
							console.log(res)
							this.list2 = res.data
							this.list2.forEach((item,index)=>{
								this.navList.push({
									index: index+'',
									title: item.bdst_value
								})		
							})
							
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
						
						this.queryDemandDetails();
					}
				})
			},
			queryDemandDetails(){
				this.company_id = this.$route.query.company_id
				this.employee_id = this.$route.query.employee_id
				this.$http.post(process.env.API_HOST + '/websiteCustomerController/demandDetails', {
					demand_id: this.$route.query.demand_id,
					suoshuren_id:this.employee_id
				}).then(response => {
					console.log(response, 'message')
					let res = response.data;
					if(res.true) {
						this.message = res.data;
						if(res.data.demand_mobile) {
							this.suoshuren_mobile = res.data.demand_mobile
						}

						this.demand_is_live_together = res.data.demand_is_live_together;
						switch(this.demand_is_live_together) {
							case "1":
								this.demand_is_live_together = '是';
								break;
							case "0":
								this.demand_is_live_together = '否';
								break;
							case "2":
								this.demand_is_live_together = '均可';
								break;
							default:
								break;
						}
						this.demand_job_type = res.data.demand_job_type;
						switch(this.demand_job_type) {
							case "1":
								this.demand_job_type = '兼职';
								break;
							case "0":
								this.demand_job_type = '全职';
								break;
							default:
								break;
						}
						this.demand_jobs_experience = res.data.demand_jobs_experience;
						switch(this.demand_jobs_experience) {
							case '00':
								this.demand_jobs_experience = '1年至2年';
								break;
							case '01':
								this.demand_jobs_experience = '2年至3年';
								break;
							case '02':
								this.demand_jobs_experience = '3年至4年';
								break;
							case '03':
								this.demand_jobs_experience = '4年至5年';
								break;
							case '04':
								this.demand_jobs_experience = '5年至6年';
								break;
							case '05':
								this.demand_jobs_experience = '6年至7年';
								break;
							case '06':
								this.demand_jobs_experience = '7年至8年';
								break;
							case '07':
								this.demand_jobs_experience = '8年至9年';
								break;
							case '08':
								this.demand_jobs_experience = '9年至10年';
								break;
							case '09':
								this.demand_jobs_experience = '10年及以上';
								break;
							default:
								break;
						}
						this.demand_education = res.data.demand_education;
						switch(this.demand_education) {
							case "0":
								this.demand_education = '学历不限';
								break;
							case "1":
								this.demand_education = '小学';
								break;
							case "2":
								this.demand_education = '初中';
								break;
							case "3":
								this.demand_education = '高中';
								break;
							case "4":
								this.demand_education = '中专';
								break;
							case "5":
								this.demand_education = '大专';
								break;
							case "6":
								this.demand_education = '本科';
								break;
							case "7":
								this.demand_education = '研究生';
								break;
							case "8":
								this.demand_education = '博士生';
								break;
							case "9":
								this.demand_education = '博士后';
								break;
							default:
								break;
						}

						this.customer_demand_credentials_Vos = res.data.customer_demand_credentials_Vos || [];
						this.customer_demand_constellation_Vos = res.data.customer_demand_constellation_Vos || [];
						this.customer_demand_constellation_Vos_third = res.data.customer_demand_constellation_Vos_third || [];
						this.customer_demand_zodiac_Vos = res.data.customer_demand_zodiac_Vos || [];
						this.customer_demand_zodiac_Vos_third = res.data.customer_demand_zodiac_Vos_third || [];
						this.customer_demand_province_Vos = res.data.customer_demand_province_Vos || [];
						this.customer_demand_province_Vos_third = res.data.customer_demand_province_Vos_third || [];
						this.customer_demand_cook_Vos = res.data.customer_demand_cook_Vos || [];
						this.customer_demand_skills_Vos = res.data.customer_demand_skills_Vos || [];

						// console.log('星座', this.customer_demand_constellation_Vos.length)
						// console.log('证书', this.customer_demand_credentials_Vos)

						if(res.data.demand_salary_unit == '0') {
							res.data.demand_salary_unit = '小时'
						} else if(res.data.demand_salary_unit == '1') {
							res.data.demand_salary_unit = '天'
						} else if(res.data.demand_salary_unit == '2') {
							res.data.demand_salary_unit = '周'
						} else if(res.data.demand_salary_unit == '3') {
							res.data.demand_salary_unit = '月'
						} else {
							res.data.demand_salary_unit = '年'
						}
						switch(res.data.demand_sex) {
							case '1':
								res.data.demand_sex = '男'
								break;
							case '0':
								res.data.demand_sex = '女'
								break;
							default:
								break;
						}

						
					}

				})
			},
			
			queryService() { //求职意向
				this.showJob = false;
				this.aunt_job_intentions = []
				for(let i = 0; i < this.service_pop.length; i++) {
					let service_id = this.service_pop[i].bdji_id
					this.$http.post(process.env.API_HOST + 'websiteDataListController/getBaseServiceType', {
							bdji_id: service_id
						})
						.then(response => {

							let res = response.data
							console.log(res, '求职意向');
							if(res.true) {
								this.aunt_job_intentions.push({
									bdji_service_id: this.service_pop[i].bdji_id, // 三级id
									bdji_service_name: this.service_pop[i].bdji_name, // 三级name
									bdji_type_lvl2_id: res.data.bdst_id, // 二级id
									bdji_type_lvl2_name: res.data.bdst_value, // 二级name
									bdji_type_id: res.data.parent_bdst_id, // 一级id
									bdji_type_name: res.data.parent_bdst_value // 一级name
								})
							}
						})
						.catch(error => {
							console.log(error)
						})
				}
				console.log(this.aunt_job_intentions, this.service_pop, '45454874dsfdsfds')
			},
			
			
			besureApply() {
				
				
				let tellReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if(this.styleType == '') {
					this.$message({
			          	showClose: true,
			          	message: '请选择您的身份',
			          	type: 'warning'
			        });
			        return;
			        
				} else if(this.apply_name == '') {
					this.$message({
			          	showClose: true,
			          	message: '姓名不能为空',
			          	type: 'warning'
			        });
			        this.$refs.apply_name.focus();
			        return;
					
				} else if(this.apply_name.length > 10) {
					this.$message({
			          	showClose: true,
			          	message: '姓名不能超过10个字',
			          	type: 'warning'
			        });
					this.$refs.apply_name.focus();
				} else if(this.apply_tell == '' || this.apply_tell.indexOf(" ") != -1) {
					this.$message({
			          	showClose: true,
			          	message: '手机号不能为空',
			          	type: 'warning'
			        });
					this.$refs.apply_tell.focus();
					return;
				} else if(!tellReg.test(this.apply_tell)) {
					this.$message({
			          	showClose: true,
			          	message: '请输入有效手机号',
			          	type: 'warning'
			        });
	    			this.$refs.apply_tell.focus();
	    			return;
				} else if(this.aunt_job_intentions.length == 0) {
					this.$message({
			          	showClose: true,
			          	message: '请选择求职类型',
			          	type: 'warning'
			       });
	    			return;
				} 

					let units = this.message.demand_salary_unit;
					if(units == '小时') {
						units = '0'
					} else if(units == '天') {
						units = '1'
					} else if(units == '周') {
						units = '2'
					} else if(units == '月') {
						units = '3'
					} else {
						units = '4'
					}
					let programs = {
						name: this.apply_name,
						mobile: this.apply_tell,
						place: this.$refs.liveInput.value,
						aunt_type: this.styleType,

						company_id: this.company_id, //公司id
						company_name: this.company_name, //公司名字
						suoshuren_id: this.suoshuren_id, //所属人
						suoshuren_name: this.suoshuren_name, //所属人
						suoshuren_mobile: this.suoshuren_mobile,

						i_customer_name: this.message.demand_user, //意向客户姓名
						i_customer_mobile: this.message.demand_mobile, //意向客户电话

						i_customer_demand_type_id: this.message.demand_type_id, //意向客户需求类型id
						i_customer_demand_id: this.message.demand_id, //意向客户需求ID

						i_customer_demand_title: this.message.demand_title, //意向客户需求标题
						i_customer_demand_service_id: this.message.demand_service, //意向客户需求服务id
						i_customer_demand_service_name: this.message.demand_service_name, //意向客户需求服务名称

						i_customer_demand_content: this.message.demand_content, //意向客户需求内容
						i_customer_salary_start: this.message.demand_salary_begin, //意向客户需求薪资起始
						i_customer_salary_end: this.message.demand_salary_end, //意向客户需求薪资结束
						i_customer_salary_unit: units, //

						i_customer_location: this.message.demand_location, //意向客户需求地址
						aunt_job_intentions: this.aunt_job_intentions

					}
					if(programs.place && programs.place.length > 50) {
						this.$message({
				          	showClose: true,
				          	message: '地址不能超过50个字',
				          	type: 'warning'
				        });
		    			this.$refs.liveInput.focus()
		    			return;
					}
					console.log(programs, 'yingpin');
					 const loading = this.$loading({
				          lock: true,
				          text: '提交中',
				          spinner: 'el-icon-loading',
				          background: 'rgba(0, 0, 0, 0.7)'
			       	});
					this.$http.post(process.env.API_HOST + '/detailsMoudleController/comeApplyJob', programs).then(response => {
						console.log(response, '我来应聘')
						let res = response.data;
						if(res.true) {
							loading.close();
							this.outerVisible = false;
							this.$message({
					          	showClose: true,
					          	message: '感谢您的预约，稍后将有专人与您联系，请保持电话畅通，谢谢',
					          	type: 'success'
					        });
						} else {
							loading.close();
							this.$message({
					          	showClose: true,
					          	message: res.msg,
					          	type: 'warning'
					       });
						}
					})
				
			},
			
			
			
			toAddDemand(){
				this.$router.push({
					path:'/iamCustomer',
					query:{
						demand_id: this.$route.query.demand_id,
						company_id: this.$route.query.company_id,
						employee_id: this.$route.query.employee_id,
						from_demand: true
					}
				})
			}
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
		overflow: hidden;
	}
	.tags .lis {
		float: left;
		margin-right: 20px;
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
	.aunt_message_details>li{
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
	.aunt_message_details  .yq{
		line-height: 34px;
		border: 1px solid #d5dbe0;
		background: #edf4fa;
		color: #7d9ab6;
		display: inline-block;
		padding: 0 20px;
		margin-right: 12px;
	}
	.aunt_message_details  .yq:last-child{
		margin: 0;
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
	
	
	
	.cell_box_dialog{
		overflow: hidden;
		position: relative;
	}
	.cell_box_dialog .boxs{
		background: #fff;
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
	}
	.service_list{
		padding:45px 0 0 30px;
		overflow: hidden;
	}
	.service_list li{
		float: left;
		width: 25%;
	}
	.service_list h2{
		font-size:16px;
		color:#00a10a;
		overflow:hidden;
		line-height:28px;	
	}
	.service_list  h2 span{
		float:left;
	}
	.service_list_section{
		overflow: hidden;
	}
	.service_list_section li{
		float: left;
		position: relative;
		width:134px;
		text-align: left;
		line-height:25px;
		margin-bottom: 40px;
		color: #636363;
	}
	
	.service_list>li:last-child{
		border: none !important;
	}
	.service_list_section span{
		white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    display: block;
	    height:25px;
	    line-height: 25px;
	    background: #fff;
	    position: relative;
	    font-size: 20px;
	    padding: 0 0 0 38px;
	    color: #3f3f3f;
	}
	.service_list_section input{
		display: none;
	}
	.service_list_section label{
		position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    display: block;
	    padding: 0 0 0 38px;
	    line-height: 25px;
	    color: #3f3f3f;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;	
	}
	.service_list_section label:before{
		content: "\E6F2";
	    position: absolute;
	    left: 0;
	    top: 2px;
	    font-size: 20px;
	    line-height: 25px;
	    color: #b2b2b2;
	}
	.service_list_section :checked+label:before {
	    content: "\E709";
	    color: #1aad19;
	}
	
	.el-radio-button .el-radio-button__inner{
		border: 1px solid #dcdfe6 !important;
	}
	
	
	
	.choseService .tags {
		width: 100%;
		padding: 0 20px;
		display: inline-block;
		color: #7d9ab6;
		font-size: 12px;
		height: 38px;
		line-height: 34px;
		margin-bottom: 36px;
		overflow: hidden;
	}
	.tags .lis {
		float: left;
		margin-right: 20px;
	}
	.choseService  .yq{
		line-height: 34px;
		border: 1px solid #d5dbe0;
		background: #edf4fa;
		color: #7d9ab6;
		display: inline-block;
		padding: 0 20px;
		margin-right: 12px;
	}
	.choseService  .yq:last-child{
		margin: 0;
	}
</style>