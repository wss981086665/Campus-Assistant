const api = require('../../api.js');

Page({

  data: {
    questionid: '',
    answerlist: '',
    hasvalue: true,
    ensure: false, 
    imageurl: [
      
    ],
    previews2: [],
  },

  showcommentimg: function (e) {
    var index = e.currentTarget.dataset.demo;
    var newarray = [index];
    this.data.previews2 = this.data.previews2.concat(newarray);
    var previews2 = this.data.previews2
    wx.previewImage({
      urls: previews2
    })
    this.data.previews2 = []
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
    wx.getStorage({
      key: 'ensure',
      success: function (res) {
        that.setData({
          ensure: res.data
        })
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