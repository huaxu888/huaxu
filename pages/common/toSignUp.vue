<template>
	<view class="to-signup-page">
		
		<view class="form-item">
			<view class="label required">
				<text>姓名</text>
			</view>
			<view class="input-field">
				<input
					v-model="data.Name"
					type="text"
					placeholder="请填写姓名"
					placeholder-class="placeholder" />
			</view>
		</view>
		<view class="form-item">
			<view class="label required">
				<text>手机</text>
			</view>
			<view class="input-field">
				<input 
					v-model="data.Phone"
					type="number"
					maxlength="11"
					placeholder="请填写手机号"
					placeholder-class="placeholder" />
			</view>
		</view>
		<view class="form-item">
			<view class="label required">
				<text>出生日期</text>
			</view>
			<view class="input-field">
				<picker mode="date" :value="data.Birth" start="1985-01-01" :end="today" @change="selectBirth">
					<view :class="[data.Birth.includes('选择') ? 'placeholder' : '']">{{ data.Birth }}</view>
				</picker>
				<text class="cuIcon-right margin-left-xs text-gray"></text>
			</view>
		</view>
		<view class="form-item no-border">
			<view class="label required">
				<text>参赛区域</text>
			</view>
			<view class="input-field">
				<picker mode="multiSelector" :value="currentSelect" :range="areaList" @change="selectArea" @columnchange="selectCity">
					<view :class="[data.Area.includes('选择') ? 'placeholder' : '']">{{ data.Area }}</view>
				</picker>
				<text class="cuIcon-right margin-left-xs text-gray"></text>
			</view>
		</view>
		
		<view class="gap"></view>
		
		<view class="form-item no-border">
			<view class="label required">
				<text>大头照</text>
			</view>
			<view class="input-field">
				<view class="update-icon" @tap="addImg()" v-if="!data.BigHeadPhoto">
					<text class="cuIcon cuIcon-add text-gray" style="font-size: 60rpx;"></text>
				</view>
				<view class="img-body" v-if="data.BigHeadPhoto">
					<image :src="data.BigHeadPhoto" mode="aspectFill" class="update-img" @tap="preview()">
					</image>
					<view class="del-icon" @tap="delImg">
						<text class="cuIcon-close"></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="gap"></view>
		
		<view class="btn" @tap="toSignUp">
			<text>报 名</text>
		</view>
		
		<modal :showModal="showModal" @hidden="hidden" @success="success" :isRich="false" :Title="title" :Content="content"></modal>
		
	</view>
</template>

<script>
	import { registrationPayment } from '@/common/handle.js'
	import modal from '@/components/modal.vue'
	export default {
		components: { modal },
		data() {
			return {
				data: {
					Phone: '',
					Name: '',
					Birth: '请选择出生日期',
					BigHeadPhoto: '',
					Area: '请选择参赛区域',
				},
				areaList: [
					[
						'汉中市',
						'安康市',
						'商洛市'
					],
					[]
				],
				cityList: [
					[
						'汉台区',
						'南郑区',
						'城固县',
						'略阳县',
						'西乡县',
						'勉县县',
						'洋县县',
						'宁强县',
						'镇巴县',
						'留坝县',
						'佛坪县'
					],
					[
						'汉滨区',
						'汉阴县',
						'石泉县',
						'宁陕县',
						'紫阳县',
						'岚皋县',
						'平利县',
						'镇坪县',
						'旬阳县',
						'白河县'
					],
					[
						'洛南县',
						'丹凤县',
						'商南县',
						'山阳县',
						'镇安县',
						'柞水县'
					]
				],
				currentSelect: [0, 0],
				updateToken: '',
				title: '',
				content: '',
				isAgree: false,
				showModal: true
			}
		},
		onShow() {
			if (!this.$store.state.userInfo) {
				uni.showModal({
					title: '还没有登录',
					content: '请先登录再进行报名',
					showCancel: false,
					confirmText: '去登陆',
					success: res => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/common/login'
							})
						}
					}
				})
				return
			}
			uni.request({
				url: 'https://newsapp.huaxuapp.com/api/getToken/gettoken',
				success: res => {
					if (res.data.IsSuccess) {
						this.updateToken = res.data.uptoken
					}
				}
			})
			this.$set(this.areaList, 1, this.cityList[0])
			this.$http.applicationConditions()
				.then(res => {
					this.title = res.Title
					this.content = res.Content
				})
		},
		methods: {
			selectBirth: function (e) {
				this.data.Birth = e.detail.value
			},
			selectCity: function (e) {
				let col = e.detail.column,
					value = e.detail.value
				switch (col) {
					case 0:
						this.$set(this.areaList, 1, this.cityList[value])
						this.$set(this.currentSelect, 0, value)
						this.$set(this.currentSelect, 1, 0)
						break
					case 1:
						this.$set(this.currentSelect, 1, value)
						break
					default:
				}
			},
			selectArea: function (e) {
				let value = e.detail.value,
					city = this.areaList[0][value[0]],
					area = this.cityList[value[0]][value[1]]
				this.data.Area = city + area
			},
			addImg: function () {
				uni.chooseImage({
					count: 1,
					success: res => {
						uni.showLoading({
							title: '图片上传中……'
						})
						uni.uploadFile({
							url: 'https://up.qiniup.com',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData:{
								key: new Date().getTime() + Math.ceil(Math.random() * 100),
								token: this.updateToken
							},
							success: res => {
								let data = JSON.parse(res.data)
								console.log(data);
								let url = `https://img.huaxuapp.com/${data.key}`
								this.data.BigHeadPhoto = url
								uni.hideLoading()
							},
							fail: err => {
								console.log(err, '上传图片');
							}
						})
					}
				})
			},
			preview: function () {
				uni.previewImage({
					current: 0,
					urls: [this.data.BigHeadPhoto]
				})
			},
			delImg: function () {
				this.data.BigHeadPhoto = ''
			},
			toSignUp: function () {
				if (!this.$store.state.userInfo) {
					uni.showModal({
						title: '还没有登录',
						content: '请先登录再进行报名',
						showCancel: false,
						confirmText: '去登陆',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/common/login'
								})
							}
						}
					})
					return
				}
				if (!this.isAgree) {
					uni.showModal({
						title: '报名须知',
						content: '请先阅读并统一报名须知',
						showCancel: false,
						confirmText: '阅读',
						success: res => {
							if (res.confirm) {
								this.showModal = true
							}
						}
					})
					return
				}
				this.data.UserID = this.$store.state.userInfo.ID
				if (this.data.Name && this.data.Birth && this.data.Phone && 
					this.data.BigHeadPhoto && this.data.Area) {
						if (!/^1[3456789]\d{9}$/.test(this.data.Phone)) {
							uni.showModal({
								title: '格式错误',
								content: '您输入的手机号有误，请确认',
								showCancel: false
							})
							return
						}
						registrationPayment( this.data.UserID, this.data.Name, this.data.Birth,
							this.data.Phone, this.data.BigHeadPhoto, this.data.Area)
							.then( res => {
								 this.$http.signUp(this.data)
									.then(res => {
										if (res.IsSuccess) {
											uni.showModal({
												content: '报名成功',
												showCancel: false,
												success: res => {
													if (res.confirm) {
														uni.reLaunch({
															url: '/pages/index/index'
														})
													}
												}
											})
										}
									})
							})
				} else {
					uni.showModal({
						title: '信息错误',
						content: '请完整的填写您的报名信息',
						showCancel: false
					})
				}
			},
			hidden: function (e) {
				console.log(e, 'hidden')
				this.showModal = false
				this.isAgree = false
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			success: function (e) {
				console.log(e, 'success');	
				this.showModal = false
				this.isAgree = true
			}
		},
		computed: {
			today: function () {
				let date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth(),
					day = date.getDate()
					month += 1
				return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>

<style lang="scss" scoped>
	.to-signup-page {
		
		.gap {
			width: 750rpx;
			height: 10rpx;
			background-color: #F2F2F2;
		}
		
		.form-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #FFFFFF;
			padding: 30rpx 30rpx;
			border-bottom: 1rpx solid #E5E5E5;
			
			.label {
				flex-shrink: 0;
			}
			
			.input-field {
				text-align: right;
				flex: 1;
				margin-left: 30rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				
				input {
					flex: 1;
				}
			}
			
			.textarea-field {
				margin-left: 30rpx;
			}
			
			.placeholder {
				color: #999;
				font-size: 28rpx;
			}
			
			.update-icon {
				background-color: #F2F2F2;
				border-radius: 8rpx;
				width: 150rpx;
				height: 150rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			.img-list {
				display: flex;
				flex-wrap: wrap;
			}
			
			.update-img {
				background-color: #F2F2F2;
				border-radius: 8rpx;
				width: 150rpx;
				height: 150rpx;
				margin-left: 20rpx;
				margin-top: 20rpx;
			}
		}
		
		.form-item:first-child {
			border-top: 1rpx solid #E5E5E5;
		}
		
		.required:after {
			content: '*';
			color: red;
			margin-left: 6rpx;
		}
		
		.img-body {
			position: relative;
			border: 1rpx solid #F2F2F2;
		}
		
		.del-icon {
			position: absolute;
			left: -20rpx;
			top: -20rpx;
			width: 40rpx;
			height: 40rpx;
			background-color: #F2F2F2;
			color: #333;
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
		.no-border {
			border: none;
		}
		
		.btn {
			height: 100rpx;
			margin: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 32rpx;
			border-radius: 100rpx;
			background: linear-gradient(to left, #efa13b, #ea662e);
			box-shadow: 0 1rpx 6rpx #efa13b;
		}
	}
</style>
