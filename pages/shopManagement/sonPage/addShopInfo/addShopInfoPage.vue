<template>
	<view>
		<view style="height: 274upx;background:url('https://img.huaxuapp.com/mdxq.png') no-repeat; background-size: cover;"
		 @tap="toBottom">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-transparent" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content"></block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText"></block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>

		<!-- 	<view class="tran " :class="!showTop?'toTop':''"> -->
		<view>
			<view class="tran1" :class="!showTop ? 'opacity-hidden ' :''" >
				<view>
					<view class="flex align-start flex-direction  padding-lr  padding-top-sm" style="position: relative;padding-bottom: 16upx;">
						<text class="text-bold" style="font-size: 36upx;color: #8d5b20;height: 36upx;">{{StoreName}}</text>
						<view class="flex align-start justify-start margin-top" style="width: 360upx;">
							<text class="hxIcon-dingwei1" style="color: #999999;font-size: 26upx;margin-top: 4upx;"></text>
							<text style="font-size: 24upx;color: #333333;line-height: 1.5em;height: 24upx;margin-left: 5upx;">{{StoreAddress}}</text>
						</view>
						<view class="flex align-center justify-between  " style="width: 380upx;margin-top: 70upx;" >
							<input placeholder="“请输入品牌核心价值的广告语”" v-model="StoreDesc" :focus="isfocus" @blur="focusblur" :adjust-position="false"
							 type="text" maxlength="20" style="font-size: 24upx;color: #999999;width: 360upx;" />
							<text class="hxIcon-bianji" style="color: #999999;" @tap="tofocus"> </text>
						</view>
						<view class="flex align-center justify-center flex-direction" style="position: absolute; right: 40upx; top: -87upx;">
							<image :src="changeLogoPic?changeLogoPic:LogoPic" mode="scaleToFill" style=" width: 174upx;height: 174upx; border: 6upx solid #FFFFFF;border-radius: 50%;"></image>
							<view @tap="insertImg" class="margin-top-sm-big flex align-center justify-center" style="width: 88upx; height: 42upx;  background: #f9eddf;border-radius: 10upx;">
								<text style="font-size: 24upx;color: #8d5b20;line-height: 1em;">编辑</text>
							</view>
						</view>
					</view>
				</view>

				<view style="height: 20upx; background-color: #F2F2F2; "></view>


				<view class="padding padding-bottom-xl ">
					<view class="flex align-center justify-start" style="font-size: 32upx;">
						<text class="text-bold" style="color: #333333;">
							品牌资料竞争力：
						</text>
						<text class="text-bold" style="color: #f34e2d;">{{progressLevel}}</text>
						<text style="color: #666666;font-size:30upx">（完成度{{progressNum}}%）</text>
					</view>

					<view style="position: relative">
						<view class="cu-progress round margin-top-xl ">
							<view :style="{width:progressNum+'%'}" style="background:linear-gradient(to right,#eedcc6,#eeb068) ;"></view>
						</view>

						<view class="flex align-center justify-center " style="position: absolute;background: #FFFFFF; width:38upx;height: 38upx;bottom:0;border:2upx solid #e8c091; left: 20%;  border-radius: 50%;">
							<text class="hxIcon-gouxuan" style="font-size: 24upx;color:#e8c091; margin-top: 1upx;"></text>
						</view>
						<view class="flex align-center justify-center " style="position: absolute;background: #FFFFFF; width:38upx;height: 38upx;bottom:0;border:2upx solid #e8c091; left: 47%; border-radius: 50%;">
							<text class="hxIcon-gouxuan" style="font-size: 24upx;color:#e8c091; margin-top: 1upx;"></text>
						</view>
						<view class="flex align-center justify-center " style="position: absolute; background: #FFFFFF; width:38upx;height: 38upx;bottom:0;border:2upx solid #e8c091; left: 73%; border-radius: 50%;">
							<text class="hxIcon-gouxuan" style="font-size: 24upx;color:#e8c091; margin-top: 1upx;"></text>
						</view>
					</view>
				</view>

				<view style="height: 20upx; background-color: #F2F2F2;"></view>

			</view>

			<view class="tran " :class="!showTop?'toTop':''">
				<view>
					<view class="tui-mtop">
						<tui-tabs :tabs="tabs2" :currentTab="currentTab" color="#cccccc" :bold="true" selectedColor="#222222"
						 sliderBgColor="#e8c091" @change="change"></tui-tabs>
					</view>
				</view>

				<view class="margin-top-sm margin-bottom-lg bg-white"  v-if="currentTab == 0">
					<view class="flex padding flex justify-between align-center margin-lr" style="border-bottom: 2upx solid rgb(180,180,180,0.2);">
						<view class="flex align-center">
							<view>
								营业时间
							</view>
							<picker class="margin-left-xl" mode="time" @change="timeChange1">
								<view class="flex align-center  justify-between ">
									<view class="flex align-center justify-center">
										<text style="color: rgb(180,180,180);line-height: 1em;">
											{{timeValue1.length===0?'开始时间':timeValue1}}
										</text>
									</view>
								</view>
							</picker>
							<view class="margin-left text-grey">
								—
							</view>
							<picker class="margin-left-xl" mode="time" @change="timeChange">
								<view class="flex align-center  justify-between ">
									<view class="flex align-center justify-center">
										<text style="color: rgb(180,180,180);line-height: 1em;">
											{{timeValue.length===0?'结束时间':timeValue}}
										</text>
									</view>
								</view>
							</picker>
						</view>
						<view>
						</view>
					</view>

					<view class="flex padding flex justify-between align-center margin-lr" style="border-bottom: 2upx solid rgb(180,180,180,0.2);">
						<view class="flex align-center">
							<text style="width:130upx;">
								商家电话
							</text>
							<text class="text-gray text-cut margin-left" style="max-width:420upx;">
								{{Phone}}
							</text>
						</view>
						<view>

						</view>
					</view>

					<view class="flex padding flex justify-between align-center margin-lr" style="border-bottom: 2upx solid rgb(180,180,180,0.2);">
						<view class="flex align-center" style="width: 100%;">
							<text style="width:130upx;white-space: nowrap;">
								店铺站点
							</text>
							<picker @change="siteChange" :value="siteIndex" :range="siteList" range-key="SiteName" mode="selector" style="width: 100%;">
								<view class="flex align-center justify-between" style="width: 100%;">
									<text class="text-gray text-cut " style="max-width:420upx;margin-left: 50upx;">
										{{siteIndex>-1?siteList[siteIndex].SiteName:'请选择店铺站点'}}
									</text>
									<view>
										<text class="hxIcon-rightArrow" style="font-size:40upx; color:rgba(180,180,180);"></text>
									</view>
								</view>
							</picker>
						</view>

					</view>

					<view class="flex padding flex justify-between align-center margin-lr">
						<view class="flex align-center" style="width: 100%;">
							<text style="width:130upx;white-space: nowrap;">
								店铺商圈
							</text>
							<picker @change="busineChange" :value="busineIndex" :range="busineList" range-key="BusName" :disabled="businedisable"
							 mode="selector" style="width: 100%;">
								<view class="flex align-center justify-between" style="width: 100%;">
									<text class="text-gray text-cut " style="max-width:420upx;margin-left: 50upx;">
										{{busineIndex>-1?busineList[busineIndex].BusName:'请选择商圈'}}
									</text>
									<view>
										<text class="hxIcon-rightArrow" style="font-size:40upx; color:rgba(180,180,180);"></text>
									</view>
								</view>
							</picker>
						</view>

					</view>
				</view>

				<view class="flex align-center justify-center flex-direction margin-top-xl margin-bottom" v-if=" (currentTab == 1 ||currentTab == 2 ) && imgList.length == 0">
					<view class="flex align-center justify-center" style="color: #8d5b20;margin-top: 75upx;" @tap="addImgList">
						<text class="hxIcon-guanbi margin-right-sm text-bold" style="display: inline-block; transform: rotate(45deg);font-size: 43upx; "></text>
						<text style="font-size:30;">添加</text>
						<text style="font-size:30;" v-if="currentTab==1">展示图</text>
						<text style="font-size:30;" v-if="currentTab==2">幻灯图集</text>
					</view>

					<view class="flex align-center justify-center margin-top-xl ">
						<text style="font-size:24upx;color: #5b677f;"  v-if="currentTab==1">完美的展示图更容易吸引顾客的眼球哦~</text>
						<text style="font-size:24upx;color: #5b677f;"  v-if="currentTab==2">上传店铺不同类型的图片更容易吸引顾客的眼球哦~</text>
					</view>
				</view>

				<view v-if="(currentTab == 1 ||currentTab == 2 ) && imgList.length > 0">
					<view class="cu-form-group margin-top margin-bottom-lg">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								<image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" style="background: #EEEEEE;" @tap="addImgList" v-if="imgList.length<count">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				</view>

				<view class="margin-bottom-lg" v-if="currentTab == 3">
					<view :style="{height:pageHeight + 'px'}">
						<view class="bg-white" style="width:100%">
							<view class="padding" style="min-height:400upx;width:100%">
								<block v-for="(item,index) in editItems" :key="index">
									<textarea :adjust-position="false" placeholder-style="font-size:24upx" :placeholder="editItems.length == 1 ? '请图文结合描述您店铺的特色' : ''"
									 maxlength="-1" auto-height="true" :cursor-spacing="500" @input="inputIng" v-if="item.type=='textarea'" style="width:100%"
									 :focus="index + 1 == editItems.length && index != 0 ? true : false" :value="item.value" :data-index="index"></textarea>
									<view class="img" v-if="item.type=='img'">
										<image :src="item.value" mode="widthFix" style="width:100%" />
										<text class="cuIcon-deletefill text-red del" @click="deleteContentImg(index)"></text>
									</view>
								</block>
							</view>
							<view class="flex padding align-center">
								<view class="flex flex-direction justify-center align-center" @tap="insertContentImg" style="width:170upx;height:170upx;border:2upx dashed #DDDDDD">
									<text class="hxIcon-xiangji " style="font-size:80upx"></text>
									<text class="text-gray text-sm">上传照片</text>
								</view>

							</view>
							<view class="padding-lr">
								<text style="font-size: 24upx;color:#5b677f">优质的广告语，完善的店铺内容，会更容易吸引大家的眼球呢~</text>
							</view>
						</view>
					</view>
				</view>



				<view class="flex align-center justify-center ">
					<view class="flex align-center justify-center" style="width: 690upx ; height: 88upx; background: #E8C091;border-radius: 15upx;"
					 @tap="submit">
						<text style="color: #8d5b20;font-size: 33upx;">发布</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import addImage from './components/addImage'
	const qiniuUploader = require('@/common/qiniuUploader.js')
	export default {
		components: {
			tuiTabs,
			addImage
		},
		data() {
			return {
				showTop: true,
				pageHeight: '',
				editItems: [{
					type: 'textarea',
					value: ''
				}],
				allContents: {},
				allImages: [],
				count: 1, //传照片的个数
				imgList: [], //展示图 测试
				imgList1: [], //展示图
				imgList2: [], //幻灯图
				type: 'banner',
				content: '',
				timeValue1: '', //开始
				timeValue: '', //结束
				currentTab: 0, //标签的下标
				tabs2: [{
					name: "商家信息"
				}, {
					name: "展示图"
				}, {
					name: "幻灯图"
				}, {
					name: "详情图"
				}],
				StoreID: '',
				userInfo: '',
				siteList: [{
					SiteName: "获取中..."
				}],
				busineList: [{
					BusName: "获取中..."
				}], //商圈的数组
				businedisable: false,
				siteID: '',
				siteIndex: 0, //站点下拉框
				busineIndex: 0, //商圈的下标
				storeInfo: '', //店铺对象
				StoreName: '', //店铺名称
				StoreAddress: '', //店铺地址
				StoreDesc: '', //描述
				LogoPic: '', //头像
				changeLogoPic: '',
				Phone: '', //商家电话
				imageList: [],
				StoreContent: '',
				progressNum: 0,
				progressLevel: '普通',
				isChangeBanner: false, //是否修改过banner 用于优化
				isChangeTheme: false, //是否修改过banner 用于优化
				isfocus: false
			}
		},
		async onLoad(route) {
			this.StoreID = route.StoreID
			this.userInfo = this.$store.state.userInfo;
			// this.siteID = this.siteList[this.siteIndex].SiteID; 
			if (this.userInfo.ID) {
				// this.getBusineList()
			} else {
				uni.navigateBack({})
			}

			if (this.StoreID) {
				await this.getStoreInfo(this.StoreID)
			} else {
				uni.navigateBack({})
			}
			// 用户获取到 店铺信息获取到的操作

			if (this.$store.state.siteList.length <= 1) {
				//如果没有缓存 请求获取站点
				// #ifdef H5
				await this.getSite();
				// #endif
				// #ifndef H5
				await this.getRegeo();
				await this.newGetSite();
				// #endif
			}
			this.siteList = this.$store.state.siteList
			//此地要处理他所在商圈的 picker
			for (let i = 0; i < this.siteList.length; i++) {
				let val = this.siteList[i];
				let SiteID = val.SiteID;
				// console.log(SiteID);
				// console.log(this.storeInfo.SiteID);
				if (SiteID === this.storeInfo.SiteID) {
					this.siteIndex = i
					break
				} else {
					this.siteIndex = 0
				}
			}

			this.siteID = this.storeInfo.SiteID;
			await this.getBusineList();

			if (this.storeInfo.StorePic) {
				//头像
				this.progressNum += 5;
			}

			if (this.storeInfo.StoreDesc) {
				//描述
				this.progressNum += 5;
			}

			if (this.storeInfo.StartWorkDate) {
				//上班时间
				this.progressNum += 2.5;
			}
			if (this.storeInfo.EndWorkDate) {
				//下班时间
				this.progressNum += 2.5;
			}
			if (this.storeInfo.SiteID >= 0) {
				//站点
				this.progressNum += 5;
			}
			if (this.storeInfo.GGBusinessID >= 0) {
				//站点
				this.progressNum += 5;
			}
			if (this.storeInfo.StorePic) {
				//站点
				this.progressNum += 25;
			}
			if (this.storeInfo.StorePics) {
				//站点
				this.progressNum += 25;
			}
			if (this.storeInfo.StoreContent) {
				//站点
				this.progressNum += 25;
			}

			if (this.progressNum > 0 && this.progressNum <= 25) {
				this.progressLevel = '普通';
			} else if (this.progressNum > 25 && this.progressNum <= 50) {
				this.progressLevel = '初级';
			} else if (this.progressNum > 50 && this.progressNum <= 75) {
				this.progressLevel = '中级';
			} else if (this.progressNum > 75 && this.progressNum <= 100) {
				this.progressLevel = '高级';
			}
		},
		onShow() {
			this.showTop = true;
		},
		methods: {
			inputIng(e) {
				var value = e.detail.value;
				var index = e.currentTarget.dataset.index;
				this.editItems[index] = {
					type: 'textarea',
					value
				}
			},
			async submitContent() {
				return await Promise.resolve(true).then(res => {
					if (this.editItems.length === 1 && this.editItems[0].value === '') {
						this.$api.msg('请您完善内容后再发布', 2000)
						return
					}
					var imgAry = []
					this.editItems.forEach((it, i) => {
						it.id = i
						this.allContents[i] = it
					})
					for (let key of Object.keys(this.allContents)) {
						var value = this.allContents[key]
						if (value.type === 'img') {
							this.allImages.push(value)
						}
					}
					let promiseAry = [] //异步上传
					this.allImages.forEach((it) => {
						this.$api.showLoading_()
						let path = it.value
						// #ifdef APP-PLUS
						path = this.$api.changPath(path)
						// #endif
						console.log(path)
						promiseAry.push(this.promiseUpload(path))
					})
					return Promise.all(promiseAry)
				}).then(promiseAry => {
					this.$api.hidLoading_()
					setTimeout(() => {
						this.allImages.forEach((it, i) => {
							it.value = promiseAry[i]
						})
						for (let key of Object.keys(this.allContents)) {
							var value = this.allContents[key]
							var id = value.id
							for (let val of this.allImages) {
								var iD = val.id
								if (id === iD) {
									value.value === `${val.value}`
									break
								}
							}
						}
						var str = ''
						for (let key of Object.keys(this.allContents)) {
							var value = this.allContents[key]
							var type = value.type
							if (type === 'textarea') {
								str = str + `<p>${value.value}</p>`
							} else if (type === 'img') {
								//style="width:300px;height:300px"
								str = str + `<img src=${value.value}></img>`
							}
						}
						str = `<p>${str}</p><br><br><br><br><br>`
						let data = {
							StoreID: this.StoreID,
							content: str,
							StoreDesc: this.storeInfo.StoreDesc
						}
						return this.$Request.get(this.$store.state.editUrl, data).then(res => {
							if (res.IsSuccess) {
								this.$api.msg(res.Msg, 2000)
							}
						})
					})
					return
				})

			},
			tofocus() {
				this.isfocus = true;
			},
			focusblur() {
				this.isfocus = false;
			},
			insertContentImg() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: async (res) => {
						for (let it of res.tempFilePaths) {
							let value = await this.$api.zipImage(it)
							this.editItems.push({
								type: 'img',
								value
							})
						}
						this.editItems.push({
							type: 'textarea',
							value: ''
						})
					}
				});
			},
			async newGetSite() {
				//站点
				await this.$http.newGetSite({
					citycode: this.adcode
				}).then(res => {
					this.$store.commit('setSiteList', res) //登陆后在person页面没有站点信息，直接进店铺是没有的，所以需要获取一下
					// this.siteList = res;
					// this.$store.commit('setSite', this.siteList[0]);
				}).catch(res => {

				});
			},
			async getSite() {
				//站点
				await this.$http.getSite().then(res => {
					this.$store.commit('setSiteList', res) //登陆后在person页面没有站点信息，直接进店铺是没有的，所以需要获取一下
				}).catch(res => {

				});

			},
			async getRegeo() {
				let res = await this.adcodePromise().then(res => {
					this.adcode = res.replace(/\"/g, "");
				}).catch(err => {

				});

			},
			adcodePromise() {
				return new Promise((resolve, reject) => {
					new amap.AMapWX({
						key: this.key
					}).getRegeo({
						success: (data) => {
							let addressName = JSON.stringify(data[0].regeocodeData.addressComponent.adcode);
							resolve(addressName)
						},
						fail: (err) => {}
					});
				})
			},
			//以上是站点信息缺失后的补救措施
			async submit() {
				switch (this.currentTab) {
					case 0:
						if (this.storeInfo.GGBusinessID != this.busineList[this.busineIndex].BID ||
							this.storeInfo.StoreDesc != this.StoreDesc ||
							this.storeInfo.StartWorkDate != this.timeValue1 ||
							this.storeInfo.EndWorkDate != this.timeValue ||
							this.storeInfo.SiteID != this.siteList[this.siteIndex].SiteID
						) {
							await this.editStoreInfo(
								this.StoreID,
								this.timeValue1,
								this.timeValue,
								this.siteList[this.siteIndex].SiteID,
								this.busineList[this.busineIndex].BID,
								this.StoreDesc
							);

						}

						if (this.changeLogoPic) {
							await this.uploadLogo(this.changeLogoPic);
						}
						break;
					case 1:
						if (this.imgList1.length > 1 || this.imgList1.length <= 0) {
							this.$api.msg('上传的展示图有且仅有一张')
							break;
						}
						if (this.isChangeTheme) {
							await this.uploadThemePic();
						} else {
							this.$api.msg('您的展示图木有变化呢~')
						}
						break;
					case 2:
						if (this.imgList2.length <= 0) {
							this.$api.msg('幻灯图至少上传一张')
							break;
						}
						if (this.isChangeBanner) {
							await this.uploadBanner();
						} else {
							this.$api.msg('您的幻灯图木有变化呢~')
						}
						break;
					case 3:
						if (this.editItems.length === 1 && this.editItems[0].value === '') {
							this.$api.msg('请您完善内容后再发布', 2000)
							break
						}
						await this.submitContent();
						break;
					default:
						break;
				}
			},
			async editStoreInfo(storeid, startwork, endwork, siteid, buesid, StoreDesc) {
				await this.$http.editStoreInfo({
					storeid: storeid,
					startwork: startwork,
					endwork: endwork,
					siteid: siteid,
					buesid: buesid,
					StoreDesc: StoreDesc
				}).then(res => {
					this.$api.msg(res.Msg);
				}).catch(err => {
					this.$api.msg('请检查网络状态，退出后重新填写');
				});
			},
			async uploadThemePic() {
				let data = {
					StoreID: this.StoreID,
					mainurl: '',
					storepiculrs: ''
				}
				var valuePath = this.imgList1[0];
				setTimeout(() => {
					this.promiseUpload(valuePath).then(path => {
						data.mainurl = path
						this.$Request.get(this.$store.state.editstorepicUrl, data).then(res => {
							if (res.IsSuccess) {
								this.$api.msg(res.Msg, 2000)
							}
						})
					}).catch(err => {
						console.log(err);
					})
				});
			},
			async uploadBanner() {
				return Promise.resolve(true).then(res => {
					let promiseAry = [] //异步上传
					this.$api.showLoading_()
					this.imgList2.forEach((it) => {
						promiseAry.push(this.promiseUpload(it))
					})
					return Promise.all(promiseAry)
				}).then(res => {
					this.$api.hidLoading_()
					let data = {
						StoreID: this.StoreID,
						mainurl: '',
						storepiculrs: ''
					}
					data.storepiculrs = res.join(',');
					setTimeout(() => {
						this.$Request.get(this.$store.state.editstorepicUrl, data).then(res => {
							if (res.IsSuccess) {
								this.$api.msg(res.Msg, 2000)
							}
						})
					})
				})
			},
			async uploadLogo(changeLogoPic) {
				let data = {
					logourl: '',
					StoreID: this.StoreID
				}
				var valuePath = changeLogoPic;
				await setTimeout(() => {
					this.promiseUpload(valuePath).then(path => {
						data.logourl = path
						this.$Request.get(this.$store.state.editlogoUrl, data).then(res => {
							if (res.IsSuccess) {

								this.$api.msg(res.Msg, 2000);

							}
						});
					});
				});
			},
			addImgList() {
				switch (this.currentTab) {
					case 0:
						break;
					case 1:
						if (this.imgList.length >= 1) {
							break;
						}
						uni.chooseImage({
							count: this.count, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album', 'camera'], //从相册选择
							success: async (res) => {
								// #ifdef APP-PLUS || MP-WEIXIN || H5
								for (let it of res.tempFiles) {
									let localPath = it.path
									// #ifdef APP-PLUS
									localPath = await this.$api.zipImage(localPath);
									// #endif
									this.imgList = this.imgList.concat(localPath)
								}
								// #endif

								// #ifdef MP-ALIPAY
								this.imgList = [...this.imgList, ...res.tempFilePaths]
								// #endif

								this.imgList1 = this.imgList;
								this.isChangeTheme = true;
							}
						});
						break;
					case 2:
						uni.chooseImage({
							count: this.count, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album', 'camera'], //从相册选择
							success: async (res) => {
								// #ifdef APP-PLUS || MP-WEIXIN || H5
								for (let it of res.tempFiles) {
									let localPath = it.path
									// #ifdef APP-PLUS
									localPath = await this.$api.zipImage(localPath);
									// #endif
									this.imgList = this.imgList.concat(localPath)
								}
								// #endif

								// #ifdef MP-ALIPAY
								this.imgList = [...this.imgList, ...res.tempFilePaths]
								// #endif
								this.imgList2 = this.imgList;
								this.isChangeBanner = true;
							}
						});
						break;
					case 3:

						break;
					default:
						break;
				}
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			siteChange(e) { //站点的选择
				this.siteIndex = e.detail.value
				this.siteID = this.siteList[this.siteIndex].SiteID
				this.getBusineList()
			},
			busineChange(e) {
				this.busineIndex = e.detail.value
				this.BID = this.busineList[this.busineIndex].BID
			},
			deleteContentImg(index) {
				uni.showModal({
					title: '确定要删除该图片吗？',
					content: ' ',
					success: (res) => {
						if (res.confirm) {
							this.editItems.splice(index, 1);
						}
					}
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '店长',
					content: '确定要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					confirmColor: '#f34e2d',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							if (this.currentTab == 2) {
								this.isChangeBanner = true;
							}
							if (this.currentTab == 1) {
								this.isChangeTheme = true;
							}
						}
					}
				})
			},
			insertImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: async (res) => {
						let img = await this.$api.zipImage(res.tempFiles[0].path);

						this.changeLogoPic = img;
					},
					complete: (rea) => {
						// console.log(rea)
					}
				});
			},
			async getStoreInfo(id) {
				await this.$http.getStore(id).then(res => {
					let data = res.Data;
					this.storeInfo = data;
					console.log(this.storeInfo);
					this.StoreName = data.StoreName; //店铺名称
					this.StoreAddress = data.StoreAddress; //店铺地址
					this.StoreDesc = data.StoreDesc; //描述
					this.LogoPic = data.LogoPic; //头像
					this.Phone = data.Phone; //电话
					this.timeValue1 = data.StartWorkDate ? data.StartWorkDate : '';
					this.timeValue = data.EndWorkDate ? data.EndWorkDate : '';
					this.imgList2 = data.StorePics.split(',');
					let list = []
					list[0] = data.StorePic
					this.imgList1 = list;
				});
			},
			async getBusineList() {

				//根据站点获取商圈列表
				await this.$Request.get(this.$store.state.getBusstoreList, {
					siteid: this.siteID
				}).then(res => {
					if (res.IsSuccess) {
						this.busineList = res.Data;
						if (res.Data.length <= 0) {
							this.busineList = [{
								BID: -1,
								BusName: '无商圈信息'
							}]
							this.businedisable = true
						} else {
							this.businedisable = false;

							for (let i = 0; i < this.busineList.length; i++) {
								let val = this.busineList[i];
								let BID = val.BID;
								if (BID === this.storeInfo.GGBusinessID) {
									this.busineIndex = i
									break
								} else {
									this.busineIndex = 0
								}
							}
						}
					} else {
						this.$api.msg(res.Msg);
						this.businedisable = true
					}
				}).catch(err => {
					this.busineList = [{
						BID: -1,
						BusName: '无商圈信息'
					}]
					this.businedisable = true
				})

			},
			timeChange1(e) {
				this.timeValue1 = e.detail.value;
			},
			timeChange(e) {
				this.timeValue = e.detail.value;
			},
			toBottom() {
				this.showTop = true;
			},
			change(e) {
				this.currentTab = e.index;
				this.showTop = false;
				switch (this.currentTab) {
					case 0:
						break;
					case 1:
						this.count = 1;
						this.imgList = this.imgList1;
						break;
					case 2:
						this.count = 9;
						this.imgList = this.imgList2;
						break;
					case 3:
						break;
					default:
						break;
				}
			},
			promiseUpload(localPath) { //异步上传照片
				var self = this
				return new Promise((resolve, rej) => {
					qiniuUploader.upload(localPath, (res) => {
						let path = 'https://img.huaxuapp.com' + res.imageURL
						resolve(path)
					}, (error) => {
						self.$api.msg('图片过大，请上传450kb以内的图片,请重新上传')
						rej(error)
					}, {
						region: 'ECN',
						domin: 'https://img.huaxuapp.com',
						uptokenURL: 'https://newsapp.huaxuapp.com/api/getToken/gettoken',
						shouldUseQiniuFileName: true
					})
				})
			}


		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
</style>

<style scoped>
	.toTop {
		transform: translateY(-511upx);

	}
	
	.opacity-hidden{
		opacity: 0 ;
	}

	.tran {
		transition: all .5s ease-in-out;
		background: #FFFFFF;
	}
	
	.tran1{
		transition: all 1s ease-in-out;
		background: #FFFFFF;
	}
	.cu-progress {
		overflow: hidden;
		height: 24upx;
		background-color: #ebeef5;
		display: inline-flex;
		align-items: center;
		width: 100%;
	}

	.cu-progress view {
		width: 0;
		height: 100%;
		align-items: center;
		display: flex;
		justify-items: flex-end;
		justify-content: space-around;
		font-size: 20upx;
		color: #ffffff;
		transition: width 0.6s ease;
	}

	.del {
		font-size: 60upx;
		position: absolute;
		bottom: 10upx;
		right: 10upx;
	}

	.img {
		position: relative;
	}
</style>
