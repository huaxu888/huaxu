<template>
	<view style="background-color: #F2F2F2;">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-whitesss" :isBack="true" class="text-black"  style="border-bottom: 1upx solid #e4e4e4;">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">添加银行卡</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">添加银行卡</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view style="background-color: #ffffff;padding-top: 30upx;">
			
			<view class="cu-form-group">
				<view class="title" style="width: 210upx;">
					开户人姓名：
				</view>
				<input placeholder="请输入银行卡持卡人姓名" name="input" v-model="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title" style="width: 210upx;">银行卡号：</view>
				<input placeholder="请输入银行卡号" name="input" maxlength="23" v-model="cardNum"></input>
			</view>
			<view class="cu-form-group">
				<view class="title" style="width: 210upx;">开户银行：</view>
				<input placeholder="请输入开户行名称" name="input" v-model="bank"></input>
			</view>
			<view class="cu-form-group">
				<view class="title" style="width: 210upx;">开户手机号：</view>
				<input placeholder="请输入手机号" name="input" maxlength="11" type="number" v-model="ylPhone"></input>
			</view>
			<view class="cu-form-group" style="border-bottom: 1upx solid #eeeeee;">
				<view class="title" style="width: 210upx;">验证码：</view>
				<input placeholder="请输入验证码" name="input" type="number" maxlength="6" v-model="code"></input>
				<button class='cu-btn shadow text-white' style="background-color: #ff5b2e;font-size: 24upx;padding: 10upx;" @tap="getCode">{{ codeBth }}</button>
			</view>
		</view>
		<view class="text-gray text-xs margin-lr margin-top"><text class="hxIcon-icon" style="font-size: 30upx;"></text><text style="margin-left: 12upx;font-size: 24upx;">提示：请确保持卡人各项信息填写正确，以便后续提现正常进行</text></view>
		<view class="padding flex flex-direction" style="margin-top: 0upx;">
			<button class="cu-btn bg-hx-red margin-tb-sm lg text-white shadow sure" @tap="submit">{{font}}</button>
		</view>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				codeBth: '获取验证码',
				allowSubmit: false,
				name: '',
				cardNum: '',
				bank: '',
				code: '',
				ylPhone: '',
				userInfo: '',
				font: '提交',
				type: 0
			}
		},
		onLoad(router) {
			if ('type' in router) {
				this.type = router.type
				// console.log(({}).toString.call(this.type),this.type)
			}
			this.userInfo = this.$store.state.userInfo;
			console.log(this.userInfo);
			if (this.userInfo.BankUserName) {
				this.name = this.userInfo.BankUserName;
				this.bank = this.userInfo.BankName;
				this.cardNum = this.userInfo.BankNo;
				this.font = '修改';
			}

		},
		watch: {
			cardNum(newValue, oldValue) {
				this.cardNum = newValue.replace(/[ \f\t\v]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
			}
		},
		methods: {
			submit() {
				var _self = this;
				if (this.userInfo.Phone) {
					if (_self.name != '') {
						if (_self.cardNum != '') {
							if ((/^((\d{4}\s{1}){4}(\d{3}))$/.test(this.cardNum)) || (/^((\d{4}\s{1}){3}(\d{4}))$/.test(this.cardNum))) {
								console.log('true');
								if (_self.bank != '') {
									if (_self.ylPhone != '') {
										if (_self.code != '') {
											uni.request({
												url: 'https://newsapp.huaxuapp.com/api/menber/yzmislost',
												data: {
													phone: _self.ylPhone,
													yzm: _self.code,
													dt: _self.$store.state.timer
												},
												success: function(res) {
													if (res.data.IsSuccess) {
														uni.request({
															url: 'https://newsapp.huaxuapp.com/api/scores/bdyhk',
															data: {
																userid: _self.userInfo.ID,
																BankUserName: _self.name,
																BankNo: _self.cardNum,
																BankName: _self.bank
															},
															success: function(res) {
																_self.$api.msg('绑定成功');
																_self.$api.refreshUserInfo(_self.userInfo.ID, _self)
																setTimeout(() => {
																	if (_self.type === 0) {
																		uni.navigateBack({
																			 delta: 3
																		});
																	} else if (_self.type === '2') {
																		uni.navigateBack({
																			delta: 1
																		})
																	}
																});
															},
															fail: function(res) {
																_self.$api.msg('绑定失败，请检查网络');
															}
														})

													} else {
														_self.$api.msg('验证码错误，请重新获取');
													}
												},
												fail: function(res) {
													_self.$api.msg(res)
												}
											})

										} else {
											_self.$api.msg('请获取并填写验证码');
										}
									} else {
										_self.$api.msg('请填写预留手机号码');
									}
								} else {
									_self.$api.msg('开户行不能为空');
								}

							} else {
								_self.$api.msg('银行卡号错误');
							}
						} else {
							_self.$api.msg('银行卡号不能为空');
						}

					} else {
						_self.$api.msg('姓名不能为空');
					}
				} else {
					_self.$api.msg('用户信息获取失败，请尝试重新登录');
				}
			},
			getCode: function(res) {
				let self = this
				if (self.codeBth === '获取验证码') {
					uni.request({
						url: 'https://newsapp.huaxuapp.com/api/sms/getyzm',
						data: {
							mobile: self.ylPhone
						},
						success: (res) => {
							if (res.data.IsSuccess) {
								let timer = 60
								self.codeBth = `${timer}s`;
								self.$store.commit('setTimer', (new Date()).getTime());
								let interval = setInterval(function() {
									timer--
									self.codeBth = `${timer}s`
									if (timer === 0) {
										clearInterval(interval)
										self.codeBth = '获取验证码'
									}
								}, 1000)
							}
						},
						complete: function(res) {
							self.$api.msg(res.data.Msg)
						}
					})
				}
			}

		},
		components: {}
	}
</script>

<style scoped lang="scss">
	page{
		background: #F2F2F2;
	}
	
	.sure {
		margin-top: 60upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #fb9c67, #fc6660);
		color: #fff;
		border-radius: 100upx;
		box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10);
	}
</style>

