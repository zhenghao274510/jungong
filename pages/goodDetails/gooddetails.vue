<template>
	<view class="container">
		<view class="carousel">
			<swiper circular="true" duration="400" autoplay="true" interval="3000" @change="changSwiper">
				<swiper-item class="swiper-item" v-for="(v, k) in dataobject.carousel" :key="k">
					<view class="image-wrapper">
						<image :src="v" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="swiper-num">
				{{swiperActive}}/{{imageLength}}
			</view>
			<!-- <image src="/static/img/fenxiang.png" class="share-img" @click='openShare'></image> -->
		</view>
		<view class="uni-flex d-between d-items-center">
			<view class="">

			</view>
			<view class="addcart uni-flex d-items-center" hover-class="btn-hover" @click="addCart">
				<image src="/static/img/cartlv.png" class="cart-img"></image>
			</view>
		</view>
		<view class="introduce-section">
			<view class="title">{{ dataobject.name }}</view>
			<view class="price-box desc-con">
				{{ dataobject.intro }}
			</view>
			<view class="uni-flex d-items-center">
				<view class="price-box">
					<view class="price">¥{{dataobject.price}}</view>
				</view>
				<view class="sku" style="text-decoration:line-through;">
					原价:￥{{dataobject.linePrice}}
				</view>
				<view class="sku">
					库存{{dataobject.inventory}}件
				</view>
			</view>

		</view>
		<view class="s-line"></view>

		<view class="uni-flex d-items-center uni-space c-list">
			<view class="shop-name uni-ellipsis">
				{{dataobject.shop.shopName}}
			</view>
			<view class="uni-flex d-items-center " @click="callShop">
				<image src="/static/img/kefu.png" class="diwei-img"></image>
				<view class="link-phone uni-ellipsis">
					联系客服
				</view>
			</view>
		</view>
		<view class="uni-flex d-items-center shop-address c-list" style="width:100%;">
			<image src="/static/img/dingweil.png" class="diwei-img"></image>
			<view class="link-text uni-ellipsis">
				{{dataobject.shop.location}}
			</view>
		</view>
		<view class="uni-flex d-items-center uni-space c-list" @click="toggleSpec(1)" v-if="dataobject.spec==1">
			<view class="uni-flex-tit" v-if="showObj.name==''">请选择规格</view>
			<view class="uni-flex-tit" v-else>已选择</view>
			<view class="uni-flex-item" style="display: flex;align-items: center;">
				<view class="uni-ellipsis showName" v-if="showObj.name!=''" style="color: #666666;margin-right: 20rpx;">
					{{showObj.name}}
				</view>
				<view class="uni-flex-item" v-else>

				</view>
				<view class="uni-icon uni-icon-arrowright"></view>
			</view>

		</view>
		<view class="detail-desc">
			<view class="d-header">商品详情</view>
			<rich-text :nodes="dataobject.content"></rich-text>
		</view>
		<!-- 评价 -->
		<eva-product-List :dataList="evaList" type='0' :productId="productId" :collect="dataobject.collected"></eva-product-List>
		<!-- 底部操作菜单 -->
		<view class="uni-flex bottom-btn-details">
			<view class="uni-flex d-items-center uni-flex-item sub-price">
				<text class="price-one">￥</text><text class="price-two">{{endPrice}}</text>
			</view>
			<view class="uni-flex uni-flex-item d-items-center sub-btn" hover-class="btn-hover" @click="buyGoods">
				结 算
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click.stop="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<scroll-view scroll-y="true" class="layer attr-content" @click.stop="stopPrevent">
				<view class="sku-content">
					<view class="a-t">
						<image :src="dataobject.image" class="img"></image>
						<view class="right">
							<text class="guge-price"><text style="font-size: 12px;color: #ff0000;">￥</text> <text style="font-size: 32upx;color: #ff0000;">{{ currentObj.price }}</text>
							</text>
							<text class="stock" style="color: #999999;">库存：{{ currentObj.inventory }}</text>
							<view class="selected">
								已选：
								<text class="selected-text">{{ currentObj.name }}</text>
							</view>
						</view>
						<view class="uni-icon uni-icon-close" style="color: #999999;" @click.stop="specClass ='none'"></view>
					</view>
					<view class="attr-list">
						<view class="item-list">
							<text v-for="(v, k) in dataobject.goodsSpecList" :key="k" class="tit" :class="{selected:active==k}" @click.stop="choseSku(v,k)">{{ v.name }}</text>
						</view>
					</view>
					<view class="choseNum">
						<view style="margin-bottom: 10upx;">购买数量</view>
						<uni-number-box class="step" @change="numberChange" :value="num"></uni-number-box>
					</view>
					<view class="uni-flex uni-align-center pos-btn">
						<view class="uni-flex-item two" @click.stop="choseOk">确 定</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	const bassUrl = require('@/common/js/config.js').bass;
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	import evaProductList from "@/components/mycom/eva-product-List.vue"
	export default {
		components: {
			uniNumberBox,
			evaProductList
		},
		data() {
			return {
				active: 0,
				uid: '',
				endPrice: '', //  结算价格
				swiperActive: 1,
				num: 1,
				display: false,
				productId: '',
				specClass: 'none',
				showObj: {
					id: "", //规格id
					name: "", //规格名称
					price: "", //规格价格
					inventory: "" //规格库存
				},
				currentObj: {
					id: "", //规格id
					name: "", //规格名称
					price: "", //规格价格
					inventory: "" //规格库存
				},
				dataobject: {
					content: '',
					name: "", //商品名称
					intro: "", //商品介绍
					price: "", //活动价
					linePrice: "", //划线价
					inventory: "", //库存
					image: "", //图片
					url: "", //详情链接
					carousel: [], //轮播图
					spec: "", //是否有规格 1是，0否
					goodsSpecList: [ //规格列表 规格列表为空表示
						{
							id: "", //规格id
							name: "", //规格名称
							price: "", //规格价格
							inventory: "" //规格库存
						}
					],
					shop: {
						id: "", // 店铺id
						shopName: "", // 店铺id
						shopPhone: "", // 店铺电话
						location: "", //地址
						lng: "", //店铺经度
						lat: "" //店铺纬度
					}
				},
				evaList: []
			};
		},
		onLoad(options) {
			this.productId = options.id;
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid');
			}
			if (options.inverteUid) {
				getApp().globalData.inverteUid = options.inverteUid;
			}
			this.loadData();
			this.getCommonPage();
		},
		computed: {
			imageLength() {
				return this.dataobject.carousel.length
			}
		},
		watch: {
			dataobject: {
				handler(n) {
					if (n.spec == 1) {
						this.currentObj = n.goodsSpecList[0];
					}
				},
				deep: true
			}
		},
		methods: {
			callShop() {
				this.$api.callPhone(this.dataobject.shop.shopPhone)
			},
			share() {
				if (this.$wechat.isWechat()) {
					this.$wechat.wxShare(`${bassUrl}/h5/#/pages/goodDetails/gooddetails?id=${this.productId}&inverteUid=${this.uid}`);
				}
			},
			changSwiper(e) {
				this.swiperActive = parseInt(e.detail.current) + 1;
			},
			choseOk() {
				this.showObj = this.currentObj;
				this.endPrice = this.showObj.price;
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			},
			stopPrevent() {},
			loadData() {
				let parmas = {
					mid: this.uid,
					gid: this.productId
				};
				this._reqw
					.ipost(parmas, 'goodsDetail')
					.then(res => {
						res.result == 0 ?
							(this.dataobject = res, this.endPrice = this.dataobject.price, this.share()) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			//  商品评价
			getCommonPage() {
				let parmas = {
					mid: this.uid,
					gid: this.productId,
					pageNo: 1,
					pageSize: '2'
				};
				this._reqw
					.ipost(parmas, 'goodsCommentPage')
					.then(res => {
						res.result == 0 ? this.evaList = res.dataList : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			numberChange(e) {
				this.num = e.number;
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			choseSku(v, k) {
				this.active = k;
				this.currentObj = v;
			},
			addCartGoods(parmas) {
				if (this.uid == '') {
					this.$api.getCode(getApp().globalData.inverteUid);
				} else {
					this._reqw.ipost(parmas, 'addCart').then(res => {
						res.result == 0 ? (this.$api.tip('加入购物车成功！'), this.specClass = "none", this.showObj = this.currentObj) : this.$api
							.tip(res.resultNote)
					}).catch(err => {})
				}

			},
			addCart() {
				if (this.uid == '') {
					this.$api.getCode(getApp().globalData.inverteUid);
				} else {
					let parmas = {
						mid: this.uid,
						gid: this.productId
					};
					if (this.dataobject.spec == 1) {
						if (this.showObj.id == '') {
							this.$api.tip('请选择规格')
						} else {
							parmas.specid = this.showObj.id;
							this.addCartGoods(parmas);
						}
					} else {
						this.addCartGoods(parmas);
					}
				}

			},
			creatOrder() {
				let arry = [{
					shopName: this.dataobject.shop.shopName,
					id: this.dataobject.shop.id,
					cartList: [{
						goodsId: this.productId,
						goodsImage: this.dataobject.image,
						goodsSpecId: this.showObj.id,
						goodsSpecName: this.showObj.name,
						goodsName: this.dataobject.name,
						count: this.num,
						goodsPrice: this.endPrice
					}]
				}];
				console.log(arry)
				this.specClass = 'none';
				this.$api.navTo(`/pages/order/finishOrder?goods=${encodeURIComponent(JSON.stringify(arry))}&type=goods`)
			},
			buyGoods() {
				if (this.uid == '') {
					this.$api.getCode(getApp().globalData.inverteUid);
				} else {
					if (this.dataobject.spec == 1) {
						if (this.showObj.id == '') {
							this.$api.tip('请选择规格')
						} else {
							this.creatOrder();
						}
					} else {
						this.creatOrder();
					}
				}

			},
			openShare() {
				let goodsInfo = {
					price: this.dataobject.price,
					original_price: this.dataobject.linePrice,
					image: this.dataobject.image,
					title: this.dataobject.name
				}
				this.$api.navTo(
					`/pages/poster/sh-goods-poster?goodsInfo=${encodeURIComponent(JSON.stringify(goodsInfo))}&id=${this.productId}`)
			}

		}
	};
</script>

<style lang="scss" scoped>
	.share-img {
		position: absolute;
		top: 60upx;
		right: 60upx;
		width: 40upx;
		height: 40upx;

	}

	.cart-img {
		width: 41upx;
		height: 41upx;
		padding-left: 20upx;
	}

	.addcart {
		width: 142upx;
		height: 78upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 90upx 0px rgba(197, 197, 197, 0.35);
		border-radius: 39upx 0px 0px 39upx;
	}

	.shop-name {
		width: 70%;
		// border-right: 1px solid #CCCCCC;
		line-height: 30upx;
	}

	.shop-address {
		width: 50%;
	}

	.link-text,
	.link-phone {
		font-size: 24upx;
		color: rgba(102, 102, 102, 1);
		width: 80%;
		line-height: 30upx;
	}

	.diwei-img {
		width: 31upx;
		height: 28upx;
		margin-right: 20upx;
	}

	.s-line {
		height: 10upx;
		background-color: #F6F6F6;
	}

	.desc-con {
		background: #F6F6F6;
		padding: 20upx;
	}

	.swiper-num {
		position: absolute;
		right: 30upx;
		bottom: 30upx;
		background: #999999;
		border-radius: 23upx;
		color: #FFFFFF;
		padding: 0 14upx;
		z-index: 99;
	}

	.d-header {
		padding: 30upx 0;
		font-size: 30upx;
		color: rgba(51, 51, 51, 1);
		font-weight: bold;
	}

	//   底部操作菜单
	.bottom-btn-details {
		position: fixed;
		bottom: 0;
		height: 98upx;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 9upx 0px rgba(204, 204, 204, 0.4);
		z-index: 999;

		.sub-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 98upx;
			background: #5CDF4B;
		}

		.sub-price {
			display: flex;
			align-items: center;
			height: 98upx;
			padding-left: 30upx;

			.price-one {
				font-size: 24upx;
				color: rgba(254, 80, 99, 1);
			}

			.price-two {
				font-size: 30upx;
				color: rgba(254, 80, 99, 1);
			}
		}
	}

	.showName {
		width: 400upx;
		text-align: right;
	}

	.sku-content {
		background: #FFFFFF;
		min-height: 580upx;
		margin-top: 50upx;
	}

	.detail-desc {
		padding: 0 20upx;
	}

	.uni-com {
		width: 158upx;
		height: 49upx;
		position: relative;
		color: #f55555;
		font-size: 24upx;
		text-align: center;
		line-height: 49upx;
		margin-right: 30upx;
	}

	.uni-com-bg {
		width: 158upx;
		height: 49upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.con {
		color: #999999;
		font-size: 24upx;
	}

	.uni-flex-pei {
		font-size: 30upx;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin-right: 20upx;
	}

	.uni-flex-tit {
		font-size: 30upx;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin-right: 20upx;
		width: 230upx;
	}

	.uni-space {
		justify-content: space-between;
	}

	.c-list {
		border-bottom: 2px solid #f6f6f6;
		padding: 30upx;
		align-items: center;
	}

	.pos-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #E0984C;
	}

	.uni-flex-item {
		text-align: center;
		color: #ffffff;
		height: 88upx;
		line-height: 88upx;
	}

	.sku {
		color: #999999;
		font-size: 24upx;
		margin-left: 30upx;
	}

	.price-tip {
		color: #999999;
		font-size: 26upx;
	}

	.uni-icon-arrowright {
		font-size: 30upx;
		color: #cccccc;
	}

	.choseNum {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx 30upx;
		// background: #FFFFFF;
	}

	.container {
		padding-bottom: 120upx;
		background-color: #FFFFFF;
	}

	.carousel {
		height: 722upx;
		position: relative;

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

	/* 标题简介 */
	.introduce-section {
		padding: 0 30upx;
		position: relative;
		margin-top: -30upx;

		.title {
			font-size: 32upx;
			height: 50upx;
			line-height: 50upx;
			font-weight: bold;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			color: #666666;
			font-size: 24upx;
		}

		.price {
			font-size: 32upx;
			color: #FF0000;
			font-weight: bold;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			color: #333333;

			text {
				flex: 1;
			}
		}
	}

	/* 规格选择弹窗 */
	/* 规格选择弹窗 */
	.attr-content {
		// z-index: 999;
		// padding: 10upx 0;
		width: 100%;
		// box-sizing: border-box;

		.a-t {
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			position: relative;
			// z-index: 999 !important;
			padding-top: 40upx;
			// background: #FFFFFF;

			.img {
				width: 200upx;
				height: 200upx;
				// flex-shrink: 0;
				border-radius: 8upx;
				position: absolute;
				top: -40upx;

			}

			.right {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 224upx;
				line-height: 42upx;

				.price {
					margin-bottom: 10upx;
					color: #FF0000;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			margin-top: 20upx;
		}

		.item-list {
			padding: 0 30upx;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				/* background: #eee; */
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 50upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				border: 1px solid #cccccc;
				font-size: 24upx;
			}

			.selected {
				border: none;
				color: #ffffff;
				background: rgba(224, 152, 76, 1);
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			min-height: 580upx;
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 96upx;
			height: 80upx;
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, 0.5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				width: 180upx;
				height: 100%;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>
