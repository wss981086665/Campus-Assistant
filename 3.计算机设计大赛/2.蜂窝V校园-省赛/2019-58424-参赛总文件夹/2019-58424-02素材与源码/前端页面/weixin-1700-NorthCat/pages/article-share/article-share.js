const api = require('../../api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ensure: false, 
    imageurl: [

    ],

    userOpenid: '',
    nickName: '',
    avatarUrl: '',
    title: '',
    content: '',
    author: '',
    describe: '',
    wechat: '',
    qq: '',
    sign: '',
    style: '',
    school: '',
    hobby: '',
    filePath: [],

    userInfo: {},
  },

  drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    ctx.setFontSize(16)
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 16; //16为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += 30;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
    return titleHeight
  },

  showmenu:function() {
    var filePath = this.data.filePath;
    wx.showActionSheet({
      itemList: ['保存图片到本地'],
      success(res) {
          if (res.tapIndex === 0) {
            wx.canvasToTempFilePath({
              canvasId: 'shareCanvas',
              success: function (resp) {
                wx.saveImageToPhotosAlbum({
                  filePath: resp.tempFilePath,
                  success: function (resps) {
                    wx.showToast({
                      title: '已保存到相册'
                    })
                  }
                })
              }
            })
          }
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      nickName: options.nickName,
      title: options.title,
      content: options.content,
      author: options.author,
      describe: options.describe,
    })
    var that = this;
    wx.showLoading({
      title: '生成中',
    })
    wx.downloadFile({
      url: '##',   //地址需要自行配置
      success: function (res) {
        const filePath = res.tempFilePath
        that.setData({
          posterurl: filePath,
        });
        var title = that.data.title;
        var content = that.data.content;
        var author = that.data.author;
        var describe = that.data.describe;
        var nickName = that.data.nickName;
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.drawImage(that.data.posterurl, 0, 0, 350, 570)
        ctx.setFontSize(22)
        ctx.fillText(title, 25, 35)
        ctx.setFontSize(16)
        ctx.fillText('作者:' + author, 25, 385)
        ctx.fillText('文章描述:' + describe, 25, 410)
        ctx.setFillStyle('orange')
        ctx.fillText('长按识别小程序码-->', 30, 480)
        ctx.fillText('长按识别小程序码-->', 30, 500)
        ctx.fillText('长按识别小程序码-->', 30, 520)
        ctx.setFillStyle('gray')
        ctx.setFontSize(14)
        ctx.fillText('文章搜索:' + nickName, 10, 540)
        ctx.setFillStyle('black')
        that.drawText(ctx, content, 23, 57, 148, 295);
        ctx.draw()
        wx.hideLoading();
      }
    })
  },

  onReady: function () {
    var that = this;
    wx.getImageInfo({
      src: 'https://###',   //地址需要自行配置
      success: function (res) {
        
      }
    })
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