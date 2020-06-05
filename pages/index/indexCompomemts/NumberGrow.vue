<!-- 
* @file NumberGrow.vue
* @descripteon 数字滚动插件
* @author 张阳
* @date 2019-6-4
* @version: V1.0.0
* @email:1103992447@qq.com
-->
<template>
	<span style="font-size: 60upx;"  :data-time="time" class="number-grow" :data-value="value">{{money}}</span>
</template>

<script>
	export default {
		data() {
			return {
				money: 0
			}
		},
		props: {
			time: {
				type: Number,
				default: 0.5 //速度越大速度越慢
			},
			value: {
				type: Number,
				default: 0
			}
		},
		methods: {
			numberGrow(ele) {
				let _this = this
				let step = (_this.value * 10) / (_this.time * 1000)
				let current = 0
				let start = 0

				setTimeout(() => {
					let t = setInterval(function() {
						start += step
						if (start > _this.value) {
							clearInterval(t)
							start = _this.value
							t = null
						}
						if (current === start) {
							return
						}
						current = (Math.floor(start*100)/100).toFixed(2);
						_this.money = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
					}, 10)
				}, 500);
			}
		},
		mounted() {
			this.numberGrow(this.$refs.numberGrow)
		}
	}
</script>

<style>

</style>
