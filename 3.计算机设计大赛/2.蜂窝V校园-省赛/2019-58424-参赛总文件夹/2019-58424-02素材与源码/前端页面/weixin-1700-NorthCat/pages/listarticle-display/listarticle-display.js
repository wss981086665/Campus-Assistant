const api = require('../../api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    article: '',
    hiddenit: true,
    ensure: false,
    imageurl: [

    ],
  },

  coperate:function(e) {
    var hiddenit = this.data.hiddenit;
    var article = this.data.article;
    if(article.wechat == "" && article.qq == "" &&article.sign == "" && article.style=="" && article.school == "" && article.hobby == ""){
      wx.showToast({
        title: '没有更多信息',
        icon: "none",
        duration: 850
      })
    } else if(hiddenit){
      this.setData({
        hiddenit: false,
      })
    }else{
      this.setData({
        hiddenit: true,
      })
    }
  },

  onLoad: function (options) {
    this.data.id = options.id;
  },

  onReady: function () {
    var id = this.data.id;
    var that = this;
    wx.request({
      url: api.ip + 'forarticle/getarticlebyid?id=' + id,
      method: 'GET',
      data: {},
      success: function (res) {
        var article = res.data.article;
        if (article == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            article: article,
          });
          wx.hideLoading();
        }
      }
    })
    wx.getStorage({
      key: 'ensure',
      success: function (res) {
        that.setData({
          ensure: res.data
        })
      }
    })
  },

  onShow: function () {
    
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