<template>
	<view style="min-height:100vh;background:white;">
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 2upx solid #e4e4e4;">
			<block slot="content">收益详情</block>
		</cu-custom>
		
		<view class="" style="background-color: #f6f6f6;height: 120upx;padding-top: 45upx;">
			<view class="flex justify-between " style="padding: 0 30upx;">
				<view class="flex align-center" >
					<view @tap="changeDayss">
						<picker mode="date" fields="month" start="1990-01-01" end="2040-01-01" @change="changeDayss"  style="background-color: #f6f6f6;color: #222222;font-size: 32upx;">
							<text >
								{{yue}}
							</text>
							<text class="cuIcon-triangledownfill" style="font-size: 36upx;margin-left: 6upx;" @tap="changeDayss"></text>
						</picker>
					</view>
				</view>
				<view style="font-size: 26upx;color: #999999;" class="flex align-center ">
					<text style="">当月收益：{{changeMoney(shouyi) || 0}}</text>
				</view>
			</view>
		</view>
		
		<view style="" v-if="infoList.length  > 0">
			<view class="flex padding justify-between align-center" v-for="(item,i) of infoList" :key="i" style="border-bottom: 0.1px solid #e4e4e4;"> 
				<view class="flex align-center">						
					<image src="https://img.huaxuapp.com/fggf.png" mode=""style="border-radius: 60upx;width: 60upx;height: 60upx;"></image>
					<view class="margin-left-sm">
						<view style="font-size: 28upx;">
							收益发放
						</view>
						<view class="text-sm margin-top-xs" style="color: #999999;font-size: 24upx;">
							{{beTime_(item.AddDate)}}
						</view>
					</view>
				</view>
				
				<view>
					<view class="flex " style="flex-direction: row-reverse;">
						<view class="text-bold text-black flex align-center" style="font-size: 34upx;">
							<text>+</text>
							<text>{{changeMoney(item.Scores)}}</text>
						</view>
					</view>
					<view  class="margin-top-xs" style="font-size: 22upx;color: #b5b5b5;">
						待释放金额￥{{changeMoney(item.JS)}}
					</view>
				</view>
			</view>
		</view>
		
		<view style="text-align: center;height: 400upx;margin-top: 180upx;background-color: #ffffff;" v-if="infoList.length == 0">
			<image src="https://img.huaxuapp.com/wukong.png" mode="aspectFill" style="width: 376upx;height: 250upx;"></image>
			<view style="margin-top: 20upx;">
				<text style="font-size: 28upx;color: #333333;">您还没有增值收益哦~</text>
			</view>
		</view>	
	</view>
</template>

<script>
	export default{
		data(){
			return {
				pikerData:{
					mode:'date',
					fields:'month',
					value:'2019-08',
					start:'2015-01',
					end:'2100-01'
				},
				infoList:[],
				yue:'',
				show: false,
				mode: 'date',
				ckday:'',
				pages:1,
				shouyi:0
			}
		},
		onLoad(e){
			this.yue = (new Date()).Format("yyyy-MM")
			
			this.$http.zzhbRecord(this.$store.state.userInfo.ID,this.yue,1,12).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.infoList = res.Data
					this.shouyi = res.TotalSum
				} else {
					this.infoList = []
				}
			})
			
		},
		onShow() {
			
		},
		methods:{
			changeMoney(money) {
				if(money){
					return this.$api.formatAmount(money);
				}
			},
			change(e) {
				console.log(e);
				this.yue = e.result
				this.$http.zzhbRecord(this.$store.state.userInfo.ID,this.yue,1,12).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.infoList = res.Data
						this.shouyi = res.TotalSum
					} else {
						this.infoList = []
					}
				})
			},
			getTimes() {
				let day = (new Date()).Format("yyyy-MM")
				return day
			},
			changeDayss(e) {
				console.log(e)
				let dt = e.detail.value
				dt = dt.split('-')
				dt = `${dt[0]}-${dt[1]}`
				this.pages = 1
				this.yue = dt
				this.$http.zzhbRecord(this.$store.state.userInfo.ID,this.yue,1,12).then(res => {
					console.log(res);
					if(res.IsSuccess){
						this.infoList = res.Data
						this.shouyi = res.TotalSum
					} else {
						this.infoList = []
					}
				})
			},
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
				
			},
			getTime(){
				let day = (new Date()).Format("yyyy-M")
				this.getData.day = day	
				this.pikerData.value = day
			},
		 	
		},
		onPullDownRefresh(){//下拉时刷新
			this.pages = 1
			this.$http.zzhbRecord(this.$store.state.userInfo.ID,this.yue,1,12).then(res => {
				console.log(res);
				if(res.IsSuccess){
					this.infoList = res.Data
					this.shouyi = res.TotalSum
				} else {
					this.infoList = []
				}
			})
		},
		onReachBottom(){//上拉加载
			this.pages += 1
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			
			this.$http.zzhbRecord(this.$store.state.userInfo.ID,this.yue,this.pages,12).then(res => {
				if (res.Data.length > 0) {
					this.infoList = this.infoList.concat(res.Data);
				} else {
					this.$api.msg('已经到最底啦~')
				}
				uni.hideLoading()
			})
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
