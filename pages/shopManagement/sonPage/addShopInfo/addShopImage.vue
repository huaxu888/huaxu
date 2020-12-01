<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">添加店铺图片信息</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">添加店铺图片信息</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view>
			<view class="padding-left title_ text-lg align-center flex" style="line-height: 2.5em;">
				<view class="text-bold">{{title}}</view>
			</view>
			<view>
				<add-image :count="count" @imgList="imgList" :type="type"></add-image>
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
	const qiniuUploader = require('../../../../common/qiniuUploader.js')
	import addImage from './components/addImage'
	export default{
		onLoad(route){
			this.type=route.type
			this.count=route.count*1
			this.getData.StoreID=route.StoreID
		},
		data(){
			return{
				getData:{
					StoreID:''
				},
				type:'',
				imgAry:[],
				backNum:1,
				daTa:{
					storepiculrs:'',
					mainurl:''
				},
				count:1
			}
		},
		computed:{
			title(){
				return this.type==='ThemePic'?'添加店铺主题图':this.type==='logo'?'添加店铺logo图':this.type==='banner'?'添加店铺幻灯图':''
			}
		},
		methods:{
			submit(){//this.type === 'logo'
				if(this.imgAry.length===0){
					this.$api.msg('请您上传图片后再发布')
					return
				}
				return Promise.resolve(true).then(res=>{
					this.daTa.StoreID = this.getData.StoreID
					
					if(this.type ==='ThemePic'){
						var valuePath = this.imgAry[0].value
						setTimeout(()=>{
							this.promiseUpload(valuePath).then(path=>{
                                this.daTa.mainurl = path
								this.$Request.get(this.$store.state.editstorepicUrl,this.daTa).then(res=>{
									if(res.IsSuccess){
										this.$api.msg(res.Msg,2000)
									}
								})
							})	
						})
						this.backNum=2
						uni.navigateBack({})
					}else if(this.type === 'logo'){
						let data = {
							logourl:'',
							StoreID:''
						}
						data.StoreID=this.getData.StoreID
						var valuePath = this.imgAry[0].value
						setTimeout(()=>{
							this.promiseUpload(valuePath).then(path=>{
								data.logourl = path
								this.$Request.get(this.$store.state.editlogoUrl,data).then(res=>{
									if(res.IsSuccess){
										this.$api.msg(res.Msg,2000)
									}
								})
							})
						})
						this.backNum=2
						uni.navigateBack({})
					}else if(this.type === 'banner'){
						let promiseAry=[]//异步上传
						this.$api.showLoading_()
						this.imgAry.forEach((it)=>{
							promiseAry.push(this.promiseUpload(it.value))
						})
						return  Promise.all(promiseAry)
					}
				}).then(imgAry=>{
					if(Object.prototype.toString.call(imgAry)==="[object Array]"){
						this.$api.hidLoading_()
						this.daTa.storepiculrs = imgAry.join(',')
						setTimeout(()=>{
							this.$Request.get(this.$store.state.editstorepicUrl,this.daTa).then(res=>{
								console.log(res)
								if(res.IsSuccess){
									this.$api.msg(res.Msg,2000)
								}
							})
						})
						this.backNum=2
						uni.navigateBack({})
					}else{
						this.$api.hidLoading_()
					}
				})
			},
			promiseUpload(localPath){//异步上传照片
				var self = this
				return new Promise((resolve,rej)=>{
					qiniuUploader.upload(localPath, (res) => {
						   let path = 'https://img.huaxuapp.com' + res.imageURL
						   console.log(path)
							resolve(path)
						  }, (error) => {
							self.$api.msg('图片过大，请上传450kb以内的图片,请重新上传')
							console.log(error)
							rej(error)
						  }, { 
						   region: 'ECN',
						   domin: 'https://img.huaxuapp.com',
						   uptokenURL: 'https://newsapp.huaxuapp.com/api/getToken/gettoken',
						   shouldUseQiniuFileName: true
					})
				})
			},
			imgList(e){
				this.imgAry=e
                console.log(this.imgAry,e)
			},
		},
		components:{
			addImage
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
</style>
