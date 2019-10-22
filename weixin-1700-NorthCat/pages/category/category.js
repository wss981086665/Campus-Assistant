const api = require('../../api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: '',
    ensure: false,            //如果false，正常展示图片
    imageurl:[
      'https://b289.photo.store.qq.com/psb?/V11FQPcG0x3HZl/RSqsGYQ0N06bNA8eWbIVFhrbRAv9y5ZTys8Szeq0j6Q!/b/dCEBAAAAAAAA&bo=qwYABUAQMAwRCfo!&rf=viewer_4'
    ]
  },
  
  selectin: function({detail}){
    wx.showToast({
      title: detail.title,
    })
  },

  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
        var courses = res.data.courses;
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
            course: courses
          });
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