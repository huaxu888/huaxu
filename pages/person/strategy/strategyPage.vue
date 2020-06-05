<template>
	<view >
		<load-ing ref="loading"></load-ing>
		<view>
			<view v-for="(item,i) of 2" :key = "i"
				:class="i===0?'fixed_top_':''"
			>
				<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
				<cu-custom bgColor="bg-hx-red_" class="text-white" :isBack="true">
					<!-- #ifdef APP-PLUS || H5-->
					<block slot="content">玩转花蓄</block>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
					<block slot="backText">玩转花蓄</block>
					<!-- #endif -->
				</cu-custom>
				<!-- #endif -->
				<view class="padding-lr padding-bottom-lg flex align-center justify-between" style="background: #EC404C;">
					<view class="flex flex-direction align-start justify-center" @tap="Invitation">
						<view class="yq_xinren"></view>
						<view class="zc_btn" ></view>
					</view>
					
					<view class="hb_image">
						
					</view>
				</view>
				
				<view class="padding-top content_list">
					
					<view class="padding-lr flex align-end justify-between" @tap="goToDetailNews">
						<view class="text-df text-bold">新手必看</view> 
						<view class="text-sm">更多<text class="margin-left-xs cuIcon-right"></text></view>
					</view>
					
					<view style="position: relative;">
						<swiper class="card-swiper"  :class="dotStyle?'square-dot':'round-dot'"  :circular="true"
						 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" 
						>
							<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
								<view class="swiper-item" @tap="goToDetailSwiper(item)">
									<view class="swiper_item " :style="{'background-image':`url(${item.PicURL})`}"></view>
								</view>
							</swiper-item>
						</swiper>	
						<view style="height:34upx;background:#F0F0F0;position: absolute;width:100%;bottom:10upx;">
							
						</view>
					</view>
				</view>
				
			</view>
			
			
			
			<view >
				<view class="padding-left">
					<text class="text-black text-bold text-df">常见问题</text>
				</view>
				<view class="padding-lr" v-for="(item,i) of problemList" :key="i">
					<list-Item :objItem="item" @goToDetailList="lookDetail"></list-Item>
				</view>
			</view>
			
		</view>
		<modal :showFail="false" @hidden="hidden" :showModal="showModal"  :Content="Content" :Title="Title" :successLabel="successLabel"></modal>
	</view>
</template>

<script>
	import listItem from './components/listItem'
	import modal from '@/components/modal.vue'
	export default{
		data(){
			return {
				cardCur: 0,
				swiperList:['http://img.huaxuapp.com/xszn.jpg','http://img.huaxuapp.com/cjwt.jpg','http://img.huaxuapp.com/wzhx.jpg'],
				problemList:[],
				dotStyle:true,
				showModal:false,
				successLabel:'已读',
				type:'other',
				Content:'',
				Title:'',
				getData:{
					siteid:0
				}
			}
		},
		onLoad(){
			// setTimeout(()=>{
			// 	this.$refs.loading.hidden()
			// },2000)
			this.getCurryInfo()
		},
		onShow(){
			
		},
		methods: {
			hidden(flag){
				this.showModal = false
			},
			getCurryInfo(){
				return this.$Request.get(this.$store.state.huaxucommonproblemUrl,this.getData,false).then(res=>{//常见问题
					if(res!=null){
						this.problemList = res
					}
					return	this.$Request.get(this.$store.state.huaxumustseeUrl,this.getData,false).then(res=>{//新手问题
						this.swiperList = res
						this.$refs.loading.hidden()
						return
					})
					
				})
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			goToDetailSwiper(val){
				uni.navigateTo({
					url:`/pages/person/strategy/sonPage/strategyDetail?nid=${val.ID}`
				})
			},
			lookDetail(val){
				this.showModal=true
				this.Title = val.Title
				this.Content = `<p style="line-height:30px">${val.Content}</p>`                                
			},
			goToDetailNews(){
				uni.navigateTo({
					url:'/pages/person/strategy/sonPage/newsList'
				})
			},
			Invitation(){
				const flag = this.$store.state.hasLogin
				console.log(3349,flag)
				if(flag){
					// #ifdef APP-PLUS || H5
					uni.navigateTo({
						url:'/pages/person/share'
					})
					// #endif
					// #ifdef MP-WEIXIN
					this.$api.msg('请点击右上角的转发按钮,分享给你的朋友们哦~',2000)
					// #endif
				}else{
					uni.navigateTo({
						url:'/pages/common/loginWithPass'
					})
				}
			}
		},
		components: {
			listItem,
			modal
		},
		onPullDownRefresh() { //下拉时刷新
			this.getCurryInfo().then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		onShareAppMessage(obj) {
		   return {
				title: '在吗？花出去的钱还能变储蓄，你知道吗？',
				imageUrl: 'http://img.huaxuapp.com/xcxtr.jpg',
				path: `/pages/index/index?tjrid=${this.$store.state.userInfo.ID || 0}`
			}
		 }
	}
</script>

<style scoped>
	.fixed_top_{
		position: fixed;
		width: 100vw;
		top: 0px;
		z-index: 1000;
	}
	.yq_xinren{
		background: url(http://img.huaxuapp.com/xinren.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width:336upx;
		height:120upx
	}
	.zc_btn{
		background: url(http://img.huaxuapp.com/lijilingqu.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width:154upx;
		height:46upx;
		position: relative;
		left:20upx;
		top:-25upx 
	}
	.hb_image{
		background: url(http://img.huaxuapp.com/playhongbao.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width:218upx;
		height:208upx
	}
	.content_list{
		background:white;
		position:relative;
		top:-40upx;
		border-radius: 40upx 40upx 0upx 0upx ;
	},
	.swiper_item{
		width:600upx;
		height:260upx;
		border-radius: 10upx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
