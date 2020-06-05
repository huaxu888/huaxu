<template>
	<view class="padding padding-lr-sm" style="background: #F2F2F2;">
		<view>
			<view class="text-bold margin-top">
				服务详情：
			</view>
			
			<view class="margin-top flex align-center">
				<image src="https://img.91goodluck.com/cao_07.png" mode="aspectFit" style="width: 40upx;height: 50upx;"></image>
				<view class="margin-left-sm">
					海报设计只需3步，精美海报即可送达您手中
				</view>
			</view>
			
			<view class="margin-top">
				<view class="margin-top-sm" v-for="(item,i) of textList1" :key="i">
					{{item}}
				</view>
			</view>
		</view>
		
		<view class="flex align-center justify-center" style="margin-top: 40upx;margin-bottom: 40upx;overflow: hidden;">
			<view v-for="(item,i) of 15" :key="i" class="margin-right-xs" style="height: 2upx;width:45upx;background:rgba(180,180,180,0.7);">
				
			</view>
		</view>
		
		<view>
			<view class="margin-top flex align-center">
				<image src="https://img.91goodluck.com/cao_07.png" mode="aspectFit" style="width: 40upx;height: 50upx;"></image>
				<view class="margin-left-sm">
					海报设计流程介绍
				</view>
			</view>
			
			<view class="margin-top">
				<view class="margin-top-sm" v-for="(item,i) of textList1" :key="i">
					{{item}}
				</view>
			</view>
		</view>
		
		<view style="margin-top: 40upx;margin-bottom: 40upx;text-decoration:underline;color: #666666;">
			客户只需要三步，即可获得专属设计设计的精美海报，详情请拨打客服电话咨询。
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				textList1:[
					'1，【三步下单】 极简操作，不纠结',
					'2，【专业设计师】 专业表达，不将就',
					'3，【24小时】 快速送达，不等待',
				],
				textList2:[
					'1，商家进入服务',
					'2，选择行业分类',
					'3，上传素材资料',
					'4，设计精美海报'
				]
			}
		}
	}
</script>

<style>
</style>
