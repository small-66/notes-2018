<template>
	<div class="hello" style="background: #f5f5f5;">
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
			</div>

			<el-carousel indicator-position="inside" class="barnar" height="540px">
				<el-carousel-item v-for="(item,index) in demo01_list" :key="index">
					<img style="width: auto; height: auto;  max-width: 100%;  max-height: 100%;  " :src="item.img" alt="" />
					
				</el-carousel-item>
			</el-carousel>
			<section class="cell_box">
				<div class="boxs box_nav">
					<h3>精选公司服务</h3>
					<el-row :gutter="20" class="service_nav">
						<el-col :span="4" v-for="(item,index) in arrSer" :key="index" >
							<a href="javascript:;" class="service_a" :class="item.className" @click="toRoute(item)">
								<strong>{{item.name}}</strong>
							</a>
						</el-col>
						<!--<el-col :span="4">
							<a href="javascript:;" class="service_a">
								<strong>月嫂</strong>
							</a>
						</el-col>
						<el-col :span="4">
							<a href="javascript:;" class="service_a">
								<strong>育婴师/育儿嫂</strong>
							</a>
						</el-col>
						<el-col :span="4">
							<a href="javascript:;" class="service_a">
								<strong>家庭保洁</strong>
							</a>
						</el-col>
						<el-col :span="4">
							<a href="javascript:;" class="service_a">
								<strong>居家养老</strong>
							</a>
						</el-col>
						<el-col :span="4">
							<a href="javascript:;" class="service_a">
								<strong>全部分类</strong>
							</a>
						</el-col>-->

					</el-row>
				</div>
			</section>
			<section class="cell_box aunt_list">
				<div class="boxs">
					<h3>专业阿姨</h3>
					<ul class="housekeeping">
						<li v-for="auntInfo in auntInfoList">
							<dl class="housekeepingTop">
								<dt>
			                    <img v-lazy="auntInfo.photograph_loc"/>
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
					<div>
						<a class="el-button el-button--success is-plain" :href="'/auntList?company_id='+company_id+'&employee_id='+employee_id">查看更多</a>
					</div>

				</div>
			</section>
			<section class="cell_box">
				<div class="boxs">
					<h3>客户精选需求</h3>
					<el-row :gutter="20" class="demand_nav">
						<el-col :span="8" v-for="item in demandInfo" :key="item.demand_id">
							<div class="demand_list">
								<h4>{{item.demand_title}}</h4>
								<strong>工作地址:{{item.demand_location}}</strong>

								<div class="salary">
									<i v-if="item.demand_salary_begin&&item.demand_salary_end"><span>{{item.demand_salary_begin}}-{{item.demand_salary_end}}</span>元</i>
									<i v-else>薪资面议</i>
								</div>
								<div class="btn_demand">
									<!--<el-button plain>查看详情</el-button>-->
									<a class="el-button el-button--success is-plain" :href="'/demandList?company_id='+company_id+'&employee_id='+employee_id">查看更多</a>
								</div>

							</div>
						</el-col>
						
						
					</el-row>
					
				</div>
			</section>
			<div style="background: #fff;">
				<v-footer></v-footer>
			</div>

		</div>

	</div>
</template>

<script>
	const serDate= [
		{
			className:'nav_1',
			name:'保姆'
		},
		{
			className:'nav_2',
			name:'月嫂'
		},
		{
			className:'nav_3',
			name:'育婴师/育儿嫂'
		},
		{
			className:'nav_4',
			name:'家庭保洁'
		},
		{
			className:'nav_5',
			name:'居家养老'
		},
		{
			className:'nav_6',
			name:'全部分类'
		},
	];
	
	import VFooter from '@/components/unit/VFooter'
	import VHeader from '@/components/unit/VHeader'
	export default {
		name: 'Home',
		components: {
			VHeader,
			VFooter
		},
		data() {
			return {
				arrSer: serDate,
				company_id:'',
				employee_id:'',
				auntNum: 0,
				auntInfoList: [
					/*{
						aunt_name:'高圆圆',
						aunt_work_experience:'3-5年',
						aunt_age:'25',
						province:'台湾省',
						bdji_service_name:['保姆','月嫂'],
						bdc_name:['徒手撕鬼子','囚徒健身'],
						photograph_loc:'https://www.baidu.com/link?url=zrfR-FIQ_wEIU_rxz_ckHdqv1rncrVqSN8tEsItnBsJ1oWPP7vBBLq6h_YRVAElCGAq7ZNz52Hx2lVa1W6Vv7o_eCv_sBFhPdlDJJkhXKzSlsJlE2SiQe7FVkVmv_Gm6&wd=&eqid=e9786cbd0001bd6f000000025acc2fb8'
					},
					{
						aunt_name:'刘涛',
						aunt_work_experience:'3-5年',
						aunt_age:'25',
						province:'台湾省',
						bdji_service_name:['保姆','月嫂'],
						bdc_name:['徒手撕鬼子','囚徒健身'],
						photograph_loc:'https://www.baidu.com/link?url=zrfR-FIQ_wEIU_rxz_ckHdqv1rncrVqSN8tEsItnBsJ1oWPP7vBBLq6h_YRVAElCGAq7ZNz52Hx2lVa1W6Vv7o_eCv_sBFhPdlDJJkhXKzSlsJlE2SiQe7FVkVmv_Gm6&wd=&eqid=e9786cbd0001bd6f000000025acc2fb8'
					}*/
				],
				demandNum:0,
				demandInfo:[
					/*{
						demand_title:'需求：保姆',
						demand_location:'上海',
						
					},
					{
						demand_title:'需求：保姆',
						demand_location:'上海',
						
					},
					{
						demand_title:'需求：保姆',
						demand_location:'上海',
						
					}*/
				],
				demo01_list:[
					/*{
						img:'http://pic65.nipic.com/file/20150420/8684504_003238146482_2.jpg'
					},
					{
						img:'http://b.hiphotos.baidu.com/zhidao/pic/item/908fa0ec08fa513d2fd87b813b6d55fbb2fbd97a.jpg'
					},
					{
						img:'http://img.mp.itc.cn/upload/20170614/af612f7685f640b3a68269b6ef178807_th.jpg'
					},
					{
						img:'http://img.mp.itc.cn/upload/20170627/408a4f977c3d42be9d41ce886c4f2ad9_th.jpg'
					}*/
				]

			}
		},
		mounted() {
			this.$store.commit("switch", '1');
			this.init();
			this.queryCAD();
			this.queryAuntList();
			this.queryDemand();
		},
		methods: {
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
			init(){
				this.company_id = this.$route.query.company_id;
				this.employee_id = this.$route.query.employee_id;
			},
			queryAuntList() {
				let programs = {
					login_user: this.$route.query.employee_id,
					company_id: this.$route.query.company_id, //公司id
					pageUtil: {
						currentPageNum: 1,
					}
				}
				this.auntInfoList = [];
				this.$http.post(process.env.API_HOST + '/recommendController/selectAuntRecommend', programs).then(response => {
					console.log(response, 'ay')
					let res = response.data;
					if(res.true) {
						if(res.data.data.length == 0) {
							this.$http.post(process.env.API_HOST + '/recommendController/selectAuntAllRecommend', programs).then(response => {
								console.log(response, 'ay1')
								let ress = response.data;
								if(ress.true) {
									this.auntInfoList = ress.data.data;
									this.auntNum = ress.data.num;

								}
							})
						} else {
							this.auntInfoList = res.data.data;
							this.auntNum = res.data.num;
						}
					}
				})
			},
			
			queryDemand(){
				 let programs ={
		 			  customer_owner: this.$route.query.employee_id,
					  company_id: this.$route.query.company_id, //公司id
					  pageUtil: {
					    currentPageNum: 1,
					  }
					}
				this.$http.post(process.env.API_HOST+'/recommendController/selectDemandRecommend',programs).then(response=>{
					console.log(response,'xq')
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
						this.demandInfo = res.data.data;
						this.demandNum = res.data.num;
						if(res.data.data.length=='0'){
							this.$http.post(process.env.API_HOST+'/recommendController/selectDemandAllRecommend',programs).then(response=>{
									console.log(response,'xq1')
									let ress = response.data;
									if(ress.true){
										ress.data.data.forEach(item=>{
									
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
										this.demandInfo = ress.data.data;
										this.demandNum = ress.data.num;
									}
								})
						}
						
						console.log(this.demandInfo,'sdds')
					}
				})
			},
			
			queryCAD(){
				this.$http.post(process.env.API_HOST+'/homeController/advertisementList',{company_id:this.$route.query.company_id}).then(response=>{
					console.log(response,'广告')
					let res = response.data;
					if(res.true){
						this.demo01_list=[];
						let arrImages =[]
						res.data.forEach(item=>{
							arrImages.push({
								url:'/adDetails?adv_id='+item.adv_id+'&company_id='+this.$route.query.company_id+'&employee_id='+this.$route.query.employee_id,
								img: item.photo_location //'http://img4.imgtn.bdimg.com/it/u=1308070342,332603640&fm=27&gp=0.jpg' //
							})
						})
						this.demo01_list= arrImages;
						
						console.log(this.demo01_list,'广告列表') 
					}
				})
				
				

			},
			toRoute(item){
				console.log(item)
				this.$http.post(process.env.API_HOST+'/websiteProvidingController/homeProvidingDetils',{
					company_id:this.$route.query.company_id,
					bdji_title: item.name
				}).then(response=>{
					console.log(response,'六项服务')
					let res = response.data;
					if(res.true){
						let id = res.data;
						if(id){
							window.location.href='/serviceDetails?service_id='+id+'&company_id='+this.$route.query.company_id+'&employee_id='+this.$route.query.employee_id
						}else{
							//alert('该服务id为null')
							window.location.href='/serviceList?company_id='+this.$route.query.company_id+'&employee_id='+this.$route.query.employee_id
						}
					}
				})
			},
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.wrap {
		margin: 0 auto;
	}
	
	.boxs {
		width: 1202px;
		margin: 0 auto;
		padding-bottom: 40px;
	}
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 540px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
	
	.barnar {
		height: 540px;
	}
	
	.cell_box {
		background: #fff;
	}
	
	.cell_box h3 {
		line-height: 103px;
		font-size: 30px;
		font-weight: 500;
		font-family: "宋体";
	}
	
	.cell_box .service_a {
		display: inline-block;
		width: 185px;
		height: 185px;
		background: #f3eeea;
		position: relative;
		background: url(../../static/img/index_nav.png) no-repeat;
		background-color:#ecf5f4 ;
		background-position: 53px 50px;
	}
	.cell_box .nav_2{
		background-color:#f3eeea ;
		background-position: -153px 50px;
	}
	.cell_box .nav_3{
		background-color:#eef5eb ;
		background-position: -353px 50px;
	}
	.cell_box .nav_4{
		background-color:#f5f2eb ;
		background-position: -553px 50px;
	}
	.cell_box .nav_5{
		background-color:#ebf4f5 ;
		background-position: -763px 50px;
	}
	.cell_box .nav_6{
		background-color:#f5efec ;
		background-position: -963px 50px;
	}
	
	.cell_box .service_a strong {
		position: absolute;
		top: 32px;
		left: 0;
		width: 100%;
		display: inline-block;
		text-align: center;
		font-size: 15px;
		font-family: "宋体";
		color: #3f3f3f;
	}
	
	.aunt_list {
		background: #f5f5f5;
	}
	
	.housekeeping>li {
		position: relative;
		background: #fff;
		margin: 20px 0;
	}
	
	.housekeepingTop {
		overflow: hidden;
		padding: 30px 0 30px 18px;
	}
	
	.housekeepingTop>dt {
		float: left;
		width: 118px;
		height: 118px;
		border: 1px solid #e2e2e2;
	}
	
	.housekeepingTop dt>img {
		width: 118px;
		height: 118px;
	}
	
	.housekeepingTop dd {
		float: left;
		margin-left: 30px;
	}
	
	.aunt_name {
		text-align: left;
		font-size: 22px;
		color: #1aad19;
		margin-bottom: 12px;
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
	
	.salary  span {
		display: inline-block;
		font-size: 20px;
		line-height: 34px;
		color: #1aad19;
	}
	.salary i{
		font-style: normal;
		color: #3f3f3f;
	}
	.demand_list {
		border: 1px solid #e2e2e2;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		line-height: 24px;
		color: #838383;
		padding: 20px 60px;
	}
	
	.demand_list h4 {
		line-height: 46px;
	}
	
	.demand_list .btn_demand {
		margin: 14px 0 18px;
	}
	
	.demand_list .salary {
		margin-top: 20px;
		height: 34px;
	}
	
	.demand_nav {
		margin-bottom: 20px;
	}
	
	.company_list {
		margin-top: 20px;
		padding: 30px 0 8px;
		font-weight: 500;
	}
	
	.company_list h2 {
		font-family: "宋体";
		font-size: 17px;
		line-height: 40px;
	}
	
	.company_list h3 {
		font-family: "宋体";
		font-size: 17px;
		line-height: 40px;
		font-weight: 400;
	}
	
	.company_list h3 a {
		display: inline-block;
		text-decoration: none;
		font-family: "宋体";
		color: #1aad19;
		font-size: 17px;
		line-height: 40px;
	}
	
	.company_list h4 {
		font-family: "宋体";
		font-size: 12px;
		line-height: 36px;
	}
	
	.company_list .img_erwema {
		overflow: hidden;
		width: 284px;
		margin: 0 auto;
	}
	
	.company_list .img_erwema div {
		float: left;
	}
	
	.company_list .img_erwema .img_box {
		width: 104px;
		height: 104px;
		border: 1px solid #b7b7b7;
		padding: 8px;
		margin-right: 20px;
	}
	
	.company_list .img_erwema .img_box:last-child {
		margin: 0;
	}
	
	.img_box img {
		width: 104px;
		height: 104px;
	}
	
	.img_erwema h4 {
		font-size: 14px;
		line-height: 36px;
		color: #7a7a7a;
	}
	
	.service_nav {}
</style>