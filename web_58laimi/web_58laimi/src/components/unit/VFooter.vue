<template>
	<div>
		<section class="cell_boxs footer_header company_list">
			<div class="footer_box">
				<h2>{{companyMessage.company_name}}</h2>
				<h3><a :href="'tel:'+companyMessage.suoshuren_mobile">{{companyMessage.company_contact_mobile}}</a></h3>
				<h4>{{companyMessage.company_location}}</h4>
				<div class="img_erwema">
					<div>
						<div class="img_box">
							<img src="../../../static/img/wx.jpg" alt="" />
						</div>
						<h4>手机版</h4>
					</div>
					<div>
						<div class="img_box">
							<img src="../../../static/img/small_2.jpg" alt="" />
						</div>
						<h4>小程序</h4>
					</div>
				</div>
			</div>
		</section>
		<footer class="cell_boxs">
			<strong style="line-height: 63px; font-size: 12px;color: #3f3f3f;">系统由  云旅互联  提供    联系电话：010-86464583</strong>
		</footer>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				companyMessage: {

				}
			}
		},
		mounted() {
			this.queryCompany();
		},
		methods: {
			queryCompany() {
				let programs = {
					company_id: this.$route.query.company_id/*,
					employee_id: this.$route.query.employee_id*/
				}
				/*this.$http.post(process.env.API_HOST + '/homeController/selectPermissionCompanyByCompanyId', programs).then(response => {
					console.log(response)
					let res = response.data;
					if(res.true) {
						this.companyMessage = res.data.comPanyDetails;
					}
				})*/
				this.$http.post(process.env.API_HOST + '/homeController/contactUs', programs).then(response => {
					console.log(response)
					let res = response.data;
					if(res.true) {
						this.companyMessage = res.data.permission_companyDetails;
					}
				})
			}
		}
	}
</script>

<style>
	.footer_box {
		width: 1202px;
		margin: 0 auto;
	}
	
	.cell_boxs {
		background: #fff;
	}
	
	.footer_header {
		border-bottom: 1px solid #e2e2e2;
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
</style>