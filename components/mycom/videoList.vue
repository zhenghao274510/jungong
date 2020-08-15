<template>
	<view class="eva-section">
		<view class="eva-box" v-for="(v,k) in 3" :key="k" @click.stop="toMessageDetails(v.id)">
			<view class="eva-item">
					<view class="user-name-list">
						爱国教育标题
					</view>
					
					<view class="video-con">
						<video src="" controls class="video"></video>
					</view>
					
				<view class="link-con uni-flex d-between">
					<view class="">
						
					</view>
					<view class="uni-flex d-items-center">
						<view class="uni-flex d-items-center">
							<image src="/static/img/yulan.png" mode="" class="link-img-yu"></image>
							<view class="link-num">
								100
								<!-- {{v.viewCount}} -->
							</view>
						</view>
						<view class="uni-flex d-items-center" @click.stop="addGoode(v.id,k)">
							<image src="/static/img/dianzan.png" mode="" class="link-img"></image>
							<view class="link-num">
								200
								<!-- {{v.likeCount}} -->
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sxRate from '@/components/sunui-star/sunui-star.vue';
	export default {
		components:{
			sxRate
		},
		props: {
			list: {
				type: Array,
				dafault: []
			},
			type: [Number, String],
			uid:{
				type:String,
				default:''
			}
		},
		methods: {
			toMessageDetails(id) {
				this.$api.navTo(`/pages/goodDetails/senddetails?id=${id}`);
			},
			gotoSendMessage(e) {
				console.log(e)
				if(this.uid==''){
					this.$api.getCode(getApp().globalData.inverteUid);
				}else{
					let obj = {
						sticky: e.sticky,
						categoryName: e.categoryName,
						name: e.memberName,
						icon: e.memberAvatar,
						shopName:e.shopName,
						publishDate: e.publishDate
					}
					this.$api.navTo(
						`/pages/Previewindo/sendmessage?id=${e.id}&anoid=${e.memberId}&type=1&info=${encodeURIComponent(JSON.stringify(obj))}`)
				}
				
			},
			tellOther(phone) {
				this.$api.callPhone(phone)
			},
			addGoode(id, k) {
				if(this.uid==''){
					this.$api.getCode(getApp().globalData.inverteUid);
				}else{
					let parmas = {
						mid: this.uid,
						infoid: id
					}
					this._reqw
						.ipost(parmas, 'informationLike')
						.then(res => {
							console.log(res);
							res.result == 0 ? this.$emit('click', {
								ind: k,
								type: res.liked
							}) : this.$api.tip(res.resultNote)
						})
						.catch(err => {});
				}
				
			}
		}
	};
</script>

<style scoped lang="scss">
	.video-con{
		padding:30upx 0;
		
	}
	.video{
		width: 100%;
	}
	.user-name-list{
		font-size: 24upx;
		width:100%;
		line-height:65upx;
		background:rgba(246,246,246,1);
		border-radius:6upx;
		text-align: center;
	}
	.eva-item {
		margin-bottom: 20upx;
		width: 100%;
	}
	.pad {
		padding: 10upx 0;
	}
	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		margin-bottom: 16upx;
	}

	.eva-box {
		background-color: #FFFFFF;
		padding:20upx;
		display: flex;
		margin-bottom: 15upx;
	}
</style>
