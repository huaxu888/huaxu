<template>
	<view class="changeBusiness_ ">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
	<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
		<!-- #ifdef APP-PLUS || H5-->
		<block slot="content">转商家</block>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<block slot="backText">转商家</block>
		<!-- #endif -->
	</cu-custom>
	<!-- #endif -->
		
		<view class="padding-left padding-tb title_ text-lg align-center flex" style="background: #F0F0F0;">
			<view class="text-bold">企业信息</view>
		</view>
		
		<view class="input_content">
			<form>
				<view class="cu-form-group" v-for="(item,i) of inputAry" :key="i" >
					<view class="title">{{item.textName}}</view>
					<input :placeholder="item.placeholder" name="input"
							:adjust-position="adjustPosition"
							v-model="item.value"
					></input>
				</view>
				
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group ">
					<view class="title">商铺分类</view>
					<picker @change="PickerChange" :value="index" :range="shopPicker"  range-key="StoreSortName" mode="selector">
						<view class="flex" >
							{{index>-1?shopPicker[index].StoreSortName:'请选择'}}
						</view>
					</picker>
				</view>
				<!-- #endif -->
				
				<!-- #ifdef MP-ALIPAY -->
				<view class="cu-form-group " @tap="chooseClass">
					<view class="title">商铺分类</view>
					<view>{{className}}</view>
					<view>请选择</view>
				</view>
				<!-- #endif -->
				
				<!-- <view class="cu-form-group">
					<view class="title">店铺类型</view>
					<radio-group name="sort" class="store-sort" @change="getSort">
						<label class="margin-right-sm">
							<radio value="0" :checked="storeSort == 0" class="red" :class="storeSort == 0 ? 'checked' : ''" /><text>普通店铺</text>
						</label>
						<label>
							<radio value="1" :checked="storeSort == 1" class="red" :class="storeSort == 1 ? 'checked' : ''"/><text>电商店铺</text>
						</label>
					</radio-group>
				</view> -->
						
				<view class="cu-form-group" >
					<view class="title">联系电话</view>
					<input :placeholder="`${placeholderTitle}联系方式`" name="input"
							:adjust-position="adjustPosition"
							v-model="valuePhone"
					></input>
				</view>
				
				<!-- <view class="cu-form-group" >
					<view class="title flex align-center" >
						<text>联系座机</text>
						<text style="color:rgb(128,128,128)">(非必填)</text>
					</view>
					<input :placeholder="`${placeholderTitle}联系座机`" name="input"
							:adjust-position="adjustPosition"
							v-model="valuePhoneZuoji"
					></input>
				</view> -->
				
				<view class="cu-form-group">
					<view class="title">店铺站点</view>
					<picker @change="siteChange" :value="siteIndex" :range="siteList"  range-key="SiteName" mode="selector">
						<view class="flex" >
							{{siteIndex>-1?siteList[siteIndex].SiteName:'请选择店铺站点'}}
						</view>
					</picker>
					
				</view>
				
				<view class="cu-form-group" @tap="toggleTab">
					<view class="title">店铺地址</view>
					<input 	placeholder="请选择店铺地址" name="input"
							:adjust-position="adjustPosition"
							v-model="valueAddress"
							disabled="true"
							@tap="toggleTab"
					></input>
				</view>
				
				<view class="cu-form-group" @tap="chooseMap" >
					<view class="title">详细地址</view>
					<input :placeholder="`请选择详细地址`" name="input"
							:adjust-position="adjustPosition"
							v-model="valueMap"
					></input>
					<text class="hxIcon-dingwei padding-lr text-df" style="font-size:32upx;"></text>
				</view>
				
			</form>
		</view>
		
		<view class="padding flex title_ text-lg align-center justify-between" style="background: #F0F0F0;">
			<view class="text-bold">资质上传</view>
			<view >
				{{imgList.length}}/4
			</view>
		</view>
		<view>
			<view class="cu-form-group padding-top-sm">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="btn_ bg-white">
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">提交审核</button>
			</view>
		</view>
	
		<w-picker
			mode="region"
			@confirm="onConfirm" 
			ref="region" 
			themeColor="#f00"
		></w-picker>	
	</view>
</template>

<script>
	const qiniuUploader = require("../../common/qiniuUploader.js")
	//import wPicker from "@/components/w-picker/w-picker.vue";
	//import wPicker from "../../components/w-picker/w-picker.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {validatePhone} from '../../common/handle.js'
	let getData ={}
	export default{
		data(){
			return {
				className:'',
				valueAddress:'',//具体地址
				cityPicker:{
					mode:"region",
					name:"省市区",
					value:[26,6,0],
					picker:'region'
				},
				sheng:'',
				shi:'',
				xian:'',
				mode:'region',
				valuePhone:'',//电话
				valueMap:'',//地址
				placeholderTitle:'请输入',
				inputAry:[
					{
						textName:'企业名称',
						placeholder:`请输入营业执照上的全称`,
						value:'',
					},{
						textName:'营业执照',
						placeholder:'或18位统一信用代码',
						value:'',
					},{ 
						textName:'商铺名称',
						placeholder:`请输入商铺名称`,
						value:'',
					}
				],
				adjustPosition:false,
				index:-1,
				shopPicker:[],
				imgList:[],//图片资料
				location:'',//经纬度
				StoreSortID:0,//店铺分类的id
				shopPickerInfo:[],
				valuePhoneZuoji:'',
				
				
				siteList:[],//所有的站点列表
				siteIndex:0,//站点的下标
				siteID:0,
				storeSort: '0'
			}
		},
		onLoad(){
			this.getStoresortlist()
			this.siteList = this.$store.state.siteList
			this.siteID = this.siteList[this.siteIndex].SiteID   
			console.log(this.siteID)
		},
		components: {
			wPicker
		},
		methods:{
			chooseClass(){
				let itemList = this.shopPicker.map(it=>it.StoreSortName)
				uni.showActionSheet({
					itemList
				}).then(data=>{
					var [err,res]=data
					console.log(res)
					var tapIndex = res.tapIndex
					if(tapIndex > -1){
						this.index = tapIndex
						this.shopPickerInfo.forEach(it=>{
							if(it.StoreSortName===this.shopPicker[this.index].StoreSortName){
								this.className = it.StoreSortName
								this.StoreSortID=it.StoreSortID
							}
						})
					}else{
						this.$api.msg('取消选择',2000)
					}
				})
			},
			getSort (e) {
				this.storeSort = e.detail.value
			},
			onConfirm(val){
				console.log(val)
				var province = val.checkArr[0]
				var city = val.checkArr[1]
				var area = val.checkArr[2]
				this.valueAddress=val.result
				this.sheng=province
				this.shi=city
				this.xian=area
				//console.log(val) 
			},
			toggleTab(index){
				this.$refs.region.show();
			},
			getStoresortlist(){//获取分类的下拉框
				this.$Request.get(this.$store.state.storesortlistUrl,{
					siteid:0,
					num:0
				},false).then(res=>{
					console.log(res)
					res.forEach(it=>{
						this.shopPicker.push({StoreSortName:it.StoreSortName})
					})
					console.log(this.shopPicker)
					this.shopPickerInfo=res
				})
			},
			PickerChange(e) {//选择下拉框
				this.index = e.detail.value
				//this.StoreSortID=e.detail.value.StoreSortID
				this.shopPickerInfo.forEach(it=>{
					if(it.StoreSortName===this.shopPicker[this.index].StoreSortName){
						this.StoreSortID=it.StoreSortID
					}
				})
			},
			DelImg(e) {//删除选择的照片
				uni.showModal({
					title: '尊敬的用户',
					content: '确定要删除图片资料吗？',
					cancelText: '不删除',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ViewImage(e) {//
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				})
			},
			ChooseImage() {//选择照片
			if(this.imgList.length===4){
				this.$api.msg('仅能上传4张图',2000)
				return 
			}
				//this.imgList.push(res.tempFilePaths[0])
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed','original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						let src  = res.tempFiles[0].path
						// #ifndef MP-ALIPAY
						this.$api.zipImage(src).then(res=>{
							console.log(res)
							this.imgList.push(res)
						},err=>{
							uni.showToast({
								title:'上传失败，请重新上传',
								duration:2000
							})
						})
						// #endif
						// #ifdef MP-ALIPAY
						this.imgList.push(res.tempFilePaths[0])
						// #endif
					}
				});
			},
			chooseMap(){//选择地图
				if(this.valueAddress===''){
					this.$api.msg('请先选择省市县',1500)
					return 
				}
				// #ifdef MP-WEIXIN
				console.log('微信小程序')
				uni.getSetting({  
                    success:(res) => {  
                        if (!res.authSetting['scope.userLocation']) {  
                            uni.authorize({  
                                scope: 'scope.userLocation',  
                                success:() => {  
                                    uni.chooseLocation({}).then(data=>{
                                    	var [err,res] = data
                                    	this.location=res.longitude+','+res.latitude
                                    	this.valueMap=`${res.address};${res.name}`
                                    	console.log(this.location)
                                    })
                                }  
                            })  
                        }else{  
                           uni.chooseLocation({}).then(data=>{
								var [err,res] = data
								this.location=res.longitude+','+res.latitude
								this.valueMap=`${res.address};${res.name}`
								console.log(this.location)
                           }) 
                        }  
                    }  
                })  
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseLocation({}).then(data=>{
					var [err,res] = data
					this.location=res.longitude+','+res.latitude
					this.valueMap=`${res.address};${res.name}`
					console.log(this.location)
				})
				// #endif
			},
			promiseUpload(localPath){
				var self=this
				return new Promise((resolve,rej)=>{
					qiniuUploader.upload(localPath, (res) => {
						   let path = 'https://img.huaxuapp.com/' + res.imageURL
							resolve(path)
						  }, (error) => {
						   self.$api.msg('图片过大，请上传450kb以内的图片,请重新上传')
							rej(error)
						  }, {
						   region: 'ECN',
						   domin: 'https://img.huaxuapp.com',
						   uptokenURL: 'https://newsapp.huaxuapp.com/api/getToken/gettoken',
						   shouldUseQiniuFileName: true
					})
				})
			},
			siteChange(e){//地址的选择
				this.siteIndex = e.detail.value
				this.siteID = this.siteList[this.siteIndex].SiteID
				// console.log(this.siteID,this.siteList[this.siteIndex].SiteID)
			},
			
			
			submit(){//提交审核
				return Promise.resolve(true).then((res)=>{
					if(this.inputAry[0].value===''){
						this.$api.msg('请输入企业名称',2000)
						return 
					}
					// if(this.inputAry[1].value.length!=18){
					// 	this.$api.msg('请输入正确的营业执照编码，18位编码',2000)
					// 	return 
					// }
					if(this.inputAry[2].value===''){
						this.$api.msg('请输入商铺名称',2000)
						return 
					}
					if(this.StoreSortID===0){
						this.$api.msg('请选择商铺分类',2000)
						return 
					}
					if(!validatePhone(this.valuePhone,this)){
						this.$api.msg('请输入正确的电话号码',2000)
						return 
					}
					if(this.location==='' || this.valueAddress === ''){
						this.$api.msg('请选择商铺地址',2000)
						return false
					}
					if(this.imgList.length===0){
						this.$api.msg('请上传资质图片',2000)
						return false
					}
					console.log(this.siteID)
					
					
					getData={//拼接传参需要的data
						sortid:this.StoreSortID,
						storename:this.inputAry[2].value,//encodeURIComponent(this.inputAry[2].value),
						location:this.location,
						phone:this.valuePhone,
						gsmc:this.inputAry[0].value,//encodeURIComponent(this.inputAry[0].value),
						address:this.valueMap,//encodeURIComponent(this.valueMap),
						yyzzno:this.inputAry[1].value,
						pics:'',
						userid:this.$store.state.userInfo.ID,
						sheng:this.sheng,//encodeURIComponent(this.sheng),
						shi:this.shi,//encodeURIComponent(this.shi),
						xian:this.xian,//encodeURIComponent(this.xian)
						siteID:this.siteID,//站点id
						storesort: this.storeSort
					}
					let promiseAry=[]//异步上传
					
					this.imgList.forEach(it=>{
						promiseAry.push(this.promiseUpload(it))
					})
					return  Promise.all(promiseAry)
				}).then(res=>{//发送请求
					if(!res){
						return res
					}
					getData.pics=res.join(',')
					console.log(res,getData.pics)
					return this.$Request.get(this.$store.state.sqDpUrl,getData)
				}).then(res=>{
					if(!res){
						return 
					}
					console.log(res)
					if(!res.IsSuccess){//出错
						this.$api.msg(res.Msg,1500,false)
					}else if(res.IsSuccess){
						this.$api.msg(res.Msg,1500,false)
						uni.navigateTo({//跳转至等待审核界面
							url:"/pages/changeBusiness/waitSubmit"
						})
					}
				})
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
	.changeBusiness_{
		height:100%;
	}
</style>
