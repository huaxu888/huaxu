<template>
	<view class="assistant">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">花蓄助手</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">花蓄助手</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view class="cu-card article">
			<view class="cu-item shadow bg-white" v-for="(item, index) in materialList" 
				:key="index" @tap="newsDetail(item.ID)">
				<view class="title">
					<view class="text-cut" style="height: 95upx;">
						{{ item.Info }}
					</view>
				</view>
				<view class="content " >
					<image :src="item.PicURL" mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content">{{ item.Description }}</view>
						<view class="text-gray text-xs text-right">
							{{ getDateFormat(item.AddDateTime) }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>	
	export default {
		components: {
		},
		data() {
			return {
				materialList: []
			}
		},
		onShow() {
			let self = this
			uni.request({
				url: 'https://newsapp.huaxuapp.com/api/news/listsc',
				success: function(res){
					self.materialList = res.data
				},
				fail :function(res){
					console.log('获取素材信息出错', res)
				}
			})
		},
		methods: {
			getDateFormat: function(str) {
				return new Date(parseInt(str.substr(6, 13))).toLocaleString('chinese',{hour12: false})
			},
			newsDetail: function (id) {
				uni.navigateTo({
					url: '/pages/person/assistantDetail?id=' + id
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
</style>
