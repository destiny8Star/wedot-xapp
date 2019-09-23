// pages/cart/commitOr/commitOr.js
import Tips from '../../../class/utils/Tips.js'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defAdd:'',//默认地址
    infos:{},// 页面信息
    traId:'',  //购物车id
    storeId: '', //店铺id
    num:"",//从立即购买传过来的
    gid:"", //其实就是skuid
  },
//去选择地址
  toAdd(){
    wx.navigateTo({
      url: '/pages/mine/address/address',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let traId = options.traId//从购物车过来的
    let storeId = options.storeId//从购物车过来的

    let gid=options.gid;//立即购买需要的值 其实是skuid!!!!!!!!!!!!!!!!!!!!!
    let num = options.num;//立即购买需要的值

    console.log("cz", traId, storeId, gid, num)
    Tips.loading()
    if(traId){
      //购物车过来调用
      app.auth.subOr(traId)
        .then(res => {
          Tips.loaded()
          this.setData({
            infos: res.data,
            traId: traId,
            storeId: storeId
          })
          console.log("提交结果", res)
        })
        .catch(rej => {
          Tips.loaded()
          Tips.alert("网络异常")
          console.log("提交失败", rej)
        })
    }else{
      //立即购买过来调用
      app.auth.nowSubOr(gid,num)
        .then(res => {
          Tips.loaded()
          this.setData({
            infos: res.data,
            num: num,
            gid:gid
          })
          console.log("提交结果", res)
        })
        .catch(rej => {
          Tips.loaded()
          Tips.alert("网络异常")
          console.log("提交失败", rej)
        })
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
//去付款
  toPay(){
    let traId = this.data.traId//从购物车过来的
    let storeId = this.data.storeId//从购物车过来的

    let gid = this.data.gid;//立即购买需要的值 其实是skuid!!!!!!!!!!!!!!!!!!!!!
    let num = this.data.num;//立即购买需要的值 
    let addressId = this.data.defAdd.commodityAddressId||1
    if (!addressId){
      Tips.alert("请选择收货地址")
      return 
    }
    console.log("id",traId,storeId)
    Tips.loading()
    if(traId){
      app.auth.createOrd(traId, storeId, addressId)
        .then(res => {
          Tips.loaded()
          console.log("去付款结果", res)
        })
        .catch(rej => {
          Tips.loaded()

          console.log("付款四百", rej)
        })
    }else{
      app.auth.buyNow(gid, num, addressId)
       .then(res=>{
         Tips.loaded()

         console.log("立即购买结果")
       })
       .catch(rej=>{
         Tips.loaded()

         console.log("立即购买失败",rej)
       })
    } 
  
  },
  dopay(res){
    let that = this;
    Tips.loading()
    wx.requestPayment({
      'timeStamp': a.timeStamp,
      'nonceStr': a.nonceStr,
      'package': a.package,
      'signType': 'MD5',
      'paySign': a.paySign,
      'success': function (res) {
        Tips.loaded()
        console.log('支付成功', res)
        Tips.toast('支付成功', function () {
         
        })
      },
      'fail': function (res) {
        Tips.loaded()
        Tips.alert('支付失败')
       
      },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取默认地址
    app.auth.getDefAdd()
    .then(res=>{
      console.log("获取默认地址",res)
      this.setData({
        defAdd: res.data
      })
    })
    .catch(rej=>{
      console.log("获取地址失败",rej)
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