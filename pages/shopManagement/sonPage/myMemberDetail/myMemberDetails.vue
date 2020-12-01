<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-whitesss" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">消费详情</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">消费详情</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		<view>
			<view style="padding: 15upx 30upx;border-radius: 20upx;margin: 30upx;background-color: #ffffff;">
				<view class="cu-list menu-avatar margin-top flex justify-between " style="padding: 0 30upx;">
					<view class="">
						<view>
							<view class="" style="font-weight: 600;font-size: 34upx;">{{Nick}}</view>
							<view class="text-gray">
								<view class="text-cut" style="font-size: 26upx;margin-top: 10upx;">
									{{Phone}}
								</view> 
							</view>
						</view>
					</view>
					<view class="cu-avatar lg" style="border-radius: 5upx;width: 100upx;height: 100upx;" :style="{'background-image':`url(${FaceURL})`}"></view>
				</view>
				<view style="position: absolute;background-color: #e4e4e4;width: 2upx;height: 80upx;left: 265upx;margin-top: 60upx;"></view>
				<view style="position: absolute;background-color: #e4e4e4;width: 2upx;height: 80upx;right: 265upx;margin-top: 60upx;"></view>
				<view class=" flex justify-between margin-top-sm">
					<view class="flex flex-direction align-center  justify-between red_box_item padding-tb" v-for="(item,i) of showShuJuList" :key="i">
						<view class=" margin-top-xs text_shu ">
							<text style="font-size: 36upx;">{{item.val}}</text>
						</view>
						
						<view class=" align-center justify-center" style="margin-top: 8upx;">
							<text class="text-sm text_center" style="font-size: 26upx;">{{item.label}}</text>
						</view>
					</view>		
				</view>
			</view>
			
			<view style="background: #F0F0F0;font-weight: 800;font-size: 32upx;margin: 50upx 30upx;">
				消费明细
			</view>
			
			<view class=" margin " style="background-color: #ffffff;border-radius: 20upx;padding:15upx 45upx">
				<view class="flex justify-between" style="padding: 30upx 0;border-bottom: 1upx solid #e4e4e4;" v-for="(item,i) of infoList" :key="i">
					<view>
						<view style="font-size: 28upx;color: #000000;">{{item.Info}}</view>
						<view style="font-size: 26upx;color: #999999;margin-top: 14upx;">{{getLocalTimes(item.AddDate)}}</view>
					</view>
					<view style="font-weight: 600;font-size: 32upx;margin-top: 20upx;">+{{item.XFJE}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var canvaPie = {};
	export default {
		
		data() {
			return {
				infoList:[],
				StoreID:0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				piearr: [],
				showShuJuList:[
					{
						label:'消费总次数',
						val:0,
						id:'TotalCount'
					},{
						label:'消费总金额',
						val:0,
						id:'TotalPrice'
					},{
						label:'平均消费金额',
						val:0,
						id:'AveragePrice'
					}
				],
				Nick:'',
				Phone:110,
				FaceURL:'',
				getData:{
					StoreID:0,
					userid:0,
					page:1,
					pagesize:10
				}
			}
		},
		async onLoad(route) {
			console.log(route)
			this.Nick = route.Nick
			this.Phone = route.Phone
			this.FaceURL = route.FaceURL
			
			this.getData.userid = route.ID * 1
			this.getData.StoreID = route.StoreID*1
			
			this.$http.hyXq(this.getData.StoreID,this.getData.userid,1,20).then(res =>{
				console.log(res);
				if(res.IsSuccess){
					for(let key of Object.keys(res)){
						for(let val of this.showShuJuList){
							let key_ = val.id
							if(key===key_){
								val.val = this.$api.formatAmount(res[key])
							}
						}
					}
					if(this.getData.page===1){
						this.infoList = res.Data
					}else{
						this.infoList = [...this.infoList,...res.Data]
					}
				}
			})
		},
		methods: {
			scrolltolower(e){
				if(e.detail.direction==="bottom"){
					this.getData.page+=1
					
				}
			},
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
				date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
				return date;
			},
		},
		onPullDownRefresh() { //下拉时刷新
			this.getData.page = 1
			this.$http.hyXq(this.getData.StoreID,this.getData.userid,1,10).then(res =>{
				console.log(res);
				if(res.IsSuccess){
					for(let key of Object.keys(res)){
						for(let val of this.showShuJuList){
							let key_ = val.id
							if(key===key_){
								val.val = this.$api.formatAmount(res[key])
							}
						}
					}
					if(this.getData.page===1){
						this.infoList = res.Data
					}else{
						this.infoList = [...this.infoList,...res.Data]
					}
					uni.stopPullDownRefresh()
				}
			})
		},
		onReachBottom() {
			this.getData.page+=1
			
			this.$http.hyXq(this.getData.StoreID,this.getData.userid,this.getData.page,10).then(res =>{
				console.log(res);
				if(res.IsSuccess){
					for(let key of Object.keys(res)){
						for(let val of this.showShuJuList){
							let key_ = val.id
							if(key===key_){
								val.val = this.$api.formatAmount(res[key])
							}
						}
					}
					if(this.getData.page===1){
						this.infoList = res.Data
					}else{
						this.infoList = [...this.infoList,...res.Data]
					}
				}
			})
		}
	}
</script>

<style>
	page {
		background:#f2f2f2;
		width: 750upx;
		overflow-x: hidden;
	}
</style>
<style scoped >
	.red_box_item{
		width:32%;
		height:100%;
		border-radius: 10upx;
	}
	
	.text_center{
		text-align: center;
		font-size:26upx;
		color:#666666;
		margin-top: 20upx;
	}
	
	.text_shu{
		text-align: center;
		font-size:32upx;
		font-weight: 600;
		color:#333333;
	}
</style>


