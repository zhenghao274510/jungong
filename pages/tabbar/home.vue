<template>
	<view class="page-body">
		<banner-swiper :dataList="bannerList"></banner-swiper>
		<notice :dataList="noticeList" type='0'></notice>
		<scoll-x-title :navArr="tabList" type='0' :tabCurrentIndex="tabOneCurrentIndex" @navbarTap="navbarTapOne"></scoll-x-title>
		<scoll-x-title :navArr="navList" type='1' :tabCurrentIndex="tabTwoCurrentIndex" @navbarTap="navbarTapTwo" v-if='tabOneCurrentIndex==1'></scoll-x-title>
		<send-list :list="dataList" type='0' @click='giveLike' :uid="uid"></send-list>
		<uni-load-more :status="status"></uni-load-more>
		<sa-hover-menu></sa-hover-menu>
	</view>
</template>

<script>
	import bannerSwiper from "@/components/home/homeSwiper.vue"
	import notice from '@/components/home/notic.vue'
	import sendList from "@/components/mycom/sendList.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import scollXTitle from "@/components/mycom/scoll-x-title.vue"
	import saHoverMenu from '@/components/sa-hover-menu/sa-hover-menu.vue';
	export default {
		components: {
			bannerSwiper,
			notice,
			sendList,
			uniSearchBar,
			scollXTitle,
			saHoverMenu
		},
		data() {
			return {
				shopName: '定位中...', // 店铺名称
				totalPage: 1,
				page: 1,
				tabOneCurrentIndex: 0,
				tabTwoCurrentIndex: 0,
				tabList: [{
						name: '教官列表'
					},
					{
						name: '教官求职'
					},
					{
						name: '招聘教官'
					},
					{
						name: '招聘消防'
					}
				],
				navList: [{
						name: '教官列表'
					},
					{
						name: '教官求职'
					},
					{
						name: '招聘教官'
					},
					{
						name: '招聘消防'
					}
				],
				point: {
					longitude: '',
					latitude: ''
				},
				status: 'loading',
				uid: '',
				bannerList: [], //   轮播图
				noticeList: [], // 公告
				sid: '', //  店铺id
				dataList: []
			}
		},
		methods: {
			initData() {
				uni.setStorageSync('uid', '3594238f7cdf4f548477c980790eafcb');
				uni.setStorageSync('sid', '5bae173d802e4b028f395c5fb916a73e');
				this.loadData();
				this.getPosition();
			},
			loadMore() {
				console.log('home  页面数据加载更多')
				console.log(this.page, this.totalPage)
				this.status = 'loading';
				this.totalPage > this.page ?
					((this.page += 1), this.status = 'loading', this.getHoteList()) :
					setTimeout(() => {
						this.status = 'noMore';
					}, 30);
			},
			// 获取用户位置信息
			getPosition() {
				this.$api.getLocation(res => {
					this.point = res;
					uni.setStorageSync('point', this.point);
					this.getNearshop();
				});
			},
			navbarTapOne(e) {
				this.tabOneCurrentIndex = e.ind;
			},
			navbarTapTwo(e) {
				this.tabTwoCurrentIndex = e.ind;
			},
			onFocus() {
				uni.hideTabBar();
			},
			onBlur() {
				uni.showTabBar();
			},
			//  附近店铺  ok
			getNearshop() {
				let parmas = {
					mid: this.uid,
					lng: this.point.longitude,
					lat: this.point.latitude
				}
				this._reqw.ipost(parmas, 'shopPage').then(res => {
					console.log(res)
					res.result == 0 ? (res.dataList.length != 0 ? (this.sid = res.dataList[1].id, this.shopName = res.dataList[0].shopName,
						this.getHoteList()
					) : '') : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//首页数据(轮播，公告，分类)
			loadData() {
				let parmas = {
					mid: this.uid,
					sid: this.sid
				}
				this._reqw.ipost(parmas, 'home').then(res => {
					console.log(res)
					res.result == 0 ? (this.noticeList = res.announcementList, this.bannerList =
						res.carouselList) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//   最新发布  ok
			getHoteList() {
				let parmas = {
					mid: this.uid,
					sid: this.sid,
					pageNo: this.page,
					pageSize: '10',
					lng: this.point.longitude,
					lat: this.point.latitude
				}
				this._reqw.ipost(parmas, 'informationPage').then(res => {
					// console.log('homlist'+JSON.stringify(res))
					res.result == 0 ? ((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
						res.dataList.forEach(
							item => {
								this.dataList.push(item)
							})) : this.$api.tip(res.resultNote);
				}).catch(err => {})
			},
			//  点赞   修改数据
			giveLike(e) {
				//状态1点赞  0取消
				console.log(e)
				let n = e.ind,
					type = e.type;
				type == 1 ? (this.dataList[n].likeCount = this.dataList[n].likeCount - 0 + 1, this.$api.tip('点赞成功!')) : (this.dataList[
					n].likeCount = this.dataList[n].likeCount - 1, this.$api.tip('取消点赞成功!'))
			},
			myOptions(ind) {
				if (getApp().globalData.uid == '') {
					this.$api.navTo(`/pages/resgin/index`);
				} else {
					ind == 0 ? this.$api.navTo(`/pages/mineoptions/newSend`) : this.$api.navTo(`/pages/mineoptions/yijian`);
				}
			},
			onConfirm(e) {
				this.$api.navTo(`/pages/Previewindo/infoList?title=${e.value}&type=0`);
			}
		},
	}
</script>

<style scoped lang="scss">
	.page-body {
		margin-top: -240upx;
	}

	.home-btn-con {
		position: fixed;
		right: 30upx;
		bottom: 200upx;
	}

	.send-con {
		width: 134upx;
		height: 134upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2upx 29upx 0px rgba(0, 0, 0, 0.35);
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 30upx;
	}

	.icon-image {
		width: 48upx;
		height: 48upx;
	}

	.icon-title {
		font-size: 24upx;
		color: #00B900;
	}
</style>
