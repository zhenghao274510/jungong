<template>
	<view class="w-picker">
		<view class="mask" :class="{'show':showPicker}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="w-picker-cnt" :class="{'show':showPicker}">
			<view class="w-picker-hd" @touchmove.stop.prevent catchtouchmove="true">
				<view class="w-picker-btn" @tap="pickerCancel">取消</view>
				<view class="">
					薪资要求（月薪，单位：千元）
				</view>
				<view class="w-picker-btn" :style="{'color':themeColor}" @tap="pickerConfirm">确定</view>
			</view>
			<view class="w-picker-view">
				<picker-view :indicator-style="itemHeight" :value="pickVal" @change="bindChange" @touchstart="touchStart" @touchend="touchEnd">
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.years" :key="index">{{item}}k</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.months" :key="index">{{item}}k</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			themeColor: {
				type: String,
				default () {
					return "#37C2BC"
				}
			},
		},
		data() {
			return {
				showPicker: false,
				itemHeight: `height: ${uni.upx2px(88)}px;`,
				confirmFlag: true,
				pickVal: [0,0],
				checkArr: [],
				data: {
					years: [],
					months: []
				}
			}
		},
		methods: {
			initData() {
				this.data.years = [];
				this.data.months = [];
				this.pickVal=[0,0];
				for (let i =3; i <= 15; i++) {
					this.data.years.push(i)
					this.data.months.push(i + 1)
				}
				this.$set(this.checkArr, 0, this.data.years[0])
				this.$set(this.checkArr, 1, this.data.months[0])
			},
			touchStart() {
				if (this.timeout) {
					this.confirmFlag = false;
				}
			},
			touchEnd() {
				if (this.timeout) {
					setTimeout(() => {
						this.confirmFlag = true;
					}, 500)
				}
			},
			open() {
				this.showPicker = true;
				this.initData();
			},
			pickerConfirm() {
				this.$emit('confirm', this.checkArr);
				setTimeout(() => {
					this.pickVal = [];
				})
				this.showPicker = false;
			},
			pickerCancel() {
				this.showPicker = false
			},
			maskTap() {
				// this.$emit("cancel");
				this.showPicker = false;
			},
			bindChange(e) {
				console.log(e)
				let a = e.detail.value[0],
					m = this.data.years[a + 1],
					arry = [];
				for (let i = m; i <= 15; i++) {
					arry.push(i)
				}
				this.data.months = arry;
				this.$set(this.checkArr, 0, this.data.years[a]);
				let b = e.detail.value[1],
					n = this.data.months[b];
				this.$set(this.checkArr, 1, this.data.months[b])
				// if (e.detail.value.length > 1) {
					
				// } else {
				// 	this.$set(this.checkArr, 1, this.data.months[0])
				// }
				console.log(this.checkArr)
			}
		}
	}
</script>

<style lang="scss">
	.w-picker {
		position: relative;
		z-index: 99;

		.mask {
			position: fixed;
			z-index: 99;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.6);
			visibility: hidden;
			opacity: 0;
			transition: all 0.3s ease;
		}

		.mask.show {
			visibility: visible;
			opacity: 1;
		}

		.w-picker-cnt {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			transition: all 0.3s ease;
			transform: translateY(100%);
			z-index: 9999;
		}

		.w-picker-cnt.show {
			transform: translateY(0);
		}

		.w-picker-hd {
			display: flex;
			align-items: center;
			padding: 0 30upx;
			height: 88upx;
			background-color: #fff;
			position: relative;
			text-align: center;
			font-size: 32upx;
			justify-content: space-between;

			.w-picker-btn {
				font-size: 30upx;
			}
		}

		.w-picker-hd:after {
			content: ' ';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-bottom: 1px solid #e5e5e5;
			color: #e5e5e5;
			transform-origin: 0 100%;
			transform: scaleY(0.5);
		}

		.w-picker-item {
			text-align: center;
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 30upx;
		}

		.w-picker-view {
			width: 100%;
			height: 476upx;
			overflow: hidden;
			background-color: rgba(255, 255, 255, 1);
			z-index: 666;
		}

		picker-view {
			height: 100%;
		}
	}
</style>
