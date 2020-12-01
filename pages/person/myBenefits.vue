<template>
	<view class="balance-page">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的收益</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">我的收益</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="banner flex flex-direction">
			<text>总收益（元）</text>
			<text class="margin-tb text-bold" style="font-size: 60upx; letter-spacing: 4upx;">{{ total === '--' ? '--' : formatMoney(total) }}</text>
			<view class="flex">
				<text class="flex-sub">
					余额收益：{{ totalNum === '--' ? '--' : formatMoney(totalNum) }}
				</text>
				<text class="flex-sub">
					可消费额收益：{{ totalFLNum === '--' ? '--' : formatMoney(totalFLNum)}}
				</text>
			</view>
		</view>
		<view>
			<view class="flex justify-between margin-lr">
				<text class="text-bold text-lg">明细</text>
				<view style="position: relative;">
					<view class="text-gray flex align-center justify-end income-way-btn" 
					:class="showIncomeWayPanel ? 'income-way-btn-active' : ''" @tap="toggleShowIncomeWayPanel">
						<text>{{ incomeWayIndex === -1 ? '筛选' : incomeWay[incomeWayIndex] }}</text>
						<text class="cuIcon-triangledownfill income-way-icon" :class="showIncomeWayPanel ? 'income-way-icon-active' : ''"></text>
					</view>
					<view class="income-way-panel" :class="showIncomeWayPanel ? 'income-way-panel-show' : ''">
						<view class="income-way-item" v-for="(item, index) in incomeWay" :key="index" @tap="changeIncomeWay(index)">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
			<mescroll-uni class="record-list" @down="handleDown" @up="handlUp" @init="mescrollInit">
				<view class="record-item" v-for="(item, index) in recordList" :key="index">
					<view class="flex flex-direction">
						<text>{{ item.Info }}</text>
						<text class="margin-top-xs text-gray">{{ getLocalTime(item.AddDate) }}</text>
					</view>
					<view class="record-money flex align-center">
						<text class="cuIcon-add text-bold" style="font-size: .8em;"></text>
						<text>{{ formatMoney(item.Scores) }}</text>
					</view>
				</view>
			</mescroll-uni>
		</view>

	</view>
</template>

<script>
	import MescrollUni from 'mescroll-uni'
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				mescroll: null,
				incomeWay: [
					'所有收益',
					'余额收益',
					'消费奖励',
					'代理返利',
					'推广用户'
				],
				incomeWayIndex: -1,
				showIncomeWayPanel: false,
				recordList: [],
				currentPage: 1,
				total: '--',									// 总收益
				totalNum: '--',									// 余额收益
				totalFLNum: '--',								// 可消费额收益
			}
		},
		async onShow() {
			let data = await this.getProfit()
			this.total = data.Total
			this.totalNum = data.TotalNum
			this.totalFLNum = data.TotalFLNum
		},
		methods: {
			getLocalTime(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours();
				let minutes = date.getMinutes();
				let seconds = date.getSeconds();
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				seconds = seconds < 10 ? '0' + seconds : seconds;
				minutes = minutes < 10 ? '0' + minutes : minutes;
				date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
				return date;
			},
			changeIncomeWay(index) {
				this.incomeWayIndex = index
				this.showIncomeWayPanel = false
				this.currentPage = 1
				this.mescroll.resetUpScroll()
			},
			toggleShowIncomeWayPanel() {
				this.showIncomeWayPanel = !this.showIncomeWayPanel
			},
			async getProfit(type) {
				let data = await this.$http.getProfit(this.userInfo_.ID, this.incomeWayIndex === -1 ? 0 : this.incomeWayIndex, this.currentPage)
				if(type === 'list' || type) {
					return data.Data
				} else {
					return data
				}
			},
			formatMoney(money) {
				return this.$api.formatAmount(money)
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			handleDown(mescroll) {
				mescroll.resetUpScroll()
			},
			handlUp(mescroll) {
				this.getProfit(true)
				.then(res => {
					if ( mescroll.num === 1) {
						this.recordList = []
					}
					this.recordList = this.recordList.concat(res)
					this.currentPage ++
					mescroll.endSuccess(res.length)
				})
				.catch(err => {
					console.log(err);
					mescroll.endErr()
				})
			}
		},
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		}
	}
</script>

<style scoped lang="scss">
	$primary-red: #f84d50;

	.banner {
		color: #FFFFFF;
		margin: 30upx;
		padding: 30upx;
		border-radius: 20upx;
		background: linear-gradient(to right, $primary-red, lighten($primary-red, 5));
	}

	.record-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx;
		margin: 30upx;
		border-radius: 10upx;
		box-shadow: 4upx 4upx 20upx rgba($color: #000000, $alpha: .1);
	}
	
	.record-money {
		font-size: 1.5em;
		color: $primary-red;
	}
	
	.income-way-icon {
		font-size: 1.5em;
		transform: rotate(0);
		transition: all .3s ease-in-out;
	}
	
	.income-way-icon-active {
		transform: rotate(180deg);
	}
	
	.income-way-btn {
		width: 200upx;
		transition: all .3s ease-in-out;
	}
	
	.income-way-btn-active {
		color: #333;
		box-shadow: 4upx 4upx 8upx rgba(#000000, .1);
	}
	
	.income-way-panel {
		position: absolute;
		right: 0;
		width: 200upx;
		height: 0;
		overflow: hidden;
		text-align: center;
		background: #FFFFFF;
		transition: all .3s ease-in-out;
		box-shadow: 4upx 4upx 8upx rgba(#000000, .1);
		
		.income-way-item {
			margin: 20upx 0;
		}
	}
	
	.income-way-panel-show {
		height: 320upx;
	}
</style>
