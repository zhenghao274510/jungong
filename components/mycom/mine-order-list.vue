<template>
	<view class="order-con">
		<view class="orders-title" @click="toOrderType(0)">
			<text>我的订单</text>
			<!-- 			<text class="order-more">查看更多</text> -->
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(v,k) in orderTypeList" :key="k" hover-class="hover" @tap="toOrderType(v.id)">
					<view class="icon">
						<image :src="v.img"></image>
					</view>
					<view class="icon-title">
						{{v.name}}
					</view>

					<!-- <view class="point" v-if="v.num!=0">
						{{v.num}}
					</view> -->
				</view>
				<image src="/static/img/splace.png" mode="" class="splace-img"></image>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			dataObj: {
				type: Object,
				default: {
					daifukuan: "", //待付款数量
					daishouhuo: "", //待收货数量
					daipingjia: "", //待评价数量
					tuikuan: "" //退款数量
				}
			}
		},
		data() {
			return {
				orderTypeList: [{
						img: '/static/img/mine/daifukuan.png',
						name: '待付款',
						id: 1,
						num: 0
					},
					{
						img: '/static/img/mine/daishouhuo.png',
						name: '待收货',
						id: 2,
						num: 0
					},
					{
						img: '/static/img/mine/tuikuan.png',
						name: '退款/售后',
						id: 4,
						num: 0
					},
					{
						img: '/static/img/mine/dingdan.png',
						name: '全部订单',
						id: 5,
						num: 0
					}
				]
			}
		},
		watch: {
			dataObj(newVal) {
				if (newVal.daifukuan != '') {
					this.orderTypeList[0].num = newVal.daifukuan;
					this.orderTypeList[1].num = newVal.daishouhuo;
					this.orderTypeList[2].num = newVal.daipingjia;
					this.orderTypeList[3].num = newVal.tuikuan;
				}
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
	.splace-img {
		position: absolute;
		right: 25%;
		top: 50%;
		transform: translateY(-50%);
		width: 13upx;
		height: 103upx;
	}

	.order-con {
		.orders-title {
			padding: 20upx;
			z-index: 999;
			border-bottom: 1px solid #F7F9FA;
			position: relative;
			overflow: hidden;
			font-size: 36upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		.order-more {
			float: right;
			color: #666666;
			font-size: 24upx;
		}

		.orders {
			display: flex;
			align-items: flex-start;

			.box {
				width: 100%;
				display: flex;
				align-items: center;
				position: relative;

				.label {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 25%;
					color: #333333;
					font-size: 24upx;
					margin: 30upx 0 10upx 0;
					position: relative;

					.point {
						position: absolute;
						top: 0;
						right: 20upx;
						width: 26upx;
						height: 26upx;
						background-color: red;
						color: #FFFFFF;
						font-size: 22upx;
						text-align: center;
						line-height: 26upx;
						border-radius: 50%;
					}

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
						color: #333333;
						font-size: 24upx;
						font-weight: 600;
					}
				}
			}
		}

	}
</style>
