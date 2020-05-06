// pages/jifen/jifem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    uid:"",
    name:"",
    phone:"",
    hao:"",
    jine:"",
    daozhang:"",
    jifen:"",
    shenhe:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onChange(a){
    var that = this 
    that.setData({
      name: a.detail
      })
  },
  onphone(a){
    var that = this 
    that.setData({
      phone: a.detail
      })
  },
  onhao(a){
    var that = this 
    that.setData({
      hao: a.detail
      })
  },
  onjine(a){
    var that = this 
    that.setData({
      jine: a.detail
      })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  submit(){
    var that = this
    var zhengshu = /^[0-9]*[1-9][0-9]*$/
    var xingming = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/
    var dayu = /^[1-9]{1}\d{2,}$/
    var chaoguo = /^[1-9]\d{0,4}$/
    that.data.uid = wx.getStorageSync("uid")
    if (that.data.name == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 2000
      })
    } 
    else if (!xingming.test(that.data.name)) {
      wx.showToast({
        title: '请填写正确姓名',
        icon: 'none',
        duration: 2000
      })
    }
    else if (that.data.phone == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (!(/^1[34578]\d{9}$/.test(that.data.phone))) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 2000
      })
    }
    else if (that.data.hao == '') {
      wx.showToast({
        title: '请填写账号',
        icon: 'none',
        duration: 2000
      })
    }else if (that.data.jine == '') {
      wx.showToast({
        title: '请填写提现金额',
        icon: 'none',
        duration: 2000
      })
    }
    else if (!zhengshu.test(that.data.jine)) {
      wx.showToast({
        title: '请填写整数提现',
        icon: 'none',
        duration: 2000
      })
    }
    else if (!dayu.test(that.data.jine)) {
      wx.showToast({
        title: '提现金额大于100',
        icon: 'none',
        duration: 2000
      })
    }
    else if (!chaoguo.test(that.data.jine)) {
      wx.showToast({
        title: '提现金额不能超过10000',
        icon: 'none',
        duration: 2000
      })
    }
    else if (that.data.jine <= that.data.jifen) {
      wx.showToast({
        title: '提现积分不能超过我的积分',
        icon: 'none',
        duration: 2000
      })
    }else{
        wx.request({
          url: 'https://exam.qhynice.top/index.php/Api/User/withdraw',
          data: {
            uid : that.data.uid,
            name: that.data.name,
            tel:that.data.phone,
            account:that.data.hao,
            num:that.data.jine,
            jifen:that.data.jine * 0.9
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'        // 默认值
          },
          success(res) {
            console.log(res.data)
            if (res.data.status == 1) {
                wx.redirectTo({
                  url: "./jifem"
                })
            }
          }
        })

  }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.data.uid = wx.getStorageSync("uid")
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/userinfo',
      data: {
        uid : that.data.uid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'        // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          jifen: res.data.userinfo.jifen 
        })
      }
    })
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/pending',
      data: {
        uid : that.data.uid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'        // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          shenhe : res.data.data
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