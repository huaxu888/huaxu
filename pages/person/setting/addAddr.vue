<template>
	<view class="add-addr-page">
		<cu-custom bgColor="bg-white solid-bottom" :isBack="true" backColor="text-black">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">添加收货地址</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">添加收货地址</block>
			<!-- #endif -->
		</cu-custom>

		<view class="add-panel">
			<form>
				<view class="cu-form-group">
					<view class="title">邮件</view>
					<input placeholder="两字短标题" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">输入框</view>
					<input placeholder="三字标题" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">收货地址</view>
					<input placeholder="统一标题的宽度" name="input"></input>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
</script>

<style>
	page {
		background: #F8F8F8;
	}
</style>
<style scoped lang="scss">
</style>
