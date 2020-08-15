const bassUrl = require('./config.js').bass;
import http from "@/common/js/request.js"
const api = {
	tip(a) {
		uni.showToast({
			title: a,
			icon: "none",
			duration: 1500
		})
	},
	redirectTo(url) {
		uni.redirectTo({
			url: url
		})
	},
	formPhone(val) {
		var mphone = val.substring(0, 3) + '****' + val.substring(7);
		return mphone;
	},
	reLaunch(url) {
		uni.reLaunch({
			url: url
		})
	},
	swithTab(url) {
		uni.switchTab({
			url: url
		})
	},
	navTo(url) {
		uni.navigateTo({
			url: url
		})
	},
	back() {
		setTimeout(() => {
			uni.navigateBack()
		}, 200)

	},
	setNav(e) {
		uni.setNavigationBarTitle({
			title: e
		})
	},
	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		return prePage.$vm;
	},
	loading(e) {
		uni.showLoading({
			mask: false,
			title: e
		})
	},
	regPhone(v) {
		var re = new RegExp(/^[1][3456789]\d{9}$/)
		if (re.test(v)) {
			return true;
		} else {
			return false;
		}
	},
	regName(v) {
		var re = new RegExp(/^[1][3456789]\d{9}$/)
		if (re.test(v)) {
			return true;
		} else {
			return false;
		}
	},
	//  公众号支付
	onBridgeReady(data, type) {
		WeixinJSBridge.invoke(
			"getBrandWCPayRequest", {
				appId: data.appId, //公众号名称，由商户传入
				timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
				nonceStr: data.nonceStr, //随机串
				package: data.package,
				signType: data.signType, //微信签名方式：
				paySign: data.paySign //微信签名
			},
			function(res) {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					if (type == 'vip' || type == 'order') {
						uni.navigateBack();
					} else {
						uni.redirectTo({
							url: `/pages/order/order?id=0`
						})
					}
				} else {
					if (type == 'finish') {
						uni.redirectTo({
							url: `/pages/order/order?id=1`
						})
					}
				}
			}
		);
	},
	//  小程序 支付
	PayBywx(data, type) {
		uni.requestPayment({
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success(res) {
				uni.navigateTo({
					url: `/pages/order/paySuccess?type=${type}`
				})
			},
			fail(res) {

			}
		});
	},
	callPhone(num) {
		uni.makePhoneCall({
			phoneNumber: num
		})
	},
	formText(str) {
		var s = "";
		let width = uni.getStorageSync('screen').screenWidth - 20;
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, "");
		s = s.replace(/&#39;/g, "'");
		s = s.replace(/&quot;/g, '"');
		s = s.replace(/<br\/>/g, "\n");
		s = s.replace(/style="[^"]+"/gi, '');
		s = s.replace(/width="[^"]+"/gi, '');
		s = s.replace(/height="[^"]+"/gi, '');
		s = s.replace(/\<img/gi, '<img style=width:' + width + "px;height:auto;display:block;");
		return s;
	},
	countDown(time) {
		var s = 0;
		var hour = time.split(':')[0];
		var min = time.split(':')[1];
		var sec = time.split(':')[2];
		s = Number(hour * 3600) + Number(min * 60) + Number(sec);
		return s;
	},
	formatTime(unixtime) {
		if (typeof unixtime == undefined) {
			return;
		} else {
			var date = new Date(unixtime);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? "0" + m : m;
			var d = date.getDate();
			d = d < 10 ? "0" + d : d;
			var h = date.getHours();
			h = h < 10 ? "0" + h : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? "0" + minute : minute;
			second = second < 10 ? "0" + second : second;
			return    h + "小时" + minute + "分" ;
		}
	},
	parsePrice(money) {
		var n = 2;
		money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = money.split(".")[0].split("");
		var r = money.split(".")[1];
		var t = "";
		for (let i = 0; i < l.length; i++) {
			t += l[i];
		}
		return t + "." + r;
	},
	formCard(val) {
		var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
		if (isIdCard2.test(val)) {
			return true
		} else {
			return false
		}
	},
	//   日期   间距
	datedifference(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式 
		var dateSpan,
			tempDate,
			iDays;
		sDate1 = Date.parse(sDate1);
		sDate2 = Date.parse(sDate2);
		dateSpan = sDate2 - sDate1;
		dateSpan = Math.abs(dateSpan);
		iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
		return iDays
	},
	getLocation(callback) {
		uni.getLocation({
			type: 'gcj02',
			success(res) {
				callback(res)
			}
		})
	},
	localEncal(local, callback) {
		let qqmapsdk = new QQMapWX({
			key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
		});
		qqmapsdk.reverseGeocoder({
			location: {
				latitude: local.latitude,
				longitude: local.longitude
			},
			success: function(res) {
				callback(res.result)
			}
		});
	},
	showTip(callback) {
		uni.showModal({
			content: '确定删除吗?',
			cancelText: '取消',
			confirmText: '确定',
			success(res) {
				callback(res)
			}
		})
	},
	bindTip(callback) {
		uni.showModal({
			content: '你还没有绑定手机号,是否前往绑定?',
			cancelText: '取消',
			confirmText: '确定',
			success(res) {
				callback(res)
			}
		})
	},
	addCart(parmas, callback) {
		http.ipost(parmas, 'addCart').then(res => {
			callback(res)
		}).catch(err => {})
	},
	getUserCartNum(parmas) {
		http.ipost(parmas, 'cartCount').then(res => {
			res.result==0?res.count==0?uni.removeTabBarBadge({
				index:3
			}):uni.setTabBarBadge({
				index:3,
				text:res.count+''
			}):uni.showToast({
				title:res.resutlNote,
				icon:'none',
				duration:1500
			})
		}).catch(err => {})
	}
}
export default api;
