const api = require('../../api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOpenid: '',
    ensure: false,
    hasvalue: true,
    judgedelete: true,
    rejudge: true,
    imageurl: [

    ],
    myanswerlist: [],
    previews2: [],
    page: 0,
    hiddenpage: true
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
        var questionimg = question.factor6;
        if (question == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          wx.navigateTo({
            url: '../answer/answer?topic=' + topic + '&author=' + author + '&content=' + content + '&openid=' + openid + '&nickName=' + nickName + '&avatarUrl=' + avatarUrl + '&id=' + id+'&questionimg='+questionimg,
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
            success:function() {
              that.onReady();
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

  loadmore: function() {
    var that = this;
    var page = that.data.page +1;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: api.ip + 'superroot/getanswersbyopenid?element1=' + res.data + '&page=' + page * 10,
          method: 'GET',
          data: {},
          success: function (res) {
            var ianswerlist = res.data.answerlist;
            if (ianswerlist == null) {
              var toastText = '获取数据失败' + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000 //弹出时间
              })
            } else {
              if (ianswerlist.length == 0) {
                wx.showToast({
                  title: '没有更多内容',
                  icon: 'none',
                  duration: 850
                })
              } else {
                var theans = that.data.myanswerlist;
                that.setData({
                  myanswerlist: theans.concat(ianswerlist),
                  page : page
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
    this.data.userOpenid = options.openid;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var page = that.data.page;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: api.ip + 'superroot/getanswersbyopenid?element1=' + res.data + '&page=' + page,
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
                  myanswerlist: answerlist,
                  rejudge: false,
                });
                if (answerlist.length == 10) {
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

  /**
   * 生命周期函数--监听页面显示
   */
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