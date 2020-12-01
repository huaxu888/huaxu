<template>
	<view >
		<view style="border-bottom: 0.5px solid rgba(180,180,180,0.5);">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-whitesss" backColor="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">已发短信</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">已发短信</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		
		<view v-if="injObj.length > 0" style="background-color: #ffffff;">
			<view class="padding" style="border-bottom: 1upx solid #e4e4e4;" v-for="(item,i) in injObj" :key=i >
				<view class="flex justify-between">
					<view style="font-size: 32upx;font-weight: 600;">消费会员</view>
					<view style="color: #999999;"><text style="color: #fe5479;margin-right: 10upx;">{{item.TotalNum}}</text>位收件人</view>
				</view>
				
				<view style="margin-top: 35upx;color: #999999;font-size: 28upx;">
					{{item.SmsContent}}
				</view>
				
				<view class="flex justify-between" style="margin-top: 35upx;color: #999999;font-size: 24upx;">
					<view>{{getLocalTimes(item.AddDate)}}</view>
					<view v-if="item.IsCheck">已发送成功</view>
					<view v-if="!item.IsCheck" style="color: #fe5479;">正在审核中</view>
				</view>
			</view>
			
		</view>
		
		<view style="text-align: center;margin-top: 200upx;background-color: #f1f1f1;"  v-if="injObj.length == 0">
			<view>
				<text style="font-size: 80upx;color: #666666;" class="hxIcon-login_duanxin"></text>
			</view>
			<view style="margin-top: 20upx;">
				<text style="font-size: 26upx;color: #999999;">暂无短信记录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(route) {
			this.StoreID = route.StoreID
			this.page = 1
			this.$http.yfDlist(this.StoreID,this.page,10).then(res => {
				console.log(res);
				this.injObj = res.Data
			})
		},
		onShow() {

		},
		data() {
			return {
				StoreID: 0,
				injObj:[],
				page:1
			}
		},
		methods: {
			getLocalTimes: function(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours()
				let minutes = date.getMinutes()
				let seconds = date.getSeconds()
				month = month < 10 ? "0" + month : month;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				day = day < 10 ? "0" + day : day;
				seconds = seconds < 10 ? '0' + seconds : seconds
				date = `${year}/${month}/${day} ${hour}:${minutes}`;
				return date;
			},
			
		},
		onReachBottom() {
			this.page += 1;
			
			this.$http.yfDlist(this.StoreID,this.page,10).then(res => {
				console.log(res.Data);
				if (res.Data.length > 0) {
					this.injObj = this.injObj.concat(res.Data);
					console.log(this.injObj);
				} else {
					this.$api.msg('已经到最底啦~')
				}
				uni.hideLoading()
			});
		}
	}
</script>

<style scoped>
	page{
		background-color: #ffffff;
	}
	
</style>
