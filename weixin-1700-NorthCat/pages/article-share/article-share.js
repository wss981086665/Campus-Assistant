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
    var userOpenid = this.data.userOpenid;
    var nickName = this.data.userInfo.nickName;nickName = encodeURIComponent(nickName);nickName = encodeURIComponent(nickName);//二次编码
    var avatarUrl = this.data.userInfo.avatarUrl;
    var title = this.data.title; title = encodeURIComponent(title); title = encodeURIComponent(title);//二次编码
    var content = this.data.content; content = encodeURIComponent(content); content = encodeURIComponent(content);//二次编码
    var author = this.data.author; author = encodeURIComponent(author); author = encodeURIComponent(author);//二次编码
    var described = this.data.described; described = encodeURIComponent(described); described = encodeURIComponent(described);//二次编码
    var wechat = this.data.wechat; wechat = encodeURIComponent(wechat); wechat = encodeURIComponent(wechat);//二次编码
    var qq = this.data.qq; qq = encodeURIComponent(qq); qq = encodeURIComponent(qq);//二次编码
    var sign = this.data.sign; sign = encodeURIComponent(sign); sign = encodeURIComponent(sign);//二次编码
    var style = this.data.style; style = encodeURIComponent(style); style = encodeURIComponent(style);//二次编码
    var school = this.data.school; school = encodeURIComponent(school); school = encodeURIComponent(school);//二次编码
    var hobby = this.data.hobby; hobby = encodeURIComponent(hobby); hobby = encodeURIComponent(hobby);//二次编码
    wx.showActionSheet({
      itemList: ['发表文章','保存图片到本地'],
      success(res) {
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
          success:function(resp) {
            if (res.tapIndex === 0) {
              wx.showLoading({
                title: '正在上传',
              })
              wx.request({
                url: api.ip + 'forarticle/insertarticlebyid?title=' + title + '&content=' + content + '&author=' + author +
                  '&openid=' + userOpenid + '&nickName=' + nickName + '&avatarUrl=' + avatarUrl+ '&described=' +
                  described + '&wechat=' + wechat + '&qq=' + qq + '&sign=' + sign + '&style=' + style + '&school=' + school + '&hobby=' + hobby,
                method: 'POST',
                data: {},
                success:function() {
                  wx.showToast({
                    title: '上传成功',
                  })
                }
              })
            }else if (res.tapIndex === 1) {
              wx.saveImageToPhotosAlbum({
                filePath: resp.tempFilePath,
                success: function (resps) {
                  wx.showToast({
                    title: '已保存到相册'
                  })
                }
              })
            }
          }
        })
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      userOpenid: options.userOpenid,
      nickName: '',
      avatarUrl: '',
      title: options.title,
      content: options.content,
      author: options.author,
      describe: options.describe,
      wechat: options.wechat,
      qq: options.qq,
      sign: options.sign,
      style: options.style,
      school: options.school,
      hobby: options.hobby,
      userInfo: app.globalData.userInfo,
    })
  },

  onReady: function () {
    var that = this;
    var title = that.data.title;
    var content = that.data.content;
    var author = that.data.author;
    var describe = that.data.describe;
    var nickName = that.data.userInfo.nickName;
    wx.getImageInfo({
      src: 'http://www.xztywss.top/img/luntan/articlebgm2.jpg',
      success: function (res) {
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.drawImage(res.path, 0, 0, 350, 570)
        ctx.setFontSize(22)
        ctx.fillText(title, 25, 35)
        ctx.setFontSize(16)
        ctx.fillText('作者:'+author, 25, 385)
        ctx.fillText('文章描述:' + describe, 25, 410)
        ctx.setFillStyle('orange')
        ctx.fillText('长按识别小程序码-->', 30, 480)
        ctx.fillText('长按识别小程序码-->', 30, 500)
        ctx.fillText('长按识别小程序码-->', 30, 520)
        ctx.setFillStyle('gray')
        ctx.setFontSize(14)
        ctx.fillText('文章搜索:'+nickName, 10, 540)
        ctx.setFillStyle('black')
        that.drawText(ctx, content, 23, 57, 148, 295);
        ctx.draw()
      }
    })
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