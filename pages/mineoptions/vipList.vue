<template>
	<view class="content">
		<notice :dataList="noticeList" type='1'></notice>
		<view class="vip-con">
			<view class="vip-item uni-flex" v-if="vipType!=1">
				<image src="/static/img/vip_bg.png" mode="" class="vip-img"></image>
				<view class="uni-flex-item">
					<view class="vip-title">
						会员权益
					</view>
					<view class="uni-flex d-items-center d-between">
						<view class="vip-time">
							截止日期：{{vipDate}}
						</view>
						<view class="vip-go" hover-class="btn-hover" @click.stop='gotoPay'>
							点击续费
						</view>
					</view>
				</view>
			</view>
			<navigator class="vip-item uni-flex" url='/pages/mineoptions/vipclass' v-else>
				<image src="/static/img/vip_bg.png" mode="" class="vip-img"></image>
				<view class="uni-flex-item">
					<view class="vip-title">
						VIP会员
					</view>
					<view class="uni-flex d-items-center d-between">
						<view class="vip-time">
							每天可免费发送3条信息
						</view>
						<view class="vip-go" hover-class="btn-hover">
							成为VIP会员
						</view>
					</view>
				</view>
			</navigator>
			<navigator class="vip-item uni-flex" url='/pages/mineoptions/vipclass' v-if="vipType!=3">
				<view class="vip-img">
				</view>
				<view class="uni-flex-item">
					<view class="vip-bg-title">
						SVIP会员
					</view>
					<view class="vip-time">
						每天信息数无限制
					</view>
					<view class="vip-bg-title">
						成为SVIP会员
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import notice from '@/components/home/notic.vue'
	export default {
		components: {
			notice
		},
		data() {
			return {
				noticeList: [],
				vipDate: '',
				vipType:'',
				uid:''
			}
		},
		onLoad(options) {
			this.vipType = options.vipType;
			if(this.vipType ==1){
				this.noticeList = [{
					title: "您还不是VIP会员,每天可免费发送1条信息"
				}]
			}else if(this.vipType ==2){
				this.noticeList = [{
					title: "您是VIP会员,每天可免费发送3条信息"
				}]
			}else{
				this.noticeList = [{
					title: "您是SVIP会员,每天信息数无限制"
				}]
			}
			if (options.vipDate) {
				this.vipDate = options.vipDate;
			}
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
		},
		methods: {
			gotoPay(){
				let  type=this.vipType-1;
				let parmas = {
					mid:this.uid,
					vipType:type
				}
				this._reqw.ipost(parmas,'payVIP').then(res => {
					res.result == 0 ?this.$api.onBridgeReady(res,'vip') : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #FFFFFF;
	}

	.vip-con {
		padding: 30upx 20upx;

		.vip-item {
			height: 249upx;
			margin-bottom: 20upx;
			padding: 40upx;
			box-sizing: border-box;
			background: url('@~static/img/huiyuanbg.png');
			background-size: 100% 100%;

			.vip-img {
				width: 34upx;
				height: 30upx;
				margin: 10upx 20upx 0 0;
			}

			.vip-title,
			.vip-bg-title {
				font-size: 32upx;
				font-weight: bold;
				color: rgba(251, 254, 254, 1);
			}

			.vip-title {
				padding-bottom: 42upx;
			}

			.vip-time {
				font-size: 20upx;
				color: rgba(255, 255, 255, 1);
			}

			.vip-go {
				font-size: 26upx;
				color: rgba(255, 255, 255, 1);
				line-height: 37upx;
			}
		}
	}
</style>
