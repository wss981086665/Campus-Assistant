//app.js
const api = require('api.js');

App({

  globalData: {
    ensure: false,
    hasUserInfo: false
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

    wx.request({
      url: api.ip + 'ensure/ensurenumber',
      method: 'GET',
      data: {},
      success: function (res) {
        var ensure = res.data.ensure;
        var courses = res.data.courses;
        var slider = res.data.slider;
        var coursename = res.data.coursename;
        if (ensure) {
          wx.setStorage({
            key: 'ensure',
            data: true,
          })
          wx.setStorage({
            key: 'courses',
            data: courses,
          })
          wx.setStorage({
            key: 'slider',
            data: slider,
          })
          wx.setStorage({
            key: 'coursename',
            data: coursename,
          })
        }else if(!ensure){
          wx.setStorage({
            key: 'ensure',
            data: false,
          })
        }
      },
      fail: function(){
        wx.setStorage({
          key: 'ensure',
          data: false,
        })
      } 
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