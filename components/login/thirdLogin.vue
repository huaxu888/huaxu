<template>
	<view class="third-login">
		<view class="flex justify-center">
			<!-- #ifdef APP-PLUS -->
				<view class="hx-btn bg-green flex justify-center align-center" @tap="logIn('weixin')">
					<text class="hxIcon-weixin text-white" style="font-size: 80upx;"></text>
				</view>
			<!-- #endif -->
		
			<!-- #ifdef APP-PLUS || MP-WEIXIN || MP-ALIPAY -->
				<view class="hx-btn bg-red flex justify-center align-center" @tap="loginWithPass" v-if="showmima">
					<text class="hxIcon-mima text-white" style="font-size: 50upx;"></text>
				</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
				<button class="hx-btn  hxIcon-weixin flex justify-center align-center" type="primary" open-type="getUserInfo"  style="font-size: 50upx;" @getuserinfo="getuserinfoHandle"></button>
			<!-- #endif -->
		</view>
		<view class="notice flex justify-center margin-tb text-gray">
			注册即代表您同意 <text class="text-red light" @tap="xy">花蓄协议</text> 和 <text class="text-red light" @tap="ys">隐私保护协议</text>
		</view>
        
        <view class="cu-modal" :class="showModal ? 'show' : ''" style="position: absolute;z-index: 9999;">
            <view class="cu-dialog">
            	<view class="cu-bar bg-white justify-end">
            		<view class="content">{{Title}}</view>
            		<view class="action" @tap="close">
            			<text class="cuIcon-close text-red"></text>
            		</view>
            	</view>
            	<view class="padding-lr flex flex-direction align-start" style=" overflow: auto; height: 780upx;text-align: left;">
            		<rich-text :nodes="getContent(content)"></rich-text>
            	</view>
            	<view class="cu-bar bg-white">
            		<view class="action margin-0 flex-sub text-green solid-left " @tap="close">知道了</view>
            	</view>
            </view>
        </view>
        
	</view>
</template>

<script>
	import {getPageAllInfo as mixins } from '../../mixins/qymMixins.js'
    import htmlParser from '@/common/html-parser'
	let WXBizDataCrypt = require('common/WXBizDataCrypt.js')
	export default {
		mixins:[mixins],
		props:{
			showmima:{
				type:[Boolean,String],
				default:true
			}
		},
		name: 'thirdLogin',
		data(){
			return {
				authResult:{},
				wxUrl:this.$store.state.loginWXuRL,
				isbindUrl:this.$store.state.isbindUrl,
				infoUrl:'',
				getIsBindData:{
					openid:''
				},
				getDataWX:{
					phone:'',
					nickname:'',
					headimgurl:'',
					openid:'',
					unionid:''
				},
				infoObject:{},
				WXuserInfo:'',
                showModal: false,
                Title: '',
               content: '',
			   session_key:'',
			   iv:'',
			   encryptedData:''
			}
		},
		methods:{
			loginWithPass: function () {
				uni.navigateTo({
					url: '/pages/common/loginWithPass'
				})
			},
            xy: function (res) {
                this.Title = '花蓄注册协议'
                let self = this
                this.showModal = true
                uni.request({
                    url: 'https://newsapp.huaxuapp.com/api/news/huaxuagent',
                    success: (res) => {
                        self.content = res.data.Content
                    }
                })
            },
            ys: function (res) {
                this.Title = '隐私保护协议'
                let self = this
                this.showModal = true
                uni.request({
                    url: 'https://newsapp.huaxuapp.com/api/news/huaxuprivateagent',
                    success: (res) => {
                        self.content = res.data.Content
                    }
                })
            },
            close: function () {
                this.showModal = !this.showModal
            },
            getContent: function (content) {
                return htmlParser(content)
            },
			getuserinfoHandle(obj){
				console.log(obj)
				this.iv= obj.detail.iv
				this.encryptedData = obj.detail.encryptedData
				this.WXuserInfo = obj.detail.userInfo
				console.log(this.WXuserInfo,obj.detail.userInfo)
				if(Object.prototype.toString.call(this.WXuserInfo) === '[object Object]'){
					uni.login({//登陆接口
							provider:'weixin',
							scopes:'auth_base',
							timeout:20000,
					}).then(data=>{//返回一系列登陆信息
						var [err,res] = data
						console.log(res)
						if(res.code){
							var data ={
								js_code: res.code
							}
							// var data = {
							// 	appid: 'wx23eb62a318e72148',
							// 	secret: 'bec71eb5c4f5943bc2f24083bd6bbe55',
							// 	js_code: res.code,
							// 	grant_type: 'authorization_code'
							// }
							//'https://newsapp.huaxuapp.com/api/GetOpenid/getopenid'
							return this.$Request.get(this.$store.state.getopenidUrl,data)
						}else{
							setTimeout(()=>{
								this.$api.msg('数据异常')
							},500)
							uni.switchTab({
								url:'/pages/index/index'
							})
						}
					}).then(res=>{
						let res_ = JSON.parse(res.Data)
						console.log(res,res_)
						this.session_key = res_.session_key
						let pc = new WXBizDataCrypt('wx23eb62a318e72148', this.session_key)
						let data = pc.decryptData(this.encryptedData, this.iv)
						let unionid = data.unionId
						if(void(0)===unionid || void(0)===pc || void(0)===data){
							if('unionid' in res_){
								console.log(true)
								this.getIsBindData.openid=res_.unionid
								this.getDataWX.openid = res_.unionid
								this.getDataWX.unionid = res_.openid
							}else{	
								this.getIsBindData.openid=res_.openid
								this.getDataWX.openid = res_.openid
								this.getDataWX.unionid = res_.openid
							}
						}else{
							console.log(true,170)
							this.getIsBindData.openid= unionid
							this.getDataWX.openid = unionid
							this.getDataWX.unionid = res_.openid
						}
						//console.log(res_)
						// 可获取res.unionid
						return this.WXuserInfo
					}).then(res=>{
						this.getDataWX.nickname=res.nickName
						this.getDataWX.headimgurl=res.avatarUrl
						//判断这个微信是否绑定电话号码
						return this.$Request.get(this.isbindUrl,this.getIsBindData,false)
					}).then(res=>{
						console.log(this.getDataWX)
						if(res.IsSuccess){
							if(res.Data.isBind){//如果绑定了
								setTimeout(()=>{
									this.$api.msg('登陆成功',2000,false,'success')
								},500)
								this.$store.commit('login', res.Data.user)
								uni.switchTab({//跳去首页
									url: '/pages/index/index'
								})
							}else if(!res.Data.isBind){//如果没绑定
								console.log(1)
								uni.navigateTo({
									url:`/pages/common/phoneRegister/phoneRegisterPage?nickname=${this.getDataWX.nickname}&headimgurl=${this.getDataWX.headimgurl}&openid=${this.getDataWX.openid}&unionid=${this.getDataWX.unionid}`,
								})
							}
						}else{
							
						}		
					})
				}else{
					this.$api.msg('取消授权')
				}
			},
			logIn(provider){
				console.log()
				let self = this
				// #ifdef APP-PLUS
				//如果是微信或者新浪登录
				if(provider==='weixin' || provider==='sinaweibo'){
					uni.getProvider({//获取uniapp支持的第三方数据
						service:'oauth'
					}).then(data=>{
						var [err,res] = data
						var providers=res.provider//类型
						var flagIndex=providers.indexOf(provider)
						if(flagIndex>-1){
							return providers[flagIndex]
						}
					}).then(res=>{
						console.log(res)
						return uni.login({//登陆接口
							provider:res,
							scopes:'auth_base',
							timeout:20000,
						})
					}).then(data=>{//返回一系列登陆信息
						var [err,res] = data
						console.log(res)
						if(res.code){
							console.log(res.code)
						}else{							
							if(res.errMsg==="login:ok"){
								self.authResult=res.authResult
								return res.authResult
							}
						}
					}).then(res=>{//获取用户的信息
						return uni.getUserInfo({
							provider:provider,
							timeout:20000,
							withCredentials:true
						})
					}).then(data=>{//得到一些列用户信息
						var [err,res] = data 
						console.log(res)
						if(res.errMsg==="getUserInfo:ok"){
							return res
						}
					}).then(res=>{//发送请求判断是否绑定手机号的请求
						if(provider==='weixin'){//	
						console.log(res.userInfo.openId,102102102)
							//可获取unionId 
							console.log(res)
							if('unionId' in res.userInfo){
								console.log(true)
								//判断电话是否和微信绑定的请求参数
								self.getIsBindData.openid=res.userInfo.unionId
								//如果没有绑定微信的话，可能会再次发送请求，所以提前绑定
								self.getDataWX.nickname=res.userInfo.nickName
								self.getDataWX.headimgurl=res.userInfo.avatarUrl
								self.getDataWX.openid=res.userInfo.unionId
								self.getDataWX.unionid=res.userInfo.openId
							}else{
								console.log(false)
								//判断电话是否和微信绑定的请求参数
								self.getIsBindData.openid=res.userInfo.openId
								//如果没有绑定微信的话，可能会再次发送请求，所以提前绑定
								self.getDataWX.nickname=res.userInfo.nickName
								self.getDataWX.headimgurl=res.userInfo.avatarUrl
								self.getDataWX.openid=res.userInfo.openId
								self.getDataWX.unionid=res.userInfo.openId
							}
							//判断这个微信是否绑定电话号码
							return self.$Request.get(self.isbindUrl,self.getIsBindData,false)
						}else if(provider==='sinaweibo'){//如果绑定的是微博
							
						}
					}).then(res=>{
						console.log(self.getDataWX)
						if(provider==='weixin'){//如果是微信
							if(res.Data.isBind){//如果绑定了
								setTimeout(()=>{
									this.$api.msg('登陆成功',2000,false,'success')
								},500)
								this.$store.commit('login', res.Data.user)
								uni.switchTab({//跳去首页
									url: '/pages/index/index'
								})
							}else if(!res.Data.isBind){//如果没绑定
								console.log(1)
								uni.navigateTo({
									url:`/pages/common/phoneRegister/phoneRegisterPage?nickname=${self.getDataWX.nickname}&headimgurl=${self.getDataWX.headimgurl}&openid=${self.getDataWX.openid}&unionid=${self.getDataWX.unionid}`,
								})
							}
						}else{
							
						}
					})
				}
				// #endif
			} 
		},
	}
</script>

<style scoped lang="scss">
	.hx-btn {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin: 0 30upx;
	}
</style>
