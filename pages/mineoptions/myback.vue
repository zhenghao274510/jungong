<template>
	<view class="">
		<my-back :dataList="dataList"></my-back>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import myBack from "@/components/mycom/backList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/xw-empty/xw-empty.vue"
	export default {
		components: {
			myBack,
			uniLoadMore,
			empty
		},
		data() {
			return {
				page: 1,
				totalPage: 1,
				uid: '',
				status: 'loading',
				dataList: [],
				showEmpty: false,
				showLoading: true
			}
		},
		onLoad() {
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid')
			}
			this.loadData()
		},
		onReachBottom() {
			this.totalPage > this.page ?
				(this.status = 'loading', (this.page += 1), this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods: {
			loadData() {
				let parmas = {
					mid: this.uid,
					pageNo: this.page,
					pageSize: "10"
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'myRecyclePage')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ? (this.showEmpty = true, this.showLoading = false) : res.dataList.forEach(item => {
									this.dataList.push(item)
								}), this.share())
							) :
							(this.$api.tip(res.resultNote),this.showEmpty = true, this.showLoading = false);
					})
					.catch(err => {});
			}
		}
	}
</script>

<style>
</style>
