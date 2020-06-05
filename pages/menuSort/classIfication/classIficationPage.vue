<template>
	<view  class="bg-gray">	
		<view  v-for="(num,i) in 2" :key="i"  :class="i===1?'fixed_top':''" style="width:100%">			
		
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">分类</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">分类</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		
		
			<view class="cu-bar margin-tb-sm search">
					<!-- 输入框 -->
				<view class="search-form padding-lr round flex justify-center" style=" height: 60upx;">
					<text class="cuIcon-search"></text>
					<input @tap="goTosearch" :adjust-position="false" type="text" placeholder="点击搜索" :disabled="true" confirm-type="search"></input>
					
				</view>
			</view>
		</view>

		<view class="margin-top">	
		
			<view class="page-body margin-top" :style="'height:'+height+'px'">
				
				<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop" scroll-with-animation>
					<view class="padding-lr-xs nav-left-item" @click="categoryClickMain(index)" :key="index" :class="index==categoryActive?'active':''"
						v-for="(item,index) in inconList">
						{{item}}
					</view>
				</scroll-view>
				
				
				<!--内容页面-->
				<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
					
					<!--包住所有列表的大框子，分类的列表-->
					<view v-for="(foods,index) in allShopAry" :key="index" class="box" v-if="foods.Store.length>0">
						
						
						<!--单个店铺组件列表-->
						<view  v-for="(item,i) in foods.Store" :key="i" @click="cart(item.name)" class="bg-white">
							<class-content :itemObj="item"></class-content>
						</view>
					
					
					
					</view>
					
					
					
				</scroll-view>
			
			</view>		
		</view>	
	</view>
	
</template>

<script>
	import classContent from '../../searchResult/components/searchContent'
	export default {
		data() {
			return {
				allShopAry:[],
				name: "wkiwi",
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollLeftTop: 0,
				// scrollHeight: 0,
				arr:[0,584,1168,1752,2336,2805,3274,3858,4442,4911,5380,5734,6203,6672,7017],//初始值，后边计算会根据手机适配覆盖
				leftItemHeight: 51,//49行会计算出新值进行覆盖
				navLeftHeight:0,//左边scroll-view 内层nav的总高度
				diff: 0,//左边scroll-view 内层nav的总高度与视口之差
				tabBarHeight:0,//如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
			}
		},
		created(){
			//如果你的分类数据为后台异步获取请	将下方代码放置你的数据回调中
			// this.$nextTick(()=>{
			// 	this.getHeightList();
			// })
		},
		onLoad(){
			this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight;
			
			this.allShopAry=this.$store.state.allShopAry
	
		},
		onReady() {
			this.getHeightList();
		},
		methods: {
			goTosearch() { //点击搜索的时候
				uni.navigateTo({
					url: `/pages/searchResult/searchRouter/searchRouterPage`
				})
			},
			getHeightList(){
				let _this = this;
				let selectorQuery=uni.createSelectorQuery();
				selectorQuery.selectAll('.nav-left-item').boundingClientRect(function(rects) {
					_this.leftItemHeight  =  rects[0].height;
					_this.navLeftHeight = _this.leftItemHeight * allShopAry.length;
					_this.diff =  _this.navLeftHeight - _this.height;
				});
				selectorQuery.selectAll('.box').boundingClientRect(function(rects) {
					let arr = [0];
					let top = 0;
					rects.forEach(function(rect){
	// 					rect.id      // 节点的ID
	// 					rect.dataset // 节点的dataset
	// 					rect.left    // 节点的左边界坐标
	// 					rect.right   // 节点的右边界坐标
	// 					rect.top     // 节点的上边界坐标
	// 					rect.bottom  // 节点的下边界坐标
	// 					rect.width   // 节点的宽度
	// 					rect.height  // 节点的高度
						top += rect.height;
						arr.push(top)
						})
						console.log(arr)
						_this.arr = arr
					}).exec()
			},
			scroll(e) {
				let _this = this
				if(this.timeoutId){
					clearTimeout(this.timeoutId);
				}
				this.timeoutId = setTimeout(function(){ //节流
					_this.scrollHeight =  e.detail.scrollTop + _this.height/2;
					for (let i = 0; i < _this.arr.length;i++) {
						let height1 = _this.arr[i];
						let height2 = _this.arr[i+1];
						if (!height2 || (_this.scrollHeight >= height1 && _this.scrollHeight < height2)) {
							_this.categoryActive = i;
							(_this.diff>0) && (_this.scrollLeftTop = Math.round((_this.categoryActive * _this.diff)/(classifyData.length-1)));
							return false;
						}
					}
					_this.categoryActive = 0;
					_this.timeoutId = undefined;
				}, 10)
			},
			categoryClickMain(index) {
				this.categoryActive = index;
				this.scrollTop = this.arr[index]
			},
			cart: function (text) {
				uni.showToast({
					title: text,
					icon: "none",
				})
			},
			deepCopy(obj){
				var map ={}
				Object.keys(obj).forEach(key=>{
					map[key]=obj[key]
				})
				return map
			}
		},
		components: {
			classContent
		},
		computed:{
			inconList(){
				var res=[]
				this.$store.state.allShopAry.forEach(it=>{
					if(it.Store.length!=0){
						res.push(it.StoreName)
					}
				})
				return res
			}
		}
	}
</script>

<style scoped>
	.fixed_top{
		position: fixed; 
		top:0px;
		left:0px;
		background:white;
		z-index: 100;
	}
	.page-body {
		display: flex;
		background: #fff;
		overflow: hidden;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 17%;
		background: #fafafa;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #f1f1f1;
		border-bottom: solid 1px #f1f1f1;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav-left-item:last-child{
		border-bottom: none;
	}
	.nav-right {
		width: 83%;
		/*background: gray;*/
	}
	.box {
		display: block;
		overflow: hidden;
		border-bottom: 20upx solid #f3f3f3;
		min-height:100%
	}
	.box:last-child {
		border: none;
	}
	.nav-right-item {
		width: 28%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
		background: #fff;
	}

	.nav-right-item image {
		width: 150upx;
		height: 150upx;
	}

	.active {
		color: #FF80AB;
		background: #fff;
		border-right: 0;
	}
	::-webkit-scrollbar {/*取消小程序的默认导航条样式*/
   width: 0;
   height: 0;
   color: transparent;
}
</style>



