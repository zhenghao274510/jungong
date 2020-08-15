<template>
	<view class="content">
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in dataList" :key="k" @click.stop="gotoDetails(v.id)">
				<view class="image-second">
					<image class="uni-second-image" :src="v.image"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title uni-ellipsis">{{v.name}}
					</view>
					<view class="uni-flex d-items-center price">
						{{v.intro}}
					</view>
					<view class="uni-flex d-items-center">
						<view class="sku-name">
							活动价
						</view>
						<view class="sku-price">
							￥{{v.price}}
						</view>
						<view class="old-price">
							￥{{v.linePrice}}
						</view>
					</view>
				</view>
				<image class="add-cart" src="/static/img/jia.png" hover-class='btn-hover' @click.stop='addCart(v)'>
					
				</image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default: []
			},
			uid:{
				type:String
			}
		},
		methods: {
			gotoDetails(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}`);
			},
			addCart(e){
				if(e.spec==0){
					let parmas = {
						mid: this.uid,
						gid: e.id,
						count: 1
					}
					console.log(parmas)
					this._reqw.ipost(parmas, 'addCart').then(res => {
						console.log(res)
						res.result == 0 ? (this.$api.tip('加入购物车成功!'),this.$api.getUserCartNum(this.$api.getUserCartNum({mid:this.uid}))) : this.$api.tip(
							res.resultNote)
					}).catch(err => {})
				}else{
					this.$api.navTo(`/pages/goodDetails/gooddetails?id=${e.id}`)
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		box-sizing: border-box;
		margin-top: 20upx;
	}

	.price {
		font-size: 22upx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1)
	}
	.add-cart{
		position: absolute;
		top:70%;
		right:40upx;
		transform: translateY(-50%);
		width:49upx;
		height:49upx;
	}

	.sku-name {
		width: 90upx;
		height: 33upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 33upx;
		font-size: 20upx;
		background: rgba(76, 197, 243, 1);
		border-radius: 0px 10upx 0px 10upx;
	}

	.sku-price {
		padding: 0 15upx;
		text-align: center;
		font-size: 26upx;
		font-weight: 500;
		color: #FF0000;
	}

	.old-price {
		text-align: center;
		font-size: 19upx;
		font-weight: 500;
		text-decoration: line-through;
		color: rgba(153, 153, 153, 1);
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10px;
		margin-bottom: 10px;
	}

	.uni-second {
		display: flex;
		padding: 40upx 20upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 20upx;
		position: relative;
	}

	.image-second {
		width: 155upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 194upx;
		height: 140upx;
		border-radius: 4upx;
	}

	.uni-second-title {
		color: #333333;
		font-weight: bold;
		font-size: 30upx;
		line-height: 1.5;
	}

	.uni-second-price {
		width: 75%;

		font-size: 28upx;
		line-height: 1.5;
		padding-left: 30upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}

	.uni-flex {
		margin-bottom: 10upx;
	}
</style>
