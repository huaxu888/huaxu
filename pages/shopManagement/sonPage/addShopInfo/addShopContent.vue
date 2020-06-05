<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">添加店铺内容</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">添加店铺内容</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		
		<view>
			<view class="padding-left title_ text-lg align-center flex" style="line-height: 2.5em;">
				<view class="text-bold">{{title}}</view>
			</view>
			<view :style="{height:pageHeight + 'px'}">
				<view class="padding bg-white" style="min-height: 200upx;width:100%" v-if="type==='describe'">	
					<textarea placeholder="请输入一句能表达品牌核心价值的广告语"  :auto-height="true" style="width:100%" @input="titleInput"></textarea>
				</view>
				
				<view class="bg-white" style="width:100%" v-if="type==='content'">
					<view class="padding" style="min-height:400upx;width:100%">
						<block  v-for="(item,index) in editItems" :key="index">
							<textarea :placeholder="editItems.length == 1 ? '请图文结合描述您店铺的特色' : ''" maxlength="-1" auto-height="true" cursor-spacing="500"   @input="inputIng" v-if="item.type=='textarea'" style="width:100%" :focus="index + 1 == editItems.length && index != 0 ? true : false" :value="item.value" :data-index="index"  @linechange="linechage"></textarea> 
							<view class="img" v-if="item.type=='img'" > 
								<image :src="item.value" mode="widthFix"  style="width:100%" />
								<text class="cuIcon-deletefill text-red del" @click="delImg(index)"></text>
							</view>
						</block> 
					</view>
					<view class="flex padding align-center">
						<view class="flex flex-direction justify-center align-center" @tap="insertImg" style="width:170upx;height:170upx;border:2upx dashed #DDDDDD">
							<text class="hxIcon-xiangji " style="font-size:80upx" ></text>
							<text class="text-gray text-sm">上传照片</text>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="btn_ bg-white flex justify-center">
				<view  class="padding flex flex-direction" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">发布</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	let data = {}
	const qiniuUploader = require('../../../../common/qiniuUploader.js')
	export default{
		onLoad(route){
			this.type=route.type
			this.count=route.count*1
			this.getData.StoreID=route.StoreID
		},
		data(){
			return{
				pageHeight:'',
				text:'',
				titleContent:'',
				allContents:{},
				allImages:[],
				getData:{
					StoreID:''
				},
				type:'',
				editItems:[
					{
						type:'textarea',
						value:''
					},
					/*{
						type:'img',
						* 
					}*/
				],
				backNum:1
			}
		},
		computed:{
			title(){
				return this.type==='content'?'添加店铺内容':this.type==='describe'?'添加店铺描述':''
			}
		},
		methods:{
			submit(){
				data.StoreID=this.getData.StoreID
				return Promise.resolve(true).then(res=>{			
					if(this.type==='describe'){
						if(this.titleContent===''){
							this.$api.msg('请您完善内容后再发布',2000)
							return 
						}
						data.content=''
						data.StoreDesc=this.titleContent
						setTimeout(()=>{
							return this.$Request.get(this.$store.state.editUrl,data).then(res=>{
								if(res.IsSuccess){
									this.$api.msg(res.Msg,2000)
								}
							})
						})
						this.backNum=2
						uni.navigateBack({})
						return 'describe'
					}else if(this.type === 'content'){
						if(this.editItems.length===1 && this.editItems[0].value===''){
							this.$api.msg('请您完善内容后再发布',2000)
							return 
						}
						var imgAry =[]
						this.editItems.forEach((it,i)=>{
							it.id=i
							this.allContents[i]=it
						})
						for(let key of Object.keys(this.allContents)){
							var value = this.allContents[key]
							if(value.type==='img'){
								this.allImages.push(value)
							}
						}
						let promiseAry=[]//异步上传
						this.allImages.forEach((it)=>{
							this.$api.showLoading_()
							let path = it.value
							// #ifdef APP-PLUS
							path = this.$api.changPath(path)
							// #endif
							console.log(path)
							promiseAry.push(this.promiseUpload(path))
						})
						return Promise.all(promiseAry)	
					}
				}).then(promiseAry=>{
					this.$api.hidLoading_()
					if(promiseAry!='describe'){
						setTimeout(()=>{
							this.allImages.forEach((it,i)=>{
								it.value = promiseAry[i]
							})
							for(let key of Object.keys(this.allContents)){
								var value = this.allContents[key]
								var id = value.id
								for(let val of this.allImages){
									var iD = val.id
									if(id===iD){
										value.value===`${val.value}`
										break
									}
								}
							}
							var str = ''
							for(let key of Object.keys(this.allContents)){
								var value = this.allContents[key]
								var type = value.type
								if(type==='textarea'){
									str = str+`<p>${value.value}</p>`
								}else if(type==='img'){
									//style="width:300px;height:300px"
									str = str+`<img src=${value.value}></img>`
								}
							}
							str =`<p>${str}</p>`
							data.StoreDesc=''
							data.content = str
							return this.$Request.get(this.$store.state.editUrl,data).then(res=>{
								if(res.IsSuccess){
									this.$api.msg(res.Msg,2000)
								}
							})
						})
						this.backNum=2
						uni.navigateBack({})
						return 
					}	
				})
			},
			titleInput(e){
				this.titleContent = e.detail.value
			},
			inputIng(e){
				var value = e.detail.value;
				var index = e.currentTarget.dataset.index;
				this.editItems[index]={
					type:'textarea',
					value
				}
			},
			imgList(e){
				console.log(e)
			},
			delImg(index){
				uni.showModal({
					title: '确定要删除该图片吗？',
					content: ' ',
					success:(res)=>{
						if (res.confirm) {
							this.editItems.splice(index,1); 
						} 
					} 
				});
			},
			insertImg(){
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success:async (res)=>{
						for(let it of res.tempFilePaths){
							let  value = await this.$api.zipImage(it)
							this.editItems.push({
								type:'img',
								value
							})
						}
						this.editItems.push({
							type:'textarea',
							value:''
						})
					}
				});
				// uni.pageScrollTo({
				// 	scrollTop: 100000,
				// 	duration: 0
				// });
			},
			promiseUpload(localPath){//异步上传照片
				return new Promise((resolve,rej)=>{
					qiniuUploader.upload(localPath, (res) => {
						   let path = 'https://img.huaxuapp.com/' + res.imageURL
							resolve(path)
						  }, (error) => {
						   console.log('上传图片出错', error)
							rej(error)
						  }, { 
						   region: 'ECN',
						   domin: 'https://img.huaxuapp.com',
						   uptokenURL: 'https://newsapp.huaxuapp.com/api/getToken/gettoken',
						   shouldUseQiniuFileName: true
					})
				})
			},
			linechage(e){
				//console.log(JSON.stringify(e));
				// var that = this;
				// var height = e.detail.height;
				// var lineHeight = e.detail.lineHeight;
				// var pageHeight = height + (lineHeight * 2) + uni.upx2px(98) + parseFloat(that.paddingBottom);
				// this.pageHeight = pageHeight;
				// uni.pageScrollTo({
				// 	scrollTop: 100000,
				// 	duration: 0
				// }); 				
			},
		},
		onBackPress(e) {
			if(this.backNum===1){
				return this.$api.showModal().then(res=>{
					if(res){
						this.backNum=2
						uni.navigateBack({})
						console.log(3349)
					}else{
						console.log(3349)
						this.backNum=1
					}
				})
			}else if(this.backNum===2){
				return false
			}
			
		},
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	.del{
		font-size: 60upx;
		position: absolute;
		bottom: 10upx;
		right: 10upx;
	}
	.img{
		position: relative;
	}
</style>

