const util = require('../../utils/util.js')
const logName = {
  work: '工作',
  rest: '休息'
}
const actionName = {
  stop: '停止',
  start: '开始'
}

Page({
  data: {
    hideSheetTab: true,
    remainTimeText: '',
    timerType: 'work',
    log: {},
    completed: false,
    isRuning: false,
    leftDeg: 45,
    rightDeg: -45
  },

  onShow: function() {
    if (this.data.isRuning) return
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    this.setData({
      workTime: workTime,
      restTime: restTime,
      remainTimeText: workTime + ':00'
    })
  },

  startTimer: function(e) {
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let timerType = e.target.dataset.type
    let showTime = this.data[timerType + 'Time']
    let keepTime = showTime * 60 * 1000

    if (isRuning) {
      this.stopTimer()
    } else {
      this.timer = setInterval(this.updateTimer.bind(this), 1000)
    }

    this.setData({
      isRuning: !isRuning,
      timerType: timerType,
      remainTimeText: showTime + ':00'
    })

    this.data.log = {
      name: this.logName || logName[timerType],
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
      type: timerType
    }

    this.saveLog(this.data.log)
  },

  stopTimer: function() {
    this.timer && clearInterval(this.timer)
  },

  setlogName: function(e) {
    this.logName = e.detail.value
  },

  linkToLog: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  updateTimer: function() {
    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, '00')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, '00')
    let S = util.formatTime(Math.floor(remainingTime) % 60, '00')
    let halfTime

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.completeAction()
    }
    
    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: 45 - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: -45 - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
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
