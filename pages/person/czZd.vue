<template>
	<view style="min-height:100vh;background:white;">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="title_grey_bgColor"  backColor="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">充值账单</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<block slot="content">充值账单</block>
			<!-- #endif -->
		</cu-custom>	
		<!-- #endif -->
		<view>
			
			<view>
				<view class="flex padding justify-between align-center" v-for="(item,i) of infoList" :key="i" style="border-bottom: 0.1px solid #e4e4e4;"> 
					<view class="flex align-center">						
						<view v-if="item.BankNo.length!=0" class="bbggii" style="width: 46upx;height: 46upx;background-image: url('https://img.91goodluck.com/jsmx_07.png');">
							
						</view>
						
						<view v-if="item.BankNo.length===0" class="bbggii" style="width:50upx;height:50upx;background-image: url('https://img.91goodluck.com/jsdzfb_03.png');">
							
						</view>
						
						<view class="margin-left-sm">
							<view>
								充值到账￥{{item.Score}}
							</view>
							<view class="text-sm margin-top-xs" style="color: rgb(180,180,180);">
								{{beTime(item.AddDate)}}
							</view>
						</view>
					</view>
					
					<view class="flex align-center">
						<view class="text-bold text-black" style="font-size: 34upx;">
							&yen; {{item.RealScore}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(e){
			this.getData.storeid = e.storeid*1
			this.getTime()
			this.getCurryInfo()
		},
		data(){
			return {
				pikerData:{
					mode:'date',
					fields:'month',
					value:'2019-08',
					start:'2015-01',
					end:'2100-01'
				},
				getData:{
					day:'',
					storeid:'',
					page:1,
					pagesize:15
				},
				infoList:[]
			}
		},
		methods:{
			after4(str){//截取银行卡后四位
				let strAry = str.split(' ')
				let newStr = ''
				strAry.forEach((it,i)=>{
					newStr += it
			    })
				let flag = 0
				let str_ = ''
				for(let i = newStr.length-1 ; i >=0 ; i--){
					flag +=1 
					if(flag<5){
			            str_ += newStr[i]
					}else{
			            break
			        }
					
			    }
				return str_.split('').reverse().join('')
			},
			async changeTime(e){
				this.pikerData.value = e.detail.value
				this.getData.day = e.detail.value
				this.getData.page=1
				this.getData.pagesize=10
				this.getCurryInfo()
			},
			getTime(){
				let day = (new Date()).Format("yyyy-M")
				this.getData.day = day	
				this.pikerData.value = day
			},
		 	async getCurryInfo(){
				let info = await this.$http.czZd(this.$store.state.userInfo.ID)
				console.log(info);
				let infoList = info.Data
				if(this.getData.page===1){
					if(infoList.length===0){
						let msgInfo =await this.$api.msg('暂无数据',2000)
					}
						this.infoList = infoList
				}else{
					if(infoList.length===0){
						this.$api.msg('已经到底啦')
					}else{
						this.infoList = [...this.infoList,infoList]
					}
				}
				return infoList
			},
		},
		onPullDownRefresh(){//下拉时刷新
			this.getCurryInfo()
			uni.stopPullDownRefresh()
		},
		onReachBottom(){//上拉加载
			this.getData.page+=1
			this.getCurryInfo()
		},
	}
</script>

<style>
	page{
		background: #F2F2F2;
	}
</style>
<style scoped>
	.bbggii{
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
