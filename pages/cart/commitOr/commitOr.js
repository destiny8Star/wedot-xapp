// pages/cart/commitOr/commitOr.js
import Tips from '../../../class/utils/Tips.js'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defAdd:{},//默认地址
    infos:{},// 页面信息
    traId:'',  //购物车id
    storeId: '', //店铺id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let traId = options.traId
    let storeId=options.storeId
    Tips.loading()
    app.auth.subOr(traId)
      .then(res => {
        Tips.loaded()
        this.setData({
          infos:res.data,
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
//去付款
  toPay(){
    let traId = this.data.traId
    let storeId=this.data.storeId
    let addressId = this.data.defAdd.commodityAddressId
    console.log("id",traId,storeId)
    app.auth.createOrd(traId, storeId, addressId)
    .then(res=>{
      console.log("去付款结果",res)
    })
    .catch(rej=>{
      console.log("付款四百",rej)
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
      Tips.alert("获取地址失败")
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