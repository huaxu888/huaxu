<template>
	<view style="height: 100%;position: relative;padding-bottom: 100upx;">
		
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="false">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">花蓄好店 - 限时抢购</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">花蓄好店 - 限时抢购</block>
			<!-- #endif -->
		</cu-custom>
		
		
		<view class="coupon-redemption-page"  style="height: 100%;padding-bottom: 200upx;">
		
			<view class="search-field">
				<view class="flex align-center">
					<input type="text" v-model="keyword" placeholder="找吃喝玩乐,上花蓄~" placeholder-class="placeholder" class="search" confirm-type="search" @blur="search"/>
					<!-- <view class="search-btn">
						<text>搜索</text>
					</view> -->
				</view>
				<view class="flex" style="padding: 0 30upx;color: #333333;">
					<text class="hxIcon-huo1" style="margin-top: 10upx;color: rgb(254, 78, 1);font-size: 28upx;"></text>
					<text style="padding: 6upx 0upx;font-size: 26upx;margin-left: 4upx;">热搜:</text>
					<view v-for="(item,index) in hotSou" :key="index" style="background-color: #f2f2f2;padding: 6upx 14upx;margin-left: 8upx;font-size: 24upx;
						border-radius: 30upx;" @tap="hotSous(item.HotKeyWords)">
						<text>{{ item.HotKeyWords }}</text>
					</view>
				</view>
				
				<!-- <view class="sort-list">
					<scroll-view scroll-x class="sort-scroll">
						<view class="sort-item" v-for="(item, index) in sortList" :key="index" @tap="selectSort(index)"
							:class="[index === currentSort ? 'sort-item-active' : '']">
							<text>{{ item }}</text>
						</view>
					</scroll-view>
				</view> -->
			</view>
			
			<view style="padding: 10upx 30upx;padding-top: 0upx;background-color: #ffffff;">
				<swiper style="height: 180upx;width: 692upx" :indicator-dots="false" :circular="true" :autoplay="true" interval="6000"
				 duration="800">
					<swiper-item v-for="(centerSwiperItem,centerSwiperIndex) in centerLBLlit" :key="centerSwiperIndex" @tap="navTo(centerSwiperItem.GGContent)">
						<image :src="centerSwiperItem.GGPicUrl" mode="scaleToFill" style="width: 692upx; height: 180upx;border-radius: 5upx;"></image>
					</swiper-item>
				</swiper>
			</view>
			
			<view style="padding: 30upx 30upx;padding-bottom: 30upx;background-color: #ffffff;" class="flex justify-between text-center">
				<view v-for="(item,index) in quanList" :key="index" style="padding: 0 10upx;"  @tap="goGod(index)">
					<image :src="item.img" mode="scaleToFill" style="width: 94upx;height: 94upx;"></image>
					<view  style="margin-top: 14upx;font-size: 24upx;">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
			
			<!-- <view style="padding:  20upx 40upx;" class="flex justify-between text-center">
				<view v-for="(item,index) in selectList" :key="index" class="flex" @tap="selectIndex(item)">
					<text>{{item.name}}</text>
					<view>
						<text :class="indexs == item.id ? 'sans' : 'san'"></text>
					</view>
				</view>
			</view> -->
			<view style="background-color: #ffffff;padding-top: 30upx;">
				<view style="position: relative;margin-left: 30upx;width: 690upx;height: 364upx;background-image: url(https://img.huaxuapp.com/tjjh_03.png);background-repeat: no-repeat;background-size: cover;">
					<view class="flex justify-between align-center " style="padding:20upx 30upx">
						<view style="font-size: 32upx;color: #ffffff;">
							<text>推荐活动</text>
						</view>
						<view style="font-size: 32upx;color: #ffffff;">
							<text>{{currents}}/{{SetMealIDs.length}}</text>
						</view>
					</view>
					<view style="background-color: #ffffff;margin-left: 6upx;width: 682upx;height: 276upx;border-radius: 0 0 15upx 15upx;">
						<view style="padding-top: 0upx;background-color: #ffffff;border-radius: 0 0 12upx 12upx;">
							<swiper style="height: 276upx;width: 682upx;padding: 20upx;padding-bottom: 0;" @change="aaa" :indicator-dots="false" :circular="true" :autoplay="true" interval="6000"
							 duration="800">
								<swiper-item style="margin-right:10upx;border-radius: 0 0 12upx 12upx;" @tap="baoPingoto(item.StoreID,item.ID)" v-for="(item,index) in SetMealIDs" :key="index">
									<view class="flex justify-between align-center" style="font-size: 26upx;">
										<view style="color: #333333;">
											<text class="hxIcon-dianpu3"></text>
											<text style="margin-left: 12upx;">{{infoObject[index]}}</text>
										</view>
										<view style="color: #777777;">
											<text>{{item.SortName}} | {{getDistance(item.distance)}}</text>
										</view>
									</view>
									
									<view class="flex" style="margin-top: 20upx;">
										<view style="width: 180upx;height: 180upx;">
											<image :src="item.Logo" style="width: 180upx;height: 180upx;border-radius: 10upx;" mode=""></image>
										</view>
										<view style="position: relative;margin-left: 20upx;">
											<view style="width: 440upx;height: 70upx;align-items: center;display: flex;">
												<!-- <text style="font-size: 32upx;">
													<text v-if="a" class="" style="text-align: center;width: 100upx;height: 38upx;line-height: 38upx; border-radius: 5upx;background-color: rgb(254, 217, 66);font-size: 22upx;">
														国庆可用
													</text>
													<text v-if="a">
														王二小士大夫士大夫十分撒旦发射点发射点发5时...
													</text>
													<text v-if="!a">
														王二小士大夫士大夫十分撒旦发射点发射点发5时啊实斯蒂...
													</text>
												</text> -->
												<text class="shengLv" style="font-size: 32upx;">
													<text v-if="item.Tags" class="" style="text-align: center;width: 90upx;padding: 0 5upx;height: 48upx;line-height: 48upx; border-radius: 5upx;background-color: rgb(254, 217, 66);font-size: 24upx;">
														{{item.Tags}}
													</text>
													<text>
														{{item.Title}}
													</text>
												</text>
											</view>
											<view style="margin-top: 30upx;" class="flex align-center justify-between">
												<view class="flex align-center" style="justify-items: center;">
													<view style="display: flex;align-items: center;">
														<text class="hxIcon-shoucang3-fill" style="color: #bbbbbb;font-size: 30upx;"></text>
													</view>
													<view style="display: flex;align-items: center;">
														<text style="color: #999999;margin-left: 4upx;font-size: 24upx;">{{item.LikeNum || 0}}人喜欢</text>
													</view>
												</view>
												<view style="font-size: 24upx; color: #fe4e01;">
													<text>仅剩{{shengyu[index]}}份</text>
												</view>
											</view>
											<view class="flex align-center" style="margin-top: 6upx;">
												<text style="color: #fe4e01;font-size: 28upx;">￥</text><text style="color: #fe4e01;font-size: 36upx;font-weight: 600;"><text style="font-size: 42upx;">{{changeMoney(item.DiscountedPrice)}}</text></text>
												<view class="flex align-center justify-center" style="border-radius: 20upx;margin-left: 10upx;width: 80upx;height: 28upx;background-color: #fdeae9;color: #fe4e01;font-size: 26upx;">
													<text>{{jiSuan(item.ZK)}}折</text>
												</view>
												<text style="color: #999999;text-decoration:line-through;font-size: 28upx;margin-left: 10upx;">{{changeMoney(item.OrderPrice)}}</text>
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			
			
			<view style="height: 30upx;background-color: #ffffff;"></view>
			
			<view class="container"  offset-top="0" style="border-bottom: 1upx solid #EEEEEE;padding-top: 16upx;background-color: #ffffff;"  @tap="backtop()">
				<view style="background-color: #FFFFFF;" :class="isSticky?'fixed-top':''" :style="{top:isSticky?CustomBar+'px':''}" >
					<u-dropdown activeColor="#000000" inactiveColor="#999999">
						<u-dropdown-item v-model="value1" :title="value1==-1 ? label1 : options1[value1s].label || '品类'" :options="options1" @change="gaSe(value1,value1s)"></u-dropdown-item>
						<u-dropdown-item v-model="value2" :title="value2==-1 ? label2 : options2[value2s].label" :options="options2" @change="gaSew(value2,value2s)"></u-dropdown-item>
						<u-dropdown-item v-model="value3" :title="value3==-1 ? label3 : options3[value3s].label || '汉台区'" :options="options3" @change="gaSet(value3,value3s)"></u-dropdown-item>
						<u-dropdown-item v-model="value4" :title="value4==-1 ? label4 : options4[value4s].label" :options="options4" @change="gaSef(value4,value4s)"></u-dropdown-item>
					</u-dropdown>
				</view>
			</view>
			
			<view style="border-radius: 0 0 15upx 15upx;">
				<view style="padding: 0upx;" v-for="(item,index) in couponList" :key="index"  @tap="baoPingoto(item.StoreID,item.ID)">
					<view style="padding: 30upx;background-color: #FFFFFF;margin-top: 30upx;border-radius: 20upx;">
						<view class="flex justify-between align-center" style="font-size: 26upx;">
							<view style="color: #333333;">
								<text class="hxIcon-dianpu3"></text>
								<text style="margin-left: 12upx;">{{item.StoreName}}</text>
							</view>
							<view style="color: #777777;font-size: 24upx;">
								<text>{{item.StoreSortName}} | {{getDistance(item.distance)}}</text>
							</view>
						</view>
						<view class="flex" style="margin-top: 20upx;">
							<view style="width: 180upx;height: 180upx;">
								<image :src="item.Logo" style="width: 180upx;height: 180upx;border-radius: 10upx;" mode=""></image>
							</view>
							<view style="position: relative;margin-left: 20upx;">
								<view style="width: 500upx;height: 70upx;align-items: center;display: flex;">
									<text   class="shengLv" style="font-size: 32upx;">
										<text v-if="item.Tags" class="" style="text-align: center;width: 90upx;padding: 0 5upx;height: 48upx;line-height: 48upx; border-radius: 5upx;background-color: rgb(254, 217, 66);font-size: 24upx;">
											{{item.Tags}}
										</text>
										<text>
											{{item.Title}}
										</text>
									</text>
								</view>
								<view style="margin-top: 26upx;" class="flex align-center justify-between">
									<view>
										<text class="hxIcon-shoucang3-fill" style="color: #cccccc;font-size: 24upx;"></text>
										<text style="color: #777777;font-size: 24upx;margin-left: 10upx;">{{item.LikeNum || 0}}人喜欢</text>
									</view>
									<view style="font-size: 24upx; color: #fe4e01;margin-right: 20upx;">
										<text>已抢{{item.GetNum}}份</text>
									</view>
								</view>
								<view class="flex align-center" style="margin-top: 8upx;">
									<text style="color: #fe4e01;font-size: 28upx;">￥</text><text style="color: #fe4e01;font-size: 36upx;font-weight: 600;"><text style="font-size: 42upx;">{{changeMoney(item.DiscountedPrice)}}</text></text>
									<view class="flex align-center justify-center" style="border-radius: 20upx;margin-left: 10upx;width: 80upx;height: 28upx;background-color: #fdeae9;color: #fe4e01;font-size: 26upx;">
										<text>{{jiSuan(item.ZK)}}折</text>
									</view>
									<text style="color: #999999;text-decoration:line-through;font-size: 24upx;margin-left: 10upx;">{{changeMoney(item.OrderPrice)}}</text>
								</view>
								
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- <view class="coupon-list" style="background-color: #ffffff;padding-top: 50upx;">
				<view class="coupon-item" v-for="(item, index) in couponList" :key="index">
					<view class="padding-bottom-xs flex"  @tap="shopDetail(item.StoreID)">
						<image :src="item.Logo ==''?'https://img.huaxuapp.com/huaxulogo70px.png':item.Logo" mode="aspectFill" class="avatar" style="width: 68upx;height: 68upx;border: 1upx solid #BCBABB;"></image>
						<view style="margin-left: 20upx;">
							<view>
								<text style="font-weight: 600;"> {{ ' ' + item.StoreName }}</text>
							</view>
							<view style="color: #999999;margin-top: 4upx;font-size: 22upx;">
								<text>{{item.StoreStar}}分</text>
								<text style="margin-left: 4upx;margin-right: 4upx;">|</text>
								<text>￥{{item.RenJunXiaoFei || '/'}}人均</text>
								<text style="margin-left: 4upx;margin-right: 4upx;">|</text>
								<text>{{item.StoreSortName}}</text>
								<text style="position: absolute;right: 30upx;">{{item.StoreSiteName}}
									<text style="margin-left: 4upx;margin-right: 4upx;">|</text>
									<text>{{getDistance(item.Distandce)}}</text>
								</text>
							</view>
						</view>
					</view>
					<view style="margin-top: 12upx;">
						<view style="background-image: url(https://img.huaxuapp.com/690-216qq.png);
						background-repeat: no-repeat;width: 690upx;height: 216upx;background-size: cover;padding: 30upx 30upx;padding-top: 20upx; position: relative;">
							<view  @tap="shopDetail(item.StoreID)">
								<text style="font-weight: 600;font-size: 36upx;">
									{{yinHang(daiJin[index])}}
								</text>
							</view>
							<view style="margin-top: 18upx;"  @tap="shopDetail(item.StoreID)">
								<text style="font-size: 24upx;">{{item.Info}}<text style="margin:  0 10upx;">|</text>不可叠加</text>
							</view>
							<view style="position: relative;margin-top: 18upx;" v-if="item.CouponType == 1">
								<text style="color: rgb(254, 78, 1);">￥</text>
								<text style="color: rgb(254, 78, 1);font-size: 46upx;font-weight: 600;">{{item.CouponNum2}}</text>
								<text style="font-size:22upx;color: rgb(254, 78, 1);border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
									margin-left: 8upx;" v-if="item.CouponNum1 !== 0">{{jieQu(item.ZheKou)}}折
								</text>
								<text style="font-size:22upx;color: rgb(254, 78, 1);border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
									margin-left: 8upx;" v-if="item.CouponNum1 == 0">无门槛
								</text>
								<text style="font-size: 100;color: #999999;font-size: 24upx;margin-left: 8upx;" v-if="item.CouponNum1 !== 0">
									满{{item.CouponNum1}}可用
								</text>
								<view style="position: absolute;right: 0upx;top: 18upx;">
									<text style="color: red;font-size: 24upx;">仅剩：{{item.CouponsNum}}张</text>
								</view>
							</view>
							<view style="position: relative;margin-top: 18upx;" v-if="item.CouponType == 7">
								<text style="color: rgb(254, 78, 1);">￥</text>
								<text style="color: rgb(254, 78, 1);font-size: 46upx;font-weight: 600;">{{item.CouponNum2}}</text>
								<text style="font-size:22upx;background-color: rgb(254, 78, 1);color: #FFFFFF;border-radius: 20upx 20upx 20upx 0;padding: 2upx 8upx;border: 1upx solid rgb(254, 78, 1);
									margin-left: 8upx;">满赠
								</text>
								<text style="font-size: 100;color: #999999;font-size: 24upx;margin-left: 8upx;">
									实付满{{item.CouponNum1}}送
								</text>
								<view style="position: absolute;right: 0upx;top: 18upx;">
									<text style="color: red;font-size: 24upx;">仅剩：{{item.CouponsNum}}张</text>
								</view>
							</view>
							<view style="padding: 8upx 30upx;position: absolute;right: 30upx;top: 86upx;background-color: rgb(254, 78, 1);color: #FFFFFF;border-radius: 50upx;" @tap="getCoupon(item)">
								抢券
							</view>
						</view>
					</view>
				</view>
			</view> -->
			
			
			<view style="text-align: center;height: 180upx;margin-top:100upx;" v-if="couponList == false">
				<image src="https://img.huaxuapp.com/5cad402bbc803_03.png" mode="aspectFill" style="width: 200upx;height: 200upx;"></image>
				<view style="margin-top: 20upx;">
					<text style="font-size: 28upx;color: #333333;">暂时没有相关套餐</text>
				</view>
			</view>
		</view>
		
		<view v-if="scrollTop > 600"  @tap="backtops" class="flex align-center justify-center flex-direction huiqu">
			<text class="hxIcon-shangla" style="font-size: 90upx;color: rgba(0,0,0,0.2);"></text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponList: [],
				currentPage: 1,
				keyword: '',
				sortList: ['全部'],
				sortIds: [0],
				currentSort: 0,
				hotSou:[],
				centerLBLlit:[],
				quanList:[
					{img:'https://img.huaxuapp.com/mstd_03.png',name:'最新活动'},
					{img:'https://img.huaxuapp.com/mstd_05.png',name:'人气推荐'},
					{img:'https://img.huaxuapp.com/mstd_07.png',name:'玩乐精选'},
					{img:'https://img.huaxuapp.com/mstd_09.png',name:'精致生活'},
					{img:'https://img.huaxuapp.com/mstd_11.png',name:'约会聚餐'}
				],
				// selectList:[
				// 	{name:'品类',id:'0'},
				// 	{name:'智能排序',id:'1'},
				// 	{name:'附近商圈',id:'2'},
				// 	{name:'筛选',id:'3'}
				// ],
				indexs:5,
				value1: -1,
				value1s: -1,
				value2s: -1,
				value3s: -1,
				value4s: -1,
				value2: -1,
				value3: -1,
				value4: -1,
				label1:'品类',
				label2:'距离最近',
				label3:'附近站点',
				label4:'筛选',
				options1: [
					{
						label: '',
						value: '',
						id: 0
					}
				],
				options2: [
					{
						label: '距离最近',
						value: 0,
						paixu: 0,
					},
					{
						label: '销量最高',
						value: 1,
						paixu: 1,
					}
				],
				options3: [
					{
						label: '',
						value: '',
					}
				],
				options4: [
					{
						label: '全部',
						value: 0,
						CouponType: 0
					},
					{
						label: '星级优先',
						value: 1,
						CouponType: 1
					},
					// {
					// 	label: '代金券',
					// 	value: 1,
					// 	CouponType: 6
					// },
					{
						label: '人气优先',
						value: 2,
						CouponType: 2
					}
				],
				scrollTop: 0,
				isSticky: false,
				StoreSortID:0,
				sortid: 0,
				siteId: 0,
				paixu: 0,
				CouponType: 0,
				page: 0,
				pagesize: 10,
				CustomBar:this.CustomBar,
				daiJin: [],
				sorts: 6,
				StoreSortIDs: 0,
				currentPages: 1,
				location: '',
				amapPlugin: null, //高德的配置
				key: '2b60666c9954c824e769604cbeb61457',
				adcode: '610702',//区划码  默认是汉台
				modalName: null,
				currents: 1,
				a:false,
				SetMealIDs:[],
				infoObject:[],
				shengyu:[]
			};
		},
		onShow() {
			this.$http.timeSwipper(0).then(res => {
				console.log('轮播图', res);
				if (res.IsSuccess) {
					this.centerLBLlit = res.Data;
					console.log(this.centerLBLlit);
				}
			});
			this.currents = 1
			uni.getLocation({
				success: res => {
					this.location = `${res.longitude},${res.latitude}`
					
					this.$store.commit('setLatitudeAndLongitude', {
						latitude:res.latitude,
						longitude:res.longitude
					})
					console.log(this.location);
					this.$http.timeLast(0,1,0,0,[],1,10,this.location || '107.02,33.07').then(res => {
						console.log(res);
						
					})
				},
				fail: err => {
					this.location = []
					uni.showModal({
						title: '拒绝授权',
						content: '您拒绝花蓄使用的位置权限，我们将无法为您提供基于位置的服务',
						showCancel: false
					})
				}
			})

			this.value1 = -1
			this.value2 = -1
			this.value3 = -1
			this.value4 = -1
			this.value1s = -1
			this.value2s = -1
			this.value3s = -1
			this.value4s = -1
			this.CouponType = 0
			this.paixu = 0
			this.keyword = ''
			this.currentPage = 1
			
			
			this.$http.tjList(0,this.location || '107.02,33.07').then(res => {
				console.log(res);
				res.forEach((item,i) => {
					console.log(item);
					
					this.SetMealIDs[i] = item
					console.log(this.SetMealIDs);
					this.shengyu[i] = item.TotalNum - item.GetNum
					this.$http.shangjia(item.StoreID, this.$store.state.userInfo.ID)
						.then(resb => {
							console.log(resb);
							this.infoObject[i] = resb.StoreName
						})
				})
			})
			
			
		},
		onLoad() {
			
			this.$http.tcHot().then(res => {
				this.hotSou = res
			})
			
			this.$http.storeList().then(res => {
				this.options1 = res.Data
				this.options1.forEach((item, i) => {
					this.options1[i].label = item.StoreSortName
					this.options1[i].value = i
				})
			})
			
			this.$http.getSite().then(res => {
				this.options3 = res.Data
				res.Data.forEach((item, i) => {
					this.options3[i].label = item.SiteName
					this.options3[i].value = i
				})
			})
			
			this.$http.timeLast(0,1,0,0,[],1,10,this.location || '107.02,33.07').then(res => {
				console.log(res);
				this.couponList = res
			})
			
			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
			if (e.scrollTop >= 510) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
		},
		onShareAppMessage() {
			return {

			}
		},
		methods: {
			backtops(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			baoPingoto(a,b){
				this.$http.xhAdd(this.$store.state.userInfo.ID,b).then(res => {
					console.log(res);
				})
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetailsorder?storeId=' + a + '&tcID=' + b
				})
			},
			jiSuan(number){
				return Math.round(number * 100) / 10
			},
			changeMoney(money) {
				if (money < 0.01) {
					return money;
				} else {
					return this.$api.formatAmount(money);
				}
			},
			getDistance(distance) {
				let km = Math.floor(distance / 1000)
				if (km < 1) {
					return distance.toFixed(2) + ' m'
				} else {
					return `${km}.${(distance % 1000).toString().substr(0, 2)} km`
				}
			},
			aaa(e) {
				console.log(e.detail.current);
				this.currents = e.detail.current + 1 
			},
			callService() {
				uni.makePhoneCall({
					phoneNumber: '400-6688-352'
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			navTo(url){
				console.log('跳转', url);
				uni.navigateTo({
					url:url
				})
			},
			hotSous(e){
				console.log(e)
				this.value1 = -1
				this.value2 = -1
				this.value3 = -1
				this.value4 = -1
				this.value1s = -1
				this.value2s = -1
				this.value3s = -1
				this.value4s = -1
				this.currentPage = 1
				this.keyword = e
				this.StoreSortID = 0
				this.$http.timeLast(0,1,0,0,this.keyword || [],1,10,this.location || '107.02,33.07').then(res => {
					this.couponList = res
				})
			},
			jieQu(num){
				return( Math.round(num*100)/10);
			},
			yinHang(bankNumber){
				if(bankNumber.length > 16){
					return bankNumber.substr(0,16)+"...";
				} else {
					return bankNumber;
				}
			},
			getCou(){
				// this.$http.qianQuan(this.keyword || 0,sortid,siteId,paixu,CouponType,page,pagesize,location).then(res => {
				// 	console.log(res);
				// })
			},
			goGod(e){
				console.log(e);
				if(e == 0){
					uni.navigateTo({
						url:'/pages/find/newAct'
					})
				}
				if(e == 1){
					uni.navigateTo({
						url:'/pages/find/hotAct'
					})
				}
				if(e == 2){
					uni.navigateTo({
						url:'/pages/find/playAct'
					})
				}
				if(e == 3){
					uni.navigateTo({
						url:'/pages/find/lifeAct'
					})
					// this.$api.msg('功能即将上线，敬请期待')
				}
				if(e == 4){
					uni.navigateTo({
						url:'/pages/find/missAct'
					})
				}
			}, 
			backtop(){
				uni.pageScrollTo({
				    scrollTop: 500,
				    duration: 300
				});
			},
			gaSe(index,value1s){
				console.log(index);
				console.log(value1s);
				console.log(this.value1);
				
				if(index == value1s){
					this.value1 = -1
					this.value1s = -1
					this.StoreSortID = 0
				} else {
					this.value1 = index
					this.value1s = index
					console.log(this.value1s);
					if(this.value1s == 0){
						this.StoreSortID = 0
					} else {
						this.StoreSortID = this.options1[index].StoreSortID
					}
				}
				this.currentPage = 1
				
				this.$http.timeLast(this.StoreSortID,this.paixu || 1,this.SiteID || 0,this.CouponType || 0,this.keyword || [],this.currentPage,10,this.location || '107.02,33.07').then(res => {
					this.couponList = res
				})
			},
			gaSew(index,value2s){
				if(index == value2s){
					this.value2 = -1
					this.value2s = -1
					this.paixu = 0
				} else {
					this.value2 = index
					this.value2s = index 
					console.log(this.value2s);
					if(this.value2s == 0){
						this.paixu = 0
					} else {
						this.paixu = this.options2[index].paixu
					}
				}
				this.currentPage = 1
				this.$http.timeLast(this.StoreSortID,this.paixu || 1,this.SiteID || 0,this.CouponType || 0,this.keyword || [],this.currentPage,10,this.location || '107.02,33.07').then(res => {
					this.couponList = res
				})
			},
			gaSet(index,value3s){
				if(index == value3s){
					this.value3 = -1
					this.value3s = -1
					this.siteId = 0
				} else {
					this.value3 = index
					this.value3s = index 
					if(this.value3s == 0){
						this.siteId = 0
					} else {
						this.siteId = this.options3[index].SiteID
					}
				}
				this.currentPage = 1
				this.$http.timeLast(this.StoreSortID,this.paixu || 1,this.SiteID || 0,this.CouponType || 0,this.keyword || [],this.currentPage,10,this.location || '107.02,33.07').then(res => {
					this.couponList = res
				})
			},
			gaSef(index,value4s){
				console.log(index);
				console.log(value4s);
				console.log(this.CouponType);
				if(index == value4s){
					this.value4 = -1
					this.value4s = -1
					this.CouponType = 0
				} else {
					this.value4 = index
					this.value4s = index 
					if(this.value4s == 0){
						this.CouponType = 0
					} else {
						this.CouponType = this.options4[index].CouponType
					}
					console.log(this.CouponType);
				}
				
				
				this.currentPage = 1
				this.$http.timeLast(this.StoreSortID,this.paixu || 1,this.SiteID || 0,this.CouponType || 0,this.keyword || [],this.currentPage,10,this.location || '107.02,33.07').then(res => {
					this.couponList = res
				})
				
			},
			selectIndex: function(item){
				
				if(this.indexs == item.id){
					this.indexs = 5
				} else {
					this.indexs = item.id
				}
			},
			getStatus: function (item) {
				return item.Num <= 0
			},
			search: function () {
				this.currentPage = 1
				this.StoreSortID = 0
				this.value1 = -1
				this.value2 = -1
				this.value3 = -1
				this.value4 = -1
				this.value1s = -1
				this.value2s = -1
				this.value3s = -1
				this.value4s = -1
				this.$http.timeLast(0,1,0,0,this.keyword || [],1,10,this.location || '107.02,33.07').then(res => {
					this.couponList = res
				})
			},
			selectSort: function (index) {
				this.currentSort = index
				
			},
			shopDetail: function (storeID) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetailPage?StoreID=' + storeID
				})
			}
		},
		onReachBottom() {
			this.currentPage += 1
			uni.showLoading({
				title: '加载中',
				mask: false
			});
			this.$http.timeLast(this.StoreSortID,this.paixu || 1,this.SiteID || 0,this.CouponType || 0,this.keyword || [],this.currentPage,10,this.location || '107.02,33.07').then(res => {
				if (res.length > 0) {
					this.couponList = this.couponList.concat(res);
				} else {
					this.$api.msg('已经到最底啦~')
				}
				uni.hideLoading()
			})
		},
		onPullDownRefresh() {
			this.$http.tcHot().then(res => {
				this.hotSou = res
			})
			uni.stopPullDownRefresh()
			this.currentPage = 1
			this.keyword = ''
			this.value1 = -1
			this.value2 = -1
			this.value3 = -1
			this.value4 = -1
			this.value1s = -1
			this.value2s = -1
			this.value3s = -1
			this.value4s = -1
			this.$http.timeLast(0,1,0,0,[],1,10,this.location || '107.02,33.07').then(res => {
				console.log(res);
				this.couponList = res
			})
		},
		onShareTimeline: function () {
			return {
				
			}
		},
	}
</script>


<style>
	page {
		background-color: #f8f8f8;
	}
</style>
<style lang="scss" scoped>
	.cu-form-group .title {
	        min-width: calc(4em + 15px);
	}
	.couponss {
		width: 140rpx;
		height: 214rpx;
		background: url(https://img.huaxuapp.com/sjhz_03.png) no-repeat;
		background-position: center;
		background-size: cover;
		position: fixed;
		/* #ifdef H5 */
		bottom: 150rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 20rpx;
		/* #endif */
		right: 10rpx;
	}
	
	.bgclo {
		background-color: #FFFFFF;
	}
	
	.san {
		margin-left: 10px;
		float: left;
		width: 0; 
		height: 0;
		border-width: 12upx;
		border-style: solid;
		border-color:#999999 transparent transparent transparent;
		margin-top: 16upx;
	}
	
	.sans {
		margin-left: 10px;
		float: left;
		width: 0; 
		height: 0;
		border-width: 12upx;
		border-style: solid;
		border-color:#999999 transparent transparent transparent;
		transform:rotate(180deg)
	}
	
	.fixed-top {
		position: fixed;
		width: 100%;
		z-index: 99990;
	}
	
	.coupon-redemption-page {
		
		.search-field {
			// position: fixed;
			z-index: 9;
			width: 750rpx;
			background-color: #FFFFFF;
			/* #ifdef H5 */
			top: 88rpx;
			/* #endif */
			/* #ifndef MP-ALIPAY || H5*/
			top: 88rpx;
			margin-top: 0upx;
			/* #endif */
			
			height: 200rpx;
			display: flex;
			flex-direction: column;
			
			.search {
				background-color: #F2F2F2;
				border-radius: 60rpx;
				text-align: center;
				height: 60rpx;
				margin: 30rpx;
				flex: 1;
			}
			
			.search-btn {
				background: linear-gradient(to right, #efa13b, #ea662e);
				color: #FFFFFF;
				height: 60rpx;
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				border-radius: 60rpx;
				margin-right: 30rpx;
			}
			
			.placeholder {
				font-size: 28rpx;
				color: #999;
			}
			
			.sort-list {
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				height: 80rpx;
				padding: 30rpx;
				
				text {
					white-space: nowrap;
				}
				
				.sort-scroll {
					white-space: nowrap;
				}
				
				.sort-item {
					display: inline-flex;
					margin: 0 10rpx;
					align-items: center;
					justify-content: center;
					color: #666;
				}
				
				.sort-item-active {
					color: #333;
					font-weight: bolder;
					font-size: 32rpx;
				}
				
				.sort-item:first-child {
					margin-left: 0;
				}
			}
		}
		
		.coupon-list {
			margin: 0 30rpx 30rpx 30rpx;
			margin-left: 0;
			margin-right: 0;
			padding: 0 30rpx;
			.coupon-item {
				background-color: #FFFFFF;
				// padding: 30rpx;
				border-radius: 8rpx;
				margin-bottom: 60rpx;
				
				.coupon-content {
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					
					.bg-color {
						background-color: #fef6f3;
						padding: 20rpx;
						border-radius: 8rpx;
						height: 200rpx;
						max-height: 200rpx;
					}
					
					.avatar {
						width: 140rpx;
						height: 140rpx;
						border-radius: 8rpx;
					}
				}
			}
			
			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				border-left: 1rpx dotted #e93a27;
				font-size: 24rpx;
				
				text {
					color: #FFFFFF;
					border-radius: 100rpx;
					padding: 10rpx 0;
					width: 120rpx;
					display: inline-flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	
	.shengLv{
		color: #333333;
		word-wrap:break-word;
		white-space:pre-line;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow:hidden;
	}
	
	.huiqu {
		position: fixed;
		right: 30upx;
		bottom:140upx;
		z-index: 66;
		width: 90upx; 
		height:90upx;
		 -webkit-transition: all 0.5s;
	}
</style>

