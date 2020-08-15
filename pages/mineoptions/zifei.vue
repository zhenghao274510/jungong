<template>
	<view class="money-con">
		<block v-for="(tabItem,tabIndex) in province" :key="tabIndex">
			<view class="city-con">
				<view class="city-item-title">
					直辖市:
				</view>
				<view class="city-item-con uni-flex uni-flex-item d-items-center">
					<view class="city-item" :class="{'active':currentLabel==v.label}" v-for='(v,k) in tabItem.municipality' :key="k"
					 @click="targetTap(v,tabIndex,k)">
						{{v.label}}
					</view>
				</view>
			</view>
			<view class="city-con">
				<view class="city-item-title">
					省份:
				</view>
				<view class="city-item-con uni-flex uni-flex-item d-items-center">
					<view class="city-item" :class="{'active':currentLabel==v.label}" v-for='(v,k) in tabItem.prov' :key="k"
					 @click="targetTap(v,tabIndex,k)">
						{{v.label}}
					</view>
				</view>
			</view>
			<view class="city-con margin-bot">
				<view class="city-item-title">
					自治区:
				</view>
				<view class="city-item-con uni-flex uni-flex-item d-items-center">
					<view class="city-item" :class="{'active':currentLabel==v.label}" v-for='(v,k) in tabItem.region' :key="k"
					 @click="targetTap(v,tabIndex,k)">
						{{v.label}}
					</view>
				</view>
			</view>
		</block>




		<!-- 表格部分 -->
		<view class="uni-flex table-con">
			<view class="tab-city">
				郑州
			</view>
			<view class="uni-flex-item tab-item-con">
				<view class="tab-item">
					1线
				</view>
				<view class="tab-item">
					2线
				</view>
				<view class="tab-item">
					3线
				</view>
			</view>
			<view class="uni-flex-item tab-item-con">
				<view class="tab-item">
					100
				</view>
				<view class="tab-item">
					200
				</view>
				<view class="tab-item">
					300
				</view>
			</view>
			<view class="uni-flex-item tab-item-con">
				<view class="tab-item">

				</view>
				<view class="tab-item">

				</view>
				<view class="tab-item">

				</view>
			</view>
		</view>
	</view>

</template>
<script>
	import provinceData from '@/common/js/proviceData.js';
	import cityData from '@/components/mpvue-citypicker/city-data/city.js';
	import areaData from '@/components/mpvue-citypicker/city-data/area.js';
	export default {
		components: {},
		data() {
			return {
				status: 'loading',
				dataList: [],
				province: [],
				currentLabel:'北京',
				showEmpty: false,
				showLoading: true
			}
		},
		onLoad() {
			this.province = provinceData;
		},
		methods: {
			loadData() {},
			targetTap(v) {
               this.currentLabel=v.label;
			}
		},
		onShareAppMessage() {
			return {
				title: getApp().globalData.title
			}
		},
	}
</script>
<style scoped lang="scss">
	.money-con {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	// 城市部分
	.city-con {
		width: 90%;
		display: flex;
	}
	.city-item-title {
		width: 100upx;
		font-size: 26upx;
		text-align: left;
		color: #000000;
	}
	.city-item-con {
		flex-wrap: wrap;
	}
	.city-item {
		padding: 0upx 8upx;
		margin: 8upx;
		font-size: 24upx;
		background-color: #BFBFBF;
		border-radius: 6upx;
	}
	.active {
		background-color: #00B900;
		color: #FFFFFF;
	}
	.margin-bot {
		margin-bottom: 30upx;
	}
	// 表格部分
	.table-con {
		width: 90%;
		border-top: 1px solid #CCCCCC;
		border-left: 1px solid #CCCCCC;
		border-right: 1px solid #CCCCCC;
	}

	.tab-item-con {
		box-sizing: border-box;
		border-left: 1px solid #CCCCCC;
	}

	.tab-item {
		height: 50upx;
		line-height: 50upx;
		padding-left: 20upx;
		border-bottom: 1px solid #CCCCCC;
		box-sizing: border-box;
	}

	.tab-city {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 160upx;
		border-bottom: 1px solid #CCCCCC;
		box-sizing: border-box;
	}
</style>
