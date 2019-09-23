import BaseApi from './BaseApi.js'
export default class Zero extends BaseApi{
  constructor(){
    super()
  }
  //获取商品列表
  getList(){
    return this.post('/api/smallPro/Login/zeroBuyHome')
  }
  //判断是否是plus
  isPlus(){
    return this.post('/api/smallPro/Login/checkIsPlus')
  }
  //确认地址
  buyGoods(zeroId,name,phone,area){
    return this.post('/api/smallPro/Login/buyGoods',{
      zeroId: zeroId,
      realName: name,
      mobile: phone,
      addressDetail: area,
    })
  }
  //分享商品详情
  goodsDet(zeroUserId,userId){
    return this.post('/api/zero/shareGoodsDetail',{
      zeroUserId: zeroUserId,
      userId: userId
    })
  }
  //助力
  helpZero(mobile, code, zeroUserId, userId){
    return this.post('/api/zero/friendCheck',{
      mobile: mobile,
      mobileAuthCode: code,
      zeroUserId: zeroUserId,
      userId: userId
    })
  }
}