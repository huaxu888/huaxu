<template>
	<view style="height: 100vh;width: 100vw;">
		<view class="padding-top-xl padding-right flex align-start justify-end" style="background: url('http://img.huaxuapp.com/kp.png'); height: 100vh;width: 100vw; background-repeat: no-repeat; background-size: 100% 100%;">
			<view @tap="toIndex" class="margin-top-xl flex align-center justify-center " style="color: #FFFFFF; height: 65upx; width: 130upx; background: rgba(255,255,255,0.5);border-radius: 1000upx;">
				<text>{{time}}s 跳过</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				time:4,
				lock:false
			}
		},onLoad() {
			var self =this;
			let t = setInterval(function() {
				if(self.time == 0 && !self.lock){
					self.toIndex();
					clearInterval(t);
				}else{
					self.time --;
				}
			}, 1000)
		},
		methods:{
			toIndex(){
				this.lock = true;
				uni.switchTab({
					url:'/pages/index/index'
				})
				
			}
		
			
		}
	}
</script>

<style>
</style>
