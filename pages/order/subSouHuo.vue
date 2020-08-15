<template>
	<view class="content">
		<view class="tui-inter">
			<view class="inter-title">
				退款说明
			</view>
			<editor placeholder="请输入退款说明"  @input="changContent" class="refsoncontent" ></editor>
		</view>
		<view class="tui-inter">
			<view class="inter-title">
				上传凭证
			</view>
			<view class="img-list">
				<view class="img" @click="uploads" v-if="rfImage==''">
					<image src="/static/img/shangchuan.png" mode="scaleToFill" class="upimg"></image>
				</view>
				<view class="img" @click="uploads">
					<image :src="rfImage" mode="scaleToFill" class="order-img"></image>
				</view>
			</view>
		</view>
		<view class="btn" @click="SubChange">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				active: 1,
				imgList: [],
				refundreason:'',
				rfImage:'',
				starImage:'',
				orderId: '',
				content: '',
				uid:''
			}
		},
		onLoad(options) {
			this.orderId=options.id;
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid')
			}
		},
		methods: {
			changContent(e){
				console.log(e)
				this.content=e.detail.text;
			},
			uploads() {
				console.log("上传")
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res){
						// tempFilePath可以作为img标签的src属性显示图片
						console.log(res);
						// res.tempFiles.forEach(item => {
						// 	that.formImg(item)
						// })
						that.formImg(res.tempFiles[0])
					}
				})
			},
			formImg(res){
				this._reqw
					.iupfile(res)
					.then(res => {
						console.log(res);
						let r = JSON.parse(res);
						r.result == 0 ? (this.rfImage=r.urls,this.starImage= r.urls) : this.$api.tip(r.resultNote);
						// r.result == 0 ? (this.imgList.push(bassUrl.bass + r.datastr)) : this.$api.tip(r.resultNote);
					})
					.catch(err => {})
			},
			SubChange() {
				let parmas = {
					mid:this.uid,
					oid: this.orderId,
					content: this.content,
					image:this.starImage
				};
				console.log(parmas)
				this._reqw.ipost(parmas,'applyRefund').then(res => {
					res.result == 0 ? (this.$api.tip('提交成功!'),this.$api.back()) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upimg{
		width: 80upx;
		height: 80upx;
	}
	.refsoncontent{
		margin-top: 10px;
		width:671upx;
		height:195upx;
		background:rgba(246,246,246,1);
		border-radius:6upx;
		padding: 10upx;
		box-sizing: border-box;
	}
	.content {
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		box-sizing: border-box;
	}

	.img-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;

		.img {
			width: 31%;
			padding: 0 1%;
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.order-img{
			width: 100%;
			height: 100%;
		}
	}

	.tui-inter {
		margin: 10px 0;
	}

	.inter-title {
		line-height: 30px;
	}

	.uni-second-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-second-list-top {
		display: flex;
		height: 40px;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 0 5px;
		border-radius: 10px 10px 0 0;
	}

	.uni-second-list {
		display: flex;
		width: 100%;
		margin: 0 auto;
		margin-bottom: 10px;
		flex-direction: column;
		background: #fff;
		border-radius: 0 0 10px 10px;
	}

	.uni-second {
		padding: 20upx;
		display: flex;
		flex-direction: row;
	}

	.image-second {
		height: 200upx;
		width: 200upx;
		margin: 12upx 0;
	}

	.uni-second-image {
		height: 110px;
		width: 110px;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-second-price {
		flex: 1;
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}
	.uni-second-price-favour {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10upx;
	}

	.uni-second-tip {
		background-color: #ff3333;
		color: #ffffff;
		padding: 0 10upx;
		border-radius: 5upx;
	}

	.uni-second-from {
		color: red;
	}

	.btn {
		width: 600upx;
		margin: 0 auto;
		margin-top: 30upx;
		height: 80upx;
		line-height: 40px;
		text-align: center;
		color: #fff;
		border-radius: 5px;
		font-size: 18px;
		background-color:#E0984C;
	}
</style>
