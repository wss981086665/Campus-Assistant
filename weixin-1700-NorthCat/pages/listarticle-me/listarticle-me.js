const api = require('../../api.js');

Page({

  data: {
    openid: '',
    hasvalue: true,
    articlelist: '',
    ensure: false,
    imageurl: [
      
    ],
  },

  listarticle:function(e) {
    var id = e.currentTarget.dataset.id.toString();
    wx.navigateTo({
      url: '../listarticle-display/listarticle-display?id='+id,
    })
  },

  onLoad: function (options) {
    this.data.openid = options.openid;
    var openid = this.data.openid;
    var that = this;
    wx.request({
      url: api.ip + 'forarticle/getarticlebyopenid?openid=' + openid,
      method: 'GET',
      data: {},
      success: function (res) {
        var articlelist = res.data.articlelist;
        if (articlelist == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          if (articlelist.length == 0) {
            that.setData({
              hasvalue: false
            })
          } else {
            that.setData({
              articlelist: articlelist,
            });
          }
          wx.hideLoading();
        }
      }
    })
  },

  onReady: function () {
    
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