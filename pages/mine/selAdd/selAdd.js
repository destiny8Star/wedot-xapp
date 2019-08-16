// pages/mine/selAdd/selAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proT:"请选择",
    cityT:"请选择",
    discountT:"请选择",
    curTar:'1',//选中地方tab
    test:1,
    province: ['北京', '上海', '南京', '重庆', '西安', '南京', '杭州', '河北', '浙江', '北京', '上海', '南京', '重庆', '西安', '南京', '杭州', '河北', '浙江'],
    city: ['南宁','宁波', '杭州', '丽江', '大力', '运城', '济南', '朔州', '太远', '啥快递件'],
    discount: ['asfd阿斯蒂芬', '暗室逢灯', '南去玩儿京', '其他', '水电费', '去玩儿', '水果', '焐热', '合适的'],
  },
  //选择顶部tab
  selTar(e){
    let id=e.currentTarget.dataset.id;
    this.setData({
      curTar:id
    })
  },
//选择省份
  selP(){
    this.setData({
      curTar: 2,
      proT:"阿斯蒂芬"
    })
  },
  //选择城市
  selC() {
    this.setData({
      curTar: 3,
      cityT: "阿斯蒂芬"
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
        let p=this.data.province;
        p.forEach(function(e){
          console.log("eee",e)
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