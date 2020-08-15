<template>
	<view class="page-body">
		<view class="search-con uni-flex d-items-center d-between">
			<uni-search-bar style="width: 100%;" type="0" @confirm='onConfirm' @focus="onFocus" @blur="onBlur" bgColor="#F2F2F2"></uni-search-bar>
			<image src="/static/img/add.png" class="add-image" @click="toSend"></image>
		</view>
		<banner-swiper :dataList="bannerList" :show="0"></banner-swiper>

		<view class="tab-con uni-flex d-items-center">
			<view class="tab-item" :class="[{'tab-active':tabIndex==k},'item'+k]" v-for="(v,k) in navsList" :key="k" @click="tabNavClick(v,k)">
				{{v.name}}
			</view>
		</view>
		<share-list :list="dataList" type='0' @click='giveLike' v-if="tabIndex==0"></share-list>
		<video-list :list="dataList" type='0' @click='giveLike' v-if="tabIndex==1"></video-list>
		<share-list :list="dataList" type='1' @click='giveLike' v-if="tabIndex==2"></share-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import videoList from "@/components/mycom/videoList.vue"
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import shareList from "@/components/mycom/shareList.vue"
	export default {
		components: {
			bannerSwiper,
			videoList,
			uniSearchBar,
			shareList
		},
		data() {
			return {
				totalPage: 1,
				page: 1,
				tabIndex: 0,
				status: 'loading',
				uid: '',
				bannerList: [], //   轮播图
				navsList: [{
						name: '教官分享'
					},
					{
						name: '爱国教育视频'
					},
					{
						name: '学习资源'
					}
				],
				dataList: []
			}
		},
		methods: {
			initData() {
				uni.setStorageSync('uid', '3594238f7cdf4f548477c980790eafcb');
				uni.setStorageSync('sid', '964567f46b51448793f299f57a33e363');
				this.loadData();
				this.getPosition();
			},
			tabNavClick(v,k){
				this.tabIndex=k;
			},
			toSend() {
				this.$api.navTo(`/pages/mineoptions/sendVideo`);
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
	.add-image {
		width: 43upx;
		height: 43upx;
		margin-left:30upx;
		z-index: 19;
	}
	.search-con {
		padding: 10upx 30upx;
		background-color: #FFFFFF;
	}
	.tab-con {
		padding: 45upx 30upx;
	}
	.page-body {
		margin-top: -230upx;
	}
	.tab-active {
		background: linear-gradient(250deg, rgba(0, 185, 0, 1), rgba(0, 146, 0, 1));
		color: #FFFFFF !important;
		// border: none;
	}
	.item0 {
		border: 1upx solid #00B900;
		border-radius:5upx 0px 0px 5upx;
	}
	.item1 {
		border-top: 1upx solid #00B900;
		border-bottom: 1upx solid #00B900;
	}
	.item2 {
		border: 1upx solid #00B900;
		border-radius:0px 5upx 5upx 0px;
	}
	.tab-item {
		flex: 1;
		line-height: 80upx;
		text-align: center;

		box-sizing: border-box;
		color: #00B900;
	}
</style>
