<template>
	<view class="page-body">
		<view class="uni-flex d-items-center top-search">
			<view class="uni-flex-item">
				<uni-search-bar bgColor="#F2F2F2" type='1'></uni-search-bar>
			</view>
			<view @click="toAuthor" style="z-index: 19;">
				<image src="/static/img/shopmessage.png" class="message-img"></image>
			</view>
		</view>
		<banner-swiper :dataList="bannerList" type="1"></banner-swiper>
		<navs :dataList="navsList" type='1'></navs>
		<!-- 会员专区 -->
		<home-scoll-x :text="vipTitle" :list="specialList" :uid="uid"></home-scoll-x>
		<home-list :dataList='hoteList' type='0' :uid="uid"></home-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import homeList from "@/components/mycom/homeList.vue"
	import navs from "@/components/home/navs.vue"
	import homeScollX from "@/components/home/scroll-view-x.vue"
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			homeList,
			bannerSwiper,
			uniLoadMore,
			navs,
			homeScollX,
			uniSearchBar
		},
		data() {
			return {
				shopName: '民淘商城',
				vipTitle: '特价专区',
				status: 'loading',
				page: 1,
				totalPage:1,
				uid: '',
				sid: '',
				address: '',
				bannerList: [],
				hoteList: [],
				navsList: [],
				specialList: []
			}
		},
		methods: {
			toAuthor() {
				this.uid == '' ? this.$api.getCode() : this.$api.navTo('/pages/mineoptions/mymesage');
			},
			loadMore() {
				console.log('shop  页面数据加载更多')
				console.log(this.page,this.totalPage)
				this.status = 'loading';
				this.totalPage > this.page ?
					((this.page += 1), this.status = 'loading', this.getHoteList()) :
					setTimeout(() => {
						this.status = 'noMore';
					}, 30);
			},
			initData() {
				this.uid = uni.getStorageSync('uid');
				this.sid=uni.getStorageSync('sid');
				this.getHoteList(); //  销量推荐
				this.vipData(); //  特价专区
				this.getClass();
				this.getSwiper();
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
					res.result == 0 ? (res.dataList.length != 0 ? (this.sid = res.dataList[0].id, this.shopName = res.dataList[0].shopName,
						this.$api.setNav(`民淘商城(${this.shopName})`),
						uni.setStorageSync('shopName', this.shopName), uni.setStorageSync('sid', this.sid), this.initData()
					) : '') : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  轮播图  ok
			getSwiper() {
				let parmas = {
					mid: this.uid,
					type: 2
				}
				this._reqw.ipost(parmas, 'carouselList').then(res => {
					res.result == 0 ? this.bannerList = res.carouselList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  特价专区  ok
			vipData() {
				let parmas = {
					mid: this.uid,
					sid: this.sid,
					special: '1',
					pageNo: this.page,
					pageSize: '-1'
				}
				this._reqw.ipost(parmas, 'goodsPage').then(res => {
					console.log(res)
					res.result == 0 ? this.specialList = res.dataList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//   今日精品  ok
			getHoteList() {
				let parmas = {
					mid: this.uid,
					sid: this.sid,
					pageNo: this.page,
					pageSize: '4',
					recommend: '1'
				}
				this._reqw.ipost(parmas, 'goodsPage').then(res => {
					console.log(res)
					res.result == 0 ? (this.hoteList = res.dataList, this.status = 'noMore') : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  首页分类 ok
			getClass() {
				let parmas = {
					mid: this.uid,
					sid: this.sid,
				}
				this._reqw.ipost(parmas, 'goodsCategoryList').then(res => {
					console.log(res)
					res.result == 0 ? (this.navsList = res.dataList) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			search() {
				this.$api.navTo('/pages/search/search')
			}
		},
	}
</script>

<style scoped lang="scss">
	.top-search {
		padding:0 20upx;
		background-color: #FFFFFF;
		z-index: 99;
	}
	.message-img {
		width: 49upx;
		height: 42upx;
		z-index: 999;
	}
	.page-body{
		margin-top: -230upx;
	}
</style>
