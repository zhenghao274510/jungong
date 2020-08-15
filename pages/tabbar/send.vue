<template>
	<view class="page-body">
		<banner-swiper :dataList="bannerList" :show="0"></banner-swiper>
		<view class="list-con">
			<send-list :list="dataList" type='0' @click='giveLike'></send-list>
		</view>

		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import sendList from "@/components/mycom/sendList.vue"
	export default {
		components: {
			bannerSwiper,
			sendList
		},
		data() {
			return {
				shopName: '定位中...', // 店铺名称
				totalPage: 1,
				page: 1,
				point: {
					longitude: '',
					latitude: ''
				},
				status: 'loading',
				uid: '',
				bannerList: [], //   轮播图
				noticeList: [], // 公告
				sid: '', //  店铺id
				navsList: [],
				dataList: []
			}
		},
		methods: {
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
			initData() {
				uni.setStorageSync('uid', '3594238f7cdf4f548477c980790eafcb');
				uni.setStorageSync('sid', '964567f46b51448793f299f57a33e363');
				this.loadData();
				this.getPosition();
			},
			// 获取用户位置信息
			getPosition() {
				this.$api.getLocation(res => {
					this.point = res;
					uni.setStorageSync('point', this.point);
					this.getNearshop();
				});
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
					res.result == 0 ? (this.noticeList = res.announcementList, this.navsList = res.informationCategoryList, this.bannerList =
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
			onConfirm(e) {
				this.$api.navTo(`/pages/Previewindo/infoList?title=${e.value}&type=0`);
			}
		},
	}
</script>

<style scoped lang="scss">
	.page-body {
		margin-top: -200upx;
	}

	.list-con {
		margin-top: 20upx;
	}
</style>
