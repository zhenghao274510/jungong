<template>
	<view class="">
		<!-- <view class="mysend-line"></view> -->
		<scoll-x-title :navArr='navList' @navbarTap="onClick" :tabCurrentIndex="tabCurrentIndex"></scoll-x-title>
		<view class="mysend-line-two"></view>
		<send-list :list='dataList' type='3' @onClick='delConfirm' @click='giveLike' :uid='uid'></send-list>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import sendList from "@/components/mycom/my-send-history.vue"
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
				uid:'',
				navList: [],
				dataList: []
			}

		},
		onLoad() {
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			this.getNavList();
			this.loadData()
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
			getNavList() {
				let parmas = {
					mid:this.uid
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'informationCategoryList')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							(res.dataList.unshift({name:'全部',id:''}),this.navList=res.dataList):this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			clear(){
				this.dataList=[];
				this.page=this.totalPage=1;
				this.showLoading=true;
				this.showEmpty=false;
				this.status='loading';
				this.loadData();
			},
			delConfirm(e){
				console.log(e)
				let parmas = {
					mid:this.uid,
					infoid:e.id
				};
				this._reqw
					.ipost(parmas,'offPublish')
					.then(res => {
						console.log(res)
						res.result == 0 ? (this.$api.tip(res.resultNote),this.clear(),this.$forceUpdate()) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			loadData() {
				let parmas = {
					mid:this.uid,
					icid:this.icid,
					pageNo: this.page,
					pageCount: '10'
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'myPublishPage')
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
