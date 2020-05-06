// pages/photo/photo.js
Page({
  data: {
    phone:"",
    panduan:""
  },
  getPhoneNumber (e) {
    var that = this
    var uid = wx.getStorageSync('uid')
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/deciphering',
      method: 'GET',
      data: {
        sessionID: wx.getStorageSync('sessionkey'),
        iv:e.detail.iv,
        encryptedDataStr:e.detail.encryptedData
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res);
        that.setData({
          phone: res.data.phoneNumber
        })
        wx.request({
          url: 'https://exam.qhynice.top/index.php/Api/User/user_edit',
          method: 'POST',
          data: {
            uid:uid,
            tel:res.data.phoneNumber,
            spread_id:'',
            secondary_id:'',
            third_id:'',
            initial_id:''
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log(res);
            that.setData({
              panduan:res.data.status
            })
            if(that.data.panduan == 1){
              wx.showToast({
                title: '获取成功',
                icon: 'none',
                duration: 3000
              })
              setTimeout(function(){
                wx.switchTab ({
                  url: '/pages/my/my'
                })
             } ,1000)
            }else{
              wx.showToast({
                title: '获取失败',
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */


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