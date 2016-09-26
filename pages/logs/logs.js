var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
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
