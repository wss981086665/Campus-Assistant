const api = require('../../api.js');

Page({

  data: {
    name: '',
    questions: '',
    hasvalue: true,
    ensure: false, 
    imageurl: [
      
    ],
    questionimg: '',
    page: 0,
    hiddenpage: true
  },

  detail: function (e) {
    var id = e.currentTarget.dataset.id;
    var topic = e.currentTarget.dataset.topic;
    var author = e.currentTarget.dataset.author;
    var nickName = e.currentTarget.dataset.factor4;
    var openid = e.currentTarget.dataset.factor1;
    var avatarUrl = e.currentTarget.dataset.factor2;
    var content = e.currentTarget.dataset.content;
    var questionimg = e.currentTarget.dataset.factor6;
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.navigateTo({
            url: '../answer/answer?topic=' + topic + '&author=' + author + '&content=' + content + '&openid=' + openid + '&nickName=' + nickName + '&avatarUrl=' + avatarUrl + '&id=' + id + '&questionimg=' + questionimg,
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

  loadmore: function(){
    wx.showLoading({
      title: '正在加载',
    })
    var name = this.data.name;
    var that = this;
    var page = that.data.page + 1;
    wx.request({
      url: api.ip + 'superadmin/getquestionsbycourse?name=' + name + '&page=' + page * 10,
      method: 'GET',
      data: {},
      success: function (res) {
        var iquestions = res.data.questionlist;
        if (iquestions == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          if (iquestions.length == 0) {
            wx.showToast({
              title: '没有更多内容',
              icon: 'none',
              duration: 850
            })
          } else {
            var theques = that.data.questions;
            that.setData({
              questions: theques.concat(iquestions),
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

  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    var name = options.name;
    name = encodeURIComponent(name);
    name = encodeURIComponent(name);//二次编码
    var that = this;
    var page = that.data.page;
    wx.request({
      url: api.ip + 'superadmin/getquestionsbycourse?name=' + name + '&page=' + page * 10,
      method: 'GET',
      data: {},
      success: function (res) {
        var questions = res.data.questionlist;
        if (questions == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          if(questions.length==0){
            that.setData({
              hasvalue: false
            })
          }else{
            that.setData({
              questions: questions,
              name: name
            });
            if(questions.length == 10){
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

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})