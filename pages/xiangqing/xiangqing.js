// pages/xiangqing/xiangqing.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: "",
    cardCur: 0,
    swiperList:"",
    active: 0,
    quxiao:false,
    show: false,
    num:1,
    CustomBar: app.globalData.CustomBar,
    actions: [
      {
        name: '选项'
      },
      {
        name: '分享',
        subname: '描述信息',
        openType: 'share'
      },
      {
        loading: true
      },
      {
        name: '禁用选项',
        disabled: true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.towerSwiper('swiperList');
    var shop = wx.getStorageSync('sid');
    this.setData({
      sid: shop,
    });
    console.log(shop); 
    var that = this;
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Product/index',
      data: {
        pro_id: shop
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          pro: res.data.pro,
          swiperList: res.data.pro.img_arr
        })
      }
    })
  },
  // 最下标签页
  // onChange(event) {
  //   wx.showToast({
  //   });
  // },
  // 购买弹出框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 购买弹出框结束
  purchase(){
    
    if(!wx.getStorageSync('uid')){
      wx.redirectTo({
        url: "../denglu/denglu"
      })
    }else{
      console.log(this.data.num, this.data.sid);
    wx.setStorageSync('sid', this.data.sid)
    wx.setStorageSync('num', this.data.num)
    wx.setStorageSync('pro', this.data.pro)
    wx.navigateTo({
      url: "../Order/Order"
    })
    }
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
    showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  onChange(event) {
    console.log(event.detail);
    this.data.num = event.detail;
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