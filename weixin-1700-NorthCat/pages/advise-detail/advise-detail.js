const app = getApp();
const api = require('../../api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ensure: false,           //如果false，正常展示图片
    imageurl: [

    ],
    cou: '',
    content: '',
    contact: '',
    contentlength: 0,
    userOpenid: '',
    userInfo: {},
  },

  contentinput:function(e) {
    this.setData({
      content: e.detail.value,
      contentlength: e.detail.value.length
    })
  },

  contactnumber:function(e) {
    this.setData({
      contact: e.detail.value,
    })
  },

  submit:function(e) {
    var thetype = e.currentTarget.dataset.thetype;
    var nickName = this.data.userInfo.nickName;
    var content = this.data.content;
    var contact  = this.data.contact;
    content = encodeURIComponent(content);
    content = encodeURIComponent(content);//二次编码
    if (content.length <= 10) {
      wx.showToast({
        title: '请最少输入10个字',
        icon: 'none'
      })
    }else {
      thetype = encodeURIComponent(thetype);
      thetype = encodeURIComponent(thetype);//二次编码
      nickName = encodeURIComponent(nickName);
      nickName = encodeURIComponent(nickName);//二次编码
      contact = encodeURIComponent(contact);
      contact = encodeURIComponent(contact);//二次编码
      wx.getStorage({
        key: 'userOpenid',
        success: function (res) {
          wx.request({
            method: 'POST',
            url: api.ip + 'forfeedback/insertfeedbackbyid?type=' + thetype + '&content=' + content + '&contact=' +
              contact + '&nickName=' + nickName + '&openid=' + res.data,
          }),
            wx.showToast({
              title: '感谢您的反馈',
              duration: 1500
            })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }, 1500)
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cou: options.cou,
      userInfo: app.globalData.userInfo, //用户的userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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