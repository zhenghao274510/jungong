<template>
	<view class="eva-section">
		<view class="e-header" v-if="type==0">
			<view class="tit uni-flex-item">用户评价</view>
			<view class="d-items-center" hover-class="btn-hover">
				<text class="tip" @click="gotoEva">更多</text>
				<text class="uni-icon uni-icon-arrowright"></text>
			</view>
			
		</view>
		<view class="eva-box">
			<block v-for="(v,k) in dataList" :key="k">
				<view class="eva-top">
					<image class="img" :src="v.avatar" mode="aspectFill"></image>
					<view class="eva-top-left">
						<view class="eva-info">
							{{v.nickname}}
						</view>
						<view class="eva-content uni-two-cut">
							{{v.content}}
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array
			},
			id:{
				type: String
			},
			type:[String,Number]
		},
		methods: {
			gotoEva() {
				this.$api.navTo(`/pages/goodDetails/infoEvaList?id=${this.id}`);
			}
		}
	};
</script>

<style scoped lang="scss">
	.uni-icon-arrowright{
		font-size: 30upx;
		color: #CCCCCC;
		margin-left:10upx;
	}

	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 30upx;
		background: #FFFFFF;
		margin-bottom: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom:30upx;

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
				border-radius: 3upx;
				margin-right: 15upx;
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
			margin-bottom: 30upx;

			.img {
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
				margin-right: 20upx;
			}

			.eva-top-left {
				flex: 1;
				.eva-info {
					color: #333333;
					font-size: 28upx;
				}
				.eva-content {
					color: #666666;
					font-size: 24upx;
				}
			}


		}


	}
</style>
