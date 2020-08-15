<template>
	<view class="swiper-content">
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
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {}
		},
		methods: {
			gotoDetails(v) {
				console.log(v)
				let url=""
				if(v.carouselType==1){
					url=`/pages/mineoptions/webView?url=${v.url}`;
				}else if(v.carouselType==4){
					url=`/pages/goodDetails/gooddetails?id=${v.goodsId}`;
				}else if(v.carouselType==3){
					url=`/pages/oneclass?id=${v.goodsCategoryId}`;
				}
                this.$api.navTo(url)
			}
		}
	}
</script>

<style scoped>
	.swiper-content {
		position: relative;
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
		width:100%;
		display: block;
	}

	.swiper-item img {
		width: 94%;
		margin: 0 auto;
		display: block;
		height: 300upx;
	}
</style>
