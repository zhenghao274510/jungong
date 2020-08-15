<template>
	<view class="content">
		<navigator class="detial-list" v-for="(v,k) in dataList" :url="`/pages/goodDetails/backdetails?id=${v.id}`" :key="k">
			<view class="detial-time">
				{{k+1}}
			</view>
			<view class="detial-info">
				<image :src="v.avatar" class="detial-name">
				</image>
				<view class="detial-info-con">
					<view class="detial-title uni-ellipsis">
						{{v.shopName}}
					</view>
					<view class="detia uni-ellipsis">
						{{v.content}}
					</view>
					<view class="detial-adtime uni-ellipsis" >
					{{v.publishDate}}
					</view>
				</view>
				<view class="detial-money" v-if="v.recycleStatus==2">
					<view>获得{{v.userPoints}}积分</view>
				</view>
				<view class="detial-money" v-if="v.recycleStatus==1">
					<view>待处理</view>
				</view>
				<view class="detial-money" v-if="v.recycleStatus==3">
					<view>已拒绝</view>
				</view>
			</view>
			<image src="/static/img/splace.png" mode="" class="splace-img"></image>
		</navigator>

	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 30upx 20upx;
	}

	.detial-info-con {
		width: 46%;
		margin-left: 20upx;
	}

	.detial-list {
		margin-top: 20upx;
		padding: 45upx 20upx;
		display: flex;
		// justify-content: space-between;
		align-items: center;
		background: #FFFFFF;
		position: relative;
		border: 1upx solid rgba(235, 235, 235, 0.9);
		border-radius: 15upx;

		.splace-img {
			position: absolute;
			top: 50%;
			right: 30%;
			transform: translate(-50%, -50%);
			width: 12upx;
			height: 103upx;
		}

		.detial-time {
			width: 30upx;
			height: 30upx;
			text-align: center;
			line-height: 30upx;
			background: rgba(255, 234, 211, 1);
			border-radius: 50%;
			font-size: 24upx;
			font-weight: bold;
			color: rgba(224, 152, 76, 1)
		}

		.detial-info {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-left: 20upx;
		}

		.detial-name {
			width: 106upx;
			height: 106upx;
			border-radius: 6upx;
		}

		.detial-money {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;

			view {
				color: #E0984C;
				font-size: 30upx;
			}
		}

		.detial-adtime {
			font-size: 20upx;
			color: rgba(153, 153, 153, 1);
		}

		.detia {
			font-size: 24upx;
			color: rgba(102, 102, 102, 1);
		}

		.detial-title {
			font-size: 30upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
	}
</style>
