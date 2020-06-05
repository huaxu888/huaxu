<template>
	<view class="bg-white">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">申请预存</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">申请预存</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view class="padding-left title_ text-lg align-center flex " style="line-height: 2.5em;background: #F0F0F0;">
			<view class="text-bold">法人身份信息（请确认与营业执照信息一致）</view>
		</view>
		
		<view class="input_content">
			<form>
				<view class="cu-form-group" v-for="(item,i) of inputAry" :key="i" :class="i===inputAry.length-1?'border_bottom':''">
					<view class="title">{{item.textName}}</view>
					<input  name="input"
							:adjust-position="adjustPosition"
							v-model="item.value"
							:placeholder="item.placeholder"
					></input>
				</view>
				
				
				<view class="cu-form-group border_bottom" style="border-top: 0px;">
					<view class="title">身份证有效期限</view>
					<input  name="input"
							:disabled="true"
							:adjust-position="adjustPosition"
							v-model="valueShenFenTime"
							@tap="toggleTab"
							:placeholder="'点击选择身份证期限'"
					></input>
				<!-- 	<text @tap="toggleTab" class="margin-right" v-if="valueShenFenTime!=''"></text> -->
				</view>
			</form>
			
			<view class="padding-lr flex title_ text-lg align-center justify-between" style="line-height: 2.5em;background: #F0F0F0;">
				<view class="text-bold">资料上传</view>
			</view>
			
			<view class=" bg-white">
				<view class="padding">
					<text>请上传原始比例身份证正反面照，保持图片清晰度，请勿涂改剪裁，保证审核通过率</text>
				</view>
				
				<view style="width: 100%;" class="flex flex-direction  align-center">	
								
					
						
						<view class="flex flex-direction align-center  justify-center shen_fen_zheng shen_bg_1 margin-bottom" @tap="ChooseImage_one" :style="oneImgUrl===''?`background-image: url(${oneImgUrl_})`:`background-image: url(${oneImgUrl})`">
							<view class="flex justify-center align-center bg-red bg_xiangji"  >
								<text class="hxIcon-xiangji" style="font-size:80upx"></text>
							</view>
							<text class="padding-sm">上传法人身份证正面</text>
						</view>
						
					
						
						
				
						
						<view class="flex  flex-direction  align-center justify-center shen_fen_zheng shen_bg_2"  @tap="ChooseImage_two" :style="twoImgUrl ===''?`background-image: url(${twoImgUrl_})`:`background-image: url(${twoImgUrl})`">
							
							<view class="flex justify-center align-center bg-red bg_xiangji"  >
								<text class="hxIcon-xiangji" style="font-size:80upx"></text>
							</view>
							<text class="padding-sm">上传法人身份证反面</text>
						
						</view>
						
					
					
					
					
				</view>
			</view>
			
		</view>
		
		<view class="btn_ bg-white flex justify-center">
			<view class="padding flex flex-direction" style="width: 80%;">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">保存并下一步</button>
			</view>
		</view>
		
		
		<w-picker 
			:mode="shenFenTimeData.mode"
			:defaultVal="shenFenTimeData.value" 
			@confirm="onConfirm" 
			themeColor="#f00"
			:ref="shenFenTimeData.picker" 
			:current="true"
			startYear="1919" 
			endYear="2119"
		>
		</w-picker>

	</view>
</template>

<script>
	const qiniuUploader = require('../../../../common/qiniuUploader.js')
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {getPageAllInfo as mixins } from '../../../../mixins/qymMixins.js'
	export default{
		mixins:[mixins], 
		onLoad(route){
			this.getData.StoreID=route.StoreID
			this.type = 2
			//this.getCurryStorage(2)
		},
		onShow(){
			this.type = 2
			//this.getCurryStorage(2)	
		},
		data(){
			return {
				type:0,
				getData:{
					StoreID:'',//店铺id
					FaRenName:'',//法人姓名
					FaRenNo:'',//法人身份证
					SFZYXQ:'',//法人身份证有效期
					SFZPic1:'',//照片正面
					SFZPic2:'',//照片背面
				},
				oneImgUrl:'',//正面
				twoImgUrl:'',//背面
				oneImgUrl_:'https://img.huaxuapp.com/id1.jpg',
				twoImgUrl_:'https://img.huaxuapp.com/ID2.jpg',
				imgList:[],//照片数组
				shenFenTimeData:{
					mode:"range",
					value:[0,0,0,0,0,0,0],
					picker:"range"
				},
				valueShenFenTime:'',
				inputAry:[
					{
						textName:'法人姓名',
						placeholder:'请输入法人真实姓名',
						value:'',
						key:'FaRenName'
					},{
						textName:'法人身份证',
						placeholder:'请输入法人身份证号码',
						value:'',
						key:'FaRenNo'
					}
				],
				placeholderTitle:'请选择',
				adjustPosition:false,
			}
		},
		methods:{
			ChooseImage_one() {//选择正面图
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType:['album','camera'], //从相册选择
					success: async (res) => {
						this.oneImgUrl= await this.$api.zipImage(res.tempFiles[0].path)
						console.log(this.oneImgUrl)
					}
				})
			},
			ChooseImage_two() {//选择背面图
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success:async (res) => {
						this.twoImgUrl = await this.$api.zipImage(res.tempFiles[0].path)
						console.log(this.twoImgUrl)
					}
				})
			},
			submit(){//提交审核
				let FaRenNo
				for(let it of  this.inputAry){
					if(it.value===''){
						this.$api.msg(`请完善${it.textName}`,2000)
						return 
					}
					if(it.key==='FaRenNo'){
						FaRenNo=it.value
					}
				}
				if(!this.$api.isShenFenZheng(FaRenNo,this)){
					return 
				}
				if(this.valueShenFenTime===''){
					this.$api.msg('请选择身份证期限',2000)
					return
				}
				if(this.oneImgUrl ===''){
					this.$api.msg('请上传身份证正面')
					return
				}
				if(this.twoImgUrl===''){
					this.$api.msg('请上传身份证反面')
					return
				}
				return Promise.resolve().then(res=>{	
					for(let item of this.inputAry){
						var key = item.key
						if(key in this.getData){
							this.getData[key]=item.value
						}
					}
					this.imgList[0]=this.oneImgUrl
					this.imgList[1]=this.twoImgUrl
					let promiseAry=[]//异步上传
					this.imgList.forEach((it)=>{
						promiseAry.push(this.promiseUpload(it))
					})
					return  Promise.all(promiseAry)
				}).then(res=>{
					this.getData.SFZPic1=res[0]
					this.getData.SFZPic2=res[1]
					console.log(res,this.getData)
					return this.$Request.get(this.$store.state.secondrunscoresUrl,this.getData)
				}).then(res=>{
					if(res.IsSuccess){
						//this.setStorage(res.sqZzobj,2)	
						uni.navigateTo({
							url:`/pages/shopManagement/sonPage/jionrunscores/jionrunscoresThreePage?StoreID=${this.getData.StoreID}`
						})
					}
				})
			},
			promiseUpload(localPath){//一步上传照片
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
			onConfirm(val){
				console.log(val)
				this.getData.SFZYXQ=val.to
				this.valueShenFenTime=val.result
			},
			toggleTab(index){
				this.$refs.range.show();
			},
			back(){
				uni.navigateBack({
					
				})
			}
		},
		components: {
			wPicker
		},
	}
</script>


<style scoped>
	page{
		background: #DDDDDD;
	}
	.changeBusiness_{
		height:100%;
	}
	.border_bottom{
		border-bottom: 1px solid #DDDDDD;
	}
	.btn_{
		
	}
	.bg_xiangji{
		border-radius: 50%;
		width:100upx;
		height:100upx
	}
	.shen_bg_1{
		background-image: url('https://img.huaxuapp.com/id1.jpg');
	}
	.shen_bg_2{
		background-image: url('https://img.huaxuapp.com/ID2.jpg');
	}
	.shen_fen_zheng{
		width:500upx;
		height:300upx;
		background-size:cover;  
		background-repeat: no-repeat;
	}
</style>
