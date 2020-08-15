<template>
	<view class="wu-con" :style="{'backgroud:#ffffff':dataList.length!=0}">
		<empty v-if="dataobject.Traces.length==0"></empty>
		<block v-else>
			<view class="wu-item">
				<view class="wu-time cell-tip">
					物流类型:{{dataobject.logisticsCompany}}
				</view>
				<view class="wu-info cell-tit">
					物流单号:{{dataobject.deliverNum}}
				</view>
			</view>
			<view class="wu-item" v-for="(v,k) in dataobject.Traces" :key="k">
				<view class="wu-time cell-tip">
					{{v.AcceptTime}}
				</view>
				<view class="wu-info cell-tit">
					{{v.AcceptStation}}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import empty from "@/components/xw-empty/xw-empty.vue";
	export default {
		components: {
			empty
		},
		data() {
			return {
				id: '',
				uid: '',
				dataobject: {
					logisticsCompany: "", //物流公司名称
					logisticsCompanyCode: "", //物流公司编码
					deliverNum: "", //快递单号
					Traces:[],   //  信息
				}
			}
		},
		onLoad(options) {
			this.id = options.id;
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid');
			}
			this.loadData(this.id);
		},
		methods: {
			loadData(id) {
				let parmas = {
					oid: id,
					mid: this.uid
				}
				this._reqw
					.ipost(parmas, 'logisticsQuery')
					.then(res => {
						res.result == 0 ?
							this.dataobject = res : this.$api.tip(res.resultNote);
					})
					.catch(err => {});

			}

		}
	}
</script>

<style lang="scss" scoped>
	.wu-item {
		padding: 30upx 0;
		border-bottom: 1upx solid #F2F2F2;
	}

	.cell-tit {
		color: #333333;
		font-size: 24upx;

	}

	.cell-tip {
		color: #999999;
		font-size: 26upx;
	}

	.wu-con {
		padding: 40upx;
		box-sizing: border-box;
	}
</style>
