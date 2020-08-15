<template>
	<view class="mask" v-if="pickerShow" @click.stop="hidePicker">
		<view class="yaoqing-content" >
			<image src="/static/order/zhifuchenggong.png" mode="" class="img"></image>
			<view class="cancel-title">
				订单已取消
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerShow: false
			}
		},
		methods: {
			showPicker() {
				this.pickerShow = true;
			},
			hidePicker() {
				this.pickerShow = false;
				this.$api.back();
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-flex {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.cancle-btn{
		width:561upx;
		height:80upx;
		margin:60upx auto;
		background:rgba(107,212,83,1);
		border-radius:5upx;
		color: #FFFFFF;
		line-height: 80upx;
		font-size: 36upx;
		text-align: center;
	}
	.img{
		width:134upx;
		height:134upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, .6);
	}

	.yaoqing-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 80%;
		background: #FFFFFF;
		border-radius: 10upx;
		padding:60upx 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}
	.cancel-title{
		padding: 20upx;
		text-align: center;
		color: #333333;
		font-weight: bold;
		margin-top: 20px;
		font-size: 38upx;
	}
</style>
