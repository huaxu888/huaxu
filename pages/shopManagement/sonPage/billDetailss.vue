<template>
	<view>
		<view class="bill_details">
			<load-ing ref="loading"></load-ing>
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-white" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">{{billType==='daili'?'提现':'营收'}}明细</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">{{billType==='daili'?'提现':'营收'}}明细</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>
		
		<view v-if="curNow==0" style="background-color: #FFFFFF;">
			<view class="flex  align-center justify-between  "  style="background: #ffffff;padding: 30upx 30upx; border-top: 1upx solid #dfdfdf;padding-right: 0;" :class="billType==='daili'?'padding-lr':''" >
				<view class="flex" style=" width:240upx;">
					<!-- <u-subsection :list="list" mode="subsection" :current="curNow" @change="sectionChange"  button-color="#e9a555" 
					active-color="#e9a555"  inactive-color="#e9a555" style="color: #e9a555;"></u-subsection> -->
					
					<view :class="[curNow == 0 ? 'baos' : '']">日报</view>
					<view :class="[curNow == 1 ? '' : 'bao']"  @tap="sectionChange">月报</view>
				</view>
				
				<view style="width:260upx;height:56upx;border-radius: 50upx;padding-right: 0;" class="flex justify-center align-center padding-sm"
				 v-if="billType==='daili'?false:yyyState===2?true:false">
					<view class="text-df">
						<picker @change="classPickerChange" :value="classIndex" range-key="info" :range="yYyList" mode="selector">
							<view class="flex flex-wrap ">
								<view class="flex justify-center"  style="color: #666666;">
									<view>{{yYyList[classIndex].Nick}}</view>
									<text class="cuIcon-triangledownfill" style="font-size: 36upx;"></text>
								</view>
							</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view style="background-color: #f2f2f2;height: 15upx;">
				
			</view>
			
			<view style="height:56upx;border-radius: 50upx;margin-top: 20upx;" class="flex  padding-sm ">
				<text class="cuIcon-back" style="margin-top: 4upx;color: #666666;padding: 8upx;" @tap="getBefOrAft(0,datas)"><text style="color: #666666;margin-left: 10upx;">前一天</text></text>
				
				<!-- <text class="" @tap="toggleTab" style="padding: 10upx 20upx;color: #333333;">{{datas}}</text> -->
				<view class="bg-white flex  align-center" style="margin-left: 20upx;padding: 30upx 20upx; border: 1upx solid #999999;border-radius: 10upx;">
					<picker mode="date" fields="day" start="1990-01-01" end="2040-01-01" @change="changeDay"  style="padding: 10upx 0upx;color: #333333;">
						<text>
							{{datas}}
						</text>
					</picker>
				</view>
				<text  style="margin-top: 4upx;color: #666666;padding: 8upx;margin-left: 20upx;" @tap="getBefOrAft(1,datas)">后一天
					<text class="cuIcon-right" style="margin-left: 10upx;"></text>
				</text>
			</view>
			
			<view style="width:100%;padding: 0 30upx;margin-top: 70upx;">
				<view class="flex  align-center justify-between" style="background-color: #e9a555;padding: 30upx 30upx;border-radius: 18upx;margin-top: 30upx;">
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center" style="margin-bottom: 4upx;">
							<text class="text-gray text-df" style="color: #f8e1c8;font-size: 26upx;">{{billType==='daili'?'当月提现总额(元)':'今日营业总额'}}</text>
						</view>
						<text class="padding-top-sm" style="font-size:45upx;color:#ffffff"><text style="font-size: 32upx;">￥</text>{{changeMoney(jryye)}} </text>
					</view>
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center" style="margin-bottom: 4upx;">
							<text class="text-gray text-df" style="color: #f8e1c8;font-size: 26upx;">收款笔数</text>
						</view>
						<text class="padding-top-sm" style="font-size:45upx;color:#ffffff">{{TotalOrder}}</text>
					</view>
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center" style="margin-bottom: 4upx;">
							<text class="text-gray text-df" style="color: #f8e1c8;font-size: 26upx;" @click="showTips">环比<text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;"></text></text>
						</view>
						<view  style="padding: 6upx 16upx;margin-top: 28upx; background-color: #ce8d40;border-radius: 26upx;" class="da">
							<text :class="[ZZLS<0 ? 'hxIcon-xiangxia' : 'hxIcon-xiangshang']" style="font-size:28upx;color:#ffffff"></text>
							<text class="padding-top-sm" style="color:#ffffff;margin-left: 10upx;">{{xiaoshu(ZZL)}}</text>
						</view>
					</view>
				</view>
			</view>
				<!-- #ifdef MP-WEIXIN || APP-PLUS || H5  -->
				<view  style="padding: 0 30upx;padding-bottom: 800upx;">
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY  -->
				<view  style="padding: 0 30upx;padding-bottom: 800upx;margin-top: 50upx;">
				<!-- #endif -->
				<u-time-line style="margin: 30upx 30upx;">
					<u-time-line-item v-for="(item,i) of infoObjs" :key="i" >
						<template v-slot:content >
							<view class="flex"  @tap="goToDetail(item)">
								<view class="triangle"></view>
								<image :src="item.PicUrl" mode="aspectFit" style="width: 80upx;height: 80upx;border-radius: 8upx;"></image>
								<view class=" flex flex-direction" style="margin-left: 30upx;">
									<text style="font-size: 30upx;">{{item.Nick}}</text>
									<text style="margin-top: 12upx;font-size: 24upx;color: #999999;">{{getLocalTime(item.AddDate)}}</text>
								</view>
							</view>
							<view style="position: absolute;top: 60upx;right: 60upx;font-weight: 600;"   @tap="goToDetail(item)">
								<text  style="font-size: 34upx;">+{{item.XFJE}}</text>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
				<view v-if="infoObjs.length == 0">
					<view style="text-align: center;margin-top: 110upx;">
						<image src="https://img.huaxuapp.com/kbsj.png" mode="aspectFill" style="width: 238upx;height: 276upx;color: #ce8d40;"></image>
						<view><text style="color: #999999;">暂无数据~</text></view>
					</view>
					
				</view>
			</view>
			<w-picker :mode="billTimeData.mode" :defaultVal="billTimeData.value" @confirm="onConfirm" themeColor="#f00" :ref="billTimeData.picker"
			 :current="true">
			</w-picker>
		</view>
		
		<view  v-if="curNow==1"  style="background-color: #FFFFFF;">
			<view class="flex  align-center justify-between"  style="background: #ffffff;padding: 30upx 30upx; border-top: 1upx solid #dfdfdf;padding-right: 0;" :class="billType==='daili'?'padding-lr':''">
				<view  class="flex" style="width:240upx;">
					<!-- <u-subsection :list="list" mode="subsection" :current="curNow" @change="sectionChanges"  button-color="#e9a555" 
					active-color="#e9a555" :animation="false" inactive-color="#e9a555" style="color: #e9a555;"></u-subsection> -->
					<view :class="[curNow == 0 ? '' : 'baosss' ]"  @tap="sectionChanges">日报</view>
					<view :class="[curNow == 1 ? 'baoss' : '']" >月报</view>
				</view>
				
				<view style="width:260upx;height:56upx;border-radius: 50upx;padding-right: 0;" class="flex justify-center align-center padding-sm"
				 v-if="billType==='daili'?false:yyyState===2?true:false">
					<view class="text-df">
						<picker @change="classPickerChange" :value="classIndex" range-key="info" :range="yYyList" mode="selector">
							<view class="flex flex-wrap ">
								<view class="flex justify-center" style="color: #666666;">
									<view>{{yYyList[classIndex].Nick}}</view>
									<text class="cuIcon-triangledownfill"  style="font-size: 36upx;"></text>
								</view>
							</view>
						</picker>
					</view>
				</view>
			</view>
				
			<view style="background-color: #f2f2f2;height: 15upx;">
				
			</view>
			
			<view style="height:56upx;border-radius: 50upx;margin-top: 20upx;" class="flex padding-sm">
				<text class="cuIcon-back" style="margin-top: 4upx;color: #999999;padding: 8upx;" @tap="getBefOrAfts(0,timeValue)"><text style="color: #666666;margin-left: 10upx;">前一月</text></text>
				<view class="bg-white flex  align-center " style="margin-left: 20upx;padding: 30upx 20upx; border: 1upx solid #999999;border-radius: 10upx;">
					<picker mode="date" fields="month" start="1990-01-01" end="2040-01-01" @change="changeDays"  style="padding: 10upx 10upx;color: #333333;">
						<text>
							{{timeValue}}
						</text>
					</picker>
				</view>
				<text  style="margin-top: 4upx;color: #666666;padding: 8upx;margin-left: 20upx;" @tap="getBefOrAfts(1,timeValue)">后一月<text class="cuIcon-right" style="margin-left: 10upx;"></text>
				</text>
			</view>
			
			<view style="width:100%;padding: 0 30upx;margin-top: 70upx;">
				<view class="flex  align-center justify-between" style="background-color: #e9a555;padding: 30upx 30upx;border-radius: 18upx;margin-top: 30upx;">
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center" style="margin-bottom: 4upx;">
							<text class="text-gray text-df" style="color: #f8e1c8;font-size: 26upx;">本月营业总额</text>
						</view>
						<text class="padding-top-sm" style="font-size:45upx;color:#ffffff"><text style="font-size: 32upx;">￥</text>{{changeMoney(YueShouRu)}} </text>
					</view>
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center" style="margin-bottom: 4upx;">
							<text class="text-gray text-df" style="color: #f8e1c8;font-size: 26upx;">收款笔数</text>
						</view>
						<text class="padding-top-sm" style="font-size:45upx;color:#ffffff">{{TotalOrders}}</text>
					</view>
					<view class="bg_title flex flex-direction align-center justify-center" style="width: 33%;">
						<view class="flex align-center" style="margin-bottom: 4upx;">
							<text class="text-gray text-df" style="color: #f8e1c8;font-size: 26upx;" @click="showTipss">环比<text class="hxIcon-wenhao3" style="font-size: 30upx;margin-left: 10upx;"></text></text>
						</view>
						<view  style="padding: 6upx 16upx;margin-top: 28upx; background-color: #ce8d40;border-radius: 26upx;"  class="da">
							<text  :class="[ZZLSS<0 ? 'hxIcon-xiangxia' : 'hxIcon-xiangshang']"  style="font-size:28upx;color:#ffffff"></text>
							<text class="padding-top-sm" style="color:#ffffff;margin-left: 10upx;">{{xiaoshu(ZZLs)}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN || APP-PLUS || H5  -->
			<view  style="padding: 0 30upx;padding-bottom: 800upx;">
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY  -->
			<view  style="padding: 0 30upx;padding-bottom: 800upx;margin-top: 50upx;">
			<!-- #endif -->
				<u-time-line style="margin: 30upx 30upx;">
					<u-time-line-item v-for="(item,i) of infoObjss" :key="i" >
						<template v-slot:content>
							<view class="flex" @tap="goToDetail(item)" >
								<view class="triangle"></view>
								<image :src="item.PicUrl" mode="aspectFit" style="width: 80upx;height: 80upx;border-radius: 8upx;"></image>
								<view class=" flex flex-direction" style="margin-left: 30upx;">
									<text style="font-size: 30upx;">{{item.Nick}}</text>
									<text style="margin-top: 12upx;font-size: 24upx;color: #999999;">{{getLocalTimes(item.AddDate)}}</text>
								</view>
							</view>
							<view style="position: absolute;top: 60upx;right: 60upx;font-weight: 600;" @tap="goToDetail(item)" >
								<text style="font-size: 34upx;">+{{item.XFJE}}</text>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
				<view v-if="infoObjss.length == 0" >
					<view style="text-align: center;margin-top: 110upx;">
						<image src="https://img.huaxuapp.com/kbsj.png" mode="aspectFill" style="width: 238upx;height: 276upx;color: #ce8d40;"></image>
						<view><text style="color: #999999;">暂无数据~</text></view>
					</view>
				</view>
			</view>
			<w-picker :mode="billTimeData.mode" :defaultVal="billTimeData.value" @confirm="onConfirm" themeColor="#f00" :ref="billTimeData.picker"
			 :current="true">
			</w-picker>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		getPageAllInfo as mixins
	} from '../../../mixins/qymMixins.js'
	export default {
		mixins: [mixins],
		data() {
			return {
				rSelect:[],
				list: [
					{
						name: '日报'
					}, 
					{
						name: '月报'
					}
				],
				curNow: 0,
				billTimeData: {
					mode: "yearMonth",
					value: [20, 6],
					picker: "yearMonth"
				},
				getData: {
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
				infoList: [],
				infoObj: {},
				billType: 'zhangdan',
				state: 0,
				yYyList: [{
					Nick: '全部收银员',
					ID: 0,
					FaceURL: 'https://img.huaxuapp.com/huaxulogo70px.png',
					shouyingyuan: {
						UserID: 0
					},
					Phone: 'xxxxxx'
				}],
				classIndex: 0,
				yearMonthPath: `/pages/shopManagement/sonPage/yearMonthBillDetails`,
				datas: 0 ,
				timeValue: '',
				page: 1,
				jryye: 0,
				TotalOrder: 0,
				ZZL: 0,
				ZZLS: 0,
				ZongShouRu: 0,
				infoObjs: {},
				pagesize: 10,
				infoObjss: {},
				jryyes: 0,
				TotalOrders: 0,
				ZZLSS: 0,
				ZZLs: 0,
				YueShouRu: 0,
				inx: 1,
				riqi: '',
				riqir: '',
				riqiy: ''
			}
		},
		onShow() {
			
		},
		onLoad(route) {
			console.log(this.yyyState);
			if (this.yyyState === 1) {
				this.getData.yyyid = this.$store.state.userInfo.ID
			}
			this.getTime();
			
			if ('billType' in route) {
				this.billType = route.billType
				this.state = route.state
				this.getCurryInfo(false)
			} else {
				console.log(this.billType);
				this.billTimeData.mode = 'date'
				this.getData.StoreID = route.StoreID
				this.yearMonthPath = `${this.yearMonthPath}?StoreID=${route.StoreID}`
				this.getYyY().then(res => {
					this.getCurryInfo(false)
				})
				
				this.riqi = this.getData.day
				this.$http.ribao(this.getData.StoreID,0, this.getData.day,this.page,this.pagesize)
				.then(res => {
					console.log(res);
					this.jryye = res.jryye
					this.TotalOrder = res.TotalOrder
					this.ZZLS = res.ZZL
					this.ZZL = Math.abs(res.ZZL) 
					this.ZongShouRu = res.ZongShouRu
					this.infoObjs = res.Data
					
				}).catch(err => {
					console.log(err);
				})
			}
			this.days()
			this.inx = 1
			this.curNow = 0
			this.riqir = this.formatDate(this.riqi, -1 )
			this.riqiy = this.formatDate(this.riqi, -1 )
		},
		methods: {
			 tapInfo(e) {
				if (this.rSelect.indexOf(e) == -1) {
					console.log(e)
					this.curNow = e
					this.rSelect.push(e);
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1);
				}
			},
			showTips() {
				
				uni.showToast({
					icon:'none',
				    title: `这里与${this.riqir}相比${this.ZZLS >= 0 ? '上升了' : '下降了'}${this.xiaoshu(this.ZZL)}`,
				    duration: 2000
				});
			},
			showTipss() {
				
				uni.showToast({
					icon:'none',
				    title: `这里与${this.riqiy}相比${this.ZZLSS >= 0 ? '上升了' : '下降了'}${this.xiaoshu(this.ZZLs)}`,
				    duration: 2000
				});
			},
			changdate(num = 1,date = false) {
				
			　　if (!date) {
			　　　　date = new Date();//没有传入值时,默认是当前日期
			　　　　date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			　　}
			　　date += " 00:00:00";//设置为当天凌晨12点
			　　date = Date.parse(new Date(date))/1000;//转换为时间戳
			　　date += (86400) * num;//修改后的时间戳
			　　var newDate = new Date(parseInt(date) * 1000);//转换为时间
			　　return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
			},
			getLocalTime: function(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours()
				let minutes = date.getMinutes()
				let seconds = date.getSeconds()
				month = month < 10 ? "0" + month : month;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				day = day < 10 ? "0" + day : day;
				seconds = seconds < 10 ? '0' + seconds : seconds
				date = `${hour}:${minutes}:${seconds}`;
				return date;
			},
			getLocalTimes: function(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours()
				let minutes = date.getMinutes()
				let seconds = date.getSeconds()
				month = month < 10 ? "0" + month : month;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				day = day < 10 ? "0" + day : day;
				seconds = seconds < 10 ? '0' + seconds : seconds
				date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
				return date;
			},
			xiaoshu(num) {
				let str= Number(num * 100).toFixed(2);
				str = this.getReadCount(str)
				str+="%";
				return str;
			},
			getReadCount(num) {
				let length = num.toString().length
				let result, tmp
				if (length < 7) {
					result = num
					this.inx = 1
				} else {
					tmp = (num / 10000).toFixed(2)
					result = '> 999.99'
					this.inx = 0
				}
				return result
			},
			changeDay(e) {
				this.datas = e.detail.value
				this.riqir = this.formatDate(this.datas, -1 )
				this.classIndex = 0
				this.$http.ribao(this.getData.StoreID,0,this.datas,this.page,this.pagesize)
				.then(res => {
					console.log(res);
					this.jryye = res.jryye
					this.TotalOrder = res.TotalOrder
					this.ZZLS = res.ZZL
					this.ZZL = Math.abs(res.ZZL) 
					this.ZongShouRu = res.ZongShouRu
					this.infoObjs = res.Data
					
				}).catch(err => {
					console.log(err);
				})
			},
			changeDays(e) {
				let time = e.detail.value
				this.classIndex = 0
				time = time.split('-')
				time = `${time[0]}-${time[1]}`
				this.timeValue = time;
				this.riqiy = this.formatDate(this.timeValue, -1 )
				this.getData.day = time
				this.getData.page = 1
				this.getCurryInfo()
				this.$http.yuebao(this.getData.StoreID,this.timeValue,0,this.page,this.pagesize)
				.then(res => {
					console.log(res);
					this.jryyes = res.jryye
					this.TotalOrders = res.TotalOrder
					this.ZZLSS = res.ZZL
					this.ZZLs = Math.abs(res.ZZL) 
					this.YueShouRu = res.YueShouRu
					this.infoObjss = res.Data
					
				}).catch(err => {
					console.log(err);
				})
			},
			getTimes() {
				let day = (new Date()).Format("yyyy-MM")
				this.getData.day = day
				this.getDaiLidata.day = day
				return day
			},
			getBefOrAft(type,date){
				let forMatDate = date.replace(/-/g, '/')
				let d = new Date(forMatDate)
				if(type === 0){
					d = +d - 1000*60*60*24
				}else if(type === 1){
					d = +d + 1000*60*60*24
				}
				d = new Date(d)
				this.datas = this.dateFormat(d)
				this.riqi = this.datas
				this.riqir = this.formatDate(this.riqi, -1 )
				this.classIndex = 0
				this.page = 1
				this.$http.ribao(this.getData.StoreID,0,this.datas,this.page,this.pagesize)
				.then(res => {
					console.log(res);
					this.jryye = res.jryye
					this.TotalOrder = res.TotalOrder
					this.ZZLS = res.ZZL
					this.ZZL = Math.abs(res.ZZL) 
					this.ZongShouRu = res.ZongShouRu
					this.infoObjs = res.Data
					
				}).catch(err => {
					console.log(err);
				})
			},
			getBefOrAfts(type,date){
				let forMatDate = date.replace(/-/g, '/')
				let d = new Date(forMatDate)
				if(type === 0){
					d = this.formatDate(new Date(date), -1)
					this.timeValue = d
					console.log(this.timeValue);
				}else if(type === 1){
					d = this.formatDate(new Date(date), 1)
					this.timeValue = d
					console.log(this.timeValue);
				}
				this.riqi = this.timeValue
				this.riqiy = this.formatDate(this.riqi, -1)
				this.classIndex = 0
				this.page = 1
				this.$http.yuebao(this.getData.StoreID,this.timeValue,0,this.page,this.pagesize)
				.then(res => {
					console.log(res);
					this.jryyes = res.jryye
					this.TotalOrders = res.TotalOrder
					this.ZZLSS = res.ZZL
					this.ZZLs = Math.abs(res.ZZL) 
					this.YueShouRu = res.YueShouRu
					this.infoObjss = res.Data
					
				}).catch(err => {
					console.log(err);
				})
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
				return y + '-' + m + '-' + d
			},
			formatDate (timesteamp, offset = 0, split = '-') {
				let date = new Date(timesteamp)
				let year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate()
				
				if (offset != 0) {
					if (this.curNow === 0) {
						let bigMonth = [1, 3, 5, 7, 8, 10, 12],
							smallMonth = [4, 6, 9, 11],
							monthDay = year % 4 === 0 ? 29 : 28
							day = day + offset
						
						if (bigMonth.includes(month)) {
							if (day > 31) {
								switch (month) {
									case 12:
										month = 1
										year ++
										day = 1
										break;
									default:
										month = month + 1
										day = 1
										break
								}
							} else if (day < 1) {
								switch (month){
									case 3:
										day = year % 4 === 0 ? 29 : 28
										month = 2
										break
									case 2:
										day = 31
										month = 1
										break
									case 1:
										day = 31
										month = 12
										year --
										break
									case 8:
										day = 31
										month = 7
									default:
										day = 30
										month --
										break
								}
							}
						} else if (smallMonth.includes(month)) {
							if (day > 30) {
								month = month + 1
								day = 1
							} else if (day < 1) {
								month = month - 1
								day = 31
							}
						} else if (month === 2) {
							if (day > monthDay) {
								month = 3
								day = 1
							} else if (day < 1) {
								month = 1
								day = 31
							}
						}
					} else if (this.curNow === 1) {
						month = month + offset
						if (month > 12) {
							year ++
							month = 1
						} else if (month < 1) {
							year --
							month = 12
						}
					}
				}
				
				if (month <= 9) {
					month = '0' + month
				}
				if (day <= 9) {
					day = '0' + day
				}
				
				if (this.curNow === 1) {
					return `${year}${split}${month}`
				} else {
					return `${year}${split}${month}${split}${day}`
				}
				
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			sectionChange(index) {
				this.curNow = 1;
				this.timeValue = this.getTimes()
				// if(index == 1){
				// 	uni.navigateTo({
				// 		url: this.yearMonthPath
				// 	})
				// }
				this.page = 1
				this.riqi = this.timeValue
				this.classIndex = 0
				this.$http.yuebao(this.getData.StoreID,this.timeValue,0,this.page,this.pagesize)
				.then(res => {
					console.log(res);
					this.jryyes = res.jryye
					this.TotalOrders = res.TotalOrder
					this.ZZLSS = res.ZZL
					this.ZZLs = Math.abs(res.ZZL) 
					this.YueShouRu = res.YueShouRu
					this.infoObjss = res.Data
					
				}).catch(err => {
					console.log(err);
				})
				
			},
			sectionChanges(index) {
				this.curNow = 0;
				this.page = 1
				if (this.yyyState === 1) {
					this.getData.yyyid = this.$store.state.userInfo.ID
				}
				this.getTime();
				this.billTimeData.mode = 'date'
				this.days()
				console.log(this.datas);
				this.riqi = this.datas
				this.classIndex = 0
				this.$http.ribao(this.getData.StoreID,0,this.datas,this.page,this.pagesize)
				.then(res => {
					console.log(res);
					this.jryye = res.jryye
					this.TotalOrder = res.TotalOrder
					this.ZZLS = res.ZZL
					this.ZZL = Math.abs(res.ZZL) 
					this.ZongShouRu = res.ZongShouRu
					this.infoObjs = res.Data
					
				}).catch(err => {
					console.log(err);
				})
				
			},
			showName(it) {
				let id = it.CZYID
				for (let val of this.yYyList) {
					let ID
					if ('ID' in val) {
						console.log(id, val)
						ID = val.ID
					} else {
						ID = val.UserID
					}
					if (id === ID) {
						return val.Name
					}
				}
			},
			classPickerChange(e) {
				this.classIndex = e.detail.value
				let value = this.yYyList[this.classIndex]
				
				
				if ('ID' in value) {
					this.getData.yyyid = value.ID
				} else {
					this.getData.yyyid = value.UserID
				}
				console.log(this.getData.yyyid);
				
				if(this.curNow == 0) {
					this.$http.ribao(this.getData.StoreID,this.getData.yyyid,this.datas,this.page,this.pagesize)
					.then(res => {
						console.log(res);
						this.jryye = res.jryye
						this.TotalOrder = res.TotalOrder
						this.ZZLS = res.ZZL
						this.ZZL = Math.abs(res.ZZL) 
						this.ZongShouRu = res.ZongShouRu
						this.infoObjs = res.Data
						
					}).catch(err => {
						console.log(err);
					})
				}
				
				if(this.curNow == 1) {
					this.$http.yuebao(this.getData.StoreID,this.timeValue,this.getData.yyyid,this.page,this.pagesize)
					.then(res => {
						console.log(res);
						this.jryyes = res.jryye
						this.TotalOrders = res.TotalOrder
						this.ZZLSS = res.ZZL
						this.ZZLs = Math.abs(res.ZZL) 
						this.YueShouRu = res.YueShouRu
						this.infoObjss = res.Data
						
					}).catch(err => {
						console.log(err);
					})
				}
				
				this.getData.page = 1
				this.getData.pagesize = 10
				this.getCurryInfo()
			},
			goToMonthDetail() {
				uni.navigateTo({
					url: this.yearMonthPath
				})
			},
			getYyY() {
				let data = {
					StoreID: this.getData.StoreID
				}
				return this.$Request.get(this.$store.state.getsyylistUrl, data, false).then(res => {
					if (res.IsSuccess) {
						this.yYyList = [...this.yYyList, ...res.Data]
						
						this.yYyList.forEach((it, i) => {
							let info = ''
							if (i === 0) {
								it.info = '全部'
							} else {
								it.info = `${it.Nick}(${it.Phone})`
							}
						})
						
						return this.yYyList
					}
				})
			},
			getTime() {
				let day = (new Date()).Format("yyyy-MM")
				let day_ = (new Date()).Format("yyyy-MM-dd")
				console.log(day_)
				console.log(this.getDaiLidata)
				this.getData.day = day_
				this.getDaiLidata.day = day
			},
			goToDetail(itemObjs) {
				console.log(itemObjs);
				
				uni.navigateTo({
					url: `/pages/shopManagement/sonPage/transactionDetailsPages?XFID=${itemObjs.XFID}&Sort=${itemObjs.Sort}&XFJE=${itemObjs.XFJE}&UserID=${itemObjs.UserID}&Nick=${itemObjs.Nick}&yyyPhone=${itemObjs.Phone}&info=${itemObjs.Info}&Name=${itemObjs.Name}`
				})
				return
			},
			getCurryInfo(showFlag = true) {
				let url = ''
				let data = {}
				if (this.billType != 'daili') {
					data = this.getData
					url = this.$store.state.storexxjlUrl
				} else {
					console.log('代理112233445566')
					if (this.state === '2' || this.state === '3') { //2,3是个人提现代理
						url = this.$store.state.agentPoutDetail
					} else if (this.state === '4') { //4是区域代理
						url = this.$store.state.agentareaOutDetailUrl
					}
					data = this.getDaiLidata
				}
				return this.$Request.get(url, data, showFlag).then(res => {
					if (res.IsSuccess) {
						this.$refs.loading.hidden()
						this.infoObj = res
						console.log(this.infoObj);
						if (this.getData.page === 1) {
							this.infoList = res.Data
							if (this.infoList.length === 0) {
							}
						} else {
							if (res.Data.length === 0) {
							} else {
								this.infoList = [...this.infoList, ...res.Data]
							}
						}
						return this.billType
					} else {
						//
					}
				})
			},
			back() {
				uni.navigateBack()
			},
			onConfirm(e) { //选择时间
				console.log(e);
				var time = e.checkArr
				if (this.billType === 'daili') {
					time = `${time[0]}-${time[1]}`
				} else {
					time = `${time[0]}-${time[1]}-${time[2]}`
				}
				console.log(time)
				if (this.billType === 'daili') {
					this.getDaiLidata.day = time
					this.getDaiLidata.page = 1
				} else {
					this.getData.day = time
					this.getData.page = 1
				}
				this.getCurryInfo()
				console.log(time);
				this.datas = time
				
				this.$http.ribao(this.getData.StoreID,0,this.datas,this.page,this.pagesize)
				.then(res => {
					console.log(res);
					this.jryye = res.jryye
					this.TotalOrder = res.TotalOrder
					this.ZZLS = res.ZZL
					this.ZZL = Math.abs(res.ZZL) 
					this.ZongShouRu = res.ZongShouRu
					this.infoObjs = res.Data
					
				}).catch(err => {
					console.log(err);
				})
			},
			toggleTab(index) {
				this.$refs.yearMonth.show();
			},
			days() {
				if (this.billType === 'daili') {
					this.datas = this.getDaiLidata.day
				} else {
					this.datas = this.getData.day
				}
			}
		},
		onPullDownRefresh() { //下拉时刷新
			this.page = 1
			this.curNow = 0
			if (this.yyyState === 1) {
				this.getData.yyyid = this.$store.state.userInfo.ID
			}
			this.getTime();
			this.billTimeData.mode = 'date'
			this.classIndex = 0
			this.days()
			this.$http.ribao(this.getData.StoreID,0, this.getData.day,this.page,this.pagesize)
			.then(res => {
				uni.stopPullDownRefresh()
				console.log(res);
				this.datas = this.getData.day
				this.jryye = res.jryye
				this.TotalOrder = res.TotalOrder
				this.ZZLS = res.ZZL
				this.ZZL = Math.abs(res.ZZL) 
				this.ZongShouRu = res.ZongShouRu
				this.infoObjs = res.Data
			}).catch(err => {
				console.log(err);
			})
			
		},
		onReachBottom() { //上拉加载
			this.page += 1;
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			
			if(this.curNow == 0) {
				this.$http.ribao(this.getData.StoreID,0, this.datas,this.page,this.pagesize)
				.then(res => {
					if (res.Data.length > 0) {
						this.infoObjs = this.infoObjs.concat(res.Data)
						uni.hideLoading()
					} else {
						this.$api.msg('已经到最底啦~',2000)
						uni.hideLoading()
					}
					
				}).catch(err => {
					console.log(err);
				})
			} else {
				this.$http.yuebao(this.getData.StoreID,this.timeValue,0,this.page,this.pagesize)
				.then(res => {
					if (res.Data.length > 0) {
						this.infoObjss = this.infoObjss.concat(res.Data)
						uni.hideLoading()
					} else {
						this.$api.msg('已经到最底啦~',2000)
						uni.hideLoading()
					}
					
					
				}).catch(err => {
					console.log(err);
				})
			}
		},
		components: {
			wPicker
		},
		computed: {
			
		}
	}
</script>

<style scoped>
	.bao {
		width: 100%;
		color:#e9a555;
		border:1upx solid #e9a555;
		text-align: center;
		padding: 8upx 0;
		border-radius: 0 12upx 12upx 0;
	}
	
	.baos {
		width: 100%;
		color: #FFFFFF;
		border:1upx solid #e9a555;
		background-color: #e9a555;
		padding: 8upx 0;
		text-align: center;
		border-radius: 12upx 0 0 12upx;
	}
	
	.baosss {
		width: 100%;
		color:#e9a555;
		border:1upx solid #e9a555;
		padding: 8upx 0;
		text-align: center;
		border-radius: 12upx 0 0 12upx;
	}
	
	.baoss {
		width: 100%;
		color: #FFFFFF;
		border:1upx solid #e9a555;
		background-color: #e9a555;
		text-align: center;
		padding: 8upx 0;
		border-radius: 0 12upx 12upx 0;
	}
	
	.da {
		font-size:28upx;
	}
	
	.xiao{
		font-size:24upx;
	}
	
	.triangle {
	    width: 0;
	    height: 0;
	    border-top: 10px solid transparent ;
	    border-right: 10px solid rgb(242, 242, 242);
	    border-bottom: 10px solid transparent;
	    border-left: 10px solid transparent;
		position: absolute;
		left: -30upx;
		top: 10upx;
	}
	/* #ifdef MP-WEIXIN || MP-ALIPAY */
	/* .bill_details{
		background:#F0F0F0;
		min-height: 100vh;
	} */
	/* #endif */

	page {
		background: #FFFFFF;
	}

	.border_bottom {
		position: relative;
		border-bottom: 2upx solid #DDDDDD;
	}

	.bill_contetn {
		margin-top: 20upx;
		
	}

	.yyyName {
		width: 60upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.u-node {
			width: 44rpx;
			height: 44rpx;
			border-radius: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #d0d0d0;
		}
		
		.u-order-title {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
		}
		
		.u-order-desc {
			color: rgb(150, 150, 150);
			font-size: 28rpx;
			margin-bottom: 6rpx;
		}
		
		.u-order-time {
			color: rgb(200, 200, 200);
			font-size: 26rpx;
		}
</style>
