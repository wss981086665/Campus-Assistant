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
      'https://b168.photo.store.qq.com/psb?/V11FQPcG0x3HZl/vLQ8ydlFPAYH3v5hcf1X.ZcxEs1c3ZQlXedIDhDRyp4!/b/dKgAAAAAAAAA&bo=4wgABeMIAAURBzA!&rf=viewer_4',
      'https://b289.photo.store.qq.com/psb?/V11FQPcG0x3HZl/Z.loEautTFlheoAjR.j2LnrKEln9Tn7RWP0jm1x1fuQ!/b/dCEBAAAAAAAA&bo=gAxABqAP0AcRCYw!&rf=viewer_4',
      'https://b290.photo.store.qq.com/psb?/V11FQPcG0x3HZl/fDJLAhypbErsHDA2C9NpmXbnI3glg1KvRc09WKhr.dQ!/b/dCIBAAAAAAAA&bo=gAegBYAHoAURCT4!&rf=viewer_4',
      'https://b289.photo.store.qq.com/psb?/V11FQPcG0x3HZl/RSqsGYQ0N06bNA8eWbIVFhrbRAv9y5ZTys8Szeq0j6Q!/b/dCEBAAAAAAAA&bo=qwYABUAQMAwRCfo!&rf=viewer_4'
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