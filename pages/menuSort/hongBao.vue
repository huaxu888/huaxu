<template>
	<view style="position: relative;">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom :bgColor="isStickys?'bg-whitesss':'bg-whites'" class="text-black"  :isBack="true" style="position: absolute;">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content" class="text-bold">VIP商家专区</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content" class="text-bold">VIP商家专区</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view v-if="scrollTop > 600"  @tap="backtops" class="flex align-center justify-center flex-direction huiqu">
			<text class="hxIcon-shangla" style="font-size: 90upx;color: rgba(0,0,0,0.2);"></text>
		</view>
		 <!--分类-->
		<view class="" style="width: 100%;background-color: #FFFFFF;margin-top: 0;padding-bottom: 20upx;">
			<swiper style="height: 328upx;width: 100%" :indicator-dots="false" :circular="true" :autoplay="true" interval="6000"
			 duration="800">
				<swiper-item v-for="(centerSwiperItem,centerSwiperIndex) in centerLBLlit" :key="centerSwiperIndex" @tap="navTo(centerSwiperItem.GGContent)">
					<image :src="centerSwiperItem.GGPicUrl" mode="scaleToFill" style="width: 100%; height: 328upx;"></image>
				</swiper-item>
				
				<!-- <swiper-item>
					<image src="https://img.huaxuapp.com/094321.jpg" mode="scaleToFill" style="width: 100%; height: 328upx;"></image>
				</swiper-item> -->
				
			</swiper>
			<view style="margin-top: 46upx;" >
				<swiper-icon :inconListAll="inconListAll" :judge="judge"  @iconTap="iconTap" :scrollLeft="scrollLeft"></swiper-icon>
			</view>
		</view>
		 
		<!-- <view class="top_swiper padding-tb-sm bg-white" style="padding-top:480upx;">
			 
		 </view> -->
		 
		
		 
		 
		 <view class="margin-top-sm">
			 <!--标签-->
			 <view class="container"  offset-top="0" style="border-bottom: 1.5upx solid #EEEEEE;padding-top: 20upx;background-color: #ffffff;" @tap="backTo">
			 	<view style="background-color: #FFFFFF;" :class="isSticky?'fixed-top':''" :style="{top:isSticky?CustomBar+'px':''}" >
			 		<u-dropdown activeColor="#000000" inactiveColor="#333333">
						<u-dropdown-item v-model="value3" :title="value3==-1 ? label3 : options3[value3s].label || '汉台区'" :options="options3" @change="gaSet(value3,value3s)"></u-dropdown-item>
			 			<u-dropdown-item v-model="value1" :title="value1==-1 ? label1 : options1[value1s].label || '品类'" :options="options1" @change="gaSe(value1,value1s)"></u-dropdown-item>
			 			<u-dropdown-item v-model="value2" :title="value2==-1 ? label2 : options2[value2s].label" :options="options2" @change="gaSew(value2,value2s)"></u-dropdown-item>
			 			<u-dropdown-item v-model="value4" :title="value4==-1 ? label4 : options4[value4s].label" :options="options4" @change="gaSef(value4,value4s)"></u-dropdown-item>
			 		</u-dropdown>
			 	</view>
			 </view>
			 	<!-- <view class="hx_tab flex  padding-lr">
			 		<view class="flex justify-center align-center padding-sx tab_item" @tap="tabSelects" :class="index===0?'tapClass':''">
			 			<view class="text-sm">全部</view>
			 		</view>
			 		<view v-for="(item,i) of tabList" :key="i" style="margin-left: 20upx;" class="flex justify-center align-center padding-sx tab_item" @tap="tabSelect(item,i)" :class="index===i+1?'tapClass':''">
			 			<view class="text-sm">{{item.StoreSortName}}</view>
			 		</view>
			 	</view> -->
				
				
				<!-- <hx-tab :tabSelects="tabSelects" :infoList="infoList" :tabList="tabList" :getData="getData" :showTabFlag="index" @tabSelect="tabSelect"></hx-tab> -->
			 <!--内容-->
			 <view class="content_  flex justify-between " :class="animateFlag?'animate2':''">
				
				<!-- <view class="column_item flex flex-direction ">
					<view v-for="(item,i) of leftInfoAry" :key="i" >
						<shop-item @goToDetails="goToDetails" :itemObj="item"></shop-item>
					</view>
				</view> -->
							
				<!-- <view class="column_item flex flex-direction ">
					<view v-for="(item,i) of rightInfoAry" :key="i">
						<shop-item @goToDetails="goToDetails" :itemObj="item"></shop-item>
					</view>
				</view> -->
				<view class="flex flex-direction" style="width: 750upx;">
					<view v-for="(item,i) of InfoAry" :key="i" class=""> 
						<shopItem @goToDetails="goToDetails" :itemObj="item"></shopItem>
					</view>
				</view>
			 </view>
		 </view>
		 
		
		<navigator url="/pages/person/czHb">
		 	<view class="couponss shake"></view>
		 </navigator>
	</view>
</template>

<script>  
	import swiperIcon from './components/topSwiper'
	import hxTab from '../../components/hxTab.vue'
	import shopItem from './components/shopItems.vue'
	import {getPageAllInfo as sortMixins} from '../../mixins/qymMixins.js'
	export default {
		mixins:[sortMixins],
		data(){
			return {
				animateFlag:false,
				inconList:[],//图标库
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
				index:0,
				centerLBLlit:[],
				StoreStarts:[],
				couponList: [],
				currentPage: 1,
				keyword: '',
				sortList: ['全部'],
				sortIds: [0],
				currentSort: 0,
				hotSou:[],
				
				// selectList:[
				// 	{name:'品类',id:'0'},
				// 	{name:'智能排序',id:'1'},
				// 	{name:'附近商圈',id:'2'},
				// 	{name:'筛选',id:'3'}
				// ],
				indexs:5,
				value1: -1,
				value1s: -1,
				value2s: -1,
				value3s: -1,
				value4s: -1,
				value2: -1,
				value3: -1,
				value4: -1,
				label1:'品类',
				label2:'距离最近',
				label3:'附近站点',
				label4:'筛选',
				options1: [
					{
						label: '',
						value: '',
						id: 0
					}
				],
				options2: [
					{
						label: '距离最近',
						value: 0,
						paixu: 0,
					},
					{
						label: '销量最高',
						value: 1,
						paixu: 1,
					}
				],
				options3: [
					{
						label: '',
						value: '',
					}
				],
				options4: [
					{
						label: '全部',
						value: 0,
						CouponType: 0
					},
					{
						label: '人气优先',
						value: 1,
						CouponType: 1
					},
					// {
					// 	label: '代金券',
					// 	value: 1,
					// 	CouponType: 6
					// },
					{
						label: '星级优先',
						value: 2,
						CouponType: 2
					}
				],
				scrollTop: 0,
				isSticky: false,
				StoreSortID:0,
				sortid: 0,
				siteId: 0,
				paixu: 0,
				CouponType: 0,
				page: 0,
				pagesize: 10,
				CustomBar:this.CustomBar,
				daiJin: [],
				sorts: 6,
				StoreSortIDs: 0,
				currentPages: 1,
				modalName: null,
				currents: 1,
				a:false,
				isStickys:false,
				getsorts:1,
				select:0,
			}
		},
		components:{
			swiperIcon,
			hxTab,
			shopItem
		},
		
		onShow(){
			// this.changeAnimateFlag()
			
			this.$http.getCenterLBLlits(this.site_.SiteID).then(res => {
				console.log('轮播图', res);
				if (res.IsSuccess) {
					this.centerLBLlit = res.Data;
				}
			});
		},
		
		async onLoad(option){
			await this.$http.getStoreSortList(0,11).then(res => {
				console.log(res);
				this.inconList = res
				
			}).catch(res => {
			
			}); 
				this.$http.getCenterLBLlits(this.site_.SiteID).then(res => {
					console.log('轮播图', res);
					if (res.IsSuccess) {
						this.centerLBLlit = res.Data;
					}
				});
			// this.$http.adHb(this.$store.state.userInfo.SiteID).then(res => {
			// 	console.log('轮播图', res);
			// 	this.centerLBLlit = res.Data;
			// })
			
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
					getsorts:1,//也是目标标签的样式改变的index
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
					getsorts:1,//也是目标标签的样式改变的index
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
				this.getData.storesortid = 36
				// this.$http.fenLeis(this.getData.storesortid,0,this.getData.siteid,this.getData.getsort = 1,this.getData.page = 1,this.getData.pagesize =10,this.getData.Location).then(res=>{
				// 	this.infoList = res
				// })
				
				this.$http.getVip(this.getData.storesortid,0,0,1,0,this.getData.page = 1,10,this.getData.Location).then(res=>{
					console.log(res); 
					this.infoList = res
	
				})
			})
			
			this.$http.storeList().then(res => {
				console.log(res);
				this.options1 = res.Data
				
				this.options1.forEach((item, i) => {
					this.options1[i].label = item.StoreSortName
					this.options1[i].value = i
				})
			})
			
			this.$http.getSite().then(res => {
				console.log(res.Data);
				this.options3 = res.Data
				res.Data.forEach((item, i) => {
					this.options3[i].label = item.SiteName
					this.options3[i].value = i
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
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
			if(e.scrollTop >= 20) {
				this.isStickys = true;
			} else {
				this.isStickys = false;
			}
			if (e.scrollTop >= 252) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
		},
		methods:{
			backTo(){
				uni.pageScrollTo({
				    scrollTop: 241,
				    duration: 300
				});
			},
			gaSe(index,value1s){
				console.log(index);
				console.log(value1s);
				console.log(this.value1);
				
				if(index == value1s){
					this.value1 = -1
					this.value1s = -1
					this.StoreSortIDs = 0
				} else {
					this.value1 = index
					this.value1s = index
					console.log(this.value1s);
					if(this.value1s == 0){
						this.StoreSortIDs = 0
					} else {
						this.StoreSortIDs = this.options1[index].StoreSortID
					}
				}
				this.getData.page = 1
				
				if(this.StoreSortIDs == 0){
					this.$http.getVip(this.getData.storesortid,0,this.getData.siteid,this.getData.getsort,this.select,this.getData.page = 1,10,this.getData.Location).then(res=>{
						console.log(res); 
						this.infoList = res
					})
				} else {
					this.getData.storesortid = 0
					this.$http.getVip(0,this.StoreSortIDs,this.getData.siteid,this.getData.getsort,this.select,this.getData.page = 1,10,this.getData.Location).then(res=>{
						console.log(res); 
						this.infoList = res
					})
				}
				
			},
			gaSew(index,value2s){
				if(index == value2s){
					this.value2 = -1
					this.value2s = -1
					this.getData.getsort = 0
				} else {
					this.value2 = index
					this.value2s = index 
					console.log(this.value2s);
					if(this.value2s == 0){
						this.getData.getsort = 0
					} else {
						this.getData.getsort = this.options2[index].paixu
					}
				}
				this.getData.page = 1
				this.$http.getVip(this.getData.storesortid,this.StoreSortIDs,this.getData.siteid,this.getData.getsort,this.select,this.getData.page,this.getData.pagesize = 10,this.getData.Location).then(res=>{
					console.log(res); 
					this.infoList = res
				})
			},
			gaSet(index,value3s){
				if(index == value3s){
					this.value3 = -1
					this.value3s = -1
					this.getData.siteid = 0
				} else {
					this.value3 = index
					this.value3s = index 
					if(this.value3s == 0){
						this.getData.siteid = 0
					} else {
						this.getData.siteid = this.options3[index].SiteID
					}
				}
				this.getData.page = 1
				this.$http.getVip(this.getData.storesortid,this.StoreSortIDs,this.getData.siteid,this.getData.getsort,this.select,this.getData.page,this.getData.pagesize = 10,this.getData.Location).then(res=>{
					console.log(res); 
					this.infoList = res
				})
			},
			getDistance(distance) {
				console.log(distance);
				let km = Math.floor(distance / 1000)
				if (km < 1) {
					return distance.toFixed(2) + ' m'
				} else {
					return `${km}.${(distance % 1000).toString().substr(0, 2)} Km`
				}
			},
			gaSef(index,value4s){
				console.log(index);
				console.log(value4s);
				console.log(this.select);
				if(index == value4s){
					this.value4 = -1
					this.value4s = -1
					this.select = 0
				} else {
					this.value4 = index
					this.value4s = index 
					if(this.value4s == 0){
						this.select = 0
					} else {
						this.select = this.options4[index].CouponType
					}
					console.log(this.select);
				}
				this.getData.page = 1
				this.$http.getVip(this.getData.storesortid,this.StoreSortIDs,this.getData.siteid,this.getData.getsort,this.select,this.getData.page,this.getData.pagesize = 10,this.getData.Location).then(res=>{
					console.log(res); 
					this.infoList = res
				})
				
			},
			backtops(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			navTo(url){
				console.log('跳转', url);
				uni.navigateTo({
					url:url
				})
			}, 
			tabSelects(){
				this.index = 0
				// this.$http.fenLeis(this.getData.storesortid,0,this.getData.siteid,1,this.getData.page,10,this.getData.Location).then(res=>{
				// 	this.infoList = res
				// })
				
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
				
				// this.$http.fenLeis(this.getData.storesortid,obj.StoreSortID,this.getData.siteid,this.getData.getsort = 1,this.getData.page = 1,this.getData.pagesize =10,this.getData.Location).then(res=>{
				// 	console.log(res); 
				// 	this.infoList = res
				// })
				
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
				
				
				this.$http.getVip(this.getData.storesortid,0,this.getData.siteid,this.getData.getsort = 1,this.getData.page = 1,this.getData.pagesize =10,this.getData.Location).then(res=>{
					console.log(res); 
					this.infoList = res
				})
				// this.$http.fenLeis(this.getData.storesortid,obj.StoreSortID,this.getData.siteid,this.getData.getsort = 1,this.getData.page = 1,this.getData.pagesize =10,this.getData.Location).then(res=>{
				// 	console.log(res); 
				// 	this.infoList = res
				// })
				
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
			// this.$http.fenLeis(this.getData.storesortid,this.getData.StoreSortID = 0,this.getData.siteid,this.getData.getsort = 1,this.getData.page,10,this.getData.Location).then(res=>{
			// 	this.infoList = res
			// })
			this.getData.page = 1
			this.getData.storesortid = 36
			this.$http.getVip(this.getData.storesortid,0,this.getData.siteid,1,0,this.getData.page = 1,10,this.getData.Location).then(res=>{
				console.log(res); 
				this.infoList = res
			})
			uni.stopPullDownRefresh();
		},
		onReachBottom(){//上拉加载
			this.getData.page+=1
			// this.$http.fenLeis(this.getData.storesortid,this.getData.StoreSortID,this.getData.siteid,this.getData.getsort = 1,this.getData.page,10,this.getData.Location).then(res=>{
			// 	if (res.length > 0) {
			// 		this.infoList = this.infoList.concat(res);
			// 		console.log(this.infoList);
			// 	} else {
			// 		this.$api.msg('已经到最底啦~')
			// 	}
			// 	uni.hideLoading()
			// })
			
			this.$http.getVip(this.getData.storesortid,this.StoreSortIDs,this.getData.siteid,this.getData.getsort,this.select,this.getData.page,this.getData.pagesize = 10,this.getData.Location).then(res=>{
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
		width:336upx;
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
	
	.couponss {
		width: 143upx;
		height: 132rpx;
		background: url(https://img.huaxuapp.com/czyh_03.png) no-repeat;
		background-position: center;
		background-size: cover;
		position: fixed;
		bottom:350upx;
		right: 15rpx;
	}
	
	.fixed-top {
		position: fixed;
		width: 100%;
		z-index: 99990;
		background-color: #ffffff;
	}
	
	.huiqu{
		position: fixed;
		right: 30upx;
		bottom:170upx;
		z-index: 66;
		width: 90upx; 
		height:90upx;
		 -webkit-transition: all 0.5s;
	}
</style>
