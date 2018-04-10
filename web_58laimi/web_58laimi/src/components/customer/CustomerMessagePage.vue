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
						 	<el-breadcrumb-item v-if="this.$route.query.from_demand" :to="{ path: '/demandDetails' ,query:{demand_id:this.$route.query.demand_id,company_id:this.$route.query.company_id,employee_id:this.$route.query.employee_id} }">需求详情</el-breadcrumb-item>
						 	<el-breadcrumb-item v-else :to="{ path: '/iamCustomer' ,query:{company_id:company_id,employee_id:employee_id} }">我是客户</el-breadcrumb-item>
						 	<el-breadcrumb-item>客户信息</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
				</div>
			</div>
			<section class="cell_custome">
				<div class="boxs_customer">
					
					<div class="name_box">
						<div class="name_left">
							<i>姓名</i>
							<input type="text" name="" id="" ref="customer_name" v-model="customer_name"/>
						</div>
						<div class="name_left">
							<i>手机号码</i>
							<input type="text" name="" id="" ref="customer_mobile" v-model="customer_mobile"/>
						</div>
					</div>
					<div class="address_box">
						<i>家庭住址</i>
						<textarea rows="2" cols="20" ref="liveInput" id="liveInput" v-model="customer_address"></textarea>
					</div>
					<div  class="address_box">
						<i>工作地址</i>
						<textarea class="work_address" ref="liveInput1" id="liveInput1" rows="2" cols="20" v-model="demand_location"></textarea>
						<el-checkbox v-model="customer_is_work_home">同家庭住址</el-checkbox>
					</div>
					
				</div>

			</section>
			
			<section class="cell_custome">
				<div class="boxs_customer">
					<el-row class="demo-autocomplete">
						  <el-col :span="2">
						  	<i>要求</i>
						  </el-col>
						  <el-col :span="8">
						    <el-autocomplete
						      class="inline-input"
						      v-model="labelName"
						      :fetch-suggestions="querySearch1"
						      placeholder="请输入内容"
						      :trigger-on-focus="false"
						      @select="handleSelect1"
						      @keyup.enter.native="setLabelJN"
						    ></el-autocomplete>
						  </el-col>
						  <el-col :span="2">
						  	<el-button type="text" style="color: #1faf1e;"  @click="showLabel = !showLabel">{{showLabel ? '收起' : '展开'}}</el-button>
						  </el-col>
						  <el-col :span="4" v-for="(item,index) in labelChange" key="index">
						  	 <span class="a_btn_type">{{item.bds_value}}<i class="el-icon-delete" @click="delLabel(index,item)"></i></span>
						  </el-col>
					</el-row>
						
					<div class="showBtns" v-show="showLabel">
						<a class="a_btn_type" :class="{active: item.chosen }" href="javascript:;" v-for="item in jnList" @click="changeLabel(item)">{{item.value}}</a>
					</div>
					<el-form ref="form"  label-width="80px">
						<el-form-item label="期望薪资">
						    <el-col :span="11">
						      	 <el-input v-model="demand_salary_begin"></el-input>
						    </el-col>
						    <el-col class="line" :span="2">-</el-col>
						    <el-col :span="11">
						      	 <el-input v-model="demand_salary_end"></el-input>
						    </el-col>
					  	</el-form-item>
					  	
					  	<el-form-item label="备注">
						    <el-input type="textarea" v-model="demand_content"></el-input>
					  	</el-form-item>
					</el-form>
				</div>

			</section>
			<section class="cell_custome">
				<div class="boxs_customer" style="padding-right:82px; width: 1038px;">
					<el-button type="success" plain>添加更多要求</el-button>
					<div class="btn_group">
						<el-checkbox v-model="checked_weixin" label="联系微信" border></el-checkbox>
    					<el-checkbox v-model="checked_livehome" label="是否住家" border></el-checkbox>
    					<el-checkbox v-model="checked_worktype" label="工作性质" border></el-checkbox>
    					<el-checkbox v-model="checked_sex" label="性别要求" border></el-checkbox>
    					<el-checkbox v-model="checked_neednum" label="需要人数" border></el-checkbox>
    					<el-checkbox v-model="checked_workyears" label="工作经验" border></el-checkbox>
    					<el-checkbox v-model="checked_age" label="年龄要求" border></el-checkbox>
    					<el-checkbox v-model="checked_education" label="学历要求" border></el-checkbox>
    					<el-checkbox v-model="checked_interview" label="面试地址" border></el-checkbox>
    					<el-checkbox v-model="checked_certificate" label="证书要求" border></el-checkbox>
    					<el-checkbox v-model="checked_constellation" label="优先星座" border></el-checkbox>
    					<el-checkbox v-model="checked_constellation_no" label="不要星座" border></el-checkbox>
    					<el-checkbox v-model="checked_shengxiao" label="优先生肖" border></el-checkbox>
    					<el-checkbox v-model="checked_shengxiao_no" label="不要生肖" border></el-checkbox>
    					<el-checkbox v-model="checked_province" label="优先省份" border></el-checkbox>
    					<el-checkbox v-model="checked_province_no" label="不要省份" border></el-checkbox>
    					<el-checkbox v-model="checked_cook" label="擅长菜系" border></el-checkbox>
    					
					</div>
				
				</div>
				
			</section>
			<section class="cell_custome">
				<div class="boxs_more">
					<el-form ref="form"  label-width="80px">
						<el-form-item label="联系微信" v-show="checked_weixin">
				      	 	<el-input v-model="demand_weixin"></el-input>
					  	</el-form-item>
					  	<el-form-item label="是否住家" v-show="checked_livehome">
			      	 		<el-radio v-model="demand_is_live_together" label="1">是</el-radio>
  							<el-radio v-model="demand_is_live_together" label="0">否</el-radio>
  							<el-radio v-model="demand_is_live_together" label="">均可</el-radio>
					  	</el-form-item>
					  	<el-form-item label="工作性质"  v-show="checked_worktype">
			      	 		<el-radio v-model="demand_job_type" label="0">兼职</el-radio>
  							<el-radio v-model="demand_job_type" label="1">全职</el-radio>
					  	</el-form-item>
					  	<el-form-item label="性别要求" v-show="checked_sex">
			      	 		<el-radio v-model="demand_sex" label="1">男</el-radio>
  							<el-radio v-model="demand_sex" label="0">女</el-radio>
  							<el-radio v-model="demand_sex" label="">均可</el-radio>
					  	</el-form-item>
					  	<el-form-item label="需要人数" v-show="checked_neednum">
				      	 	<el-input v-model="demand_people_num"></el-input>
					  	</el-form-item>
					  	<el-form-item label="工作经验" v-show="checked_workyears">
				      	 	<el-select v-model="demand_jobs_experience" placeholder="请选择">
							    <el-option
							      v-for="item in workyearsOpt"
							      :key="item.key"
							      :label="item.value"
							      :value="item.key">
							    </el-option>
						  	</el-select>
					  	</el-form-item>
					  	<el-form-item label="年龄要求"  v-show="checked_age">
						    <el-col :span="11">
						      	 <el-input v-model="demand_age_begin"></el-input>
						    </el-col>
						    <el-col class="line" :span="2">-</el-col>
						    <el-col :span="11">
						      	 <el-input v-model="demand_age_end"></el-input>
						    </el-col>
					  	</el-form-item>
					  	<el-form-item label="学历要求" v-show="checked_education">
				      	 	
				      	 	<el-select v-model="demand_education" placeholder="请选择">
							    <el-option
							      v-for="item in educationOptions"
							      :key="item.key"
							      :label="item.value"
							      :value="item.key">
							    </el-option>
						  	</el-select>
				      	 	
					  	</el-form-item>
					  	
					  	<el-form-item label="面试地址" v-show="checked_interview">
						    <el-input type="textarea" v-model="demand_interview_location"></el-input>
					  	</el-form-item>
					</el-form>
					<div v-show="checked_certificate">
						<el-row class="demo-autocomplete">
							  <el-col :span="2">
							  	<i style="font-style: normal;">证书要求</i>
							  </el-col>
							  <el-col :span="8">
							    <el-autocomplete
							      class="inline-input"
							      v-model="labelNameZS"
							      :fetch-suggestions="querySearch2"
							      placeholder="请输入内容"
							      :trigger-on-focus="false"
							      @select="handleSelect2"
							      @keyup.enter.native="setLabelZS"
							    ></el-autocomplete>
							  </el-col>
							  <el-col :span="2">
							  	<el-button type="text" style="color: #1faf1e;" @click="showLabelZS = !showLabelZS">{{showLabelZS ? '收起' : '展开'}}</el-button>
							  </el-col>
							  <el-col :span="4" v-for="(item,index) in credentialsOptions" key="index">
							  	 <span class="a_btn_type">{{item.bdc_name}}<i class="el-icon-delete" @click='delLabelZS(index,item)'></i></span>
							  </el-col>
						</el-row>
						<div class="showBtns" v-show="showLabelZS">
							<a class="a_btn_type " :class="{active: item.chosen }" href="javascript:;" v-for="item in zsList" @click="changeLabelZS(item)">{{item.value}}</a>
						</div>
						
						
						
						
					</div>
					
					<div style="margin-bottom: 20px;" v-show="checked_constellation">
						<el-row class="demo-autocomplete">
						  	<el-col :span="2">
						  		<i style="font-style: normal;">优先星座</i>
						  	</el-col>
						  	<el-col :span="3">
							  	<a href="javascript:;" style="color: #00A10A;">请选择</a>
						  	</el-col>
						</el-row>
						<div class="btn_group">
							<el-checkbox-group :max='6' v-model="constellationOptions">
							    <el-checkbox class="is-bordered" v-for="city in constellationsOptions" :label="city" :key="city.constellation_id">{{city.constellation_value}}</el-checkbox>
						  	</el-checkbox-group>
	    					
						</div>
						
					</div>
					
					<div style="margin-bottom: 20px;" v-show="checked_constellation_no">
						<el-row class="demo-autocomplete">
						  	<el-col :span="2">
						  		<i style="font-style: normal;">不要星座</i>
						  	</el-col>
						  	<el-col :span="3">
							  	<a href="javascript:;" style="color: #00A10A;">请选择</a>
						  	</el-col>
						</el-row>
						<div class="btn_group">
							<el-checkbox-group  :max='6' v-model="excludeConstellationOptions">
							    <el-checkbox class="is-bordered" v-for="city in constellationsOptions" :label="city" :key="city.constellation_id">{{city.constellation_value}}</el-checkbox>
						  	</el-checkbox-group>
	    					
						</div>
					</div>
					
					<div style="margin-bottom: 20px;" v-show="checked_shengxiao">
						<el-row class="demo-autocomplete">
						  	<el-col :span="2">
						  		<i style="font-style: normal;">优先生肖</i>
						  	</el-col>
						  	<el-col :span="3">
							  	<a href="javascript:;" style="color: #00A10A;">请选择</a>
						  	</el-col>
						</el-row>
						<div class="btn_group">
							<el-checkbox-group :max='6' v-model="shengxiaoOptions">
							    <el-checkbox class="is-bordered" v-for="city in shengxiaosOptions" :label="city" :key="city.zodiac_id">{{city.zodiac_value}}</el-checkbox>
						  	</el-checkbox-group>
	    					
						</div>
					</div>
					
					
					<div style="margin-bottom: 20px;" v-show="checked_shengxiao_no">
						<el-row class="demo-autocomplete">
						  	<el-col :span="2">
						  		<i style="font-style: normal;">不要生肖</i>
						  	</el-col>
						  	<el-col :span="3">
							  	<a href="javascript:;" style="color: #00A10A;">请选择</a>
						  	</el-col>
						</el-row>
						<div class="btn_group">
							<el-checkbox-group :max='6' v-model="excludeShengxiaoOptions">
							    <el-checkbox class="is-bordered" v-for="city in shengxiaosOptions" :label="city" :key="city.zodiac_id">{{city.zodiac_value}}</el-checkbox>
						  	</el-checkbox-group>
	    					
						</div>
					</div>
					
					<div style="margin-bottom: 20px;" v-show="checked_province">
						<el-row class="demo-autocomplete">
						  	<el-col :span="2">
						  		<i style="font-style: normal;">优先省份</i>
						  	</el-col>
						  	<el-col :span="3">
							  	<a href="javascript:;" style="color: #00A10A;">请选择</a>
						  	</el-col>
						</el-row>
						<div class="btn_group">
							<el-checkbox-group :max='6' v-model="shengfenOptions">
								
							    <el-checkbox class="is-bordered" v-for="city in shengfensOptions" :label="city" :key="city.province_id">{{city.province_value}}</el-checkbox>
						  	</el-checkbox-group>
	    					
						</div>
					</div>
					
					
					<div style="margin-bottom: 20px;" v-show="checked_province_no">
						<el-row class="demo-autocomplete">
						  	<el-col :span="2">
						  		<i style="font-style: normal;">不要省份</i>
						  	</el-col>
						  	<el-col :span="3">
							  	<a href="javascript:;" style="color: #00A10A;">请选择</a>
						  	</el-col>
						</el-row>
						<div class="btn_group">
							<el-checkbox-group :max='6' v-model="excludeShengfenOptions">
							    <el-checkbox class="is-bordered" v-for="city in shengfensOptions" :label="city" :key="city.province_id">{{city.province_value}}</el-checkbox>
						  	</el-checkbox-group>
	    					
						</div>
					</div>
					
					
					<div v-show="checked_cook">
						<el-row class="demo-autocomplete">
						 	<el-col :span="2">
							  	<i style="font-style: normal;">擅长菜系</i>
						  	</el-col>
						  	<el-col :span="8">
							    <el-autocomplete
							      class="inline-input"
							      v-model="labelNamePR"
							      :fetch-suggestions="querySearch3"
							      placeholder="请输入内容"
							      :trigger-on-focus="false"
							      @select="handleSelect3"
							       @keyup.enter.native="setLabelPR"
							    ></el-autocomplete>
						  	</el-col>
						  	<el-col :span="2">
							  	<el-button type="text" style="color: #1faf1e;"  @click="showLabelPR = !showLabelPR">{{showLabelPR ? '收起' : '展开'}}</el-button>
						  	</el-col>
						  	<el-col :span="4" v-for="(item,index) in cookingOptions" key="index">
							  	 <span class="a_btn_type">{{item.cook_value}}<i class="el-icon-delete" @click="delLabelPR(index,item)"></i></span>
						  	</el-col>
						</el-row>
						
						<div class="showBtns" v-show="showLabelPR">
							<a class="a_btn_type" :class="{active: item.chosen }" href="javascript:;" v-for="item in prList" 
								@click="changeLabelPR(item)">{{item.value}}</a>
						</div>
						
						
						
						 
						
						
					</div>
					
				</div>
			</section>
			
			<div style="margin-top: 32px;">
				<el-button type="success" @click="save">保存</el-button>
			</div>
			
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
				employee_id:'',
				company_id:'',
				from_demand:false,
				demand_id:'',
				
				customer_name:'',
				customer_mobile:'',
				customer_address: '',
				demand_location: '', //工作地址
				address:'',
				customer_is_work_home:false,
				
				restaurants1:[], //技能（后台返回所有技能）
				labelChange:[], // 向后台发送的数据
				jnList:[], // 展示前40个技能
				labelName:'', //技能输入框内容
				showLabel:true, //展示40个技能开关
				
				
				demand_salary_begin:'',
				demand_salary_end:'',
				demand_content:'',
				
				checked_weixin: true, // 联系微信
				checked_livehome:false,// 是否住家
				checked_worktype:false,// 工作性质
				checked_sex:false,     // 性别要求
				checked_neednum:false, // 需要人数
				checked_workyears:false, // 工作经验
				checked_age:false,     // 年龄要求
				checked_education:false,// 学历要求
				checked_interview:false,// 面试地址
				checked_certificate:false,// 证书要求
				checked_constellation:false,// 优先星座
				checked_constellation_no:false,// 不要星座
				checked_shengxiao:false,// 优先生肖
				checked_shengxiao_no:false,// 不要生肖
				checked_province:false,// 优先省份
				checked_province_no:false,// 不要省份
				checked_cook:false,// 擅长菜系
				
				demand_weixin: '', // 联系微信
				demand_is_live_together:'',// 是否住家
				demand_job_type: '',// 工作性质
				demand_sex: '',    // 性别要求
				demand_people_num: '',// 需要人数
				demand_jobs_experience: '',// 工作经验
				demand_age_begin: '',    // 年龄要求
				demand_age_end:'',
				
				demand_education: '', //学历要求
				educationOptions: [{
						key: '0',
						value: '学历不限'
					},
					{
						key: '1',
						value: '小学'
					},
					{
						key: '2',
						value: '初中'
					},
					{
						key: '3',
						value: '高中'
					},
					{
						key: '4',
						value: '中专'
					},
					{
						key: '5',
						value: '大专'
					},
					{
						key: '6',
						value: '本科'
					},
					{
						key: '7',
						value: '研究生'
					},
					{
						key: '8',
						value: '博士生'
					},
					{
						key: '9',
						value: '博士后'
					}
				],
				demand_interview_location: '',// 面试地址
				certificate: '',// 证书要求

				cook:'',// 擅长菜系
				
				
				
				
				
				workyearsOpt:[
					{
						key: '00',
						value: '1年至2年'
					},
					{
						key: '01',
						value: '2年至3年'
					},
					{
						key: '02',
						value: '3年至4年'
					},
					{
						key: '03',
						value: '4年至5年'
					},
					{
						key: '04',
						value: '5年至6年'
					},
					{
						key: '05',
						value: '6年至7年'
					},
					{
						key: '06',
						value: '7年至8年'
					},
					{
						key: '07',
						value: '8年至9年'
					},
					{
						key: '08',
						value: '9年至10年'
					},
					{
						key: '09',
						value: '10年及以上'
					}
				],
				
				
				
				restaurants2:[], //技能（后台返回所有技能）
				credentialsOptions:[], // 向后台发送的数据
				zsList:[], // 展示前40个技能
				labelNameZS:'', //技能输入框内容
				showLabelZS:true, //展示40个技能开关
				
				
				
				
				
				restaurants3:[], //接口返回的数组 菜系
				prList:[],// 烹饪技巧通过接口
				cookingOptions:[],
				labelNamePR:'',
				showLabelPR: true,
				
				
				constellationOptions:[], //"星座对象",
				excludeConstellationOptions:[], //不要星座对象
				constellationsOptions: [],  //星座
				
				
				/*生肖*/
				
				shengxiaosOptions: [], //所有星座，接口数据获得
				shengxiaoOptions: [], //生肖选择数组
				excludeShengxiaoOptions: [], //不要生肖选择数组
				/*省份*/
				shengfensOptions:[],//所有省份
				shengfenOptions:[], //"省份需求表",
				excludeShengfenOptions:[], //不要省份需求表
				
				chooseServiceH5:{}
				
			}
		},
		watch:{
			customer_address() {
				console.log(this.$refs.liveInput)
				this.$refs.liveInput.value = this.customer_address
			},
			demand_location() {
				this.$refs.liveInput1.value = this.demand_location
			},
			customer_is_work_home() {
				if(this.customer_is_work_home) {
					this.demand_location = this.customer_address;
					//this.$refs.liveInput1.value = this.$refs.liveInput.value //this.demand_location
				}
			},
		},
		mounted() {
			this.$store.commit("switch", '6');
			this.init();
			this.queryCustomerMess();
		},
		methods: {
			queryCustomerMess() {
				this.$http.post(process.env.API_HOST + '/websiteCustomerController/demandCutomerDetail', {
					customer_id: this.$route.query.aunt_customer_id
				}).then(response => {
					console.log(response, 'ffffffff')
					let res = response.data;

					if(res.true && res.data) {

						this.customer_name = res.data.customer_name || '';
						this.customer_mobile = res.data.customer_mobile || '';
						this.customer_address = res.data.customer_live_place || ''
					}
				})
			},
			
			init(){
				this.employee_id = this.$route.query.employee_id;
				this.company_id = this.$route.query.company_id;
				this.from_demand = this.$route.query.from_demand;
				this.demand_id = this.$route.query.demand_id;
				
				this.chooseServiceH5 = JSON.parse(localStorage.getItem("chooseServiceH5"));
				console.log(this.chooseServiceH5, 'dfddd');
				
		        this.$http.post(process.env.API_HOST + '/websiteDataListController/getSkills', {
						company_id: this.company_id
					}).then(response => {
						console.log(response, "查询技能要求结果g");
						this.jnList = [];
						let res = response.data;
						if(res.true) {
							res.data.data.forEach((item, index) => {
								this.jnList.push({
									key: item.bds_id,
									value: item.bds_value
								})
							});
						}
				});
				
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getSkills_Pc', {
						company_id: this.company_id
					}).then(response => {
						console.log(response, "查询技能要求结果quanbu");
						this.restaurants1 = [];
						let res = response.data;
						if(res.true) {
							res.data.data.forEach((item, index) => {
								this.restaurants1.push({
									key: item.bds_id,
									value: item.bds_value
								})
							});
						}
				});
				
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getCredentials', {
						company_id: this.company_id
					}).then(response => {
						console.log(response, "模糊查询证书结果g");
						this.zsList = [];
						let res = response.data;
						if(res.true&&res.data.data) {
							res.data.data.forEach((item, index) => {
								this.zsList.push({
									key: item.bdc_id,
									value: item.bdc_name
								})
							});
						}
				});
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getCredentials_Pc', {
						company_id: this.company_id
					}).then(response => {
						console.log(response, "模糊查询证书结果全部");
						this.restaurants2 = [];
						let res = response.data;
						if(res.true&&res.data) {
							res.data.data.forEach((item, index) => {
								this.restaurants2.push({
									key: item.bdc_id,
									value: item.bdc_name
								})
							});
						}
				});
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getCook', {
					company_id: this.company_id
				}).then(response => {
					console.log(response, "烹饪要求")
					this.prList = [];
					let res = response.data;
					if(res.true & res.data.data != null) {
						res.data.data.forEach((item, index) => {
							this.prList.push({
								key: item.cook_id,
								value: item.cook_value,
								chosen: false
							})
						})
					}
				});
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getCook_Pc', {
					company_id: this.company_id
				}).then(response => {
					console.log(response, "烹饪要求全部")
					this.restaurants3 = [];
					let res = response.data;
					if(res.true) {
						res.data.data.forEach((item, index) => {
							this.restaurants3.push({
								key: item.cook_id,
								value: item.cook_value
							})
						})
					}
				});
				
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getConstellation', {}).then(response => {
					console.log(response,'星座')
					let res = response.data;
					this.constellationsOptions = [];
					if(res.true) {
						res.data.forEach(item => {
							this.constellationsOptions.push({
								constellation_id: item.constellation_id,
								constellation_value: item.constellation_value,
							})
						})
					}
				});
				
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getZodiac', {}).then(response => {
					console.log(response,"生肖")
					let res = response.data;
					this.shengxiaosOptions = [];
					if(res.true) {
						res.data.forEach(item => {
							this.shengxiaosOptions.push({
								zodiac_id: item.zodiac_id,
								zodiac_value: item.zodiac_value,
							})
						})
					}
				});
				
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getProvince', {}).then(response => {
					console.log(response,'省份')
					let res = response.data;
					this.shengfensOptions = [];
					if(res.true) {
						res.data.forEach(item => {
							//province_id: "5307", province_value: "黑龙江省"
							this.shengfensOptions.push({
								province_id: item.id,
								province_value: item.area_name
							})
						})
					}
				});
				
			},
			
			
			//模糊查询技能
			querySearch1(queryString, cb) {
		        var restaurants = this.restaurants1;
		        
		        var results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
	      	},
	      	createFilter1(queryString) {
		        return (restaurant) => {
		          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !==-1);
		        };
	      	},
	      	handleSelect1(item) {  //选择模糊查询结果项，向结果数组中添加
        		console.log(item);
        		this.labelName='';
        		
        		this.labelChange.push({
					bds_id: item.key,
					bds_value: item.value
				})
        		
        		console.log(this.labelChange,'这是labelChange数组，点击查询结果得到')
      		},
      		setLabelJN(){
      			//console.log(el.target.value)
      			console.log(this.state1)
      			this.labelName = this.labelName.trim('');
					console.log(this.labelName)
					if(this.labelName && this.labelName.length <= 8) {
	
						if(this.labelChange.length < 6) {
							this.labelChange.push({
								bds_id: '00000',
								bds_value: this.labelName
							})
	
						}
						this.labelChange = this.unique(this.labelChange)
						this.labelName = ''
	
					} else if(this.labelName && this.labelName.length > 8) {
						alert('要求最多可输入8个字');
						this.labelName = '';
						//this.$refs.jnLabel.focus();
					}
      		},
      		changeLabel(value) { //已有标签选择添加标签
				console.log(value, "dfdfdsfedfe123")
				if(!value.chosen) {
					// 新增
					if(this.labelChange.length < 6) {
						this.labelChange.push({
							bds_id: value.key,
							bds_value: value.value
						})
						value.chosen = true
					}

					this.labelChange = this.unique(this.labelChange)
					console.log(this.labelChange, "biaoqianddjskjfds")
				} else {
					// 删除
					value.chosen = false
					for(let i = 0; i < this.labelChange.length; i++) {
						if(this.labelChange[i].bds_id === value.key) {
							this.labelChange.splice(i, 1)
							return
						}
					}
				}

			},
      		delLabel(index, value) {
				//删除已选择的标签
				this.labelChange.splice(index, 1)
				console.log(value)
				this.jnList.forEach(item => {
					if(item.key == value.bds_id) {
						item.chosen = false;
					}
				})
				this.$set(this.jnList)

			},
      		//数组去重复
      		unique(arr) { //数组去重复
				console.log(arr, 'dd')
				var hash = {};
				arr = arr.reduce((item, next) => {
					hash[next.bds_value] ? '' : hash[next.bds_value] = true && item.push(next);
					return item
				}, [])
				console.log(arr, 'dsdd')
				return arr;

			},
      		
      		//模糊查询证书
			querySearch2(queryString, cb) {
		        var restaurants = this.restaurants2;
		        var results = queryString ? restaurants.filter(this.createFilter2(queryString)) : restaurants;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
	      	},
	      	createFilter2(queryString) {
		        return (restaurant) => {
		          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !==-1);
		        };
	      	},
      		handleSelect2(value) {
        		console.log(value,'水电费水电费');
        		this.labelNameZS='';
        		if(!value.chosen) {
					// 新增
					if(this.credentialsOptions.length < 6) {
						this.credentialsOptions.push({
							bdc_id: value.key,
							bdc_name: value.value
						})
						value.chosen = true
					}

					this.credentialsOptions = this.uniqueZS(this.credentialsOptions)
					console.log(this.credentialsOptions, "证书")
				} else {
					// 删除
					value.chosen = false
					for(let i = 0; i < this.credentialsOptions.length; i++) {
						if(this.credentialsOptions[i].bdc_id === value.key) {
							this.credentialsOptions.splice(i, 1)
							return
						}
					}
				}
        		
      		},
      		setLabelZS() { //输入框输入标签名添加标签
				console.log(this.labelNameZS)
				let labelZsValue = this.labelNameZS.trim('');
				if(labelZsValue && labelZsValue.length <= 10 && this.credentialsOptions.length < 6) {
					//如果输入框有值，并且已选择的证书不超过6个，则插入新的证书，这个地方有问题， 需要后台去判断用户输入的证书名称在后台是否存在
					this.credentialsOptions.push({
						bdc_id: '00000',
						bdc_name: labelZsValue
					})
					this.credentialsOptions = this.uniqueZS(this.credentialsOptions);
					this.labelNameZS = '';
				} else if(labelZsValue && labelZsValue.length > 10) {
					alert('证书要求最多可输入10个字');
					this.$refs.zsLabel.value = '';
					this.$refs.zsLabel.focus();
				}
				
			},
      		
      		changeLabelZS(value) { //已有标签选择添加标签
				console.log(value, "dfdfdsfedfe123")
				if(!value.chosen) {
					// 新增
					if(this.credentialsOptions.length < 6) {
						this.credentialsOptions.push({
							bdc_id: value.key,
							bdc_name: value.value
						})
						value.chosen = true
					}

					this.credentialsOptions = this.uniqueZS(this.credentialsOptions)
					console.log(this.credentialsOptions, "证书")
				} else {
					// 删除
					value.chosen = false
					for(let i = 0; i < this.credentialsOptions.length; i++) {
						if(this.credentialsOptions[i].bdc_id === value.key) {
							this.credentialsOptions.splice(i, 1)
							return
						}
					}
				}

			},
			delLabelZS(index, value) { //删除已选择的标签
				this.credentialsOptions.splice(index, 1)
				console.log(value)
				this.zsList.forEach(item => {
					if(item.key == value.bdc_id) {
						item.chosen = false;
					}
				})
				this.$set(this.zsList)

			},
			uniqueZS(arr) { //数组去重复
				console.log(arr, 'dd')
				var hash = {};
				arr = arr.reduce((item, next) => {
					hash[next.bdc_name] ? '' : hash[next.bdc_name] = true && item.push(next);
					return item
				}, [])
				console.log(arr, 'dsdd')
				return arr;

			},
      		
      		
      		
      		//模糊查询菜系
			querySearch3(queryString, cb) {
		        var restaurants = this.restaurants3;
		        var results = queryString ? restaurants.filter(this.createFilter3(queryString)) : restaurants;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
	      	},
	      	createFilter3(queryString) {
		        return (restaurant) => {
		          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !==-1);
		        };
	      	},
      		handleSelect3(item) {
        		console.log(item);
        		
        		if(this.cookingOptions.length < 6) {
					this.cookingOptions.push({
						cook_id: item.key,
						cook_value: item.value
					})
				}
				this.cookingOptions = this.uniquePR(this.cookingOptions);
				this.labelNamePR = '';
        		
      		},
      		setLabelPR() { //输入框输入标签名添加标签
				
				let labelPrValue = this.labelNamePR.trim('');
				if(labelPrValue && labelPrValue.length <= 10 && this.cookingOptions.length < 6) {
					//如果输入框有值，并且已选择的证书不超过6个，则插入新的证书，这个地方有问题， 需要后台去判断用户输入的证书名称在后台是否存在
					this.cookingOptions.push({
						cook_id: '00000',
						cook_value: labelPrValue
					})
					this.cookingOptions = this.uniquePR(this.cookingOptions);
					this.labelNamePR = '';
				} else if(labelPrValue && labelPrValue.length > 10) {
					this.err = true;
					this.err_text = '烹饪要求输入不能超过10个字';
					this.labelNamePR = '';
					this.$refs.prLabel.focus();
				}
				
				
				
			},
      		
      		changeLabelPR(value) { //已有标签选择添加标签
				console.log(value, "dfdfdsfedfe123")
				if(!value.chosen) {
					// 新增
					if(this.cookingOptions.length < 6) {
						this.cookingOptions.push({
							cook_id: value.key,
							cook_value: value.value
						})
						value.chosen = true
					}
					this.labelNamePR = '';
					this.cookingOptions = this.uniquePR(this.cookingOptions)
					console.log(this.cookingOptions, "烹饪")
				} else {
					// 删除
					value.chosen = false
					for(let i = 0; i < this.cookingOptions.length; i++) {
						if(this.cookingOptions[i].cook_id === value.key) {
							this.cookingOptions.splice(i, 1)
							return
						}
					}
				}

			},
			delLabelPR(index, value) { //删除已选择的标签
				this.cookingOptions.splice(index, 1)
				console.log(value)
				this.prList.forEach(item => {
					if(item.key == value.cook_id) {
						item.chosen = false;
					}
				})
				this.$set(this.prList)

			},
			uniquePR(arr) { //数组去重复
				console.log(arr, 'dd')
				var hash = {};
				arr = arr.reduce((item, next) => {
					hash[next.cook_value] ? '' : hash[next.cook_value] = true && item.push(next);
					return item
				}, [])
				console.log(arr, 'dsdd')
				return arr;

			},
			
			
			
			save() {
				let YytellReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if(this.customer_name == '' || this.customer_name.indexOf(" ") != -1) {
					this.$message({
			          	showClose: true,
			          	message: '姓名不能为空',
			          	type: 'warning'
			       	});
					this.$refs.customer_name.focus();
				} else if(this.customer_name.length > 10) {
					this.$message({
			          	showClose: true,
			          	message: '姓名不能超过10位字符',
			          	type: 'warning'
			       	});
					this.$refs.customer_name.focus();
				} else if(this.customer_mobile == '') {
					this.$message({
			          	showClose: true,
			          	message: '手机号不能为空',
			          	type: 'warning'
			       	});
					this.$refs.customer_mobile.focus();
				} else if(!YytellReg.test(this.customer_mobile)) {
					this.$message({
			          	showClose: true,
			          	message: '请输入有效手机号',
			          	type: 'warning'
			       	});
					this.$refs.customer_mobile.focus();
				} else if(this.$refs.liveInput.value && this.$refs.liveInput.value.length > 50) {

					this.$message({
			          	showClose: true,
			          	message: '家庭住址不能超过50个字哦',
			          	type: 'warning'
			       	});
					this.$refs.liveInput.focus();
					return;

				} else if(!this.$refs.liveInput1.value) {
					this.$message({
			          	showClose: true,
			          	message: '工作地址不能为空',
			          	type: 'warning'
			       	});
					this.$refs.liveInput1.focus();
				} else if(this.$refs.liveInput1.value.length > 50) {
					this.$message({
			          	showClose: true,
			          	message: '工作住址不能超过50个字哦',
			          	type: 'warning'
			       	});
					this.$refs.liveInput1.focus();
					return;
				} else if(this.demand_salary_begin < 0 || this.demand_salary_end < 0) {
					this.$message({
			          	showClose: true,
			          	message: '薪酬不能为负数',
			          	type: 'warning'
			       	});
					return;
				} else if(this.demand_salary_end && this.demand_salary_begin > this.demand_salary_end) {
					this.$message({
			          	showClose: true,
			          	message: '结束薪酬不能小于起始薪酬',
			          	type: 'warning'
			       	});
					this.$refs.demand_salary_end.focus();
					return;
				} else if(this.labelChange.length == 0) {
					this.$message({
			          	showClose: true,
			          	message: '请选择您的要求',
			          	type: 'warning'
			       	});
					return;
				} else if(this.demand_content && this.demand_content.length > 200) {
					this.$message({
			          	showClose: true,
			          	message: '备注不能超过200个字符哦',
			          	type: 'warning'
			       	});
					this.$refs.remark.focus();
					return;

				} else if(this.demand_weixin && this.demand_weixin.length > 30) {
					this.$message({
			          	showClose: true,
			          	message: '联系微信不能超过30个字哦',
			          	type: 'warning'
			       	});
					
					this.$refs.demand_weixin.focus();
					return;

				} else if(this.demand_people_num && this.demand_people_num.length > 11) {
					this.$message({
			          	showClose: true,
			          	message: '需要人数不能超过11个字',
			          	type: 'warning'
			       	});
					this.$refs.needNum.focus();
					return;

				} else if(this.demand_interview_location && this.demand_interview_location.length > 100) {
					this.$message({
			          	showClose: true,
			          	message: '面试地址不能超过100个字哦',
			          	type: 'warning'
			       	});
					this.$refs.faceLocation.focus();
					return;

				} 
					let programs = {
						customer_demand: {
							demand_age_begin: this.demand_age_begin,
							demand_age_end: this.demand_age_end,
							demand_content: this.demand_content,
							demand_education: this.demand_education,
							demand_interview_location: this.demand_interview_location, //面试地址
							demand_is_live_together: this.demand_is_live_together,
							demand_job_type: this.demand_job_type,
							demand_jobs_experience: this.demand_jobs_experience,
							demand_people_num: this.demand_people_num,
							demand_salary_end: this.demand_salary_end,
							demand_salary_begin: this.demand_salary_begin,
							demand_salary_unit: this.aunt_salary_unit,
							demand_sex: this.demand_sex, //性别要求
							demand_weixin: this.demand_weixin,
							demand_location: this.$refs.liveInput1.value,

							demand_service: this.chooseServiceH5.bdji_id,
							demand_service_name: this.chooseServiceH5.bdji_name,
							demand_title: '急需：' + this.chooseServiceH5.bdji_name,
							demand_type_id: this.chooseServiceH5.bdst_id,

							customer_infomations_Vo: {
								customer_name: this.customer_name, //  "客户姓名",
								customer_mobile: this.customer_mobile, //  "联系电话",
								customer_live_place: this.$refs.liveInput.value, //  "家庭住址"

								company_id: this.company_id,
								customer_id: this.$route.query.aunt_customer_id,
								company_name: this.company_name,
								customer_owner: this.suoshuren_id,
								suoshuren_name: this.suoshuren_name,
								suoshuren_mobile: this.suoshuren_mobile

							},
							customer_demand_constellation_Vos: this.constellationOptions, //"星座对象",
							customer_demand_constellation_Vos_third: this.excludeConstellationOptions, //不要星座对象
							customer_demand_cook_Vos: this.cookingOptions, //"烹饪要求对象",
							customer_demand_credentials_Vos: this.credentialsOptions, //"证书要求表对象",
							customer_demand_province_Vos: this.shengfenOptions, //"省份需求表",
							customer_demand_province_Vos_third: this.excludeShengfenOptions, //不要省份需求表
							customer_demand_skills_Vos: this.labelChange, //"特长或技能要求表",
							customer_demand_zodiac_Vos: this.shengxiaoOptions, //"生肖需求表",
							customer_demand_zodiac_Vos_third: this.excludeShengxiaoOptions //不要生肖需求表
						},
					}
					console.log(programs)
					this.$http.post(process.env.API_HOST + '/detailsMoudleController/releaseRequirements', programs).then(response => {
						console.log(response, '需求')
						let res = response.data;
						if(res.true) {
							let _this = this;
							this.$alert('您的需求发给家政人员，稍后会有人联系您', '保存成功', {
					          	confirmButtonText: '确定',
					          	callback: action => {
						            //点击确定 回调函数
						            
						            _this.$router.push({
										path: '/',
										query: {
											company_id: _this.$route.query.company_id,
											employee_id: _this.$route.query.employee_id
										}
									})
						            
					          	}
					       	});
						} else {
							this.$message({
					          	showClose: true,
					          	message: res.msg,
					          	type: 'warning'
					       	});
						}
						
					})
				
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
	.title_customer{
		line-height: 74px;
		font-size: 22px;
		color: #3f3f3f;
		font-family: "宋体";
		letter-spacing: 2px;
	}
	
	
	.cell_custome{
		background: #f5f5f5;
		overflow: hidden;
		position: relative;
		padding: 30px 0 30px;
	}
	.boxs_customer{
		background: #fff;
		width: 932px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		padding:30px 188px 40px 82px ;
	}
	.boxs_customer i{
		display: inline-block;
		line-height: 34px;
		color: #929292;
		font-style: normal;
		margin-right: 20px;
	}
	.boxs_customer input{
		width: 320px;
		border: 1px solid #e9e9e9;
		line-height: 34px;
		border-radius: 3px;
	}
	.name_box {
		overflow: hidden;
	}
	.name_box div{
		float: left;
	}
	.name_box div:last-child{
		float: right;
	}
	.address_box{
		overflow: hidden;
		margin-top: 24px;
	}
	.address_box *{
		float: left;
	}
	.address_box textarea{
		width: 838px;
		border: 1px solid #e9e9e9;
		resize: none;
		line-height: 32px;
		border-radius: 3px;
	}
	.address_box .work_address{
		width: 688px;
	}
	.el-checkbox {
		margin-top: 10px;
		margin-left: 20px;
	}
	
	.a_btn_type{
		display: inline-block;
		padding: 0 16px;
		text-align: center;
		line-height: 28px;
		border: 2px solid #1faf1e;
		color: #1faf1e;
		border-radius: 12px;
	}
	.boxs_customer .a_btn_type i{
		margin-right: 5px;
		color: #1faf1e;
	}
	
	.showBtns{
		margin-top: 9px;
		margin-bottom: 24px;
		border: 1px solid #e2e2e2;
		width: 100%;
		padding: 29px;
		background: #f3f3f5;
		text-align: left;
	}
	.showBtns .a_btn_type{
		margin-right: 18px;
		border-color: #ddd;
		color: #3f3f3f;
	}
	.showBtns .active{
	    border-color: #1aad19;
	    background: #fff;
	    color: #1aad19;
	}
	
	.btn_group{
		text-align: left;
	}
	.btn_group .is-checked{
		background: #fff url(../../assets/img/checked.png) no-repeat 100% 100% !important;
		background-size: 14px 14px !important;
    	border-color: #1aad19 !important;
	}
	.btn_group .el-checkbox:first-of-type{
		margin-left: 10px !important;
	}
	.btn_group .el-checkbox__input.is-checked+.el-checkbox__label{
		color: #00A10A;
	}
	.btn_group .el-checkbox__inner{
		display: none !important;
	}
	
	
	.boxs_more{
		background: #fff;
		width: 1038px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		padding:30px 82px ;
	}
	.boxs_more form {
		width: 50%;
	}
</style>