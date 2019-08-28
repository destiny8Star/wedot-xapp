// pages/mine/address/address.js
const app = getApp()
import Tips from '../../../class/utils/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[],//获取地址
  },
  //设置默认
  setDef(e){
    let ind = e.currentTarget.dataset.index
    let datas=this.data.datas;
    datas.forEach(function(item){
      item.isDefault=1
    })
    datas[ind].isDefault=0
    this.setData({
      datas:datas
    })
   console.log("默认",ind)
  },
  //删除
  delAdd(e){
    let ind = e.currentTarget.dataset.index
    let datas = this.data.datas;
    Tips.modal("是否删除此收货地址").then(res=>{
      console.log("aaa",res)
      if(res.confirm){
        datas.splice(ind,1)
        // this.onShow()
        this.setData({
          datas:datas
        })
      }
    })
  },
  //去添加和修改
  toAdd(e){
    let ind=e.currentTarget.dataset.index
    let datas=this.data.datas;
    let item=JSON.stringify(datas[ind])||''
    console.log("获取该列信息",ind,item)
    wx.navigateTo({
      url: '/pages/mine/increase/increase?item='+item,
    })
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
    wx.removeStorageSync('discount') //去除缓存的选择的省市区
    wx.removeStorageSync('discount2') //去除缓存的选择的省市区

    //获取地址
    Tips.loading()
    app.auth.getAllAdd()
    .then(res=>{
      Tips.loaded()
      console.log("获取地址",res)
      this.setData({
        datas:res.data
      })
    })
    .catch(rej=>{
      Tips.loaded()
      Tips.alert("网络异常")
      console.log("获取是吧",rej)
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