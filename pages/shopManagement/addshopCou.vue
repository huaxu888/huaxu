<template>
	<view>
		<cu-custom bgColor="bg-whitesss" backColor="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">添加满减券</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">添加满减券</block>
			<!-- #endif -->
		</cu-custom>
		
		<view style="height: 20upx;background-color: #ffffff;">
			
		</view>
		<view>
			<view class="padding-left bg-gray align-center flex padding-tb-sm">
				<view class="text-sm" style="font-size: 26upx;">请设置满减优惠券的金额：</view>
			</view>

			<view class="bg-white flex align-center justify-between  padding" style="width: 100%;">
				<view class="padding-tb-sm " style="width: 48%;">
					<text style="font-size: 30upx;color: #333333;">单次消费满</text>
					<view class="flex align-center  " style="border-bottom: 1px solid #F0F0F0;margin-top: 60upx;">
						<text style="font-size: 45upx;">￥</text>
						<input type="number" maxlength="5" :adjust-position="false" v-model="man" style="font-size: 42upx; margin-left: 10upx;font-weight: 600;" />
					</view>
				</view>
				<view class="padding-tb-sm " style="width: 48%;">
					<text style="font-size: 30upx;color: #333333;">可享优惠<text style="color: #fe5479;font-size: 28upx;">(商家承担)</text></text>
					<view class="flex align-center  " style="border-bottom: 1px solid #F0F0F0;margin-top: 60upx;">
						<text style="font-size: 45upx;">￥</text>
						<input type="number" maxlength="5" :adjust-position="false" v-model="jian" style="font-size: 42upx; margin-left: 10upx;font-weight: 600;" />
					</view>
				</view>
			</view>

			<view class="padding-left bg-gray align-center flex padding-tb-sm">
				<view class="text-sm" style="font-size: 26upx;">以下为优惠券详情(可修改)：</view>
			</view>

			<view class="bg-white " style="padding: 30upx 0;">
				<form>
					<view class="cu-form-group" style="border-top: 0px;border-bottom: 1px solid #F0F0F0;">
						<view class="title" style="color: #333333;">店铺人均消费(元)</view>
						<input name="input" placeholder="请填写人均消费" maxlength="4" type="number" v-model="Nums"></input>
					</view>
					
					<view class="cu-form-group" style="border-top: 0px;border-bottom: 1px solid #F0F0F0;">
						<view class="title" style="color: #333333;">是否为品牌连锁店</view>
						<radio-group @change="radioChange" class=" flex justify-between" style="text-align: center;line-height: 80upx;">
							<label class="flex justify-between" style="margin:0 50upx;text-align: center;" v-for="(item, index) in items" :key="item.value">
								<radio :value="item.value" :checked="index === currents" color="#fe5479" style="transform:scale(0.7);color: #fe5479;"/>
								<text>{{item.name}}</text>
							</label>
						</radio-group>
					</view>
					
					<view class="cu-form-group flex justify-between" style="border-top: 0px;" :style="shows==true? '' : 'borderBottom: 1upx solid #F0F0F0'">
						<view class="flex ">
							<view style="margin-top: 4upx;">
								<text style="color: #333333;">使用条件</text>
							</view>
							<view><text style="font-size: 50upx;color: red;">*</text></view>
						</view>
						
						<view>
							<picker @change="classPickerChange" :value="classIndex" range-key="Nick" :range="yYyList" mode="selector">
								<view class="flex flex-wrap ">
									<view class="flex justify-between">
										<view>{{yYyList[classIndex].Nick}}</view>
										<view class="hxIcon-rightArrow" style="font-size: 24upx;margin-top: 8upx;"></view>
									</view>
								</view>
							</picker>
						</view>
					</view>
					<view v-if="classIndex == yYyList.length-1" style="">
						<input class="cu-form-group" style="font-size: 28upx;border-bottom: 1px solid #F0F0F0;" maxlength="14" type="text" placeholder="请填使用写条件"  v-model="title"/>
					</view>
					
					
					<view class="cu-form-group flex justify-between " style="border-top: 0px;border-bottom: 1px solid #F0F0F0;">
						<view class="title" style="color: #333333;">发券数量(张)</view>
						<view>
							<input name="input" placeholder="1~5000张" maxlength="4" type="number" style="width: 180upx;" v-model="Num"></input>
						</view>
					</view>
					<view class="cu-form-group" style="border-top: 0px;border-bottom: 1px solid #F0F0F0;">
						<view class="title" style="color: #333333;">每人领券数量(张)</view>
						<input type="number" value="1" :disabled="true"></input>
					</view>
					<view class="cu-form-group flex justify-between" style="border-top: 0px;border-bottom: 1px solid #F0F0F0;">
						<view class="title" style="color: #333333;">优惠券展示时间</view>
						
						<input name="input" style="font-size: 26upx;" :disabled="true" :adjust-position="adjustPosition" v-model="valueTime" @tap="toggleTab"
							 :placeholder="'点击选择时间'" ></input>
					</view>
				</form>
			</view>
			<view style='margin-top: 30upx;padding: 0 30upx;'>
				<!-- <text style="font-size: 30upx;font-weight: 600;">用户支付时优惠部分由商家承担</text> -->
				<view style="margin-top: 15upx;width: 550upx;">
					<text style="font-size: 30upx;font-weight: 600;">优惠券使用有效时间为顾客领取后30天内</text>
					<!-- <view>
						<text style="color: #999999;font-size: 28upx;">每位顾客只能领用一次</text>
					</view> -->
				</view>
			</view>
			
			<view style="margin-top: 30upx;display: flex;justify-content: center;align-items: center;">
				<text style="font-size: 24upx;color: #fe5479;">发布即表示同意平台提现按实际真实成交额扣5%服务费</text>
			</view>
			
			<view class="sure margin-lr" @tap="submit">
			   <text style="font-size: 33upx;">发布</text> 
			</view>
			
		</view>
		<w-picker mode="range" startYear="2020" endYear="2030" :defaultVal="[0,0,0,0,0,0,0]" :current="current" @confirm="onConfirm"
		 ref="range" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				current: true,
				valueTime: '', //显示时间
				adjustPosition: false,
				TimeData: {
					mode: "range",
					value: [0, 0, 0, 0, 0, 0, 0],
					picker: "range"
				},
				startTime: '',
				endTime: '',
				Num: '', //券的数量
				Nums: '', //人均消费
				man: '',
				jian: '',
				StoreID: '',
				yYyList: [
				{
					Nick: '全场通用',
				},
				{
					Nick: '周末及节假日通用',
				},
				{
					Nick: '周末及节假日不可用',
				},
				{
					Nick: '锅底、酒水除外',
				},
				{
					Nick: '仅限菜品使用',
				},
				{
					Nick: '仅限午市使用',
				},
				{
					Nick: '仅限晚市使用',
				},
				{
					Nick: '仅限周一至周四 11:00-16:00使用',
				},
				{
					Nick: '仅限当前门店使用',
				},
				{
					Nick: '其他',
				}
				],
				classIndex: 0,
				items: [
				{
					name: '是',
				},
				{
					name: '否',	
				}
				],
				currents: 1,
				title: '',
				shows: false
			}
		},
		onShow() {
			console.log(this.$store.state.AddCouponsUrl);
			this.title = '全场通用'
			this.currents = 1
		},
		onLoad(route) {
			this.StoreID = route.StoreID
		},
		components: {
			wPicker
		},
		methods: {
			radioChange(evt) {
				console.log(evt);
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.currents = i;
						break
					}
				}
			},
			classPickerChange(e) {
				console.log(e);
				this.classIndex = e.target.value
				this.title = ''
				if(this.classIndex == this.yYyList.length-1) {
					this.shows = true
					return
				} else {
					this.title = this.yYyList[this.classIndex].Nick
					this.shows = false
				}
				
				console.log(this.title);
			},
			onConfirm(e) {
				console.log(e);
				this.valueTime = e.result
				this.startTime = e.from
				this.endTime = e.to
			},
			toggleTab(index) {
				this.$refs.range.show();
			},
			submit() {
				console.log(this.man);
				
				console.log(this.startTime);
				console.log(this.endTime);
				if (Number(this.man) < 0 || Number(this.man) == '') {
					if(this.man === '0'){
						
					} else {
						this.$api.msg('请正确填写单次消费额', 2000)
						return
					}
				}
				
				if (Number(this.jian) == '' || Number(this.jian) <= 0) {
					this.$api.msg('请正确填写可享优惠', 2000)
					return
				}
				
				if (Number(this.Nums) == '' || Number(this.Nums) <= 0) {
					this.$api.msg('请正确填写店铺人均消费', 2000)
					return
				}
				
				if (Number(this.man) < 0 || Number(this.jian) < 0) {
					this.$api.msg('请正确填写满减优惠券的金额', 2000)
					return
				}
				if ( Number(this.Num) == '' || Number(this.Num) <= 0 || Number(this.Num) > 5000) {
					this.$api.msg('发券数量不正确', 2000)
					return
				}
				
				if (this.startTime == '' ||  this.endTime == '') {
					this.$api.msg('请填写优惠券展示时间', 2000)
					return
				}
				
				if (this.title == '') {
					this.$api.msg('请填写使用条件', 2000)
					return
				}
				console.log(this.startTime);
				console.log(this.endTime);
				
				console.log();
				uni.showModal({
					title: '提示',
					content: '满' + Number(this.man) + '减' + Number(this.jian) + '优惠卷，确定发布吗？',
					success: (res) => {
						if (res.confirm) {
							let getData = {
									StoreID:this.StoreID,
									Num1: this.man, //赠送额
									Num2: this.jian, //限制额
									RJXF: this.Nums,//人均消费
									IsBrand: this.currents,//品牌连锁店
									Info: this.title,//使用条件
									Num: this.Num,//数量
									startTime: this.startTime,
									endTime: this.startTime,
								}
								this.$Request.get(this.$store.state.addshopCou, getData).then(res => {
									if (res.IsSuccess) {
										this.$api.msg('添加成功！', 2000)
										setTimeout(() => {
											uni.navigateBack({})
										}, 1000);
									}
								})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F0F0F0;
	}
	
	.sure {
		margin-top: 20upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fe5479;
		color: #fff;
		border-radius: 100upx;
		/* box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10); */
	}
	
</style>
