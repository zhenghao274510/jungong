<template>
	<view class="content">
		<view class="one-info">
			<view class="one-info-top">
				<text class="tit">联系人：</text>
				<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">电 话：</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="请输入联系电话" placeholder-class="placeholder"
			 maxlength="11" />
		</view>
		<view class="row b-b" @click="chooseLocation">
			<text class="tit">地 址：</text>
			<view class="input" v-if="addressData.district!=''">
				{{addressData.district}}
			</view>
			<view class="input" v-else>
				请选择省/市
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">详细地址：</text>
			<input class="input" type="text" v-model="addressData.location" placeholder="请输入详细地址,如门牌号" placeholder-class="placeholder" />
		</view>
		<view class="row default-row d-between">
			<view class="tit">设为默认</view>
			<switch :checked="checked" @change="choseDefault" color="#17B90B" style="transform:scale(0.7)" />
		</view>
		<view class="uni-flex uni-align-center  bottom-btn">
			<view class="uni-flex-item add-btn" hover-class="btn-hover" @click="confirm">确 定</view>
		</view>
		<picker-city ref='picker' :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#6FD758'
		 @onCancel="onCancel"></picker-city>

	</view>
</template>

<script>
	import pickerCity from "@/components/mpvue-citypicker/mpvueCityPicker.vue"
	export default {
		components: {
			pickerCity
		},
		data() {
			return {
				uid:'',
				addressData: {
					id: '',
					name: '',
					phone: '',
					district:'',
					location: '',
					defaults: 0
				},
				cityPickerValueDefault: [0, 0, 0],
				showPicker: false,
				checked:false,
				subActive:false
			}
		},
		onLoad() {
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
		},
		methods: {
			//选择地址
			chooseLocation() {
				this.$refs.picker.show()
			},
			onConfirm(e) {
				console.log(e)
				let address = this.addressData
				address.district = e.label;
			},
			choseDefault(e) {
				console.log(e)
				e.detail.value == false ? this.addressData.defaults =0 : this.addressData.defaults =1
			},

			//提交
			confirm() {
				let data = this.addressData;
				if (data.name == '') {
					this.$api.tip('请填写收货人姓名');
					return;
				}
				if (!this.$api.regPhone(data.phone)) {
					this.$api.tip('请输入正确的手机号码');
					return;
				}
				if (data.district == '') {
					this.$api.tip('请填写所在地址');
					return;
				}
				if (data.location == '') {
					this.$api.tip('请填写详细信息');
					return;
				} else {
					this.sub(data);
				}

			},
			sub(data) {
				if(!this.subActive){
					this.subActive=true;
					let parmas = {
						mid: this.uid,
						name: data.name,
						phone: data.phone,
						district: data.district,
						location: data.location,
						defaults: data.defaults
					};
					console.log(parmas)
					this._reqw.ipost(parmas,'saveAddress').then(res => {
						res.result == 0 ? (this.$api.tip('添加成功!'),this.subActive=false,setTimeout(() => {
							this.$api.back()
						}, 300)) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}else{
					this.$api.tip('你已提交!请耐心等待!')
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-btn {
		width:90%;
		margin:180upx auto 0;
		// height: 80upx;
	}

	.address-pos {
		width: 60upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.address-pos image {
		width: 22upx;
		height: 30upx;
	}

	.address-pos-text {
		color: #FF4848;
		font-size: 22upx;
		margin-top: 10upx;
	}

	.content {
		padding: 10px;
	}

	.row {
		height: 110upx;
		border-bottom: 1px solid #E7E7E7;
	}

	.one-info {
		border-bottom: 1px solid #E7E7E7;
		padding: 10px 0;
	}

	.iconfont {
		font-size: 40upx;
		margin-left: 10px;
	}

	.row,
	.one-info-top {
		display: flex;
		align-items: center;
		position: relative;

		.tit {
			flex-shrink: 0;
			width: 152upx;
			font-size: 30upx;
			color: #666666;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: #999999;
			padding-left: 15px;
			text-align: right;
		}

	}

	.add-btn {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 30upx;
		color: #fff;
		background-color:#019901;
	}

	.cal-btn {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 30upx;
		color: #fff;
		background-color: #999999;
	}
</style>
