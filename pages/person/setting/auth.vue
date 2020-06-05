<template>
	<view class="auth-page">
		<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">实名认证</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">实名认证</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="hx-margin">
			<view class="input-item" :class="active[0] || isuse[0] ? 'active' : ''">
				<input type="text" v-model="name" placeholder="请输入真实姓名" :focus="active[0]" @focus="nameFocus"
				@blur="nameBlur"/>
			</view>
			<view class="input-item" :class="active[1] || isuse[1] ? 'active' : ''">
				<input type="number" v-model="IDCard" placeholder="请输入身份证号" :focus="active[1]" @focus="idFocus"
				@blur="idBlur"/>
			</view>
		</view>
		<view class="hx-margin flex" @tap="startAuth">
			<text class="cu-btn lg hx-btn text-white flex-sub radius" :class="isuse[0] && isuse[1] ? 'active' : ''">
				开始认证
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				IDCard: '',
				active: [true, false],
				isuse: [false, false]
			}
		},
		methods: {
			nameFocus: function () {
				this.$set(this.active, 0, true)
			},
			nameBlur: function () {
				this.$set(this.active, 0, false)
			},
			idFocus: function () {
				this.$set(this.active, 1, true)
			},
			idBlur: function () {
				this.$set(this.active, 1, false)
			},
			startAuth: function() {
				let self = this
				if (this.isuse[0] && this.isuse[1]) {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/menber/smrz',
						data: {
							userid: self.$store.state.userInfo.ID,
							SFZNo: self.IDCard,
							name: self.name,
						},
						success: function(res){
							if (res.data.IsSuccess) {
								setTimeout( function () {
									uni.navigateBack({
										delta: 1
									})
								}, 1200)
							}
						},
						complete: function(res) {
							self.$api.msg(res.data.Msg)
						}
					})
				}
			}
		},
		watch: {
			name (newValue) {
				if (newValue.length > 0) {
					this.$set(this.isuse, 0, true)
				} else {
					this.$set(this.isuse, 0, false)
				}
			},
			IDCard (newValue) {
				if (newValue.length === 18) {
					this.$set(this.isuse, 1, true)
				} else {
					this.$set(this.isuse, 1, false)
				}
			}
		},
	}
</script>

<style scoped lang="scss">

	.cu-bar-border {
		border-bottom: 1upx solid #e0e0e0;
		border-top: 1upx solid #e0e0e0;
	}
	.hx-margin {
		margin: 70upx
	}
	.input-item {
		padding-bottom: 20upx;
		margin-top: 50upx;
		font-size: 32upx;
		border-bottom: 3upx solid #ddd;
		transition: all 0.3s ease-in-out;
		
		&.active {
			border-bottom: 3upx solid #ec3a46;
		}
	}
	.hx-btn {
		background-color: #ec3a46;
		opacity: .3;
		
		&.active {
			opacity: 1
		}
	}

	.upload-id-card {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70%;
		margin-left: 15%;

		.round-red-bg {
			position: absolute;
			background-color: #da4a4e;
			border-radius: 1000upx;
			padding: 20upx;
		}
	}

	.upload-btn {
		background-color: #f8f8f8;
		width: 100%;
		justify-content: center;
		display: flex;
		color: #333;
		transition: all 0.3s ease-in-out;
		border-radius: 5upx;
	}

	.upload-btn-active {
		background: #eb5245;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #ec3a46, #eb5245);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #ec3a46, #eb5245);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		width: 100%;
		justify-content: center;
		display: flex;
		color: #fff;
		transition: all 0.3s ease-in-out;
		border-radius: 5upx;
	}
</style>
