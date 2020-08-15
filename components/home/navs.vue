<template>
	<div class="all">
		<div class="contains">
			<div class="nav-item" v-for="(item,index) in dataList" :key="index">
				<image :src="item.image" @click="classify(item,index)" />
				<span>{{item.name}}</span>
			</div>
			<!-- <div class="nav-item xia">
				<img src="/static/img/test/2@2x.png" alt @click="classify" />
				<span>更多</span>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array
			},
			type: {
				type: String || Number
			}
		},
		methods: {
			previewInfo(v, k) {
				console.log(v, k)
				if (k == 0) {
					this.$api.reLaunch('/pages/tabbar/shop');
				} else if (k == 1) {
					this.$api.navTo('/pages/Previewindo/househome?type=1');
				} else {
					this.$api.navTo(`/pages/Previewindo/infoList?title=${v.name}&type=${v.id}`);
				}
			},
			classify(v, k) {
				this.type == 0 ?this.previewInfo(v, k) : this.$api.navTo(`/pages/oneclass?id=${v.id}`)
			}
		}
	};
</script>

<style scoped lang="scss">
	.all {
		width: 100%;
		position: relative;
		background: #FFFFFF;

		.contains {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.nav-item {
				width: 25%;
				margin-top: 20upx;
				margin-bottom: 20upx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;

				image {
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}

				span {
					font-size: 26upx;
					color: #333333;
					margin-top: 14upx;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
				}
			}
		}
	}
</style>
