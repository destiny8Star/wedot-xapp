// pages/index/searPage/searPage.js
import Tips from '../../../class/utils/Tips.js'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selT:'1',//当前选中的tab:    1,2,3,4
    selPI: "0",//当前价格tab的img   0,1,2
    selSI:"0",//当前销量tab的img   0,1,2
    cont:'', //传过来的值
    goods:[], //商品列表

  },
  //去商品详情页
  toDetail(e) {
    let gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '/pages/index/detail/detail?gid=' + gid,
    })
  },
  //返回首页
  toIndex(){
     wx.navigateBack({
       delta:2
     })
  },
  //返回搜索
  toLast(){
    wx.navigateBack({
      delta:1
    })
  },
//选中没要求的tab
  selTab(e){
     let selT=e.currentTarget.dataset.sid;
     this.setData({
       selT: selT,
       selSI: 0,
       selPI: 0
     })
    this.getInfo(selT, 1)
  },
  //价格tab
  selTabP(){
   let selPI=this.data.selPI;
   selPI++
   if(selPI>2){
     selPI=1
   }
   this.setData({
     selT: 2,
     selPI:selPI,
     selSI:0
   })
    this.getInfo(2, selPI)
  },
  //销量tab
  selTabS(){
    let selSI = this.data.selSI;
    selSI++
    if (selSI > 2) {
      selSI = 1
    }
    this.setData({
      selT: 3,
      selSI: selSI,
      selPI:0
    })
    this.getInfo(3, selSI)
  },
  //获取数据接口
  getInfo( selT,sort){
    let cont=this.data.cont
    Tips.loading()
    app.auth.search(cont, selT, sort, 1)
      .then(res => {
        Tips.loaded()
        console.log("搜索结果", res)
        this.setData({
          goods: res.data.data
        })
      })
      .catch(rej => {
        Tips.loaded()
        console.log("搜索失败", rej)
        Tips.alert("网络异常")
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let cont=options.name;
    console.log("cont", cont)
    this.setData({
      cont:cont
    })
    Tips.loading()
    app.auth.search(cont, 1, 1, 1)
    .then(res=>{
      Tips.loaded()
      console.log("搜索结果",res)
      this.setData({
        goods:res.data.data
      })
    })
    .catch(rej=>{
      Tips.loaded()
      console.log("搜索失败",rej)
      Tips.alert("网络异常")
    })
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