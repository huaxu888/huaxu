<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="balance-nav" class="text-white" :isBack="true" >
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的商家</block>
			
			<!-- {{agentType==='2'?'我的团队':agentType==='3'?'我的商家':''}} -->
			
			<!-- #endif --> 
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">我的商家</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="bg-white">
			<view class="padding flex justify-between align-center" v-for="(item,i) of infoList" :key="i" style="border-bottom: 2upx solid #F0F0F0;" @tap="goToDetail(item)">
				
				<view class="flex align-center">
					<view 
						:style="{backgroundImage:`url(${agentType==='2' || agentType=== '3'?item.StorePic:agentType==='4'?item.LogoPic:''})`}" 
						
						class="title_img_log margin-right-sm">
					</view>
					
						<!-- //2是个贷 3高代 4//区代理 -->
					
					<view class="flex flex-direction align-start margin-left-sm">
						<text>{{item.StoreName}}</text>
						<text class="margin-top-sm text-gray text-xs">添加日期:{{beTime(item.AddDate)}}</text>
					</view>
				</view>
				
				<view class="flex flex-direction align-end text-sm">
					<text>店铺总营业额</text>
					<text class="text-red margin-top-sm">{{agentType==='2' || agentType=== '3'?item.ShopTotalNum:agentType==='4'?item.Totalprice:''}}元</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				infoList:[],
				getData:{
					userid:this.$store.state.userInfo.ID,
					page:1,
					pagesize:10
				},
				agentType:0
			}
		},
		onLoad(route){
			this.agentType = route.agentType
			//this.getCurryInfo()
		},
		onShow(){
			this.getCurryInfo()
		}, 
		methods: {
			getCurryInfo(loadFlag){
				let url = ''
				if(this.agentType==='2' || this.agentType==='3'){//个人代理 3高代
					url = this.$store.state.agentPoutMember
				}else if(this.agentType==='4'){//区域代理 商家信息
					url = this.$store.state.getagenTareamemberUrl
				}
				return this.$Request.get(url,this.getData,loadFlag).then(res=>{
					if(res.IsSuccess){
						if(this.getData.page===1){
							this.infoList = res.Data
							if(res.Data.length === 0){
								this.$api.msg('暂无数据',2000)
							}
						}else{
							this.infoList = [...this.infoList,...res.Data]
						}
						this.infoList.forEach((it,i)=>{
							if(this.agentType==='2'|| this.agentType==='3'){
								if('StorePic' in it){
									if(it.StorePic===''){
										it.StorePic = 'https://img.huaxuapp.com/pig.png'
									}
								}
							}else if(this.agentType==='4'){
								if('LogoPic' in it){
									if(it.LogoPic===''){
										it.LogoPic = 'https://img.huaxuapp.com/pig.png'
									}
								}
							}
						})
					}else{
						this.$api.msg(res.Msg,2000)
					}
				})
			},
			beTime(time){
				var date = new Date((time.split('(')[1].split(")")[0])*1)//计算出时间				//转换成 xxx-xx-xx
				return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
			},
			goToDetail(obj){
				console.log(obj)
				let url = '/pages/personalAgent/sonPage/performanceDetails'
				if(this.agentType==='2' || this.agentType==='3'){
					url = `${url}?agentType=${this.agentType}&UserID=${obj.UserID}&StoreID=${obj.StoreID}&StoreName=${obj.StoreName}`
				}else if(this.agentType==='4'){
					url = `${url}?agentType=${this.agentType}&UserID=${obj.UserID}&StoreID=${obj.StoreID}&StoreName=${obj.StoreName}`
				}
				uni.navigateTo({
					url
				})
			}
		},
		onPullDownRefresh() { //下拉时刷新
			this.getCurryInfo(false).then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() { //上拉加载
			this.getData.page += 1
			this.getCurryInfo(false)
		},
	}
</script>

<style>
	.title_img_log {
		width: 110upx;
		height: 110upx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
</style>
