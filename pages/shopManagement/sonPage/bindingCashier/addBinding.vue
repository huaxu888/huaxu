<template>
	<view >
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-colorss" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">添加员工</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">添加员工</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<!-- <view>
			<view>
				<hx-Input :hasLRPadding="true" placeholder="请输入手机号" @input="phoneHandle"></hx-Input>
			</view>
			<view>
				<view class="padding">请选择营业员类型</view>
				<radio-group class="block margin-top-sm"  @change="RadioChange">
					<view class="cu-form-group" v-for="(item,index) of changeList" :key="index">
						<view class="flex  align-center  margin-left-sm">
							<view class="margin-left-sm">{{item.text}}</view>
						</view>
						<radio class='red margin-left-sm ' :class="getData.radio==item.value?'checked':''" :checked="getData.radio==item.value?true:false" :value="item.value"></radio>
					</view>
				</radio-group>
			</view>
			<view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">确定添加</button>
				</view>
			</view>
		</view> -->
		<view style="margin-top: 20upx;">
			<view class="cu-form-group" style="padding-bottom: 20upx;">
				<view class="title" style="font-weight: 600;">手机号</view>
				<input placeholder="输入的手机号必须为花蓄会员" name="number" @input="phoneHandle"></input>
			</view>
			<view class="cu-form-group" style="padding: 30upx 0;border-bottom: 1px solid rgb(238, 238, 238);">
				<view class="title" style="font-weight: 600;">职级</view>
				<input placeholder="请选择" name="input" style="padding-left: 30upx;" disabled="false" :value="index == 1 ? '店长' : '收银员'"></input>
				<view class="cu-capsule radius" style="background-color: #FFFFFF;">
					<view style="width: 120upx;padding: 8upx 0;border-radius: 40upx;text-align: center;" 
					:class="index == 1 ? 'dianshou' : 'xians'" @tap="dian">
						店长
					</view>
					<view style="width: 120upx;padding: 8upx 0;border-radius: 40upx;margin-left: 30upx;
					text-align: center;" @tap="shou" :class="index == 2 ? 'dianshou' : 'xians'">
						收银员
					</view>
				</view>
			</view>
			
		</view>
		<view style="margin-top: 50upx;">
			<view class="padding flex flex-direction" style="padding-top: 0upx;">
				<button class="cu-btn margin-tb-sm lg" style="background-color: rgb(250, 222, 189);color: rgb(141, 91, 32);font-size: 33upx;" @tap="submit">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import hxInput from '../../../../components/hxInput.vue'
	import {validatePhone} from '../../../../common/handle.js'
	export default{
		onLoad(route){
			this.getData.StoreID=route.StoreID
			this.index = 1
			this.getData.radio = 2
		},
		data(){
			return {
				getData:{
					radio:1,
					phone:''
				},
				changeList:[
					{
						text:'收银员',
						value:'1'
					},{
						text:'店长',
						value:'2'
					}
				],
				index: 0
			}
		},
		components:{
			hxInput
		},
		methods:{
			RadioChange(e){
				this.getData.radio = e.detail.value*1;
			},
			nameHandle(value){
				this.getData.name = value
				console.log(value)
			},
			phoneHandle(value){
				this.getData.phone = value.detail.value
				console.log(value)
			},
			submit(){
				//this.$Request.get(this.$store.state.bdsyyUrl)
				if(this.getData.phone != this.$store.state.userInfo.Phone){
					if(!validatePhone(this.getData.phone,this)){
						this.$api.msg('您输入的电话号码格式有误',2000)
						return 
					}else{					
						return this.$Request.get(this.$store.state.bdsyyUrl,this.getData).then(res=>{
							if(!res.IsSuccess){
								this.$api.msg(res.Msg,2000)
								return 
							}else{
								uni.navigateBack({
									
								})
							}
						})
					}
				} else {
					this.$api.msg('自己不能添加自己',2000)
					return
				}
			},
			dian(){
				this.index = 1
				this.getData.radio = 2
			},
			shou(){
				this.index = 2
				this.getData.radio = 1
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
	
	.dianshou {
		background-color: rgb(250, 222, 189);
		color: rgb(141, 91, 32);
		border: 1px solid #FFFFFF;
	}
	
	.xians {
		border:1px solid #b1b1b1;
	}
</style>
