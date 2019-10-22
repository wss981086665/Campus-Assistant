const api = require('../../api.js');

Page({

  data: {
    name: '',
    questions: '',
    hasvalue: true,
    ensure: false, 
    imageurl: [
      'https://b168.photo.store.qq.com/psb?/V11FQPcG0x3HZl/vLQ8ydlFPAYH3v5hcf1X.ZcxEs1c3ZQlXedIDhDRyp4!/b/dKgAAAAAAAAA&bo=4wgABeMIAAURBzA!&rf=viewer_4',
      'https://b289.photo.store.qq.com/psb?/V11FQPcG0x3HZl/Z.loEautTFlheoAjR.j2LnrKEln9Tn7RWP0jm1x1fuQ!/b/dCEBAAAAAAAA&bo=gAxABqAP0AcRCYw!&rf=viewer_4',
      'https://b290.photo.store.qq.com/psb?/V11FQPcG0x3HZl/fDJLAhypbErsHDA2C9NpmXbnI3glg1KvRc09WKhr.dQ!/b/dCIBAAAAAAAA&bo=gAegBYAHoAURCT4!&rf=viewer_4',
      'https://b289.photo.store.qq.com/psb?/V11FQPcG0x3HZl/RSqsGYQ0N06bNA8eWbIVFhrbRAv9y5ZTys8Szeq0j6Q!/b/dCEBAAAAAAAA&bo=qwYABUAQMAwRCfo!&rf=viewer_4'
    ],
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

  detail2: function () {
    wx.showToast({
      title: '暂未开放',
    })
  },

  onLoad: function (options) {
    this.setData({
      name: options.name
    })
    wx.showLoading({
      title: '正在加载',
    })
    var name = this.data.name;
    name = encodeURIComponent(name);
    name = encodeURIComponent(name);//二次编码
    var that = this;
    wx.request({
      url: api.ip + 'superadmin/getquestionsbycourse?name=' + name,
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

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})