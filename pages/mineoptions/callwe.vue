<template>
	<view class="content">
		<view class="phone-con" @click="tellWe">
			<view class="uni-flex d-between d-items-center pad-we">
				<view class="phone">
					{{phone}}
				</view>
				<view class="">
					联系我们
				</view>
			</view>
		</view>
		<view class="qrcode-con">
			<image :src="wechatCode" class="qrcode-img"></image>
			<view class="tip-btn">
				扫描添加客服微信
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				wechatCode:''
			}
		},
		onLoad(options) {
			this.phone = options.phone;
			this.wechatCode = options.wechatCode;
		},
		methods:{
			tellWe(){
				this.$api.callPhone(this.phone);
			}
		}
	}
</script>

<style scoped lang="scss">
	.qrcode-con {
		padding-top: 300upx;
	}

	.qrcode-img {
		width: 232upx;
		height: 232upx;
	}

	.tip-btn {
		width: 228upx;
		height: 55upx;
		line-height: 55upx;
		text-align: center;
		background: rgba(224, 152, 76, 1);
		border-radius: 10upx;
		font-size: 24upx;
		color: rgba(255, 255, 255, 1);
		margin-top: 40upx;
	}

	.pad-we {
		height: 87upx;
		padding: 0 20upx;
		box-sizing: border-box;
		background: rgba(246, 246, 246, 1);

		.phone {
			font-size: 26upx;
			color: rgba(153, 153, 153, 1)
		}
	}

	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 30upx;
	}

	.phone-con {
		width: 100%;
		padding: 70upx 30upx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 6upx;
		justify-content: space-between;
	}
</style>
