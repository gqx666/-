// pages/login/login.js
const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    index:"",
    indexx:""
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
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/tree',
      data: {
        uid : 44,
        level:0
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'        // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          index: res.data.data
        })
        for(var i = 0; i < res.data.data.length; i++){
          // console.log(res.data.data[i].id)
          var aidi = res.data.data[i].id
          console.log(aidi)
          wx.request({
            url: 'https://exam.qhynice.top/index.php/Api/User/tree',
            data: {
              uid : aidi,
              level:2
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'        // 默认值
            },
            success(res) {
              console.log(res.data)
              that.setData({
                indexx: res.data.data
              })
            }
            
          })

        }
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

  },

})