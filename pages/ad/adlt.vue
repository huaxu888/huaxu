<template>
	<view>
		
	
		<view @tap="baocun">保存到相册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
			uni.authorize({
			    scope: 'scope.writePhotosAlbum',
			    success() {
			        uni.saveImageToPhotosAlbum()
					this.baocun()
			    }
			})
		},
		methods:{
			baocun() {
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: function (res) {
						console.log(res);
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePaths[0],
							success: function () {
								console.log('save success');
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
</style>
