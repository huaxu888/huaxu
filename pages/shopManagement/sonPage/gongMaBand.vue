<template>
	<view>
		<cu-custom bgColor="bg-miyellow" class="text-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">公码绑定</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">公码绑定</block>
			<!-- #endif -->
		</cu-custom>
		<view>
			<view class="margin-sm bg-white  flex align-center justify-between flex-direction padding-xl  scan-card">
				<view class="margin-top-lg  img">
				</view>
				<view class="margin-top-lg" style="color: #333333;font-size: 40upx;">绑定对象</view>
				<view class="flex align-center justify-center margin-top" style="background: #faf7fa; width: 415upx;height:88upx;border-radius: 12upx;">
					<view class="flex align-center justify-center" v-if="yyyState===2">
						<picker @change="classPickerChange" :value="classIndex" range-key="info" :range="yYyList" mode="selector">
							<view class="flex flex-wrap align-center justify-between">
								<view class="yyyName text-lg " style="margin-left: 80upx;">{{yYyList[classIndex].Name}}</view>
								<text class="hxIcon-fanhui trasnsfromBack"></text>
							</view>
						</picker>

					</view>
					<!-- yyyState===1 -->
					<text v-if="yyyState===1 " style="color: #333333;font-size: 32upx;">{{bandYyY.Name}}</text>

				</view>
				<view @tap="scan" class="flex align-center justify-center margin-tb scan-button" >
					<text class="text-white" style="font-size: 33upx;">点击扫码</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(route) {
			this.getData.storeid = route.StoreID
			if (this.yyyState === 2) {
				this.bandYyY = this.yYyList[0]
			} else if (this.yyyState === 1) {
				let data = {
					UserID: this.$store.state.userInfo.ID,
					Name: this.$store.state.userInfo.Nick
				}
				this.bandYyY = data
				// this.$set(this.bandYyY,'Name')
				console.log(this.bandYyY)
			}
			console.log()
			this.getYyY()
		},
		data() {
			return {
				classIndex: 0,
				yYyList: [{
					Name: '店铺主收款码',
					UserID: 0,
					FaceURL: 'https://img.huaxuapp.com/pig.png',
					shouyingyuan: {
						UserID: 0
					},
					Phone: 0
				}],
				getData: {
					storeid: '',
					yyyid: 0,
					ewmid: 0,
				},
				bandYyY: {}
			}
		},
		methods: {
			async scan() {
				let data = {
					onlyFromCamera: false,
					scanType: ['qrCode'],
				}
				let [err, res] = await uni.scanCode(data)
				let [ewmid, val] = res.result.split('?')[1].split('=')
				if (ewmid === "ewmid") {
					this.getData.ewmid = val
					this.getData.yyyid = this.bandYyY.UserID
					let data = await this.$Request.get(this.$store.state.getGm, this.getData)
					if (data.IsSuccess) {
						uni.navigateTo({
							url: `/pages/shopManagement/sonPage/saoMaSuccess?shopName=${data.StoreName}&bandName=${data.YYYName}`
						})
					} else {
						this.$api.msg(data.Msg)
					}
				} else {
					this.$api.msg('扫码失败请重新扫码')
				}
			},
			classPickerChange(e) {
				this.classIndex = e.detail.value
				this.bandYyY = this.yYyList[this.classIndex]
				console.log(this.bandYyY)
			},
			getYyY() {
				let data = {
					StoreID: this.getData.storeid
				}
				return this.$Request.get(this.$store.state.getsyylistUrl, data, false).then(res => {
					if (res.IsSuccess) {
						this.yYyList = [...this.yYyList, ...res.Data]
						this.yYyList.forEach((it, i) => {
							let info = ''
							if (i === 0) {
								it.info = '店铺主收款码'
							} else {
								it.info = `${it.Name},${it.Phone}`
							}
						})
						return this.yYyList
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background: #E8C091;
	}
</style>

<style scoped lang="scss">
	page {
		background: #E8C091;
	}

	.scan-card {
		height: 940upx;
		border-radius: 30upx;
	}

	.scan-card .img {
		background: url('https://img.huaxuapp.com/systp.png') no-repeat;
		width: 366upx;
		height: 366upx;
		background-size: 100% 100%;
		margin-left: 22upx;
	}

	.scan-card .trasnsfromBack {
		margin-left: 80upx;
		display: inline-block;
		color: #333333;
		transform: rotate(180deg);
	}
	
	.scan-card  .scan-button{
		width: 585upx;
		height: 100upx;
		background:#B37F2D;
		border-radius: 1000upx;
	}
</style>
