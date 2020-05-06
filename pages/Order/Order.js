Page({
  data:{
      sid:"",
      num:"",
      pro:"",
      datare:{},
      aid:"",
      addressid:"",
      shop:""
  },
  onLoad: function(options){
    var sid = wx.getStorageSync('sid');
    var num = wx.getStorageSync('num');
    var that = this;
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Product/index',
      data: {
        pro_id: sid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          pro: res.data.pro,
          num: num
        })
      }
    })
  },
  address(){
    wx.navigateTo({
      url: "../address/address"
    })
  },
  onShow: function () {
    var that = this
    var addressid = wx.getStorageSync("addressid");
    var shop = wx.getStorageSync('aid');
    that.setData({
      addressid: addressid,
      shop:shop
    })
    wx.request({
      url: 'https://star.qhynice.top/api/address/getaddress',
      data: {
        user_id	: 64,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        var addList = res.data.res;
        console.log(addList);
        console.log(that.data.shop);
        if (that.data.shop != "") {
          for (var i in addList) {
            if(addList[i].id == that.data.shop){
              that.setData({
                datare: addList[i]
              })
            }
            console.log("i" + i);
          }
        }else{
          for (var i in addList) {
            if (addList[i].is_default == "1") {
              that.setData({
                datare: addList[i]
              })
            }
          }
        }
        
      }
      
    })

  },
  xiadan(){
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Payment/pay_now',
      data: {
        uid	: wx.getStorageSync('uid'),
        pid : wx.getStorageSync('sid'),
        type: that.data.pro,
        num : that.data.num,
        aid:  that.data.aid,
        price:1,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        // console.log(res);
        wx.setStorageSync("addressid", "");//清楚掉本地存储的地址id
        that.setData({
          aid : res.data.id,
        })
      }
      
    })


  }
})