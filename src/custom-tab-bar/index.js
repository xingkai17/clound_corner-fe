Component({
  data: {
    selected: 0,
    "color": "#666666",
    "selectedColor": "#0072ff",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "assets/home.png",
        "selectedIconPath": "assets/home1.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/logs/logs",
        "iconPath": "assets/recharge.png",
        "selectedIconPath": "assets/recharge1.png",
        "text": "充值"
      },
      {
        "pagePath": "pages/logs/logs",
        "iconPath": "assets/my.png",
        "selectedIconPath": "assets/my1.png",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})