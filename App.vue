<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		background-color: #f5f5f5;
	}
	.symbol{
		display: block;
		width:6rpx;
		height:30rpx;
		margin-right: 20rpx;
		background:rgba(230,0,18,1);
		border-radius:100px;
	}
</style>
