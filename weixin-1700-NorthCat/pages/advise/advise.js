const api = require('../../api.js');

Page({

  data: {
    ensure: false,           //如果false，正常展示图片
    imageurl: [
      
    ],
    advise: [
      { ida: '1', cou: "无法登陆" },
      { ida: '2', cou: "获取不到数据" },
      { ida: '3', cou: "小程序卡顿" },
      { ida: '4', cou: "小程序闪退" },
      { ida: '5', cou: "界面加载慢" },
      { ida: '6', cou: "界面错位" },
      { ida: '7', cou: "其他异常" },
      { ida: '8', cou: "添加课程" },
      { ida: '9', cou: "意见与反馈" },
    ],
  },

  onLoad: function (options) {
    
  },

  onReady: function () {
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

  onShow: function () {
    
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