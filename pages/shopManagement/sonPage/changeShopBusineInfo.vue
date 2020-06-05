<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">修改商铺商圈信息</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">修改商铺商圈信息</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view>
			<view class="padding-left padding-tb title_ text-lg align-center flex" style="background: #F0F0F0;">
				<view class="text-bold">选择商圈位置</view>
			</view>
			<form>			
				
				<view class="cu-form-group">
					<view class="title">店铺站点</view>
					<picker @change="siteChange" :value="siteIndex" :range="siteList"  range-key="SiteName" mode="selector">
						<view class="flex" >
							{{siteIndex>-1?siteList[siteIndex].SiteName:'请选择店铺站点'}}
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group" v-if="busineList.length>0" >
					<view class="title">店铺商圈</view>
					<picker @change="busineChange" :value="busineIndex" :range="busineList"  range-key="BusName" mode="selector">
						<view class="flex" >
							{{busineIndex>-1?busineList[busineIndex].BusName:'请选择店铺站点'}}
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group animate" v-if="busineList.length===0">
					<view>
						暂无站点，敬请期待
					</view>
				</view>
				
			</form>
			<view class="padding-left padding-tb title_ text-lg align-center flex" style="background: #F0F0F0;">
				<view class="text-bold">商家广告</view>
			</view>
			<view class="padding bg-white" style="min-height: 200upx;width:100%">
				<textarea placeholder="请输入一句能表达品牌核心价值的广告语"  :auto-height="true" style="width:100%" @input="titleInput" :value="titleContent"></textarea>
			</view>
			
			<view class="padding-left padding-tb title_ text-lg align-center flex" style="background: #F0F0F0;">
				<view class="text-bold">广告展示图</view>
			</view>
			<view>
				<add-image :count="count" @imgList="imgList" :type="type"></add-image>
			</view>
			
			<view class="btn_ bg-white flex justify-center">
				<view  class="padding flex flex-direction" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">提交修改</button>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import addImage from './addShopInfo/components/addImage'
	const qiniuUploader = require('../../../common/qiniuUploader.js')
	export default{
		async onLoad(option){
			console.log(option)
			this.storeid = option.StoreID*1
			this.siteList = this.$store.state.siteList
			this.siteID = this.siteList[this.siteIndex].SiteID   
		},
		onShow(){
			this.getBusineList()
		},
		data(){
			return {
				storeid:0,
				siteList:[],
				siteIndex:0,//站点下拉框
				siteID:0,//站点id
				titleContent:'',
				type:'ggpics',
				count:1,
				busineList:[],//获取该站点的商圈列表
				busineIndex:0,
				BID:0,//商圈id
				ggpics:'',//广告图
			}
		},
		methods:{
			async getBusineList(){//根据站点获取商圈列表
				let getData = {
					siteid:this.siteID
				}
				let res = await this.$Request.get(this.$store.state.getBusstoreList,getData)
				if(res.IsSuccess){
					this.busineList = res.Data
				}else{
					this.$api.msg(res.Msg)
				}
			},
			siteChange(e){//站点的选择
				this.siteIndex = e.detail.value
				this.siteID = this.siteList[this.siteIndex].SiteID
				this.getBusineList()
			},
			titleInput(e){
				this.titleContent = e.detail.value
			},
			imgList(e){
				if(e.length!=0){
					this.ggpics = e[0].value
				}else{
					this.ggpics = ''
				}
			    console.log(e,this.ggpics)
			},
			busineChange(e){
				this.busineIndex = e.detail.value
				this.BID = this.busineList[this.busineIndex].BID
			},
			async submit(){//提交修改
				if(this.BID===0){
					this.$api.msg('请选择商圈，若该站点未开放商圈，暂时无法修改，尽请期待!',2000)
					return
				}
				if(this.titleContent.length===0){
					this.$api.msg('请填写广告语',2000)
					return 
				}
				if(this.ggpics.length===0){
					this.$api.msg('请上传广告宣传图',2000)
					return 
				}
				let ggpics = await this.promiseUpload(this.ggpics)
				let getData = {
					storeid:this.storeid,
					ggpics,
					ggcontent:this.titleContent,
					businessid:this.BID
				}
				let res = await this.$Request.get(this.$store.state.editbusiness,getData)
				
				if(!res.IsSuccess){//出错
					setTimeout(()=>{
						this.$api.msg(res.Msg,1500,false)
					},500)
					uni.switchTab({//跳去我的
						url: '/pages/index/person'
					})
				}else if(res.IsSuccess){
					this.$api.msg(res.Msg,1500,false)
					uni.navigateTo({//跳转至等待审核界面
						url:"/pages/changeBusiness/waitSubmit"
					})
				}
				
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
		},
		watch:{
			busineList(n,o){
				this.busineIndex = 0
				if(n.length===0){
					this.BID = 0
				}else{
					this.BID = n[this.siteIndex].BID
				}
			}
		},
		components:{
			addImage
		}
	}
</script>

<style scoped>
	.animate{animation:rubberBand   0.8s 1;}
	
	
	
</style>
