<template>
		<view class="show_list_item padding-bottom-sm"  @tap="goToDetails">
			<view class="shop_img" style="position: relative;">
				<image :lazy-load="lazyLoad" :src="itemObj.StorePic===''?'https://img.huaxuapp.com/pig.png':itemObj.StorePic"  class="shop_image" ></image>
				<image src="https://img.huaxuapp.com/zdsj.png" mode="aspectFit" class="cover-img" v-if="itemObj.IsSY"></image>
			</view>  
			
			
			<view class="info_ padding-lr-sm">
				<view class="shop_name text-df text-bold padding-sx">
					<text>{{itemObj.StoreName}}</text> 
					
					<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
						<text v-if="defaultDiscount != 1 || itemObj.IsZK" class="text-white bg-orange radius" style="margin-left: 4upx;font-size: 6upx; padding: 4upx;font-size: .6rem;">{{ itemObj.IsZK && itemObj.zk != 1 ? itemObj.zk * 10000/1000 : defaultDiscount * 10 }}折</text>
					<!-- #endif -->
					
					<!-- #ifdef MP-ALIPAY -->
						<text v-if="defaultDiscount != 1 || itemObj.IsZK" class="text-white bg-orange radius" style="margin-left: 4upx;font-size: 6upx; padding: 4upx;font-size: .2rem;">{{ itemObj.IsZK && itemObj.zk != 1 ? itemObj.zk * 10000/1000 : defaultDiscount * 10 }}折</text>
					<!-- #endif -->
					
					
				</view>
				
				<view>
					<text class="hxIcon-tubiaozhizuomoban start-red" style="font-size: 28upx;" v-for="(it,i) in itemObj.StoreStart" :key="i"></text>
				</view>
	
				<view class="text-cut padding-sx" v-show="itemObj.StoreDesc">
					<text class="shop_Info text-cut">{{itemObj.StoreDesc}}</text>
				</view>				
			
				<view class="shop_map  text-sm " style="line-height: 1.5em;"> 
					<text class="cuIcon-location text-green"></text>
					{{changeAddress(itemObj.StoreAddress)}}        
				</view>
			</view>
		</view>
</template>

<script>
export default{
	data(){
		return{
			lazyLoad:true,
			defaultDiscount: 1
		}
	},
	props:{
		itemObj:{//传进来的店铺对象，一些列单个店铺信息
			type:Object,
			default:()=>{}
		}
	},
	mounted() {
		console.log(this.itemObj);
		this.$http.getDefaultDiscount()
		.then( res => {
			if(res.IsSuccess) {
				this.defaultDiscount = res.Data
			} else {
				this.defaultDiscount = 1
			}
		})
		.catch( err => {
			this.defaultDiscount = 1
		})
	},
	methods:{
		goToDetails(){//发生点击时的事件
			this.$emit('goToDetails',this.itemObj)
		}
	}
}
</script>

<style scoped>
	
	.start-red{
		color: #f34e2d;
	}
	
	.show_list_item{
		border-radius:10upx;
		width:100%;
		box-shadow: 4upx 4upx 4upx 4upx #EEEEEE;
		border-left: 2upx solid  #EEEEEE;
		border-top: 2upx solid  #EEEEEE;
	}
	.shop_image{
		border-radius:10upx 10upx 0 0;
		height:240upx;
	}
	
	.cover-img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 240rpx;
	}
	.info_{
		line-height: 40upx;
	}
	.shop_map{
		white-space:normal;
        word-break:break-all;
        word-wrap:break-word; 
	}
	.shop_Info{
		color:rgb(102,102,102);
		background: rgb(230,229,229);
		padding:1upx;
		font-size: 20upx;
		line-height:1em;
	}
	
</style>

 
 