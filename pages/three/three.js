// pages/three/three.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImageBase64Str:""
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
      return
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
    var that = this
    that.data.uid = wx.getStorageSync("uid")
      console.log(that.data.uid)
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/getWxcode',
      data: {
        invite_code : that.data.uid 
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'        // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          ImageBase64Str:res.data
        })
      }
    })
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