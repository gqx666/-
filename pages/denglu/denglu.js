// pages/denglu/denglu.js
Page({

data:{
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
  code:"",
  nickName:"",
  avatarUrl:"",
  gender:"",
  openid:""
},

/*** 生命周期函数--监听页面加载*/
onLoad: function(options) {
  var that = this;
  // 查看是否授权
  wx.getSetting({
    success: function(res) {
      if (res.authSetting['scope.userInfo']) {
        console.log("用户授权了");
        wx.getUserInfo({
          success: function(res) {
            console.log(res.userInfo)
            var box = res.userInfo
            wx.setStorageSync('box', box)
            console.log(box)
          }
        })
      } else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });
  },
  bindGetUserInfo: function(res) {
    if (res.detail.userInfo) {
       //用户按了允许授权按钮
       var that = this;
        // 获取到用户的信息了，打印到控制台上看下
        console.log("用户的信息如下：");
        console.log(res.detail.userInfo);
        var box = res.detail.userInfo
        wx.setStorageSync('box', box)
        //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
        that.setData({
          isHide: true,
        })
        wx.login({
          success (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://exam.qhynice.top/index.php/Api/Login/getsessionkey',
                data: {
                  code: res.code
                },
                method: 'POST',
                header: {
                      'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                  console.log(res.data);
                  var sessionkey = res.data.session_key
                  console.log(sessionkey)
                  wx.setStorageSync("sessionkey",sessionkey)
                  console.log(box)
                  wx.request({
                    url: 'https://exam.qhynice.top/index.php/Api/Login/authlogin',
                    data: {
                      openid:res.data.openid,
                      NickName:box.nickName,
                      HeadUrl:box.avatarUrl,
                      gender: box.gender
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success(res) {
                      console.log(res);
                      var uid = res.data.arr.ID
                      wx.setStorageSync("uid",uid)
                       wx.switchTab ({
                           url: '/pages/index/index'
                         })
                    }
                  })
                }
              })
             
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        
      } else {
        //用户按了拒绝按钮
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                console.log('用户点击了“返回授权”');
              }
            }
          });
        }
  }
})