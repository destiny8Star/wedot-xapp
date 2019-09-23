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
    return this.post('/api/smallPro/Login/smsCode', {
      mobile: phone
    })
  }
  //绑定手机号
  bindP(phone,code){
    return this.post('/api/smallPro/Login/phone/bind',{
      phone:phone,
      mobileAuthCode:code
    })
  }
//获取首页信息
getHome(){
  return this.post('/api/smallPro/Login/home')
}
//获取分类下的商品
getTGood(cid,cursor){
  return this.post('/api/smallPro/Login/page/cid',{
    cid:cid,
    cursor:cursor,
    size:10
  })
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
//立即购买
  buyNow(info, gnum, addressId){
  return this.post('/api/smallPro/Login/buyNow',{
    goodsId: info,
    num:gnum,
    addressId: addressId
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
//搜索
  search(goodsName, searchType,sort,cursor){
  return this.post('/api/smallPro/Login/page',{
    goodsName: goodsName,
    searchType: searchType,
    sort: sort,
    cursor: cursor,
    size:10
  })
}
//立即购买预览
nowSubOr(gid,num){
  return this.post('/api/smallPro/Login/buySubmitOrder',{
    goodsId:gid,
    num:num
  })
}
//提交订单预览
  subOr(traId){
   return this.post('/api/smallPro/Login/submitOrder',{
     tradeCartItemIds:traId
   })
 }
 //获取默认地址
 getDefAdd(){
   return this.post('/api/smallPro/Login/addresses/default')
 }
 //去付款生成订单
  createOrd(cartItemIds, storeIds, addressId){
    return this.post('/api/smallPro/Login/cartBuy',{
     cartItemIds: cartItemIds,
     storeIds: storeIds,
     addressId: addressId
   })
 }
//获取所有地址
getAllAdd(){
  return this.post('/api/smallPro/Login/addresses/account')
}
//增加收货地址
  incAdd(name, mobile, detailArea, discount2){
    return this.post('/api/smallPro/Login/address', {
      realName: name,
      mobile: mobile,
      detailArea: detailArea,
      province: discount2[0],
      city: discount2[1],
      area: discount2[2],
      isDefault:1
    })
}
//修改地址
  updAdd(id, name, mobile, detailArea,discount2){
    return this.post('/api/smallPro/Login/address/update',{
      commodityAddressId:id,
      realName:name,
      mobile:mobile,
      detailArea: detailArea,
      province: discount2[0],
      city: discount2[1],
      area: discount2[2]
    })
}

//修改默认地址
updDefAdd(id){
  return this.post('/api/smallPro/Login/addresses/default/update',{
    commodityAddressId:id
  })
}
//删除收货地址
delAdd(id){
  return this.post('/api/smallPro/Login/address/delete',{
    commodityAddressId:id
  })
}

}