//app.js

import Auth from '/class/api/AuthApi.js';
import Mine from '/class/api/Mine.js';


const auth = new Auth();
const mine =new Mine()
App({
  auth: auth,
  mine:mine,
  onLaunch: function () {

  },
  globalData: {
    api: 'https://farm.isoft.mobi/api/',
    addText: '玩命加载中...',
    endText: '—————  我也是有底线的  —————',
  }
})