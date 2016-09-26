var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '设置'
    })
  },
  onShow: function() {
  	console.log(2)
  },
  onLoad: function () {
    this.setData({
      logs: wx.getStorageSync('logs')
    })
  }
})
