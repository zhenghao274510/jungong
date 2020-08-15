<template>
	<view class="content">
		<block v-for="(item,index) in dataObject.orderGoodsList" :key="index">
			<view class="cart-item">
				<view class="cart-item-left">
					<image :src="item.goodsImage" mode="aspectFill" lazy-load class="product-img"></image>
				</view>
				<view class="item-right">
					<view class="item-right-top">
						<view class="clamp title uni-ellipsis">{{item.goodsName}}</view>
					</view>
					<view class="item-right-top">
						<view class="skuname">{{item.goodsSpecName}}</view>
					</view>
					<view class="item-right-top">
						<view class="price">￥{{item.amount}}</view>
						<view class="step">
							x {{item.count}}
						</view>
					</view>
				</view>
			</view>
			<view class="server-val">
				<text class="server-class goodTitle">商品评分:</text>
				<sx-rate :value="item.star" @change="changeOrder" :ind="index"></sx-rate>
			</view>
			<view class="eva-content">
				<textarea value="" placeholder="请输入您对商品的评价" class="textarea" v-model="item.content" />
				<view class="img-list">
					<view class="img-con" v-for="(v, k) in item.images" :key="k" @click="seeDetails(index,k)">
						<image :src="v" class="img"></image>
					</view>
					<view class="img-con" @click="uploads(index)" v-if="item.images.length<3">
						<image src="/static/img/upload.png" class="up-img"></image>
					</view>
					
				</view>
			</view>
		</block>
		
		<view class="footer-btn" hover-class="btn-hover" @click.stop="sub">提 交</view>
	</view>
</template>

<script>
	import sxRate from '@/components/sunui-star/sunui-star.vue';
	import bassUrl from "@/common/js/config.js"
	export default {
		data() {
			return {
				orderId: '',
				uid:'',
				dataObject: {
					orderGoodsList: []
				}
			};
		},
		components: {
			sxRate
		},
		onLoad(options) {
			this.orderId = options.id;
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			this.loadData();
		},
		methods: {
			changeOrder(e) {
				let n=e.index;
				this.dataObject.orderGoodsList[n].star=e.value;
				console.log(this.dataObject.orderGoodsList[n].star)
			},
			uploads(k){
					let that = this;
					uni.chooseImage({
						count: 3-that.dataObject.orderGoodsList[k].images.length, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							console.log(res);
							res.tempFiles.forEach(item=>{
								that.formImg(item,k)
							})
					}
				})
			},
			formImg(res,k){
					console.log(res);
					this._reqw
						.iupfile(res)
						.then(res => {
							console.log(res);
							let r = JSON.parse(res);
							r.result == 0 ? (this.dataObject.orderGoodsList[k].images.push(r.urls)) : this.$api.tip(r.resultNote);
						})
						.catch(err => {});
				},
				sub(){
					console.log(this.dataObject)
					let items = [];
					this.dataObject.orderGoodsList.forEach((item,index)=>{
						items.push({
							gid:item.goodsId,	
							score:item.star,	
							content:item.content,
							image:item.images
						})
					})
					let parmas = {
						mid:this.uid,
						oid: this.orderId,
						json:JSON.stringify(items)  
					};
					console.log(parmas);
					this._reqw
						.ipost(parmas,'goodsComment')
						.then(res => {
							res.result==0?
								(this.$api.tip('提交成功!'),
									this.$api.back()) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				},
				loadData() {
					let parmas = {
						mid: this.uid,
						oid: this.orderId
					}
					this._reqw
						.ipost(parmas,'orderDetail')
						.then(res => {
							console.log(res)
							res.result == 0 ?(res.orderGoodsList.forEach(item=>{
								item.images=[],
								item.star=5,
								item.content=''
							}),this.dataObject=res): this.$api.tip(res
								.resultNote);
						})
						.catch(err => {});
				}
			}
			

	}
</script>

<style scoped lang="scss">
	.goodTitle {
		padding: 30upx;
		position: relative;
	
		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			width: 6upx;
			height: 27upx;
			background:#4CBC37;
			border-radius: 3upx;
		}
	}
	.cart-item {
		display: flex;
		position: relative;
		background: #ffffff;
		padding:50upx 30upx;
	}
	.img-list{
		display: flex;
		padding-left:20upx;
		.img-con{
			width: 160upx;
			height: 160upx;
			padding-right:20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.up-img{
				width:57upx;
				height:50upx;
			}
			.img {
			  width: 160upx;
			height: 160upx;
					}
		}
	}
	
	
	.price {
		color: #FF0000;
		font-size: 30upx;
	}
	
	.uni-icon {
		font-size: 36upx;
	}
	
	.item-right-top {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}
	
	.skuname {
		font-size: 20upx;
		color: #999999;
	}
	
	.bottom-width {
		width: 100%;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
	}
	
	.cart-item-left {
		position: relative;
		display: flex;
		align-items: center;
		margin-right: 30upx;
	}
	
	.product-img {
		width: 160upx;
		height: 160upx;
		border-radius: 5px;
		margin-left: 5upx;
	}
	
	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 10upx;
		overflow: hidden;
		position: relative;
	}
	
	.title{
		font-size:36upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.price {
		font-size:38upx;
		font-weight:500;
		color:rgba(255,0,0,1);
		
	}
	button {
		background-color: none;
		border: none;
	}

	.content {
		padding: 20upx;
	}

	.eva-content {
		width: 100%;
		background-color:#FFFFFF;
		// margin:0 2;
		padding: 20upx 0;
	}
	.textarea {
		padding:20upx;
		width: 100%;
		height:200upx;
		box-sizing: border-box;
		font-size: 26upx;
		border-radius: 2upx;
	}

	.server-val {
		display: flex;
		align-items: center;
		padding: 10px 0;
	}

	.footer-btn {
		width: 90%;
		height: 88upx;
		background:rgba(107,212,83,1);
		box-shadow:0px 5upx 15upx 0px rgba(224,152,76,0.2);
		border-radius: 5upx;
		margin:40upx auto;
		font-size: 34upx;
		color: #ffffff;
		font-weight: bold;
		text-align: center;
		line-height:88upx;
	}
</style>
