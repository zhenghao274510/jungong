<template>
	<view style="margin-top: 15rpx;">
		<view class="second-title uni-flex d-between" v-if="type==0">
			<view class="top-title">
				今日精品
			</view>
			<view class="top-more uni-flex d-items-center" @click="toMore">
				查看更多   <image src="/static/img/more.png" class="more-img"></image>
			</view>
		</view>
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in dataList" :key="k" @click.stop="stockDetails(v.id)">
				<view class="image-second">
					<image class="uni-second-image" :src="v.image" mode="aspectFit" lazy-load></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-flex d-items-center">
						<view class="uni-second-title uni-ellipsis">
							{{v.name}}
						</view>
						<view class="new-price">
							活动价
						</view>
					</view>

					<view class="sku-name uni-ellipsis">{{v.intro}}
					</view>
					<view class="uni-flex d-items-center price-con">
						<text class="price-scle">￥ <text class="price">{{v.price}}</text> </text>
						<view class="buy-num">
							原价:{{v.linePrice}}
						</view>
						<view class="img-splace">

						</view>
						<image src="/static/img/jia.png" hover-class="btn-hover" class="img" @click.stop="buyActive(v)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			},
			type: {
				type: [String, Number],
				default: 0
			},
			uid: {
				type: String
			}
		},
		methods: {
			buyActive(e) {
				if (e.spec == 0) {
					let parmas = {
						mid: this.uid,
						gid: e.id,
						count: 1
					};
					this.$api.addCart(parmas, res => {
						res.result == 0 ?(this.$api.tip('加入购物车成功!'),this.$api.getUserCartNum({mid:this.uid}))  : this.$api.tip(res
							.resultNote);
					})
				} else {
					this.$api.navTo(`/pages/goodDetails/gooddetails?id=${e.id}`);
				}

			},
			stockDetails(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}`);
			},
			toMore() {
				this.$api.navTo(`/pages/productList?type=1&name=今日精品`)
			},
			init() {
				this.list = [];
			}
		}
	}
</script>
<style scoped lang="scss">
	.price-scle{
		font-size: 24upx;
		color: #FF0000;
	}
	.more-img{
		width: 33upx;
		height: 33upx;
		margin-left: 20upx;
	}
	.new-price {
		width: 90upx;
		height: 36upx;
		line-height: 36upx;
		background: url('@~static/img/bg.png');
		background-size: 100% 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 16upx;
		margin-left: 20upx;
	}

	.sku-name {
		color: #666666;
		font-size: 22upx;
		width: 70%;
	}

	.bg-img {
		width: 66upx;
		height: 28upx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.buy-num {
		font-size: 22upx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		text-decoration: line-through;
		margin-left: 20upx;
	}

	.price-con {
		position: relative;
		padding: 10upx 0;
	}

	.uni-second-tip {
		position: absolute;
		top: 0;
		left: 0;
		width: 137upx;
		height: 45upx;
	}

	.hote-img {
		width: 137upx;
		height: 45upx;
	}

	.uni-targe {
		position: absolute;
		top: 0;
		left: 20upx;
		color: #FFFFFF;
		font-size: 24upx;
	}

	.img-splace {
		width: 60upx;
	}

	.img {
		width: 49upx;
		height: 49upx;
		border-radius: 18upx;
		position: absolute;
		top: -20upx;
		right: 20upx;
	}

	.price {
		color: #FF0000;
		font-weight: Bold;
		font-size: 38upx;
	}

	.second-title {
		padding: 30upx 20upx;
		position: relative;

	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		margin: 10px 0;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		margin: 0 0 20upx 20upx;
		width: 46%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 6upx;
		position: relative;
	}

	.image-second {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		height: 334upx;
		border-radius: 6upx;
	}

	.uni-second-title {
		width:50%;
		color: #333333;
		font-weight: bold;
		font-size: 30upx;
	}

	.uni-second-price {
		flex: 1;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 20upx;
	}
</style>
