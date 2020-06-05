<template>
	<view>
		<!-- #ifdef  MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">搜索</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		



	
		<view class="fixed_top">
			<!-- #ifdef APP-PLUS  -->
			<view class="status_bar">
				<view class="top_view"></view>
			</view>
			<!-- #endif -->
			<view class="cu-bar search">

				<!-- #ifdef APP-PLUS || H5-->
					<view class="text-df" style="margin-left: 36upx;" @tap="backPage">
						<text class="cuIcon-back"></text>返回
					</view>
				<!-- #endif -->
		
		
				<view class="search-form round" style=" height: 60upx;">
					<text class="cuIcon-search"></text>
					<input v-model="inputValue" @confirm="goTosearch" :adjust-position="false" type="text" placeholder="花蓄" :focus="true"
					 confirm-type="search"></input>
				</view>
		
				
				<view @tap="goTosearch" class="" style="margin-left: 38upx;margin-right:38upx;">
					<text class="text-df">
						搜索
					</text>
				</view>
			</view>
			
			<view class="margin-top padding ">
				<view class="flex justify-between">
					<view class="text-bold text-df">历史记录</view>
					<view class="cuIcon-delete" style="font-size: 28upx;" @tap="clearHistorical"></view>
				</view>
				
				
				<view class="historical_records margin-top" v-if="showFlag">
					<view class="historical_item padding-xs padding-lr-sm margin-xs" v-for="(item,i) of historicalRecordsAry" :key="i" @tap="itemGoTosearch(item)">
						<view  class="text-black text-df">{{item}}</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				inputValue:'',
				historicalRecordsAry:[],
				showFlag:false
			}
		},
		onShow(){//初始化页面数据
			this.getHistoricalRecordsAry()
		},
		methods:{
			clearHistorical(){//清楚缓存
				uni.removeStorageSync('historicalRecordsAry')//清楚缓存
				this.historicalRecordsAry=[]//页面数据为空
			},
			itemGoTosearch(keyword){//点击缓存跳转
				uni.navigateTo({
					url: `/pages/searchResult/searcResulthPage?keyword=${keyword}`
				})
			},
			goTosearch() { //点击搜索的时候
				uni.navigateTo({
					url: `/pages/searchResult/searcResulthPage?keyword=${this.inputValue}`
				})
				if(this.inputValue!=''){
					var historicalRecordsAry = uni.getStorageSync('historicalRecordsAry')//取到缓存
					if(historicalRecordsAry===''){//如果缓存为空
						historicalRecordsAry=[]
					}
					if(!historicalRecordsAry.includes(this.inputValue)){//查找是否有重复项
						historicalRecordsAry.push(this.inputValue)//放入数据
					}
					historicalRecordsAry=historicalRecordsAry.reverse()
					uni.setStorageSync('historicalRecordsAry',historicalRecordsAry)//存储缓存
				}
			},
			backPage(){
				uni.navigateBack({})//返回
			},
			getHistoricalRecordsAry(){//初始化缓存参数
				var historicalRecordsAry = uni.getStorageSync('historicalRecordsAry')//获取缓存
				if(historicalRecordsAry===''){//缓存为空
					return 
				}else{//不为空
					this.historicalRecordsAry=historicalRecordsAry
					this.showFlag=true
				}
			}
		}
	}
</script>
<style>
	page{
		background: #FFFFFF;
		}
</style>

<style scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #FFFFFF;
	}
	
	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background:#FFFFFF;
		opacity: .6;
		top: 0;
		z-index: 999;
	}
	.historical_records{
		display: flex;
		flex-wrap: wrap;
	}
	.historical_item{
		display: flex;
		justify-content: center;
		align-content: center;
		background:rgb(245,245,245);
		border-radius: 60upx;
	}
</style>
