const app = getApp();
const api = require('../../api.js');

Page({

  data: {
    topic: '',
    author: '',
    content: '',
    nickName: '',
    avatarUrl: '',
    id: '',
    replycontent: '',
    userOpenid: '',
    openid: '',
    userInfo: {},

    praiseimg: 'http://www.xztywss.top/img/luntan/praise.png',
    praiser: '',
    judge: '',
    hiddenit: true,

    hasUserInfo: false,
    ensure: false,
    imageurl: [
      
    ],
  },

  praiseit: function(e){
    this.setData({
      praiseimg: 'http://www.xztywss.top/img/luntan/inpraise.png'
    })
    var nickName = this.data.userInfo.nickName;
    nickName = encodeURIComponent(nickName);
    nickName = encodeURIComponent(nickName);//二次编码
    var that = this;

    var id = e.currentTarget.dataset.id;
    var openid = e.currentTarget.dataset.openid;
    wx.request({
      url: api.ip + 'visitpraise/insertpraise?questionid=' + id + '&nickName=' + nickName + '&openid=' + openid,
      method: 'POST',
      data: {},
      fail: function(){
        wx.showToast({
          title: '连接错误',
          icon: 'none'
        })
      }
    })  
  },

  shareit:function(){
    wx.showToast({
      title: '暂未开放',
    })
  },

  replyit: function (e) {
    this.setData({
      replycontent: e.detail.value
    })
  },

  showcommit:function() {


    if(this.data.hiddenit == true){
      this.setData({
        hiddenit: false
      })
    }else{
      this.setData({
        hiddenit: true
      })
    }
  },

  commentit: function(e){
    this.setData({
      hiddenit: true
    })
    var replycontent = this.data.replycontent;
    var avatarUrl = app.globalData.userInfo.avatarUrl;
    var nickName = app.globalData.userInfo.nickName;
    var that = this;

    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          var id = e.currentTarget.dataset.id;
          var userOpenid = e.currentTarget.dataset.openid;
          var newarray = [
            { ids: '', questionid: id, answercontent: replycontent, element1: userOpenid, element2: avatarUrl, element3: nickName}
          ];
          var answerlist = newarray.concat(that.data.answerlist);
          replycontent = encodeURIComponent(replycontent);
          replycontent = encodeURIComponent(replycontent);//二次编码
          nickName = encodeURIComponent(nickName);
          nickName = encodeURIComponent(nickName);//二次编码
          wx.request({
            url: api.ip + 'superroot/insertanswerbyid?questionid=' + id + '&answercontent=' +
              replycontent + '&element1=' + userOpenid + '&element2=' + avatarUrl + '&element3=' + nickName,
            method: 'POST',
            data: {},
          })
          that.setData({
            answerlist:answerlist
          })
        } else {
         wx.showModal({
           title: '温馨提示',
           content: '请先登录',
         })
        }
      },
    })
  },

  onLoad: function (options) {
    this.setData({
      id: options.id,
      topic: options.topic,
      author: options.author,
      content: options.content,
      openid: options.openid,
      avatarUrl: options.avatarUrl,
      nickName: options.nickName,
      userInfo: app.globalData.userInfo, //用户的userInfo
    })                
    var nickName = this.data.userInfo.nickName;
    nickName = encodeURIComponent(nickName);
    nickName = encodeURIComponent(nickName);//二次编码
    var id = this.data.id;
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: api.ip + 'visitpraise/getpraiser?questionid=' + id + '&nickName=' + nickName,
      method: 'GET',
      data: {},
      success: function (res) {
        var praiser = res.data.praiser;
        var judge = res.data.judge;
        if (praiser == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            praiser: praiser.toString(),
            judge: judge,
          })
          if(that.data.judge == 'yes'){
            that.setData({
              praiseimg: 'http://www.xztywss.top/img/luntan/inpraise.png'
            })
          }
        }
      }
    })
  },

  onReady: function () {
    var that = this;
    var id = that.data.id;
    wx.request({
      url: api.ip + 'superroot/getanswersbyquestionid?questionid=' + id,
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
          that.setData({
            answerlist: answerlist,
          });
          wx.hideLoading();
        }
      }
    });
  },

  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        that.setData({
          userOpenid: res.data
        })
      },
    })
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