<template>
	<view class="nick-page">
		<cu-custom bgColor="bg-white" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">修改昵称</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">修改昵称</block>
			<!-- #endif -->
		</cu-custom>
		<view class="input-item flex" :class="focused ? 'active' : ''">
			<input type="text" v-model="nick" :focus="focused" placeholder="请输入新昵称" @focus="focus" @blur="blur" class="flex-sub"/>
			<view class="cuIcon-close text-white close-btn flex justify-center align-center" 
					v-if="clear" @tap="clearNick"></view>
		</view>
		<view class="action-bar">
			<view :class="['cu-btn lg flex-sub hx-btn', nick.length !== 0 ? 'active' : ''] " style="color: #fff;"
				@tap="submit">
				确认修改
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				focused: true,
				nick: '',
				userInfo: {},
				clear: false,
			}
		},
		onShow() {
			this.userInfo = this.$store.state.userInfo
		},
		methods: {
			focus: function () {
				this.focused = true
			},
			blur: function () {
				this.focused = false
			},
			clearNick: function () {
				this.nick = ''
				this.focused = true
			},
 			submit: function (res) {
				let self = this
				if (this.nick.length !== 0) {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/menber/ediuser',
						data: {
							userid: self.$store.state.userInfo.ID,
							faceurl: self.$store.state.userInfo.FaceURL,
							nick: self.nick
						},
						success:function(res){
							uni.request({
								url: 'https://newsapp.huaxuapp.com/api/menber/myinfo',
								data: {
									userId: self.$store.state.userInfo.ID
								},
								success:function(res){
									if (res.data.IsSuccess) {
										self.$store.commit('refresh', res.data.User)
									}
								}
							})
							setTimeout( function () {
								uni.navigateBack({
									delta: 1
								})
							}, 1200)
						},
						complete: function (res) {
							self.$api.msg(res.data.Msg)
						}
					})
				}
			}
		},
		watch: {
			nick(value) {
				let nlength = value.length
				if (nlength !== 0) {
					this.clear = true
				} else {
					this.clear = false
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.input-item {
		margin: 70upx 70upx 0 70upx;
		padding-bottom: 20upx;
		border-bottom: 3upx solid #ddd;
		transition: all 0.3s ease-in-out;
		
		&.active {
			border-bottom: 3upx solid #ec3a46;
		}
	}
	
	.hx-btn {
		background-color: #ec3a46;
		opacity: .3;
		margin: 70upx 70upx;;
		
		&.active {
			opacity: 1
		}
	}
	.action-bar {
		display: flex;
		
	}
	
	.close-btn {
		background: #999;
		height: 44upx;
		width: 44upx;
		border-radius: 50%;
	}
	
</style>
