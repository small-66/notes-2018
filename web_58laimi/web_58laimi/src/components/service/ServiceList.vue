<template>
	<div>
		<div class="wrap">
			<div style="background: #fff;">
				<v-header></v-header>
			</div>
			<section class="cell_box">
				<div class="boxs">
					<el-col :span="20" :offset="4">
						<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#fff" text-color="#000" active-text-color="#ffd04b">
							<el-menu-item :index="item.index" v-for="item in navList" :key="item.index">{{item.title}}</el-menu-item>
						</el-menu>
					</el-col>
					<el-col :span="24"  v-for="(item,index) in list2" :key="index">
						<div  v-if="activeIndex==index">
							<ul class="service_list">
								<li v-for="em in item.service_infomations_Po_typeTwo">
									<h2>
										<span>{{em.bdji_type_two_name}}</span>
									</h2>
									<ul class="service_list_section">
										<!--<li @click="toDetails(item.service_id)" v-for="">日常保洁</li>-->
										<li v-for="i in em.service_infomations_Po_typeTwo" @click="toDetails(i.service_id)">
											<span>
					                          <!--<input type="checkbox" name="intentions" :id="i.bdji_id" :value="i.bdji_id" v-model="service_pop" >
					                          <label class="iconfont" :for="i.bdji_id">{{i.bdji_name}}</label>-->
					                          
					                          {{i.bdji_title}}
					                        </span>
											
										</li>
									</ul>
								</li>
								
							</ul>
						</div>
						
					</el-col>
					
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
				list2:[]
				
			}
		},
		mounted() {
			this.$store.commit("switch", '3');
			
			this.queryAllService();
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				console.log(this.activeIndex);
				this.activeIndex = key;
			},
			toDetails(id){
				this.$router.push({
					path:'/serviceDetails',
					query:{
						service_id:id,
						company_id: this.$route.query.company_id,
		    			employee_id: this.$route.query.employee_id
					}
				})
			},
			
			queryAllService(){
				this.company_id = this.$route.query.company_id;
				this.employee_id = this.$route.query.employee_id;
				let programs ={
					company_id : this.company_id
				}
				this.$http.post(process.env.API_HOST + 'websiteProvidingController/allServiceInfomation', programs).then(response => {
					console.log(response,'list');
					let res = response.data
					if(res.true) {
						this.list2 = res.data
						this.list2.forEach((item,index)=>{
							this.navList.push({
								index: index+'',
								title: item.bdji_type_one_name
							})		
						})
					}
				})
			}
		}
	}
</script>

<style>
	.cell_box{
		background: #f5f5f5;
		overflow: hidden;
		position: relative;
		padding: 9px 0 30px;
	}
	.boxs{
		background: #fff;
		width: 1202px ;
		overflow: hidden;
		position: relative;
		margin:0 auto;
		padding-bottom: 40px;
	}
	.service_list{
		padding:45px 30px 0 30px;
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
		width:134px;
		text-align: left;
		line-height:25px;
		margin-bottom: 40px;
		color: #636363;
	}
	
	.service_list>li:last-child{
		border-bottom:  1px solid #f5f5f5;
		margin-bottom: 80px;
	}
</style>