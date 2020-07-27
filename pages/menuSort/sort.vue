<template>
	<view class="bg-gray">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content" class="text-bold">为您服务</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText" class="text-bold">为您服务</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		 <!--分类-->
		 <view class="top_swiper padding-tb-sm bg-white">
			 <swiper-icon :inconListAll="inconListAll" :judge="judge"  @iconTap="iconTap" :scrollLeft="scrollLeft"></swiper-icon>
		 </view>
		 
		 <view class="margin-top-sm bg-white padding-tb">
			 <!--标签-->
			 <view>
			 	<view class="hx_tab flex  padding-lr">
			 		<view class="flex justify-center align-center padding-sx tab_item" @tap="tabSelects" :class="index===0?'tapClass':''">
			 			<view class="text-sm">全部</view>
			 		</view>
			 		<view v-for="(item,i) of tabList" :key="i" style="margin-left: 20upx;" class="flex justify-center align-center padding-sx tab_item" @tap="tabSelect(item,i)" :class="index===i+1?'tapClass':''">
			 			<view class="text-sm">{{item.StoreSortName}}</view>
			 		</view>
			 	</view>
				
				
				<!-- <hx-tab :tabSelects="tabSelects" :infoList="infoList" :tabList="tabList" :getData="getData" :showTabFlag="index" @tabSelect="tabSelect"></hx-tab> -->
			 </view>
			 <!--内容-->
			 <view class="content_ margin-top padding-lr flex justify-between "
				:class="animateFlag?'animate2':''"
			 >
				
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
	import swiperIcon from './components/topSwiper'
	import hxTab from '../../components/hxTab.vue'
	import shopItem from './components/shopItem.vue'
	import {getPageAllInfo as sortMixins} from '../../mixins/qymMixins.js'
	export default {
		mixins:[sortMixins],
		data(){
			return {
				animateFlag:false,
				inconList:this.$store.state.cuIconList,//图标库
				infoUrl:this.$store.state.listbysortUrl,//请求店铺接口
				infoList:[],//请求到的信息列表
				judge:1,//图标跳转的具体位置下标
				scrollLeft:0,//移动图标的位置
				location: '107.02,33.07',
				amapPlugin: null, //高德的配置
				key: '2b60666c9954c824e769604cbeb61457',
				adcode: '610702',//区划码  默认是汉台
				longs:0,
				lat:0,
				getData:{
					
				},
				tabList:[
					
				],
				StoreSortID:[],
				index:0
			}
		},
		components:{
			swiperIcon,
			hxTab,
			shopItem
		},
		
		// onShow(){
		// 	this.changeAnimateFlag()
		// },
		
		onLoad(option){
			
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
			
			// uni.getStorage({
			// 	key:'site',
			// 	success:(e) => {
			// 		let location = e.data.Location
					
			// 		this.longs = location.split(",")[0]
			// 		this.lat = location.split(",")[1]
					
			// 		this.$store.state.longitude = this.longs
			// 		this.$store.state.latitude = this.lat	
			// 	}
			// })`${this.$store.state.longitude},${this.$store.state.latitude}`
			

			this.getData.siteid = this.site_.SiteID

			this.changeAnimateFlag()
			this.getRouteInfo(option).then(res=>{//获取路由进行处理
				this.getData.storesortid=res//获取分类的id
				return
			}).then(res=>{
				this.$http.fenLei(this.getData.storesortid).then(res=>{
					this.tabList = res
				})
				this.$http.fenLeis(this.getData.storesortid,0,this.getData.siteid,this.getData.getsort = 1,this.getData.page = 1,this.getData.pagesize =10,this.getData.Location).then(res=>{
					this.infoList = res
				})
			})
			
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
			inconListAll(){//去除’分类‘这个图标后的图标信息数组
				return this.changInconList()
			}
		},
		methods:{
			tabSelects(){
				this.index = 0
				this.$http.fenLeis(this.getData.storesortid,0,this.getData.siteid,1,this.getData.page,10,this.getData.Location).then(res=>{
					this.infoList = res
				})
			},
			changInconList(){//去掉’分类图标‘
				let ary = this.inconList.filter((it,i)=>{
					if(it.StoreSortID!=0){
						return it
					}
				})
				return ary
			},
			getRouteInfo(option){//获取路由信息 进行处理
				return new Promise((resolve,rej)=>{
					this.changInconList().forEach((it,i)=>{//先把’分类‘图标去掉
						if(it.StoreSortName===option.StoreSortName){//判断用户点击的是哪个图标
							this.judge=i//初始化页面的图标位置
							this.scrollLeft=this.judge*60//初始化图标移动位置
						}
					},);
				resolve(option.StoreSortID)//promise吐出去，方便链式调用
				})
			},
			tabSelect(obj,i){//tab选择事件
				console.log(obj);
				this.index = i + 1
				this.changeAnimateFlag()
				this.getData.page=1//初始化页面page
				this.getData.getsort=obj.id//获取getsortID
				
				this.$http.fenLeis(this.getData.storesortid,obj.StoreSortID,this.getData.siteid,this.getData.getsort = 1,this.getData.page = 1,this.getData.pagesize =10,this.getData.Location).then(res=>{
					console.log(res); 
					this.infoList = res
				})
			},
			iconTap(infoObj){//图标点击选择事件
				this.changeAnimateFlag()
				this.index = 0
				
				let obj = infoObj.item
				obj.indexId = infoObj.index
				console.log(obj)
				this.getData.page=1//初始化页面page
				this.getData.storesortid=obj.StoreSortID*1//初始化分类的storesortid
				this.getData.getsort=1//初始化getsortID
				this.judge=obj.indexId//计算图标的index
				this.scrollLeft=(obj.indexId)*40//计算图标位置
				console.log(this.getData)
				
				this.$http.fenLei(this.getData.storesortid).then(res=>{
					console.log(res); 
					this.tabList = res
				})
				
				this.$http.fenLeis(this.getData.storesortid,obj.StoreSortID,this.getData.siteid,this.getData.getsort = 1,this.getData.page = 1,this.getData.pagesize =10,this.getData.Location).then(res=>{
					console.log(res); 
					this.infoList = res
				})
			},
			goToDetails(objInfo){//详情页面的路由跳转
				if (getApp().globalData.isAudit) {
					uni.navigateTo({
						url: `/pages/shopDetail/shopDetailPage?StoreID=${objInfo.StoreID}`
					})
				} else {
					uni.navigateTo({//获取具体店铺的StoreID
						url: `/pages/shopDetail/orderFood/newOrderFood?storeId=${objInfo.StoreID}&storeName=${objInfo.StoreName}`
					})
				}
			},
			changeAnimateFlag(){
				this.animateFlag=true
				setTimeout(()=>{
					this.animateFlag=false
				},800)
			},
			
			async getRegeo() {
				let res = await this.adcodePromise().then(res=>{
					this.location = res.location;
					this.adcode = res.addressName.replace(/\"/g, "");
				}).catch(err =>{
			
				});
			},
			adcodePromise() {
				return  new Promise((resolve, reject) => {
					new amap.AMapWX({
						key: this.key
					}).getRegeo({
						success: (data) => {
							let locathinData = {
								location : data[0].longitude+','+data[0].latitude,
								addressName : data[0].regeocodeData.addressComponent.adcode
							}
							resolve(locathinData)
						},fail: (err) => { 
						}
					});
				})
			},
		},
		onPullDownRefresh(){//下拉时刷新
			this.index = 0
			this.$http.fenLeis(this.getData.storesortid,this.getData.StoreSortID = 0,this.getData.siteid,this.getData.getsort = 1,this.getData.page,10,this.getData.Location).then(res=>{
				this.infoList = res
			})
			uni.stopPullDownRefresh();
		},
		onReachBottom(){//上拉加载
			this.getData.page+=1
			this.$http.fenLeis(this.getData.storesortid,this.getData.StoreSortID,this.getData.siteid,this.getData.getsort = 1,this.getData.page,10,this.getData.Location).then(res=>{
				if (res.length > 0) {
					this.infoList = this.infoList.concat(res);
					console.log(this.infoList);
				} else {
					this.$api.msg('已经到最底啦~')
				}
				uni.hideLoading()
			})
		}
	}
</script>

<style scoped>
	.content_{
		width:100%;
	}
	.column_item{
		width:48%
	}
	.animate2{animation:bounceInRight  0.8s 1;}
	
	
	.tab_item{
		width:20%;
		border-radius: 80upx;
		color:black;
		background-color:rgb(240,240,239) ;
		border:1px solid rgba(0,0,0,0);
		transition:background-color 0.3s;color:0.3s;border-color:0.5s;
	}
	.tab_item:active{
		border:1px solid red;
		background-color:white;
		color: red;
	}
	.tapClass{
		background-color:white;
		color:red;
		border:1px solid red;
	}
</style>
