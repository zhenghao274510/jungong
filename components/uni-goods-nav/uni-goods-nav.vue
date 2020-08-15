<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-box">
				<view  class="flex uni-tab__cart-button-left uni-tab__shop-cart">
				<!-- 	<view class="uni-tab__icon">
						<image class="image" :src="item.icon" mode="widthFix" />
					</view> -->
					<text class="uni-tab__text">{{ num }}</text>
				</view>
			</view>
			<view :class="{'uni-tab__right':fill}" class="uni-flex">
				<view v-for="(item,index) in buttonGroup" :key="index" :style="{color:item.color,background:item.bgColor}" class="uni-flex-item uni-tab__cart-button-right"
				 @click="buttonClick(index,item)"><text class="uni-tab__cart-button-right-text">{{ item.text }}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniGoodsNav',
		props: {
			fill: {
				type: Boolean,
				default: false
			},
			num: {
				type: [String || Number]
			}
		},
		data() {
			return {
				buttonGroup: [
					{
						text: '立即购买',
						color: '#fff',
						bgColor: '#FE5063'
					}
				]
			}
		},
		methods: {
			onClick(index, item) {
				this.$emit('click', {
					index,
					content: item
				})
			},
			buttonClick(index, item) {
				if (uni.report) {
					uni.report(item.text, item.text)
				}
				if (this.buttonShow == 1) {
					index = 1;
				}
				this.$emit('buttonClick', {
					index,
					content: item
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.uni-tab__target {
		position: absolute;
		top: 0;
		right: 0;
		background-color: #FE5063;
		width: 35upx;
		height: 35upx;
		border-radius: 50%;
		color: #FFFFFF;
		text-align: center;
		line-height: 35upx;
		font-size: 24upx;
	}

	.uni-flex {
		flex: 1;
	}

	.flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-goods-nav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		position: fixed;
		bottom: 0;
		width: 100%;
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
		z-index: 99;
	}

	.uni-tab__cart-box {
		flex: 1;
		height: 100rpx;
		background-color: #fff;
		z-index: 900;
	}

	.uni-tab__cart-sub-box {
		width: 40%;
	}

	.uni-tab__right {
		overflow: hidden;
	}

	.uni-tab__cart-button-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		position: relative;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.uni-tab__icon {
		width: 52upx;
		height: 46upx;
	}

	.image {
		width: 52upx;
		height: 46upx;
	}

	.uni-tab__text {
		margin-top: 3px;
		font-size: $uni-font-size-sm;
		color: #666;
	}

	.uni-tab__cart-button-right {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.uni-tab__cart-button-right-text {
		font-size: $uni-font-size-base;
		color: #fff;
	}

	.uni-tab__cart-button-right:active {
		opacity: 0.7;
	}

	.uni-tab__dot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		position: absolute;
		right: 12px;
		top: 4px;
		justify-content: center;
		align-items: center;
	}

	.uni-tab__dot {
		padding: 0 4px;
		line-height: 15px;
		color: #ffffff;
		text-align: center;
		font-size: 12px;
		background-color: #ff0000;
		border-radius: 15px;
	}

	.uni-tab__dots {
		padding: 0 4px;
		border-radius: 15px;
	}

	.uni-tab__color-y {
		background-color: #ffa200;
	}

	.uni-tab__color-r {
		background-color: #ff0000;
	}
</style>
