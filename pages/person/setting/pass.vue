<template>
	<view class="pass-page">
	<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">修改密码</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">修改密码</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view class="input-field bg-white text-lg">
			<view class="input-item flex" :class="focus[0] || isuse[0]? 'active' : ''">
				<input :type="cate === 'pay' ? 'number' : 'text'" :password="isPassword[0]" v-model="newPass" :placeholder="cate === 'pay' ? '请输入交易密码' : '请设置新密码' "
					placeholder-style="color: #ddd" class="flex-sub" :maxlength="cate === 'pay' ? 6 : 20"
					:focus="focus[0]" @focus="pFocus(0)" @blur="pBlur(0)" style="border: 0upx; "   />
				<view class="text-white close-btn flex justify-center align-center margin-right-sm"
					:class="isPassword[0] ? 'hxIcon-yanjing' : 'hxIcon-yanjing1'"
					v-if="clear[0]" @tap="showPass(0)"></view>
				<view class="cuIcon-close text-white close-btn flex justify-center align-center" 
					v-if="clear[0]" @tap="clearPass(0)"></view>
			</view>
			
			<view class="input-item flex" style="margin-top: 30upx;" :class="focus[1] || isuse[1]? 'active' : ''">
				<input :type="cate === 'pay' ? 'number' : 'text'" :password="isPassword[1]" v-model="confirmPass" :placeholder="cate === 'pay' ? '请确认交易密码' : '请确认新密码' "
					placeholder-style="color: #ddd" class="flex-sub" :focus="focus[1]" :maxlength="cate === 'pay' ? 6 : 20"
					@focus="pFocus(1)" @blur="pBlur(1)" style="border: 0upx;" />
				<view class="text-white close-btn flex justify-center align-center margin-right-sm"
					:class="isPassword[1] ? 'hxIcon-yanjing' : 'hxIcon-yanjing1'"
					v-if="clear[1]" @tap="showPass(1)"></view>
				<view class="cuIcon-close text-white close-btn flex justify-center align-center" 
					v-if="clear[1]" @tap="clearPass(1)"></view>
			</view>
		</view>
		
        <view class="action text-xs text-gray" v-if="cate === 'pay'" style="margin-left: 70upx;margin-top: 20upx;">
            温馨提示：交易密码为6位长度的纯数字
        </view>
		
		<view style="margin: 70upx;">
			<view @tap="confirm" class="flex cu-btn lg hx-btn text-white radius" 
				:class="isuse[0] && isuse[1] ? 'active' : ''">
				确认修改
			</view>
		</view>
	</view>
</template>

<script>
	import { validatePass } from '../../../common/handle.js'
	export default {
		data() {
			return {
				newPass: '',
				confirmPass: '',
				focus: [true, false],
				isPassword: [true, true],
				clear: [false, false],
				isuse: [false, false],
				cate: '',
                phone: ''
			}
		},
		onLoad (option) {
			this.cate = option.cate
            this.phone = option.phone
			console.log(this.cate);
		},
		methods: {
			clearPass: function (index) {
				switch (index){
					case 0:
						this.newPass = ''
						this.$set(this.focus, 0, true)
						break;
					default:
						this.confirmPass = ''
						this.$set(this.focus, 1, true)
						break;
				}
			},
			showPass: function (index) {
				switch (index){
					case 0:
						this.$set(this.isPassword, 0, !this.isPassword[0])
						break;
					default:
						this.$set(this.isPassword, 1, !this.isPassword[1])
						break;
				}
			},
			pFocus: function (index) {
				switch (index){
					case 0:
						this.$set(this.focus, 0, true)
						if (this.newPass.length !== 0) {
							this.$set(this.clear, 0, true)
						}
						this.$set(this.clear, 1, false)
						break;
					default:
						this.$set(this.focus, 1, true)
						if (this.confirmPass.length !== 0) {
							this.$set(this.clear, 1, true)
						}
						this.$set(this.clear, 0, false)
						break;
				}
			},
			pBlur: function (index) {
				switch (index){
					case 0:
						this.$set(this.focus, 0, false)
						break;
					default:
						this.$set(this.focus, 1, false)
						break;
				}
			},
			confirm: function () {
				let self = this
				if (self.newPass === self.confirmPass) {
					switch (self.cate){
						case 'pay':
                            if (!(/^[0-9]+$/.test(self.confirmPass))) {
                                uni.showModal({
                                    content: '密码包含非法字符，使用数字',
                                    showCancel: false,
                                    confirmText: '知道了'
                                })
                                return false
                            }
							// 设置交易密码的接口
							uni.request({
								url: 'https://newsapp.huaxuapp.com/api/menber/resetjypwd',
								data: {
									userid: self.$store.state.userInfo.ID,
									oldpwd: self.$store.state.userInfo.Pwd,
									newpwd: self.confirmPass
								},
								success:function(res){
									if (res.data.IsSuccess) {
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
										setTimeout(function() {
											uni.navigateBack({
												delta: 3
											})
										}, 1200);
									}
									self.$api.msg(res.data.Msg)
								},
								fail:function(res){
									console.log('设置交易密码出错', res);
								},
								complete:function(res){
									console.log(res);
								}
							})
							break;
						default:
							// 设置登录密码的接口
                            console.log('修改密码');
                            console.log("self.$store.state.userInfo.Phone: " + self.$store.state.userInfo.Phone);
                            console.log("self.phone: " + self.phone);
							uni.request({
								url: 'https://newsapp.huaxuapp.com/api/menber/findpwd',
								data: {
									no: self.$store.state.userInfo.Phone || self.phone,
									pwd: self.confirmPass
                                },
                                success:function(res){
                                    self.$store.commit('logout')
                                    uni.showModal({
                                        title: '修改密码成功',
                                        content: '为了保证您的账户安全，请重新登录',
                                        showCancel: false,
                                        confirmText: '去登陆',
                                        success: res => {
                                            uni.reLaunch({
                                                url: '/pages/index/person'
                                            })
                                        },
                                    });
								},
								fail:function(res){
									console.log('设置密码出错', res);
								}
							})
							break;
					}
				} else {
					this.$api.msg('两次输入的密码不相同')
				}
			}
		},
		watch: {
			newPass(newValue) {
				let nLength = newValue.length
				if (nLength !== 0) {
					this.$set(this.clear, 0, true)
					this.$set(this.isuse, 0, true)
				} else {
					this.$set(this.clear, 0, false)
					this.$set(this.isuse, 0, false)
				}
			},
			confirmPass(newValue) {
				let nLength = newValue.length
				if (nLength !== 0) {
					this.$set(this.clear, 1, true)
					this.$set(this.isuse, 1, true)
				} else {
					this.$set(this.clear, 1, false)
					this.$set(this.isuse, 1, false)
				}
			}
		},
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	.close-btn {
		background: #999;
		height: 44upx;
		width: 44upx;
		border-radius: 50%;
	}
	
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
		
		&.active {
			opacity: 1
		}
	}

</style>
