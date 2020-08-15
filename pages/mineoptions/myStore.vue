<template>
	<view class="">
		<!-- <view class="mysend-line"></view> -->
		<!-- <scoll-x-title :navArr='navList' @navbarTap="onClick" :tabCurrentIndex="tabCurrentIndex"></scoll-x-title> -->
		<view class="mysend-line-two"></view>
		<send-list :list='dataList'  @onClick='delConfirm' @click='giveLike'></send-list>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import sendList from "@/components/mycom/sortList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/xw-empty/xw-empty.vue"
	import scollXTitle from '@/components/mycom/my-send-titlt.vue'
	export default {
		components: {
			sendList,
			uniLoadMore,
			empty,
			scollXTitle
		},
		data() {
			return {
				status: 'loading',
				showLoading:true,
				showEmpty:false,
				page:1,
				totalPage:1,
				tabCurrentIndex:0,
				icid:'',
				navList: [],
				dataList: []
			}

		},
		onShow() {
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			// this.getNavList();
			this.loadData()
		},
		onHide() {
			this.dataList=[];
		},
		//  加载
		onReachBottom() {
			this.totalPage > this.page ?
				((this.page += 1), this.status = 'loading', this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods:{
			//  点赞   修改数据
			giveLike(e) {
				//状态1点赞  0取消
				console.log(e)
				let n = e.ind,
					type = e.type;
				type == 1 ? (this.dataList[n].likeCount = this.dataList[n].likeCount - 0 + 1, this.$api.tip('点赞成功!')) : (this.dataList[
					n].likeCount = this.dataList[n].likeCount - 1, this.$api.tip('取消点赞成功!'))
			},
			onClick(e){
				console.log(e)
				this.icid=e.obj.id;
				this.tabCurrentIndex=e.ind;
				this.clear();
			},
			loadData() {
				let parmas = {
					mid:this.uid,
					pageNo: this.page,
					pageSize: '10'
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'myCollectPage')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ? (this.showEmpty = true,this.showLoading=false): res.dataList.forEach(item => {
									this.dataList.push(item)
								}))
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
		}
	}
</script>

<style>
	.mysend-line {
		height: 20upx;
		background: #F6F6F6;
	}

	.mysend-line-two {
		height: 1upx;
		background: #F6F6F6;
	}
</style>
