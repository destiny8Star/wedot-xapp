// pages/cart/cart.js
import Tips from '../../class/utils/Tips.js';
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSel:false,//是否全部选中
    selN:"../../img/c-n.png",//不选中
    selS: "../../img/c-s.png",//选中
    carts:[], //获取到的信息
    openId:'',
    page:1,  //页码
    total:0, //总金额
    top:true,
    toNum:0,  //结算商品的数量
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
  //编辑
  edite(){
    let top=this.data.top
    this.setData({
      top:!top
    })
  },
  //删除
  delCar(){
    let that=this
    let tid='';  //商品id
    let sid='' //店铺id
    let carts = this.data.carts;
    carts.forEach(function(e){
      if (e.selected) sid += e.storeId+','
      e.tradeCartItemListDTOS.forEach(function (item) {
        if(item.selected) tid += item.tradeCartItemId + ','
      })
    })
    if(tid=='') return
    console.log("获取tid",tid,sid)
    Tips.loading()
    app.auth.delCar(sid,tid)
    .then(res=>{
      Tips.loaded()
      console.log("删除结果",res)
      Tips.toast("删除成功",function(){
        that.onShow()
      })
    })
    .catch(rej=>{
      Tips.loaded()
      console.log("失败", rej)
      Tips.alert('删除失败')
    })
    this.setData({
      total:0,
      toNum:0
    })
  },
  //数量修改
  handlerNum(e){
      console.log("aaa")
      var carts = this.data.carts;
      let that = this
      let sind = e.currentTarget.dataset.sind;  //店铺index
      var gind = e.currentTarget.dataset.gind;
      let tid = e.currentTarget.dataset.tid;
      var num = e.currentTarget.dataset.num ;  //商品数量
      let ty = e.currentTarget.dataset.ty;  //1减少2增加

      console.log('点击减', num, sind, gind, tid)
      if(ty==1)num--
      if(ty==2)num++
      // 购物车数据修改视图
      carts[sind].tradeCartItemListDTOS[gind].num = num;
      //d掉接口购物车
      Tips.loading()
      app.auth.changeNum(tid, num)
        .then(res => {
          Tips.loaded()
          console.log('结果', res)
          that.setData({
            carts: carts,
          });
          that.sum();
        })
        .catch(rej=>{
          Tips.loaded()
          Tips.alert("网络异常")
        })
  },
  /**计算总的金额 */
  sum: function () {
    var carts = this.data.carts;
    let toNum=0
    // 计算总金额
    var total = 0;
    for (let i = 0; i < carts.length; i++) {
      let goods = carts[i].tradeCartItemListDTOS
      for (let j = 0; j < goods.length; j++) {
        let selected = goods[j].selected
        if (selected) {
          total += goods[j].num * goods[j].price;
          toNum++
        }
      }
    }
    total = total.toFixed(2);
    console.log('ttttttttt', total)

    // 写回经点击修改后的数组
    this.setData({
      total: total,
      toNum: toNum
    });
  },
  //选中条件
  allSel(e){
    return e.selected
  },
  //全选
  handlerSa(){
    // 环境中目前已选状态
    var allSel = this.data.allSel;
    var carts = this.data.carts;
    // 取反操作
    allSel = !allSel;
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = allSel;
      carts[i].tradeCartItemListDTOS.forEach(function (e) {
        e.selected = carts[i].selected
      })
    }
    this.sum()
    this.setData({
      allSel: allSel,
      carts:carts
    })
  },
  //店铺选中
  handlerSs(e){
    let index = e.currentTarget.dataset.index;
    //原始的icon状态
    let selected = this.data.carts[index].selected;
    let carts = this.data.carts;
    console.log('是否被选中', selected)
    // let select_status = (!selected) ? '1' : '0';
    // 对勾选状态取反
    carts[index].selected = !selected;
    carts[index].tradeCartItemListDTOS.forEach(function (e) {
      e.selected = carts[index].selected
    })
    if (carts.every(this.allSel)) {
      this.setData({
        allSel: true,
      })
    } else {
      this.setData({
        allSel: false,
      })
    }
    this.setData({
      carts: carts
    })
    this.sum();
  },
  //商品选中
  handlerSg(e){
    let carts = this.data.carts;
    var gid = e.currentTarget.dataset.gind;  //当前店铺的商品index
    let mid = e.currentTarget.dataset.sind;   //店铺的index
    console.log('湖区id', mid, gid)
    //原始的icon状态
    var selected = carts[mid].tradeCartItemListDTOS[gid].selected;
    // 对勾选状态取反
    carts[mid].tradeCartItemListDTOS[gid].selected = !selected;

    if (carts[mid].tradeCartItemListDTOS.every(this.allSel)) {

      carts[mid].selected = true
      if (carts.every(this.allSel)) {
        this.setData({
          allSel: true,
        })
      } else {
        this.setData({
          allSel: false,
        })
      }
    } else {
      carts[mid].selected = false
  
        this.setData({
          allSel: false,
        })
    }
    this.setData({
      carts:carts
    })
    this.sum()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this
    let openId = wx.getStorageSync('auth').openId
    let page =1
    Tips.loading()
    app.auth.carList(openId, page)
      .then(res => {
        Tips.loaded()
        console.log("获取购物车列表", res)
        let carts=res.data
        carts.forEach(function(e){
            e.selected==false 
            e.tradeCartItemListDTOS.forEach(function(item){
              item.selected==false
            })
        })

        that.setData({
          carts:res.data
        })
      })
      .catch(rej => {
        Tips.loaded()
        Tips.alert("网络异常")
        console.log("获取失败", rej)
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