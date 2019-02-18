//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'MiHome_Store',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    "banner_list": [
      {
        "banner": [
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_904608692a4d8415d0de39a0a5897e80.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_0f5e43035a8b8d27a4b6f315d222fd9b.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_4ba3d814639ab27570f174467133619f.png&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_91f29509f14ea243958285aaf5d5b640.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_5c752db8097555831469356f5f389078.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          }
        ]
      },
      {
        "banner": [
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_3237b46c5de819816125d88e9d06b7bf.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_c02bce3048058edb194dc3efb230d06b.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_45b3c9ed56aef44994176b50ae5d8a69.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_95583f54ee857e8fa5f4cf1b9f791a74.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",

          }
        ]
      }
    ],
    hotgoods: [
      {
        "name": "番茄工作法",
        "isTab": true,
        "url":"../todos/todos",
        "summary": "提升工作效率",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_9d57f6e89d1f560b7bce31e0b85a7285.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "../../images/timer/pomodoro.png"
      },
    ]
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  switchTab:function(e){
    var hotgoods = this.data.hotgoods;
    wx.switchTab({
      "url": hotgoods[e.currentTarget.id].url,
    })
  },
})
