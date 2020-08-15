<template>
	<view class="content">
		<image class="logo" src="/static/notFound.png"></image>
		<view class="" v-if="showBind" style="width: 100%;">
			<view class="list-con">
				<view class="uni-flex d-between d-items-center d-border">
					<image src="/static/login/phone.png" mode="" class="reg-img"></image>
					<input type="text" class="reg-input" placeholder="请输入账号" placeholder-style="color:#999999" v-model="phone" />
				</view>
				<view class="uni-flex d-between d-items-center d-border">
					<image src="/static/login/mima.png" mode="" class="reg-img"></image>
					<input type="number" value="" class="reg-input" placeholder="请输入密码" placeholder-style="color:#999999" v-model="inverteCode" />
				</view>
			</view>
		</view>
		
		<view class="reg-btn reg-btn-one" hover-class="btn-hover" @click="subOrder(0)">登录</view>
		<view class="reg-btn reg-btn-two" hover-class="btn-hover" @click="subOrder(1)">游客登陆</view>
		<view class="login-tip-con uni-flex d-between d-items-center ">
			<navigator url="/pages/resgin/resgin" class="">
				用户注册
			</navigator>
			<navigator url="/pages/mineoptions/fondPwd" class="login-tip">
				忘记密码 <image src="/static/login/wenti.png" class="wentiIcon"></image>
			</navigator>
		</view>
	</view>
</template>
<script>
	import pageHeade from "@/components/mycom/pageHeader.vue"
	export default {
		components:{
			pageHeade
		},
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
				type: ''
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
								res.result == 0 ? (this.$api.tip(res.resultNote)) : this.$api.tip(res.resultNote);
							})
							.catch(err => {});
					}
				}
			},
			toHome() {
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/tabbar/home'
					})
				}, 300)
			},
			subOrder(ind){
				ind==0?this.login():this.$api.reLaunch(`/pages/index/index`);
			},
			login(ind) {
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
						uid: this.uid,
						code: this.YZM,
						inverteCode: this.inverteCode
					};
					console.log(parmas);
					this._reqw
						.ipost(parmas, 'bindPhone')
						.then(res => {
							res.result == 0 ?
								(uni.hideLoading(),
									this.$api.tip(res.resultNote), getApp().globalData.uid = this.uid, uni.setStorageSync('uid', this.uid),
									this.toHome()) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				}
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
	.list-con {
		padding: 0 60rpx;
	}
	.login-tip-con{
		padding:30upx 0;
		width:600upx;
		margin: 0 auto;
		box-sizing: border-box;
		overflow: hidden;
	}
	.wentiIcon{
		width:30upx;
		height:30upx;
		margin: 0 30upx;
	}
	.login-tip{
		color:#005A00;
		float: right;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.logo {
		width:214upx;
		height:214upx;
		border-radius:40upx;
		margin: 100rpx auto;
	}

	.d-border {
		position: relative;
		border-bottom: 1px solid #f2f2f2;
		padding: 40upx 0;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.reg-img {
		width: 30upx;
		height: 32upx;
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
		color: rgba(255, 144, 0, 1);
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
	
	.reg-btn-one{
		background:rgba(0,185,0,1);
		box-shadow:0px 5upx 16upx 0px #005A00;
		color:rgba(255,255,255,1);
	}
	.reg-btn-two{
		color: #005A00;
		border:1upx solid rgba(0,185,0,1);
	}

	.reg-btn {
		width:600upx;
		line-height:88upx;
		text-align: center;
		border-radius:10upx;
		font-size:32upx;
		margin-top: 50upx;
		
	}
</style>
