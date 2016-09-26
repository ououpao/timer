var util = require('../../utils/util.js')
Page({
  data: {
    hideSheetTab: true,
    initTime: '25:00',
    remainTimeText: '',
    log: {},
    timer: null,
    completed: false,
    isRuning: false
  },

  onLoad: function() {
    this.data.remainTimeText = this.data.initTime
  },

  changeTimer: function() {
    this.data.timer && this.stopTimer()
    let keepTime = parseInt(this.data.initTime) * 60 * 1000
    let startTime = Date.now()

    if (this.data.isRuning) {
      this.data.log = {
        name: this.logName,
        startTime: Date.now(),
        action: 'stop',
        type: 'rest'
      }
      this.setData({
        remainTimeText: this.data.initTime
      })
    } else {
      this.data.log = {
        name: this.logName,
        startTime: Date.now(),
        keepTime: keepTime,
        endTime: keepTime + startTime,
        action: 'start',
        type: 'task'
      }
      this.data.timer = setInterval(this.updateTime.bind(this), 1000)
    }

    this.setData({
      isRuning: !this.data.isRuning
    })
    this.saveLog(this.data.log)
  },

  stopTimer: function() {
    clearInterval(this.data.timer)
  },

  setlogName: function(e) {
    this.logName = e.detail.value
  },

  linkToLog: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  updateTime: function() {
    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, '00')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, '00')
    let S = util.formatTime(Math.floor(remainingTime) % 60, '00')
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.completeAction()
    }
  },

  completeAction: function() {
    this.setData({
      completed: true
    })
  },

  saveLog: function(log) {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(log)
    wx.setStorageSync('logs', logs)
  },

  switchSheetTap: function(e) {
    this.setData({
      hideSheetTab: !this.data.hideSheetTab
    })
  },

  onHide: function(e) {
    this.setData({
      hideSheetTab: true
    })
  }
})
