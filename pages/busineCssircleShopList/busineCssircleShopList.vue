<template>
	<view style="position: relative;">
		<!-- #ifdef MP-WEIXIN -->
		<view class="text-lg back_btn flex justify-center align-center" @tap="back" v-if="!showNavigation">
			<text class="cuIcon-back text-white" style="font-size: 45upx;"></text>
		</view>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" v-if="showNavigation">
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">商圈详情</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view class="busineTitlebgi" :style="{'background-image':`url(${titleBgi})`}">
			
		</view>
		
		
		<view style="padding-top: 40upx;margin-top:-100upx;" class="padding-lr-xs">
			<view class="padding-tb-sm " style="border-radius: 20upx 20upx 0upx 0upx;background: #F8F8F8;">
				<top-select :inconListAll="inconListAll" :judge="judge"  @iconTap="iconTap" :scrollLeft="scrollLeft">
					
				</top-select>
			</view>
			
			<!--内容-->
			<view class="content_ margin-top padding-lr-sm  flex justify-between " :class="showLeftAnimate?'animateLeft':showRightAnimate?'animateRight':''">
			<!-- :class="animateFlag?'animate2':''" -->
				<view class="column_item flex flex-direction">
					<view v-for="(item,i) of leftInfoAry" :key="i" class="margin-bottom">
						<shop-item @goToDetails="goToDetails" :itemObj="item"></shop-item>
					</view>
				</view>
			
				<view class="column_item flex flex-direction">
					<view v-for="(item,i) of rightInfoAry" :key="i" class="margin-bottom">
						<shop-item @goToDetails="goToDetails" :itemObj="item"></shop-item>
					</view>
				</view>
				
				<!-- <view class="flex flex-direction" style="width: 100%;">
					<view v-for="(item,i) of InfoAry" :key="i" class="margin-bottom"> 
					<shopItem @goToDetails="goToDetails" :itemObj="item"></shopItem>
					</view>
				</view> -->
				
			</view>

		</view>
		
	</view>

</template>

<script>
	import shopItem from '../menuSort/components/shopItem'
	import topSelect from './components/topSelect'
	export default {
		async onLoad(option){
				uni.getLocation({
					success: res => {
						this.location = [
							res.latitude,
							res.longitude
						]
						this.$store.commit('setLatitudeAndLongitude', {
							latitude:res.latitude,
							longitude:res.longitude
						})
					},
					fail: err => {
						this.location = []
						uni.showModal({
							title: '拒绝授权',
							content: '您拒绝花蓄使用的位置权限，我们将无法为您提供基于位置的服务',
							showCancel: false
						})
					}
				})
				if(this.$store.state.longitude){
					this.getData = {
						//请求需要的数据
						storesortid:0,
						siteid:0,
						getsort:1,//也是目标标签的样式改变的index
						page:1,
						pagesize:10,
						Location:`${this.$store.state.longitude},${this.$store.state.latitude}`//地理位置
					}
				}
				if(this.$store.state.longitude == 0){
					this.getData = {
						//请求需要的数据
						storesortid:0,
						siteid:0,
						getsort:1,//也是目标标签的样式改变的index
						page:1,
						pagesize:10,
						Location:`${this.$store.state.longitude},${this.$store.state.latitude}`//地理位置
					}
				}
			
			console.log(option)
			if(option.BusPics.length!=0){
				this.titleBgi = option.BusPics
			}
		
			this.getCurryInfoData(option)
			
		},
		data(){
			return{
				showLeftAnimate:false,
				showRightAnimate:false,
				busid:4,//商圈id为4
				infoList:[],
				getData:{
					
				},
				infoUrl:this.$store.state.listbysortUrl,//请求店铺接口
				scrollLeft:0,//移动图标的位置
				inconListAll:[
					{
						StoreSortID: 0,
						StoreSortName:"全部"
					}
				],
				judge:0,
				isALL:true,//是否显示该商圈全部的店铺
				showNavigation:false,
				titleBgi:'https://img.huaxuapp.com/shopListTitleBgi.png',
				location: '107.02,33.07',
				amapPlugin: null, //高德的配置
				key: '2b60666c9954c824e769604cbeb61457',
				adcode: '610702',//区划码  默认是汉台
			}
		},
		methods:{
			back(){
				uni.navigateBack({})
			},
			async getCurryInfoData(option){//获取当前页面的所需数据
				this.getData.siteid = this.site_.SiteID//读取站点id
				this.busid = option.busid*1//读取商圈id
				
				if(!this.busid){//读取该商圈的所有店铺分类				
					this.busid = 4
				}
				
				console.log(this.busid)
				
				this.getData.busid = this.busid
				let inconListAll = await this.$Request.get(this.$store.state.getstoresortlist,{
					busid:this.busid,
					num:0
				},false)
				this.inconListAll = [...this.inconListAll,...inconListAll]
				this.getCurryBusineShopInfo('right')//获取当前页面信息
			},
			
			
			async getCurryBusineShopInfo(showAnimate){//获取当前页面的数据
				let getData = {}
				if(this.isALL){//是否为全部
					this.infoUrl = this.$store.state.getbusiness//获取全部的列表
					getData = {//得到商圈id
						busid : this.busid
					}
				}else{
					getData = this.getData
					this.infoUrl = this.$store.state.businessListbysort
				}
				let res = await this.$Request.get(this.infoUrl,getData,false)
				if(showAnimate==='left'){
					this.showLeftAnimate = true
				}else if(showAnimate==='right'){
					this.showRightAnimate = true
				}
				if(this.isALL){//显示全部数据
					if(res.IsSuccess){
						if(res.Data.length===0){//数据为空
							this.$api.msg('暂无数据')
						}else{
							this.infoList = res.Data
						}
					}
				}else{//根据类别显示数据
					if(res.length===0){
						this.$api.msg('暂无数据')
					}else{						
						if(this.getData.page===1){
							this.infoList = res
						}else{
							this.infoList = [...this.infoList,...res]
						}
					}
				}
			},
			
			
			iconTap(infoObj){//图标点击选择事件
				let obj = infoObj.item
				let StoreSortName = obj.StoreSortName
				obj.indexId = infoObj.index
				let showWhat = ''
				this.showLeftAnimate = false
				this.showRightAnimate = false
				console.log(StoreSortName)
				if(StoreSortName==='全部'){
					console.log(3349)
					this.isALL = true
				}else{
					console.log(3348)
					this.isALL = false
					this.getData.page=1//初始化页面page
					console.log(this.judge,obj.indexId)//之前的图标和现在的图标坐标
					this.getData.storesortid = obj.StoreSortID*1//初始化分类的storesortid
					console.log(obj.StoreSortID*1)
				}
				if(obj.indexId>this.judge){
					showWhat = 'left'
				}else{
					showWhat = 'right'
				}
				
				this.judge=obj.indexId//计算图标的index
				this.scrollLeft=(obj.indexId)*40//计算图标位置
				this.getCurryBusineShopInfo(showWhat)//发送请求
			},
			
			
			goToDetails(objInfo){//详情页面的路由跳转
				if (getApp().globalData.isAudit) {
					uni.navigateTo({
						url: `/pages/shopDetail/shopDetailPage?StoreID=${objInfo.StoreID}`
					})
				} else {
					uni.navigateTo({//获取具体店铺的StoreID
						url:`/pages/shopDetail/shopDetailPage?StoreID=${objInfo.StoreID}`
					})
				}
			},
		},
		components:{
			shopItem,
			topSelect
		},
		computed:{
			InfoAry(){
				var Ary=[]
				this.infoList.forEach((it,i)=>{
					Ary.push(it)
				})
				return Ary
			},
			leftInfoAry(){//瀑布流左边的信息
				var leftAry=[]
				this.infoList.forEach((it,i)=>{
					if(i%2===0){
						leftAry.push(it)
					}
				})
				return leftAry
			},
			rightInfoAry(){//瀑布流右边的信息
				var rightAry=[]
				this.infoList.forEach((it,i)=>{
					if(i%2!=0){
						rightAry.push(it)
					}
				})
				return rightAry
			},
		},
		onPageScroll(scroll) {
			if(scroll.scrollTop >= 95) {
				this.showNavigation = true
			} else {
				this.showNavigation = false
			}
		},
		async onPullDownRefresh(){//下拉时刷新
			if(!this.isALL){
				this.getData.page=1
			}
			await this.getCurryBusineShopInfo()
			uni.stopPullDownRefresh()
		},
		onReachBottom(){//上拉加载
			if(!this.isALL){
				if(this.infoList.length>=10){
					this.getData.page+=1
					this.getCurryBusineShopInfo()
				}
			}
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.content_{
		width:100%;
	}
	.column_item{
		width:48%
	}
	.busineTitlebgi{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		/* background-image: url('https://img.huaxuapp.com/shopListTitleBgi.png'); */
		height: 330upx;
		width: 100%;
	}
	
	.back_btn{
		width:60upx;
		height: 60upx;
		background: rgba(36,36,36,0.7);
		border-radius: 50%;
		position: absolute;
		top:60upx;
		left:40upx;
	}
	
	.animateLeft{animation:slideInLeft   0.45s 1;}
	
	.animateRight{animation:slideInRight   0.45s 1;}
</style>
