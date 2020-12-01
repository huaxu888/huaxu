<template>
	<view style="background-color: #F2F2F2;">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-whitesss" :isBack="true" class="text-black" style="border-bottom: 1upx solid #e4e4e4;">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">添加支付宝</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">添加支付宝</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view style="background-color: #ffffff;padding-top: 40upx;">
			<view class="margin" style="">
				<text style="font-size: 32upx;font-weight: 600;">填写支付宝信息</text>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title" style="width: 210upx;">支付宝账号：</view>
				<input placeholder="请输入支付宝账号" name="input" v-model="cardNum"></input>
			</view>
			<view class="cu-form-group">
				<view class="title" style="width: 210upx;">账户姓名：</view>
				<input placeholder="请输入支付宝真实实名姓名" name="input" v-model="name" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title" style="width: 210upx;">手机号：</view>
				<input placeholder="请输入支付宝的联系手机号" name="input" maxlength="11" type="number" v-model="ylPhone"></input>
			</view>
		</view>
		
		
		<view style="background-color: #f2f2f2;">
			<view class="text-gray text-xs margin-lr margin-top"><text class="hxIcon-icon" style="font-size: 30upx;"></text><text style="font-size: 24upx;margin-left: 12upx;">提示：请确认支付宝账户各项信息填写正确。</text></view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-hx-red margin-tb-sm lg text-white shadow sure" @tap="submit">{{font}}</button>
			</view>
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
			if (this.userInfo.ZhiFuBaoNo) {
				this.name = this.userInfo.ZhiFuBaoNick;
				this.ylPhone = this.userInfo.ZhiFuBaoID;
				this.cardNum = this.userInfo.ZhiFuBaoNo;
				this.font = '修改';
			}

		},
		methods: {
			submit() {
				var _self = this;
				if (this.userInfo) {
					if (_self.name != '') {
						if (_self.cardNum != '') {
							if (_self.ylPhone != '') {
								this.$http.zfbBind(this.userInfo.ID,_self.name,_self.ylPhone,_self.cardNum).then(res => {
									if(res.IsSuccess){
										_self.$api.refreshUserInfo(_self.userInfo.ID, _self)
										_self.$api.msg('绑定成功',2000)
										setTimeout(() => {
											uni.navigateBack({
												delta: 3,
											})
										})
									} else {
										_self.$api.msg('绑定失败，请重新绑定',2000)
									}
								})
							} else {
								_self.$api.msg('请填写正确的的支付宝联系手机号');
							}
						} else {
							_self.$api.msg('请填写正确的支付宝账号');
						}
					} else {
						_self.$api.msg('请填写正确的支付宝姓名');
					}
				} else {
					_self.$api.msg('用户信息获取失败，请尝试重新登录');
				}
			},
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
		background: #fe5479;
		color: #fff;
		border-radius: 100upx;
		// box-shadow: 2upx 2upx 14upx lighten($color: #fa7b7b, $amount: 10);
	}
</style>

