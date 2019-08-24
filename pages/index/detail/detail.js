// pages/index/detail/detail.js
import Tips from '../../../class/utils/Tips.js'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgUrls: [
    //   'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    //   'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    //   'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    // ],
    gInfo:{}, //商品信息
    showSKU:false, //false不展示
    mallGoodsSkuResps:[], //规格
    skuListResps:[], //符合的数组
    hasArr:[],  //已经选择的规格类型的id[0,1,2]
    selDone:{},  //选择的结果对象
    textHS:"选择",  //选择的内容，在页面上展示
    gnum:"1",   //购买数量
    isAll:false, //判断是否全选
    addbuy:"",   //1为加入购物车，2为购买
  },
  //去购物车
  toCart(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  //加入购买
  add(e){
    let addbuy=e.currentTarget.dataset.id 
    /**判断有没有sku */

    this.setData({
      showSKU:true,
      addbuy: addbuy
    })
  },
  //隐藏
  hideSKU() {
    this.setData({
      showSKU: false
    })
  },
//返回
  reLeft(){
    wx.navigateBack({
      delta:1
    })
  },
  //增加
  addNum(){
    let gnum=this.data.gnum;
    gnum++
    this.setData({
      gnum:gnum
    })
  },
  //减少
  delNum() {
    let gnum = this.data.gnum;
    gnum--
    this.setData({
      gnum: gnum
    })
  },
  //确定
  confirmDo(){
     let isAll=this.data.isAll
    let addbuy = this.data.addbuy
    let gnum=this.data.gnum
    let selDone=this.data.selDone
    /**判断数量是否超出 */
     if(!isAll) return   //没有选全就返回
    if (gnum > selDone.stock){
      Tips.alert("库存不足")
      return 
    }
     if(addbuy==1){
       Tips.loading()
       app.auth.addCar(selDone,gnum)
       .then(res=>{
         Tips.loaded()
         if(res.code==200) Tips.toast('加入成功')
         console.log("加入购物车",res)
       })
       .catch(rej=>{
         Tips.loaded()
         console.log("加入购物车", rej)

         Tips.alert('加入失败')
         })
     } else if (addbuy==2){
       console.log("立即购买")
     }
  },
 
  //选择sku
  selIte(e){
    let id=e.currentTarget.dataset.id;  //当前skuid
    let cans = e.currentTarget.dataset.cans; //是否可以点击
    let icans = e.currentTarget.dataset.icans; //是否可以点击
    let tid = e.currentTarget.dataset.tid;  //规格类型的id
    if (!cans||!icans) return   //拦截不能点击的
    
    let mallGoodsSkuResps = this.data.mallGoodsSkuResps
    let skuListResps = this.data.skuListResps
    let hasArr=this.data.hasArr;  //已经选择了哪个
    let isAll = this.data.isAll  //是否全选择了

  
    let leng = mallGoodsSkuResps.length

    console.log("iddddd", id, cans, tid, mallGoodsSkuResps, hasArr)
  
     //取消点击
    if (mallGoodsSkuResps[tid].selIte==id){   
      mallGoodsSkuResps[tid].selIte=''
      isAll=false
      let ind=hasArr.findIndex(function(e){
              return e==tid
      })
      hasArr.splice(ind,1)   //裁剪掉

      console.log("取消", hasArr,ind)
      if(hasArr.length==0){
        mallGoodsSkuResps.forEach(function (e) {
          e.itemList.forEach(function (e) { e.changSel = 1 })
        })
      } else if (hasArr.length == 1){    //取消剩下1个
        let hasId = hasArr[0]
        let filArr = skuListResps.filter(function (item) {      //筛选包含点击的id的数组
          return item['sku' + (hasId + 1) + 'Id'] == mallGoodsSkuResps[hasId].selIte
        })
        console.log("取消剩下1个后的", hasId,filArr)
        mallGoodsSkuResps.forEach(function (e) {
          e.itemList.forEach(function (e) { e.changSel = 1 })
        })
        for (let i = 0; i < leng; i++) {
          if (i != hasId) {
            mallGoodsSkuResps[i].itemList.forEach(function (item) {
              item.changSel = 0  
            })
            filArr.forEach(function (e) {
              mallGoodsSkuResps[i].itemList.forEach(function (item) {
                if (item.itemId == e['sku' + (i + 1) + 'Id']) {
                  item.changSel = 1
                }
              })
            })
          }
        }

      } else if (hasArr.length == 2){  //取消剩下两个
        let hasId = hasArr[0]
        let hasId2 = hasArr[1]
        let filArr = skuListResps.filter(function (item) {      //筛选第一个的 包含点击的id的数组
          return item['sku' + (hasId + 1) + 'Id'] == mallGoodsSkuResps[hasId].selIte
        })
        let filArr2 = filArr.filter(function (item) {      //筛选 第一个和第二个的 包含点击的id的数组
          return item['sku' + (hasId2 + 1) + 'Id'] == mallGoodsSkuResps[hasId2].selIte
        })
        let filArr2a = skuListResps.filter(function (item) {      //筛选只有第二个的 包含点击的id的数组
          return item['sku' + (hasId2 + 1) + 'Id'] == mallGoodsSkuResps[hasId2].selIte
        })
        console.log("取消剩下2个后的", hasId, hasId2, filArr, filArr2, filArr2a)
        mallGoodsSkuResps.forEach(function (e) {               //给所有的复原
          e.itemList.forEach(function (e) { e.changSel = 0 })
        })
        //筛选了两个后的，给第三个设置
        for (let i = 0; i < leng; i++) {
          // mallGoodsSkuResps[i].itemList.forEach(function (item) {
          //   item.changSel = 0   //给所有的都设置为0
          // })
          if (i != hasId) {
            if (!hasArr.includes(i)) {
              filArr2.forEach(function (e) {
                mallGoodsSkuResps[i].itemList.forEach(function (item) {
                  if (item.itemId == e['sku' + (i + 1) + 'Id']) {
                    item.changSel = 1
                  }
                })
              })
            } else {
              filArr.forEach(function (e) {
                mallGoodsSkuResps[i].itemList.forEach(function (item) {
                  if (item.itemId == e['sku' + (i + 1) + 'Id']) {
                    item.changSel = 1
                  }

                })
              })
            }
          }else{
            filArr2a.forEach(function (e) {
              mallGoodsSkuResps[i].itemList.forEach(function (item) {
                if (item.itemId == e['sku' + (i + 1) + 'Id']) {
                  item.changSel = 1
                }

              })
            })
          }
        }
      }
      //在这里控制外面的展示为默认
      let textHS="选择"
      mallGoodsSkuResps.forEach(function (e) {
        textHS += " " + e.name
      })

      this.setData({
        mallGoodsSkuResps: mallGoodsSkuResps,
        hasArr: hasArr,
        textHS: textHS,
        isAll: isAll
      })
      return 
    }


    if(cans&&icans){
      mallGoodsSkuResps[tid].selIte=id
      if (!hasArr.includes(tid)) {
        hasArr.push(tid);
      }
      if (hasArr.length == 1) {
        let filArr = skuListResps.filter(function (item) {      //筛选包含点击的id的数组
          return item['sku' + (tid + 1) + 'Id'] == id
        })
      
        for (let i = 0; i < leng; i++) {
          if (i != tid) {
            mallGoodsSkuResps[i].itemList.forEach(function (item) {
              item.changSel = 0   //这里要处理下
            })
            filArr.forEach(function (e) {
              mallGoodsSkuResps[i].itemList.forEach(function (item) {
                if (item.itemId == e['sku' + (i + 1) + 'Id']) {
                  item.changSel = 1
                }
              })
            })
          }
        }
      } else if (hasArr.length == 2) {
        let hasArr_on = hasArr.filter(function (item) {
          return item != tid
        })[0]
        let filArr = skuListResps.filter(function (item) {      //筛选第一次点击 含点击的id的数组
          return item['sku' + (hasArr_on + 1) + 'Id'] == mallGoodsSkuResps[hasArr_on].selIte
        })
        console.log("filArr", filArr, hasArr_on)
        let filArr2 = filArr.filter(function (item) {      //筛选第一次和第二次的 包含点击的id的数组
          return item['sku' + (tid + 1) + 'Id'] == id
        })
        let filArr2a = skuListResps.filter(function (item) {      //筛选第二次点击的不包含第一次的包含点击的id的数组
          return item['sku' + (tid + 1) + 'Id'] == id
        })
        //筛选了两个后的，给第三个设置
        for (let i = 0; i < leng; i++) {
          // if (!hasArr.includes(i)) { //这里!!!!!!!!!!!!!!!!!!!!!!!!
          if (i != tid) {
            mallGoodsSkuResps[i].itemList.forEach(function (item) {
              item.changSel = 0   //
            })
            if (!hasArr.includes(i)) {
              filArr2.forEach(function (e) {
                mallGoodsSkuResps[i].itemList.forEach(function (item) {
                  if (item.itemId == e['sku' + (i + 1) + 'Id']) {
                    item.changSel = 1
                  }
                })
              })
            } else {
              filArr2a.forEach(function (e) {
                mallGoodsSkuResps[i].itemList.forEach(function (item) {
                  if (item.itemId == e['sku' + (i + 1) + 'Id']) {
                    item.changSel = 1
                  }

                })
              })
            }
          }
        }

      } else { //选择第三个的时候
        let filArr = skuListResps.filter(function (item) {      //1zu筛选包含点击的id的数组
          return item['sku' + (tid + 1) + 'Id'] == id
        })
        let hasArr_on = hasArr.filter(function (item) {
          return item != tid
        })
        let hasArr_1 = hasArr_on[0];
        let hasArr_2 = hasArr_on[1];
        let filArr2 = filArr.filter(function (item) {      //筛选包含点击的id的数组
          return item['sku' + (hasArr_1 + 1) + 'Id'] == mallGoodsSkuResps[hasArr_1].selIte
        })
        let filArr1 = filArr.filter(function (item) {      //筛选包含点击的id的数组
          return item['sku' + (hasArr_2 + 1) + 'Id'] == mallGoodsSkuResps[hasArr_2].selIte
        })
        console.log("第三次筛选", filArr, filArr1, filArr2, hasArr_on, id)
        //------------------------------------------进行赋值
        //清除其他两个的
        for (let i = 0; i < leng; i++) {
          if (i != tid) {
            mallGoodsSkuResps[i].itemList.forEach(function (item) {
              item.changSel = 0   
            })
          }
        }
        // mallGoodsSkuResps[hasArr_2].itemList.forEach(function (item) {
        //   item.changSel = 0   //给第2个清除
        // })
        filArr2.forEach(function (e) {
          mallGoodsSkuResps[hasArr_2].itemList.forEach(function (item) {
            if (item.itemId == e['sku' + (hasArr_2 + 1) + 'Id']) {
              item.changSel = 1
            }
          })
        })
        // mallGoodsSkuResps[hasArr_1].itemList.forEach(function (item) {
        //   item.changSel = 0    //给第1个清除
        // })
        filArr1.forEach(function (e) {
          mallGoodsSkuResps[hasArr_1].itemList.forEach(function (item) {
            if (item.itemId == e['sku' + (hasArr_1 + 1) + 'Id']) {
              item.changSel = 1
            }
          })
        })
        console.log("看下bug", mallGoodsSkuResps)
      }
      /**在这里处理最终结果，获取金额和图片等 */
      let selDone = this.data.selDone
      isAll= mallGoodsSkuResps.every(function (e) {
        return e.selIte!=''
      })
      if(isAll){
        let textHS = '已选'  
        if (leng==1){
          selDone = skuListResps.find(function (e) {
                return e.sku1Id == mallGoodsSkuResps[0].selIte
            })
        } else if (leng==2){
          selDone = skuListResps.find(function (e) {
              return e.sku1Id == mallGoodsSkuResps[0].selIte && e.sku2Id == mallGoodsSkuResps[1].selIte
            })
        } else if (leng==3) {
            selDone = skuListResps.find(function (e) {
              return e.sku1Id == mallGoodsSkuResps[0].selIte && e.sku2Id == mallGoodsSkuResps[1].selIte && e.sku3Id == mallGoodsSkuResps[2].selIte
            })
          }
        //在外面展示的字
        mallGoodsSkuResps.forEach(function (e) {
            e.itemList.forEach(function(item){
              if (e.selIte == item.itemId){
                textHS +=" "+ item.itemName
              }
            })
        })
        this.setData({
          textHS: textHS

        })
      }
    
      console.log("e.items", leng, isAll, selDone, mallGoodsSkuResps)
    

    //  console.log("筛选的",selDone)
      this.setData({
        mallGoodsSkuResps:mallGoodsSkuResps,
        hasArr: hasArr,
        selDone: selDone,
        isAll: isAll
      })
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let gid=options.gid
    let textHS = this.data.textHS
    console.log("获取gid",gid)
    let that=this
    Tips.loading()
    app.auth.getDetail(gid).then(res=>{
      Tips.loaded()
      console.log("获取详情",res)
      that.setData({
        gInfo:res.data
      })
      if(res.data.isSku==0){
        return true
      }
    })
    .then(res=>{
      console.log("res",res)
      if(res){
        app.auth.getSku(gid)
        .then(res=>{
          console.log("获取sku",res)
          
          res.data.mallGoodsSkuResps.forEach(function (e) {
            e.selIte = ''
            e.itemList.forEach(function (e) { e.changSel = 1 })
            textHS+=" "+e.name
            // console.log("e",e)
          })
          that.setData({
            mallGoodsSkuResps: res.data.mallGoodsSkuResps,
            skuListResps: res.data.skuListResps,
            textHS: textHS
          })
        })
      }
    })
    .catch(rej=>{
      Tips.loaded()
      Tips.alert("网络异常")
    })
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
    // let res = {
    //   "code": 0,
    //   "data": {
    //     "mallGoodsSkuResps": [
    //       {
    //         "itemList": [
    //           {
    //             "isSelect": 0, //0灰色，1正常
    //             "itemId":197,
    //             "itemName": "男款"
    //           },
    //           {
    //             "isSelect": 1, //0灰色，1正常
    //             "itemId": 198,
    //             "itemName": "女款"
    //           },
    //           {
    //             "isSelect": 1, //0灰色，1正常
    //             "itemId": 199,
    //             "itemName": "中性款"
    //           }
    //         ],
    //         "name": "款式"
    //       },
    //       {
    //         "itemList": [
    //           {
    //             "isSelect": 1, //0灰色，1正常
    //             "itemId":201,
    //             "itemName": "s"
    //           },
    //           {
    //             "isSelect": 0, //0灰色，1正常
    //             "itemId": 202,
    //             "itemName": "m"
    //           },
    //           {
    //             "isSelect": 1, //0灰色，1正常
    //             "itemId": 203,
    //             "itemName": "l"
    //           }
    //         ],
    //         "name": "尺寸"
    //       },
    //       {
    //         "itemList": [
    //           {
    //             "isSelect": 1, //0灰色，1正常
    //             "itemId": 301,
    //             "itemName": "哈哈哈"
    //           },
    //           {
    //             "isSelect":1, //0灰色，1正常
    //             "itemId": 302,
    //             "itemName": "呵呵呵呵"
    //           },
    //           {
    //             "isSelect": 1, //0灰色，1正常
    //             "itemId": 303,
    //             "itemName": "嘿嘿"
    //           }
    //         ],
    //         "name": "其他"
    //       },
    //     ],
    //     "skuListResps": [
    //       {
    //         "pic": "../../../img/3.jpg",
    //         "price": "153",
    //         "rebatePrice": "3",
    //         "sku1Id": 198,
    //         "sku2Id": 201,
    //         "sku3Id": 301,
    //         "skuId": 6933,
    //         "stock": 10
    //       },
    //       {
    //         "pic": "../../../img/3.jpg",
    //         "price": "167",
    //         "rebatePrice": "3",
    //         "sku1Id": 198,
    //         "sku2Id": 203,
    //         "sku3Id": 301,
    //         "skuId": 6934,
    //         "stock": 10
    //       },
    //       {
    //         "pic": "../../../img/3.jpg",
    //         "price": "179",
    //         "rebatePrice": "3",
    //         "sku1Id": 199,
    //         "sku2Id": 201,
    //         "sku3Id": 301,
    //         "skuId": 6935,
    //         "stock": 10
    //       },
    //       {
    //         "pic": "../../../img/3.jpg",
    //         "price": "180",
    //         "rebatePrice": "3",
    //         "sku1Id": 199,
    //         "sku2Id": 201,
    //         "sku3Id": 303,
    //         "skuId": 6935,
    //         "stock": 10
    //       },
    //       {
    //         "pic": "../../../img/3.jpg",
    //         "price": "179",
    //         "rebatePrice": "3",
    //         "sku1Id": 198,
    //         "sku2Id": 201,
    //         "sku3Id": 303,
    //         "skuId": 6935,
    //         "stock": 10
    //       }
    //     ]
    //   },
    //   "message": "ok"
    // }
    // res.data.mallGoodsSkuResps.forEach(function(e){
    //     e.selIte = ''
    //   e.itemList.forEach(function(e){e.changSel=1})
    //     // console.log("e",e)
    // })
    // this.setData({
    //   mallGoodsSkuResps: res.data.mallGoodsSkuResps,
    //   skuListResps: res.data.skuListResps
    // })
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