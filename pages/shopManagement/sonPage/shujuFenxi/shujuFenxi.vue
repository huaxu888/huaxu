<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-cream"  backColor="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">数据分析</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">数据分析</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>

		<view style="background:#f8d1a3;" class="padding flex align-center justify-between ">
			<text class="padding-tb  margin-lr" v-for="(item,i) of shiTuTypeList" :key="i" style="color:#8d5b20;" :class="classIndex===i?'chooseIt':''" @tap="classPickerChange(i)">
				{{item.label}}
			</text>
		</view>
		
		<view  style="margin-top: -20upx;padding-bottom: 40upx;">
			
			
			<view class="padding-tb bg-white" style="border-radius: 10upx;">
				<view class="padding">
					<text class="text-bold text-black">数据展示</text>
				</view>
				<view>
					<view class="padding-lr flex justify-between margin-top-sm ">
						<view class="flex flex-direction align-center  justify-center red_box_item padding-tb animate" v-for="(item,i) of showShuJuList"
						 :key="i" :style="{background:color}">
							<view class="flex align-center justify-center">
								<text class="text-sm text-white" :style="{color:classIndex===2?'#fae0a6':classIndex===1?'white':'black'}">￥{{showTitle}}{{item.label}}</text>
							</view>
							<view class=" margin-top-xs text_center ">
								<text :style="{color:classIndex===2?'#fae0a6':classIndex===1?'white':'black'}">{{item.val}}</text>
								<text style="margin-left: 4upx;" :style="{color:classIndex===2?'#fae0a6':classIndex===1?'white':'black'}">{{i===1?'次':'元'}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
			<view class="padding-tb bg-white margin-top-sm" style="border-radius: 10upx;">
				<view class="padding">
					<text class="text-bold text-black">收款柱状图</text>
				</view>
				<view>
					<view class="qiun-charts">
						<!--#ifdef MP-ALIPAY -->
						<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
						 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchColumn" :disable-scroll="true"></canvas>
						<!--#endif-->
						<!--#ifndef MP-ALIPAY -->
						<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn" disable-scroll=true></canvas>
						<!--#endif-->
					</view>
				</view>
			</view>
			
		</view>

	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var canvaColumn = {};
	var canvaPie = {}
	export default {
		data() {
			return {
				infoList: [],
				classIndex: 0,
				StoreID: 0,
				cWidth:750,
				cHeight: 500,
				pixelRatio: 1,
				infoObj: {},
				type: 0,
				shiTuTypeList: [{
					label: '日报',
					type: 0
				}, {
					label: '周报',
					type: 1
				}, {
					label: '月报',
					type: 2
				}],
				showShuJuList: [{
					label: '营业额总计',
					val: 1000,
					id: 'TotalNum',
					//bgc:'#eb5245'
				}, {
					label: '消费次数总计',
					val: 1000,
					id: 'TotalCount',
					//bgc:'#f6c471'
				}, {
					label: '次均消费',
					val: 1000,
					id: 'AverageNum',
					//bgc:'#466cf7'
				}],
				color: '#fae0a6',
				showTitle: '当日',
				getData: {
					StoreID: 0,
					userid: 0,
					day: 1, //1：每天的 2：每周的 3：每月的
					page: 1,
					pagesize: 10,
					sort: 6 //6表示当天
				},
				categories: [], //日期 时间节点
				series: [], //数值，对应时间节点的数据，
				yMax: '', //y轴的最大值
				XFLT: []
			}
		},
		onLoad(route) {
			this.StoreID = route.StoreID * 1
			this.getData.StoreID = route.StoreID * 1
			this.getData.userid = this.$store.state.userInfo.ID;

			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getCurryInfo()
		},
		methods: {
			//1是当天 2是前天 往前类推
			async getCurryInfo() { //初始化化当前页面的所有数据
				let res = await this.$Request.get(this.$store.state.myxfdaydetail, this.getData)
				let categories = []
				let Pie = {
					series: [{
						name: '',
						data: 0,
						color:'#DC143C'
					}, {
						name: '',
						data: 0,
						color:'#DA70D6'
					}, {
						name: '',
						data: 0,
						color:'#FF00FF'
					}, {
						name: '',
						data: 0,
						color:'#7B68EE'
					}, {
						name: '',
						data: 0,
						color:'#00BFFF'
					}, {
						name: '',
						data: 0,
						color:'#00FFFF'
					}, {
						name: '',
						data: 0,
						color:'#FFD700'
					}]
				}
				if (res.IsSuccess) {

					/*列表项数据*/
					if (this.getData.page === 1) {
						this.infoList = res.Data
					} else {
						this.infoList = [...this.infoList, ...res.Data]
					}
					/*********/

					/*为初始化柱状图做数据准备*/
					let XFLT = res.XFLT.reverse()
					this.XFLT = XFLT
					let data = []
					/*取出年月日以及相应的值*/
					XFLT.forEach((it,i) => {
						
						
						/*取出月日*/
						let yue = it.Date.split('-')[1]
						let ri = it.Date.split('-')[2]
						let date = `${yue}-${ri}`
						categories.push(date)
						/********/
						/*取出营业总额*/
						data.push(it.Totalprice)
						/************/


						/*玫瑰图配置*/
						let date_ 
						
						
						if(this.getData.day*1===1){
							date_ = `${yue}月${ri}日`
						}else if(this.getData.day*1==2){
							let num = 6
							let numRes = num-i
							if(numRes===0){
								date_ = '本周'
							}else{
								date_ = `前${numRes}周`
							}
						}else if(this.getData.day*1==3){
							let num = 6
							let numRes = num-i
							if(numRes===0){
								date_ = '本月'
							}else{
								date_ = `前${numRes}月`
							}
						}
						
						Pie.series[i].name = date_
						Pie.series[i].data = it.Totalprice

						/***********/

					})
					/********************/

					this.categories = categories
					this.series = [{
						"name": this.showTitle + '交易额，单位（元）',
						data
					}]

					let yMaxAry = data.map(it => it)
					yMaxAry = yMaxAry.sort((a, b) => a - b)
					this.yMax = yMaxAry[yMaxAry.length - 1] + 30
					/***************************/

				} else {
					this.infoList = []
					this.series = [{
						"name": this.showTitle + '交易额，单位（元）',
						data: [0, 0, 0, 0, 0, 0, 0]
					}]
					this.yMax = 0
					categories = ['', '', '', '', '', '', '']
				}

				let Column = {
					categories,
					series: this.series,
					yMax: this.yMax
				};


				console.log(Pie,Column)

				this.showColumn("canvasColumn", Column);
				this.getCurryAryInfo(6)
				this.showPie("canvasPie", Pie);
			},

			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding:0,
						lineHeight:20,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					series: chartData.series,
					animation: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							border: true,
							borderColor: '#FFFFFF',
							borderWidth: 3
						}
					},
				});
			},
			showColumn(canvasId, chartData) { //画图
				canvaColumn = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'column',
					colors: [this.color],
					enableMarkLine: true,
					dataPointShape: true,
					area: 15,
					legend: {
						show: true,
						margin: 10
					},
					fontSize: 11,
					background: '#F2F2F2',
					pixelRatio: this.pixelRatio,
					animation: true,
					categories: chartData.categories, //x坐标参数
					series: chartData.series, //列表项参数
					// enableScroll: true,//开启图表拖拽功能
					// xAxis: {
					// 	disableGrid:true,
					// 	type:'grid',
					// 	gridType:'dash',
					// 	itemCount:5,//x轴单屏显示数据的数量，默认为5个
					// 	scrollShow:true,//新增是否显示滚动条，默认false
					// 	scrollAlign:'left',//滚动条初始位置
					// },
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						max: chartData.yMax, //高度
						format(e) {
							return e.toFixed(0) + '元'
						}
					},
					dataLabel: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: this.cWidth * this.pixelRatio * 0.4 / chartData.categories.length
						},
						tooltip: {
							showBox: true, //是否显示半透明黑色的提示区域
							bgColor: '#000000', //主体背景颜色
							bgOpacity: 0.7, //背景颜色透明度
							gridType: 'dash', //辅助线类型（虚线）
							dashLength: 5, //虚线单段长度
							gridColor: '#1890ff', //辅助线颜色
							fontColor: '#FFFFFF', //主体文字颜色
							horizentalLine: true, //是否显示横向辅助线
							xAxisLabel: true, //是否显示X轴辅助标签
							yAxisLabel: true, //是否显示Y轴辅助标签
							labelBgColor: '#DFE8FF', //标签背景颜色
							labelBgOpacity: 0.95, //背景颜色透明度
							labelFontColor: '#666666' //标签文字颜色
						}
					}
				});

			},

			async refshInfoList() {
				let res = await this.$Request.get(this.$store.state.myxfdaydetail, this.getData, false)
				if (res.IsSuccess) {
					if (this.getData.page === 1) {
						this.infoList = res.Data
					} else {
						this.infoList = [...this.infoList, ...res.Data]
					}
				}
			},

			getCurryAryInfo(index) {
				if(index!=-1){
					console.log(this.XFLT)
					const TotalNum = this.XFLT[index].Totalprice
					const TotalCount = this.XFLT[index].TotalCount
					for (let value of this.showShuJuList) {
						let key = value.id
						if (key === 'TotalNum') {
							value.val = TotalNum
						} else if (key === 'TotalCount') {
							value.val = TotalCount
						} else if (key === 'AverageNum') {
							if (TotalNum === 0 || TotalCount === 0) {
								value.val = 0
							} else {
								value.val = this.$api.formatAmount((TotalNum / TotalCount))
							}
						}
					}
				}
			},

			touchColumn(e) {
				console.log(e)
				
				
				
				
				/*列表刷新,次数,总额,平均值刷新,柱状图不变*/
				let index = canvaColumn.getCurrentDataIndex(e)
				this.getCurryAryInfo(index)
				//this.refshInfoList()
				/**************************************/

				// this.getData.page = 1 //为分页做准备
				// this.getData.sort = index //为分页做准备


				/**展示点击图表的数字**/
				canvaColumn.showToolTip(e, {
					
					format: (item, category) => {
						item.color='#66ccff'
						console.log(item)
						if (typeof item.data === 'object') {
							return category + '成交额' + ':' + item.data.value + '元'
						} else {
							return category + '成交额' + ':' + item.data + '元'
						}
					}
				});
				/************************/
			},


			touchPie(e) {
				
				let index = canvaPie.getCurrentDataIndex(e)
				this.getCurryAryInfo(index)
				
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data +'元'
					}
				});
			},

			changeColor() {
				this.type += 1
				if (this.type > 2) {
					this.type = 0
				}
			},

			classPickerChange(index_) {
				let index = index_ * 1
				this.classIndex = index
				this.type = this.shiTuTypeList[index].type
				this.getData.day = index + 1
				this.getData.page = 1
				this.getData.sort = 6
				this.getCurryInfo()
			},

			scrolltolower(e) {
				if (e.detail.direction === "bottom") {
					this.getData.page += 1
					this.refshInfoList()
				}
			}
		},
		watch: {
			type(n, o) {
				if (n === 0) { //日
					this.color = '#fae0a6'
					this.showTitle = '当日'
				} else if (n === 1) { //周
					this.color = '#ff5b2e'
					this.showTitle = '本周'
				} else if (n === 2) { //月
					this.color = '#333333'
					this.showTitle = '本月'
				}
				let classIndex = this.shiTuTypeList.find(it => {
					if (it.type === this.type) {
						return it
					}
				}).type

			}
		},
		async onPullDownRefresh() { //下拉时刷新
			//await this.getServerData();
			uni.stopPullDownRefresh()

		},
	}
</script>

<style>
	page{
		background: #F2F2F2;
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

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.btnShiTu {
		padding: 20upx;
		/* 
		border-radius: 100upx;
		background: rgb(36,36,36);
		opacity:0.5;
		color:white; */
	}

	.red_box_item {
		width: 32%;
		background: #F75A64;
		border-radius: 10upx;
	}

	.text_center {
		text-align: center;
		font-size: 23upx;
		color:white;
	}
</style>

<style scoped>
	.chooseIt{
		position: relative;
		font-size:35upx;
	}
	.chooseIt:after{
		content: '';
		position: absolute;
		left: 0upx;
		right: 0upx;
		height: 4upx;
		border-radius: 10upx;
		background: #8d5b20;
		bottom:10upx;
	}
	.animate{animation:pulse  1s infinite;}
</style>