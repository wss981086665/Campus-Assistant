const app = getApp();
const api = require('../../api.js');

Page({

  data: {
    topic: "",
    nickName: '',
    author: '',
    content: '',
    openid: '',
    id: '',
    question: '',
    questions: '',
    textcontent: '',
    userOpenid: '',
    inputShowed: false,
    hasadministor: false,
    inputVal: "",
    hasvalue: true,
    havevalue: true,
    userInfo: {},
    ensure: false, 
    imageurl: [
      
    ],
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      havevalue: true
    });
    var that = this;
    wx.request({
      url: api.ip + 'superadmin/getsixquestion',
      method: 'GET',
      data: {},
      success: function (res) {
        var questions = res.data.questions;
        if (questions == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            questions: questions,
          });
        }
      }
    })
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      havevalue: false,
    });
    if (this.data.inputVal == '') {
      this.setData({
        havevalue: true
      });
    }
  },

  searchin: function () {
    // wx.showToast({
    //   title: this.data.inputVal,
    // })
    var that = this;
    var index = this.data.inputVal;
    index = encodeURIComponent(index);
    index = encodeURIComponent(index);//二次编码
    wx.request({
      url: api.ip + 'superadmin/searchquestion?index=' + index,
      method: 'GET',
      data: {},
      success: function (res) {
        var questions = res.data.questions;
        if (questions == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            questions: questions,
            havevalue: true,
            inputShowed: false
          });
        }
      }
    })
  },

  large: function () {
    var animation = wx.createAnimation({
      duration: 1000,
    })
    animation.width(500).step();
  },
  refresh: function (e) {
    var that = this;
    setTimeout(function () {
      wx.request({
        url: api.ip + 'superadmin/getrandomquestion',
        method: 'GET',
        data: {},
        success: function (res) {
          var questions = res.data.questions;
          if (questions == null) {
            var toastText = '获取数据失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000 //弹出时间
            })
          } else {
            that.setData({
              questions: questions,
            });
          }
        }
      })
    }, 1000)
  },

  deleteit:function(e){
    var questionid = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '请谨慎删除用户的问题？',
      confirmColor: '#FF0000',
      confirmText: '删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api.ip + 'superadmin/deletequestionbyid?id=' + questionid,
          })
          that.onLoad();
        }
      }
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

  detail2:function(){
    wx.showToast({
      title: '暂未开放',
    })
  },

  askquestion: function () {
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.navigateTo({
            url: '../question/question',
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

  searchinput: function (e) {
    this.setData({
      textcontent: e.detail.value
    })
  },

  search: function () {
    var searchtext = this.data.textcontent;
    // console.log(username);
    wx.navigateTo({
      url: '../listquestion/listquestion?username=' + searchtext
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        that.setData({
          userOpenid: res.data
        })
        var openid = res.data;
        wx.request({
          url: api.ip + 'superadmin/getrandomquestion?openid='+openid,
          method: 'GET',
          data: {},
          success: function (res) {
            var questions = res.data.questions;
            var hasadministor = res.data.hasadministor;
            if (questions == null) {
              var toastText = '获取数据失败' + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000 //弹出时间
              })
            } else {
              if (questions.length == 0) {
                that.setData({
                  hasvalue: false
                })
              } else {
                that.setData({
                  questions: questions,
                  hasadministor: hasadministor,
                });
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
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    // that.setData({
    //   hideHeader: false
    // }),
    wx.request({
      url: api.ip + 'superadmin/getrandomquestion',
      method: 'GET',
      data: {},
      success: function (res) {
        var questions = res.data.questions;
        if (questions == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            questions: questions
            // hideHeader: true
          });
        }
      }
    })
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})