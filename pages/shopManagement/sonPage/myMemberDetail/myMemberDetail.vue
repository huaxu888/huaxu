<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">会员消费详情</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">会员消费详情</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		<view>
			<!-- <view class="padding" style="background: #F0F0F0;">
				<text style="font-weight: 800;">
					消费数据占比
				</text>
			</view>
			<view class="qiun-charts qiun-rows">
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"></canvas>
			</view>
			<view class="padding-sm flex justify-center align-center bg-white">
				<text style="height:30upx;width: 8upx;background: #000000;border-radius: 100upx;" class="margin-right-sm"></text><text>共消费：</text><text>1000元</text>
			</view> -->
			<view class="cu-list menu-avatar margin-top">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="{'background-image':`url(${FaceURL})`}"></view>
					<view class="content">
						<view class="text-grey">{{Nick}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{Phone}}
							</view> </view>
					</view>
				</view>
			</view>
			
			<view class="padding-lr flex justify-between margin-top-sm">
				
				<view class="flex flex-direction align-center  justify-center red_box_item padding-tb" v-for="(item,i) of showShuJuList" :key="i" :style="{background:item.bgc}">
					<view class="flex align-center justify-center">
						<text class="text-sm text-white">{{item.label}}</text>
					</view>
					<view class=" margin-top-xs text_center ">
						<text>{{item.val}}</text>
						<text style="margin-left: 4upx;">{{i===0?'次':'元'}}</text>    
					</view>
				</view>		
				
			</view>
			
			
			<view class="padding margin-top-sm padding-tb-sm " style="background: #F0F0F0;font-weight: 800;">
				消费详情
			</view>
			
			<view>
				<scroll-view scroll-y style="height:820upx;" @scrolltolower="scrolltolower" :lower-threshold="50">
					<view class="flex justify-between padding-lr padding-tb-sm" v-for="(item,i) of infoList" :key="i" style="border-bottom: 4upx solid #F8F8F8;">
						<view>
							<view>消费时间</view>
							<view class="margin-top-sm">{{beTime(item.AddDate)}}</view>
						</view>
						<view>
							<view>消费金额</view>
							<view class="margin-top-sm">{{item.SJXFJE}}元</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var canvaPie = {};
	export default {
		async onLoad(route) {
			console.log(route)
			this.Nick = route.Nick
			this.Phone = route.Phone
			this.FaceURL = route.FaceURL
		
			
			
			this.getData.userid = route.ID * 1
			this.getData.StoreID = route.StoreID*1
			
			
			this.getCurryInfo(true)
			
			// this.cWidth = uni.upx2px(750);
			// this.cHeight = uni.upx2px(500);
			// this.getServerData();
		},
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
						label:'总消费次数',
						val:0,
						bgc:'#eb5245',
						id:'TotalCount'
					},{
						label:'消费总金额',
						val:0,
						bgc:'#ffff0',
						id:'TotalPrice'
					},{
						label:'平均消费金额',
						val:0,
						bgc:'#FF1493',
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
		methods: {
			async getCurryInfo(showflag){
				let res = await this.$Request.get(this.$store.state.mynewmemberdetail,this.getData,showflag)
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
			},	
			scrolltolower(e){
				if(e.detail.direction==="bottom"){
					this.getData.page+=1
					this.getCurryInfo(false)
				}
			}
			// getServerData() {
			// 	let Pie = {
			// 		"series": [{
			// 			"name": "一班",
			// 			"data": 50
			// 		  }, {
			// 			"name": "二班",
			// 			"data": 30
			// 		  }, {
			// 			"name": "三班",
			// 			"data": 20
			// 		  }, {
			// 			"name": "四班",
			// 			"data": 18
			// 		  }, {
			// 			"name": "五班",
			// 			"data": 150
			// 		  },{
			// 			"name": "六班",
			// 			"data": 80
			// 		  },{
			// 			"name": "七班",
			// 			"data": 30
			// 		  },{
			// 			"name": "八班",
			// 			"data": 44
			// 		  },{
			// 			"name": "九班",
			// 			"data": 66
			// 		  },{
			// 			"name": "十班",
			// 			"data": 77
			// 		  },{
			// 			"name": "十一班",
			// 			"data": 67
			// 		  },{
			// 			"name": "十二班",
			// 			"data": 177
			// 		  }]
			// 	};
				
			// 	this.showPie("canvasPie", Pie);
			// },
			// showPie(canvasId, chartData) {
			// 	canvaPie = new uCharts({
			// 		$this: this,
			// 		canvasId: canvasId,
			// 		type: 'pie',
			// 		fontSize: 11,
			// 		legend: {
			// 			show: true,
			// 			position: 'right',
			// 			float: 'center',
			// 			itemGap: 10,
			// 			padding: 5,
			// 			lineHeight: 26,
			// 			margin: 5,
			// 			borderWidth: 1
			// 		},
			// 		background: '#FFFFFF',
			// 		pixelRatio: this.pixelRatio,
			// 		series: chartData.series,
			// 		animation: true,
			// 		width: this.cWidth * this.pixelRatio,
			// 		height: this.cHeight * this.pixelRatio,
			// 		dataLabel: true,
			// 		extra: {
			// 			pie: {
			// 				labelWidth: 15
			// 			}
			// 		},
			// 	});
			// 	this.piearr = canvaPie.opts.series;
			// },
			// touchPie(e) {
			// 	canvaPie.showToolTip(e, {
			// 		format: function(item) {
			// 			return item.name 
			// 		}
			// 	});
			// },
		},
		onPullDownRefresh() { //下拉时刷新
			this.getData.page = 1
			this.getCurryInfo(false).then(res => {
				uni.stopPullDownRefresh()
			})
		},
	}
</script>







<style>
	page {
		background:white;
		width: 750upx;
		overflow-x: hidden;
	}
	/* .qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts-pie {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts-right {
		display: flex;
		align-items: center;
		width: 250upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.legend-itme {
		width: 200upx;
		margin-left: 30upx;
		height: 50upx;
		align-items: center;
	}

	.legend-itme-point {
		width: 20upx;
		height: 20upx;
		margin: 15upx;
		border: 1px solid #FFFFFF;
		border-radius: 20upx;
		background-color: #000000;
	}

	.legend-itme-text {
		height: 50upx;
		line-height: 50upx;
		color: #666666;
		font-size: 26upx;
	} */
</style>
<style scoped >
	.red_box_item{
		width:32%;
		height:100%;
		background:#F75A64;
		border-radius: 10upx;
	}
	.text_center{
		text-align: center;
		font-size:23upx;
		color:rgb(225,225,225);
	}
</style>


