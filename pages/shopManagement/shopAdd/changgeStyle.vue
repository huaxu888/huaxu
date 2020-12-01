<template>
	<view class="bg-white" >
		<cu-custom bgColor="bg-whitesss" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>编辑</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>编辑</text></block>
			<!-- #endif -->
		</cu-custom>
		
		<view class="flex justify-between" style="padding: 0 30upx;margin-top: 100upx;">
			<view style="font-size: 32upx;font-weight: 600;">分类开关</view>
			<u-switch v-model="checked" @change="change" active-color="#f34e2d"></u-switch>
		</view>
		
		<view v-if="checked">
			<view class="flex justify-between align-center" style="padding: 0 30upx;margin-top: 60upx;">
				<view style="font-size: 32upx;font-weight: 600;">分类名称</view>
				<view class="flex justify-center" >
					<input placeholder="默认分类(点击修改)" style="text-align: center;width: 400upx;height: 80upx;background-color: #f4f4f4;border-radius: 10upx;padding: 0 40upx;color: #777777;font-size: 30upx;" ></input>
				</view>
			</view>
			
			<view class="flex justify-between align-center" style="padding: 0 30upx;margin-top: 60upx;">
				<view style="font-size: 32upx;font-weight: 600;">商品图片</view>
				<u-upload :max-count="1" :action="action" :file-list="fileList" style="width: 400upx;"></u-upload>
			</view>
			
			<!-- <view class="flex justify-between align-center" style="padding: 0 30upx;margin-top: 60upx;">
				<view style="font-size: 32upx;font-weight: 600;">宣传图片</view>
				<u-upload :max-count="1" :action="action" :file-list="fileList" style="width: 400upx;"></u-upload>
			</view> -->
			
			<view class="flex justify-center" style="margin-top: 80upx;" @tap="detailStyle">
				<view class="sures" style="font-size: 36upx;font-weight: 600;width: 540upx;height: 100upx;">删除</view>
			</view>
			
			<view class="flex justify-center" style="margin-top: 40upx;" @tap="sureAdd">
				<view class="sure" style="font-size: 36upx;font-weight: 600;width: 540upx;height: 100upx;">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked: true,
			action: 'http://www.example.com/upload',
			fileList: [
				{
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}
			]
		};
	},
	onLoad(option) {

	},
	onShow() {
		
	},
	methods: {
		submit() {
			let files = [];
			// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
			files = this.$refs.uUpload.lists.filter(val => {
				return val.progress == 100;
			})
			// 如果您不需要进行太多的处理，直接如下即可
			// files = this.$refs.uUpload.lists;
			console.log(files)
		},
		change(status) {
			console.log(status);
		},
		addShop(){
			uni.navigateTo({
				url:'/pages/shopManagement/shopAdd/addStyle'
			})
		},
		detailStyle(){
		
		},
		sureAdd(){
			
		}
	},
	onPullDownRefresh() {
		
	},
	components: {

	}
};
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	.sure {
		margin-top: 20upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fe5479;
		color: #fff;
		border-radius: 100upx;
	}
	
	.sures {
		margin-top: 20upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2upx solid #000000;
		color: #000000;
		border-radius: 100upx;
	}
</style>