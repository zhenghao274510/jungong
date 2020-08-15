<template>
	<view class="page-body">
		<view class="meMain">
			<view class="mePosition">
				<view class="meMainBox uni-flex d-between d-items-center">
					<view class="meHead">
						<view class="meHeadAvatar" @click.stop="toAuthor">
							<image src="/static/img/lgoo.png" mode="aspectFill" v-if="dataobject.avatar == ''"></image>
							<image :src="dataobject.avatar" mode="aspectFill" v-else></image>
						</view>
						<view class="meHeadName" @click.stop="toAuthor">
							<view class="useInfo">{{ dataobject.nickname }}</view>
							<view class="uni-flex d-items-center" v-if="dataobject.mobile!= ''">
								<image src="/static/img/shouji.png" mode="" class="shouji-phone"></image>
								<view class="phone">{{ dataobject.mobile | fromPhone }}</view>
							</view>
						</view>
					</view>
					<view class="qiandao-btn" @click.stop="hasQianDao">
						{{dataobject.islising==0?'签到':'已签到'}}
					</view>
				</view>
			</view>
		</view>
		<view class="meOverBgOne">
			<mine-order-list @click="onClick" :dataObj="dataobject"></mine-order-list>
		</view>
		<view class="meOverBgOne">
			<mine-servce-list @click="gotoOther"></mine-servce-list>
		</view>
		<qiandao :list="list" :date="date" @day_change="day_change_fun" @date_change="date_change_fun" ref="qiandao"></qiandao>
	</view>
</template>

<script>
	import mineOrderList from '@/components/mycom/mine-order-list.vue';
	import mineServceList from '@/components/mycom/mine-servce-list.vue';
	import qiandao from "@/components/qian-dao/qian-dao.vue"
	export default {
		components: {
			mineOrderList,
			mineServceList,
			qiandao
		},
		data() {
			return {
				uid: '',
				date: "",
				list: ["2020-05-10", "03-15", "20", "31"], // 已经签到的数据列表
				dataobject: {
					nickname: "点击登录", //昵称
					avatar: "", //头像
					mobile: "", //手机号
					userPoints: "", //积分
					poster: "", //海报背景图
					phone: "", //平台电话
					wechatCode: "", //平台微信二维码
					islising: 0
				}
			};
		},
		methods: {
			hasQianDao() {
				if (this.dataobject.islising == 0) {
					this.$refs.qiandao.open();
				} else {
					this.$api.tip('今天已签到!')
				}
			},
			// 点击
			day_change_fun(day) {
				console.log(day);
				// 如果没有签到（可以补签）
				// if (!day.click) {
				//  this.list.push(day.r);
				// }
				// 如果今天没有签到(只签到今天的)
				if (!day.click && day.type == "today") {
					this.list.push(day.r);
				}
			},
			initData() {
				if (uni.getStorageSync('uid')) {
					this.uid = uni.getStorageSync('uid');
				}
				if (this.uid != '') {
					this.loadDate();
				}
			},
			loadDate() {

				let parmas = {
					mid: this.uid
				};
				this._reqw
					.ipost(parmas, 'info')
					.then(res => {
						console.log(res);
						res.result == 0 ? this.dataobject = res : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			onClick(e) {
				console.log(e);
				if (this.uid == '') {

				} else {
					let url = '';
					e == 4 ? (url = '/pages/order/tuiorder') : ((e == 5 ? e = 0 : e), url = `/pages/order/order?id=${e}`);
					this.$api.navTo(url);
				}
			},
			gotoOther(e) {
				console.log(e);

				switch (e) {
					case 0:
						this.$api.navTo(`/pages/mineoptions/myvideo`);
						break;
					case 1:
						this.$api.navTo(`/pages/mineoptions/myjifen?userPoints=${this.dataobject.userPoints}`);
						break;
					case 2:
						this.$api.navTo('/pages/mineoptions/myTeam');
						break;
					case 3:
						this.$api.navTo(`/pages/mineoptions/myEnterprise`);
						break;
					case 4:
						this.$api.navTo(`/pages/mineoptions/myStore`);
						break;
					case 5:
						this.$api.navTo(
							`/pages/mineoptions/callwe?phone=${this.dataobject.phone}&wechatCode=${this.dataobject.wechatCode}`);
						break;
					case 6:
						this.$api.navTo('/pages/mineoptions/address?source=0');
						break;
					case 7:
						this.$api.navTo('/pages/mineoptions/webView?type=about&title=关于我们');
						break;
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.vip-name {
		font-size: 22upx;
		color: rgba(51, 51, 51, 1);
	}

	.vip-img {
		width: 28upx;
		height: 25upx;
		margin-right: 20upx;
	}

	.shouji-phone {
		width: 21upx;
		height: 25upx;
		margin-right: 20upx;
	}

	.phone {
		color: #FFFFFF;
		font-size: 24upx;
	}

	.qiandao-btn {
		background-color:#005A00;
		color: #FFFFFF;
		font-size: 26upx;
		padding: 4upx 10upx;
		line-height: 40upx;
		box-shadow: 0px 5upx 15upx 0px rgba(224, 152, 76, 0.2);
		border-radius: 10upx;
	}

	.useInfo {
		text-align: left;
		color: #FFFFFF;
	}

	.meMain {
		width: 100%;
		padding: 30upx 0;
		position: relative;
	}

	.meMain>image {
		width: 100%;
		height: 280upx;
		display: block;
	}

	.meMainBox {
		width: 92%;
		margin: 0 auto;
	}

	.mePosition {
		width: 100%;
	}

	.meHead {
		overflow: hidden;
		position: relative;
		padding: 20upx 0 0 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.meHeadAvatar {
		margin-top: 10upx;
	}

	.meHeadAvatar image {
		width: 110upx;
		height: 110upx;
		display: block;
		border-radius: 50%;
	}

	.meHeadName {
		color: #ffffff;
		font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		margin-left: 10upx;
		flex: 1;
	}

	.meOverBgOne {
		width: calc(100% - 40upx);
		margin: 0 auto 43upx;
		background-color: #ffffff;
		border-radius: 6upx;
		z-index: 19;
	}

	.page-body {
		margin-top:-260upx;
		display: flex;
		flex-direction: column;
	}
</style>
