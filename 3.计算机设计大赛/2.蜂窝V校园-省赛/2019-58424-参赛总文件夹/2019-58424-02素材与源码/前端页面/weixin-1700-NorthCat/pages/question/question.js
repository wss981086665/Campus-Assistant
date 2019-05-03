const app = getApp();
var util = require('../../utils/util.js');
const api = require('../../api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: '',
    author: '',
    content: '',
    nickName: '',
    userOpenid: '',
    openid: '',
    userInfo: {},
    course: '高等数学',
    coursex: '',
    ensure: false,
    imageurl: [

    ],

    array: '',
    objectArray: '',
    images: [],
  },

  bindPickerChange: function (e) {
    this.setData({
      course: this.data.array[e.detail.value]
    })
  },

  datasubmit: function (e) {
    this.setData({
      topic: e.detail.value.topic,
      author: e.detail.value.author,
      content: e.detail.value.content,
      nickName: e.detail.value.nickName,
      openid: e.detail.value.openid
    })
    var author = this.data.author;
    var topic = this.data.topic;
    var content = this.data.content;
    var nickName = this.data.nickName;
    var openid = this.data.openid;
    var avatarUrl = this.data.userInfo.avatarUrl;
    var course = this.data.course;
    var TIME = util.formatData(new Date());
    topic = encodeURIComponent(topic);
    topic = encodeURIComponent(topic);//二次编码
    content = encodeURIComponent(content);
    content = encodeURIComponent(content);//二次编码
    nickName = encodeURIComponent(nickName);
    nickName = encodeURIComponent(nickName);//二次编码
    course = encodeURIComponent(course);
    course = encodeURIComponent(course);//二次编码
    author = encodeURIComponent(author);
    author = encodeURIComponent(author);//二次编码
    var filePath = this.data.images;
    if (topic == '') {
      wx.showToast({
        title: '请输入主题',
        icon: 'none'
      })
    }else if (content == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '正在上传',
      })
      if (filePath[0] == null) {
        wx.request({
          method: 'POST',
          url: api.ip + 'superadmin/insertquestionbyid?author=' + author + '&topic=' + topic + '&content=' +
            content + '&factor1=' + openid + '&factor2=' + avatarUrl + '&factor3=' + course + '&factor4=' + nickName + '&factor5=' + TIME+'&factor6=defaultimg.jpg',
          success: function () {
            wx.showToast({
              title: '发布成功',
              duration: 1500
            }),
              setTimeout(function () {
                wx.switchTab({
                  url: '../index/index'
                })
              }, 1500)
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
                url: api.ip + 'superadmin/insertquestionbyid?author=' + author + '&topic=' + topic + '&content=' +
                  content + '&factor1=' + openid + '&factor2=' + avatarUrl + '&factor3=' + course + '&factor4=' + nickName + '&factor5=' + TIME + '&factor6='+filename,
                method: 'POST',
                data: {},
                success: function () {
                  wx.showToast({
                    title: '发布成功',
                    duration: 1500
                  }),
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../index/index'
                    })
                  }, 1000)
                }
              })
            }
          }
        })
      }
    }
  },

  checkboxChange: function (e) {
    this.setData({
      coursex: e.detail.value,
      course: e.detail.value.toString()
    })
  },

  addphoto: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        const images = that.data.images.concat(res.tempFilePaths)
        that.setData({
          images: images.length <= 1 ? images : images.slice(0, 1)
        })
      }
    })
  },

  removeImage(e) {
    var that = this;
    const idx = e.target.dataset.idx
    that.data.images.splice(idx, 1)
    that.setData({
      images: that.data.images
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getStorage({
      key: 'userOpenid',
      success: function (res) {
        that.setData({
          userOpenid: res.data
        })
      },
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
        wx.getStorage({
          key: 'slider',
          success: function (res) {
            that.setData({
              objectArray: res.data
            })
            wx.getStorage({
              key: 'coursename',
              success: function (res) {
                that.setData({
                  array: res.data
                })
              }
            })
          }
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