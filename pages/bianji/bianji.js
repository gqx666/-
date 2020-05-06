// pages/bianji/bianji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    phone:"",
    address:"",
    checked: false,
    isDefault:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindKeyInput1(e){
    var that = this 
    that.setData({
      name: e.detail.value
      })
    console.log(e.detail.value)
  },
  bindKeyInput2(e){
    var that = this 
    that.setData({
      phone: e.detail.value
      })
    console.log(e.detail.value)
  },
  bindKeyInput3(e){
    var that = this 
    that.setData({
      address: e.detail.value
      })
    console.log(e.detail.value)
  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
  console.log(detail)
  if (detail == true) {
    var i = 1
  } else {
    var i = 0
  }
  this.setData({
    isDefault:i,
    checked: detail
  })
},
  baocun(){
    var that = this
    var shop = wx.getStorageSync('aid');
    console.log(shop); 
    console.log(that.data.name); 
    wx.request({
      url: 'https://star.qhynice.top/api/address/update_default',
      data: {
        user_id	: 64,
        id: shop,
        name:that.data.name,
        phone: that.data.phone,
        address: that.data.address,
        is_default:that.data.isDefault
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        
        console.log(res.data);
        wx.navigateBack({
          url: 'B?id=1'
        })
      }
    })
  },
  shanchu(){
    var shop = wx.getStorageSync('aid');
    wx.request({
      url: 'https://star.qhynice.top/api/address/del_adds',
      data: {
        user_id	: 64,
        id: shop,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.navigateTo({
          url: '/pages/address/address'
        })
      }
    })
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
    that.setData({
      name:wx.getStorageSync('name'),
      phone:wx.getStorageSync('phone'),
      address:wx.getStorageSync('address'),
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