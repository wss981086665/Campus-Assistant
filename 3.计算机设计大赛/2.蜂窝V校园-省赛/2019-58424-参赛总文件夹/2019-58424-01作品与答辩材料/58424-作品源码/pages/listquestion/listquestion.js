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
    judgedelete: true,
    rejudge: true,
    imageurl: [
      
    ],
    previews2: [],
    page: 0,
    hiddenpage: true
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
          wx.showLoading({
            title: '正在处理',
          })
          wx.request({
            url: api.ip + 'superadmin/deletequestionbyid?id=' + questionid,
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

  condelete: function() {
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
        var openid = res.data;
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: api.ip + 'superadmin/getquestionsbyopenid?factor1=' + openid + '&page=' + page * 10,
          method: 'GET',
          data: {},
          success: function (res) {
            var iquestionlist = res.data.questionlist;
            if (iquestionlist == null) {
              var toastText = '获取数据失败' + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000 //弹出时间
              })
            } else {
              if (iquestionlist.length == 0) {
                wx.showToast({
                  title: '没有更多内容',
                  icon: 'none',
                  duration: 850
                })
              } else {
                var theques = that.data.questionlist;
                that.setData({
                  questionlist: theques.concat(iquestionlist),
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
    var page = that.data.page;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        var openid = res.data;
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: api.ip + 'superadmin/getquestionsbyopenid?factor1=' + openid + '&page=' + page * 10,
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
              if (questionlist.length == 0) {
                that.setData({
                  hasvalue: false
                })
              } else {
                that.setData({
                  questionlist: questionlist,
                  rejudge: false,
                });
                if (questionlist.length == 10) {
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