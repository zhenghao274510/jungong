<template>
	<view class="content">
		<view class="shouyi-top">
			<view>
				<view class="shouyi-two">
					我的积分
				</view>
				<view class="shouyi-one">
					{{userPoints}}
				</view>
			</view>
			<navigator class="jifen-direct" hover-class="btn-hover" :url="`/pages/mineoptions/webView?type=userPoints&title=积分获取`"> 积分获取</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPoints: '',
			}
		},
		onLoad(options) {
			this.userPoints = options.userPoints;
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;

		.shouyi-top {
			display: flex;
			margin:30upx auto;
			width:calc(100% - 40upx);
			height: 246upx;
			justify-content: space-between;
			align-items: center;
			border-radius: 20upx;
			background:url('@~static/img/jifenbg.png');
			background-size: 100% 100%;
			.shouyi-one {
				color: #fff;
				padding-left: 60upx;
				font-size: 70upx;
			}

			.shouyi-two {
				font-size:28upx;
				color: #fff;
				padding-left: 60upx;
			}
			.jifen-direct{
				width:200upx;
				height:70upx;
				background:rgba(172,141,111,1);
				border-radius:33upx;
				color: #FFFFFF;
				text-align: center;
				line-height:70upx;
				margin-right: 30upx;
			}
		}
	}
</style>
