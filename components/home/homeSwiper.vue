<template>
	<view class="swiper-content">
		<view class="top-message uni-flex d-items-center d-between">
			<view class="uni-flex d-items-center">
				<image src="/static/img/home-address.png" class="address-img"></image>
				<view class="top-city">
					郑州市
				</view>
			</view>
			<view class="uni-flex-item">
				<uni-search-bar style="width: 100%;"  @confirm='onConfirm' @focus="onFocus" @blur="onBlur" bgColor="#006700"
				 fontColor="#fff"></uni-search-bar>
			</view>
			<view class="mess-icon-con animated" @click="toMessage" hover-class="zoomIn">
				<image src="/static/img/homemessage.png" class="mess-icon" v-if="noMessage"></image>
				<image src="/static/img/message.png" class="mess-icon" v-else></image>
			</view>
		</view>
		<view class="search-wrapper">
			<view class="swiper-wrapper">
				<swiper class="swiper" circular="true" autoplay="true" duration="500">
					<swiper-item class="swiper-item" v-for="(item,index) of dataList" :key="index" @tap="gotoDetails(item)">
						<img :src="item.image" />
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	export default {
		components: {
			uniSearchBar
		},
		props: {
			dataList: {
				type: Array,
				default () {
					return []
				}
			},
			noMessage: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {}
		},
		methods: {
			gotoDetails(v) {
				console.log(v)
				this.$parent.towebView(v);
			},
			toMessage() {
				this.$parent.toMessageInfo();
			}
		}
	}
</script>

<style scoped lang="scss">
	.top-city {
		color: #FFFFFF;
	}

	.address-img {
		width: 30upx;
		height: 35upx;
		margin-right: 20upx;
	}

	.swiper-content {
		position: relative;
		// z-index: 99999;
	}

	.top-message {
		padding: 10upx 20upx;

		// z-index: 9999;
		.mess-icon-con {
			width: 68upx;
			height: 74upx;
			display: flex;
			justify-content: center;
			align-items: center;

			.mess-icon {
				width: 43upx;
				height: 43upx;
			}
		}
	}

	.uni-icon-location-filled {
		color: #FFFFFF;
		font-size: 28upx;
	}

	.img {
		width: 50upx;
		height: 50upx;
	}

	.swiper {
		width: 100%;
		height: 300upx;
	}

	.swiper-item {
		width: 100%;
		display: block;
	}

	.swiper-item img {
		width: 94%;
		margin: 0 auto;
		display: block;
		height: 300upx;
	}
</style>
