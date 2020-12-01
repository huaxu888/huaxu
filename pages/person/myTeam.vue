<template>
	<view>
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的粉丝</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">我的粉丝</block>
			<!-- #endif -->
		</cu-custom>

		<view  class="balance-page">
			<view class="Top" style="position: relative;">
				<view class="redHb">
					
					<view class="redHb_1">
						<text style="color: #7a4404;font-size: 26upx;">
							花粉总数
						</text>
						
						<view style="margin-top: 15upx;text-align: left;" >
							<text style="font-size: 40upx;font-weight: 600;">
								{{zong}}
							</text>
							<text style="font-size: 24upx;">人</text>
						</view>
					</view>
					<view class="redHb_2" style="text-align: center;display: flex;justify-content: center;align-items: center;" @tap="tiao">
						<text class="cuIcon-add" style="color: #FFFFFF;font-size: 30upx;margin-right: 4upx;"></text>
						<text style="font-size: 22upx;color: #ffffff;margin-right: 4upx;">
							邀请粉丝
						</text>
					</view>
				</view>
				<view style="height: 2upx;background-color:  #dfb18e;position: absolute;left: 45upx;top: 140upx;width: 600upx;">
					
				</view>
				<view class="yuEe" style="position: absolute;top: 140upx;">
					<view class="yuEe_1" style="font-size: 32upx;">
						<text style="font-weight: 600;color: #74390f;">{{Directs}}</text><text style="font-size: 22upx;">人</text>
						<view style="margin-top: 5upx;">
							<text style="font-size: 26upx;color: #7a4404;">
								直邀花粉
							</text>
						</view>
						<view style="margin-top: 0upx;" class="">
							<text style="font-size: 22upx;color: #7a4404;">
								有效{{zyYous}}人
							</text>
							<text @tap="tishi" class="hxIcon-wenhao3" style="font-size: 28upx;margin-left: 10upx;color: #7a4404;"></text>
						</view>
					</view>
					<view style="width: 2upx;height: 62upx;background-color:  #d7b295;position: absolute;top: 50upx;left: 240upx;">
						
					</view>
					<view class="yuEe_2" style="font-size: 32upx;">
						<text style="font-weight: 600;color: #74390f;">{{tuijian}}</text><text style="font-size: 22upx;">人</text>
						<view style="margin-top: 5upx;">
							<text style="font-size: 26upx;color: #7a4404;">
								推荐花粉
							</text>
						</view>
						<view style="margin-top: 0upx;">
							<text style="font-size: 22upx;color: #7a4404;">
								有效{{tjYous}}人
							</text>
						</view>
					</view>
					<view style="width: 2upx;height: 62upx;background-color:  #d7b295;position: absolute;top: 50upx;left: 470upx;">
						
					</view>
					<view class="yuEe_2" style="font-size: 32upx;">
						<text style="font-weight: 600;color: #74390f;">{{ShopCount}}</text><text style="font-size: 22upx;">人</text>
						<view style="margin-top: 5upx;">
							<text style="font-size: 26upx;color: #7a4404;">
								商家用户
							</text>
						</view>
						<view style="margin-top: 0upx;">
							<text style="font-size: 22upx;color: #7a4404;">
								有效{{ShopYHCount}}人
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="font-size: 36upx;color: #333333;font-weight: 600;margin-left: 30upx;margin-top: 20upx;">
			活跃情况
		</view>
		
		<view style="margin-top: 40upx;width: 690upx;margin-left: 30upx;">
			<view style="background-color: #e4e4e4;border-radius: 20upx 20upx 0 0;"class="flex justify-center">
				<view @tap="qieHuan(1)" class="flex justify-center" style="color: #333333;width: 230upx;font-size: 32upx;height: 106upx;line-height: 106upx;" :class="inx == 1 ? 'bian' : 'bians'">
					直邀花粉
				</view>
				<view @tap="qieHuan(2)" class="flex justify-center" style="color: #333333;width: 234upx;font-size: 32upx;height: 106upx;line-height: 106upx;" :class="inx == 2 ? 'bian_2' : 'bians_2'">
					推荐花粉
				</view>
				<view @tap="qieHuan(3)" class="flex justify-center" style="color: #333333;width: 230upx;font-size: 32upx;height: 106upx;line-height: 106upx;" :class="inx == 3 ? 'bian_3' : 'bians_3'">
					商家用户
				</view>
			</view>
			<view v-if="inx == 1" style="background-color: #FFFFFF;width: 690upx;">
				<view v-for="(item,index) in ShowData" :key="index" style="padding: 40upx 0upx;margin: 0 30upx;border-bottom: 1upx solid #e4e4e4;" class="flex">
					<view style="width: 82upx;height: 82upx;">
						<image :src=" item.FaceURL || 'https://img.huaxuapp.com/6454608_.pic.jpg'" style="width: 82upx;height: 82upx;border-radius: 80upx;" mode=""></image>
					</view>
					<view style="margin-left: 20upx;width: 100%;">
						<view class="flex align-center">
							<view v-if="item.XiaoFeiScore > 0" style="border-radius: 50upx;text-align: center;width: 64upx;height: 34upx;background-color: #0ab04f;font-size: 20upx;color: #FFFFFF;line-height: 34upx;">
								有效
							</view>
							<view v-if="item.XiaoFeiScore == 0" style="border-radius: 50upx;text-align: center;width: 64upx;height: 34upx;background-color: #EEEEEE;font-size: 20upx;color: #999999;line-height: 34upx;">
								无效
							</view>
							<view style="font-size: 30upx;font-weight: 600;margin-left: 6upx;">
								{{item.Nick}}
							</view>
						</view>
						<view style="margin-top: 26upx;" class="flex justify-between align-center">
							<view style="font-size: 24upx;color: #333333;">
								{{item.Phone}}
							</view>
							<view style="font-size: 24upx;color: #333333;">
								已消费：￥{{changeMoney(item.XiaoFeiScore)}}
							</view>
						</view>
						<view style="font-size: 22upx;color: #999999;margin-top: 15upx;">
							注册时间：{{timea(item.AddDate)}}
						</view>
					</view>
				</view>
			</view>
			<view v-if="inx == 2" style="background-color: #FFFFFF;width: 690upx;">
				<view v-for="(item,index) in tuiJian" :key="index" style="padding: 40upx 0upx;margin: 0 30upx;border-bottom: 1upx solid #e4e4e4;" class="flex">
					<view style="width: 82upx;height: 82upx;">
						<image :src=" item.FaceURL || 'https://img.huaxuapp.com/6454608_.pic.jpg'" style="width: 82upx;height: 82upx;border-radius: 80upx;" mode=""></image>
					</view>
					<view style="margin-left: 20upx;width: 100%;">
						<view class="flex align-center">
							<view v-if="item.XiaoFeiScore > 0" style="border-radius: 50upx;text-align: center;width: 64upx;height: 34upx;background-color: #0ab04f;font-size: 20upx;color: #FFFFFF;line-height: 34upx;">
								有效
							</view>
							<view v-if="item.XiaoFeiScore == 0" style="border-radius: 50upx;text-align: center;width: 64upx;height: 34upx;background-color: #EEEEEE;font-size: 20upx;color: #999999;line-height: 34upx;">
								无效
							</view>
							<view style="font-size: 30upx;font-weight: 600;margin-left: 6upx;">
								{{item.Nick}}
							</view>
						</view>
						<view style="margin-top: 20upx;" class="flex justify-between align-center">
							<view style="font-size: 26upx;color: #333333;">
								{{item.Phone}}
							</view>
							<view style="font-size: 24upx;color: #333333;">
								已消费：￥{{changeMoney(item.XiaoFeiScore)}}
							</view>
						</view>
						<view style="font-size: 22upx;color: #999999;margin-top: 15upx;">
							注册时间：{{timea(item.AddDate)}}
						</view>
					</view>
				</view>
			</view>
			<view v-if="inx == 3" style="background-color: #FFFFFF;width: 690upx;">
				<view v-for="(item,index) in shangJia" :key="index" style="padding: 40upx 0upx;margin: 0 30upx;border-bottom: 1upx solid #e4e4e4;" class="flex">
					<view style="width: 82upx;height: 82upx;">
						<image :src=" item.FaceURL || 'https://img.huaxuapp.com/6454608_.pic.jpg'" style="width: 82upx;height: 82upx;border-radius: 80upx;" mode=""></image>
					</view>
					<view style="margin-left: 20upx;width: 100%;">
						<view class="flex align-center">
							<view v-if="item.XiaoFeiScore > 0" style="border-radius: 50upx;text-align: center;width: 64upx;height: 34upx;background-color: #0ab04f;font-size: 20upx;color: #FFFFFF;line-height: 34upx;">
								有效
							</view>
							<view v-if="item.XiaoFeiScore == 0" style="border-radius: 50upx;text-align: center;width: 64upx;height: 34upx;background-color: #EEEEEE;font-size: 20upx;color: #999999;line-height: 34upx;">
								无效
							</view>
							<view style="font-size: 30upx;font-weight: 600;margin-left: 6upx;">
								{{item.Nick}}
							</view>
						</view>
						<view style="margin-top: 20upx;" class="flex justify-between align-center">
							<view style="font-size: 26upx;color: #333333;">
								{{item.Phone}}
							</view>
							<view style="font-size: 24upx;color: #333333;">
								已消费：￥{{changeMoney(item.XiaoFeiScore)}}
							</view>
						</view>
						<view style="font-size: 22upx;color: #999999;margin-top: 15upx;">
							注册时间：{{timea(item.AddDate)}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
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
				selectCardNum: 3,
				inx:1,
				zong:0,
				Directs:0,
				tuijian:0,
				zyYou:[],
				zyYous:0,
				ShopCount:0,
				ShopYHCount:0,
				tuiJian:[],
				shangJia:[],
				tjYou:[],
				tjYous:0,
				pages:1
			}
		},
		onLoad() {
			this.$api.showLoading_()
			//获取团队
			this.$http.wdTeam(this.$store.state.userInfo.ID,1,10).then(res => {
				console.log(res);
				
				res.Data.forEach((resa,i) => {
					if(resa.XiaoFeiScore > 0){
						this.zyYou.push(i)
					}
				})
				
				res.Data2.forEach((resa,i) => {
					if(resa.XiaoFeiScore > 0){
						this.tjYou.push(i)
					}
				})
				this.ShowData = res.Data
				this.zyYous = this.zyYou.length
				this.tjYous = this.tjYou.length
				this.tuiJian = res.Data2
				this.shangJia = res.Shoplist
				
				this.zong = res.Totalcount
				this.Directs = res.Directmenbercount
				this.tuijian = res.Recmenbercount
				this.ShopCount = res.ShopCount
				this.ShopYHCount = res.ShopYHCount
				
				this.$api.hidLoading_()
			})
			
		},
		methods: {
			tishi() {
				this.$api.msg('有效指的是在花蓄平台有过消费的粉丝用户',3000)
			},
			timeS(e) {
				var lat = e.split('.')
				return lat[0] + '年' + lat[1] + '月'+ lat[2] +'日'
			},
			timea(e) {
				var lat = e.split('-')
				return lat[0] + '年' + lat[1] + '月'+ lat[2] +'日'
			},
			qieHuan(e) {
				this.inx = e
				this.pages = 1
				this.$http.wdTeam(this.$store.state.userInfo.ID,1,10).then(res => {
					this.ShowData = res.Data
					this.tuiJian = res.Data2
					this.shangJia = res.Shoplist
				})
			},
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
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			tiao() {
				uni.navigateTo({
					url:'/pages/person/share'
				})
			}
		},
		onReachBottom(){
			this.pages += 1
			this.$http.wdTeam(this.$store.state.userInfo.ID,this.pages,10).then(res => {
				if (res.Data.length > 0) {
					this.ShowData = this.ShowData.concat(res.Data);
				} else {
					this.$api.msg('到底了~')
				}
				if (res.Data2.length > 0) {
					this.tuiJian = this.tuiJian.concat(res.Data2);
				} else {
					this.$api.msg('到底了~')
				}
				if (res.Data2.length > 0) {
					this.shangJia = this.shangJia.concat(res.Shoplist);
				} else {
					this.$api.msg('到底了~')
				}
				uni.hideLoading()
			})
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}

.balance-page {
		padding: 0 30upx;
		color: #7a4404;;
	}
	
	.Top {
		margin: 30upx 0;
		width: 690upx;
		height: 328upx;
	}
	
	.redHb {
		width: 100%;
		height: 306upx;
		border-radius: 20upx 20upx 0 0;
		background-image: url(https://img.huaxuapp.com/myfans_03.png);
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		justify-content:space-between;
		padding: 0 45upx;
		text-align: center;
	}
	
	.redHb_1 {
		margin-top: 25upx;
	}
	
	.redHb_2 {
		line-height: 56upx;
		background-color: #f76649;
		border-radius: 50upx;
		height: 56upx;
		padding: 0upx 14upx;
		margin-top: 40upx;
	}
	
	.yuEe {
		text-align: center;
		width: 100%;
		height: 124upx;
		border-radius: 0 0 20upx 20upx;
		display: flex;
		justify-content:space-around;
		padding: 20upx 0;
		font-size: 24upx;
	}
	
	.yuEe_1 {
		color: #7a4404;;
		
	}
	
	.yuEe_2 {
		color: #7a4404;;
	}
	
	.bian {
		background-color: #FFFFFF;
		border-radius: 20upx 20upx 0 0;
	}
	
	.bian_2 {
		background-color: #FFFFFF;
		border-radius: 20upx 20upx 0 0;
	}
	
	.bian_3 {
		background-color: #FFFFFF;
		border-radius: 20upx 20upx 0 0;
	}
	
	.bians {
		background-color: #e4e4e4;
		border-radius: 20upx 0upx 0 0;
	}
	
	.bians_2 {
		background-color: #e4e4e4;
		border-radius: 20upx 20upx 0 0;
	}
	
	.bians_3 {
		background-color: #e4e4e4;
		border-radius: 20upx 20upx 0 0;
	}
</style>
