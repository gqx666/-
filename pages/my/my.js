// pages/my/my.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    boox:"",
    phone:"",
    photo:"",
    name:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(!wx.getStorageSync('uid')){
      wx.redirectTo({
        url: "../denglu/denglu"
      })
    }else{
      var that = this
      // console.log(app.globalData.userInfo)
      var uid = wx.getStorageSync('uid');
      var boox = wx.getStorageSync('box');
      this.setData({
        uid:uid,
        boox:boox
      })
      console.log(uid)
      console.log(boox)
      wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/User/userinfo',
        data: {
          uid : uid,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data);
          that.setData({
            phone:res.data.userinfo.tel,
            photo:res.data.userinfo.photo,
            name:res.data.userinfo.name,
          })
          console.log(res.data.userinfo.tel)

        }
        
      })
      
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },
  shouji(){
    var that = this 
    console.log(that.data.phone)
    if(that.data.phone == ""){
    wx.navigateTo({
      url: "../photo/photo"
    })
  }else{
    wx.showToast({
      title: '请勿重复绑定',
      icon: 'none',
      duration: 3000
    })
  }
  },
  jifen(){
    wx.navigateTo({
      url: "../jifen/jifem"
    })
  },
  cal(){
    wx.makePhoneCall({
      phoneNumber: '10086' //仅为示例
    });
  },
  mail(){
    wx.addPhoneContact({
      nickName: '昵称',
      lastName: '姓',
      firstName: '名',
      remark: '备注',
      mobilePhoneNumber: '10086',
      weChatNumber: 'wx123',
      success: function () {
        console.log('保存成功');
      },
      fail: function () {
        console.log('保存失败');
      }
    });
  },
  map(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于uni.openLocation的经纬度
      success: function (res) {
        // const latitude = res.latitude;
        // const longitude = res.longitude;
        const latitude = 35.3142497300;
        const longitude = 113.9786911000;
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          success: function () {
            console.log('success');
          }
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})