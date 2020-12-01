<template>
	<view class="goods-managment-page">
		<cu-custom bgColor="bg-cream" class="text-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content"><text>商品管理</text></block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content"><text>商品管理</text></block>
			<!-- #endif -->
		</cu-custom>
		<scroll-view scroll-x scroll-with-animation="ease-in-out" class="tab-view" :scroll-left="scrollLeft">
			<view class="tab-view-item" v-for="(item, index) in sortList" :key="index" @tap="selectTab(index)"
				:class="[index === currentTab ? 'tab-active' : '']"> 
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in goodsList" :key="index">
				<view class="goods-item-img" :style="{background: 'url(' + item.PicUrl + ') 0% 0% / cover'}"></view>
				<view class="goods-item-info">
					<view class="flex align-start">
						<text class="goods-item-info-title">{{ item.WMInfoTitle }}</text>
						<view class="tag-list">
							<view class="tag-item" v-if="item.IsTj">
								推荐
							</view>	
						</view>
					</view>
					<view>
						<text class="goods-item-info-use-price" v-if="item.SalePrice">{{ getMoney(item.SalePrice) }}</text>
						<text :class="[item.SalePrice ? 'goods-item-info-del-price' : 'goods-item-info-use-price']">{{ getMoney(item.Price) }}</text>
					</view>
					<text class="goods-item-info-desc">{{ item.WMinfoDesc }}</text>
				</view>
				<view class="goods-action">
					<switch class='brown switch-status' @change="sale(item)" :class="!item.IsLock?'checked':''" :checked="!item.IsLock?true:false" ></switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			StoreID: 0,
			currentTab: 0,
			scrollLeft: 0,
			sortList: [
				{
					name: '全部',
					id: 0
				}
			],
			goodsList: [],
			goodsListCopy: []
		};
	}, 
	onLoad(option) {
		if (option.StoreID) {
			this.StoreID = option.StoreID;
		} else {
			this.StoreID = 0;
		}
	},
	onShow() {
		this.$http.getGoodsList(this.StoreID)
		.then(res => {
			if (res.IsSuccess) {
				let sortTmp = res.Data.SortList
				this.goodsList = res.Data.WMInfoList
				this.goodsListCopy = res.Data.WMInfoList
				sortTmp.forEach((item, index) => {
					this.sortList.push({ name: item.TagName.wmSortName, id: item.TagName.wmSortID })
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
	},
	methods: {
		selectTab: function( index ) {
			this.currentTab = index
			let length = this.sortList.length
			let sort = this.sortList[index].id
			this.scrollLeft = uni.upx2px((index - 1 ) * ( 750 / 5 ))
			
			if (index == 0) {
				this.goodsList = this.goodsListCopy
			} else {
				this.goodsList = this.goodsListCopy.filter( item => {
					return item.WMSortID == sort
				})
			}
		},
		getMoney: function (money) {
			return this.$api.formatAmount(money)
		},
		sale: function (item) {
			this.$http.saleStatus(item.WMInfoID)
			.then( res => {
				if (res.IsSuccess) {
					item.IsLock = ! item.IsLock
				}
			})
			.catch( err => {
				console.log(err);
			})
		}
	}
};
</script>

<style scoped lang="scss">
	
	.goods-managment-page {
		
		.tab-view {
			white-space: nowrap;
			width: 100%;
			background-color: #FFFFFF;
			
			.tab-view-item {
				display: inline-block;
				width: 150upx;
				padding: 20upx;
				margin: 20upx;
				text-align: center;
			}
		}
		
		.tab-active {
			background: linear-gradient(90deg, rgb(255, 118, 38), rgb(252, 30, 82));
			border-radius: 100upx;
			color: #FFFFFF;
		}
		
		.goods-list {
			
			.goods-item {
				display: flex;
				flex-direction: row;
				margin: 30upx;
				padding: 30upx;
				background-color: #FFFFFF;
				box-shadow: 0 2upx 10upx rgba($color: #000000, $alpha: .1);
			}
			
			.goods-item-img {
				width: 130upx;
				min-width: 130upx;
				height: 130upx;
				min-height: 130upx;
				border-radius: 10upx;
			}
			
			.goods-item-info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin: 0 30upx;
				flex: auto;
			}
			
			.goods-item-info-title {
				font-size: 1.2em;
				font-weight: bold;
			}
			
			.goods-item-info-del-price {
				font-size: 0.8em;
				text-decoration: line-through;
				color: #cccccc;
			}
			
			.goods-item-info-use-price {
				margin-right: 10upx;
				color: #f4231b;
			}
			
			.goods-item-info-desc {
				font-size: 0.9em;
				color: #333;
			}
			
			.tag-list {
				display: flex;
			}
			
			.goods-action {
				switch {
					transform: scale(.8);
				}
			}
			
			.tag-item {
				background-color: #f8d1a3;
				border-radius: 50upx;
				color: #FFFFFF;
				padding: 0 10upx;
				margin-left: 5upx;
				display: flex;
				align-items: center;
			}
		}
		
		.switch-status::after {
			content: "下架";
			font-size: 24upx;
			margin-left: 10upx;
			color:#FFFFFF  !important;
			margin-top: 2upx;
			transition: all 0.1s ease-in-out 0s
		}
		
		.switch-status::before {
			content: "上架";
			font-size: 24upx;
			margin-right: 10upx;
			margin-top: 2upx;
			color:#FFFFFF  !important;
			transition: all 0.1s ease-in-out 0s
		}
		
	}
</style>
