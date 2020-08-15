<template>
	<view class="content">
			<view class="list-con">
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/login/phone.png" mode="" class="reg-img"></image>
					<input type="number" class="reg-input" placeholder="请输入手机号" placeholder-style="color:#999999" v-model="phone" />
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/login/yanzhengma.png" mode="" class="reg-img"></image>
					<input type="number" value="" class="reg-input" placeholder="短信验证码" placeholder-style="color:#999999" v-model="YZM" />
					<text class="y-z-m" @click="getYZM">
						{{ rTime }}
						<text v-if="btnState">s后重发</text>
					</text>
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/login/mima.png" mode="" class="reg-img"></image>
					<input type="text" value="" class="reg-input" placeholder="请输入新的密码" placeholder-style="color:#999999" v-model="inverteCode" />
				</view>
				<view class="login-tip">
					密码长度为8-32位，须包含数字、字母
				</view>
				<view class="d-flex d-between d-items-center d-border">
					<image src="/static/login/mima.png" mode="" class="reg-img"></image>
					<input type="text" value="" class="reg-input" placeholder="确认新密码" placeholder-style="color:#999999" v-model="inverteCode" />
				</view>
			</view>
			<view class="reg-btn" hover-class="btnHover" @click="subOrder">完 成</view>
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
				showBind: true
			};
		},
		onLoad() {
		},
		methods: {
			getYZM() {
				if (this.phone == '') {
					this.$api.tip('手机号不能为空!');
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!');
				} else {
					if (this.rTime == '获取验证码') {
						this.rTime = 60;
						this.btnState = true;
						this.interval = setInterval(() => {
							if (--this.rTime <= 0) {
								this.rTime = '获取验证码';
								clearInterval(this.interval);
								this.btnState = false;
							}
						}, 1000);
						let parmas = {
							phoneNum: this.phone
						};
						this._reqw
							.ipost(parmas, 'sendSmsCode')
							.then(res => {
								res.result == 0 ? ((this.Code = res.code), this.$api.tip(res.resultNote)) : this.$api.tip(res.resultNote);
							})
							.catch(err => {});
					}
				}
			},
			subOrder() {
				uni.showLoading({
					title: '登录中...'
				});
				// let Y = this.YZM.trim();
				if (this.phone == '') {
					this.$api.tip('手机号不能为空!');
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!');
				} else if (this.YZM == '') {
					this.$api.tip('请输入验证码');
				} else {
					let parmas = {
						phone: this.phone,
						uid: getApp().globalData.uid,
						code: this.YZM,
						inverteCode: this.inverteCode
					};
					console.log(parmas);
					this._reqw
						.ipost(parmas, 'bindPhone')
						.then(res => {
							res.result == 0 ?
								(uni.hideLoading(),
									this.$api.tip(res.resultNote),
									(getApp().globalData.uid = this.uid),
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/tabbar/home'
										});
									}, 300)) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				}
			}
		},
		onHide() {
			if (this.interval) {
				clearInterval(this.interval);
			}
		}
	};
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>

<style lang="scss" scoped>
	.login-tip{
		width:100%;
		line-height:70upx;
		text-align: center;
		color:#00B900;
		font-size: 24upx;
		background:rgba(225,255,225,1);
		border-radius:6upx
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.d-border {
		position: relative;
		border-bottom: 2upx solid #f2f2f2;
		padding:60upx 0;
	}
	.list-con{
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.reg-img {
		width: 25upx;
		height: 31upx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.reg-input {
		padding-left: 50upx;
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
		background:rgba(0,185,0,1);
		box-shadow:0px 5upx 16upx 0px rgba(253,85,85,0.3);
		border-radius: 10upx;
		margin: 160upx auto 0;
		text-align: center;
		line-height: 88upx;
		color: #ffffff;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
