const api = require('../../api.js');

Page({

  data: {
    moveData1: null,
    moveData2: null,
    moveData3: null,
    ensure: false ,           //如果false，正常展示图片
    imageurl: [
      'https://b289.photo.store.qq.com/psb?/V11FQPcG0x3HZl/RSqsGYQ0N06bNA8eWbIVFhrbRAv9y5ZTys8Szeq0j6Q!/b/dCEBAAAAAAAA&bo=qwYABUAQMAwRCfo!&rf=viewer_4'
    ],
  },

  discussbtn: function(){
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.navigateTo({
            url: '../homepage/homepage',
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '请先登录',
            confirmColor: '#33CC33',
            confirmText: '去登录',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../myself/myself',
                })
              }
            }
          })
        }
      },
    })
  },

  articlebtn: function(){
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.navigateTo({
            url: '../article/article',
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '请先登录',
            confirmColor: '#33CC33',
            confirmText: '去登录',
            success: function(res) {
              if(res.confirm){
                wx.switchTab({
                  url: '../myself/myself',
                })
              }
            }
          })
        }
      },
    })
  },

  proposebtn: function(){
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.navigateTo({
            url: '../advise/advise',
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '请先登录',
            confirmColor: '#33CC33',
            confirmText: '去登录',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../myself/myself',
                })
              }
            }
          })
        }
      },
    })
  },

  onLoad: function (options) {
    
  },

  onReady: function () {

  },

  onShow: function () {
    var that = this;
    var animation = wx.createAnimation({});
    //获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          widthScreen: res.screenWidth,
          heightScreen: res.screenHeight
        })
        animation.backgroundColor('#84C1FF').step({ duration: 1500 })
        that.setData({ moveData1: animation.export() })
        animation.backgroundColor('#84C1FF').step({ duration: 1500 })
        that.setData({ moveData1: animation.export() })
        animation.backgroundColor('#84C1FF').step({ duration: 1500 })
        that.setData({ moveData2: animation.export() })
        animation.backgroundColor('#84C1FF').step({ duration: 1500 })
        that.setData({ moveData3: animation.export() })
      },
    })
    wx.request({
      url: api.ip + 'ensure/ensurenumber',
      method: 'GET',
      data: {},
      success: function (res) {
        var ensure = res.data.ensure;
        if (ensure == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            ensure: ensure,
          });
        }
      }
    })
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    
  }
})