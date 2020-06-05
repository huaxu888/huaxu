<template>
	<view class="busineCss-list-page" style="position: relative;">
		<view class="header-img">
			<!-- #ifdef MP-WEIXIN -->
			<cu-custom bgColor="bg-white" :isBack="true" v-if="showNavigation">
				<block slot="backText">所有商圈</block>
			</cu-custom>
			<!-- #endif -->
		</view>
		
		<!-- #ifdef MP-WEIXIN -->
		<view class="text-lg back_btn flex justify-center align-center" @tap="back" v-if="!showNavigation">
			<text class="cuIcon-back text-white" style="font-size: 45upx;"></text>
		</view>
		<!-- #endif -->
		
		
		
		<view class="business-circle-list">
			<view class="business-circle-item" v-for="(item, index) in businessCircleList" :key="index" @tap="gotoBusinessCircleItem(item)">
				<view class="">
					<view class="img " :style="{backgroundImage: item.BusPics }" ></view>
				</view>
				<view class="flex flex-direction margin-left flex-sub" :class="item.Bcontent ? 'justify-between' : ''">
					<view class="flex justify-between align-end">
						<text class="text-lg text-bold">{{ item.BusName }}</text>
						<text class="text-sm text-gray">{{ getDistance(item.Location) }}</text>
					</view>
					<view class="tag-list" v-if="item.Labels">
						<text class="tag" v-for="(tag, index) in item.Labels" :key="index">
							{{ tag }}
						</text>
					</view>
					<view class="business-circle-description">
						<text>{{ item.Bcontent }}</text>
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
				siteId: 0,
				businessCircleList: [],
				location: [],
				showNavigation: false
			}
		},
		onLoad(option) {
			if(option.busid) {
				this.busid = option.busid
			}
			uni.getLocation({
				success: res => {
					this.location = [
						res.latitude,
						res.longitude
					]
					this.$store.commit('setLatitudeAndLongitude', {
						latitude:res.latitude,
						longitude:res.longitude
					})
				},
				fail: err => {
					this.location = []
					uni.showModal({
						title: '拒绝授权',
						content: '您拒绝花蓄使用的位置权限，我们将无法为您提供基于位置的服务',
						showCancel: false
					})
				}
			})
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: '所有商圈'
			})
			this.$http.getBusinessCircleList(this.site_.SiteID)
			.then(res => {
				if (res.IsSuccess) {
					this.businessCircleList = res.Data
					this.businessCircleList.forEach((item, index) => {
						if(item.Labels) {
							item.Labels = item.Labels.split(',')
						}
						if(item.BusPics) {
							item.BusPics_ = item.BusPics
							item.BusPics = `url('${item.BusPics}')`
						} else {
							item.BusPics = "url('https://img.huaxuapp.com/shangquanmrt.png')"
						}
					})
					console.log(this.businessCircleList);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.Msg
					})
				}
			})
			.catch(err => {
				console.log(err);
			})
		},
		onPageScroll(scroll) {
			if(scroll.scrollTop >= 95) {
				this.showNavigation = true
			} else {
				this.showNavigation = false
			}
		},
		methods: {
			back(){
				uni.navigateBack({})
			},
			rad(d) {
				return d * Math.PI / 180.0; 
			},
			// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
			getDistance(location) {
				if(this.location.length === 0) {
					return '无法获取位置信息'
				}
				let lat1 = location.split(',')[1]
				let lng1 = location.split(',')[0]
				let lat2 = this.location[0]
				let lng2 = this.location[1]
				var radLat1 = this.rad(lat1);
				var radLat2 = this.rad(lat2);
				var a = radLat1 - radLat2;
				var b = this.rad(lng1) - this.rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000; //输出为公里
				  
				var distance = s;//距离
				var distance_str = "";
				  
				if (parseInt(distance) >= 1) {
					distance_str = distance.toFixed(1) + "km";
				} else {
					distance_str = distance * 1000 + "m";
				}
				
				//s=s.toFixed(4);
				// return s;
				return distance_str
			},
			gotoBusinessCircleItem (item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/busineCssircleShopList/busineCssircleShopList?busid=${item.BID}&BusPics=${item.BusPics_}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.busineCss-list-page {
		.header-img {
			width: 750upx;
			height: 360upx;
			background-image: url('https://img.huaxuapp.com/bground_02.png');
			background-size: cover;
		}
		
		.business-circle-item {
			display: flex;
			flex-direction: row;
			padding: 30upx;
			margin: 30upx 0;
			background: #FFFFFF;
			border-radius: 5upx;
			
			.img {
				width: 200upx;
				height: 200upx;
				background-size: cover;
				border-radius: 5upx;
			}
			
			.tag-list {
				margin: 20upx 0;
			}
			
			.tag {
				padding: 5upx;
				background-color: #fef0eb;
				color: #fc7752;
				font-size: .8em;
				margin-right: 10upx;
				border-radius: 5upx;
				line-height: 1.8em;
			}
			
			.business-circle-description {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
			}
		}
	}
	.back_btn{
		width:60upx;
		height: 60upx;
		background: rgba(36,36,36,0.7);
		border-radius: 50%;
		position: absolute;
		top:60upx;
		left:40upx;
	}
</style>
<style>
	page {
		background: #F8F8F8;
	}
	
</style>