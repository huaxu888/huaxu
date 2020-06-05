<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">绑定银行卡</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">绑定银行卡</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->


		<view class="cu-form-group margin-top">
			<view class="title" style="width: 210upx;">
				姓名：
			</view>
			<input placeholder="请输入银行卡持卡人姓名" name="input" v-model="name"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="width: 210upx;">银行卡号：</view>
			<input placeholder="请输入银行卡号" name="input" maxlength="23" v-model="cardNum"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="width: 210upx;">开户行：</view>
			<input placeholder="请输入开户行名称" name="input" v-model="bank"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="width: 210upx;">预留手机号：</view>
			<input placeholder="请输入预留手机号" name="input" v-model="ylPhone"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="width: 210upx;">验证码：</view>
			<input placeholder="请输入验证码" name="input" type="number" maxlength="6" v-model="code"></input>
			<button class='cu-btn bg-hx-red shadow  text-white' @tap="getCode">{{ codeBth }}</button>
		</view>
		<view class="text-gray text-xs margin-lr margin-top">提示：请确保持卡人各项信息填写正确，以便后续提现正常进行</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-hx-red margin-tb-sm lg text-white shadow" @tap="submit">{{font}}</button>
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
																		uni.switchTab({
																			url: '/pages/index/index'
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

<style>
	page{
		background: #FFFFFF;
	}
</style>

