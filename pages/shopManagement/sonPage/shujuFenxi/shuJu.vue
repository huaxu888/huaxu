<template>
	<view>
		<view>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-jingying" class="text-white" backColor="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">经营分析</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">经营分析</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		
		<view >
			<view class="bg-jingying" style="padding: 60upx 100upx;padding-bottom: 0;">
				<u-subsection :list="list" :current="curNow" :animation="true" buttonColor="#e9a555" active-color="#FFFFFF" bgColor="#ffffff" font-size="28" @change="sectionChange"
				style="width: 550upx;color: #333333;"></u-subsection>
			</view>
			<view class="bg-jingying" style="padding: 30upx 220upx;padding-bottom: 0;"  v-if="curNow==0">
				<view class="bg-white align-center flex" style="width: 320upx;border-radius: 10upx 10upx 0 0;margin-top: 20upx;padding: 8upx 20upx;">
					<picker mode="date" fields="day" start="1990-01-01" end="2040-01-01" @change="changeDay"  style="padding: 10upx 0upx;color: #333333;">
						<text>
							{{datas}}
						</text>
						<text style="color: #e9a555;margin-left: 15upx;">|</text>
						<text class="hxIcon-rili1" style="margin-left: 15upx;font-size: 28upx;"></text>
					</picker>
				</view>
			</view>
			<view class="bg-jingying" style="padding: 30upx 220upx;padding-bottom: 0;"  v-if="curNow==1">
				<view class="bg-white align-center flex" style="width: 320upx;border-radius: 10upx 10upx 0 0;margin-top: 20upx;padding: 8upx 20upx;">
					<picker mode="date" fields="day" start="1990-01-01" end="2040-01-01" @change="changeDays"  style="padding: 10upx 0upx;color: #333333;">
						<text>
							{{week}}
						</text>
						<text style="color: #e9a555;margin-left:8upx;">|</text>
						<text class="hxIcon-rili1" style="margin-left:8upx;font-size: 28upx;"></text>
					</picker>
				</view>
			</view>
			<view class="bg-jingying" style="padding: 30upx 220upx;padding-bottom: 0;"  v-if="curNow==2">
				<view class="bg-white align-center flex" style="width: 320upx;border-radius: 10upx 10upx 0 0;margin-top: 20upx;padding: 8upx 20upx;justify-content:center;">
					<picker mode="date" fields="month" start="1990-01-01" end="2040-01-01" @change="changeDayss"  style="padding: 10upx 0upx;color: #333333;">
						<text >
							{{yue}}
						</text>
						<text style="color: #e9a555;margin-left: 10upx;font-weight: 600;">|</text>
						<text class="hxIcon-rili1" style="margin-left: 10upx;font-size: 28upx;"></text>
					</picker>
				</view>
			</view>
			<view style="padding: 30upx;background-color: #FFFFFF;padding-top: 60upx;">
				<text style="font-size: 30upx;font-weight: 600;background-image: url(https://img.huaxuapp.com/cwfx_03.png);
				background-repeat: no-repeat;background-size: 114upx 14upx;background-position: bottom;">财务分析</text>
				<view class="text-center" style="margin-top:30upx;">
					<text style="font-weight: 600;font-size: 28upx;">营业收入(元)</text>
					<view  style="font-weight: 600;margin-top: 20upx;margin-bottom: 10upx;">
						<text style="font-size: 32upx;">￥</text>
						<text style="font-size: 54upx;">{{jryye}}</text>
						<text :class="[ZZL >= 0 ? 'hxIcon-jiantoushangsheng greens' : 'hxIcon-jiantouxiajiang reds']" style="font-size: 42upx;"></text>
					</view>
					<view v-if="curNow == 0">
						<text style="color: #999999;font-size: 24upx;">较上一日{{xiaoshu(ZZL)}}</text>
					</view>
					<view v-if="curNow == 1">
						<text style="color: #999999;font-size: 24upx;">较上一周{{xiaoshu(ZZL)}}</text>
					</view>
					<view v-if="curNow == 2">
						<text style="color: #999999;font-size: 24upx;">较上一月{{xiaoshu(ZZL)}}</text>
					</view>
				</view>
				<view class="flex" style="justify-content:space-around;margin-top: 70upx;color: #666666;padding-bottom: 20upx;">
					<view> 
						<view>
							<text style="color: #999999;">访客数(位)</text>
						</view>
						<view style="text-align: center;color: #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{VisitNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">订单数(单)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{TotalOrder}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">客单价(元)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{changeMoney(price)}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view style="padding: 30upx;background-color: #FFFFFF;margin-top: 20upx;padding-bottom: 600upx;padding-top: 30upx;">
				<text style="font-size: 30upx;font-weight: 600;background-image: url(https://img.huaxuapp.com/cwfx_03.png);
				background-repeat: no-repeat;background-size: 114upx 14upx;background-position: bottom;margin-top: 30upx;">用户分析</text>
				
				<view class="flex" style="justify-content:space-around;margin-top: 40upx;color: #666666;background-color: #f2f2f2;padding: 30upx 0;border-radius: 12upx;">
					<view> 
						<view>
							<text style="color: #999999;">预约到店(位)</text>
						</view>
						<view style="text-align: center;color: #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{BookNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">新访客(位)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{VisitNewNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">回头客(位)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{BackOrders}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view v-if="curNow==1">
			<view class="bg-jingying" style="padding: 60upx 100upx;padding-bottom: 0;">
				<u-subsection :list="list" :current="1" :animation="false" buttonColor="#e9a555" active-color="#FFFFFF" bgColor="#ffffff" font-size="28" @change="sectionChange"
				style="width: 550upx;color: #333333;"></u-subsection>
			</view>
			<view class="bg-jingying" style="padding: 30upx 220upx;padding-bottom: 0;">
				<view class="bg-white align-center flex" style="width: 320upx;border-radius: 10upx 10upx 0 0;margin-top: 20upx;padding: 8upx 20upx;">
					<picker mode="date" fields="day" start="1990-01-01" end="2040-01-01" @change="changeDays"  style="padding: 10upx 0upx;color: #333333;">
						<text>
							{{week}}
						</text>
						<text style="color: #e9a555;margin-left:8upx;">|</text>
						<text class="hxIcon-rili1" style="margin-left:8upx;font-size: 28upx;"></text>
					</picker>
				</view>
			</view>
			
			<view style="padding: 30upx;background-color: #FFFFFF;padding-top: 60upx;">
				<text style="font-size: 30upx;font-weight: 600;background-image: url(https://img.huaxuapp.com/cwfx_03.png);
				background-repeat: no-repeat;background-size: 114upx 14upx;background-position: bottom;">财务分析</text>
				<view class="text-center" style="margin-top:30upx;">
					<text style="font-weight: 600;font-size: 28upx;">营业收入(元)</text>
					<view  style="font-weight: 600;margin-top: 20upx;margin-bottom: 10upx;">
						<text style="font-size: 32upx;">￥</text>
						<text style="font-size: 54upx;">{{jryye}}</text>
						<text :class="[ZZL >= 0 ? 'hxIcon-jiantoushangsheng greens' : 'hxIcon-jiantouxiajiang reds']" style="font-size: 42upx;"></text>
					</view>
					<view>
						<text style="color: #999999;font-size: 24upx;">较上一周{{xiaoshu(ZZL)}}</text>
					</view>
				</view>
				<view class="flex" style="justify-content:space-around;margin-top: 70upx;color: #666666;padding-bottom: 20upx;">
					<view> 
						<view>
							<text style="color: #999999;">访客数(位)</text>
						</view>
						<view style="text-align: center;color: #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{VisitNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">订单数(单)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{TotalOrder}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">客单价(元)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{changeMoney(price)}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view style="padding: 30upx;background-color: #FFFFFF;margin-top: 20upx;padding-bottom: 600upx;padding-top: 30upx;">
				<text style="font-size: 30upx;font-weight: 600;background-image: url(https://img.huaxuapp.com/cwfx_03.png);
				background-repeat: no-repeat;background-size: 114upx 14upx;background-position: bottom;margin-top: 30upx;">用户分析</text>
				
				<view class="flex" style="justify-content:space-around;margin-top: 40upx;color: #666666;background-color: #f2f2f2;padding: 30upx 0;border-radius: 12upx;">
					<view> 
						<view>
							<text style="color: #999999;">预约到店(位)</text>
						</view>
						<view style="text-align: center;color: #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{BookNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">新访客(位)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text style="font-size: 36upx;">{{VisitNewNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">回头客(位)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{BackOrders}}</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		
		<!-- <view v-if="curNow==2">
			<view class="bg-jingying" style="padding: 60upx 100upx;padding-bottom: 0;">
				<u-subsection :list="list" :current="2" :animation="false" buttonColor="#e9a555" active-color="#FFFFFF" bgColor="#ffffff" font-size="28" @change="sectionChange"
				style="width: 550upx;color: #333333;"></u-subsection>
			</view>
			<view class="bg-jingying" style="padding: 30upx 220upx;padding-bottom: 0;">
				<view class="bg-white align-center flex" style="width: 320upx;border-radius: 10upx 10upx 0 0;margin-top: 20upx;padding: 8upx 20upx;justify-content:center;">
					<picker mode="date" fields="month" start="1990-01-01" end="2040-01-01" @change="changeDayss"  style="padding: 10upx 0upx;color: #333333;">
						<text >
							{{yue}}
						</text>
						<text style="color: #e9a555;margin-left: 10upx;font-weight: 600;">|</text>
						<text class="hxIcon-rili1" style="margin-left: 10upx;font-size: 28upx;"></text>
					</picker>
				</view>
			</view>
			
			<view style="padding: 30upx;background-color: #FFFFFF;padding-top: 60upx;">
				<text style="font-size: 30upx;font-weight: 600;background-image: url(https://img.huaxuapp.com/cwfx_03.png);
				background-repeat: no-repeat;background-size: 114upx 14upx;background-position: bottom;">财务分析</text>
				<view class="text-center" style="margin-top:30upx;">
					<text style="font-weight: 600;font-size: 28upx;">营业收入(元)</text>
					<view  style="font-weight: 600;margin-top: 20upx;margin-bottom: 10upx;">
						<text style="font-size: 32upx;">￥</text>
						<text style="font-size: 54upx;">{{jryye}}</text>
						<text :class="[ZZL >= 0 ? 'hxIcon-jiantoushangsheng greens' : 'hxIcon-jiantouxiajiang reds']" style="font-size: 42upx;"></text>
					</view>
					<view>
						<text style="color: #999999;font-size: 24upx;">较上一月{{xiaoshu(ZZL)}}</text>
					</view>
				</view>
				<view class="flex" style="justify-content:space-around;margin-top: 70upx;color: #666666;padding-bottom: 20upx;">
					<view> 
						<view>
							<text style="color: #999999;">访客数(位)</text>
						</view>
						<view style="text-align: center;color: #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{VisitNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text  style="color: #999999;">订单数(单)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{TotalOrder}}</text>
						</view>
					</view>
					<view>
						<view>
							<text  style="color: #999999;">客单价(元)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{changeMoney(price)}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view style="padding: 30upx;background-color: #FFFFFF;margin-top: 20upx;padding-bottom: 600upx;padding-top: 30upx;">
				<text style="font-size: 30upx;font-weight: 600;background-image: url(https://img.huaxuapp.com/cwfx_03.png);
				background-repeat: no-repeat;background-size: 114upx 14upx;background-position: bottom;margin-top: 30upx;">用户分析</text>
				
				<view class="flex" style="justify-content:space-around;margin-top: 40upx;color: #666666;background-color: #f2f2f2;padding: 30upx 0;border-radius: 12upx;">
					<view> 
						<view>
							<text style="color: #999999;">预约到店(位)</text>
						</view>
						<view style="text-align: center;color: #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{BookNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">新访客(位)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{VisitNewNums}}</text>
						</view>
					</view>
					<view>
						<view>
							<text style="color: #999999;">回头客(位)</text>
						</view>
						<view style="text-align: center;color:  #000000;font-weight: 600;margin-top: 20upx;">
							<text  style="font-size: 36upx;">{{BackOrders}}</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		 
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var canvaColumn = {};
	var canvaPie = {}
	export default {
		data() {
			return {
				show: false,
				mode: 'date',
				datas: 0 ,
				list: [
					{
						name: '日'
					}, 
					{
						name: '周'
					}, 
					{
						name: '月'
					}
				],
				yue: '',
				week: '',
				weeks: 0,
				yues: 0,
				getDatas: {
					StoreID: '',
					page: 1,
					pagesize: 10,
					day: '',
					yyyid: 0
				},
				getDaiLidata: {
					userid: this.$store.state.userInfo.ID,
					page: 1,
					pagesize: 10,
					day: ''
				},
				current: 0,
				curNow: 0,
				infoList: [],
				classIndex: 0,
				StoreID: 0,
				cWidth:750,
				cHeight: 500,
				pixelRatio: 1,
				infoObj: {},
				type: 0,
				shiTuTypeList: [{
					label: '日报',
					type: 0
				}, {
					label: '周报',
					type: 1
				}, {
					label: '月报',
					type: 2
				}],
				showShuJuList: [{
					label: '营业额总计',
					val: 1000,
					id: 'TotalNum',
					//bgc:'#eb5245'
				}, {
					label: '消费次数总计',
					val: 1000,
					id: 'TotalCount',
					//bgc:'#f6c471'
				}, {
					label: '次均消费',
					val: 1000,
					id: 'AverageNum',
					//bgc:'#466cf7'
				}],
				color: '#fae0a6',
				showTitle: '当日',
				getData: {
					StoreID: 0,
					userid: 0,
					day: 1, //1：每天的 2：每周的 3：每月的
					page: 1,
					pagesize: 10,
					sort: 6 //6表示当天
				},
				categories: [], //日期 时间节点
				series: [], //数值，对应时间节点的数据，
				yMax: '', //y轴的最大值
				XFLT: [],
				ZongShouRu: 0,
				BackOrders: 0, //回客
				BookNums: 0, //预定数
				VisitNewNums: 0, //新访客
				VisitNums: 0,  //访客数
				ZZL: 0,  //增长率
				jryye: 0, //今日营业额
				price: 0, //客单价
				TotalOrder: 0 ,//总订单
				sorts: 1,
				dates: '',
				years: '',
				dayss: '',
				tian: ''
			}
		},
		onLoad(route) {
			this.StoreID = route.StoreID * 1
			this.getData.StoreID = route.StoreID * 1
			this.getData.userid = this.$store.state.userInfo.ID;

			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			// this.getCurryInfo()
			
			this.getTime()
			this.days()
			this.huoqu(this.getData.StoreID, this.getData.userid)
			this.dates = this.getTimess()
			this.baobiao(this.getData.StoreID, this.dates, this.sorts)
		},
		methods: {
			xiaoshu(num) {
				let str= Number(num * 100).toFixed(2);
				str = this.getReadCount(str)
				str+="%";
				return str;
			},
			getReadCount(num) {
				let length = num.toString().length
				let result, tmp
				if(num > 0){
					num = '+'+num
				}
				if(num < 0){
					if (length < 7) {
						result = num
					} else {
						tmp = (num / 10000).toFixed(2)
						result = '> -999.99'
					}
				} else {
					if (length < 7) {
						result = num
					} else {
						tmp = (num / 10000).toFixed(2)
						result = '> +999.99'
					}
				}
				return result
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			huoqu() {
				this.$http.shangjia(this.getData.StoreID, this.getData.userid)
				.then(res => {
					console.log(res);
				})
			},
			baobiao() {
				
				this.$http.baobiao(this.getData.StoreID, this.dates, this.sorts)
				.then(res => {
					if(res.IsSuccess == true){
						this.BackOrders = res.BackOrders
						this.BookNums = res.BookNums
						this.VisitNewNums = res.VisitNewNums
						this.VisitNums = res.VisitNums
						this.ZZL = res.ZZL
						this.jryye = res.jryye
						this.price = res.price
						this.TotalOrder = res.TotalOrder
					}
				})
			},
			days() {
				console.log(this.getDatas.day);
				this.datas = this.getDatas.day
			},
			getTimes() {
				let day = (new Date()).Format("yyyy年MM月")
				this.getDaiLidata.day = day
				return day
			},
			getTimess() {
				let day = (new Date()).Format("yyyy-MM-dd")
				this.getDaiLidata.day = day
				return day
			},
			getTime() {
				let day_ = (new Date()).Format("yyyy年MM月dd日")
				this.getDatas.day = day_
				return day_
			},
			changeDay(e) {
				console.log(e)
				let dt = e.detail.value    
				let dts = dt.replace("-","年")
				let dtss = dts.replace("-","月")
				let dtsss = dtss + '日';
				this.datas = dtsss 
				this.sorts = 1
				this.dates = e.detail.value
				this.baobiao(this.getData.StoreID, this.dates, this.sorts)
			},
			changeDays(e) {
				console.log(e)
				let dt = e.detail.value
				dt = dt.split('-')
				dt = `${dt[0]}`
				let dts = dt 
				this.years = dts
				this.sorts = 2
				this.dates = e.detail.value
				this.baobiao(this.getData.StoreID, this.dates, this.sorts)
				// let zhou = e.detail.value.split(/,|\-|\s/g)
				this.getWeek(e.detail.value)
				let dtss = this.years + '年'+ this.yues + '月第' + this.weeks + '周'
				this.week = dtss
				
				let a = e.detail.value
				let b = a.split('-')
				this.dayss = `${dt[2]}`
			},
			changeDayss(e) {
				console.log(e)
				let dt = e.detail.value
				dt = dt.split('-')
				dt = `${dt[0]}-${dt[1]}`
				
				this.sorts = 3
				this.dates = e.detail.value
				this.baobiao(this.getData.StoreID, this.dates, this.sorts)
				this.yue = dt
				let dts = dt.replace("-","年")
				let dtss = dts + '月';
				this.yue = dtss
			},
			sectionChange(index) {
				this.curNow = index;
				if(this.curNow == 0){
					this.sorts = 1
					console.log(this.getTimess());
					this.dates = this.getTimess()
					let dt = this.dates
					console.log(dt);
					let dts = dt.replace("-","年")
					let dtss = dts.replace("-","月")
					let dtsss = dtss + '日';
					this.datas = dtsss 
					this.baobiao(this.getData.StoreID, this.dates, this.sorts)
				}
				if(this.curNow == 1){
					let date = new Date();
					this.getWeek(date)
					this.week = this.getTimes() + '第' + this.weeks + '周'
					this.sorts = 2
					this.dates = this.getTimess()
					this.baobiao(this.getData.StoreID, this.dates, this.sorts)
				}
				if(this.curNow == 2){
					this.yue = this.getTimes()
					this.sorts = 3
					this.dates = this.getTimess()
					this.baobiao(this.getData.StoreID, this.dates, this.sorts)
				}
			},
			dateFormat(date){
				let y = date.getFullYear()
				let m = date.getMonth() + 1
				let d = date.getDate()
				if (m <= 9) {
					m = '0' + m
				}
				if (d <= 9) {
					d = '0' + d
				}
				console.log(y );
				return y 
			},
			dateFormats(date){
				let y = date.getFullYear()
				let m = date.getMonth() + 1
				let d = date.getDate()
				if (m <= 9) {
					m = '0' + m
				}
				if (d <= 9) {
					d = '0' + d
				}
				return m
			},
			dateFormatss(date){
				let y = date.getFullYear()
				let m = date.getMonth() + 1
				let d = date.getDate()
				if (m <= 9) {
					m = '0' + m
				}
				if (d <= 9) {
					d = '0' + d
				}
				return d
			},
			getWeek(str) {
				console.log(str);
				str = Date.parse(str);
				console.log(str,490);
				str = new Date(str);
				console.log(str,492);
				this.tian = str
				console.log(str.getDate());
				console.log(str.getDay());
				let a  = str.getDay()
				if(a == 0) {
					a = 7
				}
				if(str.getDate() - a < 0) {
					var week = Math.ceil( -(str.getDate() - a )/7 ) ;
					console.log(week,494);
				} else {
					var week = Math.ceil((str.getDate() - a )/7 ) ;
					console.log(week,494);
				}
				
				let month = str.getMonth() + 1;
				console.log(month,496);
				console.log(str.getDay()+1);
				
				if (str.getDate() < 7) {
					if (str.getDay() !== 1) {
						week = 5
						month = str.getMonth();
						console.log('1111111111');
					}
					console.log('222222222222');
				}
				if(week == 0) {
					week = 1
				}
				if(month == 0) {
					month = 12
					this.years = this.years
				}
				console.log(`${month}-${week}`)
				
				this.showDate()
			},
			getWeeks(year, month) {
			    var d = new Date();
			    // 该月第一天
			    d.setFullYear(year, month - 1, 1);
				
				console.log(d);
			    var w1 = d.getDay();
				
				console.log(w1);
			    if (w1 == 0) {
					w1 = 7;
				} 
			    // 该月天数
			    d.setFullYear(year, month, 0);
			    var dd = d.getDate();
				console.log(dd);
			    // 第一个周一
			    let d1;
			    if (w1 != 1) {
					d1 = 7 - w1 + 2;
				} 
			    else {
					d1 = 1;
				}
				
				console.log(d1);
			    let week_count = Math.ceil((dd - d1 + 1) / 7);
				
			    return week_count;
			},
			getMonthWeek(a, b, c) {
			    var date = new Date(a, parseInt(b) - 1, c),
			    w = date.getDay(),
			    d = date.getDate();
			    return Math.ceil((d + 6 - w) / 7);
			},
			getMonDate() {
			    var d = new Date(),
			    day = d.getDay(),
			    date = d.getDate();
			    if (day == 1) return d;
			    if (day == 0) d.setDate(date - 6);
			    else d.setDate(date - day + 1);
			    return d;
			},
			getMondayTime(year, month,weekday) {
			        var d = new Date();
			        // 该月第一天
			        d.setFullYear(year, month-1, 1);
			        var w1 = d.getDay();
			        if (w1 == 0) w1 = 7;
			        // 该月天数
			        d.setFullYear(year, month, 0);
			        var dd = d.getDate();
			        // 第一个周一
			        let d1;
			        if (w1 != 1) d1 = 7 - w1 + 2;
			        else d1 = 1;
			        var monday = d1+(weekday-1)*7;
			        return monday;
			    },
			getDayName(day) {
			    var day = parseInt(day);
			    if (isNaN(day) || day < 0 || day > 6) return false;
			    var weekday = ["周一", "周二", "周三", "周四", "周五", "周六","周日" ];
			    return weekday[day];
			},
			showDate(){
				let that=this;
				var d=this.getMonDate();
				var ds=this.tian;
				console.log(ds);
				var arr=[];
				for(var i=0; i<7; i++) {
					let weekDay=this.getDayName(d.getDay());
					let date=d.getDate()+'日';
					if(weekDay=='周一'){
						let beginTime=ds.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
						beginTime = beginTime;
					}
					if(weekDay=='周日'){
						let endTime=ds.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
						endTime = endTime;
					}
					arr.push({weekDay:weekDay,date:date});
					d.setDate(d.getDate()+1);
				}
				let month=ds.getMonth()+1;
				let weeks=this.getMonthWeek(ds.getFullYear(),month,ds.getDate())-1;
				//每月周一日期
				let oneDate=that.getMondayTime(ds.getFullYear(),month,1);
				if(ds.getDate()<oneDate){
					month=ds.getMonth();
					weeks=this.getWeeks(ds.getFullYear(),month);
				}
				console.log('month:',month,'weeks:',weeks);
			   this.weeks = weeks
			   if(month == 0) {
				  month = 12
				  this.years = this.years - 1
			   }
			   this.yues = month
			},
			//1是当天 2是前天 往前类推
			// async getCurryInfo() { //初始化化当前页面的所有数据
			// 	let res = await this.$Request.get(this.$store.state.myxfdaydetail, this.getData)
			// 	let categories = []
			// 	let Pie = {
			// 		series: [{
			// 			name: '',
			// 			data: 0,
			// 			color:'#DC143C'
			// 		}, {
			// 			name: '',
			// 			data: 0,
			// 			color:'#DA70D6'
			// 		}, {
			// 			name: '',
			// 			data: 0,
			// 			color:'#FF00FF'
			// 		}, {
			// 			name: '',
			// 			data: 0,
			// 			color:'#7B68EE'
			// 		}, {
			// 			name: '',
			// 			data: 0,
			// 			color:'#00BFFF'
			// 		}, {
			// 			name: '',
			// 			data: 0,
			// 			color:'#00FFFF'
			// 		}, {
			// 			name: '',
			// 			data: 0,
			// 			color:'#FFD700'
			// 		}]
			// 	}
			// 	if (res.IsSuccess) {

			// 		/*列表项数据*/
			// 		if (this.getData.page === 1) {
			// 			this.infoList = res.Data
			// 		} else {
			// 			this.infoList = [...this.infoList, ...res.Data]
			// 		}
			// 		/*********/

			// 		/*为初始化柱状图做数据准备*/
			// 		let XFLT = res.XFLT.reverse()
			// 		this.XFLT = XFLT
			// 		let data = []
			// 		/*取出年月日以及相应的值*/
			// 		XFLT.forEach((it,i) => {
						
						
			// 			/*取出月日*/
			// 			let yue = it.Date.split('-')[1]
			// 			let ri = it.Date.split('-')[2]
			// 			let date = `${yue}-${ri}`
			// 			categories.push(date)
			// 			/********/
			// 			/*取出营业总额*/
			// 			data.push(it.Totalprice)
			// 			/************/


			// 			/*玫瑰图配置*/
			// 			let date_ 
						
						
			// 			if(this.getData.day*1===1){
			// 				date_ = `${yue}月${ri}日`
			// 			}else if(this.getData.day*1==2){
			// 				let num = 6
			// 				let numRes = num-i
			// 				if(numRes===0){
			// 					date_ = '本周'
			// 				}else{
			// 					date_ = `前${numRes}周`
			// 				}
			// 			}else if(this.getData.day*1==3){
			// 				let num = 6
			// 				let numRes = num-i
			// 				if(numRes===0){
			// 					date_ = '本月'
			// 				}else{
			// 					date_ = `前${numRes}月`
			// 				}
			// 			}
						
			// 			Pie.series[i].name = date_
			// 			Pie.series[i].data = it.Totalprice

			// 			/***********/

			// 		})
			// 		/********************/

			// 		this.categories = categories
			// 		this.series = [{
			// 			"name": this.showTitle + '交易额，单位（元）',
			// 			data
			// 		}]

			// 		let yMaxAry = data.map(it => it)
			// 		yMaxAry = yMaxAry.sort((a, b) => a - b)
			// 		this.yMax = yMaxAry[yMaxAry.length - 1] + 30
			// 		/***************************/

			// 	} else {
			// 		this.infoList = []
			// 		this.series = [{
			// 			"name": this.showTitle + '交易额，单位（元）',
			// 			data: [0, 0, 0, 0, 0, 0, 0]
			// 		}]
			// 		this.yMax = 0
			// 		categories = ['', '', '', '', '', '', '']
			// 	}

			// 	let Column = {
			// 		categories,
			// 		series: this.series,
			// 		yMax: this.yMax
			// 	};


			// 	console.log(Pie,Column)

			// 	this.showColumn("canvasColumn", Column);
			// 	this.getCurryAryInfo(6)
			// 	this.showPie("canvasPie", Pie);
			// },

			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding:0,
						lineHeight:20,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					series: chartData.series,
					animation: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							border: true,
							borderColor: '#FFFFFF',
							borderWidth: 3
						}
					},
				});
			},
			showColumn(canvasId, chartData) { //画图
				canvaColumn = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'column',
					colors: [this.color],
					enableMarkLine: true,
					dataPointShape: true,
					area: 15,
					legend: {
						show: true,
						margin: 10
					},
					fontSize: 11,
					background: '#F2F2F2',
					pixelRatio: this.pixelRatio,
					animation: true,
					categories: chartData.categories, //x坐标参数
					series: chartData.series, //列表项参数
					// enableScroll: true,//开启图表拖拽功能
					// xAxis: {
					// 	disableGrid:true,
					// 	type:'grid',
					// 	gridType:'dash',
					// 	itemCount:5,//x轴单屏显示数据的数量，默认为5个
					// 	scrollShow:true,//新增是否显示滚动条，默认false
					// 	scrollAlign:'left',//滚动条初始位置
					// },
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						max: chartData.yMax, //高度
						format(e) {
							return e.toFixed(0) + '元'
						}
					},
					dataLabel: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: this.cWidth * this.pixelRatio * 0.4 / chartData.categories.length
						},
						tooltip: {
							showBox: true, //是否显示半透明黑色的提示区域
							bgColor: '#000000', //主体背景颜色
							bgOpacity: 0.7, //背景颜色透明度
							gridType: 'dash', //辅助线类型（虚线）
							dashLength: 5, //虚线单段长度
							gridColor: '#1890ff', //辅助线颜色
							fontColor: '#FFFFFF', //主体文字颜色
							horizentalLine: true, //是否显示横向辅助线
							xAxisLabel: true, //是否显示X轴辅助标签
							yAxisLabel: true, //是否显示Y轴辅助标签
							labelBgColor: '#DFE8FF', //标签背景颜色
							labelBgOpacity: 0.95, //背景颜色透明度
							labelFontColor: '#666666' //标签文字颜色
						}
					}
				});

			},

			async refshInfoList() {
				let res = await this.$Request.get(this.$store.state.myxfdaydetail, this.getData, false)
				if (res.IsSuccess) {
					if (this.getData.page === 1) {
						this.infoList = res.Data
					} else {
						this.infoList = [...this.infoList, ...res.Data]
					}
				}
			},

			getCurryAryInfo(index) {
				if(index!=-1){
					console.log(this.XFLT)
					const TotalNum = this.XFLT[index].Totalprice
					const TotalCount = this.XFLT[index].TotalCount
					for (let value of this.showShuJuList) {
						let key = value.id
						if (key === 'TotalNum') {
							value.val = TotalNum
						} else if (key === 'TotalCount') {
							value.val = TotalCount
						} else if (key === 'AverageNum') {
							if (TotalNum === 0 || TotalCount === 0) {
								value.val = 0
							} else {
								value.val = this.$api.formatAmount((TotalNum / TotalCount))
							}
						}
					}
				}
			},

			touchColumn(e) {
				console.log(e)
				
				/*列表刷新,次数,总额,平均值刷新,柱状图不变*/
				let index = canvaColumn.getCurrentDataIndex(e)
				this.getCurryAryInfo(index)
				//this.refshInfoList()
				/**************************************/

				// this.getData.page = 1 //为分页做准备
				// this.getData.sort = index //为分页做准备


				/**展示点击图表的数字**/
				canvaColumn.showToolTip(e, {
					
					format: (item, category) => {
						item.color='#66ccff'
						console.log(item)
						if (typeof item.data === 'object') {
							return category + '成交额' + ':' + item.data.value + '元'
						} else {
							return category + '成交额' + ':' + item.data + '元'
						}
					}
				});
				/************************/
			},


			touchPie(e) {
				
				let index = canvaPie.getCurrentDataIndex(e)
				this.getCurryAryInfo(index)
				
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data +'元'
					}
				});
			},

			changeColor() {
				this.type += 1
				if (this.type > 2) {
					this.type = 0
				}
			},

			// classPickerChange(index_) {
			// 	let index = index_ * 1
			// 	this.classIndex = index
			// 	this.type = this.shiTuTypeList[index].type
			// 	this.getData.day = index + 1
			// 	this.getData.page = 1
			// 	this.getData.sort = 6
			// 	this.getCurryInfo()
			// },

			scrolltolower(e) {
				if (e.detail.direction === "bottom") {
					this.getData.page += 1
					this.refshInfoList()
				}
			}
		},
		watch: {
			type(n, o) {
				if (n === 0) { //日
					this.color = '#fae0a6'
					this.showTitle = '当日'
				} else if (n === 1) { //周
					this.color = '#ff5b2e'
					this.showTitle = '本周'
				} else if (n === 2) { //月
					this.color = '#333333'
					this.showTitle = '本月'
				}
				let classIndex = this.shiTuTypeList.find(it => {
					if (it.type === this.type) {
						return it
					}
				}).type

			}
		},
		async onPullDownRefresh() { //下拉时刷新
			//await this.getServerData();
			if(this.curNow == 0) {
				this.days()
				this.sorts = 1
				this.$http.baobiao(this.getData.StoreID, this.getTimess(), this.sorts)
				.then(res => {
					if(res.IsSuccess == true){
						this.BackOrders = res.BackOrders
						this.BookNums = res.BookNums
						this.VisitNewNums = res.VisitNewNums
						this.VisitNums = res.VisitNums
						this.ZZL = res.ZZL
						this.jryye = res.jryye
						this.price = res.price
						this.TotalOrder = res.TotalOrder
					}
				})
			}
			if(this.curNow == 1) {
				let date = new Date();
				this.getWeek(date)
				this.week = this.getTimes() + '第' + this.weeks + '周'
				this.sorts = 2
				this.$http.baobiao(this.getData.StoreID, this.getTimess(), this.sorts)
				.then(res => {
					if(res.IsSuccess == true){
						this.BackOrders = res.BackOrders
						this.BookNums = res.BookNums
						this.VisitNewNums = res.VisitNewNums
						this.VisitNums = res.VisitNums
						this.ZZL = res.ZZL
						this.jryye = res.jryye
						this.price = res.price
						this.TotalOrder = res.TotalOrder
					}
				})
			}
			if(this.curNow == 2) {
				this.yue = this.getTimes()
				this.sorts = 3
				this.$http.baobiao(this.getData.StoreID, this.getTimess(), this.sorts)
				.then(res => {
					if(res.IsSuccess == true){
						this.BackOrders = res.BackOrders
						this.BookNums = res.BookNums
						this.VisitNewNums = res.VisitNewNums
						this.VisitNums = res.VisitNums
						this.ZZL = res.ZZL
						this.jryye = res.jryye
						this.price = res.price
						this.TotalOrder = res.TotalOrder
					}
				})
			}
			uni.stopPullDownRefresh()

		},
	}
</script>

<style>
	page{
		background: #F2F2F2;
	}
	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.btnShiTu {
		padding: 20upx;
		/* 
		border-radius: 100upx;
		background: rgb(36,36,36);
		opacity:0.5;
		color:white; */
	}

	.red_box_item {
		width: 32%;
		background: #F75A64;
		border-radius: 10upx;
	}

	.text_center {
		text-align: center;
		font-size: 23upx;
		color:white;
	}
</style>

<style scoped>
	.reds{
		color: red;
	}
	
	.greens{
		color: green;
	}
	
	.chooseIt{
		position: relative;
		font-size:35upx;
	}
	.chooseIt:after{
		content: '';
		position: absolute;
		left: 0upx;
		right: 0upx;
		height: 4upx;
		border-radius: 10upx;
		background: #8d5b20;
		bottom:10upx;
	}
	.animate{animation:pulse  1s infinite;}
</style>