const api = require('../../api.js');

// pages/listquestion/listquestion.js
Page({

  data: {
    username: '',
    questionlist: '',
    questionid: '',
    openid: '',
    hasvalue: true,
    ensure: false, 
    imageurl: [
      'https://b168.photo.store.qq.com/psb?/V11FQPcG0x3HZl/vLQ8ydlFPAYH3v5hcf1X.ZcxEs1c3ZQlXedIDhDRyp4!/b/dKgAAAAAAAAA&bo=4wgABeMIAAURBzA!&rf=viewer_4',
      'https://b289.photo.store.qq.com/psb?/V11FQPcG0x3HZl/Z.loEautTFlheoAjR.j2LnrKEln9Tn7RWP0jm1x1fuQ!/b/dCEBAAAAAAAA&bo=gAxABqAP0AcRCYw!&rf=viewer_4',
      'https://b290.photo.store.qq.com/psb?/V11FQPcG0x3HZl/fDJLAhypbErsHDA2C9NpmXbnI3glg1KvRc09WKhr.dQ!/b/dCIBAAAAAAAA&bo=gAegBYAHoAURCT4!&rf=viewer_4',
      'https://b289.photo.store.qq.com/psb?/V11FQPcG0x3HZl/RSqsGYQ0N06bNA8eWbIVFhrbRAv9y5ZTys8Szeq0j6Q!/b/dCEBAAAAAAAA&bo=qwYABUAQMAwRCfo!&rf=viewer_4'
    ],
  },

  checkanswer: function(e){
    this.setData({
      questionid: e.currentTarget.dataset.id,
    })
    var questionid = this.data.questionid;
    wx.navigateTo({
      url: '../listanswer/listanswer?questionid=' + questionid,
    })
  },

  solved:function(){
    wx.showToast({
      title: '敬请期待',
    })
  },

  delete: function(e) {
    var questionid = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除吗？',
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

  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        var openid = res.data;
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: api.ip + 'superadmin/getquestionsbyopenid?factor1=' + openid,
          method: 'GET',
          data: {},
          success: function (res) {
            var questionlist = res.data.questionlist;
            if (questionlist == null) {
              var toastText = '获取数据失败' + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000 //弹出时间
              })
            } else {
              if(questionlist.length==0){
                that.setData({
                  hasvalue: false
                })
              }else{
                if (questionlist.length == 0) {
                  that.setData({
                    hasvalue: false
                  })
                } else {
                  that.setData({
                    questionlist: questionlist,
                  });
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