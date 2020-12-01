<template>
	<view class="find_content bg-white" style="height: 100%;border-radius: 20upx;" @tap="goTofindDetali">
			<view class="cu-card case" :class="false?'no-card':''" style="width: 100%;border-radius: 4upx;">
				
				<!-- <view class=" text-gray" style="padding: 20upx 20upx;">
					{{ time }}
				</view> -->
				
				<view class="flex justify-center" style="padding-top: 24upx;" >
					<view class="align-center" >
						<!-- <text class="hxIcon-weibiaoti text-red" style="font-size: 32upx;position: relative;bottom: 5upx;">
						</text> -->
						<view class="text-black text-df text-bold " style="width: 430upx;height: 100upx; font-size: 30upx;padding-left: 20upx;">{{itemObj.Title}}
						</view>
						<view class="cu-list menu-avatar  margin-tb-sm text-sm" style="line-height:40upx;padding-left: 20upx;">
							<view class="text-gray flex justify-start">
								<!-- {{time}} -->
								<text class="hxIcon-weibiaoti text-red" style="font-size: 32upx;position: relative;bottom: 5upx;">
								</text>
								<view class="text-gray" >
									花蓄
								</view>
								<view class="text-gray " style="margin-left: 30upx;">
									<!-- <text class="cuIcon-attentionfill margin-lr-xs"></text> --> {{itemObj.ReadCount}}人查看
								</view>
							</view>
						</view>
					</view>
					
					<view class="flex" style="position: relative;padding-right: 20upx;margin-top: 4upx;">
						<image class="image_ " :src="itemObj.PicURL" mode="aspectFill" style="border-radius: 5upx; width: 192upx;height: 148upx;padding-left: 0;margin-left: 50upx;"></image>
						 <!-- <view  class="text-white text-bold text-df padding-top-sm show_info text-cut">{{itemObj.Info}}</view> -->
					</view>
				</view>
				
				
				
				
		</view>
	</view>
</template>

<script>
	export default{
		name:"findTop",
		props:{
			itemObj:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {
				people:0,
			}
		},
		methods:{
			goTofindDetali(){
				this.$emit('goTofindDetali',this.itemObj)
				/*uni.navigateTo({//跳转至等待审核界面
					url:"/pages/changeBusiness/waitSubmit"
				})*/
				
			},
			
		},
		computed:{
			seePpeopleNums(){ //查看人数
				return Math.floor(Math.random()*100)
			},
			time(){
				var date = new Date((this.itemObj.AddDateTime.split('(')[1].split(")")[0])*1)//计算出时间				//转换成 xxx-xx-xx
				return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
			}
		}
	}
</script>
<style scoped>
	.show_info{
		position: absolute;
		bottom: 10%;
		left: 10%;
		width:80%;
	}
	/* .find_content{
		border-radius: 10upx;
		box-shadow: 3upx 3upx 3upx 3upx #F0F0F0;
		border-left: 2upx solid  #EEEEEE;
		border-top: 2upx solid  #EEEEEE;
	} */
	.image_{
		height: 300upx;
		border-radius: 10upx;
		width:100%
	}
</style>
