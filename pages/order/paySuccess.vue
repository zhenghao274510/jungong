<template>
	<view>
		<view class="icon">
			<image src="/static/img/home/zhifuchenggong.png"></image>
		</view>
		<view class="tis">
			订单支付成功
		</view>
		<view class="back">
			<view class="btn" @tap="toOrder">查看订单详情</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:''
			};
		},
		onLoad(options) {
            if(options.type){
				this.type=options.type
			}
		},
		methods: {
			toOrder() {
				let type;
				this.type==1?type=1:type=2
				this.$api.redirectTo(`/pages/order/order?id=${type}`)
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF !important;
	}
	view {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.icon {
		width: 100%;
		margin-top: 10vw;

		image {
			width: 384upx;
			height: 314upx;
		}
	}

	.tis {
		width: 100%;
		margin-top: 20upx;
		font-size: 30upx;
		color: #333333;
	}

	.pay-amount {
		width: 100%;
		margin-top: 50upx;
		font-size: 36upx;
	}

	.back {
		width: 100%;
		margin-top: 120upx;

		.btn {
			width:656upx;
			height:88upx;
			margin: 0 auto;
			background:rgba(254,80,99,1);
			box-shadow:0px 4upx 9upx 0px rgba(254, 99, 80, 0.35);
			border-radius:10upx;
			color: #FFFFFF;
			align-items: center;
			font-size: 34upx;
		}
	}
</style>
