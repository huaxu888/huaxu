<template>
	<view class="input-field-page" :style="{paddingTop: getPx(top)}">
		<view class="input-area">
			<view class="input-field">
				<input 
					:disbale="canInput"
					:type="isPass ? 'password' : type "
					class="input-input"
					:disabled="disabled"
					:focus="active"
					:password="isPass"
					 v-model="inputValue"
					 @focus="focus"
					 @blur="blur"
					 @input="input"/>
				 <view :style="{fontSize: active ? getPx(activeFontSize) : getPx(normalFontSize), 
					color: active ? activeColor: normalColor, top: active ? '-100%' : '0'}" @tap="activeInput" 
					class="input-label">
					<text>{{ label }}</text>
				</view>
			</view>
			<view class="action-field" v-if="active">
				<text :class="['password-btn', 'text-icon', isPass ? 'hxIcon-yanjing' : 'hxIcon-yanjing1']"
				v-if="password" @tap="seePass"></text>
				<text class="hxIcon-cha clear-btn text-icon" v-if="clearable && showClear" @tap="clear"></text>
			</view>
		</view>
		<view class="animation-area">
			<view :style="{backgroundColor: normalColor, width: active ? '0' : '100%', left: active ? '100%' : '0'}" 
				class="liner">
			</view>
			<view :style="{backgroundColor: activeColor, width: active ? '100%' : '0'}" 
				class="liner" style="left: 0">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'inputField',
		props: {
			canInput:{
				type:[Boolean,String],
				default:false
			},
			type: {
				type: String,
				default: 'text'
			},
			password: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: '请输入'
			},
			clearable: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			},
			top: {
				type: String,
				default: '100'
			},
			normalColor: {
				type: String,
				default: '#ddd'
			},
			activeColor: {
				type: String,
				default: '#EC3B46'
			},
			normalFontSize: {
				type: String,
				default: '32'
			},
			activeFontSize: {
				type: String,
				default: '24'
			}
		},
		data() {
			return {
				inputValue: '',
				label: this.placeholder + this.title,
				showClear: false,
				active: false,
				isPass: this.password
			}
		},
		methods: {
			focus: function(res) {
				this.$emit('focus', this.inputValue)
				this.active = true
				if (this.inputValue !== '') {
					this.showClear = true
				}
			},
			blur: function (res) {
				this.$emit('blur', this.inputValue)
				if (this.inputValue === '') {
					this.active = false
					this.showClear = false
				}
			},
			input: function (res) {
				this.$emit('input', this.inputValue)
				if (this.inputValue !== '') {
					this.label = this.title
					this.showClear = true
				} else {
					this.label = this.placeholder + this.title
					this.showClear = false
				}
				
			},
			activeInput: function (res) {
				this.active = !this.active
			},
			seePass: function (res) {
				this.isPass = !this.isPass
			},
			clear: function (res) {
				this.inputValue = ''
				this.showClear = false
				this.active = true
				this.label = this.placeholder + this.title
			},
			getPx: function (upx) {
				return uni.upx2px(upx) + 'px'
			}
		}
	}
</script>

<style scoped lang="scss">
	.input-field-page {
		
		// 输入框区域的样式
		.input-area {
			display: flex;
			
			// 输入区域的样式
			.input-field {
				flex: auto;
				margin-left: 5upx;
				position: relative;
				display: flex;
				align-items: center;
				
				// 输入框标签样式
				.input-label {
					position: absolute;
					width: 100%;
					z-index: 9;
					transition: all 0.3s ease-in-out;
				}
				// 输入框的样式
				.input-input {
					width: 100%;
					border: none;
				}
			}
			// 操作按钮的样式
			.action-field {
				display: flex;
				align-items: center;
				
				.text-icon {
					margin: 0 15upx;
					border-radius: 1000upx;
				}
				
				.password-btn {
					color: #333;
					border-radius: 100upx;
					font-size: 36upx;
				}
				
				.clear-btn {
					color: #F8F8F8;
					background-color: #666;
					border-radius: 100upx;
					font-size: 20upx;
					padding: 7upx;
				}
			}
		}
		
		// 输入框底部动画的样式
		.animation-area {
			flex-direction: column;
			position: relative;
			padding-top: 10upx;
			
			.normal-liner {
				position: absolute;
				width: 100%;
				height: 2upx;
				left: 0;
				background-color: #eee;
				transition: all .3s ease-in-out
			}
			.liner {
				position: absolute;
				height: 2upx;
				transition: all .3s ease-in-out
			}
			.active-liner{
				position: absolute;
				width: 0%;
				left: 0;
				height: 2upx;
				background-color: #EC3B46;
				transition: all .3s ease-in-out
			}
			.active-liner-normal{
				position: absolute;
				width: 100%;
				left: 0;
				height: 2upx;
				background-color: #EC3B46;
				transition: all .3s ease-in-out
			}
		}
	}
</style>
