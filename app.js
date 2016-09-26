//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function() {
    // //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.setTime()
  },
  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  setTime: function() {
    this.globalData.workTime = wx.getStorageSync('workTime') || 25
    this.globalData.restTime = wx.getStorageSync('restTime') || 5
  }
})
