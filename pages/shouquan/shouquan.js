// pages/shouquan/shouquan.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code:"",
    nickName:"",
    avatarUrl:"",
    gender:"",
    openid:""
  },
  bindGetUserInfo: function(res) {
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
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              console.log(res.data);
              console.log(row)
                
              wx.request({
                url: 'https://exam.qhynice.top/index.php/Api/Login/authlogin',
                data: {
                  openid:res.data.openid,
                  nickName:row.nickName,
                  gender: row.gender,
                  avatarUrl:row.avatarUrl
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success(res) {
                  console.log(res.data);
                  var uid = res.data.arr.ID
                  wx.setStorageSync("uid",uid)
                  console.log(uid);
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    if (res.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            // 获取到用户的信息了，打印到控制台上看下
            console.log("用户的信息如下：");
            app.globalData.userInfo = res.detail.userInfo;
            console.log(res.detail.userInfo);
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
              isHide: false
            });
            var row = res.detail.userInfo;  
            console.log(row)
            wx.switchTab ({
              // url: '/pages/index/index'
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
     },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thet = this;
        wx.getSetting({
            success: function(res) {
              if (res.authSetting['scope.userInfo']) {
                console.log("用户授权了");
              } else {
                //用户没有授权
                console.log("用户没有授权");
              }
            }
          });
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              var avatarUrl = res.userInfo.avatarUrl;
              var nickName = res.userInfo.nickName;
              var gender = res.userInfo.gender;
              // console.log(res.userInfo)
              wx.setStorageSync("avatarUrl",avatarUrl)
              // console.log(avatarUrl)
              wx.setStorageSync("nickName",nickName)
              console.log(nickName)
              wx.setStorageSync("gender",res.userInfo.gender)
            }
          })
        }
      }
    })
    

    
  },
  // bindGetUserInfo (e) {
  //   console.log(e.detail.userInfo)
  // },

    })