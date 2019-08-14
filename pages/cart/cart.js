// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSel:true,//是否结算
    selN:"../../img/c-n.png",//不选中
    selS: "../../img/c-s.png",//选中
    carts:[],//获取到的信息
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
  //减少数量
  handlerDel(){
      console.log("aaa")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this
     setTimeout(function(){
       let datas = [
         {
           'id': '0',
           'shopname': '这里是店铺名称',
           'goods': [
             {
               'id': '0',
               'img': 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
               'name': '商品名称江西苹果9斤装的好吃不贵非常好的快来买',
               'sku': '灰色；xl；加绒加厚',
               'refx': '10',
               'num': '1',
               'price': "122"
             }
           ]
         },
         {
           'id': '1',
           'shopname': '这里是店铺名称2',
           'goods': [
             {
               'id': '0',
               'img': 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
               'name': '装的好吃不贵非常好的快来买商品名称江西苹果9斤',
               'sku': '灰色；xl；加绒加厚',
               'refx': '2',
               'num': '11',
               'price': "11112"
             },
             {
               'id': '1',
               'img': 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
               'name': '江西苹果9斤装的好商品名称吃不贵非常好的快来买',
               'sku': '灰色；xl；加绒加厚',
               'refx': '3',
               'num': '131',
               'price': "1412"
             }
           ]
         },
       ]
       datas.forEach(function(e){
            console.log("eee",e)
            e.allSel=false
       })
       that.setData({
         carts: datas
       })
       console.log("datas",datas)

     },0)
   

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