<template>
	<view class="">
		<view class="hear-con animated zIndex" :class="[is_lhp?'lhp-height-bg':'other-height-bg',{'noPageScroll zoomOut':showHome}]"
		 v-if="type==0&&!showHome">
			<view class="header-splace">

			</view>
			<view class="uni-flex d-items-center d-content" :class="[is_lhp?'lhp':'top-con']">
				<view class="home-title">
					{{txt}}
				</view>
			</view>
		</view>
		<view :class="[is_lhp?'lhp-height':'other-height']" v-if="type==0">

		</view>
		<view class="bg-top" :class="[is_lhp?'lhp-height':'other-height',{'noPageScroll zoomOut':showHome}]" v-if="type==1">

		</view>
		<view class="hear-con " :class="[is_lhp?'other-page-lhp-height':'other-page-height',{'pageScroll zoomIn':showHome}]"
		 style="background:#005A00" v-if="showHome">
			<view class="header-splace">

			</view>
			<view class="uni-flex d-items-center d-content" :class="[is_lhp?'lhp':'top-con']">
				<view class="home-title">
					{{txt}}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			type: {
				type: Number || String,
				default: 0
			},
			showHome: {
				type: Boolean,
				default: false
			},
			txt: ''
		},
		data() {
			return {
				showMine: false
			}
		},
		computed: {
			is_lhp() {
				return this.$is_bang
			}
		},
		methods: {
			getPosition() {
				this.$emit('click');
			},
			open() {
				this.type == 0 ? this.showHome = true : this.showMine = true;
			},
			close() {
				this.type == 0 ? this.showHome = false : this.showMine = false;
			},
			toBack() {
				this.$api.back();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d-content {
		justify-content: center;
	}

	.back-img-con {
		padding: 0 20upx;

	}

	.back-img {
		width: 26upx;
		height: 24upx;
	}

	.home-mine-title {
		font-size: 34upx;
		font-weight: bold;
		color: #fff;
		width: 100%;
		text-align: center;
	}

	.home-other-title {
		font-size: 34upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		padding-left: 30%;
	}

	.home-title {
		font-size: 26upx;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		// padding-left:15%;
	}

	.home-title-port {
		// font-size: 40upx;
		// font-weight: bold;
		color: #FFFFFF;
	}

	.home_location {
		width: 30upx;
		height: 36upx;
		margin-right: 20upx;
	}

	.city-name {
		font-size: 24upx;
		width: 200upx;
		color: rgba(255, 255, 255, 1)
	}

	.uni-icon-back {
		font-size: 40upx;
		color: #333333;
		font-weight: bold;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.lhp {
		padding-top: 60upx;
	}

	.bg-top {
		background-color: #199FFF;
	}

	.lhp-height-bg {
		height: 410upx;
		background: url("@~static/img/bg.png");
		background-size: 100% 100%;
	}

	.other-height-bg {
		height: 370upx;
		background: url("@~static/img/bg.png");
		background-size: 100% 100%;
	}

	.other-page-lhp-height {
		height: calc(140upx + var(--status-bar-height));
	}

	.other-page-height {
		height: calc(110upx + var(--status-bar-height));
	}

	.lhp-height {
		height: 410upx;

	}

	.other-height {
		height: 370upx;
	}

	.top-con {
		padding-top: 20upx;
	}

	.top-con-lhp {
		padding-top: 30upx;
	}

	.title-nav {
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
		width: 100%;
	}

	.pageScroll {
		z-index: 999999;
	}

	.noPageScroll {
		z-index: 999;
	}

	.hear-con {
		position: fixed;
		top: 0;
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		z-index: 99;
	}

	.zIndex {
		z-index: 0;
	}

	.right-m {
		margin-right: 20upx;
	}

	.left-m {
		margin-left: 10upx;
	}

	.dingwei-img {
		width: 28upx;
		height: 34upx;
	}

	.header-splace {
		height: var(--status-bar-height);
	}
</style>
