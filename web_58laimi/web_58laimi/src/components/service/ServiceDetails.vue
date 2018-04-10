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
						 	<el-breadcrumb-item :to="{ path: '/serviceList',query:{company_id:company_id,employee_id:employee_id} }">服务列表</el-breadcrumb-item>
						  	<el-breadcrumb-item>服务详情</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					
				</div>
			</div>
			<section class="cell_box">
				<!--<div class="tag_service">
					<el-button-group>
					  <el-button type="success" plain :autofocus="true">服务介绍</el-button>
					  <el-button type="success" plain>人员匹配</el-button>
					</el-button-group>
				</div>-->
				
				<el-tabs class="boxs_service" v-model="activeName" type="border-card" @tab-click="">
				    <el-tab-pane label="服务介绍" name="first">
				    	<section>
					<div class="boxs_service">
						<div>
							<h4>{{serviceMessage.bdji_type_two_name}}</h4>
							<h5>{{serviceMessage.bdji_title}}
								<b v-if="serviceMessage.service_salary_begin&&serviceMessage.service_salary_end">
									<span class="salary_service">{{serviceMessage.service_salary_begin}}-{{serviceMessage.service_salary_end}}</span>元/{{serviceMessage.service_salary_unit}}</b>
								<b v-else-if="serviceMessage.service_salary_begin&&!serviceMessage.service_salary_end"><span class="salary_service">{{serviceMessage.service_salary_begin}}</span>元/{{serviceMessage.service_salary_unit}}起</b>
								<b v-else>面议</b>
							</h5>
						</div>
					</div>
					<div class="boxs_service">
						<div>
							<h4>服务内容</h4>
							<p>
								{{serviceMessage.service_content}}
							</p>
						</div>
					</div>
					<div class="boxs_service">
						<div>
							<h4>服务优势与特色</h4>
							<p>
								{{serviceMessage.service_feature}}
							</p>
						</div>
					</div>
					<div class="boxs_service">
						<div>
							<h4>服务流程</h4>
							<p>
								{{serviceMessage.service_flow}}
							</p>
						</div>
					</div>
					<div class="boxs_service">
						<div>
							<h4>服务须知</h4>
							<p>
								{{serviceMessage.service_notice}}
							</p>
						</div>
					</div>
					<div class="boxs_service">
						<div>
							<h4>服务展示</h4>
							<ul class="img_list">
								<li class="img_service_ly" v-for="item in serviceMessage.service_photograph_Pos">
									<img :src="item.service_pic_location" />
								</li>
							</ul>
						</div>
					</div>
				
				</section>
				
				    	
				    </el-tab-pane>
				    <el-tab-pane label="人员匹配" name="second">
				    	<!--
                        	人员匹配
                        -->
				    	<ul class="housekeeping">
							<li v-for="auntInfo in auntInfoList">
								<dl class="housekeepingTop">
									<dt>
				                    	<img v-lazy="auntInfo.photograph_loc">
				                  	</dt>
									<dd>
										<div>
											<h2 class="aunt_name">{{ auntInfo.aunt_name }}</h2>
										</div>
										<ul class="tags clearfix">
											<li v-if="auntInfo.aunt_work_experience">{{ auntInfo.aunt_work_experience }}经验</li>
											<li v-if="auntInfo.aunt_age">{{ auntInfo.aunt_age }}岁</li>
											<li v-if="auntInfo.province">{{ auntInfo.province }}人</li>
										</ul>
										<dl class="aunt_service" v-if="auntInfo.bdji_service_name">
											<dt>意向：</dt>
											<dd>
												<span v-for="service in auntInfo.bdji_service_name">{{ service }}</span>
											</dd>
										</dl>
										<dl class="aunt_service" v-if="auntInfo.bdc_name">
											<dt>证书：</dt>
											<dd>
												<span v-for="item in auntInfo.bdc_name">{{ item }}</span>
											</dd>
										</dl>
									</dd>
									<dd class="salary">
										<div>
											<h2 v-if="auntInfo.aunt_salary_begin">期望薪资</h2>
											<h2 v-else>薪资面议</h2>
										</div>
										<ul>
											<li v-if="auntInfo.aunt_salary_begin && auntInfo.aunt_salary_end">
												<span>{{ auntInfo.aunt_salary_begin }}</span><span v-if="auntInfo.aunt_salary_begin !== auntInfo.aunt_salary_end">-{{ auntInfo.aunt_salary_end }}</span>元</li>
											<li v-else-if="auntInfo.aunt_salary_begin && !auntInfo.aunt_salary_end">
												<span>{{ auntInfo.aunt_salary_begin }}</span>元起</li>
											<li v-else-if="!auntInfo.aunt_salary_begin && auntInfo.aunt_salary_end"><span>0-{{ auntInfo.aunt_salary_end}}</span>元</li>
	
										</ul>
										<el-button plain @click="toAuntDetails(auntInfo)">查看详情</el-button>
									</dd>
								</dl>
							</li>
						</ul>
				    	
				    	
				    	
				    </el-tab-pane>
			  	</el-tabs>
				
				
				
				<div>
					<el-button  plain @click="backHome">返回首页</el-button>
				  	<el-button type="success" plain>我来应聘</el-button>
				   	<el-button type="success" @click="outerVisible=true">预约服务</el-button>
				</div>
				
			</section>
			
			<el-dialog title="请您填写基本信息，稍后将有专人联系您" :visible.sync="outerVisible" :close-on-click-modal="false">
				<el-form :model="form">
				    <el-form-item label="我是" :label-width="formLabelWidth">
				      	<el-radio v-model="form.radio" label="0">阿姨</el-radio>
  						<el-radio v-model="form.radio" label="1">同行</el-radio>
				    </el-form-item>
				    <el-form-item label="姓名" :label-width="formLabelWidth">
				      	<el-input placeholder="请输入内容" v-model="form.name"  clearable></el-input>
				    </el-form-item>
				    <el-form-item label="手机号" :label-width="formLabelWidth">
				      	<el-input placeholder="请输入内容" v-model="form.tel"  clearable></el-input>
				    </el-form-item>
			     	<el-form-item label="求职类型" :label-width="formLabelWidth">
				      	<el-select v-model="form.region" placeholder="请选择活动区域">
				        	<el-option label="区域一" value="shanghai"></el-option>
				        	<el-option label="区域二" value="beijing"></el-option>
				      	</el-select>
				    </el-form-item>
				    <el-form-item label="地址" :label-width="formLabelWidth">
				      	<el-input placeholder="请输入内容" v-model="form.address"  clearable></el-input>
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
			      <el-button type="primary" @click="besureApplyYy">确定</el-button>
			    </div>
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
        		company_id:'',
        		employee_id:'',
        		activeName: 'first',

        		auntInfoList:[],
        		serviceMessage:{},
        		
    		 	form: {
			        radio:'',
			        name:'',
			        tel:'',
			        region:'',
			        address:'',
			          
        		},
        		formLabelWidth: '120px'
			}
		},
		mounted() {
			this.$store.commit("switch", '3');
			
			this.queryServiceDetails();
		},
		methods: {
			backHome(){
				this.$router.push({
					path:'/',
					query:{company_id:this.$route.query.company_id,
						employee_id:this.$route.query.employee_id
					}
				});
			},
			queryServiceDetails(){
				this.company_id = this.$route.query.company_id
				this.employee_id = this.$route.query.employee_id
				this.$http.post(process.env.API_HOST + '/websiteProvidingController/providingDetils', {
					service_id: this.$route.query.service_id
				}).then(response => {
					console.log(response, '服务详情')
					let res = response.data;
					
					if(res.true) {
						this.bdji_id = res.data.bdji_id;
						if(res.data.service_salary_unit == '0') {
							res.data.service_salary_unit = '小时'
						} else if(res.data.service_salary_unit == '1') {
							res.data.service_salary_unit = '天'
						} else if(res.data.service_salary_unit == '2') {
							res.data.service_salary_unit = '周'
						} else if(res.data.service_salary_unit == '3') {
							res.data.service_salary_unit = '月'
						} else if(res.data.service_salary_unit == '4') {
							res.data.service_salary_unit = '次'
						} else {
							res.data.service_salary_unit = '年'
						}
						this.serviceMessage = res.data
						
					}
				});
			},
			queryList() {
				this.employee_id = this.$route.query.employee_id;
				this.company_id = this.$route.query.company_id;

				this.isSHow01 = false;
				this.isSHow02 = false;
				this.isSHow03 = false;
				this.isSHow04 = false;
				this.show2 = false;
				let citys = this.getName(this.address).split(' ');

				let city = citys[0];
				console.log(city);
				switch(this.checklist02[0]) {
					case '00':
						this.checklist02[0] = '1年以上'
						break;
					case '01':
						this.checklist02[0] = '2年以上'
						break;
					case '02':
						this.checklist02[0] = '3年以上'
						break;
					case '03':
						this.checklist02[0] = '4年以上'
						break;
					case '04':
						this.checklist02[0] = '5年以上'
						break;
					case '05':
						this.checklist02[0] = '6年以上'
						break;
					case '06':
						this.checklist02[0] = '7年以上'
						break;
					case '07':
						this.checklist02[0] = '8年以上'
						break;
					case '08':
						this.checklist02[0] = '9年以上'
						break;
					case '09':
						this.checklist02[0] = '10年以上'
						break;
					case '10':
						this.checklist02[0] = ''
						break;

				}
				switch(this.checklist04[0]) {
					case '':
						this.checklist04[0] = '不限'
						break;
					case '0':
						this.checklist04[0] = '北方'
						break;
					case '1':
						this.checklist04[0] = '南方'
						break;
				}
				let salary_begin, salary_end;
				switch(this.checklist01[0]) {
					case '1':
						salary_begin = '';
						salary_end = '';
						console.log('不传值');
						break;
					case '2':
						salary_begin = 0;
						salary_end = 100;
						console.log(salary_begin, salary_end);
						break;
					case '3':
						salary_begin = 101;
						salary_end = 1000;
						console.log(salary_begin, salary_end);
						break;
					case '4':
						salary_begin = 1001;
						salary_end = 2000;
						console.log(salary_begin, salary_end);
						break;
					case '5':
						salary_begin = 2001;
						salary_end = 3000;
						console.log(salary_begin, salary_end);
						break;
					case '6':
						salary_begin = 3001;
						salary_end = 5000;
						console.log(salary_begin, salary_end);
						break;
					case '7':
						salary_begin = 5001;
						salary_end = 8000;
						break;
					case '8':
						salary_begin = 8001;
						salary_end = 10000;
						break;
					case '9':
						salary_begin = 10001;
						salary_end = 999999;
						break;
				}

				let programs = {
					aunt_infomations: {
						aunt_work_experience: this.checklist02[0],
						province_value: city,
						aunt_salary_begin: salary_begin,
						aunt_salary_end: salary_end,
						aunt_salary_unit: '',
						aunt_area: this.checklist04[0]
					},
					aunt_job_intentions: [],
					type: this.$route.query.type || '0',
					company_id: this.$route.query.company_id || '',
					pageUtil: {
						currentPageNum: this.currentPageNum
					}
				}
				programs.aunt_job_intentions.push({
					bdji_service_id: this.bdji_id
				})
				this.$http.post(process.env.API_HOST + '/homeController/selectAuntInfomationsList', programs).then(response => {
						console.log(response, 'list');
						console.log(response.data.data.data);
						let res = response.data
						if(res.true) {
							this.noData = false;
							this.total = res.data.num;
							if(res.data.num === 0) {
								this.noData = true;
							}
							this.auntList = this.auntList.concat(res.data.data)

						}
					})
					.catch(error => {
						console.log(error)
					})

			},
			
			
			
			
			besureApplyYy() {
				/*form: {
			        radio:'',
			        name:'',
			        tel:'',
			        region:'',
			        address:'',
			          
        		},*/
				
				
				
				
				let YytellReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if(this.apply_name == '' || this.apply_name.indexOf(" ") != -1) {
					this.err_text = "姓名不能为空";
					this.err = true;
				} else if(this.apply_name.length > 10) {
					this.err = true;
					this.err_text = "姓名不能超过10位字";
				} else if(this.apply_tell == '' || this.apply_tell.indexOf(" ") != -1) {
					this.err_text = "手机号不能为空";
					this.err = true;
				} else if(!YytellReg.test(this.apply_tell)) {
					this.err_text = "请输入有效手机号";
					this.err = true;
				} else if(this.$refs.liveInput1.value && this.$refs.liveInput1.value.length > 50) {

					this.err = true;
					this.err_text = "地址不能超过50个字";
					this.$refs.liveInput1.focus();
					return;
				} else {

					let units = this.serviceMessage.service_salary_unit;
					switch(units) {
						case '小时':
							units = '0'
							break;
						case '天':
							units = '1'
							break;
						case '周':
							units = '2'
							break;
						case '月':
							units = '3'
							break;
						case '年':
							units = '4'
							break;
						default:
							break;
					}
					let programs = {
						name: this.apply_name,
						mobile: this.apply_tell,
						place: this.$refs.liveInput1.value,

						company_id: this.company_id, //公司id
						company_name: this.company_name, //公司名字
						suoshuren_id: this.suoshuren_id, //所属人
						suoshuren_name: this.suoshuren_name, //所属人
						suoshuren_mobile: this.suoshuren_mobile,

						i_service_id: this.serviceMessage.service_id,

						i_service_salary_start: this.serviceMessage.service_salary_begin,

						i_service_salary_end: this.serviceMessage.service_salary_end,

						i_service_salary_unit: units,

						i_service_title: this.serviceMessage.bdji_title,
						/*图片地址
						photograph_loc
						图片名称
						photograph_name*/
						i_service_content: this.serviceMessage.service_content

					}
					if(programs.place && programs.place.length > 50) {
						this.err = true;
						this.err_text = "地址不能超过50个字哦";
						return;
					}
					this.submitEnableYy = true;
					console.log(programs)
					this.$http.post(process.env.API_HOST + '/detailsMoudleController/reservationService', programs).then(response => {
						console.log(response)
						let res = response.data;

						if(res.true) {
							//this.censusAdd('3', this.$route.query.company_id, this.$route.query.employee_id)
							this.showApplys = false;
							this.messageShow = true;
							this.apply_name = '';
							this.apply_tell = '';
							this.address1 = '';
							this.submitEnableYy = false;

						} else {
							this.submitEnableYy = false;
							this.err = true;
							this.err_text = res.msg;
						}
					})
				}
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
</style>