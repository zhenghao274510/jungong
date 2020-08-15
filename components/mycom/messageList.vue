<template>
	<view class="content">
		<view class="uni-second-list" v-if="type==0">
			<view class="uni-second" v-for="(v,k) in dataList" :key="k" @click="details(v)">
				<view class="image-second">
					<image class="uni-second-image" src="/static/img/pingtai.png"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-flex uni-align-center">
						<text class="price">{{v.title}}</text>
					</view>
					<view class="uni-second-title uni-two-cut" v-if="v.messageType==1">系统消息,点击查看
					</view>
					<view class="uni-second-title uni-two-cut" v-if="v.messageType==2">订单有了新动态,点击查看
					</view>
					<view class="sku-name">
						{{v.adtime}}
					</view>
				</view>
			</view>
		</view>
		<view class="uni-second-list" v-if="type==1">
			<view class="uni-second" v-for="(v,k) in dataList" :key="k" @click="details(v)">
				<view class="image-second">
					<image class="uni-second-image" :src="v.avatar"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-flex uni-align-center">
						<text class="price">{{v.nickname}}</text>
					</view>
					<view class="uni-second-title uni-two-cut">{{v.content}}
					</view>
					<view class="sku-name">
						{{v.chatDate}}
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
			type: [String, Number]
		},
		methods: {
			details(e) {
				let url = '';
				if(this.type==0){
					e.messageType == 2 ? url = `/pages/order/orderDetails?id=${e.correlation}` : url =
						`/pages/mineoptions/webView?url=${e.url}`
				}else{
					url=`/pages/Previewindo/sendmessage?anoid=${e.id}&id=${e.infoid}&type=0`
				}
				
				this.$api.navTo(url)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-second-image {
		height: 86upx;
	}

	page {
		background: #F6F6F6;
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
		margin-top: 10px;
	}

	.price {
		color: #666666;
		font-size: 28upx;
		font-weight: bold;
	}

	.sku-name {
		color: $uni-color-paragraph;
		font-size: 22upx;
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10upx;
		margin-bottom: 10upx;
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
		width: 86upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-title {
		color: #999999;
		font-size: 26upx;
		background-color: #F6F6F6;
		padding: 10upx 5upx;
		margin-bottom: 10upx;
	}

	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}

	.uni-flex {
		justify-content: space-between;
		margin-bottom: 10upx;
	}
</style>
