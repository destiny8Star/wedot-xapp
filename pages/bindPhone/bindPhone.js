// pages/bindPhone/bindPhone.js
import Tips from '../../class/utils/Tips.js'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getChange:true,//防止重复点击
    phone:"",
    getText:"获取验证码",//验证码name
    code:'',  //验证码
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
  blurCode(e){
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
        this.setData({
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
        Tips.loading()
        app.auth.getIndCode(phone)
          .then(res => {
            Tips.loaded()
            console.log('获取验证码', res)
            if (res.code == 200) {
              Tips.toast('发送成功')
            }
          })
          .catch(rej=>{
            Tips.alert("网络异常")
          })

      }
    }
  },
  //绑定手机号
  bindPhone(){
     let phone=this.data.phone;
     let code=this.data.code;
    if (!(/^1\d{10}$/.test(phone))) {Tips.alert("请输入正确手机号") ;return}
    if(!code){Tips.alert("请输入验证码");return}
    Tips.loading()
    app.auth.bindP(phone,code)
    .then(res=>{
      Tips.loaded()
      if(res.code==200){
        let auth=wx.getStorageSync('auth')
        //重新获取并保存个人信息
        app.auth.syncUserInfo(auth)
        .then(res=>{
          console.log("保存结果",res)
          wx.navigateBack({
            delta:1
          })
        })
        .catch(rej=>{
          Tips.alert("网络异常")
        })        
      }
      console.log("绑定结果",res)
    })
    .catch(rej=>{
      Tips.loaded()
      console.log("失败",rej)
      Tips.alert("网络异常")
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