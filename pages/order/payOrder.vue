<template>
	<view class="contain">
		<view class="box">
			<view class="pay">
				<view class="money">
					<view class="price">
						￥
						<span id="jine">{{price}}</span>
					</view>
					<span>需支付</span>
				</view>
			</view>
			<view class="pay-chose">
				<view class="uni-title uni-common-mt uni-common-pl">
					<image src="../../static/img/home/yongjin.png" mode="" class="pay-img"></image> 选择支付方式
				</view>
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
							<view class="uni-flex d-items-center">
								<image :src="item.img" mode="" class="pay-img"></image>
								<view class="item-text">{{item.value}}</view>
								<view class="price-box" v-if="index==1">
									可用余额:￥{{balance}}
								</view>
							</view>

							<view>
								<radio :value="item.value" :checked="index === current" color="#FE5063" style="transform:scale(0.7)" />
							</view>

						</label>
					</radio-group>
				</view>
			</view>
			<view class="btns" @click="payOrder" hover-class="btn-hover">确定</view>
		</view>
		<cart-pop ref="cartPopCon" @onConfirm="confirmDel" type='1' text='请输入支付密码'></cart-pop>
		
	</view>
</template>
<script>
	import cartPop from "@/components/mycom/cartPop.vue"
	import md5 from "js-md5";
	export default {
		components:{
			cartPop
		},
		data() {
			return {
				items: [{
						img: '/static/img/home/weixinzhifu.png',
						value: '微信支付'
					},
					{
						img: '/static/img/home/yuepay.png',
						value: '余额支付'
					}
				],
				current: 0,
				price: "",
				id: "",
				ispaypassword:0,
				balance:0,
				phone:'',
				type:''
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.price = options.price;
			this.type=options.type;
		},
		onShow() {
			this.loadDate();
		},
		methods: {
			loadDate() {
				let parmas = {
					cmd: 'userinfo',
					uid: getApp().globalData.uid
				};
				this._reqw
					.ipost(parmas)
					.then(res => {
						console.log(res);
						if (res.result == 0) {
							this.balance = res.dataobject.balance;
							this.ispaypassword= res.dataobject.ispaypassword;
							this.phone=res.dataobject.phone;
						} else {
							this.$api.tip(res.resultNote);
						}
			
					})
					.catch(err => {});
			},
			confirmDel(e){
				console.log(e)
				this.payBlance(e);
			},
			radioChange(e) {
				console.log(e)
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === e.target.value) {
						this.current = i;
						break;
					}
				}
			},
			payBlance(e){
				let parmas = {
					cmd:"balancepay",
					uid: getApp().globalData.uid,
					ordernum: this.id,
					money: this.price,
					paypassword:md5(e)
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ?this.payOther(): this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			payWX(){
				let parmas = {
					cmd:"weixinpay",
					uid: getApp().globalData.uid,
					ordernum: this.id,
					money: this.price
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ?this.$api.PayBywx(res.body,this.type): this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			isSet(){
				console.log(111)
				this.ispaypassword==1?(this.$refs.cartPopCon.open()):(this.$api.showTip(res=>{
					res.confirm?this.$api.navTo(`/pages/mineoptions/setpsw?phone=${this.phone}`):this.$refs.cartPopCon.close()
				}))
			},
			payOrder() {
				this.current==0?this.payWX():this.isSet();
			},
			payOther() {
				this.$api.tip('支付成功！'), setTimeout(() => {
					this.$api.redirectTo(`/pages/order/paySuccess?type=${this.type}`)
				}, 300)
			}


		}
	}
</script>

<style scoped lang="scss">
	.uni-common-pl {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item-text {
		font-size: 30upx;
	}

	.price-box {
		color: #09BB07;
		margin-left: 30upx;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.pay-img {
		width: 52upx;
		height: 52upx;
		margin-right: 20upx;
	}

	.pay-chose {
		width: 95%;
		margin: -120upx auto 50upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 7upx 18upx 0px rgba(81, 81, 81, 0.05);
		border-radius: 10upx;
	}

	.uni-list-cell-pd {
		padding: 40upx 30upx;
	}

	.box {
		width: 100%;

		.pay {
			width: 100%;
			padding-bottom: 60upx;
			box-sizing: border-box;
			background-color: #FE5063;

			.money {
				width: 100%;
				padding: 120upx 0;
				display: flex;
				flex-direction: column;
				flex-direction: center;
				align-items: center;
				color: #FFFFFF;

				.price {
					span {
						font-size: 60upx;
					}
				}
			}
		}

		.btns {
			width: 656upx;
			height: 88upx;
			background: #FE5063;
			border-radius: 10upx;
			line-height: 88upx;
			text-align: center;
			margin: 60upx auto 0;
			color: #fff;
		}
	}
</style>
