<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
			 @click="tabClick(index)">
				{{item.name}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataMore">
					<!-- 订单列表 -->
					<block v-for="(item,index) in tabItem.dataList" :key="index">
						<view class="order-item bottom-border" @click.stop="gotoDetails(item)">
							<view class="uni-flex pad">
								<view class="uni-flex-item order-ordernum">
									订单号:{{item.num}}
								</view>
								<view class="order-status-right uni-flex d-items-center">
									<!-- 1 待付款 2 待发货	3 待收货	4 待评价	5 已完成	6 已取消 7 退款待审核 8 已退款 9拒绝退款 -->
									<view class="order-status-right-one" v-if="item.orderStatus==1">
										待付款 | <image src="/static/order/daifukuan.png" class="typeImg"></image>
									</view>
									<view class="order-status-right-one" v-if="item.orderStatus==2">
										正在出库 | <image src="/static/order/outku.png" class="typeImg"></image>
									</view>
									<view class="order-status-right-one" v-if="item.orderStatus==3">
										待收货 | <image src="/static/order/daishouhuo.png" class="typeImg"></image>
									</view>
									<view class="order-status-right-one" v-if="item.orderStatus==4">
										待评价 | <image src="/static/order/daipingjia.png" class="typeImg"></image>
									</view>
									<view class="order-status-right-one" v-if="item.orderStatus==5">
										已完成 | <image src="/static/order/wancheng.png" class="typeImg"></image>
									</view>
									<view class="order-status-right-one" v-if="item.orderStatus==6">
										已取消 | <image src="/static/order/quxiao.png" class="typeImg"></image>
									</view>
									<view class="order-status-right-one" v-if="item.orderStatus==7">
										退款待审核 | <image src="/static/order/tuikuan.png" class="typeImg"></image>
									</view>
									<view class="order-status-right-one" v-if="item.orderStatus==8">
										已退款 | <image src="/static/order/tuikuan.png" class="typeImg"></image>
									</view>
									<view class="order-status-right-one" v-if="item.orderStatus==9">
										拒绝退款 | <image src="/static/order/tuikuan.png" class="typeImg"></image>
									</view>
									

								</view>
							</view>
							<!-- <block v-for="(v,k) in item.ordertailList" :key="k"> -->
							<view class="uni-flex pad">
								<view class="order-img-con">
									<image class="goods-img" :src="item.goodsImage"></image>
								</view>
								<view class="uni-flex-item" style="margin-left: 10px;">
									<view class="uni-flex d-between title uni-ellipsis">
										{{item.goodsName}}
									</view>
									<view class="uni-flex d-between">
										<view class="skuname">
											{{item.goodsSpecName}}
										</view>
										<view style="font-size: 24rpx;">× {{item.count}}</view>
									</view>
									<view class="price-box uni-flex d-between">
										<text class="order-status-right-price">￥{{item.realAmount}}</text>

									</view>
								</view>
							</view>
							<!-- </block> -->
							<!-- 1 待付款 2 待发货	3 待收货	4 待评价	5 已完成	6 已取消 7 退款待审核 8 已退款 9拒绝退款 -->
							<view class="uni-flex d-between d-items-center">
								<view class="">
								</view>
								<view class=" uni-flex d-between d-items-center" style="padding: 30upx 0;">
									<view class="uni-badge-green pay" v-if="item.orderStatus==1" @click.stop="payOrder(item.id)">去支付</view>
									<view class="uni-badge-green" v-if="item.orderStatus==4" @click.stop="evaOrder(item.id)">评价晒单</view>
									<view class="uni-badge-green" v-if="item.orderStatus==3" @click.stop="finishedOrder(item.id,index)">确认收货</view>
									<view v-if="item.orderStatus==3" class="uni-badge-green" @click.stop="wuLiuorder(item.id)">查看物流</view>
									<view v-if="item.orderStatus==4||item.orderStatus==5||item.orderStatus==6" class="uni-badge-green" @click.stop="deleteOrder(item.id,index)">删除订单</view>
								</view>
							</view>
						</view>
					</block>
					<!-- 结束 -->
					<uni-load-more :status="tabItem.loadingType" v-if="tabItem.dataList.length!=0"></uni-load-more>
					<empty v-else></empty>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/xw-empty/xw-empty.vue";
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				totalPage: 1,
				page: 1,
				uid: '',
				navList: [{
						name: '全部',
						dataList: [],
						loadingType: "loading",
						load: false,
						type: ''
					},
					{
						name: '待付款',
						dataList: [],
						loadingType: "loading",
						type: 1,
						load: false
					},
					{
						name: '待发货',
						dataList: [],
						loadingType: "loading",
						type: 2,
						load: false
					},
					{
						name: '待收货',
						dataList: [],
						loadingType: "loading",
						type: 3,
						load: false
					},
					{
						name: '待评价',
						dataList: [],
						loadingType: "loading",
						type: 4,
						load: false
					},
					{
						name: '已完成',
						dataList: [],
						loadingType: "loading",
						type: 5,
						load: false
					}
				],
			};
		},
		onLoad(options) {
			this.tabCurrentIndex = options.id;
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid')
			}
		},
		onShow() {
			this.loadData();
		},
		methods: {
			initData() {
				let data = this.navList[0];
				data.page = data.totalPage = 1;
				data.dataList = [];
				this.loadData();
			},
			loadData() {
				let n = this.tabCurrentIndex,
					data = this.navList[n];
				let parmas = {
					mid: this.uid,
					status: data.type,
					pageNo: this.page,
					pageSize: '10'
				};
				if (!data.load) {
					console.log(parmas)
					data.load = true;
					this._reqw.ipost(parmas, 'orderPage').then(res => {
						res.result == 0 ? ((res.totalPage > 1 ? data.loadingType = 'more' : data.loadingType = "noMore"), data.load =
							false, this.totalPage = res.totalPage, res.dataList
							.forEach(item => {
								data.dataList.push(item)
							})) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}
			},
			loadDataMore() {
				console.log('加载')
				let num = this.tabCurrentIndex;
				this.totalPage > this.page ? (this.page += 1, this.navList[num].loadingType = 'loading', this.loadData()) :
					setTimeout(() => {
						this.navList[num].loadingType = "noMore"
					}, 1000)
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				let n = e.target.current,
					data = this.navList[n];
				data.dataList = [];
				data.loadingType = 'loading';
				this.page = this.totalPage = 1;
				this.initData()
			},
			//顶部tab点击
			tabClick(k) {
				console.log(k)
				this.tabCurrentIndex =k;
			},
			evaOrder(id) {
				this.$api.navTo(`/pages/order/addEva?id=${id}`)
			},
			//  确认收货
			finishedOrder(id, k) {
				let n = this.tabCurrentIndex,
					data = this.navList[n];
				console.log(n, data)
				let parmas = {
					mid: this.uid,
					oid: id
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas,'confirmOrder')
					.then(res => {
						res.result == 0 ? (this.$api.tip('收货成功'), n == 0 ? this.initData() : data.dataList.splice(k, 1)) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			gotoDetails(e) {
				this.$api.navTo(`/pages/order/orderDetails?id=${e.id}`)
			},
			payOrder(id) {
			 let parmas = {
			 	mid:this.uid,
			 	oid:id
			 };
			 console.log(parmas,);
			 this._reqw
			 	.ipost(parmas,'payOrder')
			 	.then(res => {
			 		res.result == 0 ?this.$api.onBridgeReady(res,'order'):
			 			this.$api.tip(res.resultNote);
			 	})
			 	.catch(err => {});
			},
			wuLiuorder(id){
				this.$api.navTo(`/pages/order/wuliu?id=${id}`)
			},
			//  删除订单
			deleteOrder(id, k) {
				let n = this.tabCurrentIndex,
					data = this.navList[n],
					self = this;
				uni.showModal({
					cancelText: "取消",
					confirmText: "确定",
					content: "确定删除吗",
					success(res) {
						if (res.confirm) {
							let parmas = {
								mid:self.uid,
								oid: id
							};
							console.log(parmas);
							self._reqw
								.ipost(parmas,'deleteOrder')
								.then(res => {
									res.result == 0 ? (self.$api.tip('删除成功'), n == 0 ? self.initData() : data.dataList.slice(k, 1)) :
										self.$api.tip(res.resultNote);
								})
								.catch(err => {});
						}
					}
				})
			}
		},
		onHide() {
			let n = this.tabCurrentIndex,
				data = this.navList[n];
			data.page = data.totalPage = 1;
			data.dataList = [];
			data.load = false;
		}
	}
</script>

<style lang="scss">
	.pad {
		padding: 20upx 0;
	}

	.typeImg {
		width: 32upx;
		height: 32upx;
		margin-left: 10upx;
	}

	.order-ordernum {
		font-size: 24upx;
		color: rgba(51, 51, 51, 1);
	}

	.pay {
		background-color:#2BD241;
	}

	.uni-badge-green {
		width: 160upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 26upx;
		border-radius: 5px;
		margin: 0 5px;
	}

	.del-icon {
		justify-content: center;
	}

	.icon-delete {
		font-size: 32upx;
		color: #999999;
	}

	.skuname {
		font-size: 24upx;
		font-size: #999999;
	}

	page,
	.content {
		height: 100%;
	}

	.order-status-right-price {
		color: #FE2C2C;
		font-size: 26upx;
	}

	.order-status-right {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.order-status-right-one {
			font-size: 24upx;
			color: rgba(51, 51, 51, 1);
			width: 100%;
			display: flex;
			align-items: center;
		}
	}


	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	// 订单列表部分
	.order-item {
		width: 94%;
		margin: 20upx auto 0;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.title {
			font-size: 34upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
	}

	.order-img-con,
	.goods-img {
		width:174upx;
		height:169upx;
	}

	//头部导航部分

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 28upx;
			color: #666666;
			position: relative;

			&.current {
				color:#2BD241;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 95upx;
					height: 0;
					border-bottom: 2upx solid #2BD241;
				}
			}
		}
	}
</style>
