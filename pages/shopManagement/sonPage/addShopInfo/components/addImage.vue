<template>
	<view>
		<view style="position:relative" v-for="(item,index) of imageList" :key="index"> 
			<image :src="item.value" mode="widthFix"  style="width:100%" />
			<text class="cuIcon-deletefill text-red del" @click="delImg(index)"></text>
		</view>
	
		<view class="flex padding align-center">
			<view class="flex flex-direction justify-center align-center" @tap="insertImg" style="width:170upx;height:170upx;border:2upx dashed #DDDDDD">
				<text class="hxIcon-xiangji " style="font-size:80upx" ></text>
				<text class="text-gray text-sm">上传照片</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			count:{
				type:Number,
				default:1
			},
			type:{
				type:String,
				default:'ThemePic'
			}
		},
		data(){
			return{
				imageList:[],
			}
		},
		created(){
			console.log(this.count)
		},
		watch:{
			imageList(n,o){
                console.log(n)
				this.$emit('imgList',n)
			}
		},
		methods:{
			insertImg(){
				if(this.count===1){					
					if(this.imageList.length===1){
						if(this.type==='ThemePic'){							
							this.$api.msg('仅能上传一张主题图',2000)
							return 
						}else if(this.type==='logo'){
							this.$api.msg('仅能上传一张logo图',2000)
							return 
						}else if(this.type === 'ggpics'){
							this.$api.msg('仅能上传一张广告展示图',2000)
							return 
						}
					}
				}
				uni.chooseImage({
					count: this.count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success:async (res)=>{
						
						console.log(res);
					// #ifdef APP-PLUS || MP-WEIXIN || H5
						for(let it of res.tempFiles){
							let localPath =it.path	
							// #ifdef APP-PLUS
							localPath = await this.$api.zipImage(localPath)
							// #endif
							this.imageList.push({
								value:localPath
							})	
						}
					// #endif
					
						// #ifdef MP-ALIPAY
						this.imgList = [...this.imgList,...res.tempFilePaths]
						// #endif
					},
                    complete:(rea)=>{
                        console.log(rea)
                    }
				});
			},
			delImg(index){
				uni.showModal({
					title: '确定要删除该图片吗？',
					content: ' ',
					success:(res)=>{
						if (res.confirm) {
							this.imageList.splice(index,1); 
						} 
					} 
				});
			},
		}
	}
</script>

<style>
	.del{
		font-size: 60upx;
		position: absolute;
		bottom: 10upx;
		right: 10upx;
	}
</style>
