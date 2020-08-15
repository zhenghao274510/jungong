<template>
	<view class="carousel">
		<swiper circular="true" duration="400" autoplay="true" interval="3000" @change="changSwiper">
			<swiper-item class="swiper-item" v-for="(v, k) in dataList" :key="k">
				<view class="image-wrapper">
					<image :src="v" class="loaded" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="swiper-num">
			{{swiperActive}}/{{imageLength}}
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
		computed:{
			imageLength(){
				return this.dataList.length
			}
		},
		data() {
			return {
				swiperActive:1
			}
		},
		methods: {
			changSwiper(e) {
				this.swiperActive = parseInt(e.detail.current) + 1;
			}
		}
	}
</script>

<style scoped lang="scss">
	.carousel {
		height: 520upx;
		position: relative;
		.swiper-num {
			position: absolute;
			right: 30upx;
			bottom: 30upx;
			background:rgba(0,0,0,1);
			opacity:0.5;
			border-radius:17upx;
			color: #FFFFFF;
			width:65upx;
			height:36upx;
			line-height: 36upx;
			text-align: center;
			font-size: 24upx;
		}
	
		swiper {
			height: 100%;
		}
	
		.image-wrapper {
			width: 100%;
			height: 100%;
		}
	
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
	
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

</style>
