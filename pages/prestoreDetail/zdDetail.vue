<template>
	<view style="background: #ffffff;">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-whitesss" class="text-white" :isBack="true" >
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">账单详情</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">账单详情</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view style="padding-top: 30upx;">
			<view class="flex justify-center">
				<image src="https://img.huaxuapp.com/6454608_.pic.jpg" mode="" style="width: 100upx;height: 100upx;"></image>
			</view>
			
			<view class="flex justify-center" style="font-size: 30upx;margin-top: 30upx;">
				<text>花蓄商城</text>
			</view>
			
			<view class="flex justify-center" style="font-weight: 600;font-size: 56upx;margin-top: 30upx;">
				<text>- 150.00</text>
			</view>
			
			<view class="flex  align-center " style="margin-top: 90upx;">
				<view class="margin-tb-xs" style="width:100%;padding: 0 ;">
					<view class="flex justify-between  align-center" style="padding: 0 40upx;padding-top: 40upx; padding-bottom: 10upx;">
						<text class="text-gray">当前状态</text>
						<text class="text-black">{{Nick}}</text>
					</view>
					<view class="flex justify-between  align-center" style="padding: 0 40upx;padding-top: 40upx; padding-bottom: 10upx;">
						<text class="text-gray">商品</text>
						<text class="text-black">{{Nick}}</text>
					</view>
					<view class="flex justify-between  align-center" style="padding: 0 40upx;padding-top: 40upx; padding-bottom: 10upx;">
						<text class="text-gray">商户全称</text>
						<text class="text-black">{{Nick}}</text>
					</view>
					<view class="flex justify-between  align-center" style="padding: 0 40upx;padding-top: 40upx; padding-bottom: 10upx;">
						<text class="text-gray">支付时间</text>
						<text class="text-black">{{Nick}}</text>
					</view>
					<view class="flex justify-between  align-center" style="padding: 0 40upx;padding-top: 40upx; padding-bottom: 10upx;">
						<text class="text-gray">支付方式</text>
						<text class="text-black">{{Nick}}</text>
					</view>
					<view class="flex justify-between  align-center" style="padding: 0 40upx;padding-top: 40upx; padding-bottom: 10upx;">
						<text class="text-gray">交易单号</text>
						<text class="text-black">{{Nick}}</text>
					</view>
					<view class="flex justify-between  align-center" style="padding: 0 40upx;padding-top: 40upx; padding-bottom: 10upx;">
						<text class="text-gray">商户单号</text>
						<text class="text-black">{{Nick}}</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				timeFlag:false,
				typeFlag:true,
				AddDate:'',
				XFJE:0,
				Phone: '',
				Name: '',
				UserID:'',
				Timeid:0,
				Nick:'',
				yyyPhone:'',
				userName:'',
				Info: '',
				SYName: '',
				valueList:[
					{
						text:'手机号',
						value:'100',
						key:'yyyPhone',
					},
					{
						text:'支付时间',
						value:'2019-10-11?',
						key:'AddDate',
					},
					{
						text:'订单金额',
						value:'100',
						key:'XFJE',
					},
					{
						text:'收款单号',
						value:'一笔消费',
						key:'Info',
					},
				],
				getData:{
					XFID:'',
				},
				infoObj:{
					
				},
				infos:'',
				SJXFJE:0,
				sqt: 0
			}
		},
		onLoad(route){
			console.log(route)
			this.typeFlag = route.Sort === '2' ? true:false 
			this.timeFlag = route.Sort === '2' ? true:false 
			
			this.UserID = route.UserID
			this.getData.XFID = route.XFID
			this.Name = route.Name
			this.infos = route.info
			
			if(route.sqt == 9){
				this.SJXFJE = route.SJXFJE
				this.XFJE = 0
				this.sqt = 9
			} else {
				this.XFJE = route.XFJE
				this.SJXFJE = 0
				this.sqt = 0
			}
			let val = route.yyyPhone*1
			if(val===val){
				this.yyyPhone = val
			}else{
				this.yyyPhone = route.yyyPhone
			}
			//console.log(this.yyyPhone)
			//this.showSubmit()
			this.getCurryInfo()
		},
		onShow(){
			//this.showSubmit()
			//this.getCurryInfo()
		},
		methods:{
			getCurryInfo(){
				this.$http.xfXq(this.getData.XFID).then(res =>{
					console.log(res);
				// this.$Request.get(this.$store.state.storexfxqUrl,this.getData).then(res=>{
					if(res.IsSuccess){
						this.Nick = res.Nick
						this.infos = res.info
						this.SYName = res.SYName
						this.infoObj=res.Data
						
						for(let item  of  this.valueList){
							var key = item.key
							if(key in this.infoObj){
								var value=  this.infoObj[key]
								if(key === 'AddDate'){
									this.AddDate = value.split('(')[1].split(")")[0]*1
									console.log(value,this.AddDate)
									value = this.beTime(value)
								}
								if(key === 'XFZK' && value===null){
									value = '暂无折扣'
								}
								if(key === 'Sort'){
									if(value === 2){
										value='买单'
									}else{
										value = '退款'
									}
								}
								item.value = value
							}else{
								if(key === 'yyyPhone'){
									// if(({}).toString.call(this.yyyPhone)!="[object Number]"){
									// 	item.text = '收款人'
									// }
									item.value = this.yyyPhone
								}
							}
						}
					}
				})
			},
			submit(){//退款
				var data={
					userid:this.UserID,
					XFID:this.getData.XFID
				}
				return this.$Request.get(this.$store.state.rebackUrl,data).then(res=>{
					if(res.IsSuccess){
						this.timeFlag=false
						clearInterval(this.Timeid)
						setTimeout(()=>{
							this.$api.msg(res.Msg,2000)
						},500)
						uni.navigateBack({})
						return 
					}
				})
			},
			back(){
				uni.navigateBack({})
			}, 
			showSubmit(){
				const time = 180000
				this.Timeid = setInterval(()=>{
					var nowTime = Date.parse(new Date())
					console.log(nowTime,this.AddDate)
					if(nowTime - this.AddDate >= time){
						this.timeFlag=false
						clearInterval(this.Timeid)
					}else{
						this.timeFlag=true
					}
				},1000)
			}
		} 
	}
</script>

<style>
	page{
		background: #ffffff;
	}
</style>

<style scoped>
	.bbggii{
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>