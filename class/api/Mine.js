import BaseApi from './BaseApi.js'
export default class Mine extends BaseApi{
  constructor(){
    super()
  }

  getSite(cityId){
   return this.post('/api/third/Mall/parentId',{
     cityId: cityId, //默认的
     deviceId: "1",
     appVersion: "1",
     phoneSystemVersion: "1",
    })
  }

} 