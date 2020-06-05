<!-- 
* @file message.vue
* @descripteon 通知页面
* @author 张阳
* @date 2019-6-4
* @version: V1.0.0
* @email:1103992447@qq.com
-->
<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">消息列表</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">消息列表</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->


		<view class="balance-nav" style=" height: 100upx; width: 100%; position: absolute; z-index: 0;"></view>

		<view class="padding" style="z-index: 3;position: absolute;width: 100%;">
			<view style="height:190upx; width:100%; padding-left: 130upx;padding-right: 130upx;border-radius: 2%;" class="bg-white flex justify-between align-center ">
				<view style="margin-right: 80upx;" class="bg-white flex justify-center align-center flex-direction" @tap="toMsg(1)">
					<view class="hxIcon-tixing" :style="cur == 1 ? 'color: rgba(236,64,76,1);': 'color: rgba(236,64,76,0.3);'" style="font-size: 75upx; color: rgba(236,64,76,0.5);"></view>
					<text class="text-df" :style="cur == 1 ? 'font-weight: 700;': ''" style="margin-top: 15upx;">交易信息</text>
				</view>

				<view style="margin-left: 80upx;" class="bg-white flex justify-center align-center flex-direction" @tap="toMsg(2)">
					<view class="hxIcon-gonggao" :style="cur == 2 ? 'color:rgba(252,181,35,1);': 'color:rgba(252,181,35,0.3);'" style="font-size: 75upx; color:rgba(252,181,35,0.5);"></view>
					<text class="text-df" :style="cur == 2 ? 'font-weight: 700;': ''" style="margin-top: 15upx;">系统公告</text>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height:220upx;"></view>
		
		<view v-show="showbg">
			<view style="height: 190upx;"></view>
			<view class="flex align-center justify-center  flex-direction " v-if="showbg">
				<image src="https://img.huaxuapp.com/%E6%B6%88%E6%81%AF%E7%9B%92%E5%AD%90%E7%A9%BA%E7%A9%BA%E5%93%921_03.png" style="width:200upx ; height:230upx ;  "></image>
				<view class="margin-top-sm">暂无消息</view>
				<view class="margin-top-sm text-gray">"我有一肚子话还没对你说"</view>
			</view>
		</view>
		<msg-card :MsgList="MsgList"></msg-card>
	</view>
</template>

<script>
	import msgCard from '../../components/msgCard.vue'
	export default {
		components: {
			msgCard
		},
		data() {
			return {
				showbg: false,
				cur: 1,
				userID: '', //用户id
				MsgList:null
				// MsgList: [{
				// 		Title: '111111',
				// 		AddDate: '1111111111',
				// 		Content: 'texttexttexttexttexttexttexttexttext'
				// 	},
				// 	{
				// 		Title: '111111',
				// 		AddDate: '1111111111',
				// 		Content: 'texttexttexttexttexttexttexttexttext'
				// 	},
				// 	{
				// 		Title: '111111',
				// 		AddDate: '1111111111',
				// 		Content: 'texttexttexttexttexttexttexttexttext'
				// 	}
				// ] //获取到消息列表
			}
		},
		onLoad() {
			this.userID = this.$store.state.userInfo.ID
			this.getMsg(0);
		},
		onPullDownRefresh() {
			this.userID = this.$store.state.userInfo.ID
			this.getMsg(0);
			uni.stopPullDownRefresh();
		},
		methods: {
			getLocalTime(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let Hours = date.getHours();
				let m = date.getMinutes();
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				date = month + '月' + day + "日 " + Hours + ":" + m;
				return date;
			},
			getMsg(msgsortid) {
				if (this.$store.state.hasLogin) {
					this.userID = this.$store.state.userInfo.ID
					//说明登录了
					uni.request({
						url: "https://newsapp.huaxuapp.com/api/message/msglist",
						//获取消息列表
						data: {
							userid: this.userID,
							msgsortid: msgsortid,
							page: 1,
							pagesize: 10
						},
						method: "GET",
						success: (res) => {
							this.MsgList = res.data;
							console.log(this.MsgList);
							if (this.MsgList == null || this.MsgList.length == 0) {
								this.showbg = true;
							} else {
								this.showbg = false;
								this.MsgList.forEach(item => {
									item.AddDate = this.getLocalTime(item.AddDate);
								});
							}
						}
					});
				}
			},
			toMsg(index) {
				if (index === 1) {
					this.cur = 1;
					this.getMsg(0);
				} else {
					this.cur = 2;
					this.getMsg(1);
				}
			}
		}
	}
</script>

<style>
	page {
		background: #f8f8f8;
	}

	.b {
		border: 1px solid #1CBBB4;
	}

	.hidden {
		display: hidden;
	}
</style>
