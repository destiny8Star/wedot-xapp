// pages/index/search/search.js
import Tips from '../../../class/utils/Tips.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    searchArr: [], //搜索纪录
  },
  //点击搜索
  toSear(){
    let searchText = this.data.searchText
    let searchArr = this.data.searchArr
    console.log("text", searchText, searchArr)
    if (searchText){
      let ind = searchArr.indexOf(searchText)
      if(ind==-1){
        if (searchArr.length<10){
          searchArr.unshift(searchText)
        }else{
          searchArr.pop()
          searchArr.unshift(searchText)
        }
      }
      wx.setStorageSync('searchArr', searchArr)
      wx.navigateTo({
        url: '/pages/index/searPage/searPage?name='+searchText,
      })
    }
  },
  //历史搜做
  his_search(e){
    let searchText=e.currentTarget.dataset.stext
    wx.navigateTo({
      url: '/pages/index/searPage/searPage?name=' + searchText,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     let that=this

  },


  // 搜索框控制函数
  bindseInput: function(e) {
    let that = this;
    that.setData({
      searchText: e.detail.value
    });

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   //热门
   let that=this
    let searchArr=wx.getStorageSync('searchArr')
   this.setData({
     searchArr: searchArr||[]
   })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})