var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '任务记录'
    })
  },
  onLoad: function () {
    this.setData({
      logs: wx.getStorageSync('logs')
    })
  }
})
