const api = require('../../api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOpenid: '',
    ensure: false,
    hasvalue: true,
    imageurl: [

    ],
    myanswerlist: ''
  },

  toquestion:function(e) {
    var questionid = e.currentTarget.dataset.questionid;
    wx.request({
      url: api.ip + 'superadmin/getquestionbyid?id=' + questionid,
      method: 'GET',
      data: {},
      success: function (res) {
        var question = res.data.question;
        var id = question.id;
        var topic = question.topic;
        var author = question.author;
        var nickName = question.factor4;
        var openid = question.factor1;
        var avatarUrl = question.factor2;
        var content = question.content;
        if (question == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          wx.navigateTo({
            url: '../answer/answer?topic=' + topic + '&author=' + author + '&content=' + content + '&openid=' + openid + '&nickName=' + nickName + '&avatarUrl=' + avatarUrl + '&id=' + id,
          })
        }
      }
    })
  },

  delete:function(e) {
    var ids = e.currentTarget.dataset.ids.toString();
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除吗？',
      confirmColor: '#FF0000',
      confirmText: '删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api.ip + 'superroot/deleteanswerbyids?ids=' + ids,
          })
          that.onReady();
        }
      }
    })
  },
  
  onLoad: function (options) {
    this.data.userOpenid = options.openid;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: api.ip + 'superroot/getanswersbyopenid?factor1=' + res.data,
          method: 'GET',
          data: {},
          success: function (res) {
            var answerlist = res.data.answerlist;
            if (answerlist == null) {
              var toastText = '获取数据失败' + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000 //弹出时间
              })
            } else {
              if (answerlist.length == 0) {
                that.setData({
                  hasvalue: false
                })
              } else {
                that.setData({
                  myanswerlist: answerlist
                });
              }
              wx.hideLoading();
            }
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
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
            ensure: ensure
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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