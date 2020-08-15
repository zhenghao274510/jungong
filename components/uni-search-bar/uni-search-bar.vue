<template>
	<view class="uni-searchbar">
		<view :style="{borderRadius:radius+'px',backgroundColor: bgColor}" class="uni-searchbar__box" @click="searchClick">
			<!-- #ifdef MP-ALIPAY -->
			<view class="uni-icon uni-icon-search">

			</view>
			<!-- #endif -->
			<!-- #ifndef MP-ALIPAY -->
			<view class="uni-icon uni-icon-search">

			</view>
			<!-- #endif -->
			<input v-if="show" :focus="showSync" :placeholder="placeholder" confirmType='search' :maxlength="maxlength" @blur="blur"
			 @confirm="confirm" @focus="focus" class="uni-searchbar__box-search-input" confirm-type="search" type="text" v-model="searchVal" />
			<text v-else class="uni-searchbar__text-placeholder" :style="{color:fontColor}">{{ placeholder }}</text>
			<!-- <view v-if="show && (clearButton==='always'||clearButton==='auto'&&searchVal!=='')" class="uni-searchbar__box-icon-clear"
			 @click="clear"> -->
			<!-- <uni-icons color="#999999" class="" size="24" type="clear" /> -->
			<view class="uni-icon uni-icon-close" :style="{color:fontColor}" v-if="show && (clearButton==='always'||clearButton==='auto'&&searchVal!=='')"
			 @click="clear">

			</view>
			<!-- </view> -->
		</view>
		<!-- <text @click="cancel" class="uni-searchbar__cancel" v-if="cancelButton ==='always' || show && cancelButton ==='auto'">{{cancelText}}</text> -->
	</view>
</template>

<script>
	import uniIcons from "../uni-icons/uni-icons.vue";
	export default {
		name: "UniSearchBar",
		components: {
			uniIcons
		},
		props: {
			type: {
				type: [Number, String],
				default: 0
			},
			placeholder: {
				type: String,
				default: "请输入搜索内容"
			},
			radius: {
				type: [Number, String],
				default: 5
			},
			clearButton: {
				type: String,
				default: "auto"
			},
			cancelButton: {
				type: String,
				default: "auto"
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			bgColor: {
				type: String,
				default: "#FFFFFF"
			},
			fontColor: {
				type: String,
				default: "#999999"
			},
			maxlength: {
				type: [Number, String],
				default: 100
			}
		},
		data() {
			return {
				show: false,
				showSync: false,
				searchVal: ""
			}
		},
		watch: {
			searchVal() {
				this.$emit("input", {
					value: this.searchVal
				})
			}
		},
		methods: {
			searchClick() {
				if (this.type == 0) {
					if (this.show) {
						return
					}
					this.searchVal = ""
					this.show = true;
					this.$nextTick(() => {
						this.showSync = true;
					})
				} else {
					this.$api.navTo(`/pages/search/search`)
				}

			},
			keyboardheightchange() {

			},
			clear() {
				this.searchVal = ""
			},
			cancel() {
				this.$emit("cancel", {
					value: this.searchVal
				});
				this.searchVal = ""
				this.show = false
				this.showSync = false
				// #ifndef APP-PLUS
				uni.hideKeyboard()
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
			},
			focus() {
				this.$emit('focus');
			},
			blur() {
				this.$emit('blur')
			},
			confirm() {
				// #ifndef APP-PLUS
				uni.hideKeyboard();
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				this.searchVal == '' ? this.$api.tip('请输入搜索内容!') :
					this.$emit("confirm", {
						value: this.searchVal
					})
			}
		}
	};
</script>

<style lang="scss" scoped>
	$uni-searchbar-height: 72upx;

	.uni-icon {
		font-size: 36upx;
		color: #999999;
	}

	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: $uni-spacing-col-base;
		// background-color: $uni-bg-color;
	}

	.uni-searchbar__box {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		overflow: hidden;
		position: relative;
		flex: 1;
		// justify-content: center;
		flex-direction: row;
		align-items: center;
		height: $uni-searchbar-height;
		padding: 10upx 16upx 10upx 20upx;
		// border-width: 0.5px;
		// border-style: solid;
		// border-color: $uni-border-color;
	}

	.uni-searchbar__box-icon-search {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		width: 64upx;
		justify-content: center;
		align-items: center;
		color: $uni-text-color-placeholder;
	}

	.uni-searchbar__box-search-input {
		flex: 1;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		padding-left: 40upx;
	}

	.uni-searchbar__box-icon-clear {
		align-items: center;
		line-height: 48upx;
		padding-left: 10upx;
	}

	.uni-searchbar__text-placeholder {
		font-size: $uni-font-size-base;
		color: $uni-text-color-placeholder;
		margin-left: 10upx;
	}

	.uni-searchbar__cancel {
		padding-left: 20upx;
		line-height: $uni-searchbar-height;
		font-size: 28upx;
		color: $uni-text-color;
	}
</style>
