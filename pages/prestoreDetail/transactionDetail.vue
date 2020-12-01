<template>
	<view style="background:white;">
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 2upx solid #e4e4e4;">
			<block slot="content">交易记录</block>
		</cu-custom>
		
		<view class="" style="background-color: #f6f6f6;height: 120upx;padding: 20upx;">
			<view class="flex align-center">
				<view @tap="changeDayss">
					<picker mode="date" fields="month" start="1990-01-01" end="2040-01-01" @change="changeDayss"  style="background-color: #f6f6f6;color: #222222;font-size: 32upx;">
						<text >
							{{yue}}
						</text>
						<text class="cuIcon-triangledownfill" style="font-size: 36upx;margin-left: 6upx;" @tap="changeDayss"></text>
					</picker>
				</view>
			</view>
			<view class="flex justify-between align-center">
				<view style="color: #999999;" class="flex align-center ">
					<text style="font-size: 26upx;">支出￥{{CashOut}}</text>
					<text style="margin-left: 10upx;font-size: 26upx;">收入￥{{CashIn}}</text>
				</view>
				<view @click="show = true" style="font-size: 26upx;color: #999999;" class="flex align-center ">
					<u-calendar v-model="show" :mode="mode" @change="changes" z-index="1000"></u-calendar>
					<view><text style="margin-right: 30upx;color: #e5e5e5;">|</text></view>
					<view><text style="">筛选</text></view>
					<view><text class="cuIcon-right" style="margin-left: 10upx;"></text></view>
				</view>
			</view>
		</view>
		
		<view v-if="infoList.length  > 0" @tap="gotoDetails(item)" class="flex padding justify-between align-center" v-for="(item,i) of infoList" :key="i" style="border-bottom: 0.1px solid #e4e4e4;"> 
			<view class="flex align-center">						
				
				<image v-if="item.Sort == 1 || item.Sort == 2 || item.Sort == 4 || item.Sort == 5" :src="item.FaceUrl || 'https://img.huaxuapp.com/6454608_.pic.jpg'" mode=""style="border-radius: 76upx;width: 76upx;height: 76upx;"></image>
				<image v-if="item.Sort == 3" src="https://img.huaxuapp.com/tuikuanzhong_03.png" mode=""style="border-radius: 76upx;width: 76upx;height: 76upx;"></image>
				<image v-if="item.Sort == 6" src="https://img.huaxuapp.com/fggf.png" mode=""style="border-radius: 76upx;width: 76upx;height: 76upx;"></image>
				<view class="margin-left-sm">
					<view style="font-size: 30upx;width: 500upx;" class="shengLv">
						{{item.Info}}
					</view>
					<view class="text-sm margin-top-xs" style="color: #999999;font-size: 24upx;">
						{{beTime(item.AddDate)}}
					</view>
				</view>
			</view>
			
			<view class="text-bold text-black flex align-center" style="font-size: 34upx;">
				<view v-if="!item.IsZC" style="color: #f34e2d;">+</view>
				<view v-if="item.IsZC">-</view>
				<view v-if="!item.IsZC" style="color: #f34e2d;">{{item.Score}}</view>
				<view v-if="item.IsZC">{{item.Score}}</view>
			</view>
		</view>
		
		<view style="text-align: center;height: 400upx;padding-top: 180upx;background-color: #f2f2f2;" v-if="infoList.length == 0">
			<image src="https://img.huaxuapp.com/wukong.png" mode="aspectFill" style="width: 376upx;height: 250upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">您还没有交易记录哦~</text>
			</view>
		</view>	
	</view>
</template>

<script>
	export default{
		data(){
			return {
				pikerData:{
					mode:'date',
					fields:'month',
					value:'2019-08',
					start:'2015-01',
					end:'2100-01'
				},
				getData:{
					day:'',
					storeid:'',
					page:1,
					pagesize:15
				},
				infoList:[],
				yue:'',
				show: false,
				mode: 'date',
				ckday:'',
				pages:1,
				CashIn:0,
				CashOut:0
			}
		},
		onLoad(e){
			this.yue = this.getTimes()
			this.ckday = []
			this.getData.storeid = e.storeid*1
			this.getTime()
			this.$http.personTransaction(this.$store.state.userInfo.ID,this.yue,this.ckday,1,15).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.infoList = res.Data
					this.CashIn = res.CashIn
					this.CashOut = res.CashOut
				} else {
					this.infoList = []
				}
			})
			
		},
		onShow() {
			
		},
		methods:{
			gotoDetails(e) {
				console.log(e);
				uni.navigateTo({
					url:'/pages/prestoreDetail/transactionDetailXq?Ids=' + e.ID + '&sorts=' + e.Sort
				})
			},
			changes(e) {
				console.log(e);
				this.ckday =  e.result
				this.yue = e.result
				this.pages = 1
				this.$http.personTransaction(this.$store.state.userInfo.ID,this.yue,this.ckday,1,15).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.infoList = res.Data
						this.CashIn = res.CashIn
						this.CashOut = res.CashOut
					} else {
						this.infoList = []
					}
				})
			},
			getTimes() {
				let day = (new Date()).Format("yyyy-MM")
				return day
			},
			changeDayss(e) {
				console.log(e)
				let dt = e.detail.value
				dt = dt.split('-')
				dt = `${dt[0]}-${dt[1]}`
				this.yue = dt
				this.ckday = []
				this.pages = 1
				this.$http.personTransaction(this.$store.state.userInfo.ID,this.yue,this.ckday,1,15).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.infoList = res.Data
						this.CashIn = res.CashIn
						this.CashOut = res.CashOut
					} else {
						this.infoList = []
					}
				})
			},
			async changeTime(e){
				this.pikerData.value = e.detail.value
				this.getData.day = e.detail.value
				this.getData.page=1
				this.getData.pagesize=10
				
			},
			getTime(){
				let day = (new Date()).Format("yyyy-M")
				this.getData.day = day	
				this.pikerData.value = day
			},
		 	
		},
		onPullDownRefresh(){//下拉时刷新
			this.pages = 1
			this.$http.personTransaction(this.$store.state.userInfo.ID,this.yue,this.ckday,1,15).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.infoList = res.Data
					this.CashIn = res.CashIn
					this.CashOut = res.CashOut
				} else {
					this.infoList = []
				}
			})
		},
		onReachBottom(){
			uni.showLoading({
				title: '加载中',
				mask: false
			});
		
			this.pages += 1
			
			this.$http.personTransaction(this.$store.state.userInfo.ID,this.yue,this.ckday,this.pages,15).then(res => {
				console.log(res);
				if (res.Data.length > 0) {
					this.infoList = this.infoList.concat(res.Data);
				} else {
					this.$api.msg('到底了~')
				}
				uni.hideLoading()
			})
		}
	}
</script>

<style>
	page{
		background: #F2F2F2;
	}
</style>
<style scoped>
	.shengLv{
		text-align: left;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow:hidden;
	}
</style>
