// pages/mine/zero/zero.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aname: "",
    aphone: "",
    area: "",
    addstatus: "0", //是否填写了地址0:没填写.1:填写完成
    maskShow: "0",//是否显示mask  0:不显示
    addMH: "0", //是否显示填写地址的mask 0:"不显示"
    showShare: "0", //显示去分享 0:不显示  1:显示
    isButList: [],//正在领取的商品列表
    list: [],//商品列表
    token: "",
    zeroId: "", //点击的商品id
    gname: "", //分享商品name
    zeroUserId: "", //分享订单id
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