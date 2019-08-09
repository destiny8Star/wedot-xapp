import BaseApi from './BaseApi.js';
const wxApi = require('./../utils/WxApi.js');
// const wxApi = require('./../utils/WxApi.js');
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
  login(code) {
    return this.get('wxOpenid', {
      'js_code': code
    });
  }

  //微信授权
  sendInfo(auth, userIfo) {
    // console.log(auth,userIfo)
    return this.post('wxLogin', {
      'nickname': userIfo.nickName,
      'openid': auth.openid.openid,
      'avatar': userIfo.avatarUrl,
      'token': auth.token
    })

  }
  saveAuthInfo(auth) {
    // console.log('auto', auth);
    let data = auth.data
    wx.setStorageSync('auth', data);
    return auth.data;
  }
  //保存获取用户信息
  syncUserInfo() {
    // let token=wx.getStorageSync('auth').token
    // let resl = {
    //   'openid': res.data.openid,
    //   "token":token
    // };
    return this.get('userInfo').then(res => {
      wx.setStorageSync('user', res.data)
      return res
    })
  }
  
  //实名认证上传图片
  sendImg(type,arr) {
    let auth = wx.getStorageSync('auth');
   let token = auth.token;
    let openid = auth.openid.openid
    return new Promise((resole,rej)=>{
      wx.uploadFile({
        url:  'https://farm.isoft.mobi/api/papersUpload',
        filePath: arr[0],
        name: 'files',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        formData: {
          file_type:type,
          token: token,
          openid:openid
        },
        success:function(res){
            resole(res)
        },
        fail:function(res){
               rej(res)
        }
      })
    })
  }


}