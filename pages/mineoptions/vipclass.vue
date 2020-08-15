<template>
	<view class="content">
		<view class="vip-item uni-flex d-items-center d-between" @click="payOrder(1)">
			<view class="vip-item-left uni-flex d-items-center">
				{{dataobject.VIP}}
			</view>
			<view class="vip-item-right uni-flex d-items-center">
				vip会员(年)
			</view>
			<view class="vip-item-tip">
				￥
			</view>
		</view>
		<view class="vip-item uni-flex d-items-center d-between" @click="payOrder(2)">
			<view class="vip-item-left uni-flex d-items-center">
				{{dataobject.superVIP}}
			</view>
			<view class="vip-item-right uni-flex d-items-center">
				高级vip会员(年)
			</view>
			<view class="vip-item-tip">
				￥
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:'',
				dataobject: {
					VIP:'', //普通vip一年费用
					superVIP:'', //高级vip一年费用
					upgradeSuperVIP:'', //已是普通vip，升级高级vip一年需补缴费用
				}
			}
		},
		onLoad() {
			if (uni.getStorageSync('uid')) {
				this.uid=uni.getStorageSync('uid');
			}
			this.loadData()
		},
		methods: {
			payOrder(ind){
				let parmas = {
					mid:this.uid,
					vipType:ind
				}
				this._reqw.ipost(parmas,'payVIP').then(res => {
					res.result == 0 ? (this.$api.onBridgeReady(res,'vip')): this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			loadData() {
				let parmas = {
					mid:this.uid
				}
				this._reqw.ipost(parmas,'VIPCost').then(res => {
					res.result == 0 ? this.dataobject = res: this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 30upx;

		.vip-item {
			height: 197upx;
			background: url('@~static/img/huiyuanfeileibg.png');
			background-size: 100% 100%;
			border-radius: 10upx;
			position: relative;
			margin-bottom: 20upx;

			.vip-item-left {
				width: 28%;
				font-size: 46upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				justify-content: center;
			}

			.vip-item-right {
				width: 72%;
				font-size: 36upx;
				color: rgba(224, 152, 76, 1);
				justify-content: center;
			}

			.vip-item-tip {
				position: absolute;
				top: 20%;
				left: 30upx;
				font-size: 24upx;
				color: rgba(102, 102, 102, 1);
			}
		}
	}
</style>
