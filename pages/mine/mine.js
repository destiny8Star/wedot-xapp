// pages/mine/mine.js
import Tips from '../../class/utils/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',//用户信息 
    mineCont:[  //我的上面部分
     {
       id:"1",
       name:"累计收益"
     },
      {
        id: "2",
        name: "我的粉丝"
      },
      {
        id: "3",
        name: "我的商家"
      },
    ],
    oList:[  //我的订单
      {
        id:1,
        name:"待支付",
        img:"../../img/m-o1.png"
      },
      {
        id: 2,
        name: "待发货",
        img: "../../img/m-o2.png"
      },
      {
        id: 3,
        name: "待收货",
        img: "../../img/m-o3.png"
      },
      {
        id: 4,
        name: "已收货",
        img: "../../img/m-o4.png"
      }
    ],
    sList: [//我的服务
      // {
      //   id: 1,
      //   name: "余额明细",
      //   img: "../../img/m-s1.png"
      // },
      {
        id: 2,
        name: "地址管理",
        img: "../../img/m-s2.png"
      },
      // {
      //   id: 3,
      //   name: "联系客服",
      //   img: "../../img/m-s3.png"
      // },
      {
        id: 4,
        name: "关于我们",
        img: "../../img/m-s4.png"
      }
    ],

  },
//去订单页面
  toOrder(e){
       let id=e.currentTarget.dataset.id
       console.log("eee",id) 
       wx.navigateTo({
         url: 'order/order?curid='+id,
       })
  },
  //去服务页面
  toSer(e){
     let id=e.currentTarget.dataset.id
     if(id==2) wx.navigateTo({
       url: 'address/address',
     })
    if (id == 4) wx.navigateTo({
      url: 'about/about',
    })
  },
  //去零元商品
  toPub(){
    wx.navigateTo({
      url: 'zero/zero',
    })
  },
  //复制
  clipBoard(){
    let data = this.data.userInfo
    wx.setClipboardData({
      data: data.phone,
      success(res) {
        // wx.getClipboardData({
        //   success(res) {
        //     console.log(res.data) // data
        //   }
        // })
      }
    })
  },
  //去app看
  toApp(){
     Tips.toast("请下载app查看",'','none')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('user')
    console.log("获取信息", userInfo)
    if(!userInfo.openId){
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
      return 
    }
    if(userInfo.isPhone==1){
      wx.navigateTo({
        url: '/pages/bindPhone/bindPhone',
      })
      return 
    }



    this.setData({
      userInfo: userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})