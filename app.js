//app.js

import Auth from '/class/api/AuthApi.js';
const auth = new Auth();
App({
  auth: auth,
  onLaunch: function () {

  },
  globalData: {
    api: 'https://farm.isoft.mobi/api/',
    addText: '玩命加载中...',
    endText: '—————  我也是有底线的  —————',
  }
})