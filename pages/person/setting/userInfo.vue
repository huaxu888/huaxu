<template>
	<view class="user-info-page">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">个人信息</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">个人信息</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<!-- 头像选择 -->
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" style="padding-top: 30upx;padding-bottom: 30upx;" @tap="uploadAvatar">
				<view class="cotent">
					<text>头像</text>
				</view>
				<view class="action">
					<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' + userInfo.FaceURL + ')'}">
					</view>
				</view>
			</view>
			<view class="cu-item arrow" @tap="editNick">
				<view class="cotent">
					<text>昵称</text>
				</view>
				<view class="action">
					{{ userInfo.Nick }}
				</view>
			</view>
			<view class="cu-item arrow" @tap="bindPhone">
				<view class="cotent">
					<text>手机号码</text>
				</view>
				<view class="action">
					{{ userInfo.Phone || '绑定手机号码' }}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	const qiniuUploader = require('../../../common/qiniuUploader.js')
	export default {
		data() {
			return {
				userInfo: {},
				canNotEditNick: true,
				canNotEditPhone: true,
				nickFocus: false,
				phoneFocus: false,
				Nick: '',
				phone: ''
			}
		},
        onShow() {
            this.userInfo =  this.$store.state.userInfo
        },
		methods: {
			uploadAvatar: function(e) {
				let self = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
                        if (res.tempFiles[0].size <= 450000) {
							console.log(res.tempFiles[0],res.tempFilePaths[0])
                            console.log(res.tempFilePaths[0])
                            qiniuUploader.upload(res.tempFilePaths[0], (res) => {
                            	let path = 'https://img.huaxuapp.com' + res.imageURL
                            	self.userInfo.FaceURL = path
                            	console.log('回传的图片地址', path);
                            	self.$store.commit('refresh', self.userInfo)
                            	uni.request({
                            		url: 'https://newsapp.huaxuapp.com/api/menber/ediuser',
                            		data: {
                            			userid: self.$store.state.userInfo.ID,
                            			faceurl: self.userInfo.FaceURL,
                            			nick: self.$store.state.userInfo.Nick
                            		},
                            		success:function(res){
                            			console.log('success', res)
                            		},
                            		fail:function(res){
                            			console.log(res)
                            		},
                            		complete: function(res){
                            			self.$api.msg(res.data.Msg)
                            		}
                            	})
                            }, (error) => {
                            	console.log('上传图片出错', error)
                            }, {
                            	region: 'ECN',
                            	domin: 'https://img.huaxuapp.com',
                            	uptokenURL: 'https://newsapp.huaxuapp.com/api/getToken/gettoken',
                                shouldUseQiniuFileName: true
                            }, (res) => {
                            	// console.log('上传进度', res.progress)
                            	// console.log('已经上传的数据长度', res.totalBytesSent)
                            	// console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                            })
                        } else {
                            self.$api.msg('图片过大，请上传450kb以内的图片')
                        }
					}
				})
			},
			editNick: function() {
				uni.navigateTo({
					url: '/pages/person/setting/nick'
				})
			},
			editPhone: function () {
				uni.navigateTo({
					url: '/pages/person/setting/phone'
				})
			},
			bindPhone: function () {
				if (!this.userInfo.Phone) {
					uni.navigateTo({
						url: '/pages/common/chagePhone'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	.xxl-avatar {
		width: 300upx;
		height: 300upx;
	}
	.upload-notice {
		position: absolute;
		bottom: 0;
		background-color: rgba(0, 0, 0, .6);
		width: 100%;
		height: 3em;
		line-height: 3em;
	}
	.upload-btn-active {
		background-color: #da4a4e ;
		width: 100%;
		padding: 20upx 0;
		margin-top: 50upx;
		justify-content: center;
		display: flex;
		color: #fff;
		transition: all 0.3s ease-in-out;
	}
</style>
