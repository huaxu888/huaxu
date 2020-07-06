<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-white" :isBack="true" >
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">账单详情</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">账单详情</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view style="padding-left: 57upx;padding-top: 30upx;">
			<view class="flex flex-direction align-center bill_details">
				<view style="font-weight: 600;font-size: 44upx;position: absolute;left: 290upx;top: 418upx;"><text>收款成功</text></view>
				<!-- <view class="flex justify-center align-center margin-tb-xs  text-cut">
					<view  :class="typeFlag?'hxIcon-zhifuchenggong text-white':'text-yellow hxIcon-tui'"  style="font-size:50upx"></view>
					<view class="text-white text-lg margin-left-sm">{{phoneMosaic(Nick)}}</view>
				</view> -->
				
				<!-- <view class="text-white  text-white margin-tb-xs" style="font-size:80upx">
					<text v-show="!typeFlag">-</text>
					<text v-show="typeFlag">+</text>
					<text>{{XFJE}}</text>
				</view> -->
				
				<!-- <view class="margin-tb-xs text-lg">
					<text :class="typeFlag?'text-white':'text-black'">{{typeFlag?'交易成功':'退款成功'}}</text>
				</view> -->
				
				<view class="margin-tb-xs" style="width:100%;padding: 0 ;padding-top:330upx;">
					<view class="flex justify-between  align-center" style="padding: 0 40upx;padding-top: 40upx; padding-bottom: 10upx;">
						<text class="text-gray">付款方</text>
						<text class="text-black">{{Nick}}</text>
					</view>
					<view v-for="(item,i) of valueList" :key="i" class="flex justify-between padding align-center" style="padding: 0 40upx;padding-top: 30upx; padding-bottom: 10upx;">
						<text class="text-gray">{{item.text}}</text>
						<text class="text-black">{{item.value}}</text>
					</view>
					<view class="flex justify-between  align-center" style="margin: 0 40upx;margin-top: 30upx;padding-bottom: 40upx;border-bottom: 1upx solid #EEEEEE;">
						<text class="text-gray">收款人</text>
						<text class="text-black">{{SYName}}</text>
					</view>
					<view class="flex" style="justify-content:space-between;padding: 0 40upx;font-size: 30upx;margin-top: 55upx;">
						<text style="font-weight: 600;">收款总额</text>
						<text style="color: red;font-size: 48upx;font-weight: 600;"><text style="font-size: 30upx;font-weight: normal;">￥</text>{{XFJE}}</text>
					</view>
				</view>
				
			</view>
			
			
			<!-- <view class="btn_ bg-white flex justify-center" v-if="typeFlag && timeFlag">
				<view class="padding flex flex-direction" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">退款</button>
				</view>
			</view> -->
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
					// {
					// 	text:'交易方式',
					// 	value:'余额?',
					// 	key:'',
					// },
					
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
					// {
					// 	text:'会员折扣',
					// 	value:'80',
					// 	key:'XFZK'
					// },
					{
						text:'消费类型',
						value:'线下消费',
						key:''
					},
					{
						text:'订单金额',
						value:'100',
						key:'XFJE',
					},
					// {
					// 	text:'消费状态',
					// 	value:'抢单?',
					// 	key:''
					// },
					
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
			}
		},
		onLoad(route){
			console.log(route)
			this.typeFlag = route.Sort === '2' ? true:false 
			this.timeFlag = route.Sort === '2' ? true:false 
			this.XFJE = route.XFJE
			this.UserID = route.UserID
			this.getData.XFID = route.XFID
			this.Name = route.Name
			this.yyyPhone = route.yyyPhone
			this.Info = route.info
			
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
				this.$Request.get(this.$store.state.storexfxqUrl,this.getData).then(res=>{
					if(res.IsSuccess){
						this.Nick = res.Nick
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
										value='正常消费'
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
	.bill_details{
		background-image: url('https://img.huaxuapp.com/xqbg_03.png');
		background-repeat: no-repeat;
		background-size: cover;
		width: 660upx;
		height: 1080upx;
	}
	
</style>
