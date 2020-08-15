<!-- 
	name: 悬浮菜单
	version: v0.0.1
	update_time: 2020-6-25 
 -->
<template>
	<view>
		<!-- 遮罩 -->
		<view class="mask" v-if="show" @tap="show = false" @touchmove.stop.prevent></view>
		<!-- 按钮 -->
		<view class="major-box" :class="{show: show}"  >
			<view class="click-btn" @tap="show = !show" draggable="true"  @touchmove.stop.prevent="touchmove">
				<image src="/static/img/moreac.png" class="more-img"></image>
			</view>
			<view class="nav-box">
				<view class="nav-btn" v-for="(item, index) in btnList" :key="index" @tap="clickBtn(index)">
					<image :src="item.icon" class="more-img"></image>
					<view class="nav-text">{{item.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false ,// 是否显示
			top: 300,	// 顶端距离 
			deviationTop: 0,	// 偏移量
			windowHeight: uni.getSystemInfoSync().windowHeight,	// 视图高度 
			btnList: [		// 所有按钮 
				{
					icon: '/static/img/send.png',
					text: '我要发布',
					bgcolor: '#FE7A7D'
				},
				{
					icon: '/static/img/tousu.png',
					text: '投诉中心',
					bgcolor: '#CAB493'
				},
				{
					icon: '/static/img/money.png',
					text: '教官资费',
					bgcolor: '#91B3B2'
				}
			]
		};
	},
	methods: {
		// 点击按钮 
		clickBtn(ind) {
			ind==0?this.$api.navTo(`/pages/mineoptions/newSend`):ind==1?this.$api.navTo(`/pages/mineoptions/yijian`):this.$api.navTo(`/pages/mineoptions/zifei`);
			this.show=false;
		}
	}
};
</script>

<style>
	/* 遮罩 */
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.4);
	}
	/* 总盒子 */
	.major-box {
		border: 1px 0 solid;
		z-index: 10001;
		position: fixed;
		width: 100%;
		padding: 40upx 0;
		bottom: 200upx;
		/* height: 0px; */
		left: 650rpx;
		transition: left 0.5s;
		overflow: hidden;
	}
	/* 展开时 */
	.major-box.show{left: 110rpx;}
	
	.click-btn,
	.nav-box {
		float: left;
	}
	/* 按钮样式 */
	.nav-box{
		background-color: #FFF;
		border-radius: 0 0 0 5px;
	}
	.more-img{
		width: 48upx;
		height: 48upx;
	}
	.click-btn {
		width: 100rpx;
		background-color:#FFFFFF;
		border-radius: 100rpx 0 0 100rpx;
		padding:20upx 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.click-btn view {
		padding-left: 15rpx;
		color: #fff;
	}

	/* 按钮盒子 */
	.nav-box {
		width: 500rpx;
		padding: 30rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		justify-content: center;
	}
	.nav-btn {
		flex: 1;
		border: 0px #000 solid;
		min-width: 150rpx;
		padding: 12rpx 0;
		padding-bottom: 20rpx;
	}
	.nav-icon {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		display: inline-block;
		font-size: 15px;
		border-radius: 50%;
		background-color: #666;
		color: #fff;
	}
	.nav-text {
		font-size: 12px;
		font-weight: bold;
		margin-top: 8rpx;
	}
</style>
