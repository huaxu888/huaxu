<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-white" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">绑定银行卡</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">绑定银行卡</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->


		<view class="cu-form-group margin-top">
			<view class="title" style="width: 190upx;">
				账户名：
			</view>
			<input placeholder-style="color:rgba(180,180,180,0.7)"   placeholder="请输入银行卡持卡人姓名" name="input" v-model="name"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="width: 190upx;">银行卡号：</view>
			<input placeholder-style="color:rgba(180,180,180,0.7)"   placeholder="请输入银行卡号" name="input" v-model="cardNum"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="width: 190upx;">所属银行：</view>
			<input  placeholder-style="color:rgba(180,180,180,0.7)"   placeholder="请输入开户行" name="input" v-model="bank"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="width: 190upx;">所属支行：</view>
			<input  placeholder-style="color:rgba(180,180,180,0.7)"   placeholder="汉中莲湖路支行" name="input" v-model="bank_"></input>
		</view>
		<view class="cu-form-group">
			<view class="title" style="width: 190upx;">预留手机号:</view>
			<input  type="number" placeholder-style="color:rgba(180,180,180,0.7)" placeholder="请输入银行预留手机号"  name="input" v-model="Phone"></input>
		</view>
		<view class="text-gray text-xs margin-lr margin-top">提示：请确保持卡人各项信息填写正确，以便后续提现正常进行</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-hx-red margin-tb-sm lg text-white shadow" @tap="submit">{{font}}</button>
		</view>

	</view>
</template>


<script>
	import {validatePhone} from '@/common/handle.js'
	export default {
		data() {
			return {
				// codeBth: '获取验证码',
				// allowSubmit: false,
				
				name: '',
				cardNum: '',
				bank: '',
				storeid:'',
				code: '',
				userInfo: '',
				font: '提交',
				type: 0,
				Phone:'',
				bank_:''
			}
		},
		onLoad(router) {
			this.storeid=router.storeid
		},
		methods: {
			async submit() {
				if ( this.isName(this.name)) {
					if (this.cardNum != '') {
						if ( this.isName(this.bank)) {
							if(this.isName(this.bank_)){
								if(validatePhone(this.Phone)){
									let BankName = `${this.bank}${this.bank_}`
									let getData ={
										storeid:this.storeid*1,
										BankName:BankName,
										BankNo:this.cardNum,
										BankUserName:this.name,
										Phone:this.Phone
									}
									let res =await this.$Request.get(this.$store.state.addShopBank,getData)
									if(res.IsSuccess){
										setTimeout(()=>{
											this.$api.msg(res.Msg,1500,false,'success')
										},500)
										uni.navigateBack({
											delta:1
										})
									}else{
										await this.$api.msg(res.Msg,1500,false)
										return 
									}
								}else{
									this.$api.msg('请输入正确的手机号',2000)
								}
							}else{
								this.$api.showModal({
									title: '所属支行',
									content: '请填写正确的银行地址(不能有空格，不能为空)',
									showCancel:false,
									confirmText:'我知道了'
								})
							}
						} else {
							this.$api.showModal({
								title: '所属银行',
								content: '请填写正确的银行地址(不能有空格，不能为空)',
								showCancel:false,
								confirmText:'我知道了'
							})
						}
						return false
						if ( (/^((\d{4}\s{1}){4}(\d{2}))$/.test(this.cardNum))  || (/^((\d{4}\s{1}){4}(\d{1}))$/.test(this.cardNum)) || (/^((\d{4}\s{1}){4}(\d{3}))$/.test(this.cardNum)) || (/^((\d{4}\s{1}){3}(\d{4}))$/.test(this.cardNum))) {
							if ( this.isName(this.bank)) {
								if(this.isName(this.bank_)){
									if(validatePhone(this.Phone)){
										let BankName = `${this.bank}${this.bank_}`
										let getData ={
											storeid:this.storeid*1,
											BankName:BankName,
											BankNo:this.cardNum,
											BankUserName:this.name,
											Phone:this.Phone
										}
										console.log(getData)
										let res =await this.$Request.get(this.$store.state.addShopBank,getData)
										if(res.IsSuccess){
											setTimeout(()=>{
												this.$api.msg(res.Msg,1500,false,'success')
											},500)
											uni.navigateBack({
												delta:1
											})
										}else{
											await this.$api.msg(res.Msg,1500,false)
											return 
										}
									}else{
										this.$api.msg('请输入正确的手机号',2000)
									}
								}else{
									this.$api.showModal({
										title: '所属支行',
										content: '请填写正确的银行地址(不能有空格，不能为空)',
										showCancel:false,
										confirmText:'我知道了'
									})
								}
							} else {
								this.$api.showModal({
									title: '所属银行',
									content: '请填写正确的银行地址(不能有空格，不能为空)',
									showCancel:false,
									confirmText:'我知道了'
								})
							}
						} else {
							this.$api.showModal({
								title: '银行卡号错误',
								content: '请填写正确格式的银行卡号',
								showCancel:false,
								confirmText:'我知道了'
							})
						}
					} else {
						this.$api.showModal({
							title: '银行卡号错误',
							content: '银行卡号不能为空',
							showCancel:false,
							confirmText:'我知道了'
						})
					}
				} else {
					this.$api.showModal({
						title: '账户名错误',
						content: '请填写正确的账户名格式(不能有空格，不能为空)',
						showCancel:false,
						confirmText:'我知道了'
					})
				}
			},
			isName(str){
				let strAry = str.split('')
				if(str.length!=0){
					for(let val of strAry){
						if(val===' '){
							return false
						}
					}
					return true
				}else{
					return false
			    }
			}
		},
		components: {}
	}
</script>

<style>


</style>
