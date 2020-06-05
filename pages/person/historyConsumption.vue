<template>
	<view class="history-consumption-page">
		<view class="history-list">
			<view v-for="(item,index) in list" :key="index" class="history-item">
				<history-item :item="item"></history-item>
			</view>
		</view>
	</view>
</template>

<script>
	import historyItem from './historyItem.vue'
	export default {
		components: { historyItem },
		data() {
			return {
				list: [],
				currentPage: 1
			};
		},
		onShow() {
			this.$http.getConsumptionList(this.$store.state.userInfo.ID, this.currentPage)
				.then(res => {
					if (res.IsSuccess) {
						this.list = res.Data
						console.log(this.list);
					} else {
						this.$api.msg(res.Msg)
					}
				})
				.catch(err => {
					console.log(err);
					this.$api.msg(res.Msg)
				})
		}
	}
</script>

<style lang="scss" scoped>
	.history-consumption-page {
		
		.history-item {
			margin: 30rpx;
		}
	}
</style>
