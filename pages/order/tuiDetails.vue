<template>
	<view style="background-color: #FFFFFF;">
		<view class="spacle"></view>
		<order-product :dataList="dataobject.ordertailList"></order-product>
		<view class="spacle"></view>
		
		<view class="cell-con">
			<view class="uni-flex uni-align-center uni-list-cell">
				<text class="cell-tip">退款原因</text>
				<text class="cell-tit">{{dataobject.refundreason}}</text>
			</view>
		
			<view class="uni-flex uni-align-center uni-list-cell">
				<text class="cell-tip">退款金额</text>
				<text class="cell-tit " style="color:#FF0000;font-weight: bold;" >￥{{dataobject.allprice}}</text>
			</view>
			<view class="uni-flex uni-align-center uni-list-cell">
				<text class="cell-tip">退款说明</text>
				<text class="cell-tit">{{dataobject.refunddesc}}</text>
			</view>
			<view class="uni-flex uni-align-center uni-list-cell">
				<text class="cell-tip">订单编号</text>
				<text class="cell-tit">{{orderId}}</text>
			</view>
			<view class="uni-flex uni-align-center uni-list-cell">
				<text class="cell-tip">申请时间</text>
				<text class="cell-tit">{{dataobject.sqtktime}}</text>
			</view>
			<view class="uni-flex uni-align-center uni-list-cell">
				<text class="cell-tip">审核时间</text>
				<text class="cell-tit">{{dataobject.tkshtime}}</text>
			</view>
			<view class="">
				<view class="cell-tip">退款凭证</view>
				<image :src="dataobject.refundimage" mode="" class="refundimage"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import orderProduct from "@/components/mycom/eva-product-List.vue"

	export default {
		data() {
			return {
				dataobject:{
					allprice:"",
					refundreason:'',
					sqtktime:'',
					tkshtime:'',
					refundimage:'',
					ordertailList:[]
				},
				orderId: ''
			}
		},
		components: {
			orderProduct
		},
		onLoad(options) {
			this.orderId = options.id;
			this.loadData();
		},
		methods: {
			loadData() {
				let parmas={
					cmd:'myorderdetail',
					ordernum:this.orderId,
					uid:getApp().globalData.uid
				}
				this._reqw
					.ipost(parmas)
					.then(res => {
						res.result == 0 ? (this.dataobject = res.dataobject,(res.dataobject.state==5?this.active=1:this.active=2)):this.$api.tip(res
							.resultNote);
					})
					.catch(err => {});
			},
			seeDetails(n) {
				uni.previewImage({
					urls: this.imgList,
					count: this.imgList[n]
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.uni-list-cell {
		padding: 30upx 0;
		justify-content: flex-start;
	}

	.cell-tit {
		color: #333333;
		font-size: 24upx;
		
	}

	.cell-tip {
		color: #999999;
		font-size: 26upx;
		width: 160upx;
	}

	.cell-con {
		padding: 0 20px;
	}
	.refundimage{
		width: 160upx;
		height: 160upx;
		border-radius: 8upx;
	}
</style>
