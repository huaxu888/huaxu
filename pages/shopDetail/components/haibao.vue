<template>
	
	<!--  -->
	<view class="cu-modal padding-lr-xl " :class="showModal?'show':''" @touchmove.stop.prevent="moveHandle">
		<view class="cu-dialog" style="background:transparent; margin-top:80upx;">
			
			
				<view class="flex justify-center" >
					<image :src="imgUrl" mode="scaleToFill" style="width:1000upx;height:1100upx;">
						
					</image>
					
				</view>
			<view class="flex  align-center justify-between padding" style="height: 120upx;background: #FFFFFF;">
				<view class="flex flex-treble  justify-between padding-lr">
					<!-- <view class="flex align-center justify-center">
						<text class="hxIcon-weixin4" style="font-size: 52upx;color: #50b674;"></text><text style="margin-left: 10upx; font-size: 28upx;color: #333333;">微信</text>
					</view> -->
					<view  class="flex align-center justify-center" @tap="downLoadImage">
						<text class="hxIcon-baocun" style="font-size: 52upx;color:#f94e43 ;"></text><text style="margin-left: 5upx;  font-size: 28upx;color: #333333;">保存到相册</text>
					</view>
				</view>
				<view class="flex flex-sub align-center justify-center"  @tap="hideModal(-1)">
					<view style="height: 45upx;border-right: 1px solid #bfbfbf;"></view>
					<text class="margin-left-lg" style="color: #666666;">取消</text>
				</view>
			
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import wmPoster from "@/components/wm-poster/wm-poster.vue"
	export default{
		props:{
			showModal:{//控制显示
				type:Boolean,
				default:false
			},
			infoObj:{
				type:Object,
				default:()=>{}
			},
			imgUrl:{
				type:String,
				default:''
			}
		},
		created(){
			// this.getEwm()
		},
		data(){
			return {
				userInfo:{},
				FaceURL:this.$store.state.userInfo.FaceURL,
				Nick:this.$store.state.userInfo.Nick,
				showCanvas:false
			}
		},
		components:{
			wmPoster
		},
		methods: {
			downLoadImage(){
				this.$emit('downLoadImage')
			},
			shareWx(type){
				this.$emit('shareWx',type)
			},
			success(e){
				this.$emit('success',e)
			},
			moveHandle(){
				
			},
			// async getEwm(){
			// 	console.log(456789)
			// 	if (this.$store.state.hasLogin === true) {
			// 		this.userInfo = this.$store.state.userInfo;
			// 	}else{
			// 		this.userInfo.ID=0
			// 	}
			// 	console.log(this.infoObj.StoreID)
			// 	let data = {
			// 		storeid:this.infoObj.StoreID,
			// 		pid: this.userInfo.ID,
			// 		path:'pages/shopDetail/shopDetailPage'
			// 	}
			// 	let Data = await this.$Request.get(this.$store.state.getewm,data)
			// 	console.log(Data)
			// 	this.imgUrl = Data.Data
			// 	this.showCanvas=true	
					
			
			// },
			hideModal(i) {
				if (i > 0) {
					this.$emit('hidden',true)//同意
				} else {
					this.$emit('hidden',false)//取消或者点X
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	
	.cu-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.9);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}
	
	.cu-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	
	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.2s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	

	

	.haibao_btn{
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		border:2upx solid transparent;
		font-size:60upx;
		background:rgba(39,34,40,0.5)
	}
</style>
