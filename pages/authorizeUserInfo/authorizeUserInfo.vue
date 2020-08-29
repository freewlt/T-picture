<template>
	<view class="container">
	  <view class="logo">
		<image class="avatarUrl" bindtap="bindViewTap" src="/static/images/logo.png" mode="cover"></image>
		<text class="txt">您还未登录，请先登录</text>
	  </view>
	  <button class="designBtn" open-type="getUserInfo" @getuserinfo="getUserInfo">现在登录</button>
	</view>
</template>

<script>
	const util = require('../../utils/http');
	const Bmob = require('../../utils/Bmob-1.6.1.min.js');
	const api = require('../../config/api');
	
	export default {
		data() {
			return {
				userInfo: {
				  avatarUrl: "/static/images/logo.png"
				},
				// 按钮禁用
				isDisabled: false,
				loginToken: ""
			}
		},
		methods: {
			getUserInfo(e){
				uni.switchTab({
					url:"/pages/home/home"
				})
			},
		}
	}
</script>

<style>
	.logo{
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	.avatarUrl{
	  width: 192rpx;
	  height: 192rpx;
	  margin: 126rpx 0 40rpx;
	  border-radius: 50%;
	}
	.txt {
	  font-size:32rpx;
	  color: #333;
	  font-weight: bold;
	}
	.designBtn{
	  width: 600rpx!important;
	  height: 96rpx!important;
	  line-height: 96rpx!important;
	  padding: 0;
	  margin-top: 200rpx;
	  background: linear-gradient(136deg,rgba(255,91,98,1) 0%,rgba(238,39,52,1) 100%);
	  border-radius: 25px;
	  color: #fff;
	  font-size: 36rpx;
	  font-weight:500;
	}
	.designBtn[disabled]:not([type]){
	  opacity:0.5;
	  color:#fff;
	}
</style>
