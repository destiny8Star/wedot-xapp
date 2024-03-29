import Tips from './Tips.js';

// const baseURL = "http://test.weidianlingshou.com"//测试环境接口域名
// const baseURL = "https://product.weidianlingshou.com"//生产环境接口域名
const baseURL ='http://192.168.1.138:8188'


export default class Http {
  constructor() {

  }

  /**
   * 
   */
  static request(method, url, data) {
    return new Promise((resolve, reject) => {
    
      let header = this.createAuthHeader();
      if (!data) {
        data = {};
      }
      if (wx.getStorageSync('auth')) {
        let auth = wx.getStorageSync('auth');
        // data.token = auth.token;
        data.openId=auth.openId;
        data.timestamp = Math.round(new Date().getTime() / 1000);
        data.deviceType='3'
      }

      if (method.toUpperCase() == 'POST') {
        header = Object.assign(header, {
          'content-type': 'application/x-www-form-urlencoded'
        });
      }

      wx.request({
        url: baseURL + url,
        method: method,
        header: header,
        data: data,
        success: (res) => {
          // console.log("配置信息",res)
          const wxCode = res.statusCode;
          if (wxCode != 200) {
            reject(res)
          } else {
            const wxData = res.data;
            const code = wxData.code;
            if (code != 200) {
              if (code == 10012) { //重新授权的提示
                wx.reLaunch({
                  url: '/pages/shouquan/shouquan',
                })
              }
              reject(wxData);
            } else {
              const serverData = wxData;
              resolve(serverData);
            }
          }
        },
        fail: (res) => {
          reject(res);
        }
      })
    });
  }

  static createAuthHeader() {
    var header = {};
    if (wx.getStorageSync('token') != '') {
      header.Authorization = 'Bearer ' + wx.getStorageSync('token');
    }
    return header;
  }

  static upload(url, file, data) {
    return new Promise((resolve, reject) => {
      if (!data) {
        data = {};
      }
      if (wx.getStorageSync('user')) {
        let user = wx.getStorageSync('user');
        data.user_id = user.id;
      }
      wx.uploadFile({
        url: baseURL + url,
        filePath: file,
        name: 'files',
        method: 'POST',
        formData: data,
        header: {
          "content-type": "multipart/form-data"
        },
        success: (res) => {
          const wxCode = res.statusCode;
          if (wxCode != 200) {
            reject(res)
          } else {
            const wxData = res.data;
            const code = wxData.code;
            if (code != 200) {
              resolve(wxData.data);
            } else {
              const serverData = wxData.data;
              resolve(serverData);
            }
          }
        },
        fail: (res) => {
          reject(res);
        }
      })
    });
  }

  static get(url, data) {
    return this.request("GET", url, data);
  }

  static put(url, data) {
    return this.request("PUT", url, data);
  }

  static post(url, data) {
    return this.request("POST", url, data);
  }

  static patch(url, data) {
    return this.request("PATCH", url, data);
  }

  static delete(url, data) {
    return this.request("DELETE", url, data);
  }
}