// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datare:[],
    moren:'默认'
  },
  and(){
    wx.navigateTo({
      url: "../newly/newly"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        console.log(res.data);
        that.setData({
        datare : res.data.res
        })
      }
    })
  },
  baocun(e){
    console.log(e)
    wx.setStorageSync("addressid", e.currentTarget.dataset.message.id)
    wx.navigateTo({
      url: "../Order/Order"
    })
  },
  bianji:function(event){
    var that =  this;
      wx.setStorageSync('aid', event.currentTarget.id)
      wx.setStorageSync('name', event.currentTarget.dataset.name)
      wx.setStorageSync('phone', event.currentTarget.dataset.phone)
      wx.setStorageSync('address', event.currentTarget.dataset.address)
      wx.navigateTo({
        url: "../bianji/bianji"
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