<template>
	<view class="s-page-wrapper">
		<view class="search-pop">
			<view class="top-input">
				<view class="uni-icon uni-icon-search"></view>
				<input type="text" value="" placeholder-style="color:#74738e;font-size:13px;" placeholder="请输入关键字" v-model="keywords" />
			</view>
			<view class="search-btn" @click="submitSearch">
				搜索
			</view>
		</view>
		<view class="search-cat">
			<view class="search-cat-tit"><text class="up-menu">搜索历史</text>
				<image src="/static/img/shanchu.png" class="del-img" @click="clear"></image>
			</view>
			<view class="src-content">
				<view class="src-item uni-ellipsis" v-for="(v, k) in searchList" :key="k" @click="hostSearch(v)">
					{{v}}
				</view>
			</view>
		</view>
		<view class="search-cat">
			<view class="search-cat-tit"><text class="up-menu">热门搜索</text></view>
			<view class="src-content">
				<view class="src-item uni-ellipsis" v-for="(v, k) in hotList" :key="k" @click="hostSearch(v)">
					{{v}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
				searchList: [],
				hotList: []
			};
		},
		onShow() {
			this.loadData();
			uni.getStorageSync('historySearch') ? this.searchList = uni.getStorageSync("historySearch") : this.searchList = [];
		},
		methods: {
			//  热门搜索
			loadData() {
				this._reqw.ipost({},'hotList').then(res => {
					res.result == 0 ? this.hotList = res.keywords : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			submitSearch(){
				for (let i in this.searchList) {
					if (this.searchList[i] == this.keywords) {
						this.searchList.splice(i, 1)
					}
				}
				this.keywords == "" ? this.$api.tip("请输入要搜索的内容!") : (this.searchList.length < 5 ? (this.searchList
					.unshift(this.keywords), uni.setStorageSync(
						"historySearch", this.searchList)) : (this.searchList.pop(), this.searchList.unshift(this.keywords), uni.setStorageSync(
					"historySearch", this.searchList)), this.$api.navTo(
					`/pages/search/search_list?id=${this.keywords}`))
			},
			clear() {
				this.searchList = [];
				uni.removeStorageSync("historySearch");
				this.$api.tip('删除成功!')
			},
			hostSearch(v) {
				this.keywords = v;
				this.submitSearch();
			}
		},
		onHide() {
			this.keywords = ''
		}
	};
</script>

<style lang="scss">
	.del-img {
		width: 30upx;
		height: 30upx;
	}
	.search-img {
		width: 38upx;
		height: 38upx;
	}

	.iconfont {
		color: #999999;
		font-size: 36upx;
	}

	.uni-icon-search {
		font-size: 30upx;
	}

	.help-tips {
		font-size: 26upx;
		color: #999;
		line-height: 26upx;
		padding: 0 0 0 30upx;
		margin: 0;
		width: 80%;
		text-align: left;
	}

	.help-tips.color999 {
		color: #999999;
	}
	.search-pop {
		padding: 14px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #F5F5F5;
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

	.search-cat {
		padding: 40upx;
		width:100%;
		box-sizing: border-box;
	}

	.search-cat .search-cat-tit {
		position: relative;
		display: flex;
		align-items: center;
		font-weight: bold;
		justify-content: space-between;
		padding-left: 30upx;
	}

	.search-cat .search-cat-tit .up-menu {
		display: block;
		height: 20px;
		line-height: 20px;
		font-size:30upx;
		color: #333333;
	}

	.src-content {
		margin: 10px auto;
		display: flex;
		flex-wrap: wrap;
	}

	.src-item {
		width: 23%;
		border-radius: 27upx;
		padding: 7upx 20upx;
		height: 46upx;
		line-height: 46upx;
		background:#FFFFFF;
		margin: 20upx 10upx;
		position: relative;
		text-align: center;
	}

	.clear-search {
		padding: 10px 0;
		text-align: center;
		font-size: 30upx;
		color: #333;
	}
</style>
