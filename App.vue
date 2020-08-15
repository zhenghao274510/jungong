<script>
	export default {
		globalData:{
			inverteUid:''
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					uni.setStorageSync('screen', res)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/uni.css";
	@import "./common/css/ani.css";
	view,text{
		font-size:28upx;
		color: #333333;
		box-sizing: border-box;
		
	}
	page{
		min-height: 100%;
		background-color: #F8F8F8;
		overflow-x:hidden;
	}
	.page-body {
		width: 750upx;
		margin:0 auto;
		overflow: hidden;
		font-size: 30upx;
		background: #F6F6F6;
		padding-bottom: 180upx;
	}
	.top-title{
		font-size:36upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.top-more{
		font-size:26upx;
		font-weight:500;
		color:#666666;
	}
	.top-splace{
		height:80upx;
		width: 100%;
	}
	.d-flex{
		display: flex;
	}
	.d-content-center{
		justify-content: center;
	}
	.d-items-center{
		align-items: center;
	}
	.d-between{
		justify-content: space-between;
	}
	/* scroll-view   去滚动条 */
	::-webkit-scrollbar {
	  width:0;
	  height: 0;
	  color: transparent;
	}
	.btn-hover{
		opacity: .7;
	}
	.d-border-bottom{
		border-bottom: 2upx solid #F2F2F2;
	}
	.uni-two-cut {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	
	/* //   点赞   浏览 */
	.link-con {
		padding: 20upx 0;
	}
	.link-img-yu{
		width: 40upx;
		height: 24upx;
		margin-right: 6upx;
	}
	
	.link-img {
		width: 34upx;
		height: 30upx;
		margin-right: 6upx;
	}
	
	.link-num {
		font-size: 22upx;
		color: rgba(51, 51, 51, 1);
		margin-right: 20upx;
	}
</style>
