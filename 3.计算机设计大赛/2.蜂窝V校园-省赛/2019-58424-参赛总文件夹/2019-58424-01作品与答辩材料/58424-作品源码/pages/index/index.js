const api = require('../../api.js');
const app = getApp()

Page({

  data: {
    ensure: false,          //如果false，正常展示图片
    imageurl: [
      'https://###'    //地址需要自行配置
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasuser: false,
    imgUrls: [],
    userid: '',
    articles: [],
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

  teacherbtn:function() {
    wx.switchTab({
      url: '../category/category',
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

  detail: function (e) {
    var id = e.currentTarget.dataset.id;
    var topic = e.currentTarget.dataset.topic;
    var author = e.currentTarget.dataset.author;
    var nickName = e.currentTarget.dataset.factor4;
    var openid = e.currentTarget.dataset.factor1;
    var avatarUrl = e.currentTarget.dataset.factor2;
    var content = e.currentTarget.dataset.content;
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.navigateTo({
            url: '../answer/answer?topic=' + topic + '&author=' + author + '&content=' + content + '&openid=' + openid + '&nickName=' + nickName + '&avatarUrl=' + avatarUrl + '&id=' + id,
          });
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

  listarticle: function (e) {
    var id = e.currentTarget.dataset.id.toString();
    wx.navigateTo({
      url: '../listarticle-display/listarticle-display?id=' + id,
    })
  },

  previewImage: function (e) {
    var articles = [e.currentTarget.dataset.src];
    wx.previewImage({
      urls: articles
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.getStorage({
      key: 'lunbodata',
      success: function(res) {
        that.setData({
          imgUrls: res.data
        })
      },
    })
    wx.request({
      url: api.ip + 'forarticle/getarticlebyfac2',
      method: 'GET',
      data: {},
      success: function (res) {
        var articles = res.data.articles;
        if (articles == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            articles: articles,
          });
          that.setData({
            image: articles
          })
          wx.hideLoading();
        }
      },
      fail:function() {
        wx.hideLoading();
      }
    })
  },

  onReady: function () {
    var that = this;
    wx.request({
      url: api.ip + 'ensure/ensurenumber',
      method: 'GET',
      data: {},
      success: function (res) {
        var ensure = res.data.ensure;
        var lunbodata = res.data.lunbodata;
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
            imgUrls: lunbodata
          });
          wx.setStorage({
            key: 'lunbodata',
            data: lunbodata,
          })
        }
      }
    })
  },

  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.getStorage({
            key: 'userInfo',
            success: function(res) {
              app.globalData.userInfo =  res.data,
              that.setData({
                hasuser: true
              })
              wx.getStorage({
                key: 'userid',
                success: function(res) {
                  that.setData({
                    userid: res.data
                  })
                },
              })
            },
          })
        }
      },
      fail: function () {
        wx.setStorage({
          key: 'hasUserInfo',
          data: false,
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