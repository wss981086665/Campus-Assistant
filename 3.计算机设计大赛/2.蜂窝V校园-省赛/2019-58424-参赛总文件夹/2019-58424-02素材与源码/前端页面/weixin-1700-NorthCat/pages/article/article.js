const api = require('../../api.js');

Page({


  data: {
    width: '',
    height: '',
    title: '',
    content: '',
    wordnum: 0,
    ensure: false, 
    imageurl: [
      
    ],
  },

  titleinput:function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  
  contentinput:function(e) {
    var wordnum = e.detail.value.length
    this.setData({
      content: e.detail.value,
      wordnum: wordnum
    })
  },

  returntoindex: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },

  nextit: function(){
    var title = this.data.title;
    var content = this.data.content;
    var wordnum =  this.data.wordnum;
    if(title == ''){
      wx.showToast({
        title: '文章标题不能为空',
        icon: 'none'
      })
    }else if(content == ''){
      wx.showToast({
        title: '文章内容不能为空',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '../article-detail/article-detail?title=' + title + '&content=' + content + '&wordnum=' + wordnum,
      })
    }
  },

  onLoad: function (options) {
    
  },

  onReady: function () {
    var that = this;
    //获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.screenWidth,
          height: res.screenHeight-100
        })
      }
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