<template>
	<view class="recharge-page">
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">充值卡充值</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">充值卡充值</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="hx-card margin bg-white">
			<view class="hx-card-title padding  flex align-center">
				<text  style="width: 130upx;">充值方式</text>
				
				<text style="margin-left:100upx;font-size:24upx;color: #DDDDDD;">充值卡充值</text>
				<!-- <view @tap="toScan">
					<text class="hxIcon-saoyisao" style="font-size: 50upx;"></text>
				</view> -->
			</view>

			<view class="hx-card-content padding">
				<text>充值卡号</text>
				<view class="amount-field margin-top-sm flex padding-bottom-sm" :class="focus || active ? 'active' : ''">
					<input type="number" v-model="amount"  @focus="f" @blur="b" @input="changeMoney(amount)" class="flex-sub input text-bold text-lg" />
				</view>
			</view>
		
			<view class="hx-card-content padding">
				<text>充值密码</text>
				<view class="amount-field margin-top-sm flex padding-bottom-sm" :class="focus_ || active_ ? 'active' : ''">
					<input type="number" v-model="amount_"  @focus="f_" @blur="b_" @input="changeMoney(amount)" class="flex-sub input text-bold text-lg" :password="password" />
					<text :class="password?'hxIcon-yanjing1':'hxIcon-yanjing'" @tap="seeMima"></text>
				</view>
			</view>

			<view class="flex padding margin-bottom" v-if="isLogin">
				<view class="cu-btn lg radius flex-sub hx-btn" :class="active_ ? 'active' : ''" @tap="pay" >
					确  认 
				</view>
			</view>		

			<view class="flex justify-center  padding" v-else>
				<button class="cu-btn  bg-red shadow text-xl" style="width: 70%;height: 40px;" type="primary" :disabled="disableBtn[0]"
				open-type="getUserInfo" @getuserinfo="userinfo" v-if="showGetUserInfo">
					微信登录
				</button>
				<button class="cu-btn  bg-red shadow text-xl" style="width: 70%;height: 40px;" type="primary" :disabled="disableBtn2"
				open-type="getPhoneNumber" @getphonenumber="phonenumber" v-else>
					微信登录
				</button>
			</view>	
			
		</view>
		<view class="cu-modal bottom-modal " :class="inputPassWord?'show':''">
			<view class="cu-dialog">
				<uni-grid @close="hidePassModal" @fullclose="fullclose" />
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from '../../components/uni-grid/uni-grid.vue'
	let WXBizDataCrypt = require('common/WXBizDataCrypt.js');
	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				isLogin:true,
				showGetUserInfo:true,
				disableBtn:[false,false],
				disabled:false,
				amount: '',
				active: false,
				active_:false,
				focus_:false,
				focus: false,
				isRecharge: true,
				isShow: false,
				inputPassWord: false,
				amount_:'',
				password:true,
				getData:{
					userid:'',
					pwd:'',
					cardno:'',
					cardpwd:''
				},
				js_code:'',
				WXuserInfo:{},
				session_key:'',
				openid:'',
				unionid:''
			}
		},
		onLoad(option) {
		
		},
		async onShow() {
			// #ifdef MP-WEIXIN
			// this.wxLogin()
			// #endif
		},
		methods: {
			async wxLogin(){
				console.log(1)
				if(this.$store.state.hasLogin){
					console.log(2)
					 this.isLogin=true
					 console.log(this.$store.state.userInfo)
				}else{
					console.log(3)
					this.isLogin=false
					let [err1,res1] =await uni.login({provider: 'weixin'});
					this.js_code = res1.code;
					let res =  await this.$Request.get(this.$store.state.getopenidUrl,{js_code:this.js_code},false)
					let res_ = JSON.parse(res.Data)
					this.session_key = res_.session_key
					this.openid = res_.openid		
					let [err2,res2] =await uni.getSetting({})		
					let authSetting = res2.authSetting
					if(authSetting['scope.userInfo']){//已授权
						this.showGetUserInfo=false
						console.log(4)
						let [err3,res3] =await uni.getUserInfo({provider: 'weixin'})
						this.WXuserInfo = res3.userInfo
						let iv = res3.iv
						let encryptedData = res3.encryptedData
						let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.session_key)
						let data = pc.decryptData(encryptedData,iv)
						this.unionid = data.unionId
						console.log(this.unionid)
					}else{//未授权
						
					}
					//authSetting['scope.userInfo']		
				}
			},
			seeMima(){
				if(this.password){
					this.password= false
				}else{
					this.password = true
				}
			},
			changeMoney(e) {
				
			},
			f(res) {
				this.focus = true
			},
			b(res) {
				this.focus = false
			},
			f_(res){
				this.focus_ = true
			},
			b_(res){
				this.focus_ = false
			},
			hidePassModal(res) {
				this.inputPassWord = false
			},
			async fullclose(res) {
				this.getData.userid =  this.$store.state.userInfo.ID
				this.getData.pwd = this.$store.state.userInfo.PwdAnswer
				let pwd = res.pwd
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, pwd)
				if (pwd != '' && IsSuccess) {
					this.getData.cardno = this.amount
					this.getData.cardpwd = this.amount_
					let res = await this.$Request.get(this.$store.state.getCard,this.getData)
					console.log(res)
					this.inputPassWord = false
					if(res.IsSuccess){
						uni.navigateTo({
							url:`/pages/prestoreDetail/isSuccess?type=card&allMoney=${res.Data}&money=${res.Data}`
						})
					}else{
						this.$api.msg(res.Msg)
					}
				} else{
					this.inputPassWord = false
					console.log(this.$store.state.userInfo,this.getData)
					setTimeout(()=>{
						this.$api.msg('交易密码错误')
					})
				}
				
			},
			async pay(){
				if(this.active_){
					this.inputPassWord = true
				}
				// this.getData.userid =  this.$store.state.userInfo.ID
				// this.getData.cardno = this.amount
				// this.getData.cardpwd = this.amount_
				// let res = await this.$Request.get(this.$store.state.getCard,this.getData)
				// this.inputPassWord = false
				// if(res.IsSuccess){
				// 	uni.navigateTo({
				// 		url:`/pages/prestoreDetail/isSuccess?type=card&allMoney=${res.Data}&money=${res.Data}`
				// 	})
				// }else{
				// 	this.$api.msg(res.Msg)
				// }
			},
			async userinfo(obj){
				console.log(obj)
				let iv= obj.detail.iv
				let encryptedData = obj.detail.encryptedData
				this.WXuserInfo = obj.detail.userInfo
				let flag = obj.detail.errMsg
				if(flag === 'getUserInfo:ok'){
					let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.session_key)
					let data = pc.decryptData(encryptedData,iv)
					this.unionid = data.unionId
					console.log(this.unionid)
					let res = await this.$api.showModal({content: "获取用户信息成功，需要再次点击【微信登录】授权获取手机号",showCancel: false})
					if(res){
						this.disableBtn[0]=true
						this.showGetUserInfo=false
					}
				}else{
					console.log('取消授权')
					this.$api.msg('取消授权')
				}
			},
			async phonenumber(phonObj){
				console.log(phonObj)
				let flag = phonObj.detail.errMsg
				if(flag === 'getPhoneNumber:ok'){
					console.log(3349)
					let phoneEncryptedData = phonObj.detail.encryptedData
					let phoneIv = phonObj.detail.iv
					let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.session_key)
					let tmpPhone = pc.decryptData(phoneEncryptedData,phoneIv)
					console.log(tmpPhone)
					let phone = tmpPhone.phoneNumber
					console.log(this.WXuserInfo)
					let getLogin ={
						phone,
						nickname:this.WXuserInfo.nickName,
						headimgurl:this.WXuserInfo.avatarUrl,
						openid:this.openid,
						unionid:this.unionid,
						pid:0,//店铺id
						yyyid:0//推荐人id
					}
					this.$api.showLoading_()
					let data = await this.$http.loginWithWx(getLogin.phone,getLogin.nickname,getLogin.headimgurl,getLogin.openid,getLogin.unionid,getLogin.pid,getLogin.yyyid)
					if(data.IsSuccess){
						this.isLogin=true
						this.$api.msg(data.Msg)
						this.$store.commit('login', data.Data)
						this.$api.hidLoading_()
					}else{
						this.$api.msg(data.Msg)
					}
				}else if(flag === 'getPhoneNumber:fail user deny'){
					console.log('取消授权')
					this.$api.msg('取消授权')
				}
				
			}
		},
		watch: {
			amount_(newValue) {
				if (newValue !== '') {
					this.active_ = true
				} else {
					this.active_ = false
				}
			},
			amount(newValue) {
				if (newValue !== '') {
					this.active = true
				} else {
					this.active = false
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.hx-card {
		border: 1px #f3f3f3 solid;
		box-shadow: 1px 1px 3px #ddd, -1px -1px 3px #ddd;

		&-title {
			background: #f8f8f8;
		}

		.amount-field {
			border-bottom: 1px solid #ddd;
			transition: all .3s ease-in-out;

			&.active {
				border-bottom: 1px solid #eb5245;
			}

			.input {
				letter-spacing: 3upx;
				height: 1em;
				line-height: 1em;
			}
		}
	}

	.hx-btn {
		color: #fff;
		background: #eb5245;
		opacity: .3;

		&.active {
			opacity: 1;
		}
	}
</style>
