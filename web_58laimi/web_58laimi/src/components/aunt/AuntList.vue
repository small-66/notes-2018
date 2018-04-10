<template>
	<div style="background: #f5f5f5;">
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
			</div>
			<section class="cell_box">
				<div class="boxs_aunt" style="text-align: left;">
					<el-row>
						<el-col :span="2">
							<h3>工种：</h3>
						</el-col>
						<el-col :span="22">
							<el-radio-group v-model="service_type" >
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1" @click.native="openSeDailog">点击筛选</el-radio-button>
							</el-radio-group>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<h3>工资：</h3>
						</el-col>
						<el-col :span="22">
							<el-radio-group v-model="salery" @change="query">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button :label="item.key" v-for="(item,key) in salerys" :key="key">{{item.value}}</el-radio-button>
							</el-radio-group>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<h3>经验：</h3>
						</el-col>
						<el-col :span="22">
							<el-radio-group v-model="experience" @change="query">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button :label="item.key" v-for="(item,key) in experienceList" :key="key">{{item.value}}</el-radio-button>
							</el-radio-group>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<h3>地域：</h3>
						</el-col>
						<el-col :span="22">
							<el-radio-group v-model="area_" @change="query">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="0">南方</el-radio-button>
								<el-radio-button label="1">北方</el-radio-button>
							</el-radio-group>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<h3>户籍：</h3>
						</el-col>
						<el-col :span="22" class="allProvince">
							<el-radio-group v-model="register" @change="query">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button :label="item.value" v-for="(item,key) in registerList" :key="key">{{item.name}}</el-radio-button>
							</el-radio-group>
						</el-col>
					</el-row>
				</div>

			</section>

			<section style="background: #fff;">
				<div class="boxs_aunt" style="text-align: left;">
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
					<div style="text-align: right;">
						<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPageNum"
					      :page-size="10"
					      layout="prev, pager, next, jumper"
					      :total="totalNum">
	    				</el-pagination>
					</div>
					

				</div>
			</section>

			<div style="background: #fff;">
				<v-footer></v-footer>
			</div>
		</div>
		
		<el-dialog
		  :visible.sync="showDailog"
		  width="1202px"
		  center>
		  
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
					                          <input type="checkbox" name="intentions" :id="i.bdji_id" :value="i.bdji_id" v-model="service_pop" >
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
		    <el-button type="primary" @click="query">确 定</el-button>
		  </span>
		</el-dialog>
		
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
				service_type: '',
				aunt_job_intentions:[],
				service_pop:[],
				
				showDailog:false,
				salery: '',
				salerys: [{
					key: '2',
					value: '100元以下'
				}, {
					key: '3',
					value: '101~1000元'
				}, {
					key: '4',
					value: '1001~2000元'
				}, {
					key: '5',
					value: '2001~3000元'
				}, {
					key: '6',
					value: '3001~5000元'
				}, {
					key: '7',
					value: '5001~8000元'
				}, {
					key: '8',
					value: '8001~10000元'
				}, {
					key: '9',
					value: '10000以上'
				}],
				experience: '', //经验
				experienceList: [
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
						value: '10年以上'
					}
				],
				area_: '', //地域
				register: '', //户籍
				registerList: [],

				auntInfoList: [/*{
						photograph_loc: 'http://58laimi.oss-cn-zhangjiakou.aliyuncs.com/resouce/img.jpg',
						aunt_name: '吴雄',
						aunt_work_experience: '1-2年',
						aunt_age: '22',
						province: '山东省',
						aunt_salary_begin: '11.11',
						aunt_salary_end: '33.22',
						bdji_service_name: ['自理老人', '自理老人2'],
						bdc_name: ['驾驶证'],
					},
					{
						photograph_loc: 'http://58laimi.oss-cn-zhangjiakou.aliyuncs.com/resouce/img.jpg',
						aunt_name: '吴雄',
						aunt_work_experience: '1-2年',
						aunt_age: '22',
						province: '山东省',
						aunt_salary_begin: '',
						aunt_salary_end: '',
						bdji_service_name: ['自理老人'],
						bdc_name: ['驾驶证'],
					}*/
				],
				currentPageNum:1,
				totalNum:10,
				
				
				
				activeIndex: '0',
				navList: [],
				
				list2:[]
			}
		},
		watch:{
			service_type(){
				console.log(this.service_type)
				if(this.service_type=='1'){
					this.showDailog = true;
				}else{
					this.showDailog = false;
					this.aunt_job_intentions=[];
					this.service_pop=[];
					this.query();
				}
			},
			service_pop(){
				console.log(this.service_pop)
			}
		},
		mounted() {
			console.log(this.$store.state.navHeader);
			this.$store.commit("switch", '2');
			
			this.queryServices();
			this.queryProvince();
			this.queryList();
			
		},
		methods: {
			openSeDailog(){
				this.showDailog = true;
			},
			toAuntDetails(item){
				console.log(item)
				this.$router.push({
					path:'/auntDetails',
					query:{
						aunt_id: item.aunt_id,
						company_id: this.company_id,
						employee_id: this.employee_id
					}
				})
			},
			query(){
				//查询
				this.showDailog = false;
				this.auntInfoList=[];
				this.currentPageNum=1;
				this.queryList();
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				console.log(this.activeIndex);
				this.activeIndex = key;
			},
		 	handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
	      	},
	     	handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		        this.auntInfoList=[];
		        this.queryList();
		    },
		    queryProvince(){
				this.$http.post(process.env.API_HOST + '/websiteDataListController/getProvince',{}).then(response=>{
					console.log(response,'获取省');
					let res = response.data;
					if(res.true){
						let address=res.data;
						for(var key in address){
							let obj={};
							let area_name=address[key].area_name;
							let area_code=address[key].area_code;
							obj.name=area_name;
							obj.value=area_code;
							this.registerList.push(obj);
						}
						this.registerList.unshift({name:'不限',value:'00000'})
						console.log(this.registerList,'address2');
					
					}
				})
			},
			
			queryServices() {
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
			
			
			
			
			queryList() {
				this.employee_id = this.$route.query.employee_id;
				this.company_id = this.$route.query.company_id;
				
				let exp='';
				switch (this.experience){
					case '00':
						exp='1年以上'
						break;
					case '01':
						exp='2年以上'
						break;	
					case '02':
						exp='3年以上'
						break;
					case '03':
						exp='4年以上'
						break;
					case '04':
						exp='5年以上'
						break;
					case '05':
						exp='6年以上'
						break;
					case '06':
						exp='7年以上'
						break;
					case '07':
						exp='8年以上'
						break;
					case '08':
						exp='9年以上'
						break;
					case '09':
						exp='10年以上'
						break;
					
				}
				let salary_begin,salary_end;
				switch (this.salery){
					case '1':
						salary_begin='';
						salary_end='';
						console.log('不传值');
						break;
					case '2':
						salary_begin=0;
						salary_end=100;
						console.log(salary_begin,salary_end);
						break;
					case '3':
						salary_begin=100;
						salary_end=1000;
						console.log(salary_begin,salary_end);
						break;
					case '4':
						salary_begin=1000;
						salary_end=2000;
						console.log(salary_begin,salary_end);
						break;
					case '5':
						salary_begin=2000;
						salary_end=3000;
						console.log(salary_begin,salary_end);
						break;
					case '6':
						salary_begin=3000;
						salary_end=5000;
						console.log(salary_begin,salary_end);
						break;
					case '7':
						salary_begin=5000;
						salary_end=8000;
						break;
					case '8':
						salary_begin=8000;
						salary_end=10000;
						break;
					case '9':
						salary_begin=10000;
						salary_end=999999;						
						break;
				}
				
				let programs = {
					aunt_infomations: {
						aunt_work_experience: exp,
						province_value: this.register,
						aunt_salary_begin:salary_begin,
						aunt_salary_end:salary_end,
						aunt_salary_unit:'',
						aunt_area:this.area_
					},
					aunt_job_intentions: this.aunt_job_intentions,
					type: this.$route.query.type||'0',
					company_id: this.$route.query.company_id,
					pageUtil: {
						currentPageNum: this.currentPageNum
					}
				}
				this.service_pop.forEach(item => {
					programs.aunt_job_intentions.push({
						bdji_service_id: item
					})
				})
				this.$http.post(process.env.API_HOST + '/homeController/selectAuntInfomationsList', programs).then(response => {
						console.log(response,'list');
						console.log(response.data.data.data);
						let res = response.data
						if(res.true) {
							this.auntInfoList = this.auntInfoList.concat(res.data.data);
							this.totalNum = res.data.num;
						}
				})

			}
			
		    
		}
	}
</script>

<style scoped>
	.cell_box {
		background: #f5f5f5;
		overflow: hidden;
		position: relative;
		padding: 9px 0 30px;
	}
	
	.boxs_aunt {
		background: #fff;
		width: 1202px;
		overflow: hidden;
		position: relative;
		margin: 0 auto;
		padding-bottom: 40px;
		line-height: 60px;
	}
	
	.boxs_aunt h3 {
		text-align: center;
		font-weight: 500;
		line-height: 60px;
	}
	
	.housekeeping>li {
		position: relative;
		background: #fff;
		margin: 20px 0;
		border: 1px solid #e2e2e2;
	}
	
	.housekeepingTop {
		overflow: hidden;
		padding: 30px 0 30px 18px;
	}
	
	.housekeepingTop>dt {
		float: left;
		width: 120px;
		height: 120px;
		border: 1px solid #e2e2e2;
	}
	
	.housekeepingTop dt>img {
		width: 120px;
		height: 120px;
	}
	
	.housekeepingTop dd {
		float: left;
		margin-left: 30px;
	}
	
	.aunt_name {
		text-align: left;
		font-size: 22px;
		color: #1aad19;
	}
	
	.housekeepingTop .tags {
		display: inline-block;
		overflow: hidden;
		color: #7d9ab6;
		font-size: 12px;
		height: 24px;
		line-height: 24px;
		border-radius: 5px;
	}
	
	.housekeepingTop .tags li {
		float: left;
		margin-right: 20px;
		padding: 0 20px;
		background: rgba(237, 244, 250, .8);
	}
	
	.aunt_service {
		overflow: hidden;
		line-height: 24px;
	}
	
	.aunt_service dt {
		color: #1AAD19;
	}
	
	.aunt_service dt,
	.aunt_service dd {
		float: left;
	}
	
	.aunt_service span:after {
		content: '|';
		padding: 0 18px;
	}
	
	.aunt_service span:last-of-type:after {
		content: '';
	}
	
	.housekeepingTop .salary {
		float: right;
		margin-right: 30px;
	}
	
	.salary h2 {
		font-size: 16px;
		line-height: 30px;
		font-weight: 500;
	}
	
	.salary li span {
		display: inline-block;
		font-size: 20px;
		line-height: 34px;
		color: #1aad19;
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
</style>