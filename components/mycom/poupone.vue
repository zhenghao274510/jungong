<template>
	<view class="mask" v-if="pickerShow">
		<view class="yaoqing-content" @click.stop="pickerShow=false">
			<image src="/static/img/error.png" mode="" class="img"></image>
			<view class="cancel-title">
				取消订单
			</view>
			<view class="">
				<view class="uni-list-cell" v-for="(item,index) in navList" :key="index" @click.stop="chose(index)">
					<view class="uni-list-cell-left uni-flex-item">
						{{item.value}}
					</view>
					<view class="uni-flex">
						<view class="uni-icon uni-icon-circle-filled" style="color:#E0984C;" v-if="item.checked">
						</view>
						<view class="uni-icon uni-icon-checkbox" style="color: #898989;" v-else>
						</view>
					</view>
				</view>
			</view>
			<view class="cancle-btn" @click.stop="subReson">
				提 交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerShow: false,
				reson:'不想要了',
				navList: [
					{
						checked: true,
						value: "不想要了"
					},
					{
						checked: false,
						value: "商品无货"
					},
					
					{
						checked: false,
						value: "商品信息填写错误"
					},
					{
						checked: false,
						value: "地址信息填写错误"
					},
					{
						checked: false,
						value: "商品降价"
					},
					{
						checked: false,
						value: "其他"
					}
				]
			}
		},
		methods: {
			showPicker() {
				this.pickerShow = true;
			},
			hidePicker() {
				this.pickerShow = false;
			},
			chose(k){
				console.log(k)
				this.navList.forEach((item,index)=>{
					item.checked=false;
					if(index==k){
						item.checked=true;
						this.reson=item.value;
					}
				})
			},
			subReson(){
				this.$emit('click',this.reson)
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-flex {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.cancle-btn{
		width:561upx;
		height:80upx;
		margin:60upx auto;
		background:#E0984C;
		border-radius:5upx;
		color: #FFFFFF;
		line-height: 80upx;
		font-size: 36upx;
		text-align: center;
	}
	.img{
		position: absolute;
		right: -30upx;
		top: -30upx;
		width: 67upx;
		height: 67upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, .6);
	}

	.yaoqing-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 80%;
		background: #FFFFFF;
		border-radius: 10upx;

	}
	.uni-list-cell{
		padding: 20upx;
		justify-content: space-between;
	}
	.cancel-title{
		padding: 20upx;
		text-align: center;
		color: #333333;
		font-weight: bold;
		border-bottom: 1px solid #C0C0C0;
	}
</style>
