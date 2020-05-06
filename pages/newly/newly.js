// pages/newly/newly.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['选择省', '选择市', '选择区'],
    imgList: [],
    modalName: null,
    name:"",
    photo:"",
    addrs:"",
    beizhu:"",
    uid:"",
    sheng:"",
    city:"",
    quyu:"",
    checked: false,
    isDefault:0
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      sheng: e.detail.value[0],
      city: e.detail.value[1],
      quyu: e.detail.value[2]
    })
  },
  bindKeyInput1(a){
    this.setData({
      name: a.detail.value
    })
    console.log(a.detail.value)
  },
  bindKeyInput2(a){
    this.setData({
      photo: a.detail.value
    })
    console.log(a.detail.value)
  },
  bindKeyInput3(a){
    this.setData({
      addrs: a.detail.value
    })
  },
  bindKeyInput4(a){
    this.setData({
      beizhu: a.detail.value
    })
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
    // console.log(that.data.city)
    var addrss = that.data.sheng + that.data.city + that.data.quyu + that.data.addrs
    console.log(addrss)
    wx.request({
      url: 'https://star.qhynice.top/api/address/index',
      data: {
        user_id : 64,
        name: that.data.name,
        phone:that.data.photo,
        address:addrss,
        is_default:that.data.isDefault
      },
      //试一下
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        wx.navigateBack({
          url: 'B?id=1'
        })
      }
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