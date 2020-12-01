<template>
	<view :class="showAnm?'animate':''">
		<view v-if="!showModal">			
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-white"  backColor="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">海报设计</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">海报设计</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		
		<view class="padding bg-white " :class="showModal?'suoxiao':'zhengchang'">
			
			<view class="flex align-center" style="position: relative;">
				
				<view class="showPeopleNum">
					已订购1233
				</view>
				
				<view class="logo_bgi">
					
				</view>
				
				<view class="margin-left" >
					<view class="text-bold text-xl">
						海报设计
					</view>
					
					<view class="margin-top-sm">
						<text v-for="(item,i) of showGuangGao" :key="i" class="margin-right-sm">
							{{item}}
						</text>
					</view>
				</view>
			</view>
		
			
			<view class="flex margin-bottom margin-top-xl">
				<view v-for="(item,i) of chooseList" :key="i" class="chooseItem padding-top flex justify-center align-center" @tap="chooseTitle(i)">
					<view :class="titleIndex===i?'chooseTrueIt' : ''">
						{{item.label}}
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="content" :class="showModal?'suoxiao':'zhengchang'">
			<view v-if="titleIndex===0">
				<fu-wujieshao></fu-wujieshao>
			</view>
			
			<view v-if="titleIndex===1" class="padding-lr">
				<fuwu-detaile></fuwu-detaile>
			</view>
			
			<view v-if="titleIndex===2" >
				<success-eg></success-eg>
			</view>
			
			<view v-if="titleIndex===3">
				<shengcheng-haibao @shengchenghaibao="shengchenghaibao"></shengcheng-haibao>
			</view>
		</view>
		
		<view class="fixed_bottom_  flex align-center" v-if="!showModal">
			<view style="width:26%;height:100%" class="bg-white flex justify-center align-center flex-direction" @tap="callPhone">
				<view class="hxIcon-kefuzhongxin" style="font-size: 65upx;">
					
				</view>
				<!-- <view>
					客服
				</view> -->
			</view>
			
			<view style="width:74%;height:100%;" :style="{'background':titleIndex!=3?'#e8c091':'#fe4e01'}"  class="  flex justify-center align-center" @tap="kaitong">
				<text style="font-size: 33upx;" :style="{color:titleIndex!=3?'#8d5b20':'white'}">{{titleIndex!=3?'立即开通':'在线生成'}}</text>
			</view>
		</view>
		
		
		
		<view v-if="showModal">
		
			<hai-bao :showModal="showModal"  @hidden="hiddenModal" :imgUrl="imgUrl"  @shareWx="shareWx" @downLoadImage="downLoadImage"></hai-bao>
		
		</view>
		
	</view>
</template>

<script>
	import fuWujieshao from './components/fuwujieShao.vue'
	import fuwuDetaile from './components/fuwuDetail'
	import successEg from './components/successEg'
	import shengchengHaibao from './components/shengchengHaibao'
	import haiBao from './components/haibao.vue'
	export default{
		onLoad(routeObj){
			this.StoreName = routeObj.StoreName
			this.StoreID = routeObj.StoreID*1
			console.log(routeObj)
		},
		data(){
			return {
				StoreName:'',//店铺名称
				StoreID:'',//店铺id
				showGuangGao:[
					'优质模板',
					'专业设计',
					'极速送达'
				],
				chooseList:[
					{
						label:'服务介绍',
						key:''
					},{
						label:'服务详情',
						key:''
					},
					
					{
						label:'成功案例',
						key:''
					},{
						label:'在线海报',
						key:''
					}
				],
				titleIndex:0,
				imgUrl:'',
				showModal:false,
				showAnm:false
			}
		},
		methods:{
			shengchenghaibao(){
				// this.showModal = true
				this.beeEwm()
			},
			
			
			shareWx(){				
				// #ifdef APP-PLUS
				console.log(12456)
				// #endif
				// #ifdef MP-WEIXIN
				console.log(3349)
				// #endif
			},
			async beeEwm() {//生成海报
				let success = true
				let data = {
					stroreid:this.StoreID*1,
					userid:this.userInfo_.ID*1
				}
				
				let loadingres = await this.$api.showLoading_({
					title: '正在生成中',
					mask: false
				})
				
				
				let res = await this.$Request.get(this.$store.state.getHbUrl,data)
				if(res.IsSuccess){
					
					// this.imgUrl = res.Data.split('?')[0]
					this.imgUrl = res.Data
					this.showModal = true
					console.log(res.Data);
				}else{
					this.$api.msg(res.Msg)
				}
				uni.hideLoading()
			},
			hiddenModal() {//关闭弹窗
				this.showModal = false
			},
			async downLoadImage() {//下载照片
				this.showAnm = true
				let [err,res] = await uni.downloadFile({
					url:this.imgUrl,
				})
				if(err){
					this.showAnm = false
					this.$api.msg('下载失败，请稍后再试',2000)
				}else{
					let filePath = res.tempFilePath
					console.log(filePath)
					uni.saveImageToPhotosAlbum({
						filePath: filePath,
						complete: (e) => {
							setTimeout(() => {
								this.showAnm = false
							}, 1500)
						}
					})
				}
			},
			chooseTitle(index){
				this.titleIndex = index
			},
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:'400-6688-352' 
				})
			},
			
			kaitong(){
				if(this.titleIndex!=3){
					this.$api.msg('暂未开放，敬请期待')
				}else{
					this.beeEwm()
				}
			},
		},
		components:{
			fuWujieshao,
			fuwuDetaile,
			successEg,
			shengchengHaibao,
			haiBao
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	
</style>

<style scoped>
	.zhengchang{
		transform: scale(1);
		transition: all 0.5s;
	}
	.suoxiao{
		transform: scale(0.8);
		transition: all 0.5s;
	}
	
	.animate {
		animation: fadeIn 1s 1;
	}
	.logo_bgi{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.91goodluck.com/hbsh127_03.png');
		width: 127upx;
		height: 127upx;
	}
	.showPeopleNum{
		position: absolute;
		top: 15upx;
		right: 30upx;
		color: #5B6A91;
	}
	.chooseItem{
		width: 33%;
	}
	.chooseTrueIt{
		color:#ff5b2e ;
		font-size: 34upx;
		position: relative;
	}
	.chooseTrueIt:after{
		content:'';
		position: absolute;
		height: 4upx;
		border-radius: 100upx;
		bottom:-20upx;
		left: 0upx;
		right: 0upx;
		background: #ff5b2e;
	}
	.fixed_bottom_{
		position: fixed;
		width:750upx;
		height: 88upx;
		bottom: 0upx;
		z-index:5000;
		transition: all 1s;
	}
	
	
	
	/*词海*/
	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}
	
	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}
	
	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}
	
	.qiun-common-mt {
		margin-top: 10upx;
	}
	
	.qiun-bg-white {
		background: #FFFFFF;
	}
	
	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}
	
	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}
	
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background: white;
	}
	/**/
</style>
