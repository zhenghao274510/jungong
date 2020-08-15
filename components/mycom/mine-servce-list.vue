<template>
	<view class="order-con">
		<view class="orders-title">
			<text>我的服务</text>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(v,k) in orderTypeList" :key="k" hover-class="hover" @tap="toOrderType(k)">
					<view class="icon">
						<image :src="v.img"></image>
					</view>
					<view class="icon-title">
						{{v.name}}
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				orderTypeList: [
					{
						img: '/static/img/mine/bofang.png',
						name: '我的视频'
					},
					{
						img: '/static/img/mine/jifen.png',
						name: '学习资料'
					},
					{
						img: '/static/img/mine/tuandui.png',
						name: '成为团队'
					},
					{
						img: '/static/img/mine/qiye.png',
						name: '成为企业'
					},
					{
						img: '/static/img/mine/shoucang.png',
						name: '我的收藏'
					},
					{
						img: '/static/img/mine/phone.png',
						name: '联系我们'
					},
					{
						img: '/static/img/mine/dizhi.png',
						name: '收货地址'
					},
					{
						img: '/static/img/mine/we.png',
						name: '关于我们'
					}
				]
			}
		},
		methods: {
			toOrderType(ind) {
				this.$emit('click', ind)
			}
		}
	}
</script>

<style scoped lang="scss">
	.order-con {
		.orders-title {
			padding:20upx;
			z-index: 999;
			font-weight: bold;
			border-bottom: 1px solid #F7F9FA;
			position: relative;
			font-size:36upx;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.orders {
			display: flex;
			align-items: flex-start;

			.box {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.label {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 33.3333%;
					color: #333333;
					font-size: 24upx;
					margin: 30upx 0 10upx 0;

					.icon {
						position: relative;
						margin-bottom: 10upx;
						width: 70upx;
						height: 70upx;

						image {
							width: 100%;
							height: 100%;
							z-index: 9;
						}
					}

					.icon-title {
						color: #666666;
						font-size: 24upx;
					}
				}
			}
		}

	}
</style>
