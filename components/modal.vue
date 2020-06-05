<template>
	<view class="cu-modal padding-lr-xl " :class="showModal?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">{{Title}}</view>
				<view class="action" @tap="hideModal(-1)">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-lr flex flex-direction align-start" style=" overflow: auto; height: 780upx;text-align: left;">
				<rich-text :nodes="Content_"></rich-text>
			</view>
			<view class="cu-bar bg-white">
				<view class="action margin-0 flex-sub text-green solid-left " style="color:red" @tap="hideModal(-1)" v-if="showFail">{{failLabel}}</view>
				<view class="action margin-0 flex-sub  solid-left" style="color:green" @tap="hideModal(1)" v-if="showSuccess">{{successLabel}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default{
		props:{
			Title:{//标题
				type:String,
				default:'标题'
			},
			Content:{//内容
				type:String,
				default:''
			},
			showModal:{//控制显示
				type:Boolean,
				default:false
			},
			successLabel:{
				type:String,
				default:'同意'
			},
			failLabel:{
				type:String,
				default:'不同意'
			},
			showFail:{//显示不同意
				type:Boolean,
				default:true
			},
			showSuccess:{//显示同意
				type:Boolean,
				default:true
			}
		},
		computed: {
			Content_() {
				return htmlParser(this.Content)
			}
		},
		methods: {
			hideModal(i) {
				if (i > 0) {
					this.$emit('hidden',true)//同意
				} else {
					this.$emit('hidden',false)//取消或者点X
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	
	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.2s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	
	.hx-btn {
		height: 80upx;
	}

	.cu-steps .cu-item [class*="hxIcon-"],
	.cu-steps .cu-item .num {
		display: block;
		font-size: 40upx;
		line-height: 80upx;
	}

	.cu-steps .cu-item::after {
		border-bottom: 1px solid currentColor;
		width: 0px;
		transition: all 0.3s ease-in-out 0s;
	}

	.cu-steps .cu-item[class*="text-"]::after {
		width: calc(100% - 80upx);
		color: currentColor;
	}

	.cu-steps.steps-arrow .cu-item::before,
	.cu-steps.steps-arrow .cu-item::after {
		content: "\e657";
		font-family: 'iconfont';
		height: 30upx;
		border-bottom-width: 0px;
		line-height: 30upx;
		top: 0;
		bottom: 0;
		margin: auto;
		color: #ccc;
	}

	.submit {
		display: flex;
	}

	.hx-btn {
		background-color: #ec3a46;

		&.normal {
			opacity: .3
		}
	}
</style>
