<template>
	<view class="transaction-record-page">
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">{{ pageTitle }}</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">{{ pageTitle }}</block>
			<!-- #endif -->
		</cu-custom>
		
		<view v-for="(item, index) in monthList" :key="index">
			<view class="month-action">
				<text class="month-style">
					{{ item }}月
				</text>
				<text>{{ total }}</text>
			</view>
			<view>
				<view class="flex align-center padding solid-bottom" v-for="(li, flag) in getRecordByMonth(item)" :key="flag">
					<view class="flex-sub flex flex-direction padding-right">
						<text>{{ li.Info }}</text>
						<text class="text-gray text-sm margin-top-xs">{{ li.AddDate }}</text>
					</view>
					<view class="padding-left">
						<text class="amount">{{ li.Score }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				pageTitle: '交易记录',
				allTransactionRecord: '',
				monthList: [],
				monthRecord: [],
				total: 0
			}
		},
		onShow() {
			let month = (new Date()).getMonth() + 1
			month = month <= 9 ? `0${month}` : month
			this.$http.getUserBalance(this.$store.state.userInfo.ID, 1, 1000)
			.then(res => {
				this.allTransactionRecord = res.Data.List
				this.allTransactionRecord = this.allTransactionRecord.filter( item => {
					item.AddDate = this.getLocalTime(item.AddDate)
					let mon = item.AddDate.substr(5, 2)
					if ( !this.monthList.includes(mon)) {
						this.monthList.push(mon)
					}
					return item
				})
			})
			.catch(err => {
				console.log(err);
			})
		},
		methods: {
			getRecordByMonth(month) {
				let tmp = this.allTransactionRecord.filter( item => {
					return item.AddDate.substr(5, 2) === month
				})
				let mRecord = {
					month: month,
					record: tmp
				}
				this.monthRecord.push(mRecord)
				return tmp
			}
		}
	}
</script>

<style>
	page {
		background: #F8F8F8;
	}
</style>
<style scoped lang="scss">
	.transaction-record-page {
		
		.month-action {
			padding: 30upx;
			display: flex;
			
			background: #fff;
			box-shadow: 0 4upx 4upx rgba($color: #000000, $alpha: .1);
			
			.month-style {
				border: solid 1px #eb5245;
				padding: 6upx 25upx;
				border-radius: 100upx;
			}
		}
		
		.amount {
			font-size: 1.2em;
			font-weight: bold;
		}
	}
</style>
