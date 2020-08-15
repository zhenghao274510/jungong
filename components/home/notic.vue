<template>
	<view class="tui-rolling-news list-item">
		<view class="notice-text uni-flex d-items-center">
			<image src="/static/img/gonggao.png" class="gong-img"></image>
			公告
		</view>
		<swiper :vertical="true" :autoplay="true" :circular="true" :interval="4000" class="tui-swiper">
			<swiper-item v-for="(item, index) in dataList" :key="index" class="tui-swiper-item" @click="detail(item)">
				<view class="tui-news-item">{{ item.title }}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import tuiIcon from '@/components/uni-icons/uni-icons';
	export default {
		components:{
			tuiIcon
		},
		props: {
			dataList: {
				type: Array
			},
			type:[String,Number]
		},
		methods: {
			detail(e) {
				if(this.type==0){
					this.$api.navTo(`/pages/mineoptions/webView?title=${e.title}&url=${e.url}`)
				}
				
			}
		}
	}
</script>

<style scoped>
	.gong-img{
		width: 35upx;
		height: 30upx;
		margin-right: 10upx;
	}
	.notice-text {
		height: 38upx;
		font-size:28upx;
		text-align: center;
		font-size: 20upx;
	}

	.tui-rolling-news {
		margin: 10upx auto;
		padding:10rpx 20upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
		border-radius: 11upx;
	}

	.tui-rolling-news::after {
		left: 0;
	}

	.tui-swiper {
		margin-left: 8rpx;
		font-size: 28rpx;
		height: 40px;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-news-item {
		line-height: 20px;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
