<!-- 
* @file myAlipay.vue
* @descripteon 我的支付宝
* @author 张阳
* @date 2019-6-5
* @version: V1.0.0
* @email:1103992447@qq.com
-->
<template>
	<view style="height: 100vh;">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">绑定支付宝</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">绑定支付宝</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="padding-top-xl">
			<view class="flex  justify-around">
				<image src="https://img.huaxuapp.com/Alipay.png" style="height: 120upx; width: 120upx;"></image>
			</view>
		</view>

		<view class="margin-top-xl">
			<view class="padding-lr">
				<view class="margin-top">
					<hx-input paddingSize="sm" placeholder="请输入真实姓名" v-model="Uname" :model="Uname" :disable="disable"></hx-input>
				</view>
				<view class="margin-top">
					<hx-input paddingSize="sm" placeholder="请输入支付宝账号" v-model="aliAccount" :model="aliAccount" :disable="disable"></hx-input>
				</view>
				<view class="margin-top " v-if="!disable">
					<hx-input paddingSize="sm" placeholder="请输入验证码" :hasCode="true" v-model="code" :phone="phone"></hx-input>
				</view>
			</view>
			<view class="text-gray margin-top-xl margin-lr"  v-if="!disable">提示：请您绑定正确的支付宝账号以姓名，以便后续提现正常进行</view>
			<view class="margin-top-xl flex justify-center"  v-if="!disable">
				<button class="cu-btn block bg-hx-red margin-tb-sm lg margin-lr text-white" style="width:70%;" @tap="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<style>
	page{
		background: #FFFFFF;
	}
</style>


<script>
	import {
		genarateCode,
		sendCode
	} from '../../common/handle.js'
	import hxInput from '../../components/hxInput.vue'
	export default {
		components: {
			hxInput
		},
		created(){
			console.log(this.StatusBar,this.CustomBar)
		},
		data() {
			return {
				phone: '',
				code: '',
				userInfo: '',
				aliAccount: '',
				Uname: '',
				disable: false
			}
		},
		onLoad() {
			if (this.$store.state.hasLogin) {
				this.userInfo = this.$store.state.userInfo;
				this.phone = this.userInfo.Phone;
			} else {
				this.phone = '';
			}
			if (this.userInfo.ZhiFuBaoNick != '' && this.userInfo.ZhiFuBaoNo != '') {
				this.Uname = '已绑定支付宝名称： '+ this.userInfo.ZhiFuBaoNick;
				this.aliAccount ='已绑定支付宝账号： '+  this.userInfo.ZhiFuBaoNo;
				this.disable = true;
			}
		},
		methods: {
			submit() {
				var _self = this;
				if (this.userInfo.ZhiFuBaoNick == '' && this.userInfo.ZhiFuBaoNo == '') {
					//说明没有绑定支付宝 然后执行登录支付宝
					if (_self.Uname != '') {
						//姓名不为空
						if (_self.aliAccount != '') {
							//账号不为空 
							if (_self.code != '') {
								//验证码不为空，然后开始做验证码验证
								uni.request({
									url: 'https://newsapp.huaxuapp.com/api/menber/yzmislost',
									data: {
										phone: _self.phone,
										yzm: _self.code,
										dt: _self.$store.state.timer
									},
									success: function(res) {
										console.log("验证成功");
										console.log(res)
										if (res.data.IsSuccess) {
											console.log('验证码验证成功', res)
											if (_self.userInfo.ID != null && _self.userInfo.ID != undefined) {
												uni.request({
													url: "https://newsapp.huaxuapp.com/api/scores/bdzfb",
													//绑定支付宝
													data: {
														userid: _self.userInfo.ID,
														zfbname: _self.Uname,
														zfbno: _self.aliAccount
													},
													method: "GET",
													success: (res) => {
														if (res.data.IsSuccess == true) {
															_self.$api.msg("绑定支付宝成功！！");
															_self.$api.refreshUserInfo(_self.userInfo.ID, _self);
															setTimeout(() => {
																uni.switchTab({
																	url: '/pages/index/index'
																});
															}, 2000);
														}
														if (res.data.IsSuccess == false) {
															_self.$api.msg(res);
														}
													},
													fail: function() {
														_self.$api.msg('服务器异常')
													}
												});
											} else {
												_self.$api.msg('绑定失败，请尝试重新登录')
											}
										}
									},
									fail: function(res) {
										_self.$api.msg(res)
										console.log("验证失败");
									}
								})
							} else {
								_self.$api.msg('请输入验证码')
							}
						} else {
							_self.$api.msg('请输入支付宝账号')
						}
					} else {
						_self.$api.msg('请输入真实姓名')
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.b {
		border: 1px solid #8DC63F;

	}


	.code-field {
		display: flex;
		align-items: baseline;

		.input {
			flex: auto;
			padding-right: 10upx;
		}

		.cu-btn {
			width: 200upx;
		}
	}
</style>
