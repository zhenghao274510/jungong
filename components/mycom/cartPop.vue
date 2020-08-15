<template>
	<view class="mask" v-if="pickerShow" @click.stop="close">
		<view class="mask">

		</view>
		<view class="yaoqing-content" @click.stop>
			<view class="" v-if="type==1">
				<view class="uni-flex d-items-center j-center">
					<view class="title">
						置顶
					</view>
					<image src="/static/img/zhiding.png" mode="" class="img"></image>
				</view>
				<view class="changPwd-con">
					<view class="changPwd-item" :class="{current:activeTopClass==k}" @click.stop='activeChose(k)' v-for="(v,k) in dataList"
					 :key='k'>
						{{v}}
					</view>
				</view>
			</view>
			<view class="d-items-center  cart-del-con " v-if="type==0">
				<view class="title j-center">
					选择店铺
				</view>
				<view class="padding-con">
					店铺选择为用户所覆盖区域，请谨慎挑选
				</view>
			</view>
			<view class="d-items-center j-center cart-del-con " v-if="type==2">
				<view class="title">
					感谢您的宝贵意见
				</view>
			</view>


			<view class="yaoqing-bottom uni-flex d-items-center around">
				<view class="yaoqing-btn-con one" @click.stop="close">
					取消
				</view>
				<view class="yaoqing-btn-con two" @click.stop="confirm">
					确认
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			type: [Number, String],
			obj: {}
		},
		data() {
			return {
				pickerShow: false,
				activeTopClass: 0,
				dataList: []
			}
		},
		watch: {
			obj: {
				handler(n) {
					if (n.threeDayCost != '') {
						this.dataList[0] = `置顶三天费用:￥${n.threeDayCost}元`;
						this.dataList[1] = `置顶一周费用:￥${n.weekCost}元`;
						this.dataList[2] = `置顶一月费用:￥${n.monthCost}元`;
					}
				},
				deep: true
			}
		},
		methods: {
			toChange() {
				this.$api.navTo('/pages/mineoptions/foundpsw');
			},
			open() {
				this.pickerShow = true;
			},
			close() {
				this.pickerShow = false;
				if(this.type==1){
					this.$emit('onCancel')
				}
			},
			confirm() {
				if(this.type==1){
					this.$emit('onConfirm',this.activeTopClass);
				}else{
					this.$emit('onConfirm',1);
				}
				 this.pickerShow = false
			},
			testPsw() {
				this.close();
				this.$emit('onConfirm')
			},
			activeChose(ind) {
				this.activeTopClass = ind;
			}

		}
	}
</script>

<style scoped lang="scss">
	.padding-con {
		padding: 40upx 0;
	}

	.cart-del-con {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.changPwd-con {
		padding: 20upx 0;

		.changPwd-item {
			width: 100%;
			padding: 20upx 0;
			box-sizing: border-box;
			margin-bottom: 20upx;
			text-align: center;
		}

		.current {
			background: rgba(255, 238, 220, 1);
			color: rgba(211, 128, 41, 1);
		}
	}

	.around {
		justify-content: space-around;
		padding-top: 30upx;
	}

	.j-center {
		justify-content: center;
		padding-bottom: 20upx;
		border-bottom: 1px solid rgba(242, 242, 242, 1);
	}

	.title {
		font-size: 36upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		text-align: center;
	}

	.img {
		width: 40upx;
		height: 40upx;
		margin-left: 20upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		background: rgba(0, 0, 0, .3);
	}

	.yaoqing-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		width: 80%;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40upx 0;
		box-sizing: border-box;
		z-index: 99999;

	}

	.yaoqing-btn-con {
		height: 75upx;
		width: 200upx;
		text-align: center;
		line-height: 75upx;
		color: #FFFFFF;
		border-radius: 10upx;
	}

	.one {
		background: rgba(111, 215, 88, 1);
	}

	.two {
		background: rgba(254, 80, 99, 1)
	}



	.tabBar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9;

		.tabBar_list {
			width: 100%;
			display: flex;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			.tabBar_item {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 24upx;
				position: relative;
				color: #969BA3;

				.tipPoint {
					width: 30upx;
					height: 30upx;
					border-radius: 50%;
					background-color: #FE5063;
					color: #FFFFFF;
					text-align: center;
					line-height: 30upx;
					position: absolute;
					right: 0;
					top: 0;
					font-size: 24upx;
				}

				.tabBar_name {
					font-size: 24upx;
				}
			}

			.tabBar_item2 {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #969BA3;
				position: relative;
				z-index: 101;
			}
		}
	}
</style>
