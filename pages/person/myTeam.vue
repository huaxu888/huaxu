<template>
	<view>
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的团队</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">我的团队</block>
			<!-- #endif -->
		</cu-custom>

		<view class="pure_top">
			<view class="pure_top_after flex align-center justify-center ">
				<view class="fullwidth">
					<view class="card">
						<view class="flex align-center justify-center">
							<view class="text-gradient flex align-center justify-center">
								<text class="hxIcon-jinzi" style="font-size:45upx"></text>
								<text class=" text-lg margin-lr-sm">
									{{title}}
									<text style="font-weight: 600;font-size:36upx ;">&yen;{{showxiaofei}}</text>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="panel flex-row" style="align-items: center;justify-content: space-around; ">
			<view class="flex-column align-center justify-center" style="height: 150upx; width: 50%;" @tap="change(1)">
				<view class="flex-column align-center justify-center" :style="select==1?'border-color:#ec3a46':'border-color:#FFFFFF'"
				 style="border-bottom: 3px solid #FFFFFF;height: 150upx;">
					<text class="main-info">{{myUser}}</text>
					<text class="text-df">我的用户</text>
				</view>
			</view>
			<view class="vertical-line"></view>
			<view class="flex-column align-center justify-center" style="height: 150upx; width: 50%;" @tap="change(2)">
				<view class="flex-column align-center justify-center" :style="select==2?'border-color:#ec3a46':'border-color:#FFFFFF'"
				 style="border-bottom: 3px solid #FFFFFF;height: 150upx;">
					<text class="main-info ">{{myStore}}</text>
					<text class="text-df">商家用户</text>
				</view>
			</view>
		</view>

		<!-- 
		<view>
			<view class="padding-sm margin-lr" style="border-radius: 100upx;background-color:#007AFF;">
			</view>
		</view> -->

		<!-- 	
		<button @tap="orderby(1)">按照团队排序</button>
		<button @tap="orderby(2)">按照消费额度排序</button> 
	-->

		<view class="margin-lr padding-tb-sm padding-lr-sm flex align-center justify-between" style="background:#FFFFFF;" v-if="this.ShowData.length > 0">
			<view class="flex align-center justify-around " style="width: 100%;border-radius: 1000upx;background: #F8F8F8;">
				<view class="padding-tb-xs flex align-center justify-center " :class="selectCardNum == 1 ? 'hover':''" style="border-radius: 1000upx;width: 50%;"
				 @tap="orderby(1)"><text>团队数</text><text class="cuIcon-triangledownfill"></text></view>
				<view class="padding-tb-xs flex align-center justify-center " :class="selectCardNum == 2 ? 'hover':''" style="border-radius: 1000upx;width: 50%;"
				 @tap="orderby(2)"><text>消费额</text><text class="cuIcon-triangledownfill"></text></view>
			</view>
		</view>
		<team-list :Data="ShowData" :isOperate="isOperate" @gotoChild="gotoChild"></team-list>
	</view>
</template>

<script>
	import teamList from '../../components/teamList.vue'
	export default {
		components: {
			teamList
		},
		data() {
			return {
				select: 1,
				title: "用户消费（元）：",
				isOperate: true,
				myUser: 0,
				myStore: 0,
				money: 0,
				ShowData: [],
				Data: [], //推荐用户
				Data2: [], //推荐商家
				Child: [],
				totalxiaofei: 0, //统计消费额
				totalisshopxiaofei: 0, //商铺消费额
				showxiaofei: 0, //展示的消费额
				selectCardNum: 3
			}
		},
		onLoad() {
			//获取团队
			
			let _self = this;
			_self.$api.showLoading_();
			uni.request({
				url: "https://newsapp.huaxuapp.com/api/menber/myteam",
				data: {
					userid: _self.$store.state.userInfo.ID
				},
				method: "GET",
				success: (res) => {
					_self.Data = res.data.Data;
					_self.Data2 = res.data.Data2;
					this.myUser = _self.Data.length;
					this.myStore = _self.Data2.length;
					this.totalxiaofei = this.$api.formatAmount(res.data.totalxiaofei);
					this.showxiaofei = this.totalxiaofei;
					this.totalisshopxiaofei = this.$api.formatAmount(res.data.totalisshopxiaofei);
					_self.Data.forEach(item => {
						item.AddDate = this.getLocalTime(item.AddDate);
						item.Phone = this.formatPhone(item.Phone)
					})
					_self.Data2.forEach(item => {
						item.AddDate = this.getLocalTime(item.AddDate);
						item.Phone = this.formatPhone(item.Phone)
					})
					_self.ShowData = res.data.Data;
					_self.$api.hidLoading_();
				},
			});

		},
		methods: {
			orderby(num) {
				if (this.ShowData.length > 0) {
					this.selectCardNum = num;
					switch (num) {
						case 1:
							this.ShowData.sort(this.compare1("Child"))
							break;
						case 2:
							this.ShowData.sort(this.compare2("XiaoFeiScore"))
							break;
						default:
							break;
					}
				}
			},
			compare1(str) {
				return function(obj1, obj2) {
					var value1 = obj1[str].length;
					var value2 = obj2[str].length;
					if (value1 < value2) {
						return 1;
					} else if (value1 > value2) {
						return -1;
					} else {
						return 0;
					}
				}
			},
			compare2(str) {
				return function(obj1, obj2) {
					var value1 = obj1[str];
					var value2 = obj2[str];
					if (value1 < value2) {
						return 1;
					} else if (value1 > value2) {
						return -1;
					} else {
						return 0;
					}
				}
			},
			getAllMoney() {
				let sum = 0;
				this.Data.forEach(item => {
					sum += parseFloat(item.XiaoFeiScore);
				})
				this.Data2.forEach(item => {
					sum += parseFloat(item.XiaoFeiScore);
				})
				sum = this.$api.formatAmount(sum);
				return sum;
			},
			gotoChild(index) {
				
				if (this.isOperate == true) {
					if (this.ShowData[index].Child.length > 0) {
						this.isOperate = false;
						this.ShowData = this.ShowData[index].Child;
						this.ShowData.forEach(item => {
							item.AddDate = this.getLocalTime(item.AddDate);
						})

					} else {
						this.$api.msg('该用户没有下级用户');
					}
					//当此方法被触发说明
					// console.log("获取该子节点用户的length");
					// this.myUser = this.Data[index].Child.length;
					// console.log("获取该子节点商家的length");
					// this.myStore = this.Data2[index].Child.length;
				}
			},

			getLocalTime(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				date = year + '.' + month + '.' + day;
				return date;
			},
			change(index) {
				this.selectCardNum= 3;
				this.select = index;
				if (index === 1) {
					this.title = "用户消费（元）：";
					this.ShowData = this.Data;
					this.showxiaofei = this.totalxiaofei;
					this.isOperate = true;
				} else if (index === 2) {
					this.title = "商家消费（元）：";
					this.ShowData = this.Data2;
					this.showxiaofei = this.totalisshopxiaofei;
					this.isOperate = true;
				}
			},
			formatPhone: function (phone) {
				return phone.substr(0, 3) + '****' + phone.substr(7)
			}
		},

	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}



	.hover {
		background: #eb5245;
		color: #FFFFFF;
	}


	.pure_top {
		width: 100%;
		height: 170upx;
		position: relative;
		z-index: 1;
		overflow: hidden;
	}

	.pure_top_after {
		content: '';
		width: 140%;
		height: 170upx;
		position: absolute;
		left: -20%;
		top: 0;
		z-index: 1;
		border-radius: 0 0 50% 50%;
		background: #ec3a46;
		overflow: hidden;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #ec3a46, #eb5245);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #ec3a46, #eb5245);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}

	.banner {
		display: flex;
		justify-content: center;
		position: relative;
		width: 100%;
		height: 180upx;
		border-radius: 0 0 95% 95%;
		z-index: 1;
		overflow: hidden;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
	}

	.main-info {
		color: #ec3a46;
		font-size: 44upx;
		font-weight: 700;
		padding-bottom: 10upx;
	}

	.fullwidth {
		width: calc(100% / 1.4);
	}

	.card {
		top: 60upx;
		position: relative;
		margin-left: 30upx;
		margin-right: 30upx;
		height: 150upx;
		padding: 25upx;
		z-index: 2;
		border-radius: 10upx;
		background: url('https://img.huaxuapp.com/%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9F.png') no-repeat;
		background-size: cover;
	}

	.text-gradient {
		/* 		background: -webkit-linear-gradient(top, rgb(254, 239, 216) 0%, rgb(218, 168, 138) 100%);
		background: -o-linear-gradient(top, rgb(254, 239, 216) 0%, rgb(218, 168, 138) 100%);
		background: -moz-linear-gradient(top, rgb(254, 239, 216) 0%, rgb(218, 168, 138) 100%);
		background: linear-gradient(top, rgb(254, 239, 216) 0%, rgb(218, 168, 138) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent; */
		color: rgb(255, 232, 217);
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.panel {
		margin: 30upx;
		border-radius: 10upx;
		background: #FFFFFF;
		height: 150upx;
		box-shadow: 0 5upx 5upx #aaa;
		position: relative;
		z-index: 9;
	}


	.vertical-line {
		height: 80upx;
		width: 1upx;
		background: #ccc;
	}
</style>
