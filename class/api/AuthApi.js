import BaseApi from './BaseApi.js';
const wxApi = require('./../utils/WxApi.js');

export default class AuthApi extends BaseApi {
  constructor() {
    super();
  }

  getCode() {
    return wxApi.wxLogin().then(res => {
      if (res.code == null || res.code == '') {
        return Promise.reject('登录失败');
      } else {
        return res.code;
      }
    });
  }
  //获取openid
  login(code,e) {
    return this.post('/api/smallPro/Login/wxLogin', {
      'code': code,
      'encryptedData': e.detail.encryptedData,
      "iv":e.detail.iv
    });
  }

  //发送给后台的
  sendInfo(auth, userIfo) {
    // console.log(auth,userIfo)
    return this.post('wxLogin', {
      'nickname': userIfo.nickName,
      'openid': auth.openid.openid,
      'avatar': userIfo.avatarUrl,
      'token': auth.token
    })

  }
  //保存信息
  saveAuthInfo(auth) {
    console.log('auto', auth);
    let data = auth.data
    // let info = e.detail.userInfo
    wx.setStorageSync('auth', data);
    // wx.setStorageSync('userInfo', info);
    return data;
  }
  //保存获取用户信息
  syncUserInfo(res) {
    let openId=res.openId;
    return this.post('/api/smallPro/Login/userInfo',{
      openId:openId
    })
    .then(res => {
      console.log("获取后台的user", res)
      
      wx.setStorageSync('user', res.data)
      return res
    })
  }

  //获取验证码
  getIndCode(phone) {
    return this.post('/api/third/smsCode', {
      phone: phone
    })
  }
//获取首页信息
getHome(){
  return this.post('/api/smallPro/Login/home')
}
//获取商品列表
getGoods(){
  return this.post('/api/smallPro/Login/home/goods',{
    cursor: 1,
    size:10
  })
}
//获取商品详情
getDetail(gid){
  return this.post('/api/smallPro/Login/goodsId',{
    goodsId:gid
  })
}
//获取sku
getSku(gid){
  return this.post('/api/smallPro/Login/goods/sku',{
    goodsId: gid
  })
}  
//添加购物车
addCar(info,gnum){
  return this.post('/api/smallPro/Login/tradeCart/add',{
    goodsId: info.skuId,
    goodsNo: gnum,

  })
}
//购物车列表
  carList(openId,page){
  return this.post('/api/smallPro/Login/shoppingTrolleyList',{
    openId:openId,
    pageNum:page
  })
}
//数量修改
  changeNum(tid, goodsNo){
    return this.post('/api/smallPro/Login/addNum',{
      tradeCartItemId:tid,
      goodsNo:goodsNo
    })
}
//删除
delCar(sid,tid){
  return this.post('/api/smallPro/Login/updateTradeCart',{
    storeIds: sid,
    tradeCartItemIds:tid,
  })
}
  //实名认证上传图片
  // sendImg(type,arr) {
  //   let auth = wx.getStorageSync('auth');
  //  let token = auth.token;
  //   let openid = auth.openid.openid
  //   return new Promise((resole,rej)=>{
  //     wx.uploadFile({
  //       url:  'https://farm.isoft.mobi/api/papersUpload',
  //       filePath: arr[0],
  //       name: 'files',
  //       header: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       method: "POST",
  //       formData: {
  //         file_type:type,
  //         token: token,
  //         openid:openid
  //       },
  //       success:function(res){
  //           resole(res)
  //       },
  //       fail:function(res){
  //              rej(res)
  //       }
  //     })
  //   })
  // }


}