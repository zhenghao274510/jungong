<template>
	<view class="list-scroll-content">
		<!-- 订单列表 -->
		<view class="order-item" @click.stop="gotoDetails(v.id)" v-for="(v,k) in dataList" :key="k">
			<view class="uni-flex bottom-border pad ">
				<view class="uni-flex-item order-ordernum">
					订单编号：{{v.num}}
				</view>
					<view class="order-status-right-one">
						退款中 | <image src="/static/img/shanchu.png" class="typeImg"></image>
					</view>
			</view>
			<view class="uni-flex bottom-border pad-good">
				<view class="order-img-con">
					<image class="goods-img" :src="v.goodsImage"></image>
				</view>
				<view class="uni-flex-item" style="margin-left: 10px;">
					<view class="uni-flex uni-space">
						<view class="title uni-ellipsis">{{v.goodsName}}</view>
					</view>
					<view class="skuname">{{v.goodsSpecName}}</view>
					<view class="price-box uni-flex d-between">
						<text class="order-status-right-price">￥{{v.realAmount}}</text>
						<view style="font-size: 20rpx;">× {{v.count}}</view>
					</view>
				</view>
			</view>
			<view class="uni-flex d-between uni-center pad ">
				<view class="">
				</view>
				<view class=" uni-flex d-between uni-center">
					<view class="uni-badge-green pay" @click.stop="cancelRefund(v.id,k)">取消退款</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/xw-empty/xw-empty.vue";
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				totalPage: 1,
				page: 1,
				dataList: [],
				status: 'loading',
				showEmpty:false,
				showLoading:true,
				uid:''
			};
		},
		onLoad() {
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
				this.loadData();
			}
		},
		onReachBottom() {
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 30)
		},
		methods: {
			initData(){
				this.page=this.totalPage=1;
				this.dataList=[];
				this.status='loading';
				this.loadData();
			},
			loadData() {
				let parmas = {
					mid: this.uid,
					status:0,
					pageNo: this.page,
					pageSize:'10'
				};
				this._reqw
					.ipost(parmas, 'orderPage')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ? (this.showEmpty = true, this.showLoading = false) : res.dataList.forEach(item => {
									this.dataList.push(item)
								}))
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});

			},
			//删除订单
			cancelRefund(id, k) {
				uni.showLoading({
					title: '请稍后'
				})
				let parmas={
					mid:this.uid,
					oid:id
				}
				this._reqw.ipost(parmas, "cancelRefund").then(res => {
					res.result == 0 ? (this.$api.tip('取消成功!'), this.initData(), uni.hideLoading()) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			gotoDetails(id) {
				this.$api.navTo(`/pages/order/orderDetails?id=${id}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size:30upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:35upx;
	}
	.pad-good{
		padding:30upx 0;
	}
	.typeImg{
		width:25upx;
		height:25upx;
		margin-left:10upx;
	}
	.pad {
		padding:20upx 0;
	}

	.pay {
		background-color:#E0984C;
	}

	.uni-badge-green {
		width: 160upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 26upx;
		border-radius: 5px;
		margin: 0 5px;
	}

	.del-icon {
		justify-content: center;
	}

	.icon-delete {
		font-size: 32upx;
		color: #999999;
	}

	.skuname {
		font-size: 20upx;
		color:#999999;
		padding: 20upx 0;
	}
	.order-status-right-one {
		display: flex;
		align-items: center;
		font-size:24upx;
		color:rgba(51,51,51,1);
	}

	page,
	.content {
		height: 100%;
	}
	.order-status-right-price {
		font-size:26upx;
		font-weight: bold;
		color:rgba(255,0,0,1);
	}

	.order-status-right {
		display: flex;
		width: 140px;
		align-items: center;
		justify-content: flex-end;
	}


	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	// 订单列表部分
	.order-item {
		width: 94%;
		margin:20upx auto 0;
		padding: 20upx 20upx 0 20upx;
		box-sizing: border-box;
		border-top:1upx solid #FAFAFA;
		background-color: #FFFFFF;
	}

	.order-img-con,
	.goods-img {
		width:175upx;
		height:159upx;
	}
	.bottom-border{
		border-bottom: 1px solid #F2F2F2;
	}
	.order-ordernum{
		font-size:24upx;
		color:rgba(51,51,51,1);
	}
</style>
