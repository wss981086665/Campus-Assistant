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
    course: '',
    coursex: '',
    ensure: false,
    imageurl: [

    ],

    array: '',
    objectArray: '',
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
    if (topic == '') {
      wx.showToast({
        title: '请输入主题',
        icon: 'none'
      })
    } else if (author == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
    } else if (content == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
    } else if (course == null) {
      wx.showToast({
        title: '至少选择一个标签',
        icon: 'none'
      })
    } else {
      wx.request({
        method: 'POST',
        url: api.ip + 'superadmin/insertquestionbyid?author=' + author + '&topic=' + topic + '&content=' +
          content + '&factor1=' + openid + '&factor2=' + avatarUrl + '&factor3=' + course + '&factor4=' + nickName+'&factor5='+TIME,
      }),
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
  },

  checkboxChange: function (e) {
    this.setData({
      coursex: e.detail.value,
      course: e.detail.value.toString()
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
    wx.request({
      url: api.ip + 'ensure/ensurenumber',
      method: 'GET',
      data: {},
      success: function (res) {
        var ensure = res.data.ensure;
        var course = res.data.slider;
        var coursename = res.data.coursename;
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
            array: coursename,
            objectArray: course,
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