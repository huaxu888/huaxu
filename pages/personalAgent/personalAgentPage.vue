<template>
	<view>
		<view v-if="!showFlag" style="background-image: url(https://img.huaxuapp.com/qudlbg_02.png);background-repeat: no-repeat;background-size: cover;width: 750upx;height: 510upx;">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">花蓄个人代理</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">花蓄个人代理</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
			<view>
				<view class="padding-lr padding-top" style="">
					<view class="flex align-center" style="margin-top: 30upx;">
						<view class="shop_logs flex justify-center align-center">
							<view class="shop_log" :style="{backgroundImage: `url(${infoObj.user.FaceURL})`}"></view>
						</view>
						<view class="flex margin-left-sm text-white  flex-direction align-start">
							<text class="text-lg" style="font-size: 36upx;">{{infoObj.user.Nick}}</text>

							<view class="flex margin-top-xs align-center padding-lr-sm" style="margin-top:16upx;padding-top: 4upx;padding-bottom: 4upx;border-radius: 20upx;background: #fbca1d;">
								<text :class="agentType===2 || agentType===3?'hxIcon-gerendaili':agentType===4?'hxIcon-quyudaili':''" style="font-size:24upx"></text>
								<text style="font-size:24upx" class="text-sm margin-left-xs">{{agentType===2?'初级代理':agentType===3?'高级代理':agentType===4?'区域代理':''}}</text>
							</view>
						</view>
					</view>
					
					<view class="flex justify-center" style="margin-top: 60upx;">
						<view style="background-color: #ffffff;width: 676upx;height: 438upx;margin-top: 0upx;border-radius: 20upx;-moz-box-shadow:0px 0px 4px 0px #dddddd;-webkit-box-shadow:0px 0px 4px 0px #dddddd;box-shadow:0px 0px 4px 0px #dddddd;">
							<view style="position: relative;">
								<view class="flex justify-center" style="margin-top: 40upx;font-size: 26upx;color: #999999;">
									<text>可提现资金</text>
									<view class="hxIcon-ai-code" @tap="erWei" style="font-size: 46upx;position: absolute;right: 50upx;color: #000000;"></view>
								</view>
								<view style="font-weight: 600;font-size: 42upx;color: #000000;text-align: center;margin-top: 30upx;">
									<text>{{changeMoney(realsum) || 0}}元</text>
								</view>
							</view>
							
							<view style="height: 2upx;background-color: #f2f2f2;margin-top: 30upx;"></view>
							
							<view class="flex justify-around" style="margin-top: 30upx;">
								<view class="" style="font-size: 26upx;text-align: center;">
									<view style="color: #999999;">业绩总额</view>
									<view style="color: #555555;margin-top: 20upx;">{{changeMoney(totalsum) || 0}}元</view>
									<button style="margin-top: 30upx;font-size: 26upx;width: 160upx;height: 60upx;line-height: 60upx;background-color: #fdefec;color: #d7674b;border-radius: 30upx;" open-type="share">
										推广商户
									</button>
								</view>
								<view class="" style="font-size: 26upx;text-align: center;">
									<view style="color: #999999;">累计提现</view>
									<view style="color: #555555;margin-top: 20upx;">{{changeMoney(agenttx) || 0}}元</view>
									<view @tap="poutMoney(changeMoney(totalsum))" style="margin-top: 30upx;font-size: 26upx;width: 160upx;height: 60upx;line-height: 60upx;background: linear-gradient(to right, #ff9b90, #dc7255);color: #ffffff;border-radius: 30upx;">
										提现
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex justify-center" style="margin-top: 40upx;">
					<view style="background-color: #ffffff;width: 678upx;height: 620upx;margin-top: 0upx;border-radius: 20upx;-moz-box-shadow:0px 0px 4px 0px #dddddd;-webkit-box-shadow:0px 0px 4px 0px #dddddd;box-shadow:0px 0px 4px 0px #dddddd;">
						<view @tap="myShop" style="background-color: #ffffff;height: 103upx;line-height: 103upx;display: flex;justify-content: space-between;padding: 0 30upx;border-radius: 20upx 20upx 0 0;">
							<view class="flex" style="font-size: 26upx;">
								<view class="hxIcon-list-1-copy" style="margin-right: 10upx;font-size: 42upx;"></view>
								<view style="color: #555555;">我的商户列表</view>
							</view>
							<view class="flex align-center">
								<view style="color: #b9b9b9;font-size: 24upx;">{{StoreCount || 0}}个</view>
								<view class="cuIcon-right" style="color: #b9b9b9;"></view>
							</view>
						</view>
						
						<view style="height: 2upx;background-color: #f2f2f2;"></view>
						
						<view @tap="gotoSh" style="background-color: #ffffff;height: 103upx;line-height: 103upx;display: flex;justify-content: space-between;padding: 0 30upx;">
							<view class="flex" style="font-size: 26upx;">
								<view class="hxIcon-mingxiicon" style="margin-right: 10upx;font-size: 42upx;"></view>
								<view style="color: #555555;">商户明细</view>
							</view>
							<view><text class="cuIcon-right" style="color: #b9b9b9;"></text></view>
						</view>
						
						<view style="height: 2upx;background-color: #f2f2f2;"></view>
						
						<view @tap="gotoZh" style="background-color: #ffffff;height: 103upx;line-height: 103upx;display: flex;justify-content: space-between;padding: 0 30upx;">
							<view class="flex" style="font-size: 26upx;">
								<view class="hxIcon-mingxi" style="margin-right: 10upx;font-size: 42upx;"></view>
								<view style="color: #555555;">账户明细</view>
							</view>
							<view><text class="cuIcon-right" style="color: #b9b9b9;"></text></view>
						</view>
						
						<view style="height: 2upx;background-color: #f2f2f2;"></view>
						
						<view @tap="gotoBank" style="background-color: #ffffff;height: 103upx;line-height: 103upx;display: flex;justify-content: space-between;padding: 0 30upx;">
							<view class="flex" style="font-size: 26upx;">
								<view class="hxIcon-yingshoukuanfenxi" style="margin-right: 10upx;font-size: 42upx;"></view>
								<view style="color: #555555;">收款账户</view>
							</view>
							<view class="flex align-center">
								<view style="color: #b9b9b9;font-size: 24upx;" v-if="BankNos">{{name}}</view>
								<view style="color: #b9b9b9;font-size: 24upx;" v-else>暂未绑定</view>
								<view class="cuIcon-right" style="color: #b9b9b9;"></view>
							</view>
						</view>
						
						<view style="height: 2upx;background-color: #f2f2f2;"></view>
						
						<view style="background-color: #ffffff;height: 103upx;line-height: 103upx;display: flex;justify-content: space-between;padding: 0 30upx;">
							<view class="flex" style="font-size: 26upx;">
								<view class="hxIcon-zhanghu" style="margin-right: 10upx;font-size: 42upx;"></view>
								<view style="color: #555555;">账户/手机号</view>
							</view>
							<view class="flex align-center">
								<view style="color: #b9b9b9;font-size: 24upx;">{{phone}}</view>
							</view>
						</view>
						
						<view style="height: 2upx;background-color: #f2f2f2;"></view>
						
						<button open-type="share" style="background-color: #ffffff;height: 103upx;line-height: 103upx;display: flex;justify-content: space-between;padding: 0 30upx;border-radius: 0 0 20upx 20upx;">
							<view class="flex" style="font-size: 26upx;">
								<view class="hxIcon-fenxiangbiaodanx" style="margin-right: 10upx;font-size: 42upx;"></view>
								<view style="color: #555555;">邀请注册代理</view>
							</view>
							<view><text class="cuIcon-right" style="color: #b9b9b9;font-size: 28upx;"></text></view>
						</button>
					</view>
				</view>
				
				<view style="height: 200upx;"></view>
			</view>
		</view>
		
		<view v-if="showFlag">
			<load-ing></load-ing>
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
				tixianRoute:'/pages/shopManagement/sonPage/billDetails?billType=daili',
				title: this.$store.state.userInfo.BankName,
				name: this.$store.state.userInfo.BankUserName,
				BankNo:this.$store.state.userInfo.BankNo,
				BankNos:'',
				phone:'',
				realsum:'',
				totalsum:'',
				agenttx:'',
				StoreCount:0
			}
		},
		onShow() {
			this.userid = this.$store.state.userInfo.ID
			this.getCurryInfo()
			this.title = this.$store.state.userInfo.BankName,
			this.name = this.$store.state.userInfo.BankUserName,
			this.BankNo = this.$store.state.userInfo.BankNo,
			this.BankNos = this.$store.state.userInfo.BankNo
			this.phone = this.$store.state.userInfo.Phone
			
			this.$http.personAgency(this.$store.state.userInfo.ID).then(res => {
				console.log(res);
				this.realsum = res.Data.realsum
				this.totalsum = res.Data.totalsum
				this.agenttx = res.Data.agenttx
				this.StoreCount = res.Data.StoreCount
			})
			// personAgencyTixian
			// personTixianList
			// personTeam
			// personShopTeam
		},
		onLoad() {
			this.title = this.$store.state.userInfo.BankName,
			this.name = this.$store.state.userInfo.BankUserName,
			this.BankNo = this.$store.state.userInfo.BankNo,
			this.BankNos = this.$store.state.userInfo.BankNo
		},
		onPullDownRefresh(){
			this.getCurryInfo().then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			changeMoney(money) {
				if(money){
					return this.$api.formatAmount(money);
				}
			},
			gotoSh(){
				uni.navigateTo({
					url:'/pages/personalAgent/jiaoyiAgent?agentType=' + this.agentType
				})
			},
			gotoZh(){
				uni.navigateTo({
					url:'/pages/personalAgent/mingxiAgent?agentType=' + this.agentType
				})
			},
			myShop(){
				uni.navigateTo({
					url:'/pages/personalAgent/sonPage/myBusiness?agentType=' + this.agentType
				})
			},
			erWei(){
				uni.navigateTo({
					url:'/pages/personalAgent/myAgent?agentType=' + this.agentType
				})
			},
			gotoBank(){
				uni.navigateTo({
					url:'/pages/person/bankCard?agentType=' + this.agentType
				})
			},
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
								if(res.Msg==='初级代理'){
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
			poutMoney(e){
				// this.$api.showModal(
				// 	{
				// 		title:'收益提现',
				// 		content:'您确定要提现全部收益吗？'
				// 	}
				// ).then(res=>{
				// 	if(res){
				// 		let num = this.infoObj.realsum*1
				// 		let data ={
				// 			num:num,
				// 			userid:this.userid
				// 		}
				// 		let url = ''
				// 		if (this.agentType === 2 || this.agentType===3) {
				// 			url = this.$store.state.agentPoutUrl
				// 		} else if (this.agentType === 4) {
				// 			url = this.$store.state.agenTareaOutUrl
				// 		}
				// 		return this.$Request.get(url, data).then(res => {
				// 			if (res.IsSuccess) {
				// 				this.getCurryInfo() // 刷新页面
				// 				this.$api.msg(res.Msg, 2000)
				// 			} else {
				// 				this.$api.msg(res.Msg, 2000)
				// 			}
				// 		})
				// 	} else {
				// 		this.$api.msg('取消提现', 1500)
				// 	}
				// })
				console.log(e);
				uni.navigateTo({
					url:'/pages/personalAgent/tixianAgent?ktx=' + e
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
			},
			onShareAppMessage(obj) {
				return {
					title: '邀您加入花蓄代理，享永久收益！',
					imageUrl: 'https://img.huaxuapp.com/dailijm.png',
					path: `/pages/common/login?tjrid=${this.$store.state.userInfo.ID || 0}`
				}
			},
			onShareTimeline: function () {
				return {
					title: '邀您加入花蓄代理，享永久收益！',
					imageUrl: 'https://img.huaxuapp.com/dailijm.png',
					path: `/pages/common/login?tjrid=${this.$store.state.userInfo.ID || 0}`
				}
			},
		}
	}
</script>

<style>
	page{
		background: #ffffff;
	}
</style>

<style>
	.shop_logs {
		background-color: #e1a693;
		width:118upx;
		height:118upx;
		border-radius: 50%;
	}
	
	.shop_log {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border: '5upx solid #e54d42';
		width:100upx;
		height:100upx;
		border-radius: 50%;
		/*background-image: url('https://img.huaxuapp.com/huaxulogo70px.png');*/
	}
	.tXbTn{
		background:#fae5b8;
	}
	.tXbTn:active{
		background:white;
	}
	
	button::after {
		border: none;
	}
</style>
