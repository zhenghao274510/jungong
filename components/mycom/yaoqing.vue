<template>
	<view class="mask" v-if="showPicker" @tap.stop="hidden">
		<view class="content animated" :class="animate" @click.stop>
			<view class="list-con">
				<view class="d-flex d-between d-items-center d-border">
					<input type="number" class="reg-input uni-flex-item" placeholder="请输入用户姓名" placeholder-style="color:#999999"
					 v-model="phone" />
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<input type="text" value="" class="reg-input uni-flex-item" placeholder="请输入用户联系方式" placeholder-style="color:#999999"
					 v-model="inverteCode" />
				</view>
				<view class="login-tip">
					只可邀请已在平台注册的个人用户
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<textarea value="" placeholder="添加备注信息" placeholder-class="placeholder" class="testarea" />
					</view>
			</view>
			<view class="reg-btn" hover-class="btnHover" @click="subOrder">完 成</view>
		</view>
	</view>

</template>
<script>
	export default {
		data() {
			return {
				phone: '',
				rTime: '获取验证码',
				interval: null,
				btnState: false,
				YZM: '',
				code: '',
				inverteCode: '',
				uid: '',
				showBind: true,
				showPicker: false,
				animate: ''
			};
		},
		onLoad() {},
		methods: {
			open() {
				this.animate = 'fadeIn';
				this.showPicker = true;
			},
			hidden() {
				this.animate = "fadeOut";
				setTimeout(() => {
					this.showPicker = false;
				}, 500)
			},
			subOrder() {
                 this.hidden();
			}
		}
	};
</script>
<style>
	page {
		background-color: #FFFFFF;
	}
</style>

<style lang="scss" scoped>
	.login-tip {
		width: 100%;
		line-height: 70upx;
		text-align: center;
		color: #00B900;
		font-size: 24upx;
		background: rgba(225, 255, 225, 1);
		border-radius: 6upx
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .7);
		z-index: 999;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width:94%;
		box-sizing: border-box;
		border-radius: 30upx;
		background-color: #FFFFFF;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.d-border {
		position: relative;
		padding:20upx 0;
	}

	.list-con {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
    .testarea{
		height: 160upx;
		padding: 20upx;
		background: #F6F6F6;
		border-radius: 6upx;
	}
	.placeholder{
		font-size: 24upx;
		color: #666;
	}
	
	.reg-input {
		padding-left: 50upx;
		background: #F6F6F6;
		height: 70upx;
		line-height: 70upx;
	}

	.y-z-m {
		font-weight: 500;
		color: #2DBEFF;
		position: relative;
	}

	.y-z-m::before {
		content: '';
		width: 2upx;
		height: 22upx;
		background-color: #e7e7e7;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: -30upx;
	}

	.reg-btn {
		width: 85%;
		height: 88upx;
		background: rgba(0, 185, 0, 1);
		box-shadow: 0px 5upx 16upx 0px rgba(253, 85, 85, 0.3);
		border-radius: 10upx;
		margin:30upx auto;
		text-align: center;
		line-height: 88upx;
		color: #ffffff;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
