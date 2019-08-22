//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    infos: ["5月11号微点新零售蓝熬枯受淡飞机文熬枯受淡飞机文","卡萨丁九分裤","熬枯受淡飞机文"],
    goods:[
      {
        img: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        name:"商品一号id是一号id是一号id是一号id是1一号id是",
        price:"192",
        res:"1.2",
        id:"1"
      },
      {
        img: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        name: "一号adfas一号商品一号商品",
        price: "192",
        res: "1.2",
        id: "2"
      },
      {
        img: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        name: "商品3号商品3号商品3号商品3号商品3号商品3号商品3号",
        price: "5632",
        res: "0.22",
        id: "3"
      },
      {
        img: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        name: "商品4号商品4号商品4号商品4号商品4号商品4号商品4号",
        price: "12342",
        res: "0.58",
        id: "4"
      },
      {
        img: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
        name: "商品5号商品5号商品5号商品5号商品5号商品5号商品5号商品5号",
        price: "1922",
        res: "2",
        id: "5"
      },
    ]
  },
  //事件处理函数

  toCa() {
    let a = {
      appId: "wx47dd0a081d4de706",
      nonceStr: "jdkE0lMK1E6cE7Ed",
      package: "prepay_id=wx08160153076824f8e87698a91894058887",
      paySign: "DC285180E24A6E7F213BC2EF4F2D333B",
      signType: "MD5",
      timeStamp: "1557302512"
    }
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.requestPayment({
          'timeStamp': a.timeStamp,
          'nonceStr': a.nonceStr,
          'package': a.package,
          'signType': 'MD5',
          'paySign': a.paySign,
          'success': function(res) {
            Tips.loaded()
            console.log('支付成功', res)
            Tips.toast('支付成功', function() {
              wx.redirectTo({
                url: '/pages/mine/Allorders/Allorders?cur=0',
              })
            })
          },
          'fail': function(res) {
            Tips.loaded()
            Tips.alert('支付失败')
            setTimeout(function() {
              wx.redirectTo({
                url: '/pages/mine/Allorders/Allorders?cur=0',
              })
            }, 1000)
          },
        })



      }
    })
  },
  //去详情页
  toDetail(){
    wx.navigateTo({
      url: 'detail/detail',
    })
  },
  onLoad: function() {
    let  openId=wx.getStorageSync("auth").openId;
    if(!openId){
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
  },

})