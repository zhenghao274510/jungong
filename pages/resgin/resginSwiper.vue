<template>
	<view class="">
		<view class="" style="position:relative;">
			<view class="swiper-con uni-flex d-items-center d-between ">
			          <view class="animated" :class="[tabIndex==k?'swiper-con-item-scale pulse':'swiper-con-item']"  v-for="(v,k) in testimgs" :key="k" @click="navTop(v,k)">
			          	  <view class="swiper-con-item-title">
			          	  	{{v.dec}}
			          	  </view>
						  <image :src="v.url" class="icon-image"></image>
			          </view>
			</view>
		</view>
		
		<view class="reg-btn" hover-class="btnHover" @click="subOrder">下一步</view>
		
		
	</view>
	
</template>

<script>
	   export default {
			 components:{
			 },
			 data(){
				 return{
					 id:2,
					 tabIndex:1,
					 testimgs:[{dec:'我是教官',url:'/static/img/test/banner.png',id:1},{dec:'我是企业',url:'/static/img/test/banner2.png',id:2},{dec:'我有团队',url:'/static/img/test/banner.png',id:3}]
				 }
			 },
			 methods:{
				 navTop(e,ind){
					 // setTimeout(()=>{
					 this.tabIndex=ind;
					 this.id=e.id;
					 // },50)

				 },
				 subOrder(){
					 this.$api.navTo(`/pages/resgin/resgin`)
				 }
			 }
		 }
</script>

<style>
	.swiper-con{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 80%;
	}
	.swiper-con-item-scale{
		width:140upx;
		height: 600upx;
		padding: 40upx;
		/* margin: 30upx; */
		box-sizing:border-box ;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #CCCCCC;
		border-radius: 10upx;
		position: absolute;
		left:calc(50% - 70upx);
	}
	.swiper-con-item{
		width:140upx;
		height: 500upx;
		padding: 40upx;
		/* margin: 30upx; */
		box-sizing:border-box ;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #CCCCCC;
		border-radius: 10upx;
		opacity: .7;
	}
	.icon-image{
		width: 90upx;
		height: 90upx;
		margin-top: 40upx;
	}
	.swiper-con-item-title{
		width: 20px;  
		    margin: 0 auto;  
		    line-height: 24px;  
	}
	.reg-btn {
		width: 86%;
		height: 88upx;
		background:rgba(0,185,0,1);
		box-shadow:0px 5upx 16upx 0px rgba(253,85,85,0.3);
		border-radius: 10upx;
		text-align: center;
		line-height: 88upx;
		color: #ffffff;
		font-size: 34upx;
		font-weight: bold;
		position: fixed;
		left: 7%;
		bottom: 100upx;
	}
</style>
