<template>
	<view class="">
		<goods-eva :dataList="dataList" type='1'></goods-eva>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import goodsEva from "@/components/mycom/eva-product-List.vue"
	import empty from '@/components/xw-empty/xw-empty.vue'
	export default {
		components: {
			uniLoadMore,
			goodsEva,
			empty
		},
		data() {
			return {
				showEmpty:false, 
				showLoading:true,
				status:'loading',
				dataList: [],
				uid:'',
				page:1,
				totalPage:1
			}

		},
		onLoad(options) {
			this.id=options.id;
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			this.loadData();
		},
		onReachBottom() {
			this.totalPage > this.page ?
				((this.page += 1), this.status = 'loading', this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods:{
			loadData(){
				let parmas = {
					mid: this.uid,
					gid: this.id,
					pageNo:this.page,
					pageSize:'10'
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'goodsCommentPage')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ? (this.showEmpty = false, this.showLoading = true) : res.dataList.forEach(item => {
									this.dataList.push(item)
								}))
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	}
</script>

<style>
</style>
