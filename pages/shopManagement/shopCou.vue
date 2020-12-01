<template>
	<view>
		<cu-custom bgColor="bg-whitesss"  backColor="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">自发券管理</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">自发券管理</block>
			<!-- #endif -->
		</cu-custom>
		
			<tui-tabs :isFixed="true" :tabs="tabs" :top="CustomBar" selectedColor="#333333" sliderBgColor="#333333" :currentTab="currentTab>2?0:currentTab" @change="change" itemWidth="33.3333%"></tui-tabs>
		
			<view style="text-align: center;height: 400upx;margin-top:300upx;" v-if="storeCouponList.length <= 0">
				<image src="https://img.huaxuapp.com/5cad402bbc803_03.png" mode="aspectFill" style="width: 200upx;height: 200upx;"></image>
				<view style="margin-top: 20upx;">
					<text style="font-size: 28upx;color: #333333;">暂时没有相关优惠券</text>
				</view>
			</view>
		
			<!-- <view v-if="storeCouponList.length > 0" style="padding-top: 85upx;">
				<view class="padding padding-top-xs" v-for=" (item,index) of storeCouponList" :key="index">
					<view class="flex" style="height: 190upx;background: #FFFFFF;border-radius: 8upx; position: relative;">
						
						
						
						<view class="padding flex align-center justify-center flex-direction" :class="item.IsGq || !item.IsStart ? 'gqBg':'bg'">
							<view style="font-size: 68upx;" class="text-white"><text style="font-size:30upx">&yen; </text><text style="margin-left: 5upx;">{{item.youhuiquan.Num2}}</text></view>
							<view style="font-size: 28upx;" class="text-white margin-top-xs">自发券</view>
						</view>
						
						<view class="padding-sm  flex align-start justify-between flex-direction" style="position: relative;   width: 70%;padding-bottom: 15upx; ">
							<view class="text-bold" style="font-size: 30upx;">{{item.StoreName}}</view>
							<view style="font-size: 24upx;color: #999999;">满{{item.youhuiquan.Num1}}元可用</view>
							<view style="border-bottom: 0.5upx dashed #F2F2F2; width: 100%;margin-top: 15upx;"></view>
							<view style="font-size: 24upx;color: #999999;">{{changeTime(item.youhuiquan.BDate)}} ~ {{changeTime(item.youhuiquan.EDate)}}</view>
						</view>
						<view class="flex align-start justify-center" v-if="item.IsGq"   style="position: absolute;right: -2upx; bottom: -2upx; width: 94upx;height: 94upx; background: url('https://img.91goodluck.com/shixiaob_03.png') no-repeat; border-bottom-right-radius: 10upx; background-size: cover;">
						</view>
					</view>
				</view>
		
			</view> -->
			
			<view v-if="storeCouponList.length > 0" style="padding-top: 85upx;margin-top: 20upx;">
				<view v-for=" (item,index) of storeCouponList" :key="index" >
					<view class="padding  margin" style="background-color: #ffffff;
					margin-bottom: 0;border-radius: 15upx 15upx 0 0;position: relative;padding-top: 40upx;padding-bottom: 50upx;">
						<view>
							<image src="https://img.huaxuapp.com/WechatIMG75_03.png" mode="aspectFit" style="width: 34upx;height: 34upx;"></image>
							<text style="font-size: 28upx;margin-left: 14upx;">提升客单价</text>
						</view>
						<view style="margin: 30upx 0;" v-if="getData.type == 1">
							<text style="font-size: 42upx;color: #fe5479;font-weight: 600;"v-if="item.youhuiquan.Num1 > 0">满{{item.youhuiquan.Num1}}减{{item.youhuiquan.Num2}}</text>
							<text style="font-size: 42upx;color: #fe5479;font-weight: 600;" v-if="item.youhuiquan.Num1 == 0">消费立减{{item.youhuiquan.Num2}}元</text>
							<view style="margin-top: 6upx;">
								<text style="color: #999999;font-size: 26upx;">领券日期:{{changeTime(item.youhuiquan.BDate)}} ~ {{changeTime(item.youhuiquan.EDate)}}</text>
							</view>
						</view>
						<view style="margin: 30upx 0;" v-if="getData.type == 2">
							<text style="font-size: 42upx;color: #fe5479;font-weight: 600;"v-if="item.youhuiquan.Num1 > 0">满{{item.youhuiquan.Num1}}减{{item.youhuiquan.Num2}}</text>
							<text style="font-size: 42upx;color: #fe5479;font-weight: 600;" v-if="item.youhuiquan.Num1 == 0">消费立减{{item.youhuiquan.Num2}}元</text>
							<view style="margin-top: 6upx;">
								<text style="color: #999999;font-size: 26upx;">领券日期:{{changeTime(item.youhuiquan.BDate)}} ~ {{changeTime(item.youhuiquan.EDate)}}</text>
							</view>
						</view>
						<view style="margin: 30upx 0;" v-if="getData.type == 3">
							<text style="font-size: 42upx;color: #999999;font-weight: 600;"v-if="item.youhuiquan.Num1 > 0">满{{item.youhuiquan.Num1}}减{{item.youhuiquan.Num2}}</text>
							<text style="font-size: 42upx;color: #999999;font-weight: 600;" v-if="item.youhuiquan.Num1 == 0">消费立减{{item.youhuiquan.Num2}}元</text>
							<view style="margin-top: 6upx;">
								<text style="color: #999999;font-size: 26upx;">领券日期:{{changeTime(item.youhuiquan.BDate)}} ~ {{changeTime(item.youhuiquan.EDate)}}</text>
							</view>
						</view>
						<view style="color: #333333;font-size: 28upx;" v-if="getData.type == 1">
							<text>已领取: {{shYu[index]}}张</text>
							<text style="margin: 0 30upx;">还剩余: {{item.youhuiquan.Num}}张</text>
							<text>已使用: {{item.Sycount}}张</text>
						</view>
						<view style="color: #333333;font-size: 28upx;" v-if="getData.type == 2">
							<text>已领取: {{shYu[index]}}张</text>
							<text style="margin: 0 30upx;">还剩余: {{item.youhuiquan.Num}}张</text>
							<text>已使用: {{item.Sycount}}张</text>
						</view>
						<view style="color: #999999;font-size: 28upx;" v-if="getData.type == 3">
							<text>已领取: {{shYu[index]}}张</text>
							<text style="margin: 0 30upx;">还剩余: {{item.youhuiquan.Num}}张</text>
							<text>已使用: {{item.Sycount}}张</text>
						</view>
						<view style="position: absolute;top: 0;right: 0; width: 106upx;height: 48upx;line-height: 48upx;background-color: #ffe6e8;color: #fe5479;
						border-radius:0 15upx 0 15upx;text-align: center;font-size: 26upx;" v-if="getData.type == 1">
							进行中
						</view>
						<view style="position: absolute;top: 0;right: 0; width: 106upx;height: 48upx;line-height: 48upx;background-color: #ffe6e8;color: #fe5479;
						border-radius:0 15upx 0 15upx;text-align: center;font-size: 26upx;" v-if="getData.type == 2">
							未开始
						</view>
						<view style="position: absolute;top: 0;right: 0; width: 106upx;height: 48upx;line-height: 48upx;background-color: #e8e8e8;color: #929292;
						border-radius:0 15upx 0 15upx;text-align: center;font-size: 26upx;" v-if="getData.type == 3">
							已结束
						</view>
					</view>
					<view class="padding margin flex " style="background-color: #f8f8f8;margin-top: 0;flex-direction: row-reverse;border-radius: 0 0 15upx 15upx;" v-if="getData.type !== 3">
						<view class="btn" @tap="stopCou(item)" v-if="getData.type == 1">
							<text>
								停止发券
							</text>
						</view>
						<view class="btn" @tap="stopCous(item)" v-if="getData.type == 2">
							<text>
								停止发券
							</text>
						</view>
						<view class="btn" style="margin-right: 50upx;" v-if="getData.type == 1" @tap="share(item)">
							<text>
								马上分享
							</text>
						</view>
					</view>
				</view>
			</view>
			
			<tui-fab @click="onClick" ></tui-fab>
	</view>  
		
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import tuiFab from "@/components/tui-fab/tui-fab"
	export default {
		components: {
			tuiTabs,
			tuiFab
		},
		data(){
			return {
				CustomBar:this.CustomBar,
				couponList:[],
				storeCouponList:[],
				getData:{
					StoreID:'',
					type:1,
					page:1,
					pagesize:500
				},
				currentTab: 0,
				tabs: [{
					name: "进行中"
				}, {
					name: "未开始"
				}, {
					name: "已结束"
				}],
				shYu: [],
				StoreName:'',
				StorePic:''
			}
		},
		onLoad(route){
			this.getData.StoreID=route.StoreID
			
		},
		onShow(){
			this.currentTab = 0;
			console.log(this.$store.state.couponsListUrl);
			this.getData.type = 1
			this.getCurryInfo()
		},
		onShareAppMessage() {
			return {
				title:`${this.StoreName}发券了！快来抢，消费立减！`,
				path:`/pages/shopDetail/shopDetailPage?StoreID=${this.getData.StoreID}`,
				imageUrl:this.StorePic
			}
		},
		methods:{
			stopCou(e){
				uni.showModal({
					title: '提示',
					content: '停止发券后，顾客将无法再领取该优惠券哦！顾客已领的券还能继续使用。',
					showCancel:true,
					confirmText: '确认停止',
					success: (res) => {
						if (res.confirm) {
							let data = {
								StoreID:'',
								yhqid:'',
							}
							data.StoreID = this.getData.StoreID
							data.yhqid = e.youhuiquan.YHQID
							this.$Request.get(this.$store.state.shopstopCou,data).then(res=>{
								if(res.IsSuccess){
									this.$api.msg('停止发券成功！')
									this.getData.type = 1
									this.getCurryInfo() 
								} else {
									this.$api.msg('操作异常,请重试！')
								}	
							})
						} else if (res.cancel) {
							this.$api.msg('取消！')
							console.log('用户点击取消');
						}
					}
				})
			},
			stopCous(e){
				uni.showModal({
					title: '提示',
					content: '您的发券暂未生效，确认停止吗？',
					success: (res) => {
						if (res.confirm) {
							let data = {
								StoreID:'',
								yhqid:'',
							}
							data.StoreID = this.getData.StoreID
							data.yhqid = e.youhuiquan.YHQID
							this.$Request.get(this.$store.state.shopstopCou,data).then(res=>{
								if(res.IsSuccess){
									this.$api.msg('停止发券成功！')
									this.getData.type = 2
									this.getCurryInfo()
								} else {
									this.$api.msg('操作异常,请重试！')
								}	
							})
						} else if (res.cancel) {
							this.$api.msg('取消！')
							console.log('用户点击取消');
						}
					}
				})
			},
			share(e) {
				this.StorePic = e.StorePic
				this.StoreName = e.StoreName
				this.$api.msg('点击右上角···，分享店铺活动详情页',2000)
			},
			changeTime(date){
				return this.beTime_(date)
			},
			onClick() {
				uni.navigateTo({
					url:`/pages/shopManagement/addshopCou?StoreID=${this.getData.StoreID}`
				})
			},
			change(e) {
				this.currentTab = e.index
				this.storeCouponList = []
				if(this.currentTab == 0){
					this.getData.type = 1
					this.getCurryInfo()
				}else if(this.currentTab == 1){
					this.getData.type = 2
					this.getCurryInfo()
				}else if(this.currentTab == 2){
					this.getData.type = 3
					this.getCurryInfo()
				}
			},
			async getCurryInfo(){
				return await this.$Request.get(this.$store.state.shopCou,this.getData).then(res=>{
					console.log(res);
					if(res.IsSuccess){
						 this.storeCouponList = res.Data
						
						res.Data.forEach((item,i) => {
							this.shYu[i] = item.youhuiquan.Num3 - item.youhuiquan.Num
						})
						
					}else{
						this.storeCouponList = []
					}
				})
			},
		},
		async onPullDownRefresh() { //下拉时刷新
		 	this.getData.type = 1
		 	this.getCurryInfo()
			if(this.currentTab == 0){
				this.getData.type = 1
				this.getCurryInfo()
			}else if(this.currentTab == 1){
				this.getData.type = 2
				this.getCurryInfo()
			}else if(this.currentTab == 2){
				this.getData.type = 3
				this.getCurryInfo()
			}
			uni.stopPullDownRefresh();
		},
		onReachBottom() { //上拉加载
			this.$api.msg('没有更多了',1000)
		}
	}
</script>

<style>
	page{
		background: #f2f2f2;
	}
	
	.btn{
		width: 158upx;
		height: 54upx;
		line-height: 54upx;
		border-radius: 28upx;
		border: 1upx solid #cccccc;
		text-align: center;
		background-color: #ffffff;
		font-size: 26upx;
	}
	
	.gqBg{
		background: url('https://img.91goodluck.com/youhuiquangrey.png') no-repeat;
		background-size: 100% 100%;
		height: 190upx; 
		width: 30%; 
	}
	
	.bg{
		background: url('https://img.91goodluck.com/yhqgl_03.png') no-repeat;
		background-size: 100% 100%;
		height: 190upx; 
		width: 30%; 
	}
	
</style>
