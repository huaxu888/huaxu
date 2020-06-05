<template>
	<view style="min-height:100vh;background:white;">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">提现明细</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">提现明细</block>
			<!-- #endif -->
		</cu-custom>	
		<!-- #endif -->
		<view>
			<view class="padding" style="background:#F8F8F8">
				<picker :mode="pikerData.mode" :fields="pikerData.fields" :value="pikerData.value" :start="pikerData.start"
					:end="pikerData.end" 
					@change="changeTime"
				>
					  <view class="flex align-center text-lg text-black text-bold">
						<text>{{pikerData.value}}</text>
						<text class="margin-left-xs  cuIcon-triangledownfill"></text>
					  </view>
				</picker>
			</view>
			<view class="main_content">
				<view class="padding flex justify-between align-center" v-for="(item,i) of infoList" :key="i" style="border-bottom: 2upx solid rgb(205,205,205);">
					<view style="width:25%" >
						<view>提现账号</view>
						<view class="margin-top-xs text-cut">{{item.Phone}}</view>
					</view>
					
					<view style="width:25%" class="margin-left">
						<view>提现金额</view>
						<view class="margin-top-xs text-cut">￥{{item.RealScore}}</view>
					</view>
					
					<view style="width:25%" class="margin-left">
						<view>实到金额</view>
						<view class="margin-top-xs text-cut">￥{{item.Score}}</view>
					</view>
					
					<text style="width:25%;">
						{{beTime(item.AddDate)}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(e){
			this.getData.storeid = e.storeid*1
			this.getTime()
			this.getCurryInfo()
		},
		data(){
			return {
				pikerData:{
					mode:'date',
					fields:'month',
					value:'2019-08',
					start:'2015-01',
					end:'2100-01'
				},
				getData:{
					day:'',
					storeid:'',
					page:1,
					pagesize:10
				},
				infoList:[]
			}
		},
		methods:{
			async changeTime(e){
				this.pikerData.value = e.detail.value
				this.getData.day = e.detail.value
				this.getData.page=1
				this.getData.pagesize=10
				this.getCurryInfo()
			},
			getTime(){
				let day = (new Date()).Format("yyyy-M")
				this.getData.day = day	
				this.pikerData.value = day
			},
		 	async getCurryInfo(){
				let info = await this.$Request.get(this.$store.state.getshoptxlistUrl,this.getData)
				let infoList = info.Data
				if(this.getData.page===1){
					if(infoList.length===0){
						let msgInfo =await this.$api.msg('暂无数据',2000)
					}
					this.infoList = infoList
				}else{
					if(infoList.length===0){
						this.$api.msg('已经到底啦')
					}else{
						this.infoList.push(...infoList)
					}
				}
				return infoList
			},
		},
		onPullDownRefresh(){//下拉时刷新
			this.getCurryInfo()
			uni.stopPullDownRefresh()
		},
		onReachBottom(){//上拉加载
			this.getData.page+=1
			this.getCurryInfo()
		},
	}
</script>

<style scoped>
</style>
