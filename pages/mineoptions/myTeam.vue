<template>
	<view>
		<view class="resgin-con">

			<view class="uni-flex d-items-center d-content-center  top-con">
				<view class="">
					成为团队
				</view>
				<view class="top-yao" @click="showTopPicker">
					邀请团员
				</view>
			</view>
			<evan-form class="center-con" :hide-required-asterisk="hideRequiredAsterisk" label-position="left" :label-style="labelStyle"
			 ref="form" :model="shopInfo">
				<evan-form-item label="真实姓名" prop="shopName">
					<input class="center-input" placeholder-class="placeholder" v-model="shopInfo.shopName" placeholder="请输入真实姓名" />
				</evan-form-item>
				<evan-form-item label="性别" prop="userName">
					<radio-group @change="onChange" class="read-con">
						<label v-for="(item, index) in items" :key="item.value">
							<radio :value="item.value" :checked="index==current"  style="transform: scale(.7);" /><text>{{item.name}}</text>
						</label>
					</radio-group>
				</evan-form-item>
				<evan-form-item label="身份证号" prop="userName">
					<input class="center-input" placeholder-class="placeholder" v-model="shopInfo.userName" placeholder="请输入身份证号" />
				</evan-form-item>
				<evan-form-item label="团队名称" prop="userName">
					<input class="center-input" placeholder-class="placeholder" v-model="shopInfo.userName" placeholder="请输入团队名称" />
				</evan-form-item>
				<evan-form-item label="工作区域" prop="location">
					<input class="center-input" placeholder-class="placeholder" v-model="shopInfo.location" placeholder="请输入法人的姓名" />
				</evan-form-item>
			</evan-form>
		</view>
		<view class="id-con uni-flex  d-between d-items-center">
			<view class="id-item">
				<view class="IDTitle">
					上传证书(非必填)
				</view>
				<view class="uni-flex d-items-center d-content-center IdCon">
					<image src="/static/img/addImg.png" class="addImage" v-if="shopInfo.FrontIDcard==''"></image>
					<image :src="shopInfo.FrontIDcard" class="IDimage"></image>
				</view>
			</view>
		</view>
		<view class="id-con uni-flex  d-between d-items-center">
			<view class="uni-flex-item id-item">
				<view class="uni-flex d-items-center d-content-center IdCon">
					<image src="/static/img/addImg.png" class="addImage" v-if="shopInfo.FrontIDcard==''"></image>
					<image :src="shopInfo.FrontIDcard" class="IDimage"></image>
				</view>
				<view class="IDTitle">
					身份证正面
				</view>
			</view>
			<view class="uni-flex-item id-item">
				<view class="uni-flex d-items-center d-content-center IdCon">
					<image src="/static/img/addImg.png" class="addImage" v-if="shopInfo.FrontIDcard==''"></image>
					<image :src="shopInfo.FrontIDcard" class="IDimage"></image>
				</view>
				<view class="IDTitle">
					身份证反面
				</view>
			</view>
			<view class=" uni-flex-item id-item">
				<view class="uni-flex d-items-center d-content-center IdCon">
					<image src="/static/img/addImg.png" class="addImage" v-if="shopInfo.FrontIDcard==''"></image>
					<image :src="shopInfo.FrontIDcard" class="IDimage"></image>
				</view>
				<view class="IDTitle">
					手持身份证
				</view>
			</view>
		</view>
		<view class="id-con" @click="addTeamEle">
			<view class="uni-flex-item uni-flex d-items-center d-content-center id-bg-con">
				<image src="/static/img/addImg.png" class="addImage" v-if="shopInfo.Businesslicense==''"></image>
				<image :src="shopInfo.Businesslicense" class="lessimage"></image>
			</view>
			<view class="IDTitle" >
				添加团队成员
			</view>
		</view>

		<view class="center-tip uni-flex">
			<label class="uni-flex d-items-center">
				<checkbox :checked="checked" style="transform: scale(.7);" />
				<navigator :url='`/pages/mineoptions/webView?type=4`'> 我已阅读并同意 <text class="center-info">《****用户协议》</text></navigator>
			</label>
		</view>

		<view class="sub-btn" @click="save">
			提交
		</view>
         <add-team ref="addTeam"></add-team>
		 <top-content-inter ref="topContentInter"></top-content-inter>
	</view>
</template>
<script>
	import evanFrom from "@/components/evan-form/evan-form.vue";
	import evanFromItem from "@/components/evan-form-item/evan-form-item.vue";
	import addTeam from "@/components/mycom/addTeam.vue";
	import utils from '@/components/evan-form/utils.js'
	import topContentInter from "@/components/mycom/yaoqing.vue"
	export default {
		components: {
			evanFrom,
			evanFromItem,
			addTeam,
			topContentInter
		},
		data() {
			return {
				hideRequiredAsterisk: true,
				btnState: false,
				checked: true,
				current: 0,
				items: [{
						value: '0',
						name: '男'
					},
					{
						value: '1',
						name: '女'
					}
				],
				rTime: '获取验证码',
				labelStyle: {
					color: "#333",
					fontSize: '28rpx'
				},
				shopInfo: {
					icon: '', //  店铺logo
					shopName: '', //  店铺名称
					userName: '', //  法人名称
					phone: '', //  法人联系方式
					location: '', //  店铺地址
					address: '', //  店铺详细地址
					code: '', //  验证码
					FrontIDcard: '', //身份证正面
					ReverseIDcard: '', //身份证正面
					HoldingIDcard: '', //手持正面
					content: '',
					Businesslicense: "",
					shopImage: ''
				},
				rules: {
					icon: {
						required: true,
						message: '请上传企业logo'
					},
					shopName: {
						required: true,
						message: '请输入企业名称'
					},
					userName: {
						required: true,
						message: '请输入法人名称'
					},
					phone: [{
							required: true,
							message: '请输入手机号'
						},
						{
							pattern: '/^[1][3456789]\d{9}$/',
							message: '手机号格式不正确'
						}
					],
					location: {
						required: true,
						message: '请选择地址'
					},
					address: [{
						required: true,
						message: '请输入详细地址'
					}],
					code: {
						required: true,
						message: '请输入验证码'
					}
				}
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs.form.setRules(this.rules);
			})
		},
		methods: {
			addTeamEle(){
				this.$refs.addTeam.open();
			},
			showTopPicker(){
				this.$refs.topContentInter.open();
			},
			onChange(e) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === e.target.value) {
						this.current = i;
						break;
					}
				}
				console.log(this.current)
			},
			save() {
				this.$refs.form.validate((res) => {
					if (res) {
						uni.showToast({
							title: '提交成功!'
						})
					}
				})
			},
			getCode() {
				this.$api.regPhone(this.shopInfo.phone) ? this.$api.tip('发送') : this.$api.tip('手机号格式不正确')
			}
		}
	}
</script>
<style>
	page {
		background-color: #F6F6F6;
	}
</style>
<style scoped lang="scss">
	.read-con{
		margin-left:60upx;
	}
	.top-con {
		padding: 30upx 0;
		position: relative;
	}

	.top-yao {
		position: absolute;
		top: 50%;
		right: 30upx;
		transform: translateY(-50%);
	}

	.lessimage {
		position: absolute;
		top: 0;
		left: 0;
		height: 300upx;
		width: 720upx;
	}

	.id-bg-con {
		background-color: #FFFFFF;
		height: 300upx;
		position: relative;
	}

	.marg-top {
		margin: 20upx auto;
		padding: 0 40upx;
		width: 94%;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.enterprise-title {
		// height:38upx;
		padding: 40upx;
		font-size: 40upx;
		color: rgba(51, 51, 51, 1);
	}

	.resgin-con {
		width: 94%;
		margin: 0 auto;
		padding: 0 40upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.id-con {
		width: 94%;
		margin: 0 auto 30upx;

	}

	.center-info {
		font-size: 26upx;
		color: #22D13F;
	}

	.center-tip {
		font-size: 24upx;
		color: rgba(153, 153, 153, 1);
		padding: 40upx;
		text-align: center;
	}

	.textarea {
		height: 200upx;
		padding: 20upx;
		box-sizing: border-box;
	}

	.desc-con {
		width: 94%;
		margin: 0 auto;
		// height: 357upx;
		background: #FFFFFF;
		border-radius: 6upx;
	}

	.ID-top-title {
		text-align: center;
		padding: 30upx 0;
	}

	.IDTitle {
		padding: 20upx 0;
		text-align: center;
	}

	.IDimage {
		position: absolute;
		top: 0;
		left: 0;
		width: 225upx;
		height: 225upx;
	}

	.IdCon {
		width: 225upx;
		height: 225upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		position: relative;
	}

	.y-z-m {
		font-size: 26upx;
		color: #B7B7B7;
	}

	.center-input {
		height: 70upx;
		padding-left: 30upx;
		flex: 1;
		font-size: 24upx;
		color: rgba(153, 153, 153, 1);
	}

	.other-input-con {
		// background: rgba(246, 246, 246, 1);
		border-radius: 6upx;
		padding-right: 30upx;
	}

	.bg-input {
		background: rgba(246, 246, 246, 1);
		border-radius: 6upx;

	}

	.placeholder {
		font-size: 24upx;
		color: rgba(153, 153, 153, 1);
	}

	.addImage {
		width: 54upx;
		height: 54upx;
	}

	.sub-btn {
		width: 600upx;
		height: 88upx;
		line-height: 88upx;
		margin: 50upx auto;
		background: rgba(1, 153, 1, 1);
		box-shadow: 0px 5upx 15upx 0px rgba(224, 152, 76, 0.2);
		border-radius: 10upx;
		font-size: 32upx;
		text-align: center;
		color: rgba(255, 255, 255, 1);
	}
</style>
