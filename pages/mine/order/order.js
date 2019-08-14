// pages/mine/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curid:1,//默认选择第一个
    tabs:[
      {
        name:'待支付',
        id:'1'
      },
      {
        name: '待发货',
        id: '2'
      },
      {
        name: '待收货',
        id: '3'
      },
      {
        name: '已收货',
        id: '4'
      },
    ]
  },
  //选择tab
  seltabHand(e){
    let id=e.currentTarget.dataset.id
    this.setData({
      curid:id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let curid=options.curid
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