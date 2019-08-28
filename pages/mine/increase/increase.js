// pages/mine/increase/increase.js
const app = getApp()
import Tips from '../../../class/utils/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},  //修改的信息
    discount: '',  //选择区域
    discount2:'',  //选择区域数组
  },
//去选择地址
  toSel(){
   wx.navigateTo({
     url: '/pages/mine/selAdd/selAdd',
   })
  },
  //保存地址
  commit(e){
    console.log("ee",e)
    let id = this.data.item.commodityAddressId
    let name = e.detail.value.name
    let mobile = e.detail.value.mobile
    let detailArea=e.detail.value.detailArea
    let discount = this.data.discount
    let discount2 =this.data.discount2
    if (!name) {Tips.alert("请填写姓名") ; return} 
    if (!mobile) {Tips.alert("请填写手机号") ; return}
    if (discount=="请选择") {Tips.alert("请选择收货地址"); return}
    if(!detailArea) {Tips.alert("请填写详细地址");return}
    console.log("掉接口")
    if(id){
      Tips.loading()
      app.auth.updAdd(id, name, mobile, detailArea, discount2)
        .then(res => {
          Tips.loaded()
          Tips.toast("修改成功", function () {
            wx.navigateBack({
              delta: 1
            })
          })
          console.log("修改", res)
        })
        .catch(rej => {
          console.log("失败", rej)
          Tips.loaded()
          Tips.alert('网络异常')
        })
    }else{
      // Tips.loading()
      // app.auth.updAdd(id, name, mobile, detailArea, discount2)
      //   .then(res => {
      //     Tips.loaded()
      //     Tips.toast("添加成功", function () {
      //       wx.navigateBack({
      //         delta: 1
      //       })
      //     })
      //     console.log("修改", res)
      //   })
      //   .catch(rej => {
      //     console.log("失败", rej)
      //     Tips.loaded()
      //     Tips.alert('网络异常')
      //   })
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let item=options.item
     if(item){
       item=JSON.parse(item)
       this.setData({
         item:item
       })
     }

     console.log("item",item)
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
    let item = this.data.item
    let discount = wx.getStorageSync('discount') || item.province + item.city + item.area ||'请选择'
    let discount2=wx.getStorageSync('discount2')||[item.province,item.city,item.area]
    this.setData({
      discount: discount,
      discount2:discount2,
    })
    console.log('discount',discount)
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