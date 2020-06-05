<template>
	<view>
		<view v-if="!showFlag">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">我的代理</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">我的代理</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
			<view>
				<view class="padding-lr padding-top" style="background:#ec3a46 ;">
					<view class="flex align-center">

						<view class="shop_log" :style="{backgroundImage: `url(${infoObj.user.FaceURL})`}">
						</view>

						<!-- <view class="shop_log" 
								styl="width:80upx;height:80upx;border:5upx solid #e54d42">
						</view> -->

						<view class="flex margin-left-sm text-white  flex-direction align-start">
							<text class="text-lg" style="font-size: 36upx;">{{infoObj.user.Nick}}</text>

							<view class="flex margin-top-xs align-center padding-lr-sm" style="padding-top: 4upx;padding-bottom: 4upx;border-radius: 20upx;background: #D03641;">
								<text :class="agentType===2 || agentType===3?'hxIcon-gerendaili':agentType===4?'hxIcon-quyudaili':''" style="font-size:28upx"></text>
								<text class="text-sm margin-left-xs">{{agentType===2?'个人代理':agentType===3?'高级代理':agentType===4?'省市代理':''}}</text>
							</view>
						</view>

					</view>


					<view class="align-center margin-top padding-tb-sm padding-lr-lg flex justify-between" style="background: #3a434e;border-radius:10upx 10upx 0upx 0upx;">
						<view class="flex" style="color:#fae5b8">
							<text>代理收益</text>
							<text class="margin-left">￥{{infoObj.realsum}}</text>
						</view>
						
						
						<text class="text-sm padding-lr-sm tXbTn" style="border-radius:10upx;padding-top: 4upx;padding-bottom: 4upx;"
						 @tap="poutMoney">
							立即提现
						</text>
						
						<!-- #ifndef APP-PLUS -->
						<!-- <text class="text-sm padding-lr-sm" style="background: #fae5b8;border-radius:10upx;padding-top: 4upx;padding-bottom: 4upx;"
						 @tap="tx">
							立即提现
						</text> -->
						<!-- #endif -->
					</view>
				</view>





				<view class="padding bg-white">
					<view class="flex align-center">
						<text class="hxIcon-yue1 text-red" style="font-size: 50upx;"></text>
						<text class="margin-left-sm text-black">我的业绩</text>
					</view>

					<view class="padding-top padding-bottom-xs margin-top-sm flex" :class="moneyList.length===2?'justify-center':''">
						<view :style="{width:moneyList.length===2?'50%':'33%'}" class="flex flex-direction justify-center align-center"  v-for="(item,i) of moneyList"
						 :key="i">
						 <!-- style="width: 33%;" -->
							<text class="margin-bottom-sm">￥{{item.value}}</text>
							<text class="text-sm">{{item.label}}</text>
						</view>
					</view>

				</view>




				<view style="width:100%;height:20upx;background: #F8F8F8;"></view>



				<view>
					<view class="flex justify-between bg-white padding align-center" v-for="(item,i) of goToList" :key="i" @tap="goToDetail(item)"
					 style="border-bottom: 2upx solid #F0F0F0;">
						<view class="flex align-center">
							<text :class="item.icon" style="font-size: 50upx;" class="text-red"></text>
							<view class="title margin-left-sm"><text>{{item.label}}</text></view>
						</view>
						<view>
							<text class="cuIcon-right"></text>
						</view>
					</view>
					
					<!-- <view class="flex justify-between bg-white padding align-center"  @tap="goToSj()" style="border-bottom: 2upx solid #F0F0F0;" v-if="agentType!=4">
						<view class="flex align-center">
							<text  style="font-size: 50upx;" class="text-red cuIcon-upload"></text>
							<view class="title margin-left-sm"><text>升级代理</text></view>
						</view>
						<view>
							<text class="cuIcon-right"></text>
						</view>
					</view> -->
				</view>
			</view>
		</view>

		<view v-if="showFlag">
			<load-ing></load-ing>
		</view>
        
        <view class="cu-modal" :class="isTx?'show':''" @touchmove.stop.prevent="moveHandle">
        	<view class="cu-dialog">
        		<view class="bg-img" style="background-image: url('https://img.huaxuapp.com/tixiantanchaung_03.png');height: 820upx;background-size: 92%;">
        			<view class="cu-bar justify-end text-white">
        				<view class="action" @tap="tx">
        					<text class="cuIcon-close "></text>
        				</view>
        			</view>
        		</view>
        		<view class="cu-bar bg-white">
        			<view class="action margin-0 flex-sub  solid-left" @tap="tx">我知道了</view>
        		</view>
        	</view>
        </view>
        




		<view class="cu-modal" :class="isTx?'show':''" @touchmove.stop.prevent="moveHandle">
			<view class="cu-dialog">
				<view class="bg-img" style="background-image: url('https://img.huaxuapp.com/tixiantanchaung_03.png');height: 820upx;background-size: 92%;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="tx">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="tx">我知道了</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="cu-modal" :class="isShow?'show':''" @touchmove.stop.prevent="moveHandle">
			<view class="cu-dialog">
				<view class="bg-img" style="height: 820upx;background-size: 92%;" :style="'background-image: url(' +imgUrl+ ');'">
					<view class="cu-bar justify-end text-white">
						<view class="action">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-red" >
					<view class="action margin-0 flex-sub solid-left" @tap="close">关闭</view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'',
				isShow: false,
				isTx: false,
				showFlag: true,
				infoObj: {},
				agentType: 3,
				moneyList: [{
					label: '业绩总额',
					value: 1,
					key: 'totalsum'
				}, {
					label: '累计提现',
					value: 1,
					key: 'agenttx'
				}
				],
				goToList: [{
					icon: 'hxIcon-xiaofeitixian',
					label: '提现明细',
					route: ''
				}, {
					icon: 'hxIcon-dianpushoukuanma',
					label: '推广二维码',
					route: '/pages/person/share'
				}, {
					icon: 'hxIcon-tuandui',
					label: '我的商家',
					route: ''
				}],
				userid: '',
				route_:'/pages/personalAgent/sonPage/myBusiness',
				tixianRoute:'/pages/shopManagement/sonPage/billDetails?billType=daili'
			}
		},
		onShow() {
			this.userid = this.$store.state.userInfo.ID
			this.getCurryInfo()
		},
		onPullDownRefresh(){
			this.getCurryInfo().then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			goToSj(){
				console.log(this.agentType)
				uni.navigateTo({
					url:`/pages/agency/applicationAgency?agencyType=${this.agentType}`
				})
			},
			tx(res) {
				this.isTx = !this.isTx
			},
			moveHandle() {},
			async goToDetail(obj) {
				uni.navigateTo({
					url: obj.route
				})
			},
			close() {
				this.isShow = false;
			},
			getCurryInfo() {
				const ManagerType = this.$store.state.userInfo.ManagerType
				return Promise.resolve(ManagerType).then(res=>{
					console.log(ManagerType)
					this.agentType = res
					if(this.agentType === 1){
						return this.$Request.get(this.$store.state.isAgenttypeUrl, {
							userid: this.userid
						},false).then(res => {
							if (res.IsSuccess) {
								console.log(res)
								if(res.Msg==='个人代理'){
									this.agentType = 2
								}else if(res.Msg==='高级代理'){
									this.agentType = 3
								}else if(res.Msg==='区域代理'){
									this.agentType = 4
								}
								//this.agentType = res.Data
								return this.typeInfoRoute()
							}else{
								setTimeout(()=>{
									setTimeout(()=>{
										this.$api.msg('您还不是代理')
									},100)
									uni.navigateBack({
										delta:1
									})
								},0)
								return 1
							}
						})
					}else{
						return this.typeInfoRoute()
					}
				}).then(res => {
					if(res!=1){
						console.log(res)
						let data = {
							userid: this.userid
						}
						let url = ''
						
						//2是个贷 3高代 4//区代理
						
						
						if (res === 2 || res ===3) {
							url = this.$store.state.agentPersonUrl
						} else if (res === 4) {
							url = this.$store.state.agenTareaesUrl
						}
						this.$Request.get(url, data,false).then(res => {
							if (res.IsSuccess) {
								console.log(res)
								let userInfo = res.Data.user
								this.showFlag = false
								this.infoObj = res.Data
								this.moneyList.forEach((item, i) => {
									var key = item.key
									if (key in this.infoObj) {
										var value = this.infoObj[key]
										item.value = value
									}
								})
								this.$store.commit('login',userInfo)
							} else {
								this.$api.msg(res.Msg)
							}
						})
						return this.infoObj
					}else{
						setTimeout(()=>{
							this.$api.msg('您还不是代理')
						},500)
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
			typeInfoRoute(){
				if (this.agentType === 2 || this.agentType===3) {
					this.goToList[2].label = '我的商家'
					this.goToList[2].route = `${this.route_}?agentType=${this.agentType}`
					this.goToList[0].route = `${this.tixianRoute}&state=${this.agentType}`
				} else if (this.agentType === 4) {
					this.goToList[2].label = '我的商家'
					this.goToList[2].route = `${this.route_}?agentType=${this.agentType}`
					this.goToList[0].route = `${this.tixianRoute}&state=${this.agentType}`
				}
				return this.agentType
			},
			poutMoney(){
                // // #ifndef APP-PLUS
                // this.isTx = true
                // return false
                // // #endif
				// this.infoObj.realsum = this.infoObj.realsum+100.35
				this.$api.showModal(
					{
						title:'收益提现',
						content:'您确定要提现全部收益吗？'
					}
				).then(res=>{
					//let flagObj = this.moneyIsTrue(this.infoObj.realsum)
					// if(flagObj.flag){
						
					// }else{
					// 	this.$api.msg('提现金额应为100及其的倍数')
					// }
					if(res){
						let num = this.infoObj.realsum*1
						let data ={
							num:num,
							userid:this.userid
						}
						let url = ''
						if (this.agentType === 2 || this.agentType===3) {
							url = this.$store.state.agentPoutUrl
						} else if (this.agentType === 4) {
							url = this.$store.state.agenTareaOutUrl
						}
						return this.$Request.get(url, data).then(res => {
							if (res.IsSuccess) {
								this.getCurryInfo() // 刷新页面
								this.$api.msg(res.Msg, 2000)
							} else {
								this.$api.msg(res.Msg, 2000)
							}
						})
					} else {
						this.$api.msg('取消提现', 1500)
					}
				})
			},
			moneyIsTrue(num){
				if(num>=100){
					num = num+''
					let index = num.indexOf(".")
					if(index!=-1){
						let numAry = num.split('')
						num = ''
						for(let i = 0 ; i < numAry.length ; i++ ){
							if(i<index){
								let it = numAry[i]
								num = num+it
							}else{
								break
							}
						}
						num = num*1
						return {
							flag:true,
							num
						}
					}
				}else{
					return {
						flag:false,
						num:0
					}
				}
			}
		}
	}
</script>

<style>
	.shop_log {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border: '5upx solid #e54d42';
		width:100upx;
		height:100upx;
		border-radius: 50%;
		/*background-image: url('https://img.huaxuapp.com/pig.png');*/
	}
	.tXbTn{
		background:#fae5b8;
	}
	.tXbTn:active{
		background:white;
	}
</style>
