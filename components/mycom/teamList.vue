<template>
	<view class="eva-section">
		<view class="eva-box" v-for="(v,k) in list" :key="k" @click.stop="toMessageDetails(v.id)">
			<view class="eva-top-left">
				<image class="img" :src="v.memberAvatar" mode="aspectFill"></image>
			</view>
			<view class="eva-content">
				<view class="eva-info uni-flex d-between d-items-center">
					<view class="user-name-list">
						{{v.memberName}}
					</view>
				</view>
					<view class="uni-flex d-between pad">
						<view class="title-nav">本科</view>
					</view>
					<view class="uni-flex d-items-center pad">
						<view class="title-nav">28岁</view><view class="title-nav">182cm</view>
					</view>
				<view class="con uni-two-cut">{{v.content}}</view>
				<view class="link-con uni-flex d-between">
					<view class="">
						
					</view>
					<view class="uni-flex d-items-center">
						<view class="uni-flex d-items-center">
							<image src="/static/img/yulan.png" mode="" class="link-img-yu"></image>
							<view class="link-num">
								{{v.viewCount}}
							</view>
						</view>
						<view class="uni-flex d-items-center" @click.stop="addGoode(v.id,k)">
							<image src="/static/img/dianzan.png" mode="" class="link-img"></image>
							<view class="link-num">
								{{v.likeCount}}
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sxRate from '@/components/sunui-star/sunui-star.vue';
	export default {
		components:{
			sxRate
		},
		props: {
			list: {
				type: Array,
				dafault: []
			},
			type: [Number, String],
			uid:{
				type:String,
				default:''
			}
		},
		methods: {
			toMessageDetails(id) {
				this.$api.navTo(`/pages/goodDetails/teamDetails?id=${id}`);
			},
			gotoSendMessage(e) {
				console.log(e)
				if(this.uid==''){
					this.$api.getCode(getApp().globalData.inverteUid);
				}else{
					let obj = {
						sticky: e.sticky,
						categoryName: e.categoryName,
						name: e.memberName,
						icon: e.memberAvatar,
						shopName:e.shopName,
						publishDate: e.publishDate
					}
					this.$api.navTo(
						`/pages/Previewindo/sendmessage?id=${e.id}&anoid=${e.memberId}&type=1&info=${encodeURIComponent(JSON.stringify(obj))}`)
				}
				
			},
			tellOther(phone) {
				this.$api.callPhone(phone)
			},
			addGoode(id, k) {
				if(this.uid==''){
					this.$api.getCode(getApp().globalData.inverteUid);
				}else{
					let parmas = {
						mid: this.uid,
						infoid: id
					}
					this._reqw
						.ipost(parmas, 'informationLike')
						.then(res => {
							console.log(res);
							res.result == 0 ? this.$emit('click', {
								ind: k,
								type: res.liked
							}) : this.$api.tip(res.resultNote)
						})
						.catch(err => {});
				}
				
			}
		}
	};
</script>

<style scoped lang="scss">
	.user-name-list{
		font-size: 30upx;
	}
	.error-img {
		width: 30upx;
		height: 30upx;
	}

	.eva-item {
		margin-bottom: 20upx;
	}

	.title-nav {
		padding:0 14upx;
		font-size:20upx;
		color:rgba(102,102,102,1);
		background-color: #C1FFC1;
		border-radius: 6upx;
		margin-right: 20upx;
	}
	.pad {
		padding: 10upx 0;
	}

	.top {
		padding: 0 10upx;
		background: rgba(224, 152, 76, 1);
		border-radius: 6upx;
		font-size: 24upx;
		color: rgba(255, 255, 255, 1);
		margin-left: 20upx;
	}

	.eva-active {
		padding: 20upx;
		border-radius: 8upx;
		background-color: #f8f8f8;

	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		margin-bottom: 16upx;

		.e-header {
			display: flex;
			// align-items: center;
			height: 70upx;

			.tit {
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
				color: #666666;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		background-color: #FFFFFF;
		padding:20upx;
		display: flex;
		margin-bottom: 15upx;

		.eva-top-left {
			display: flex;
			padding-right:20upx;
			.img {
				width:130upx;
				height:137upx;
				border-radius:65upx;
			}
		}

		.eva-content {
			flex: 1;
			.eva-info {
				font-size: 30upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}
			.con {
				background-color: #F6F6F6;
				padding: 10upx;
				color: #666666;
			}
		}
	}
</style>
