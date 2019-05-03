const api = require('../../api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: '',
    ensure: false,            //如果false，正常展示图片
    imageurl: [
      'https://##' //地址需要自行配置
    ]
  },
  
  selectin: function({detail}){
    wx.showToast({
      title: detail.title,
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'ensure',
      success: function (res) {
        that.setData({
          ensure: res.data
        })
        wx.getStorage({
          key: 'courses',
          success: function (res) {
            that.setData({
              course: res.data
            })
          }
        })
      }
    })
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