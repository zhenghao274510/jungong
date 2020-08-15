<template>
  <view class="box">
    <map
      :longitude="longitude"
      :latitude="latitude"
      id="mymap"
      scale="17"
      show-location
      :markers="markers"
    ></map>
    <scroll-view class="searchList" scroll-y="true" @scrolltolower="loadMore">
      <view class="addres-item" v-for="(item,index) in searchList" :key="index" @click="setAddress(item)">
        <!--根据需求渲染相应数据-->
        <!--渲染地址title-->
        <view>
          <view class="item-name" style="text-align:left;font-size:14px;">{{item.title}}</view>
          <view class="item-address" style="font-size:12px;color:#666;text-align:left;margin-top:5px;">{{item.address}}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import QQMapWX from "@/common/js/qqmap-wx-jssdk";
export default {
  data() {
    return {
      qqMapSdk: "",
      longitude: "",
      latitude: "",
	  searchList:[],
	  page:1,
	  type:''
    }
  },
  onLoad(options) {
	  this.type=options.type;
    this.qqMapSdk = new QQMapWX({
      key: "GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO"
    });
    this.getCurPositions();
  },
  //方法集合
  methods: {
    getCurPositions() {
      let self = this;
      wx.getLocation({
        type: "gcj02", //返回可以用于wx.openLocation的经纬度
        success(res) {
          self.latitude = res.latitude;
          self.longitude = res.longitude;
          self.getNeary()
        }
      });
    },
	getNeary(){
		let self=this;
		self.qqMapSdk.reverseGeocoder({
		  location: `${self.latitude},${self.longitude}`,
		  get_poi:1,
		  page_size:10,
		  page_index:self.page,
		  success: function(res) {
		    console.log(res);
			res.result.pois.forEach(item=>{
				self.searchList.push(item);
			})
		  }
		});
	},
	loadMore(){
		this.page+=1;
		this.getNeary()
	},
    setAddress(item) {
		console.log(item)
		if(this.type==0){
			this.$api.prePage().addressData.address=item.address;
			this.$api.prePage().addressData.title=item.title;
			 this.$api.prePage().addressData.lngAndLat=item.location.lng+','+item.location.lat;
		}else{
			this.$api.prePage().addressData.address=item.address+item.title;
			 this.$api.prePage().addressData.lngAndLat=item.location.lng+','+item.location.lat;
		}
	  setTimeout(()=>{
		  this.$api.back()
	  },30)
	  
    }
  }
};
</script>
<style>
page {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.box,
#mymap {
  width: 100%;
  height: 400px;
  overflow: hidden;
}
.searchList {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 340px;
  background: #fff;
}
.searchList .addres-item {
  padding: 5px 10px;
  height: 40px;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #ccc;
}
 .item-name,.item-address{
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>