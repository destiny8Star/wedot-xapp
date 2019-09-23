// pages/mine/zero/zero.js
import Tips from '../../../class/utils/Tips.js'
import Poster from '../../../miniprogram_dist/poster/poster';
import WxApi from '../../../class/utils/WxApi.js'
const posterConfig = {
  jdConfig: {
    width: 750,
    height: 1200,
    backgroundColor: '#fff',
    debug: false,
    pixelRatio: 1,
    blocks: [
      {  //中间图片
        width: 690,
        height: 750,
        x: 30,
        y: 183,
        borderWidth: 2,
        borderColor: '#f0c2a0',
        borderRadius: 20,
      },
      {  //标题
        width: 634,
        height: 74,
        x: 59,
        y: 770,
        backgroundColor: '#fff',
        opacity: 0.5,
        zIndex: 100,
      },
    ],
    texts: [
      {
        x: 120,
        y: 60,
        baseLine: 'middle',
        text: '微信昵称',
        fontSize: 28,
        color: '#333333',
        fontWeight:'bold'
      },
      {
        x: 120,
        y: 90,
        width:600,
        baseLine: 'top',
        text: '这是我最新种草的一件好物！快来扫码购买！',
        fontSize: 20,
        color: '#4E4E4E',
      },
      {
        x: 92,
        y: 810,
        fontSize: 38,
        baseLine: 'middle',
        text: '标题标题标题标题标题标题标题标题标题',
        width: 570,
        lineNum: 1,
        color: '#8d8d8d',
        zIndex: 200,
      },
      {
        x: 59,
        y: 895,
        baseLine: 'middle',
        text: [
          {
            text: '2人拼',
            fontSize: 28,
            color: '#ec1731',
          },
          {
            text: '¥99',
            fontSize: 36,
            color: '#ec1731',
            marginLeft: 30,
          }
        ]
      },
      {
        x: 522,
        y: 895,
        baseLine: 'middle',
        text: '已拼2件',
        fontSize: 28,
        color: '#929292',
      },
      {
        x: 360,
        y: 980,
        baseLine: 'top',
        text: '长按识别小程序码',
        fontSize: 38,
        color: '#080808',
      },
    ],
    images: [
      {
        width: 80,
        height: 80,
        x: 30,
        y: 35,
        borderRadius:80,
        url: 'https://wx.qlogo.cn/mmopen/vi_32/eVjnz9Gvqz4yia3XHDBQSnEe89NgcI4ibtQP1YptXkNSS4PmeWuB3yB2AQP0EobExk6AQIuCU5j7OWsib4EUib8sIQ/132',
      },
      {
        width: 634,
        height: 634,
        x: 59,
        y: 210,
        url: 'https://lc-I0j7ktVK.cn-n1.lcfile.com/193256f45999757701f2.jpeg',
      },
      {
        width: 220,
        height: 220,
        x: 92,
        y: 950,
        url: 'https://lc-I0j7ktVK.cn-n1.lcfile.com/d719fdb289c955627735.jpg',
      },
  
    ]

  },
}
const app=getApp()
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
    userId:"",
    posterConfig: posterConfig.jdConfig,
  },
  // 我要免费领
  wantGet(e){
   console.log("e",e)
   let id=e.currentTarget.dataset.id
   //判断是否plus，是才可以买
   Tips.loading()
   app.zero.isPlus()
   .then(res=>{
     Tips.loaded()
     this.setData({
       maskShow: 1,
       addMH: 1,
       zeroId: id
     })
     console.log("结果",res)
   })
   .catch(rej=>{
     Tips.loaded()
     wx.showModal({
       title: "提示",
       content: rej.message,
       showCancel: false,
     })
     console.log("失败",rej)
   })
  },
//填写地址时候想隐藏
  hideMA(){
   this.setData({
     maskShow:0,
     addMH: 0
   })
  },
  //确认地址
  sureAdd(e){
    console.log("确认地址",e)
    let name = e.detail.value.aname;
    let phone = e.detail.value.aphone;
    let area = e.detail.value.area;

    let reg = /^1\d{10}$/
    if (!(name && phone && area)) {
      Tips.toast('请填写完整','','none');
      return
    }

    if (name.length > 5) {
      Tips.toast('名字过长', '', 'none');
      return
    }
    if (!reg.test(phone)) {
      Tips.toast('请输入正确手机号', '', 'none');
      return
    }
    this.setData({
     addstatus : 1,
     addMH : 0,
     aname:name,
     aphone:phone,
     area:area
    })
   
    console.log("na", name.length, phone)
  },
  //取消
  toCancel() {
    this.setData({
      addstatus:0,
      addMH:1
    })
  
  },
  //确认地址
  toShare() {
    let name = this.data.aname;
    let phone = this.data.aphone;
    let area = this.data.area;
    let zeroId = this.data.zeroId
    let that=this
    app.zero.buyGoods(zeroId,name,phone,area)
    .then(res=>{
      // userId: "19bf9829621d4253ab3c8048ce76fd2c"
      // zeroUserId: 3
      this.setData({
        addstatus: 2,
        showShare: 1,
        zeroUserId: res.data.zeroUserId,
      })
      console.log("地址结果",res)
    })
    .catch(rej=>{
      console.log("失败",rej)
      Tips.toast(rej.message,function(){
        that.setData({
          addstatus : 0,
          maskShow : 0
        })
      },'none')
    })
 
  },
  // 关闭分享
  hideToshare(){
    this.setData({
      maskShow:0,
      addstatus:0,
      showShare:0
    })
  },
  //返回
  goBacks() {
    wx.navigateBack({
      delta:1
    })
  },
  //正在领取中
  isGet(e) {
    let id = e.currentTarget.dataset.id;
    let gname=e.currentTarget.dataset.gname
    this.setData({
      maskShow:1,
      showShare:1,
      addstatus:2,
      zeroUserId: id,
      gname:gname
    })
  },
  //分享
  shareHandler(type) {
    let datas = {
      zeroUserId: this.zeroUserId,
    }
    console.log("aaa")
 
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
    // let isButList = this.data.isButList
    // console.log("参", isButList)
    // Tips.loading()
    // app.zero.getList()
    // .then(res=>{
    //   Tips.loaded()
    //   this.setData({
    //     userId: res.data.userId,
    //     isButList: res.data.zeroGoodsIsBuyRespList,
    //     list: res.data.zeroGoodsResps
    //   })
    //   console.log("获取",res)
    // })
    // .catch(rej=>{
    //   Tips.loaded()
    //   console.log("失败",rej)
    // })
  },
  //生成海报
  onPosterSuccess(e) {
    const { detail } = e;
    console.log("ee", e, detail)
    wx.previewImage({
      current: detail,
      urls: [detail]
    })

    // WxApi.wxOpenSettings(wx.getSetting)
    // .then(res=>{
    //   console.log("res",res)
    //   if (!res.authSetting['scope.writePhotosAlbum']) {
    //     wx.authorize({
    //       scope: 'scope.writePhotosAlbum',
    //       success(res) {
    //         console.log("rre", res)
    //         //保存在本地
    //         wx.saveImageToPhotosAlbum({
    //           filePath: detail,
    //           success(res) {
    //             wx.showToast({
    //               title: '保存图片成功！',
    //             })
    //           },
    //           fail(res) {
    //             console.log("rejjjjjjjjjj", res)
    //           }
    //         })
    //       }
    //     })
    //   }else{
    //     //保存在本地
    //     wx.saveImageToPhotosAlbum({
    //       filePath: detail,
    //       success(res) {
    //         wx.showToast({
    //           title: '保存图片成功！',
    //         })
    //       },
    //       fail(res) {
    //         console.log("rejjjjjjjjjj", res)
    //       }
    //     })
    //   }
    // })
    // .catch(rej=>{
    //   console.log("rej",rej)
    // })
  },

  onPosterFail(err) {
    console.error(err);
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
  onShareAppMessage: function (ops) {
     console.log("ops",ops)  
     let userId=this.data.userId;
    let zeroUserId = this.data.zeroUserId 
     if(ops.from=='button'){
       return {
         title: '来帮我点下',
         path: '/pages/mine/zl/zl?userId=' + userId + '&&zeroUserId=' + zeroUserId
       }
     }   
  }
})