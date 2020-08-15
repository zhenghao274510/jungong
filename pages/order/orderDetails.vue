<template>
	<view class="order-details-con">
		<!-- 退款中 -->
		<!-- <view class="uni-flex uni-flex-item uni-align-center" v-if="dataobject.state == 5" style="background: #FFEFEE;justify-content: center;height: 60px;">
			<image src="/static/img/home/tuikuanzhong.png" mode="" class="topstateImg"></image>
			<text style="color: #FF0817;">退款中</text>
		</view> -->
		<view class="pad-con">
			<view class="orderState">
				<!-- 1 待付款 2 待发货	3 待收货	4 待评价	5 已完成	6 已取消 7 退款待审核 8 已退款 9拒绝退款 -->
				<image src="/static/order/yiwancheng.png" mode="" class="topstateImg" v-if="dataobject.orderStatus==5"></image>
				<image src="/static/order/quxiao.png" mode="" class="topstateImg" v-if="dataobject.orderStatus==6"></image>
				<image src="/static/img/daishouhuo.png" mode="" class="topstateImg" v-if="dataobject.orderStatus!=5&&dataobject.orderStatus!=6"></image>
				<text v-if="dataobject.orderStatus == 1">待付款</text>
				<text v-if="dataobject.orderStatus == 2">正在出库</text>
				<text v-if="dataobject.orderStatus == 3">待收货</text>
				<text v-if="dataobject.orderStatus == 4">待评价</text>
				<text v-if="dataobject.orderStatus == 5">已完成</text>
				<text v-if="dataobject.orderStatus == 6">订单已取消</text>
				<text v-if="dataobject.orderStatus == 7">退款待审核</text>
				<text v-if="dataobject.orderStatus == 8">已退款</text>
				<text v-if="dataobject.orderStatus == 9">拒绝退款</text>
			</view>
			<view style="text-align: center;" v-if="dataobject.orderStatus ==1">
				需支付: <text style="color:#FF0817;">￥{{dataobject.realAmount}}</text><text style="margin-left: 10upx;">剩余:{{endTime}}</text>
			</view>
			<view class="uni-flex uni-align-center" style="justify-content: center;margin-top: 5px;" v-if="dataobject.orderStatus ==1">
				<view class="order-bottom-two order-btn pay" @click="payOrder">去支付</view>
			</view>
		</view>
		<!-- 地址 -->
		<view class="address-section pad-con">
			<view class="order-content">
				<view class="cen">
					<view class="top">
						<text class="name">{{ dataobject.name }}</text>
						<text class="name">{{ dataobject.phone }}</text>
					</view>
					<text class="address">{{ dataobject.location }}</text>
				</view>
			</view>
		</view>
		<!-- 地址 -->
		
		<view class="yt-list pad-con" v-if="dataobject.orderStatus == 7||dataobject.orderStatus == 8||dataobject.orderStatus == 9">
			<view class="yt-list-cell b-b" style="padding: 0 20upx;">
				<text class="clamp goodTitle">退单原因:{{dataobject.refundReason}}</text>
				<text class="cell-tip red"></text>
			</view>
			<view class="uni-flex" style="padding:20upx;">
				<image :src="v" mode="" class="refundReasonImg" v-for="(v,k) in dataobject.refundImage" :key="k"></image>
			</view>
		</view>
		
		
		<view class="goods-section pad-con">
			<view class="yt-list">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp goodTitle">商品信息</text>
					<text class="cell-tip red"></text>
				</view>
			</view>
			
			<!-- 商品列表 -->
			<view class="g-item" v-for="(v, k) in dataobject.orderGoodsList" :key="k">
				<image :src="v.goodsImage"></image>
				<view class="right">
					<view class="title clamp">{{v.goodsName }}</view>
					<view>
						<text class="spec">{{v.goodsSpecName}}</text>
					</view>
					<view class="uni-flex d-items-center">
						<view class="price uni-flex-item"> <text style="color: #FF0000;">￥</text>{{v.amount}}</view>
						<text class="num">× {{v.count}}</text>
					</view>

				</view>
			</view>
		</view>
		<view class="yt-list pad-con">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip"> <text class="cell-price-smle">￥</text>  <text class="cell-price">{{goodsAmount}}</text> </text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.carriage!=0">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip cell-bold">￥{{dataobject.carriage}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">共计</text>
				<text class="cell-tip cell-bold">￥{{dataobject.realAmount}}</text>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list pad-top-bot">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp goodTitle">订单信息</text>
				<text class="cell-tip red"></text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单编号</text>
				<text class="cell-tip red">{{dataobject.num }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">下单时间</text>
				<text class="cell-tip">{{ dataobject.placeDate }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单状况</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==1">待付款</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==2">待发货</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==3">待收货</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==4">待评价</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==5">已完成</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==6">订单已取消</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==7">退款待审核</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==8">已退款</text>
				<text class="cell-tip" v-if="dataobject.orderStatus ==9">拒绝退款</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">支付方式</text>
				<text class="cell-tip" style="color:#4CBC37;">微信</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">备注</text>
				<text class="cell-tip" v-if="dataobject.refundAuditRemarks!=''">{{dataobject.refundAuditRemarks}}</text>
				<text class="cell-tip" v-else>-</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.payDate!=''">
				<text class="cell-tit clamp">付款时间</text>
				<text class="cell-tip">{{dataobject.payDate}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.deliverDate!=''">
				<text class="cell-tit clamp">发货时间</text>
				<text class="cell-tip">{{dataobject.deliverDate}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.receiveDate!=''">
				<text class="cell-tit clamp">收货时间</text>
				<text class="cell-tip">{{dataobject.receiveDate}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.commentDate!=''">
				<text class="cell-tit clamp">评价时间</text>
				<text class="cell-tip">{{dataobject.commentDate}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="dataobject.cancelReason!=''">
				<text class="cell-tit clamp">订单取消原因</text>
				<text class="cell-tip">{{dataobject.cancelReason}}</text>
			</view>
		</view>
		<!-- 1 待付款 2 待发货	3 待收货	4 待评价	5 已完成	6 已取消 7 退款待审核 8 已退款 9拒绝退款 -->
		<view class="tellContent" @click="tellPhone">
			<image src="/static/img/kefurexian.png" mode="" class="tellimg"></image>
			联系客服
		</view>

		<view class="order-bottom uni-flex d-between">
			<view class="" style="width:10%;">
			</view>
			<view class="uni-flex d-items-center">
				<view class="order-bottom-two order-btn pay" hover-class="btn-hover" @click="finishOrder('收货')" v-if="dataobject.orderStatus ==3">确认收货</view>
				<view class="order-bottom-two order-btn cancle" hover-class="btn-hover" @click="getXOrder(0)" v-if="dataobject.orderStatus ==4||dataobject.orderStatus ==5">申请退款</view>
				<view class="order-bottom-two green order-btn" hover-class="btn-hover" @click="getXOrder(1)" v-if="dataobject.orderStatus == 4">去评价</view>
				<view class="order-bottom-two cancle order-btn" hover-class="btn-hover" @click="finishOrder('取消')" v-if="dataobject.orderStatus ==1">取消订单</view>
				<view class="order-bottom-two pay order-btn" hover-class="btn-hover" @click="payOrder" v-if="dataobject.orderStatus == 1">去支付</view>
				<view class="order-bottom-two pay order-btn" hover-class="btn-hover" @click="cancelRefund" v-if="dataobject.orderStatus ==7">取消退款</view>
				<view class="order-bottom-two cancle order-btn" hover-class="btn-hover" @click="finishOrder('删除')" v-if="dataobject.orderStatus == 4||dataobject.orderStatus == 6||dataobject.orderStatus ==5">删除订单</view>
			</view>
		</view>
		<refund-list ref="refundList" @click="btnCancle"></refund-list>
		<cancel-success ref="cancelSuccess"></cancel-success>
	</view>
</template>

<script>
	import refundList from "@/components/mycom/poupone.vue"
	import cancelSuccess from "@/components/mycom/cansleSuccess.vue"
	export default {
		components: {
			refundList,
			cancelSuccess
		},
		data() {
			return {
				uid: '',
				orderId: '',
				showTip: false,
				endTime: 0,
				dataobject: {
					id: "", //订单id
					num: "", //订单编号
					shopId: "", // 店铺id
					shopName: "", // 店铺id
					shopPhone: "", // 店铺电话
					name: "", //收货人
					phone: "", //收货人电话
					location: "", //地址
					orderStatus: 1, //订单状态，如下所示
					goodsAmount: 1, //商品总价
					carriage: 1, //运费
					amount: 1, //总价
					userPointsDeduction: 1, //积分抵扣金额
					realAmount: 1, //实际支付价格
					deliverNum: "", //快递单号
					payChannel: 1, //支付渠道，1.微信，2.微信/积分
					placeDate: "1", //下单时间
					payDate: "1", //支付时间
					deliverDate: "1", //发货时间
					receiveDate: "1", //收货时间
					commentDate: "1", //评价时间
					refundApplyDate: "1", //退款申请时间
					refundAuditDate: "1", //退款审核时间
					refundIntoDate: "1", //退款到账时间
					cancelDate: "1", //取消时间
					cancelReason: "1", //取消原因
					refundReason: "1", //退款原因
					refundAmount: "1", //退款金额
					refundImage: [], //退款图片
					refundAuditRemarks: "1", //退款审核备注
					orderGoodsList: [ //订单商品列表
						{
							id: "", //商品id
							name: "", //商品名称
							image: "", //商品图片
							goodsSpecName: "", //商品规格名称，没有规格返空字符串
							count: "", //数量
							price: "", //价格
							amount: "", //总价
							comment: "1" //是否已评价1是，0否
						}
					]
				}
			}
		},
		watch: {
			dataobject: {
				handler(n) {
					if (n.orderStatus == 1) {
						console.log()
						this.endTime = this.$api.formatTime(24 * 60 * 60 * 1000 - (new Date().getTime() - new Date(n.placeDate).getTime()))
					} else {
						this.endTime = 0
					}
				},
				deep: true
			}
		},
		onLoad(options) {
			this.orderId = options.id;
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid');
			}
			this.loadData();
		},
		computed: {
			goodsAmount() {
				return this.$api.parsePrice(this.dataobject.realAmount - this.dataobject.carriage)
			}
		},
		methods: {
			cancelRefund() {
				uni.showLoading({
					title: '请稍后'
				})
				let parmas = {
					mid: this.uid,
					oid: this.orderId
				}
				this._reqw.ipost(parmas, "cancelRefund").then(res => {
					res.result == 0 ? (this.$api.tip('取消成功!'), this.$api.back(), uni.hideLoading()) :
						this.$api.tip(res.reultNote)
				}).catch(err => {})
			},
			btnCancle(e) {
				let parmas = {
					mid: this.uid,
					oid: this.orderId,
					cancelReason: e
				}
				this._reqw
					.ipost(parmas, 'cancelOrder')
					.then(res => {
						console.log(res)
						res.result == 0 ? (this.$refs.cancelSuccess.showPicker(), this.$refs.refundList.hidePicker(), this.loadData()) :
							this.$api.tip(res
								.resultNote);
					})
					.catch(err => {});
			},
			confirmDel() {
				this.getData("orderconfirm", '收货');
			},
			tellPhone() {
				this.$api.callPhone(this.dataobject.shopPhone)
			},
			loadData() {
				let parmas = {
					mid: this.uid,
					oid: this.orderId
				}
				this._reqw
					.ipost(parmas, 'orderDetail')
					.then(res => {
						console.log(res)
						res.result == 0 ? this.dataobject = res : this.$api.tip(res
							.resultNote);
					})
					.catch(err => {});
			},
			// 查看物流  评价
			getXOrder(n) {
				let url = '';
				n == 0 ? url =
					`/pages/order/subSouHuo?id=${this.orderId}` :
					url = `/pages/order/addEva?id=${this.orderId}`;
				this.$api.navTo(url);
			},
			finishOrder(type) {
				if (type == '删除') {
		
					this.getData("deleteOrder", '删除')
				} else if (type == "收货") {
					this.getData("confirmOrder", '收货')
				} else if (type == '取消') {
					console.log(111)
					this.$refs.refundList.showPicker();
				}

			},
			getData(url, type) {
				let parmas = {
					mid: this.uid,
					oid: this.orderId
				};
				this._reqw
					.ipost(parmas, url)
					.then(res => {
						res.result == 0 ? (this.$api.tip(`${type}成功`), this.$api.back()) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			payOrder() {
				let parmas = {
					mid: this.uid,
					oid: this.orderId
				};
				this._reqw
					.ipost(parmas, "payOrder")
					.then(res => {
						res.result == 0 ? (this.$api.onBridgeReady(res)) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.num{
		font-size: 30upx;
		color: #666666;
	}
	.cell-bold{
		font-weight: bold;
	}
	.cell-price-smle{
		font-size:30upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.cell-price{
		font-size:40upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.refundReasonImg{
		width:175upx;
		height:175upx;
		border-radius:10upx;
	}
	.green {
		background-color: #4CBC37;
	}

	.tellContent {
		width: 706upx;
		height: 88upx;
		margin: 30upx auto;
		background: #4CBC37;
		color: #FFFFFF;
		box-shadow:0px 5upx 15upx 0px rgba(224,152,76,0.2);
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cell-tit {
		position: relative;
		margin-left:30rpx;
	}

	.uni-list-cell {
		padding: 30upx;
	}

	.juan-bg {
		width: 136upx;
		height: 40upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.goodTitle {
		padding-left: 30upx;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			width: 6upx;
			height: 27upx;
			background:#4CBC37;
			border-radius: 3upx;
		}
	}

	.pad-top-bot {
		padding: 30upx 0;
		margin: 30upx 0 100upx;
		width: 95%;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.cell-tit {
			// width: 25%;
		}

		.cell-tip {
			text-align: left !important;
		}
	}

	.pad-con {
		padding: 30upx 0;
		margin-top:20upx;
		width: 95%;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.tellimg {
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}

	.order-details-con {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// background: #FFFFFF;
	}

	.topstateImg {
		width: 45upx;
		height: 45upx;
		margin-right: 20upx;
	}
	.seeWuLiu {
		background: rgba(9, 187, 7, 1);
	}

	.orderState {
		height: 110upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		color: #333333;
		// background: #FFFFFF;
		font-size: 32upx;
	}

	.bg-img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 320upx;
	}

	.order-bottom {
		margin-top: 20upx;
		height: 100upx;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.order-bottom-orice {
		color: #333333;
		font-size: 13px;
		margin-left: 5px;
	}

	.order-bottom-one {
		color: #999999;
		border: 1px solid #999999;
		border-radius: 32upx;
		padding: 10upx 20upx;
		font-size: 13px;
	}

	.order-bottom-canle {
		background: #DBDBDB;
		color: #FFFFFF;
	}

	.order-btn {
		font-size: 26upx;
		border-radius: 10upx;
		padding: 6upx 30upx;
	}

	.pay {
		background:#4CBC37;
	}

	.cancle {
		background: #A7A7A7;
	}

	.order-bottom-two {
		color: #FFFFFF;
		// background: #4CC5F3;
		margin-left: 15px;
	}

	.address-section {
		padding: 20upx;
		// background: #fff;
		position: relative;
		border-bottom: 1px solid #EEEEEE;

		.order-content {
			display: flex;
			align-items: center;
			position: relative;
			padding: 30upx 0;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			margin-left: 20upx;
		}

		.name {
			margin-right: 24upx;
			color: #666666;
			font-weight: Bold;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: #666666;
			font-size: 24upx;
		}
	}

	.goods-section {
		// background: #fff;
		border-bottom: 1px solid #EEEEEE;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.g-item {
			display: flex;
			margin: 0 30upx;
			padding: 10px 0;

			image {
				flex-shrink: 0;
				display: block;
				width: 180upx;
				height: 180upx;
				border-radius: 10upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size:36upx;
				font-weight:bold;
				color:rgba(51,51,51,1);
			}

			.spec {
				font-size: 22upx;
				color: #666666;
				line-height: 40upx;
				background-color: #edecf1;
			}

			.price {
				font-size: 38upx;
				// padding-top: 10upx;
				// margin-bottom: 4upx;
				color: #fe2c2c;
			}
		}
	}

	.yt-list {
		// margin-top: 16upx;
		// background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 20upx 20upx 20upx 0;
		line-height: 70upx;
		position: relative;
		&:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}
		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			font-size:30upx;
			margin-right:50upx;
		}

		.cell-tip {
			flex: 1;
			text-align: right;
		}


		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}


	}
</style>
