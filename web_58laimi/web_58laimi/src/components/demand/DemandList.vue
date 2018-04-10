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
							<el-radio-group v-model="service_type">
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
				</div>

			</section>

			<section style="background: #fff;">
				<div class="boxs_aunt" style="text-align: left;">
					<ul class="demand_list">
						<li v-for="item in demandList" >
							<div>
								<h2>{{item.demand_title}}</h2>
								<h3>工作地址：<strong>{{item.demand_location}}</strong></h3>
								<!--<h4><span>400-4500</span>元</h4>-->
								<h4 v-if="item.demand_salary_begin && item.demand_salary_end && item.demand_salary_begin ==item.demand_salary_end">
									<span>{{item.demand_salary_begin}}</span>元</h4>
								<h4 v-else-if="item.demand_salary_begin && item.demand_salary_end">
									<span>{{item.demand_salary_begin}}-{{item.demand_salary_end}}</span>元</h4>
								<h4 v-else-if="!item.demand_salary_begin && item.demand_salary_end">
									<span>0-{{item.demand_salary_end}}</span>元</h4>
								<h4 v-else-if="item.demand_salary_begin && !item.demand_salary_end">
									<span>{{item.demand_salary_begin}}</span>元起</h4>
								<h4 v-else>薪资面议</h4>
								
								
								<!--<h4>薪资面议</h4>-->
								<el-button type="success" plain @click="toDetails(item)">查看详情</el-button>
							</div>
						</li>
					
					</ul>
					
					
					<div style="text-align: right; margin-top:56px ;">
						<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage"
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
				

				auntInfoList: [{
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
					}
				],
				currentPage:1,
				totalNum:10,
				
				
				service_pop:[],
				
				activeIndex: '0',
				navList: [/*{
						index: '0',
						title: '家政'
					},
					{
						index: '1',
						title: '家庭装修'
					},
					{
						index: '2',
						title: '便民服务'
					},
					{
						index: '3',
						title: '搬家'
					},
					{
						index: '4',
						title: '电子维修'
					},
					{
						index: '5',
						title: '其他服务'
					}*/
				],
				demandList:[],
				currentPageNum:1,
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
			this.$store.commit("switch", '4');
			this.query();
			this.queryServices();
		},
		methods: {
			openSeDailog(){
				this.showDailog = true;
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
		        this.demandList=[];
		        this.queryList();
		    },
		    toDetails(item){
		    	this.$router.push({
		    		path:'/demandDetails',
		    		query: {
		    			demand_id: item.demand_id,
		    			company_id: this.$route.query.company_id,
		    			employee_id: this.$route.query.employee_id
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
		    query(){
				//查询
				this.showDailog = false;
				this.demandList=[];
				this.currentPageNum=1;
				this.queryList();
			},
			queryList(){

	      		let demand_salary_begin,demand_salary_end;
				switch (this.salery){
					case '1':
						demand_salary_begin='';
						demand_salary_end='';
						console.log('不传值');
						break;
					case '2':
						demand_salary_begin=0;
						demand_salary_end=100;
						console.log(demand_salary_begin,demand_salary_end);
						break;
					case '3':
						demand_salary_begin=100;
						demand_salary_end=1000;
						console.log(demand_salary_begin,demand_salary_end);
						break;
					case '4':
						demand_salary_begin=1000;
						demand_salary_end=2000;
						console.log(demand_salary_begin,demand_salary_end);
						break;
					case '5':
						demand_salary_begin=2000;
						demand_salary_end=3000;
						console.log(demand_salary_begin,demand_salary_end);
						break;
					case '6':
						demand_salary_begin=3000;
						demand_salary_end=5000;
						console.log(demand_salary_begin,demand_salary_end);
						break;
					case '7':
						demand_salary_begin=5000;
						demand_salary_end=8000;
						break;
					case '8':
						demand_salary_begin=8000;
						demand_salary_end=10000;
						break;
					case '9':
						demand_salary_begin=10000;
						demand_salary_end=999999;
						break;
				}
	      		this.show2 = false;
	      		this.isSHow01 = false;
	    		let programs ={
	    			company_id: this.$route.query.company_id,
	    			type: this.$route.query.type||'0',
	    			pageUtil: {
					    currentPageNum: this.currentPageNum
					},
					service_id:[],
					customer_demand_Vo:{
					    demand_salary_begin:demand_salary_begin,
					    demand_salary_end:demand_salary_end
  					}
	    		}
	    		this.service_pop.forEach(item=>{
	    			programs.service_id.push(item)
	    		})

	    		console.log(programs)
	    		this.$http.post(process.env.API_HOST+ '/homeController/demandList',programs).then(response=>{
	    			console.log(response,'list')
	    			let res = response.data;
	    			if(res.true){
	    				res.data.data.forEach(item=>{
	    					switch (item.demand_salary_unit+''){
								case '0':
									item.demand_salary_unit='小时'
									break;
								case '1':
									item.demand_salary_unit='天'
									break;
								case '2':
									item.demand_salary_unit='周'
									break;
								case '3':
									item.demand_salary_unit='月'
									break;
								case '4':
									item.demand_salary_unit='年'
									break;
								default:
									break;
							}

	    				})
	    				this.totalNum = res.data.num;
						this.demandList = this.demandList.concat(res.data.data)
	    			}
	    		})
	    	},
		}
	}
</script>

<style>
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
	
	/*.service_list>li:last-child{
		border-bottom:  1px solid #f5f5f5;
		margin-bottom: 80px;
	}*/
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
	
	.demand_list{
		overflow: hidden;
		width: 100%;
	}
	.demand_list li{
		float: left;
		width: 28%;
		height: 255px;
		border: 1px solid #e2e2e2;
		margin: 30px 30px 0 0;
		font-family: "宋体";
		text-align: center;
	}
	.demand_list div{
		padding: 20px 60px;
	}
	.demand_list h2{
		line-height: 46px;
		font-size: 22px;
		color: #3f3f3f;
	}
	.demand_list h3{
		line-height: 24px;
		font-size: 13px;
		color: #747474;
	}
	.demand_list h4{
		line-height: 59px;
		font-size: 13px;
		color: #747474;
	}
	.demand_list h4 span{
		color: #1aad19;
		font-size: 22px;
	}
</style>