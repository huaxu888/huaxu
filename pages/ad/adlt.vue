<template>
	<view>
		<view class="rob-stamps-page">
			<view class="bg">
				<view class="anniuw">
					<view class="anniu" @tap="baocun"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
			
			
		},
		methods:{
			baocun(){
				// uni.authorize({
				//     scope: 'scope.writePhotosAlbum',
				//     success(res) {
				// 		console.log(res);
				// 		uni.saveImageToPhotosAlbum({
				// 			filePath: '/pages/static/sy.png',
				// 			success: function () {
				// 				console.log('save success');
				// 			},
				// 			fail:function(err){
				// 				console.log('1111111111111111')
				// 				console.log(err);
				// 			}
				// 		});
				//     } 
				// })
				let _this = this
				uni.authorize({
				    /* 这个就是保存相册的 */
				    scope: 'scope.writePhotosAlbum',
				    success() {
				        /* 保存图片方法 */
				        _this.img();
				    },
				    complete(res) {
				        console.log(res);
				        /* 这里判断一下如果没有授权重新打开设置选项 */
				        uni.getSetting({
				            success(res) {
				                if (!res.authSetting['scope.writePhotosAlbum']) {
				                    /* 打开设置的方法 */
				                    _this.opensit();
				                }
				            }
				        });
				    }
				});
				
			},
			/* 授权提示 ，这里就是重复提示用户去授权*/
			opensit() {
			    uni.showModal({
			        content: '由于您还没有允许保存图片到您相册里,这无法进行分享操作点击确定去允许授权',
			        success: function(res) {
			            if (res.confirm) {
			                /* 这个就是打开设置的API*/
			                uni.openSetting({
			                    success(res) {
			                        console.log(res.authSetting);
			                    }
			                });
			            } else if (res.cancel) {
			                uni.showModal({
			                    cancelText: '依然取消',
			                    confirmText: '重新授权',
			                    content: '很遗憾你点击了取消，这将无法进行分享操作，请慎重考虑',
			                    success: function(res) {
			                        if (res.confirm) {
			                            uni.openSetting({
			                                success(res) {
			                                    console.log(res.authSetting);
			                                }
			                            });
			                        } else if (res.cancel) {
			                            console.log('用户不授权');
			                        }
			                    }
			                });
			            }
			        }
			    });
			},
			
			
			img() {
			
			    /* 获取图片信息 */
			    uni.getImageInfo({
			        src: 'https://img.huaxuapp.com/bgdbk.png',
			        success: function(image) {
			            console.log(image);
			            /* 保存图片到相册 */
			            uni.saveImageToPhotosAlbum({
			                filePath: image.path,
			                success: function() {
			                    console.log('save success');
			                    
								uni.showModal({
									title: '保存成功',
									content: '图片已成功保存到相册，快去分享到您的圈子吧',
									showCancel: false
								});
			                },
			                complete(res) {
			                    console.log(res);
			                }
			            });
			        }
			    });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rob-stamps-page {
		position: relative;
		
		.bg {
			width: 750upx;
			height: 1630upx;
			background: url(https://img.huaxuapp.com/ltbkbj.png) no-repeat;
			background-position: center;
			background-size: cover;
		}
		
		.anniu {
			width: 511upx;
			height: 94upx;
			background: url(https://img.huaxuapp.com/djbctp_03.png) no-repeat;
			background-position: center;
			background-size: cover;
		}
		
		.anniuw {
			position: absolute;
			top: 800upx;
			left: 120upx
		}
		
	}
</style>
