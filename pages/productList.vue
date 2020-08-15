<template>
	<view class="content">
		<product-list :type="3"  :dataList="dataList" :uid='uid'></product-list>
		<empty v-if="showempty"></empty>
		<uni-load-more :status="status" v-if="showloading"></uni-load-more>
	</view>
</template>

<script>
	import empty from "@/components/xw-empty/xw-empty.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import productList from "@/components/mycom/productList.vue"
	export default {
		data() {
			return {
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading',
				type: '',
				sid:'',  // 生活馆 id
				uid:'',  //  用户id
				name:'', //   关键字  搜索
				showempty:false,
				showloading:true
			};
		},
		components: {
			uniLoadMore,
			empty,
			productList
		},
		onLoad(options) {
			this.type = options.type;
			this.name=options.name;
			this.$api.setNav(options.name);
			if(uni.getStorageSync('sid')){
				this.sid=uni.getStorageSync('sid')
			}
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid');
			}
			this.loadData();
		},
		methods: {
			loadData() {
				let parmas = {
					mid: this.uid,
					sid: this.sid,
					pageNo: this.page,
					pageSize: '10'
				};
				// 0 特价  1  推荐 2  搜索
				this.type==0?parmas.special=1:parmas.recommend=1;
				console.log(parmas);
				this._reqw
					.ipost(parmas,'goodsPage')
					.then(res => {
						res.result == 0 ?
							((res.dataList.length!=0 ? (res.dataList.forEach(item => {
										this.dataList.push(item)
									}, (res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage)) :
									(this.showempty = true, this.showloading = false))

							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		},
		//  加载
		onReachBottom() {
			this.totalPage > this.page ?
				((this.page += 1), this.status = 'loading', this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		}
	};
</script>

<style lang="scss" scoped>
	.splce {
		height: 50px;
	}

	.iconColor {
		color: #6BD453 !important;
	}

	view {
		line-height: 0.7;
	}

	.content {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	.img {
		height: 348upx;
	}

	.iconfont {
		// margin-right: 10px;
		color: #ccc;
		font-size: 10px !important;
	}

	.top-nav {
		position: fixed;
		left: 0;
		right: 0;
		height: 50px;
		background: #ffffff;
		display: flex;
		align-items: center;
	}

	.top-nav-item {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-nav-item-title {
		text-align: center;
	}

	.top-nav-item-icon {
		// width: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.uni-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	// 列表

	.goods-list {
		padding-top: 60px;

		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 95%;
			padding: 0 2.5% 2.5vw 2.5%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48.75%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
		}
	}
</style>
