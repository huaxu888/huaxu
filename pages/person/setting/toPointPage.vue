<template>
	<view class="to-point-page">
		<cu-custom bgColor="bg-white solid-bottom" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选择自提点</block>
		</cu-custom>
		
		<view class="point-list">
			<view class="point-item" v-for="(item,index) in pointList" :key="index" @tap="selectedItem(item)">
				<view class="flex justify-between padding-bottom-xs solid-bottom">
					<view class="flex align-center">
						<view class="store-image" :style="{backgroundImage: 'url(' + item.LogoPic + ')'}"></view>
						<view class="margin-left-sm flex flex-direction">
							<text class="text-bold">{{ item.StoreName }}</text>
							<text v-if="item.EndWorkDate && item.StartWorkDate" class="text-gray text-sm margin-top-xs">
								<text>营业时间：</text>
								<text>{{ item.StartWorkDate }} - {{ item.EndWorkDate }}</text>
							</text>
						</view>
					</view>
					<view class="flex align-center">
						<tui-rate :current="item.StoreStart" :size="15" :disabled="true"></tui-rate>
					</view>
				</view>
				<view class="flex align-center margin-top padding-bottom solid-bottom">
					<text class="cuIcon-locationfill"></text>
					<text class="margin-lr-sm flex-sub">{{ item.StoreAddress }}</text>
					<text class="store-distance">{{ getDistance(item.distance) }}</text>
				</view>
				<view class="flex justify-end">
					<view class="contact-merchant-button" @tap="contactMerchant(item.Phone)">
						联系商家
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tuiRate from '@/components/rate/rate.vue';
export default {
	components: { tuiRate },
	data() {
		return {
			pointList: []
		}
	},
	onShow() {
		if (Object.keys(this.$store.state.userInfo).length === 0) {
			uni.showModal({
				title: '登录',
				content: '你还没有登录，请登录后再进行操作',
				showCancel: false,
				confirmText: '去登录',
				success: res => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/Login/login'
						});
					}
				}
			});
			return;
		}
		let location
		// #ifdef H5
		location = '107.077859,33.073516'
		this.$http.getToPoint(location)
			.then(res => {
				this.pointList = res
			})
			.catch(err => {
				this.pointList = '暂无自提点'
			})
		// #endif
		// #ifndef H5
		uni.getLocation({
			success: (res) => {
				location = `${res.longitude},${res.latitude}`
				this.$http.getToPoint(location)
					.then(res => {
						this.pointList = res
					})
					.catch(err => {
						this.pointList = '暂无自提点'
					})
			},
			fail: (err) => {
				console.log('获取错误', err);
			}
		})
		// #endif
	},
	methods: {
		getDistance: function (distance) {
			let km = Math.floor(distance / 1000)
			if (km < 1) {
				return distance.toFixed(2) + ' m'
			} else {
				return `${km}.${(distance % 1000).toString().substr(0, 2)} Km`
			}
		},
		contactMerchant: function (phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		selectedItem: function (item) {
			this.$store.commit('setToPoint', item)
			uni.navigateBack()
		}
	}
}
</script>

<style>
page {
	background: #f8f8f8;
}

::-webkit-scrollbar {
	width: 0;
	height: 0;
	background-color: transparent;
}
</style>

<style scoped lang="scss">
$yg-red: #ff5b2e;
$image-size: 70rpx;

.to-point-page {
	.point-list {
	}
	
	.point-item {
		background: #FFFFFF;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 4rpx rgba($color: #000000, $alpha: .1);
	}
	
	.store-image {
		width: $image-size;
		height: $image-size;
		border-radius: 100rpx;
		background-position: center;
		background-size: cover;
	}
	
	.contact-merchant-button {
		background-color: $yg-red;
		border-radius: 100rpx;
		padding: 10rpx 30rpx;
		margin-top: 30rpx;
		color: #FFFFFF;
	}
}
</style>
