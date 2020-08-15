<template>
	<view class="content b-t">
		<empty v-if="addressList.length==0"></empty>
		<block v-for="(v,k) in addressList" :key="k">
			<view class="list b-b" @click.stop="checkAddress(v)">
				<view class="wrapper">
					<view class="u-box-first">
						<text class="name">{{v.name}}</text>
						<text class="name">{{v.phone}} </text>
					</view>
					<view class="address-box uni-flex d-items-center">
						<text class="default" v-if="defaultActive==k">【默认】</text>
						<text class="address">{{v.district}}{{v.location}}</text>
					</view>
				</view>
				<view class="u-box line">
					<view class="row " v-if="defaultActive==k">
					</view>
					<view class="row " @click.stop="choseDefault(v.id,k)" v-else>
						<view class="uni-icon uni-icon-checkbox-filled" style="color: #CCCCCC;"></view>
						<view class="tit">设为默认</view>
					</view>
					<view class="u-bottom">
						<view class="yticon del" hover-class="btn-hover" @click.stop="addAddress('edit',v)">编辑</view>
						<view class="yticon del" hover-class="btn-hover" @click.stop="delAddress(v.id, k)">删除</view>
					</view>
				</view>
			</view>
		</block>
		<uni-load-more :status="status" v-if="addressList.length!=0"></uni-load-more>
		<view class="add-btn" @click.stop="addAddress('add')" hover-class="btn-hover">+新增地址</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/xw-empty/xw-empty.vue"
	export default {
		data() {
			return {
				status: 'loading',
				source: 0,
				addressList: [],
				page: 1,
				totalPage: 1,
				address: '',
				defaultActive: 0
			};
		},
		components: {
			uniLoadMore,
			empty
		},
		onLoad(options) {
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid')
			}
			this.source = options.source;
		},
		onShow() {
			this.loadData();
		},
		methods: {
			choseDefault(id, k) {
				console.log(id, k)
				if (this.defaultActive != k) {
					let parmas = {
						mid: this.uid,
						aid: id
					};
					this._reqw
						.ipost(parmas, 'defaultAddress')
						.then(res => {
							console.log(res)
							res.result == 0 ? (this.defaultActive = k, this.$api.tip('修改成功!')) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				}
			},
			loadData() {
				let parmas = {
					mid: this.uid
				};
				this._reqw
					.ipost(parmas, 'addressList')
					.then(res => {
						console.log(res)
						res.result == 0 ? (this.status = 'noMore', this.addressList = res.dataList) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//  上一页实例
					console.log(item);
					this.$api.prePage().addressData = item;
					this.$api.back();
				}
			},
			changePerAddress(id) {
				if (this.source == 1) {
					//  上一页实例
					if (this.$api.prePage().addressData.id == id) {
						this.$api.prePage().addressData = {
							id: "", //地址id
							name: "", //名称
							phone: "", //电话
							district: "", //行政区域
							location: "", //地址
							lat: "", //纬度
							lng: "", //经度
							defaults: "", //是否默认1是0否 
						}
					}
				}
			},
			addAddress(type, e) {
				let url;
				if (type == 'edit') {
					url = `/pages/mineoptions/addressManage?id=${JSON.stringify(e)}`

				} else {
					url = `/pages/mineoptions/newAddAdress`
				}

				this.$api.navTo(url);
			},
			delAddress(id, k) {
				let _this = this;
				uni.showModal({
					confirmText: '确定',
					cancelText: '取消',
					confirmColor:"#D38029",
					content: '确定删除吗?',
					success(res) {
						if (res.confirm) {
							let parmas = {
								mid: _this.uid,
								aid: id
							}
							_this._reqw
								.ipost(parmas, 'deleteAddress')
								.then(res => {
									res.result == 0 ? (_this.$api.tip('删除成功'), _this.addressList.splice(k, 1), _this.changePerAddress(id)) :
										_this.$api.tip(res.resultNote);
								})
								.catch(err => {});
						} else if (res.cancel) {
							console.log('取消')
						}
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.bianji-img {
		width: 27upx;
		height: 25upx;
		margin-right: 15upx;
	}

	.uni-icon {
		font-size: 28upx;
		margin-right: 15upx;
	}

	.iconfont {
		font-size: 40upx;
		margin-right: 10upx;
	}

	.line {
		border-top: 1upx solid #f0f0f0;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;

		.tit {
			font-size: 21upx;
			color: #666666;
		}
	}

	.list {
		display: flex;
		flex-direction: column;
		width: 94%;
		margin: 20upx auto;
		padding: 0 20upx;
		background: #fff;
		box-shadow: 0px 0px 4upx 0px rgba(0, 0, 0, 0.04);
		border-radius: 10upx;
	}

	.del {
		border: 1px solid #F2F2F2;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 20upx 0;
	}

	.address-box {
		display: flex;
		margin-top: 20upx;
		font-size: 20upx;

		.default {
			color:#019901;
		}

		.address {
			color: #666666;
			font-size: 22upx;
		}
	}

	.u-box-first {
		color: #666666;
		// font-weight: bold;
		margin-top: 16upx;
		display: flex;
		align-items: center;

		.name {
			margin-right: 30upx;
			font-weight: bold;
			color: #333333;
		}

		.mobile {
			color: #333333;
		}
	}

	.u-box {
		margin-top: 16upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: #019901;
		border-radius: 0;
		border: none;
	}

	.u-bottom {
		display: flex;
		justify-content: flex-end;
		padding: 20upx 0;
	}

	.yticon {
		padding: 4upx 30upx;
		border-radius: 10upx;
		margin-left: 30upx;
		font-size: 22upx;
	}
</style>
