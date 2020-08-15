<template>
	<view class="cart-content">
		<view class="cart-nothing">
			<image src="/static/notFound.png" mode="" class="empty-img"></image>
			<view class="">
				<view class="empty-text">
					暂无结算商品
				</view>
				<view class="empty-to" @click="toDo">
					去逛逛
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			empty: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		},
		methods: {
			toDo() {
				uni.switchTab({
					url: '/pages/tabbar/shop'
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.cart-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.cart-nothing {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.empty-img {
		width: 374upx;
		height: 288upx;
	}

	.empty-text {
		height: 54upx;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 54upx;
		margin: 50upx;
	}

	.empty-to {
		height: 54upx;
		font-size: 28upx;
		font-weight: bold;
		color: rgba(255, 72, 72, 1);
		line-height: 54upx;
		text-align: center;
	}
</style>
