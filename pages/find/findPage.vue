<template>
	<view class="find_page " style="height: 100%;">
		<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 -->
		<cu-custom  bgColor="bgclo" :isBack="false" class="text-white bgclo">
			<block slot="content" class="text-bold">花蓄攻略</block>
		</cu-custom>
		<!-- #endif -->
		
			<scroll-view scroll-x class=" nav text-center bgclo" style="padding: 0 20upx;color: #FFFFFF;">
				<view class="cu-item" :class="0==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="0" style="padding: 0;margin: 0 30upx;">
					全部
				</view>
				<view class="cu-item" :class="1==TabCur?'text-white cur borders':''" @tap="tabSelect"  data-id="1" style="padding: 0;margin: 0 30upx;">
					用户必看
				</view>
				<view class="cu-item" :class="2==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="2" style="padding: 0;margin: 0 30upx;">
					商家必看
				</view>
				<view class="cu-item" :class="3==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="3" style="padding: 0;margin: 0 30upx;">
					常见问题
				</view>
				<view class="cu-item" :class="4==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="4" style="padding: 0;margin: 0 30upx;">
					招商入驻
				</view>
				<view class="cu-item" :class="5==TabCur?'text-white cur borders':''" @tap="tabSelect" data-id="5" style="padding: 0;margin: 0 30upx;">
					花蓄资讯
				</view>
			</scroll-view>

			<view class="padding-sm animate" v-if="TabCur == 0">
				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
				</view>
			</view>
			<view class="padding-sm animate" v-if="TabCur == 1">
				<view v-for="(item,i) of itemObj " :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
				</view>
			</view>
			<view class="padding-sm animate" v-if="TabCur == 2">
				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
				</view>
			</view>
			<view class="padding-sm animate" v-if="TabCur == 3">
				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
				</view>
			</view>
			<view class="padding-sm animate" v-if="TabCur == 4">
				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
				</view>
			</view>
			<view class="padding-sm animate" v-if="TabCur == 5">
				<view v-for="(item,i) of itemObj" :key="i" class=" radius" style="margin-bottom: 20upx;height: 200upx;">
					<find-card @goTofindDetali="goTofindDetali" :itemObj="item"></find-card>
				</view>
			</view>
	</view>
</template>

<script>
	import findCard from './components/findCard.vue'
	import hxTab from '../../components/hxTab.vue'
	import {
		getPageAllInfo as findMixins
	} from '../../mixins/qymMixins.js'
	export default {
		mixins: [findMixins],
		name: 'findPage',
		data() {
			return {
				infoUrl: this.$store.state.findListUrl,
				getData: {
					siteid: 0,
					getsort: 1,
					page: 1,
					pagesize: 10,
					//Location:''
				},
				infoList: [],
				SiteID:0,
				TabCur: 0,
				scrollLeft: 0,
				itemObj:[],
				len:0
			}
		},
		components: {
			findCard,
			hxTab,
		},
		onLoad() {
			//this.getData.Location=`${this.$store.state.longitude},${this.$store.state.latitude}`
			this.getCurryInfo();
			let arr = [];
			this.$http.getTopLists().then(res => {
				if (res) {
					console.log(res)
					this.itemObj = res
				}
			})
		},
		onShow(){
			 if(this.SiteID != this.site_.SiteID){
				 this.getCurryInfo()
			 }
		},
		onPullDownRefresh() { //下拉时刷新
			this.refresGetInfo()
		},
		onReachBottom() { //上拉加载
			this.getData.page += 1
			this.getCurrentPageInfo()
		},
		methods: {
			tabSelect(e) {
				console.log(e)
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				if(this.TabCur == 0){
							
					let arr = [];
					this.$http.getTopLists().then(res => {
						if (res) {
							console.log(res)
							this.itemObj = res
						}
					})
				};
				if(this.TabCur == 1){
							
					let arr = [];
					this.$http.xinshou().then(res => {
						if (res) {
							this.itemObj = res
						}
					})
				};
				if(this.TabCur == 2){
					
					this.$http.changjian().then(res => {
						if (res) {
							this.itemObj = res
						}
					})
				};
				if(this.TabCur == 3){
					
					this.$http.gonggao().then(res => {
						if (res) {
							this.itemObj = res
						}
					})
				};
				if(this.TabCur == 4){
					
					this.$http.ruzhu().then(res => {
						if (res) {
							this.itemObj = res
						}
					})
				};
				if(this.TabCur == 5){
					
					this.$http.zixun().then(res => {
						if (res) {
							this.itemObj = res
						}
					})
				};
			},
			goTofindDetali(e) {
				var id = e.ID
				uni.navigateTo({
					url: `/pages/findDetail/findDetailPage?id=${id}`,
				});
			},
			getCurryInfo() {
				this.SiteID =  this.site_.SiteID
				this.getData.siteid = this.SiteID
				this.getCurrentPageInfo()
			},
		},
	}
</script>

<style>
	page {
		background-color: #F2F2F2;
	}

	.find_content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
		align-items: stretch;
	}
	/* .animate{animation:bounceInUp      0.8s 1;} */
	
	.borders {
		border-bottom: 2px solid #FFFFFF;
	}
	
	.bgclo {
		background: linear-gradient(to right, rgb(254, 177, 3), rgb(254, 129, 5));
	}
</style>
