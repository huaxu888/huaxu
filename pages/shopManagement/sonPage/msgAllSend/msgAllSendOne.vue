<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">群发短信</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<block slot="content">群发短信</block>
			<!-- #endif -->
		</cu-custom>	
		<!-- #endif -->
		<view class="padding-lr">
			<!-- <view class="margin-top">
				<view class="cu-form-group margin-top">
					<view class="title">{{vip===0?'开启':'关闭'}}短信提醒</view>
					<switch @change="SwitchA" :class="getSmsData.tag?'checked':''" :checked="getSmsData.tag?true:false"></switch>
				</view>
			</view> -->
			<view class="margin-tb bg-white" style="border-radius:10upx" v-for="(item,i) of infoList" :key="i">
				<view class="flex justify-between padding-sm text-gray bg-white" style="border-bottom: 2upx solid #F0F0F0;">
					<view class="flex align-end bg-white">
						<text class="text-red margin-right-xs">{{item.TotalNum}}</text>
						<text>位收件人</text>
					</view>
					<text>
						{{beTime(item.AddDate)}}
					</text>
				</view>
				
				<view class="flex text-lg text-bold padding-top padding-lr-sm bg-white">
					<text>{{item.Title}}</text>
				</view>
				
				<view class="padding-lr-sm padding-tb bg-white">
					<text style="white-space: pre-wrap;line-height: 1.5em;">
						{{item.SmsContent}}
					</text>
				</view>
			</view>
			
			
			
			<view class="btn_  flex justify-center" >
				<view class="flex flex-direction" style="width: 100%;">
					<button class="cu-btn bg-red  lg"  @tap="submit" style="border-radius: 0upx;">新建群发</button>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(route){
			this.getData.StoreID=route.StoreID
			this.getCurryInfo()
			this.getSmsData.tag = this.$store.state.userInfo.VIPLevel===0?false:true
		},
		onShow(){
			this.getCurryInfo()
			this.getSmsData.tag = this.$store.state.userInfo.VIPLevel===0?false:true
		},
		data(){
			return {
				vip:this.$store.state.userInfo.VIPLevel,
				switchA: 0,
				infoObj:{
				},
				infoList:[],
				getSmsData:{
					userid:this.$store.state.userInfo.ID,
					tag:0
				},
				getData:{
					userID:this.$store.state.userInfo.ID,
					StoreID:'',
					page:1,
					pagesize:10
				}
			}
		},
		onPullDownRefresh(){//下拉时刷新
			this.getData.page=1
			this.getCurryInfo().then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom(){//上拉加载
			this.getData.page+=1
			this.getCurryInfo()
		},
		methods:{
			SwitchA(e) {
				this.getSmsData.tag = e.detail.value===true?1:0
				console.log(this.$store.state.userInfo.VIPLevel)
				uni.showModal({
					title: '提示',
					content:e.detail.value===true?'是否开启短信提示？':'是否关闭短信提示？',
					success:  (res)=>{
						if (res.confirm) {
							this.getSmsData.tag = e.detail.value===true?1:0
							console.log(this.getSmsData)
							this.$Request.get(this.$store.state.resetsmsUrl,this.getSmsData).then(res=>{
								if(res.IsSuccess){
									this.$api.refreshUserInfo(this.$store.state.userInfo.ID,this).then(res=>{
										this.vip=this.$store.state.userInfo.VIPLevel
									})
								}
							})
							
						} else if (res.cancel) {
							this.getSmsData.tag = e.detail.value===true?0:1
							console.log(this.getSmsData)
							// this.$Request.get(this.$store.state.resetsmsUrl,this.getSmsData).then(res=>{
							// 	
							// })
						}
					}
				});
			},
			getCurryInfo(){
				console.log(this.getData)
				this.$Request.get(this.$store.state.myMsgListUrl,this.getData).then(res=>{
					console.log(res)
					if(res.IsSuccess){
						if(this.getData.page===1){
							this.infoList=res.Data
							if(this.infoList.length===0){
								this.$api.msg('暂无数据',2000)
							}
						}else{
							if(res.Data.length===0){
								this.$api.msg('已经到底啦',1500)
							}else{
								this.infoList=[...this.infoList,...res.Data]
								this.infoObj=res
							}
						}
					}
				})
			},
			beTime(time){
				var date = new Date((time.split('(')[1].split(")")[0])*1)//计算出时间				//转换成 xxx-xx-xx
				return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
			},
			submit(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/msgAllSend/msgAllSendTwo?StoreID=${this.getData.StoreID}`
				})
				// this.$api.showModal({
				// 	title:'您确定要群发信息吗？',
				// 	content:'群发信息将会扣除您的信息费用'
				// }).then(res=>{
				// 	if(res){
				// 		uni.navigateTo({
				// 			url:`/pages/shopManagement/sonPage/msgAllSend/msgAllSendTwo?StoreID=${this.getData.StoreID}&myStoreID=${this.myStoreID}`
				// 		})
				// 	}else{
				// 		this.$api.msg('取消群发信息',2000)
				// 	}
				// })
			}
		}
	}
</script>

<style >
	page{
		background:#F8F8F8
	}
	.btn_{
		position: fixed;
		width: 100%;
		left:0;
		right:0;
		bottom: 0;
		z-index: 1024;
	}
</style>
