<template>
	<view class="content">
		<view class="top-nav">
			<view class="search-pop">
				<view class="top-input">
					<view class="uni-icon uni-icon-search"></view>
					<input type="text" value="" placeholder-style="color:#74738e;font-size:13px;" placeholder="请输入关键字" v-model="keywords" />
				</view>
				<view class="search-btn" @click="submitSearch">
					搜索
				</view>
			</view>
		</view>
		<team-list :list='dataList'></team-list>
		<empty v-if="showempty"></empty>
		<uni-load-more :status="status" v-if="showloading"></uni-load-more>
	</view>
</template>

<script>
	import empty from "@/components/xw-empty/xw-empty.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import teamList from "@/components/mycom/teamList.vue"
	export default {
		data() {
			return {
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading',
				keywords: '',
				uid:'',
				sid:'',
				point:{
					longitude: '113.62493',
					latitude: '34.74725'
				},
				showempty:false,
				showloading:true
			};
		},
		components: {
			uniLoadMore,
			empty,
			teamList
		},
		onLoad(options) {
			this.keywords = options.id;
			this.$api.setNav(this.keywords);
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid')
			}
			if(uni.getStorageSync('sid')){
				this.sid=uni.getStorageSync('sid');
			}
			this.getHoteList();
		},
		methods: {
			initData(){
				this.page=this.totalPage=1;
				this.status='loading';
				this.loadData();
			},
			submitSearch(){
				this.initData();
				this.$api.setNav(this.keywords);
			},
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
			toGoods(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}`)
			}
		},
		//  加载
		onReachBottom() {
			console.log('到底');
			this.totalPage > this.page ?
				((this.page += 1),this.status = 'loading',this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		}
	};
</script>

<style lang="scss">
	.spacle-height{
		height: 100upx;
	}
	.search-pop {
		padding: 14px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// background-color: #F5F5F5;
		width: 100%;
		box-sizing: border-box;
	}
	
	.top-input {
		flex: 1;
		margin-right: 20px;
		height: 30px;
		line-height: 30px;
		display: flex;
		padding-left: 20px;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 50upx;
		color: #74718c;
		align-items: center;
	}
	
	.top-inptu input {
		height: 100%;
	}
	.search-btn {
		height: 100%;
		color: #333333;
		font-size: 27upx;
	}
</style>
