const api = require('../../api.js');

Page({

  data: {
    questionid: '',
    answerlist: '',
    hasvalue: true,
    ensure: false, 
    imageurl: [
      
    ],
  },

  onLoad: function (options) {
    this.setData({
      questionid: options.questionid,
    })
  },

  onReady: function () {
    var questionid = this.data.questionid; 
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: api.ip + 'superroot/getanswersbyquestionid?questionid=' + questionid,
      method: 'GET',
      data: {},
      success: function (res) {
        var answerlist = res.data.answerlist;
        if (answerlist == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          if (answerlist.length == 0) {
            that.setData({
              hasvalue: false
            })
          } else {
            that.setData({
              answerlist: answerlist,
            });
          }
          wx.hideLoading();
        }
      }
    });
  },

  onShow: function () {
    var that = this;
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