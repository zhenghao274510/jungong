<template>
	<view class="content">
		<view class="uni-house-title">
			楼盘新房
		</view>
			<navigator class="uni-second"  v-for="(v,k) in dataList" :key="k" :url='`/pages/Previewindo/housedetails?id=${v.id}`'>
				<view class="image-second">
					<image class="uni-second-image" :src="v.image" lazy-load></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-ellipsis">{{v.name}}
					</view>
					<view class="price uni-two-cut">
						{{v.location}}
					</view>
					<view class="uni-flex d-items-center">
						<view class="sku-name" v-if="v.houseStatus==2">
							在售
						</view>
						<view class="sku-name" v-else>
							待售
						</view>
						<view class="sku-price">
							￥{{v.price}}元/m
						</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			}
		},
		methods: {
			gotoDetails(id) {
				this.$api.navTo(`/pages/Previewindo/housedetails?id=${id}`)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-house-title {
		padding: 0 20upx 30upx 20upx;
		font-size:36upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		background-color: #FFFFFF;
	}

	.btn {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 160upx;
		line-height: 60upx;
		height: 60upx;
	}

	.content {
		box-sizing: border-box;
		margin-top:20upx;
	}

	.price {
		font-size: 22upx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.sku-name {
		width: 83upx;
		height: 33upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 33upx;
		font-size: 22upx;
		background: url('@~static/img/bg.png');
		background-size: 100% 100%;
	}

	.sku-price {
		padding: 0 15upx;
		background: rgba(233, 255, 229, 1);
		border-radius: 4upx;
		text-align: center;
		font-size: 22upx;
		font-weight: 500;
		color: rgba(49, 173, 26, 1);
		margin-left: 60upx;
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10px;
		margin-bottom: 10px;
	}

	.uni-second {
		display: flex;
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 20upx;
	}

	.image-second {
		width: 155upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 194upx;
		height: 140upx;
		border-radius: 4upx;
	}

	.uni-second-title {
		color: #333333;
		font-size: 30upx;
		line-height: 1.5;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		line-height: 1.5;
		padding-left: 30upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}

	.uni-flex {
		margin-bottom: 10upx;
	}
</style>
