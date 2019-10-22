const api = require('../../api.js');
const { $Message } = require('../../dist/base/index');

const app = getApp()

Page({
  data: {
    hiddenmodalput: true,

    username: '',
    userOpenid: '',
    userInfo: {},
    forumuser: '',
    hasUserInfo: false,
    searchword: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    ensure: false,            //如果false，正常展示图片
    imageurl:[
      'http://www.xztywss.top/img/luntan/helloworld1.jpg'
    ],
    hiddenmodalput: true,  
  },

  userinput:function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  bindViewTap2: function (e) {
    wx.getStorage({
      key: 'hasUserInfo',
      success: function(res) {
        if(res.data == true){
          wx.getStorage({
            key: 'userOpenid',
            success: function (res) {
              wx.navigateTo({
                url: '../listquestion/listquestion?openid=' + res.data
              })
            }
          })
        }else{
          $Message({
            content: '请先登录',
            type: 'warning'
          });
        }
      },
    })
  },

  bindViewTap3: function () {
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.getStorage({
            key: 'userOpenid',
            success: function (res) {
              wx.navigateTo({
                url: '../listanswer-me/listanswer-me?openid=' + res.data
              })
            }
          })
        } else {
          $Message({
            content: '请先登录',
            type: 'warning'
          });
        }
      },
    })
  },

  bindViewTap4: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })  
  },

  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    var searchword = this.data.searchword;
    wx.navigateTo({
      url: '../listarticle-author/listarticle-author?searchword='+searchword,
    })
  },  

  authorinput:function(e) {
    this.setData({
      searchword: e.detail.value
    })
  },

  bindViewTap5: function () {
    wx.navigateTo({
      url: 'declare'
    })
  },

  bindViewTap6:function() {
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.getStorage({
            key: 'userOpenid',
            success: function (res) {
              wx.navigateTo({
                url: '../listarticle-me/listarticle-me?openid='+res.data,
              })
            }
          })
        } else {
          $Message({
            content: '请先登录',
            type: 'warning'
          });
        }
      },
    })
  },

  bindViewTap7: function () {
    wx.showModal({
      title: '联系方式',
      content: '981086665'
    })
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo                  //userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorage({
      key: 'hasUserInfo',
      data: true,
    })
    var data = e.detail.userInfo;
    var avatarUrl = data.avatarUrl; 
    var city = data.city;
    var country = data.country; 
    var gender = data.gender; 
    var language = data.language;
    var nickName = data.nickName; 
    nickName = encodeURIComponent(nickName);
    nickName = encodeURIComponent(nickName);//二次编码
    var province = data.province;
    var that = this;
    wx.getStorage({
      key: 'code',                                               //code
      success: function(res) {
        wx.request({
          url: api.ip + 'user/adduser',
          data: {
            code: res.data,
            nickname: nickName,
            avatarUrl: avatarUrl,
          },
          header: {'content-type': 'application/json'},
          success: function (res) {
            var userOpenid = res.data.openid;                       //openid
            wx.setStorage({//存储到本地
              key: "userOpenid",
              data: userOpenid
            })
            wx.request({
              method: 'POST',
              url: api.ip + 'operateuser/inserforumuser?openid=' + userOpenid + '&avatarUrl=' + avatarUrl + '&city=' + city + '&country=' + country + '&gender=' + gender + '&language=' + language + '&nickName=' + nickName + '&province=' + province,
            })
          },
          fail: function () {wx.showToast({title: '连接服务器失败',icon: 'none'})
          }
        })
      },
    })
  },

  onLoad: function (options) {
    
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