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
    userid: '',
    hasUserInfo: false,
    searchword: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    ensure: null,            //如果false，正常展示图片
    imageurl: [
      'http://www.xztywss.top/img/timg4.jpg'
    ],
    hiddenmodalput: true,  

    hasadministor: false,
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
      content: '981086665@qq.com'
    })
  },

  bindViewTap8: function() {
    wx.navigateTo({
      url: 'award',
    })
  },

  bindViewTap9:function() {
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.getStorage({
            key: 'userOpenid',
            success: function (res) {
              wx.navigateTo({
                url: '../apply-teacher/apply-teacher',
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

  bindViewTap10: function () {
    wx.navigateTo({
      url: '../apply-teacher-look/apply-teacher-look',
    })
  },

  getUserInfo: function (e) {
    wx.showLoading({
      title: '正在加载',
    })
    app.globalData.userInfo = e.detail.userInfo                  //userInfo
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

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
      success:function() {
        wx.setStorage({
          key: 'hasUserInfo',
          data: true,
          success:function() {
            wx.getStorage({
              key: 'code',                                               //code
              success: function (res) {
                wx.request({
                  url: api.ip + 'user/adduser',
                  data: {
                    code: res.data,
                    nickname: nickName,
                    avatarUrl: avatarUrl,
                  },
                  header: { 'content-type': 'application/json' },
                  success: function (res) {
                    var userOpenid = res.data.openid;                       //openid
                    wx.setStorage({//存储到本地
                      key: "userOpenid",
                      data: userOpenid,
                      success:function() {
                        wx.request({
                          method: 'GET',
                          url: api.ip + 'operateuser/inserforumuser?openid=' + userOpenid + '&avatarUrl=' + avatarUrl + '&city=' + city + '&country=' + country + '&gender=' + gender + '&language=' + language + '&nickName=' + nickName + '&province=' + province,
                          success: function (res) {
                            var userid = res.data.userid;
                            var hasadministor = res.data.hasadministor;
                            if (userid == null) {
                              var toastText = '获取数据失败' + res.data.errMsg;
                              wx.showToast({
                                title: toastText,
                                icon: '',
                                duration: 2000 //弹出时间
                              })
                            } else {
                              that.setData({
                                userid: userid,
                                hasadministor: hasadministor
                              });
                              wx.setStorage({
                                key: 'userid',
                                data: userid,
                                success:function() {
                                  wx.setStorage({
                                    key: 'hasadministor',
                                    data: hasadministor,
                                    success:function() {
                                      wx.showToast({
                                        title: 'success',
                                      })
                                    }
                                  })
                                }
                              })                             
                            }
                          }
                        })
                      }
                    })
                  },
                  fail: function () {
                    wx.showToast({ title: '连接服务器失败', icon: 'none' })
                  }
                })
              },
            })
          }
        })
      }
    })
  },

  onLoad: function (options) {
    
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
    wx.getStorage({
      key: 'hasUserInfo',
      success: function (res) {
        if (res.data == true) {
          wx.getStorage({
            key: 'userInfo',
            success: function (ress) {
              app.globalData.userInfo = ress.data,
              that.setData({
                hasUserInfo: true,
                userInfo: ress.data
              })
              wx.getStorage({
                key: 'userid',
                success: function (res) {
                  that.setData({
                    userid: res.data
                  })
                  wx.getStorage({
                    key: 'hasadministor',
                    success: function(ress) {
                      that.setData({
                        hasadministor: ress.data
                      })
                    },
                  })
                },
              })
            },
          })
        }
      },
      fail: function() {
        wx.setStorage({
          key: 'hasUserInfo',
          data: false,
        })
      }
    })
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: '正在刷新',
    })
    var that = this;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        wx.request({
          method: 'GET',
          url: api.ip + 'operateuser/getuserid?openid=' + res.data,
          success: function (ress) {
            var userid = ress.data;
            if (userid == null) {
              var toastText = '获取数据失败' + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000 //弹出时间
              })
            } else {
              that.setData({
                userid: userid
              });
              wx.setStorage({
                key: 'userid',
                data: userid,
                success: function () {
                  wx.showToast({
                    title: '刷新成功',
                    success:function() {
                      wx.hideNavigationBarLoading() //完成停止加载
                      wx.stopPullDownRefresh() //停止下拉刷新
                    }
                  })
                }
              })
            }
          },
          fail:function() {
            wx.hideLoading();
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }
        })
      },
      fail:function() {
        wx.hideLoading();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    
  }
})