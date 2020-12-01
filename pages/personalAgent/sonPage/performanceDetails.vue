<template>
	<view>
		
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true" >
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">{{shopName}}</block>
			<!-- #endif --> 
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">{{shopName}}</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="padding-bottom padding-lr flex justify-between card_view">
			
			<view class="flex flex-direction justify-center margin-top align-center detail_item text-white" v-for="(item,i) of cardAry" :key ="i" :style="{background:item.bgc}">
				<view>{{item.label}}</view>
				<view style="margin-top:36upx;font-size: 40upx;">{{item.value}}</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(route){
			this.agentType = route.agentType
			if(this.agentType === '2' || this.agentType === '3'){
				this.getData_geRen.userid = this.$store.state.userInfo.ID
				this.getData_geRen.storeid = route.StoreID
				this.shopName = route.StoreName
			}else if(this.agentType === '4'){
				this.getData_geRen.userid = this.$store.state.userInfo.ID
				this.getData_geRen.storeid = route.StoreID
				this.shopName = route.StoreName
			}
			console.log(this.agentType)
			this.getCurryInfo()
		},
		data(){
			return {
				shopName:'',
				agentType:'',
				cardAry:[
					{
						label:'月收益额(￥)',
						value:0,
						bgc:'#ED706A',
						key:'realsum'
					},{
						label:'今日营业额(￥)',
						value:0,
						bgc:'#5BCACB',
						key:'todaysum'
					},{
						label:'月营业额(￥)',
						value:0,
						bgc:'#5CC86E',
						key:'totalmonthnum'
					}
					,{
						label:'店铺总收入(￥)',
						value:0,
						bgc:'#4099F6',
						key:'totalnum'
					}
				],
				getData_geRen:{
					userid:'',
					storeid:''
				},
				
			}
		},
		methods: {
			getCurryInfo(flag){
				let url = ''
				if(this.agentType === '2' || this.agentType==='3'){
					url = this.$store.state.agentpmemberdetail
				}else if(this.agentType === '4'){
					url = this.$store.state.getAgentareashopdetailUrl
				}
				console.log(this.agentType)
				return this.$Request.get(url,this.getData_geRen,flag).then(res=>{
					if(this.agentType === '2' || this.agentType==='3'){
						if(res.IsSuccess){
							this.cardAry.forEach((it,i)=>{
								let key = it.key
								if(key in res){
									let value = res[key]
									it.value = value
								}
							})
						}
					}else if(this.agentType === '4'){
						if(res.IsSuccess){
							this.cardAry.forEach((it,i)=>{
								let key = it.key
								if(key in res){
									let value = res[key]
									it.value = value
								}
							})
						}
					}
					return this.cardAry
				})
			}
		},
		// onPullDownRefresh(){
		// 	this.getCurryInfo(false).then(res=>{
		// 		uni.stopPullDownRefresh()
		// 	})
		// }
	}
</script>

<style>
	.card_view{
		flex-wrap:wrap
	}
	.detail_item{
		width:48%;
		height:188upx;
		border-radius: 10upx;
	}
</style>
