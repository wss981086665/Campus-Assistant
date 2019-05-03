const api = require('../../api.js');

Page({

  data: {
    openid: '',
    hasvalue: true,
    articlelist: [],
    ensure: false,
    judgedelete: true,
    rejudge: true,
    imageurl: [
      
    ],
    page: 0,
    hiddenpage: true
  },

  listarticle:function(e) {
    var id = e.currentTarget.dataset.id.toString();
    wx.navigateTo({
      url: '../listarticle-display/listarticle-display?id='+id,
    })
  },

  delete:function(e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除吗？',
      confirmColor: '#FF0000',
      confirmText: '删除',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在处理',
          })
          wx.request({
            url: api.ip + 'forarticle/deletesrticlebyid?id=' + id,
            success:function() {
              wx.showToast({
                title: '删除成功',
              })
              that.onLoad();
            }
          })
        }
      }
    })
  },

  previewImage: function (e) {
    var articles = [e.currentTarget.dataset.src];
    wx.previewImage({
      urls: articles
    })
  },

  condelete: function () {
    this.setData({
      judgedelete: false
    })
  },

  nodelete: function () {
    this.setData({
      judgedelete: true
    })
  },

  loadmore:function() {
    var that = this;
    var page = that.data.page + 1;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: api.ip + 'forarticle/getarticlebyopenid?openid=' + res.data + "&page=" + page * 10,
          method: 'GET',
          data: {},
          success: function (res) {
            var iarticlelist = res.data.articlelist;
            if (iarticlelist == null) {
              var toastText = '获取数据失败' + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000 //弹出时间
              })
            } else {
              if (iarticlelist.length == 0) {
                wx.showToast({
                  title: '没有更多内容',
                  icon: 'none',
                  duration: 850
                })
              } else {
                var thearts = that.data.articlelist;
                that.setData({
                  articlelist: thearts.concat(iarticlelist),
                  page: page
                });
                wx.showToast({
                  title: '加载成功',
                  duration: 850
                })
              }
            }
          }
        })
      },
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    var page = that.data.page;
    wx.getStorage({
      key: 'userOpenid',
      success: function(res) {
        wx.request({
          url: api.ip + 'forarticle/getarticlebyopenid?openid=' + res.data + "&page=" + page,
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
                  hasvalue: false,
                })
              } else {
                that.setData({
                  articlelist: articlelist,
                  rejudge: false
                });
                if (articlelist.length == 10) {
                  that.setData({
                    hiddenpage: false
                  })
                }
              }
              wx.hideLoading();
            }
          }
        })
      },
    })
  },

  onReady: function () {
    
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