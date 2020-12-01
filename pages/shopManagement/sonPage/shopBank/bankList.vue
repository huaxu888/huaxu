<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">商铺对公账户</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">商铺对公账户</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="content_list" >
			<view v-for="(item,i) of infoList" :key="i" style="width: 100%;border-bottom:2upx solid #DDDDDD;" class="bg-white">
				<view class="padding flex align-center justify-between">
					
					<view class="flex align-center">
						
						<view class="flex flex-direction align-center margin-right-sm">
							<text class="margin-bottom-xs text-cut" style="max-width:175upx;">
								卡号
							</text>
							<text class="text-sm">{{item.BankNo}}</text>
						</view>
						
						<view class="flex flex-direction align-center">
							<text class="text-sm margin-bottom-xs">默认提现账户</text>
							<text class="text-sm">{{item.IsDefault?'是':'否'}}</text>
						</view>
					</view>

					<view class="flex flex-direction padding-left-sm" style="border-left: 2upx solid #DDDDDD">
						
						<view>
							<text  class="padding-xs  margin-right-xs  btn_item_" @tap="deletBank(item)">删除</text>
						</view>
						
						<view class="margin-top">
							<text class="padding-xs   margin-right-xs btn_item_" @tap="setDefault(item)">设置默认账号</text>
						</view>
						
					</view>
				</view>
			</view>
			
			
			
			
			<view class="flex flex-direction align-center margin-top" style="width: 100%" @tap="addBank">
				<text style="color: #ec3b46;font-size: 120upx;" class="hxIcon-tianjiashouyinyuan"></text>
				<text>请添加银行卡</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		async onLoad(route){
			this.getData.storeid=route.storeid
			await this.getCurryInfo()
		},
		async onShow(){
			console.log(3349)
			await this.getCurryInfo()
		},
		data(){
			return{		
				getData:{
					storeid:''
				},
				infoList:[]
			}
		},
		methods:{
			async getCurryInfo(){
				let res = await this.$Request.get(this.$store.state.getShopBankList,this.getData,false)
				if(res.IsSuccess){
					this.infoList =res.Data
				}else{
					this.infoList=[]
					this.$api.msg(res.Msg,2000)
				}
			},
			addBank(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/shopBank/addBank?storeid=${this.getData.storeid}`
				})
			},
			async setDefault(item){
				let title = "设置提现银行账户";
				let content = ''
				if(item.IsDefault){
					content = '取消该卡为默认提现账户'
				}else{
					content = '设置该卡为默认提现账户'
				}
				let modalRes = await this.$api.showModal({
					title,
					content:'设置该卡为默认提现账户'
				})
				if(modalRes){
					let getData = {
						storeid:this.getData.storeid,
						storebankid:item.StoreBankID
					}
					let res = await this.$Request.get(this.$store.state.setShopBankDefault,getData)
					if(res.IsSuccess){
						await this.$api.msg(res.Msg,1500,false,'success')
						this.getCurryInfo()
					}else{
						await this.$api.msg(res.Msg,1500)
					}
				}else{
					this.$api.msg('取消设置',2000)
				}
			},
			async deletBank(item){
				uni.showModal({
					title: '删除银行卡',
					content: '删除银行卡后将影响您的提现操作，请确认您是否要删除',
					confirmText: '删除',
					cancelText: '取消',
					success: async res => {
						if (res.confirm) {
							let res =  await this.$Request.get(this.$store.state.deletShopBank,{
								storebankid:item.StoreBankID
							})
							if(res.IsSuccess){
								await this.$api.msg(res.Msg,1500,false,'success')
								this.getCurryInfo()
							}else{
								await this.$api.msg(res.Msg,1500)
							}
						}
					}
				})
			}
		},
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	.btn_item_{
		border:2upx solid #DDDDDD;
		border-radius: 10upx;
	}
	.btn_item_:active{
		background: grey;
		color: white;
	}
</style>
