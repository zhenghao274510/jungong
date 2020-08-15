<template>
	<view class="content-warpe">
		<view class="" v-if="addressData.id!=''">
			<view class="address-tit">
				收货人信息
			</view>
			<!-- 地址 -->
			<view class="address-section" @click="choseAddress">
				<view class="order-content">
					<view class="cen">
						<view class="top uni-flex">
							<view class="mobile">
								<text>{{addressData.name}}</text> <text style="margin-left: 15px;">{{addressData.phone}}</text>
							</view>
						</view>
						<text class="cell-tit">{{addressData.district}}{{addressData.location}}</text>
					</view>
					<view class="uni-icon uni-icon-arrowright"></view>
				</view>
			</view>
		</view>
		<view class="noAddress" @click="choseAddress" v-else>
			<view class="mobile address-tit">
				选择您的收货地址
			</view>
			<view class="uni-icon uni-icon-arrowright"></view>
		</view>
		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="address-tit">
				商品信息
			</view>
			<!-- "goodscarid": "购物车id", -->
			<block v-for="(item,index) in dataList" :key="index">
				<view class="uni-flex d-items-center cart-item-top">
					<image src="/static/img/shop.png" class="shop-icon"></image>{{item.shopName}}
				</view>
				<view class="g-item" v-for="(v,k) in item.cartList" :key='k'>
					<image :src="v.goodsImage" class="product-img"></image>
					<view class="right">
						<text class="title clamp">{{v.goodsName}}</text>
						<view style="margin: 5px 0;" v-if="v.goodsSpecName!=''">
							<text class="spec uni-ellipsis">{{v.goodsSpecName}}</text>
						</view>
						<view class="price-box">
							<text class="price">￥{{v.goodsPrice}}</text>
							<text class="number">x{{v.count}}</text>
						</view>
					</view>
				</view>
				<!-- 金额明细 -->
				<view class="uni-list-cell">
					<text class="cell-tip"> 商品金额</text>
					<view class="cell-tit">￥{{item.shopPrice}}</view>
				</view>
				<view class="uni-list-cell" v-if="freight!=0">
					<text class="cell-tip">运费</text>
					<view class="cell-tit">￥{{freight}}</view>
				</view>
				<view class="uni-list-cell">
					<text class="cell-tip">共计</text>
					<view class="cell-tit">
						￥{{item.totalPrice}}
					</view>
				</view>
			</block>
		</view>
		<view class="uni-list-cell" v-if="complinePrice!=0">
			<text class="cell-tip">积分抵扣</text>
			<view class="cell-tit">-￥{{complinePrice}}</view>
		</view>
		<view class="uni-list-cell">
			<text class="cell-tip">备注</text>
			<input type="text" value="" placeholder="请输入你的留言" class="input" v-model="remarks" />
		</view>
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text class="price-tip" v-if="endPrice!= 0">￥</text>
				<text class="price">{{ endPrice }}</text>
			</view>
			<text class="submit" @click="submit" hover-class="btn-hover">提交订单</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					id: "", //地址id
					name: "", //名称
					phone: "", //电话
					district: "", //行政区域
					location: "", //地址
					lat: "", //纬度
					lng: "", //经度
					defaults: "" //是否默认1是0否 
				},
				endPrice:0,
				freight:0,
				dataList: [],
				type: '',
				remarks: '',
				uid: '',
				point:'',
				complinePrice:0,
				isBind:1
			};
		},
		onLoad(options) {
			if(options.point){
				this.point=options.point;
			}
			console.log(this.dataList)
			this.type = options.type;
			if (uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			this.getDefault();
			this.getfreights(JSON.parse(decodeURIComponent(options.goods)));
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			fromPrice(arry) {
				let payPrice = 0,pointPrice=0,allShopPrice=0;
				arry.forEach(item => {
					let price = 0;
					item.cartList.forEach(e => {
						price +=e.goodsPrice * 100 *e.count-0;
					})
					item.shopPrice = this.$api.parsePrice(price/100);
					item.totalPrice = this.$api.parsePrice(item.shopPrice - 0 + (this.freight-0));
					payPrice += item.totalPrice - 0;
				});
				console.log(this.point)
				if(this.point!=''){
					pointPrice=this.point/100;
					allShopPrice=payPrice-arry.length*this.freight;
					pointPrice>allShopPrice?(this.complinePrice=this.$api.parsePrice(allShopPrice),payPrice=arry.length*this.freight):(this.complinePrice=this.$api.parsePrice(pointPrice),payPrice=payPrice-pointPrice);
				}
				this.endPrice = this.$api.parsePrice(payPrice);
				this.dataList=arry;
				console.log(this.dataList)
			},
			getfreights(arry) {
				this._reqw
					.ipost({}, 'carriage')
					.then(res => {
						res.result == 0 ? (this.freight = this.$api.parsePrice(res.carriage),this.fromPrice(arry)) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			
			submit() {
				this.addressData.addressid == '' ? this.$api.tip('请选择收货地址!') : this.getOrderId();
			},
			getUserInfo(){
				let parmas = {
					mid: this.uid
				};
				this._reqw
					.ipost(parmas, 'info')
					.then(res => {
						console.log(res);
						res.result == 0?(res.mobile==''?this.isBind=0:this.isBind=1):this.$api.tip(res.resultNote)
					})
					.catch(err => {});
			},
			// //  默认地址
			getDefault() {
				let parmas = {
					mid: this.uid
				}
				this._reqw
					.ipost(parmas, 'addressList')
					.then(res => {
						console.log(res);
						res.result == 0 ? (res.dataList.length != 0 ? this.addressData = res.dataList[0] : '') : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			choseAddress() {
				this.$api.navTo(`/pages/mineoptions/address?source=1`);
			},
			payOrder(id) {
				let parmas = {
					mid: this.uid,
					oid: id
				};
				this._reqw
					.ipost(parmas, 'payOrder')
					.then(res => {
						res.result == 0 ? (this.$api.onBridgeReady(res,'finish')) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			getOrderId() {
				if(this.isBind==0){
					this.$api.bindTip(res=>{
						if(res.confirm){
							this.$api.navTo(`/pages/resgin/index?mid=${this.uid}`);
						}
					})
				}else{
					let cidlist = [],
						url = '';
					let parmas = {
						mid: this.uid,
						aid: this.addressData.id,
						remarks: this.remarks
					
					};
					console.log(this.dataList);
					if (this.type == 'goods') {
						parmas.gid = this.dataList[0].cartList[0].goodsId;
						parmas.spec = this.dataList[0].cartList[0].goodsSpecId;
						parmas.count = this.dataList[0].cartList[0].count;
						url = 'placeOrderGoods';
					} else {
						let cids = [];
						this.dataList.forEach(item => {
							item.cartList.forEach(e => {
								this.$set(cids, cids.length, e.id)
							})
						})
						parmas.cids = cids.join(',');
						parmas.userPoints = this.point;
						url = 'placeOrder';
					}
					console.log(parmas);
					this._reqw
						.ipost(parmas, url)
						.then(res => {
							res.result == 0 ? this.payOrder(res.id) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				}
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	.shop-icon {
		width: 38upx;
		height: 37upx;
	}

	.cart-item-top {
		margin: 30upx auto 0;
		display: flex;
		position: relative;
		background: #FFFFFF;
		border-radius: 20upx 20upx 0px 0px;
		padding: 20upx;
		box-sizing: border-box;
	}

	.noAddress {
		height: 150upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.input {
		flex: 1;
		text-align: right;
		font-size: 24upx;
	}

	.juan-bg {
		width: 136upx;
		height: 40upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.uni-icon {
		font-size: 26upx;
		color: #666666;
	}

	.cell-tit {
		color: #666666;
		font-size: 24upx;
		position: relative;
	}

	.cell-tip {
		color: #333;
		font-size: 26upx;
	}

	.uni-list-cell {
		padding: 30upx 0;
	}

	.address-tit {
		width:100%;
		font-size: 30upx;
		font-weight: bold;
		color: rgb(51, 51, 51);
		line-height: 70upx;
		position: relative;
		padding: 30upx 0 30upx 30upx;
		border-bottom: 1px solid #F2F2F2;
	}

	.address-tit::before {
		content: '';
		width: 6upx;
		height: 27upx;
		background: #e0984c;
		border-radius: 3upx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.content-warpe {
		padding: 0 2.5% 100upx 2.5%;
		margin: 0 auto;
		background: #FFFFFF;
	}

	.mobile {
		font-weight: bold;
		color: #333333;
	}

	.icon-swiper {
		display: flex;
		align-items: center;
	}

	.address-section {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
			width: 100%;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
		}
	}

	.goods-section {
		margin-top: 16upx;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.name {
			font-size: 30upx;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			padding: 20upx;

			.product-img {
				flex-shrink: 0;
				display: block;
				width: 160upx;
				height: 160upx;
				border-radius: 6upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				word-break: break-all;
				display: -webkit-box;
				overflow: hidden;
				line-height: 1.5;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-weight: bold;
				color: #333333;
			}

			.spec {
				font-size: 24upx;
				color: #999999;
			}

			.price-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32upx;
				margin-topl: 20upx;

				.price {
					font-size: 15px;
					font-weight: bold;
					color: #fe2c2c;
				}

				.number {
					font-size: 13px;
					color: #111111;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;

		.price-content {
			padding-left: 30upx;
			color: #F55555;
		}

		.price-tip {
			margin-left: 8upx;
			color: #F55555;
		}

		.price {
			font-size: 36upx;
			color: #F55555;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #e0984c;
			color: #fff;
			height: 90upx;
			font-size: 28upx;
			width: 308upx;
		}
	}
</style>
