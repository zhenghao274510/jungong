<template>
	<view class="cu-bar">
		<image src="/static/img/bianji.png" class="bianji-img"></image>
		<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" 
		  v-model="my_say_text"></input>
		<view class="cu-btn" hover-class="btn-hover" @click="to_send()">
			<image src="/static/img/sendmassage.png" class="send-img"></image>
			发送
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				my_say_text:''
			}
		},
		methods:{
			to_send(){
				this.my_say_text==''?this.$api.tip('请输入评论内容!'):this.$emit('click',this.my_say_text)
			}
		}
	}
</script>

<style scoped lang="scss">
	.send-img {
		width: 39upx;
		height: 39upx;
		margin-right: 10upx;
	}

	.bianji-img {
		width: 21upx;
		height: 21upx;
		margin:0 20upx;
	}
	.solid-bottom{
		height: 100%;
		flex: 1;
		font-size: 26upx;
	}

	.cu-bar {
		position: fixed;
		bottom: 30upx;
		left: 30upx;
		right: 30upx;
		height: 80upx;
		background:#FFFFFF;
		border-radius: 4upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cu-btn {
		position: relative;
		align-items: center;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		width: 204upx;
		height: 78upx;
		background: rgba(224, 152, 76, 1);
		border-radius: 0px 4px 4px 0px;
		color: #FFFFFF;
	}
</style>
