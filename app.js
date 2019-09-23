//app.js

import Auth from '/class/api/AuthApi.js';
import Mine from '/class/api/Mine.js';
import Zero from '/class/api/Zero.js'

const auth = new Auth();
const mine =new Mine()
const zero = new Zero()
App({
  auth: auth,
  mine:mine,
  zero:zero,
  onLaunch: function () {

  },
  globalData: {
    api: 'https://farm.isoft.mobi/api/',
    addText: '玩命加载中...',
    endText: '—————  我也是有底线的  —————',
  }
})