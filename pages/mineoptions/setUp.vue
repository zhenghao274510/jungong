<template>
	<view class="contain">
		<view class="box">
			<view class="list-item" style="height:80px;">
				<span>修改头像</span>
				<view class="modify_right" @click="onRead">
					<image :src="dataobject.icon" alt style="border-radius: 50%;" v-if="dataobject.icon!=''" />
				</view>
			</view>
			<view class="list-item">
				<span>昵称</span>
				<view class="modify_right">
					<input type="text" placeholder="请输入昵称" v-model="dataobject.nickname" />
					<view class="iconfont icon-zuojiantou">
					</view>
				</view>
			</view>
			<view class="btn" @click="subChange(1)" hover-class="btn-hover">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataobject: {
					phone: '', //手机号
					nickname: '点击登录', //昵称
					icon: '' //头
				},
			};
		},
		onLoad() {
			// this.loadDate()
		},
		methods: {
			onRead() {
				let _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album", "camera"],
					success(result) {
						// tempFilePath可以作为img标签的src属性显示图片
						console.log(result);
						_this._reqw.iupfile(result.tempFiles[0],'uploadFile').then(res => {
							console.log(res)
							let r = JSON.parse(res)
							r.result == 0 ? (_this.dataobject.icon=r.datastr, _this.subChange(0)) : _this.$api
								.tip(r.resultNote)
						}).catch(res => {});
					}
				});
			},
			loadDate() {
				let parmas = {
					cmd: 'userinfo',
					uid: getApp().globalData.uid
				};
				this._reqw
					.ipost(parmas, 'userInfo')
					.then(res => {
						console.log(res);
						if (res.result == 0) {
							this.dataobject = res.dataobject;
						} else {
							this.$api.tip(res.resultNote);
						}

					})
					.catch(err => {});
			},
			subChange(n) {
				let parmas = {
					cmd: 'edituserInfo',
					uid: getApp().globalData.uid,
					icon: this.dataobject.icon,
					nickName: this.dataobject.nickname,
					sex: this.dataobject.sex
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.$api.tip("修改成功!"), n == 1 ? this.$api.back() : this.loadDate()) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			}
		}


	}
</script>

<style scoped lang="scss">
	.sex-con {
		width: 30%;
	}

	.contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;

			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #333;
				background: #FFFFFF;
				padding: 20upx;
				margin-top: 10upx;

				.modify_right {
					display: flex;
					justify-content: space-between;
					align-items: center;

					image {
						width: 80upx;
						height: 80upx;
					}

					input {
						text-align: right;
						background: #fff;
					}
				}
			}
		}

		.btn {
			width: 656upx;
			height: 88upx;
			background: rgba(254, 80, 99, 1);
			box-shadow: 0px 4upx 9upx 0px rgba(254, 99, 80, 0.35);
			border-radius: 10upx;
			margin: 61upx auto;
			line-height: 88upx;
			text-align: center;
			color: #FFFFFF;
			font-size: 36upx;
		}
	}
</style>
