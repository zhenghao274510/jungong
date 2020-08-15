<template>
	<view class="content">
		<page-heade :txt="txt" type="0" :showHome="showHome"></page-heade>
		<!-- 首页 -->
		<view :style="{'display':show_index == 0 ?'block':'none'}">
			<tab-home ref="tabhome"></tab-home>
		</view>
		<!-- 商城 -->
		<view :style="{'display':show_index == 1 ?'flex':'none'}">
			<tab-shop ref="tabshop"></tab-shop>
		</view>
		<!-- 教官 -->
		<view :style="{'display':show_index == 2? 'block':'none'}">
			<tab-send ref="tabsend"></tab-send>
		</view>
		<!-- 社区 -->
		<view :style="{'display':show_index == 3 ?'block':'none'}">
			<tab-cart ref="tabcart"></tab-cart>
		</view>
		<!-- 个人中心 -->
		<view :style="{'display':show_index == 4 ? 'flex':'none'}">
			<tab-mine :style="{'display':show_index == 4 ? 'flex':'none'}" ref="tabmine"></tab-mine>
		</view>
		<view class="tabBar" :style="{height:is_lhp?'150rpx':'110rpx'}">
			<!-- 导航的中间圆圈 -->
			<view class="border_box" :style="{paddingBottom:is_lhp?'40rpx':''}">
				<view class="tabBar_miden_border"></view>
			</view>
			<view class="tabBar_list" :style="{paddingBottom:is_lhp?'40rpx':''}">
				<view v-for="(item,index) in tab_nav_list" :key="item.id" :class="{'tabBar_item':item.id!=2,'tabBar_item2':item.id==2}"
				 @tap="cut_index(item.id)">
					<image v-if="show_index == item.id" :src="`/static/tabs/${item.id+1}${item.id+1}.png`" :style="{'width':item.width,'height':item.height}"></image>
					<image v-else :src="`/static/tabs/${item.id+1}.png`" :style="{'width':item.width,'height':item.height}"></image>
					<view :class="{'tabBar_name':true,'nav_active':show_index == item.id}">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabHome from '@/pages/tabbar/home.vue'
	import tabShop from '@/pages/tabbar/shop.vue'
	import tabSend from '@/pages/tabbar/send.vue'
	import tabCart from '@/pages/tabbar/cart.vue'
	import tabMine from '@/pages/tabbar/mine.vue'
	import pageHeade from "@/components/mycom/pageHeader.vue"
	export default {
		components: {
			pageHeade,
			tabHome, //首页    0
			tabShop, //军官用品    1
			tabSend, //最帅教官   2
			tabCart, //社区学习   3
			tabMine //个人中心  4
		},
		data() {
			return {
				show_index: 0, //控制显示那个组件
				txt: '首页',
				showHome: false,
				tab_nav_list: [{
					'id': 0,
					'name': '首页',
					'width': '42rpx',
					'height': '42rpx'
				}, {
					'id': 1,
					'name': '军官用品',
					'width': '36rpx',
					'height': '49rpx'
				}, {
					'id': 2,
					'name': '最帅教官',
					'width': '114rpx',
					'height': '110rpx'
				}, {
					'id': 3,
					'name': '社区学习',
					'width': '37rpx',
					'height': '38rpx'
				}, {
					'id': 4,
					'name': '我的',
					'width': '32rpx',
					'height': '37rpx'
				}], //菜单列表
				is_lhp: false
			}
		},
		onLoad() {
			let _this = this
			this.is_lhp = this.$is_bang
			this.$nextTick(function() {
				// 一定要等视图更新完再调用方法   -----------++++++++++++++++重要
				setTimeout(function() {
					_this.$refs.tabhome.initData() //初次加载第一个页面的请求数据
				}, 100)
			})
			console.log("是否为刘海屏", this.is_lhp)
		},
		//   各组件 数据加载更多
		onReachBottom() {
			console.log('more')
			let num = this.show_index;
			switch (num) {
				case 0:
					this.$refs.tabhome.loadMore();
					break;
				case 1:
					this.$refs.tabshop.loadMore();
					console.log('加载')
					break;
				case 2:
					this.$refs.tabsend.loadMore();
					break;
				case 3:
					this.$refs.tabcart.loadMore();
					break;
			}
		},
		onPageScroll(e) {
			e.scrollTop > 5 ? this.showHome = true : this.showHome = false;
		},
		methods: {
			// 切换组件
			cut_index(type) {
				console.log('----------------------------------', type)
				let _this = this
				_this.show_index = type;
				uni.pageScrollTo({
					scrollTop: 0
				});
				if (_this.show_index == 0) {
					this.txt = "首页";
					_this.$refs.tabhome.initData()
				} else if (_this.show_index == 1) {
					this.txt = "商城";
					_this.$refs.tabshop.initData()
				} else if (_this.show_index == 2) {
					this.txt = "最帅教官排行";
					_this.$refs.tabsend.initData()
				} else if (_this.show_index == 3) {
					this.txt = "社区学习";
					_this.$refs.tabcart.initData()
				} else if (_this.show_index == 4) {
					this.txt = "个人中心";
					_this.$refs.tabmine.initData()
				}
			},

			onPullDownRefresh() {
				uni.showToast({
					title: `第${this.show_index+1}个页面的刷新`
				})
				setTimeout(function() {
					uni.stopPullDownRefresh()
				}, 2000)
				console.log('下拉刷新四个组件公用的下拉刷新方法,根据在哪个页面下拉执行哪个页面的刷新方方法即可')
				console.log('如果想要自定义刷新的话，插件市场就有一个   非常好用也非常容易入手')
			}
		}
	}
</script>

<style lang="scss">
	.tabBar {
		width: 100%;
		height: 110rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;

		.tabBar_list {
			width: 100%;
			display: flex;
			justify-content: space-between;

			image {
				width: 48rpx;
				height: 48rpx;
				margin-bottom: 2rpx
			}

			.tabBar_item {
				width: 18%;
				// padding:10upx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color: #969BA3;
			}

			.tabBar_item2 {
				width: 28%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #969BA3;
				position: relative;
				z-index: 101;

				image {
					width: 114upx;
					height: 110upx;
					border-radius: 50%;
					margin-top: -55rpx;
				}
			}
		}
	}

	.tabBar_name {
		font-size: 24upx;
		color: rgba(115, 115, 115, 1);
	}

	.border_box {
		// pointer-events: none; 事件穿透解决z-index层级问题
		width: 100%;
		height: 110rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0px;
		bottom: 50rpx;
		z-index: 100;
		pointer-events: none;

		.tabBar_miden_border {
			width: 100rpx;
			height: 50rpx;
			border-top: 2rpx solid #E5E5E5;
			border-radius: 50rpx 50rpx 0 0;
			/* 左上、右上、右下、左下 */
			background: #fff;
		}
	}

	.nav_active {
		color: #005A00;
	}
</style>
