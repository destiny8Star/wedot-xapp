// pages/mine/zl/zl.js
import Tips from '../../../class/utils/Tips.js'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getChange: true,//防止重复点击
    infos:'',//详情
    sure:"true", //是否先显示mask  true:不显示  false:显示
    phone:'',
    code:'',
    getText: "获取验证码",//验证码name
    zlText:'',//助力完成字
    zlDone:false, //true:助力完成   false：助力未完成
  },
  //显示
  showMask(){
    this.setData({
      sure:false
    })
  },
  hideMask(){
    this.setData({
      sure: true
    })
  },
  // 手机号码
  blurPhonel: function (e) {
    let that = this
    var phone = e.detail.value;
    console.log('手机号', phone)
    that.setData({
      phone: phone
    })
  },
  blurCode(e) {
    var code = e.detail.value;
    console.log('验证码', code)
    this.setData({
      code: code
    })
  },
  //获取验证码
  getYZM: function () {
    var getChange = this.data.getChange
    var n = 59;
    var that = this;
    var phone = this.data.phone;
    if (!(/^1\d{10}$/.test(phone))) {
      Tips.alert('请输入正确手机号')
    } else {
      if (getChange) {
    
        Tips.loading()
        app.auth.getIndCode(phone)
          .then(res => {
            Tips.loaded()
            console.log('获取验证码', res)
            if (res.code == 200) {
              Tips.toast('发送成功')
              
              that.setData({
                getChange: false
              })
              var time = setInterval(function () {
                var str = '(' + n + ')' + '重新获取'
                that.setData({
                  getText: str
                })
                n--;
                if (n <= 0) {
                  that.setData({
                    getChange: true,
                    getText: '重新获取'
                  })
                  clearInterval(time);
                }
              }, 1000);

            }
          })
          .catch(rej => {
            Tips.loaded()
            Tips.toast(res.message,'','none')
          })

      }
    }
  },
  //绑定手机号助力
  bindPhone() {
    let phone = this.data.phone;
    let code = this.data.code;
    let zeroUserId = this.data.zeroUserId
    let userId = this.data.userId
    let that=this
    if (!(/^1\d{10}$/.test(phone))) { Tips.alert("请输入正确手机号"); return }
    if (!code) { Tips.alert("请输入验证码"); return }
    Tips.loading()
    app.zero.helpZero(phone, code, zeroUserId, userId)
      .then(res => {
        Tips.loaded()
        Tips.toast("助力成功",function(){
          that.setData({
            sure:true,
            zlDone:true,
            zlText:"感谢您已助力成功!"
          })
        })
        console.log("绑定结果", res)
      })
      .catch(rej => {
        Tips.loaded()
        console.log("失败", rej)
        if(rej.code==6014){
          Tips.toast(rej.message, function () {
            that.setData({
              sure: true,
              zlDone: true,
              zlText: "您已帮其他朋友助力过!"
            })
          }, "none")
        }else{
          Tips.toast(rej.message,"", "none")
        }
       
      })
  },
  //我也要零元领取
  toMine(){
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = options.userId 
    let zeroUserId = options.zeroUserId
    this.setData({
      userId: userId,
      zeroUserId: zeroUserId
    })
    Tips.toast("user" + userId + 'zer' + zeroUserId)
    Tips.loading()
    app.zero.goodsDet(zeroUserId,userId)
    .then(res=>{
      Tips.loaded()
      this.setData({
        infos:res.data
      })
      console.log("获取详情",res)
    })
    .catch(rej=>{
      Tips.loaded()
      console.log("失败",rej)
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