<template>
	<view>
		<view v-if="!showLoading">
			<load-ing></load-ing>
		</view>
		
		<view v-if="showLoading">
			
			<view style="border-bottom: 2upx  solid #F0F0F0;">
				<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
				<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
					<!-- #ifdef APP-PLUS || H5-->
					<block slot="content">我的会员</block>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<block slot="content">我的会员</block>
					<!-- #endif -->
				</cu-custom>
				<!-- #endif -->
			</view>
			
			
			<view class="padding padding-tb-sm flex justify-center">
				<view class="title_BGi flex flex-direction align-center justify-center" >
					<view class="text-white ">
						全部会员
					</view>
					<view class="text-white  margin-tb-sm" style="font-size:80upx;font-weight:500">
						{{infoObj.TotalPeople}} <text class="text-df">人</text>
					</view>
					<view class="flex justify-between align-center" style="width:100%;padding: 0upx 100upx;" >
						<view v-for="(item,i) of tabList" :key="i"  :class="index==i?'active_':''"  @click="chosse({index:i,sort:item.sort})" v-if="i!=1" class="chooseBtn">
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view >
				<view>
					<view>
						<scroll-view class="floor-list " scroll-x  :scroll-with-animation="true">
							<view class="flex padding-lr justify-between align-end">
								<view class="padding-tb-sm flex align-center justify-center" style="width: 33%;"
									v-for="(item, index) in titeleList " :key="index"
									@tap="chooseTitle(item)"
									:class="index===titleFlag?'flagBottom animate':'putong_'"
									v-if="getData.sort===0"
								>
									<text>
										{{item.label}}
									</text>
								
								</view>	
								<view v-if="getData.sort!=0" class="padding-tb-sm">
									
								</view>
								
								
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
			<view class="margin-top-sm" :class="getData.sort===0?'animate2':'animate3'">
				<scroll-view scroll-y="true" style="height:790upx" @scrolltolower="scrolltolower">
					<view style="width:100%">
						<view class="padding-lr">
							<view class="flex justify-between list_Item bg-white  padding margin-bottom align-center" v-for="(item,i) of infoList" :key="i" @tap="goToDetail(item)" style="border-radius: 10upx;">
					
								<view class="flex align-center">
									<view :style="{backgroundImage:`url(${item.FaceURL})`}" class="title_img_log margin-right-sm"></view>
									
									<view>
										
										<view class="margin-bottom-xs">{{changeName(item.Nick)}}</view>
										
										<view class="flex align-center padding-tb-xs text-sm">
											<view class="text-gray  " >查看详情</view>
											<view class="text-gray  margin-left-xs" style="position: relative;top:4upx;">>>></view>	
										</view>
									</view>
									
								</view>
					
								<view class="flex flex-direction align-end text-gray">
									<text class="padding-bottom-xs">{{changePhone(item.Phone)}}</text>
								</view>	
							</view>
					
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(route) {
			this.getData.StoreID = route.StoreID
			this.getCurryInfo()
		},
		data() {
			return {
				showLoading:false,
				titleFlag:0,
				titeleList:[
					{
						label:'消费时间',
						typeSort:0
					},{
						label:'消费次数',
						typeSort:1
					},{
						label:'消费金额',
						typeSort:2
					}
				],
				infoObj: {},
				getData: {
					sort: 0,
					userid: this.$store.state.userInfo.ID,
					StoreID: '',
					page: 1,
					pagesize: 10,
					type:0
				},
				index: 0,
				infoList: [],
				tabList: [
					{
						text: '消费会员',
						icon: 'hxIcon-yue1',
						sort:0
					},{
						text: '预存',
						icon: 'hxIcon-hongbao',
						sort:2
					},{
						text: '直推会员',
						icon: 'hxIcon-jiantou',
						sort:1
					}
				]
			}
		},
		methods: {
			getCurryInfo() {
				return this.$Request.get(this.$store.state.mymemberUrl, this.getData,false).then(res => {
					this.showLoading=true
					if (res.IsSuccess) {
						this.infoObj = res
						// this.tabList.forEach(it => {
						// 	if (it.text === res.Sname) {
						// 		it.value = res.Number
						// 	}
						// })
						res.Data.forEach(it => {
							it.type = this.infoObj.Sname
						})
						if (this.getData.page === 1) {
							this.infoList = res.Data
							if(this.infoList.length===0){
								//this.$api.msg('暂无数据',2000)
							}
						} else {
							if(res.Data.length===0){
								//this.$api.msg('已经到底啦',1500)
							}else{
								this.infoList = [...this.infoList, ...res.Data]
							}
						}
					}
				})
			},
			chosse(item) {
				this.getData.type = 0
				this.titleFlag = 0
				let {index,sort}  = item
				console.log(index,sort)
				this.index = index
				this.getData.sort = sort
				this.getData.page = 1
				this.getCurryInfo()
			},
			time(timeDate){
				var date = new Date((timeDate.split('(')[1].split(")")[0])*1)//计算出时间				//转换成 xxx-xx-xx
				return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
			},
			changeName(name){
				let nick = name*1
				if(nick===nick){
					if(name.length!=11){
						return name
					}else{
						return this.changePhone(name)
					}
				}else{
					return name
				}
			},
			changePhone(phone){
				//return phone.substr(0, 3) + '****' + phone.substr(phone.length - 4);
				return phone
			},
			goToDetail(item){
				console.log(item)
				let ID = item.ID
				let Nick = item.Nick
				let FaceURL = item.FaceURL
				let Phone = item.Phone
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/myMemberDetail/myMemberDetail?ID=${ID}&Nick=${Nick}&FaceURL=${FaceURL}&Phone=${Phone}&StoreID=${this.getData.StoreID}`
				})
			},
			scrolltolower(e){
				this.getData.page += 1
				this.getCurryInfo()
			},
			chooseTitle(item){
				this.titleFlag = item.typeSort
				this.getData.type = item.typeSort
				this.getData.page = 1
				this.getCurryInfo()
			}
		},
		onPullDownRefresh() { //下拉时刷新
			this.getData.page = 1
			this.getCurryInfo().then(res => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() { //上拉加载
			this.getData.page += 1
			this.getCurryInfo()
		},
	}
</script>

<style>
	page {
		background:#FFFFFF;
	}

	.target {
		position: relative;

	}

	.title_card {
		margin-top: 70upx;
		color: #ffe8d9;
		background-image: url('https://img.huaxuapp.com/PNG-1.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 574upx;
		height: 262upx;
		z-index: 1000;
	}


	.tabber_item {
		width:45%;
	}

	.title_img_log {
		width: 110upx;
		height: 110upx;
		border-radius: 50%;
		background-size: cover;
		background-repeat: no-repeat;
	}
	
	.title_BGi{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('https://img.huaxuapp.com/allManber.png');
		height:286upx;
		border-radius: 10upx;
		width: 100%;
		box-shadow:0px 12px 15px -15px rgb(254,81,77)
	}
	.chooseBtn{
		border-radius: 100upx;
		border:2upx solid white;
		width: 200upx;
		height: 60upx;
		color:white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.active_{
		background: white;
		color: rgb(254,81,77);
	}
	
	.flagBottom{
		position: relative;
		font-weight: 800;
		font-size:30upx;
		color:black ;
	}
	.flagBottom:after{
		content: '';
		position: absolute;
		height: 6upx;
		border-radius:200upx;
		background: #ff5b2e;
		bottom:10upx;
		left:40%;
		right:40%;
		border-radius: 100upx;
	}
	
	.putong_{
		font-size: 28upx;
		color:rgb(180,180,180)
	}
	
	.list_Item{
		box-shadow:1px 6px 14px #F0F0F0
	}
	
	.animate{animation:fadeIn 0.8s 1;}
	
	.animate2{animation:slideInRight   0.5s 1;}
	
	.animate3{animation:  slideInLeft 0.5s 1 }
</style>
