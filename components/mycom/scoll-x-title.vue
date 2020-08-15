<template>
	<view class="">
		<scroll-view class="ss-scroll-navbar" scroll-x :scroll-left="scrollLeft" scroll-with-animation="true" v-if="type==0">
			<view v-for="(item, index) in navArr" :key="index" class="nav-item" @click="tabChange(item,index)" :id="'item-' + index">
				<text class="title" :class="{current: index === tabCurrentIndex}">{{item.name}}</text>
			</view>
		</scroll-view>
		<scroll-view class="ss-scroll-navbar uni-flex d-items-center" scroll-x :scroll-left="scrollLeft"
		 scroll-with-animation="true" v-if="type==1">
			<view v-for="(item,index) in navArr" :key="index" class="nav-item-other" :class="{currentBord: index === tabCurrentIndex}"
			 @click="tabChange(item,index)" :id="'item-' + index">
				<text class="title">{{item.name}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'ss-scroll-navbar2',
		props: {
			navArr: {
				type: Array,
				default () {
					return []
				}
			},
			tabCurrentIndex: {
				type: [String, Number],
				default: 0
			},
			type: {
				type: String || Number
			}
		},
		data() {
			return {
				scrollLeft: 0,
				widthList: [],
				screenWidth: 0,

			}
		},
		methods: {
			/**
			 * 导航栏navbar
			 * 点击事件
			 */
			tabChange(item, index) {
				console.log(index)
				if (this.tabCurrentIndex != index) {
					this.$emit('navbarTap', {
						obj: item,
						ind: index
					});
				}

				var widthArr = this.widthList;
				var scrollWidth = 0;
				for (var i = 0; i < index + 1; i++) {
					scrollWidth += widthArr[i];
				}
				let currentWidth = widthArr[index];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -= this.screenWidth / 2;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			},
			calculateItemWidth() {
				var that = this;
				var arr = [];
				let w = 0;
				console.log(this.navArr)
				this.navArr.forEach((item, index) => {
					let view = uni.createSelectorQuery().in(this).select("#item-" + index);
					view.boundingClientRect(data=>{
						arr.push(data.width)
					}).exec()
				})
				this.widthList = arr;
			},
			calculateWindowWidth() {
				var info = uni.getSystemInfoSync();
				this.screenWidth = info.screenWidth;
				this.calculateItemWidth();
			}
		},
		created() {
			var that = this;
			this.calculateWindowWidth();
		}
	}
</script>

<style lang="scss">
	.top-title {
		width: 137upx !important;
		height: 37upx !important;
		background: rgba(0, 185, 0, 1);
		border-radius: 10upx;
		font-size: 20upx !important;
		color: rgba(255, 255, 255, 1) !important;
		color: #FFFFFF !important;
		text-align: center;
	}


	.currentBord {
		background: #00B900 !important;

		.title {
			color: #FFFFFF !important;
		}
	}

	.ss-scroll-navbar {
		width: 100%;
		height: 70upx;
		padding: 20upx;
		background-color: #fff;
		white-space: nowrap;

		.nav-item-other {
			// height: 48upx;
			text-align: center;
			padding: 0upx 20upx;
			color: #666666;
			display: inline-block;
			position: relative;
			font-size: 30upx;
			background: rgba(247, 247, 247, 1);
			border-radius: 24px;
			margin-right: 20upx;

			.title {
				// line-height: 48upx;
			}
		}

		.nav-item {
			height: 70upx;
			text-align: center;
			padding: 0upx 20upx;
			color: #666666;
			display: inline-block;
			position: relative;
			font-size: 30upx;

			.title {
				line-height: 70upx;
			}
		}

		.current {
			color: #042823 !important;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 36upx;
				height: 8upx;
				background: #042823;
				border-radius: 4upx
			}
		}
	}
</style>
