<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">数据分析</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">数据分析</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		<view>

		</view>


		<view class="margin-top-xl">
			<view class="qiun-charts">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
			</view>
		</view>

		<view @tap="changeColor">
			变色
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var canvaColumn = {};
	export default {
		data() {
			return {
				StoreID: 0,
				cWidth: 750,
				cHeight: 500,
				pixelRatio: 1,
				infoObj: {},
				type: 0
			}
		},
		onLoad(route) {
			this.StoreID = route.StoreID * 1
			console.log(uni.upx2px)
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			async getServerData() {
				let res = await this.$Request.get('https://www.ucharts.cn/data.json')
				console.log(res)
				console.log(res.data)
				//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
				this.serverData = res.data;
				let Column = {
					categories: [],
					series: [],
					yMax: 0
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				Column.categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
				let series = [{
					"name": "周交易额，单位（元）",
					"data": [15, 50, 45, 37, 43, 34, 100]
				}]
				let ary = series[0].data
				ary = ary.sort((a, b) => a - b)
				Column.yMax = ary[ary.length - 1] + 100
				Column.series = series;
				this.showColumn("canvasColumn", Column);
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'column',
					colors: [this.color],
					enableMarkLine:true,
					dataPointShape:true,
					area:15,
					legend: {
						show: true,
						margin: 10
					},
					fontSize: 11,
					background: '#F2F2F2',
					pixelRatio: this.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {

					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 10,
						max: chartData.yMax,
					},
					dataLabel: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: this.cWidth * this.pixelRatio * 0.3 / chartData.categories.length
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
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + '成交额' + ':' + item.data.value+'元'
						} else {
							return category + '成交额' + ':' + item.data+'元'
						}
					}
				});
			},
			changeColor() {
				this.type += 1
				if (this.type > 2) {
					this.type = 0
				}
				this.getServerData();
			}
		},
		computed: {
			color() {
				if (this.type === 0) { //日
					return '#FFDAB9'
				} else if (this.type === 1) { //周
					return '#D2691E'
				} else if (this.type === 2) { //月
					return '#8B4513'
				}
			}
		}
	}
</script>

<style>
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
</style>
