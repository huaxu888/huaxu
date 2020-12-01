<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-white" :isBack="true" style="border-bottom: 2upx solid #e4e4e4;">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">我的商户列表</block>
			
			<!-- {{agentType==='2'?'我的团队':agentType==='3'?'我的商家':''}} -->
			
			<!-- #endif --> 
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">我的商户列表</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="bg-white">
			<view class="padding flex justify-between align-center" v-for="(item,i) of infoList" :key="i" style="border-bottom: 2upx solid #F0F0F0;" @tap="goToDetail(item)">
				
				<view class="flex align-center">
					<view v-if="agentType==='4'">
						<view v-if="item.StoreList.IsLock" style="margin-right: 10upx;line-height: 26upx;text-align: center;width: 70upx;height: 26upx;border-radius: 20upx;background-color: #999999;font-size: 22upx;color: #ffffff;">
							下架
						</view>
					</view>
					<view v-if="agentType==='2' || agentType==='3'">
						<view v-if="item.IsLock" style="margin-right: 10upx;line-height: 26upx;text-align: center;width: 70upx;height: 26upx;border-radius: 20upx;background-color: #999999;font-size: 22upx;color: #ffffff;">
							下架
						</view>
					</view>
					<view  style="border-radius: 10upx;"
						:style="{backgroundImage:`url(${agentType==='2' || agentType=== '3'?item.StorePic:agentType==='4'?item.LogoPic:''})`}" 
						
						class="title_img_log margin-right-sm">
					
					</view>
						<!-- //2是个贷 3高代 4//区代理 -->
					<!-- <text v-if="defaultDiscount != 1 || itemObj.IsZK"  >{{ itemObj.IsZK && itemObj.zk != 1 ? itemObj.zk * 10000/1000 : defaultDiscount * 10 }}折</text> -->
					<view class="flex flex-direction align-start margin-left-sm" style="margin-left: 10upx;">
						<text>{{yinHangs(item.StoreName)}}<text class=" bg-orange radius" style="padding: 4upx;font-size: 22upx;margin-left: 10upx;" v-if="item.ZK<1">{{ item.ZK * 10000/1000 }}折</text></text>
						<text class="margin-top-sm text-gray " style="font-size: 22upx;">入驻日期:{{beTime(item.AddDate)}}</text>
					</view>
				</view>
				
				<view class="flex flex-direction align-end text-sm">
					<text>总营业额</text>
					<text class=" margin-top-sm" style="color: #fe4e01;">{{agentType==='2' || agentType=== '3'?item.ShopTotalNum:agentType==='4'?item.Totalprice:''}}元</text>
				</view>
			</view>
		</view>
		
		<view style="text-align: center;height: 400upx;margin-top: 180upx;" v-if="!infoList">
			<image src="https://img.huaxuapp.com/wukong.png" mode="aspectFill" style="width: 376upx;height: 250upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">您还没有推广的商户哦~</text>
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
										it.StorePic = 'https://img.huaxuapp.com/huaxulogo70px.png'
									}
								}
							}else if(this.agentType==='4'){
								if('LogoPic' in it){
									if(it.LogoPic===''){
										it.LogoPic = 'https://img.huaxuapp.com/huaxulogo70px.png'
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
			},
			yinHangs(bankNumber){
				if(bankNumber.length > 8){
					return bankNumber.substr(0,8)+"...";
				} else {
					return bankNumber;
				}
			},
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
