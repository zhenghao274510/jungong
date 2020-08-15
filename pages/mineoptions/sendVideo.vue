<template>
	<view class="content">
		<evan-form class="center-con" :hide-required-asterisk="hideRequiredAsterisk" label-position="top" ref="form" :model="massageinfo">
			<evan-form-item prop="name">
				<input class="center-input" placeholder-class="placeholder" v-model="massageinfo.name" placeholder="请输入标题">
			</evan-form-item>
			<evan-form-item prop="content" class="item-con">
				<view class="mian-con">
					<textarea v-model="massageinfo.content" placeholder="请输入发布内容！（不多于500字）" class="textarea" />
					</view>
			</evan-form-item>
			<evan-form-item prop="content" class="item-con">
			 <view class="img-list-con">
						<view class="img-item">
							<image src="/static/img/addImg.png" class="upload-img"></image>
							<image :src="massageinfo.image" class="use-load"></image>
						</view>
					</view>
			</evan-form-item>
		</evan-form>
		
			<view class="footer-btn" hover-class="btn-hover" @click="subElement">
				提 交
			</view>
			<cart-pop ref="cartPop" @onConfirm='onConfirm' type='2'></cart-pop>
	</view>
</template>

<script>
	import cartPop from '@/components/mycom/cartPop.vue'
	import evanFrom from "@/components/evan-form/evan-form.vue";
	import evanFromItem from "@/components/evan-form-item/evan-form-item.vue";
	import utils from '@/components/evan-form/utils.js'
	export default {
		components: {
			cartPop,
			evanFrom,
			evanFromItem
		},
		data() {
			return {
				content: '',
				uid: '',
				tabIndex: 0,
				hideRequiredAsterisk: true,
				massageinfo: {
					name: '',
					address:'',
					content:'',
					image:''
				},
				rules:{
					name:{
						required:true,
						message:'请输入名称'
					},
					address:{
						required:true,
						message:'请输入地址'
					},
					content:{
						required:true,
						message:'请输入地址'
					},
					image:{
						required:true,
						message:'请上传相关图片'
					}
				},
				navList: [{
						name: '投诉个人'
					},
					{
						name: '投诉企业'
					}
				]
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs.form.setRules(this.rules);
			})
		},
		methods: {
			onConfirm() {
				this.$api.back();
			},
			subElement() {
				this.$refs.form.validate((res) => {
					if (res) {
						uni.showToast({
							title: '提交成功!'
						})
						let parmas = {
							mid: this.uid,
							content: this.content
						}
						this._reqw.ipost(parmas, 'feedback').then(res => {
							res.result == 0 ? this.$refs.cartPop.open() : this.$api.tip(res.resultNote)
						}).catch(err => {})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.icon-image{
		width: 24upx;
		height: 32upx;
		margin-left: 30upx;
	}
	.item-con{
		flex-direction: column;
	}
	.use-load{
		position: absolute;
		top: 0;
		left: 0;
		width: 100upx;
		height: 100upx;
	}
	.upload-img{
		width: 54upx;
		height: 54upx;
	}
	.img-item{
		width: 100upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.navtop {
		justify-content: center;
	}

	.center-input {
		height: 81upx;
		background: rgba(255, 255, 255, 1);
		border: 2upx solid rgba(158, 158, 158, 0.14);
		border-radius: 6upx;
		font-size: 26upx;
		width: 100%;
		padding:0 30upx;
		margin-top: 30upx;
	}

	.placeholder {
		font-size: 26upx;
		color: rgba(153, 153, 153, 1);
	}

	.navtop-con {
		width: 452upx;
		height: 81upx;
		margin: 30upx 0;
		border-radius: 0px 6upx 6upx 0px;
		border: 1upx solid rgba(158, 158, 158, 0.14);
	}

	.tabActive {
		background: linear-gradient(179deg, rgba(0, 185, 0, 1), rgba(0, 146, 0, 1));
		border: 1upx solid rgba(158, 158, 158, 0.14);
		border-radius: 6upx 0px 0px 6upx;
		color: #FFFFFF !important;
		line-height: 81upx;
	}

	.navtop-item {
		font-size: 27upx;
		text-align: center;
		color: #00B900;
	}

	.info {
		color: #999999;
		font-size: 24upx;
	}

	.content {
		padding: 10px;
	}

	.mian-con {
		background-color: #FFFFFF !important;
		width: 100%;
		margin-top: 30upx;
		
	}
	.img-list-con{
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		background-color: #FFFFFF !important;
	}

	.footer-btn {
		width: 90%;
		height: 88upx;
		margin: 100upx auto;
		background:linear-gradient(179deg,rgba(0,185,0,1),rgba(0,146,0,1));
		box-shadow:0px 5upx 15upx 0px rgba(224,152,76,0.2);
		border-radius: 10upx;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		font-size: 34upx;
		line-height: 88upx;
	}

	.textarea {
		padding: 20upx;
		width: 100%;
		height: 300upx;
		box-sizing: border-box;
		border-radius: 4upx;
		font-size: 26upx;
		border-radius: 2px;
		background-color: #FFFFFF;
		color: #A4A4A5;
	}
</style>
