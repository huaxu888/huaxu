<template>
	<view class="bg-white" >
		<cu-custom bgColor="bg-whitesss" :isBack="false">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>在售套餐</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>在售套餐</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view style="margin: 30upx;margin-bottom: 30upx;border-top: 1.5upx solid #e4e4e4;margin-top: 0;padding-top: 40upx;" class="flex align-center">
			<view style="font-weight: 600;color: #333333;font-size: 30upx;">套餐列表</view>
			<view style="color: #999999;margin-left: 8upx;margin-right: 8upx;"> | </view> 
			<view style="color: #999999;font-size: 26upx;">共{{SetMealCounts}}个</view>
		</view>
		
		<view class="reservation-list-item" v-for="(item,index) in tcList" :key="index">
			<view class="reservation-cotent">
				<view class="flex" style="margin: 0 30upx;padding-top: 20upx;padding-bottom: 32upx;border-bottom: 1upx solid #e4e4e4;">
					<view style="width: 188upx;height: 188upx;">
						<image :src="item.SetMealList.Logo" mode="scaleToFill" style="width: 188upx;height: 188upx;border-radius: 10upx;"></image>
					</view>
					<view style="margin-left: 25upx;">
						<view style="font-size: 28upx;color: #333333;height: 76upx;" class="shengLv">
							<text>{{item.SetMealList.Title}}</text>
						</view>
						
						<view class="flex justify-between align-center" style="font-size: 24upx;color: #777777;margin-top: 10upx;">
							<view>已售：{{item.SetMealList.GetNum}}</view>
							<view>核销：{{item.Num}}</view>
							<view>库存：{{kucun[index]}}</view>
						</view>
						
						<view class="flex justify-between align-center" style="margin-top: 20upx;">
							<view style="color: #fe4e01;">
								<text style="color: #333333;">结算单价：</text>
								<text style="font-size: 30upx;color: #fe5479;">￥</text>
								<text style="font-size: 30upx;font-weight: 600;color: #fe5479;">{{changeMoney(item.SetMealList.BackMoney)}}</text>
							</view>
							<view @tap="heXiao(item)" class="flex align-center justify-center"  style="width: 146upx;height:60upx;border-radius:60upx;font-size: 24upx;color: #fe5479;border: 1upx solid #fe5479;line-height: 60upx;text-align: center;">
								核销记录
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="text-align: center;height: 400upx;margin-top: 180upx;" v-if="tcList.length == 0">
			<image src="https://img.huaxuapp.com/wukong.png" mode="aspectFill" style="width: 376upx;height: 250upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">您还没有在售套餐哦~</text>
			</view>
		</view>
		<!-- <view class="dinW flex justify-between">
			<view class="flex justify-center align-center" style="margin-left: 60upx;width: 262upx;height: 80upx;border: 1.5upx solid #000000;border-radius: 10upx;font-size: 30upx;color: #000000;">
				商品分类
			</view>
			<view class="flex justify-center align-center" style="margin-right: 60upx;background-color: #fe5479;width: 262upx;height: 80upx;border: 1.5upx solid #fe5479;border-radius: 10upx;font-size: 30upx;color: #ffffff;">
				添加商品
			</view>
		</view> -->
		
		<view >
			<phone-buttom :StoreID="StoreID" :IsLock="IsLock" :isShopowner="isShopowner" :Inx="Inx" style="z-index: 99;">
			</phone-buttom>
		</view>
		
	</view>
</template>

<script>
import phoneButtom from '../components/poWers'
export default {
	data() {
		return {
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			StoreID: 0,
			IsLock:false,
			isShopowner:{},
			Inx:3,
			tcList:[],
			SetMealCounts:0,
			kucun:[]
		};
	},
	onLoad(option) {
		this.StoreID = option.StoreID;
		this.IsLock = option.IsLock
		this.isShopowner = option.isShopowner;
		
		this.$http.onSale(option.StoreID,1,10).then(res => {
			console.log(res);
			this.tcList = res.Data
			this.SetMealCounts = res.SetMealCounts
			res.Data.forEach((r,i) => {
				console.log(r,i);
				this.kucun[i] = r.SetMealList.TotalNum - r.SetMealList.GetNum
			})
		})
	},
	onShow() {
		
	},
	methods: {
		heXiao(e) {
			console.log(e);
			uni.navigateTo({
				url:'/pages/shopManagement/orderShop/hxRecord?Ids=' + e.SetMealList.ID
			})
		},
		changeMoney(money) {
			if (money < 0.01) {
				return money;
			} else {
				return this.$api.formatAmount(money);
			}
		},
		backs() {
			uni.navigateBack({
				delta:1
			})
		},
		saoMa() {
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
			    }
			});
		},
		upper: function(e) {
			console.log(e)
		},
		lower: function(e) {
			console.log(e)
		},
		scroll: function(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		},
		goTop: function(e) {
			this.scrollTop = this.old.scrollTop
			this.$nextTick(function() {
				this.scrollTop = 0
			});
			uni.showToast({
				icon:"none",
				title:"纵向滚动 scrollTop 值已被修改为 0"
			})
		},
	},
	onPullDownRefresh() {
		
	},
	components: {
		phoneButtom,
	}
};
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	.buGardlist {
		justify-content: space-between;
		padding: 30upx;
	}
	
	.buGard {
		width: 220upx;
		height: 124upx;
		background-color: #f8f8f8;
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.dinW {
		position: fixed;
		bottom: 100upx;
		width: 750upx;
	}
	
	.shengLv {
		color: #333333;
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
</style>