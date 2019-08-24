//index.js
//获取应用实例
const app = getApp()
import Tips from '../../class/utils/Tips.js'
Page({
  data: {
    homeInfo:'',//首页信息
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
  //选择城市
  selCity(){
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        if (!res.authSetting['scope.userLocation']){
            wx.authorize({
              scope: 'scope.userLocation',
              success(res) {
                  console.log("rre",res)
             },
             fail(rej){
               console.log("rejjjjjjjjjj")
              //  Tips.modal("去打开获取位置权限","提示").then(res=>{
              //    if (res.confirm){
              //      console.log("待机确定", res)
              //          wx.openSetting({  必须要点击的时候直接调用
              //               success(res) {
              //                 console.log(res.authSetting)
              //             }
              //      })
              //    }
              
              //  })

             }
           })
        }
     
      }
    })
    // wx.chooseLocation(function(res){
    //   console.log("res")
    // })
  },
  //去详情页
  toDetail(e){
    let gid=e.currentTarget.dataset.gid
    wx.navigateTo({
      url: 'detail/detail?gid='+gid,
    })
  },
  onLoad: function() {
    let  openId=wx.getStorageSync("auth").openId;
    if(!openId){
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
      return
    }
    //获取首页信息
    Tips.loading()
    app.auth.getHome().then(res=>{
      Tips.loaded()
      console.log("获取信息",res)
      this.setData({
        homeInfo:res.data
      })
    }).catch(rej=>{
      Tips.loaded()
      Tips.alert("网络异常")
    })
    this.getList()
  },
  // 获取商品列表
  getList(){
    app.auth.getGoods().then(res=>{
      console.log("获取商品",res)
      this.setData({
        goods:res.data.data
      })
    })
  },
  onShow(){
    
  },

})