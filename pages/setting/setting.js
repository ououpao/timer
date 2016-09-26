Page({
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.setData({
    	workTime: wx.getStorageSync('workTime') || 25,
    	restTime: wx.getStorageSync('restTime') || 5
    })
  },
  changeWorkTime: function(e) {
  	wx.setStorage({
  		key: 'workTime',
  		data: e.detail.value
  	})
  },
  changeRestTime: function(e) {
  	wx.setStorage({
  		key: 'restTime',
  		data: e.detail.value
  	})
  }
})
