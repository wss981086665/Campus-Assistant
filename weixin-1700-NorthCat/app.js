//app.js
const api = require('api.js');

App({

  globalData: {
         
  },

  onLaunch: function () {

    var that = this;
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.setStorage({
          key: 'code',
          data: code,
        })
      }
    })

    wx.setStorage({
      key: 'hasUserInfo',
      data: false,
    })

  },

  onShow: function () {
    console.log("----onShow----");
  },
  onHide: function () {
    console.log("----onHide----");
  },

  myData: {
    username: "谢清照"
  }

})