<template>
	<view class="eva-section">
		<view class="e-header" v-if="type==0">
			<text class="tit">用户评价</text>
			<text class="tip" @click="gotoEva">更多</text>
			<text class="iconfont icon-youjiantou"></text>
		</view>
		<view class="eva-box" v-if="dataList.length!=0">
			<block v-for="(v,k) in dataList" :key="k">
				<view class="eva-top">
					<image class="img" :src="v.avatar" mode="aspectFill"></image>
					<view class="eva-top-left">
						<view class="eva-info">
							<text class="name">{{v.nickname}}</text>
							<sx-rate :defaultStar="v.score" :disabledStar="disabledStar" :ind="k"></sx-rate>
						</view>
						<view class="eva-content">
							<view class="con uni-two-cut">{{v.content}}</view>
							<view class="eva-img-con" v-if="v.image.length!=0">
								<image class="img" v-for=" (m,n) in v.image" :key="n" :src="m" mode="scaleToFill" @click="ImgDetails(k,n)"></image>
							</view>
						</view>
					</view>

				</view>

			</block>
		</view>
	</view>
</template>

<script>
	import sxRate from '@/components/sunui-star/sunui-star.vue';
	export default {
		components: {
			sxRate
		},
		props: {
			dataList: {
				type: Array
			},
			productId: {
				type: String
			},
			type: [String, Number]
		},
		data() {
			return {
				disabledStar: true
			}
		},
		methods: {
			gotoEva() {
				this.$api.navTo(`/pages/goodDetails/useEvaList?id=${this.productId}`)
			},
			ImgDetails(k, n) {
				uni.previewImage({
					urls: this.dataList[k].image,
					current: this.dataList[k].image[n]
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.eva-active {
		padding: 20upx;
		border-radius: 8upx;
		background-color: #f8f8f8;
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 30upx;
		background: #fff;
		margin-bottom: 16upx;

		.e-header {
			display: flex;

			.tit {
				margin-right: 4upx;
				color: #333333;
				font-weight: 600;
			}

			&::before {
				content: '';
				width: 6upx;
				height: 29upx;
				background:#e0984c;
				border-radius: 3px;
				margin-right: 15upx;
				margin-top: 10upx;
			}

			.tip {
				flex: 1;
				text-align: right;
				color: #999999;
				font-size: 24upx;
			}
		}
	}

	.eva-box {
		display: flex;
		flex-direction: column;

		.eva-top {
			display: flex;
			justify-content: space-between;
			margin-top: 20upx;

			.img {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				margin-right: 20upx;
			}

			.eva-top-left {
				flex: 1;

				.eva-info {
					display: flex;
					align-items: center;

					.name {
						margin-right: 20upx;
					}
				}
			}
		}

		.eva-content {
			margin: 20upx 0;

			.con {
				color: #666666;
				font-size: 24upx;
			}

			.eva-img-con {
				display: flex;
				align-items: center;
				padding: 20upx 0;

				.img {
					width: 160upx;
					height: 160upx;
					border-radius: 10upx;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
