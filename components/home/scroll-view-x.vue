<template>
	<view class="content">
		<view class="second-title uni-flex uni-space">
			<view class="top-title">
				{{text}}
			</view>
			<view class="top-more uni-flex d-items-center" @click.stop="toMore">
				查看更多 <image src="/static/img/more.png" class="more-img"></image>
			</view>
		</view>
		<scroll-view scroll-x="true" class="scroll-x">
			<view class="item-wrapper" :style="{width:parentsWidth}">
				<view class="item" v-for="(v,k) in list" :key="k" @click.top="detail(v.id)">
					<view class="icon">
						<image lazy-load :src="v.image" class="img" />
					</view>
					<view class="tip-content">
						<view class="tip uni-ellipsis">{{v.name}}</view>
						<view class="uni-flex d-items-center">
							<view class="tip-price">￥{{v.price}}</view>
							<view class="tip-line">
								￥{{v.linePrice}}
							</view>
						</view>
						<view class="uni-flex zh_bottom" hover-class="btn-hover">
							<image src="/static/img/jia.png" class="icon-cart" @click.stop="subCart(v)"></image>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String
			},
			list: {
				type: Array,
				default: []
			},
			uid:{
				type: String
			}
		},
		computed: {
			parentsWidth() {
				if (this.list.length != 0) {
					let len = this.list.length;
					if (len <= 2) {
						return '100%'
					} else {
						return len * 300 + 'rpx'
					}
				}
			}
		},
		methods: {
			detail(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}`)
			},
			toMore() {
				this.$api.navTo(`/pages/productList?type=0&name=特价专区`)
			},
			subCart(e) {
				if(e.spec==0){
					let parmas = {
						mid: this.uid,
						gid: e.id,
						count: 1
					};
					this.$api.addCart(parmas,res=>{
						res.result == 0 ? (this.$api.tip('加入购物车成功!'),this.$api.getUserCartNum({mid:this.uid})) : this.$api.tip(res
							.resultNote);
					})
				}else{
					this.$api.navTo(`/pages/goodDetails/gooddetails?id=${e.id}`);
				}
					
			}
		}
	};
</script>

<style scoped>
	.more-img{
		width: 33upx;
		height: 33upx;
		margin-left: 20upx;
	}
	.content {
		background: #FFFFFF;
		margin-top: 15upx;
		padding: 40upx 0;
	}

	.tip-content {
		/* background-color: #F6F6F6; */
		padding: 20upx;
		position: relative;
	}

	.tip-scale {
		font-size: 20upx;
		color: #FE3947;
	}

	.second-title {
		padding: 20upx;
		background: #FFFFFF;
		position: relative;
		justify-content: space-between;
	}

	.tip-line {
		text-decoration: line-through;
		font-size: 24upx;
		color: #999999;
		margin-left: 20upx;
	}

	.zh_bottom {
		position: absolute;
		right: 20upx;
		top: 50%;
	}

	.img-viop {
		height: 198upx;
		width: 100%;
	}

	.tip-price {
		font-size: 26upx;
	}
	.item-wrapper{
		display: flex;
	}

	.icon-cart {
		width: 44upx;
		height: 44upx;
	}

	.cp-scoll-tit {
		font-size: 36upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		padding: 30upx;
	}

	.scroll-x {
		height: 300upx;
		padding: 20upx;
	}

	.scroll-x .item {
		width: 260upx;
		/* background: #F6F6F6; */
		margin-right: 30upx;
		overflow: hidden;
		position: relative;
	}

	.icon {
		width: 100%;
		position: relative;
	}

	.icon .img {
		width: 100%;
		height: 150upx;
	}

	.tip {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}
</style>
