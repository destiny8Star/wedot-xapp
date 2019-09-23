//index.js
//获取应用实例
const app = getApp()
import Tips from '../../class/utils/Tips.js'
Page({
  data: {
    homeInfo:'',//首页信息
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    ],
    goods:[
      {
        img: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        name:"商品一号id是一号id是一号id是一号id是1一号id是",
        price:"192",
        res:"1.2",
        id:"1"
      },
  
    ]
  },
  //选择城市  http://test.dianjishenghuo.cn/#/invite
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
  
  },
  //去商品详情页
  toDetail(e){
    let gid=e.currentTarget.dataset.gid
    wx.navigateTo({
      url: 'detail/detail?gid='+gid,
    })
  },
  //去搜索
  toSearch(){
    wx.navigateTo({
      url: 'search/search',
    })
  },
  //去各种页面
  toAll(e){
  // 0无跳转 1是商品分类id 2商品货号（后台查询存储商品id） 3.H5链接 4.活动标签id 5店铺 6邀友 7商铺分类
    let targetWay=e.currentTarget.dataset.tarway
    let targetId=e.currentTarget.dataset.tarid
    let link = e.currentTarget.dataset.link
    let cname=e.currentTarget.dataset.cname
    switch (targetWay){
      case 1: wx.navigateTo({
        url: '/pages/index/gType/gType?cid='+targetId+'&&cname='+cname,
      })
      break;
      case 2: wx.navigateTo({
        url: '/pages/index/detail/detail?gid=' + targetId,
      })
      break;
      case 3: wx.navigateTo({
        url: '/pages/index/anchor/anchor?link=' + link,
      })
       break;
      case 6: wx.navigateTo({
        url: '/pages/index/anchor/anchor?link=' + link,
      })
      break;
    }
   

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