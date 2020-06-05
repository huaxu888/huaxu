<template>
	<view >
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">绑定营业员</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">绑定营业员</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view>
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
		</view>
	</view>
</template>

<script>
	import hxInput from '../../../../components/hxInput.vue'
	import {validatePhone} from '../../../../common/handle.js'
	export default{
		onLoad(route){
			this.getData.StoreID=route.StoreID
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
				this.getData.name=value
				console.log(value)
			},
			phoneHandle(value){
				this.getData.phone=value
				console.log(value)
			},
			submit(){
				//this.$Request.get(this.$store.state.bdsyyUrl)
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
				
			}
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>
