const app = getApp();
const api = require('../../api.js');
var util = require('../../utils/util.js');

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
    praiseimg: '../../image/praise.png',
    praiser: '',
    judge: '',
    hiddenit: true,

    hasUserInfo: false,
    hasAnswer: true,
    ensure: false,
    imageurl: [
      
    ],
    questionimg: '',
    commentimg: [],
    previews: [],
    previews2: [],
    // hasimg: ''

    hasadministor: false,
  },

  praiseit: function(e){
    this.setData({
      praiseimg: '../../image/inpraise.png'
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

  supertoa:function() {
    wx.switchTab({
      url: '../index/index'
    })
  },

  onShareAppMessage: function (res) {
    let gbid = res.target.dataset.info.order_id;
    return {
      title: '这道题不会做，老铁快来帮帮我!',
      desc: '这道题不会做，老铁快来帮帮我!',
      path: '/pages/imgroup/imgroup?tgid=' + gbid
    }
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
    this.setData({
      hiddenit: false
    })
  },

  commentit: function(e){
    wx.showLoading({
      title: '正在发送',
    })
    var replycontent = this.data.replycontent;
    var avatarUrl = app.globalData.userInfo.avatarUrl;
    var nickName = app.globalData.userInfo.nickName;
    var that = this;
    if(replycontent == ''){
      wx.showToast({
        title: '请输入有效的内容',
        icon: 'none'
      })
    }else{
      wx.getStorage({
        key: 'hasUserInfo',
        success: function (res) {
          if (res.data === true) {
            var id = e.currentTarget.dataset.id;
            var userOpenid = e.currentTarget.dataset.openid;

            wx.request({
              method: 'GET',
              url: api.ip + 'operateuser/judgeteacher?openid=' + userOpenid,
              success:function(res) {
                var result = res.data;
                var TIME = util.formatTime(new Date());
                var filePath = that.data.commentimg;
                replycontent = encodeURIComponent(replycontent);
                replycontent = encodeURIComponent(replycontent);//二次编码
                nickName = encodeURIComponent(nickName);
                nickName = encodeURIComponent(nickName);//二次编码
                result = encodeURIComponent(result);
                result = encodeURIComponent(result);//二次编码
                if (filePath[0] == null) {
                  wx.request({
                    url: api.ip + 'superroot/insertanswerbyid?questionid=' + id + '&answercontent=' +
                      replycontent + '&element1=' + userOpenid + '&element2=' + avatarUrl + '&element3=' + nickName + '&element4=' + TIME + '&element5=defaultimg.jpg' + '&element6=' + result,
                    method: 'POST',
                    data: {},
                    success: function () {
                      wx.showToast({
                        title: '发送成功',
                        success:function() {
                          that.setData({
                            hiddenit: true,
                            hasAnswer: true
                          })
                          that.onReady();
                        }
                      })
                    }
                  })
                } else {
                  wx.uploadFile({
                    url: api.ip + 'ensure/uploadfile',
                    filePath: filePath[0],
                    name: 'file',
                    formData: {
                      'user': '王顺顺'
                    },
                    header: {
                      'content-type': 'multipart/form-data'
                    }, // 设置请求的 header
                    success: function (res) {
                      var filename = res.data;
                      if (filename) {
                        wx.request({
                          url: api.ip + 'superroot/insertanswerbyid?questionid=' + id + '&answercontent=' +
                            replycontent + '&element1=' + userOpenid + '&element2=' + avatarUrl + '&element3=' + nickName + '&element4=' + TIME + '&element5=' + filename + '&element6=' + result,
                          method: 'POST',
                          data: {},
                          success: function () {
                            that.setData({
                              commentimg: [],
                              hiddenit: true,
                              hasAnswer: true
                            })
                            wx.showToast({
                              title: '发送成功',
                              success:function() {
                                that.onReady();
                              }
                            })
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          } else {
            wx.showModal({
              title: '温馨提示',
              content: '请先登录',
            })
          }
        },
      })
    }
  },

  cancle:function() {
    this.setData({
      hiddenit: true,
      commentimg: []
    })
  },

  removeImage(e) {
    this.setData({
      commentimg: []
    })
  },

  handleImagePreview(e) {
    const commentimg = this.data.commentimg
    wx.previewImage({
      urls: commentimg,  //所有要预览的图片
    })
  },

  previewImage:function() {
    var that = this;
    var newarray = ["https://www.xztywss.top/img/upload/"+that.data.questionimg];
    that.data.previews = this.data.previews.concat(newarray);
    var previews = that.data.previews
    wx.previewImage({
      urls: previews
    })
  },

  chooseimg:function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        const commentimg = that.data.commentimg.concat(res.tempFilePaths)
        that.setData({
          commentimg: commentimg.length <= 1 ? commentimg : commentimg.slice(0, 1)
        })
      }
    })
  },

  showcommentimg:function(e) {
    var index = e.currentTarget.dataset.demo;
    var newarray = [index];
    this.data.previews2 = this.data.previews2.concat(newarray);
    var previews2 = this.data.previews2
    wx.previewImage({
      urls: previews2
    })
    this.data.previews2 = []
  },

  delete: function (e) {
    var ids = e.currentTarget.dataset.ids;
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
            url: api.ip + 'superroot/deleteanswerbyids?ids=' + ids,
            success: function () {
              wx.showToast({
                title: '删除成功',
              })
              that.onReady();
            }
          })
        }
      }
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
      questionimg: options.questionimg,
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
          wx.getStorage({
            key: 'hasadministor',
            success: function (res) {
              that.setData({
                hasadministor: res.data,
                praiser: praiser.toString(),
                judge: judge,
              })
              if (that.data.judge == 'yes') {
                that.setData({
                  praiseimg: '../../image/inpraise.png'
                })
              }
            },
          })
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
          if(answerlist.length == 0){
            that.setData({
              hasAnswer: false
            })
          }else{
            that.setData({
              answerlist: answerlist,
            })
          }
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