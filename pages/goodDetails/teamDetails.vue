<template>
	<view class="eva-section pad-page">
		<view class="eva-box">
			<view class="eva-content">
				<view class="uni-flex">
					<view class="eva-top-left">
						<image class="img" :src="dataobject.memberAvatar" mode="aspectFill"></image>
					</view>
					<view class="eva-info uni-flex-item">
						<view class="uni-flex d-between d-items-center">
							<view class="">
								{{dataobject.memberName}}
							</view>
							<view class="time">
								发布时间:{{dataobject.publishDate}}
							</view>
						</view>
						<view class="uni-flex d-between pad">
							<view class="title-nav">本科</view>
						</view>
						<view class="uni-flex d-items-center pad">
							<view class="title-nav">28岁</view>
							<view class="title-nav">182cm</view>
						</view>
						<view class="con">
							<view class="">
								{{dataobject.content}}
							</view>
						</view>
					</view>
				</view>
				<view class="link-con uni-flex d-between">
					<view class="">

					</view>
					<view class="uni-flex d-items-center">
						<view class="uni-flex d-items-center">
							<image src="/static/img/yulan.png" mode="" class="link-img"></image>
							<view class="link-num">
								{{dataobject.viewCount}}
							</view>
						</view>
						<view class="uni-flex d-items-center" @click.stop="giveLike">
							<image src="/static/img/dianzan.png" mode="" class="link-img"></image>
							<view class="link-num">
								{{dataobject.likeCount}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="phone-con  uni-flex d-items-center d-between">
			<view class="uni-flex-item time">
				联系电话：**********
			</view>
			<button type="primary" size="mini">拨打电话</button>
		</view>
		<view class="team-title">
			团员列表
		</view>

		<team-members :list="dataList"></team-members>


		<message-goods-nav v-if="userWrite" @click='onClick' @buttonClick='buttonClick' :collect="dataobject.collected"></message-goods-nav>
		<pin-lun-btn v-else @click='sendmessage'></pin-lun-btn>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import messageGoodsNav from "@/components/message-goods-nav/message-goods-nav.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import pinLunBtn from "@/components/mycom/pinlinbtn.vue"
	import teamMembers from "@/components/mycom/teamMembers.vue"
	export default {
		components: {
			uniLoadMore,
			pinLunBtn,
			messageGoodsNav,
			teamMembers
		},
		data() {
			return {
				status: 'loading',
				userWrite: true,
				uid: '',
				id: '',
				showSelfMessage: true, //   是否显示 私信   个人发布不显示
				dataobject: {
					memberId: "", //发布人id 私信时传此id
					memberName: "", //发布人名称
					memberAvatar: "", //发布人头像
					categoryName: "", //分类名称
					publishDate: "", //发布日期
					houseType: "", //房产类型1.新房，2.二手房，3.房屋租赁，4.店铺转让
					houseLayoutName: "", //户型
					acreage: "", //房产面积
					price: "", //房产价格
					jobRecruit: "", //1.求职，2.招聘
					salary: "", //薪资
					carType: "", //1.新车，2.二手车，3.汽车服务
					items: [], //顶部选项
					label: [], //下部标签项
					title: "", //标题（岗位描述或车辆信息）
					content: "", //内容
					image: [], //图片
					name: "", //名称
					phone: "", //电话
					location: "", //地址
					distance: "", //距离
					sticky: "", //是否置顶 1是，0否
					viewCount: "", //浏览数量
					likeCount: "", //点赞数量
					commentCount: "", //评论数量
					collected: "" //是否已收藏，1是0否
				},
				evaList: []
			}
		},
		onLoad(options) {
			this.id = options.id;
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid');
			}
			this.loadData();
			this.getEavList();
		},
		watch: {
			dataobject: {
				handler(n) {
					if (n.memberId == this.uid) {
						this.showSelfMessage = false;
					}
				}
			}
		},
		methods: {
			share() {
				if (this.$wechat.isWechat()) {
					this.$wechat.wxShare(`${bassUrl}/h5/#/pages/goodDetails/senddetails?id=${this.id}&inverteUid=${this.uid}`);
				}
			},
			loadData() {
				let parmas = {
					mid: this.uid,
					infoid: this.id
				}
				this._reqw
					.ipost(parmas, 'informationDetail')
					.then(res => {
						console.log(res);
						res.result == 0 ? (this.dataobject = res, this.status = 'noMore', this.share()) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			ImgDetails(n) {
				uni.previewImage({
					urls: this.dataobject.image,
					current: this.dataobject.image[n]
				})
			},
			//  拨打电话
			callPhone() {
				console.log('拨打电话')
				this.$api.callPhone(this.dataobject.phone);
			},
			//  底部操作栏
			onClick(e) {
				if (e.index == 0) {
					let sendsInfo = {
						nickName: this.dataobject.memberName,
						image: this.dataobject.image[0],
						memberAvatar: this.dataobject.memberAvatar,
						title: this.dataobject.categoryName
					}
					this.$api.navTo(`/pages/poster/sh-info-poster?sendInfo=${JSON.stringify(sendsInfo)}&id=${this.id}`)
					// this.$refs.hidePounp.open();
				} else {
					this.collect();
				}
			},
			buttonClick(e) {
				this.userWrite = false;
			},
			// 发布评论
			sendmessage(e) {
				console.log(e);
				if (this.uid == '') {
					this.$api.getCode(getApp().globalData.inverteUid);
				} else {
					let parmas = {
						mid: this.uid,
						infoid: this.id,
						content: e
					}
					this._reqw
						.ipost(parmas, 'addInformationComment')
						.then(res => {
							console.log(res);
							res.result == 0 ? (this.$api.tip('评论成功!'), this.userWrite = true, this.getEavList()) : this.$api.tip(res.resultNote)
						})
						.catch(err => {});
				}

			},
			//  点赞   修改数据
			giveLike() {
				if (this.uid == '') {
					this.$api.getCode(getApp().globalData.inverteUid);
				} else {
					let parmas = {
						mid: this.uid,
						infoid: this.id
					}
					this._reqw
						.ipost(parmas, 'informationLike')
						.then(res => {
							console.log(res);
							res.result == 0 ? this.changLikeNum(res) : this.$api.tip(res.resultNote)
						})
						.catch(err => {});
				}

			},
			changLikeNum(r) {
				//状态1点赞  0取消
				r.liked == 1 ? (this.dataobject.likeCount = this.dataobject.likeCount - 0 + 1, this.$api.tip('点赞成功!')) : (this.dataobject
					.likeCount = this.dataobject.likeCount - 1, this.$api.tip('取消点赞成功!'))
			},
			getEavList() {
				let parmas = {
					infoid: this.id,
					page: 1,
					pageSize: '2'
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'informationCommentPage')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							this.evaList = res.dataList : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			//  收藏
			collect() {
				if (this.uid == '') {
					this.$api.getCode(getApp().globalData.inverteUid);
				} else {
					let text = '';
					let parmas = {
						infoid: this.id,
						mid: this.uid
					}
					this._reqw.ipost(parmas, 'informationCollect').then(res => {
						res.result == 0 ? (this.dataobject.collected == 0 ? (this.dataobject.collected = 1, text = "收藏") : (this.dataobject
							.collected =
							0,
							text = '取消'), this.$api.tip(`${text}成功!`)) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}

			}
		}
	};
</script>

<style scoped lang="scss">
	.phone-con {
		padding: 20upx 30upx;
		background-color: #FFFFFF;
	}

	.lable-top {
		font-size: 32upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 30upx;
	}

	.info-content {
		padding: 0 20upx 30upx;
		border-bottom: 1px solid rgba(242, 242, 242, 1);
		position: relative;
		background-color: #FFFFFF;
	}

	.tip-price {
		padding: 30upx 40upx;
		background-color: #F6F6F6;
		border-radius: 6upx;

		.tip-con {
			width: 60%;
			flex-wrap: wrap;
			color: #666666;
			font-size: 26upx;
		}

		.tip-scole {
			font-size: 26upx;
			color: #E0984C;
		}
	}

	.pad-page {
		padding-bottom: 100upx;
	}

	//   头部信息
	.eva-item {
		margin-bottom: 20upx;
	}

	.title-nav {
		padding: 0 14upx;
		font-size: 20upx;
		color: rgba(102, 102, 102, 1);
		background-color: #C1FFC1;
		border-radius: 6upx;
		margin-right: 20upx;
	}

	.tapTargetOne {
		background-color: #09BB07 !important;
		color: #FFFFFF !important;
	}

	.tapTargetTwo {
		background-color: #ff0000 !important;
		color: #FFFFFF !important;
	}

	.tapTargetThree {
		background-color: #ff5500 !important;
		color: #FFFFFF !important;
	}

	.link-text {
		font-size: 22upx;
		color: #666666;
	}

	.phone-img {
		width: 35upx;
		height: 42upx;
		margin-right: 6upx;
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

	.eva-section {
		display: flex;
		flex-direction: column;

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
		padding: 30upx 30upx 0 30upx;
		display: flex;

		.eva-top-left {
			display: flex;

			.img {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				margin-right: 20upx;
			}
		}

		.eva-content {
			width: 100%;

			.eva-info {
				font-size: 30upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}

			.time {
				color: #999999;
				font-size: 22upx;
			}

			.con {
				background-color: #F6F6F6;
				padding: 10upx;
				font-size: 24upx;
				margin-top: 20upx;
			}

			.eva-img-con {
				padding: 20upx 0;
				border-bottom: 1px solid #F2F2F2;

				.img {
					width: 100%;
					height: 200upx;
				}
			}
		}
	}

	.team-title {
		padding: 30upx;
		font-size:30upx;
		font-weight:bold;
		color:rgba(64,64,64,1);
	}
</style>
