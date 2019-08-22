// pages/index/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    showSKU:false, //false不展示
    mallGoodsSkuResps:[], //规格
    skuListResps:[], //符合的数组
    hasArr:[],  //已经选择的规格类型[0,1,2]

  },
  //去购物车
  toCart(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  //加入购买
  add(){
    this.setData({
      showSKU:true
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
  //隐藏弹框
  hideMask(){

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
    let hasArr=this.data.hasArr;
  
    let leng = mallGoodsSkuResps.length

    console.log("iddddd", id, cans, tid, mallGoodsSkuResps, hasArr)
  
     //取消点击
    if (mallGoodsSkuResps[tid].selIte==id){   
      mallGoodsSkuResps[tid].selIte=''
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

      this.setData({
        mallGoodsSkuResps: mallGoodsSkuResps,
        // hasArr: hasArr
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
        // for (let i = 0; i < leng; i++) {
        //   // types[i] = []
        //   if (!hasArr.includes(i)) {
        //     mallGoodsSkuResps[i].itemList.forEach(function (item) {
        //       item.changSel = 0   //这里要处理下，出问题了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //     })
        // }}
        // canSArr = filArr
        for (let i = 0; i < leng; i++) {
          // types[i] = []
          // if (!hasArr.includes(i)) { //这里!!!!!!!!!!!!!!!!!!!!!!!!
          if (i != tid) {
            mallGoodsSkuResps[i].itemList.forEach(function (item) {
              item.changSel = 0   //这里要处理下，出问题了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            })
            filArr.forEach(function (e) {
              // types[i].push(e['sku' + (i+1) + 'Id'])
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
              item.changSel = 0   //
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
      }

      // mallGoodsSkuResps.forEach(function(e){
      //   if (e.selIte)
      // })
      // let selArr = []
      // for(let i=0;i<leng;i++){
      //   selArr.push(mallGoodsSkuResps[i].selIte)
      // }
      // console.log("aaaa", selArr)
      //   let isAll=selArr.every(function(item){
      //           return item
      //   })
      // if (isAll) return

      // for (let i = 0; i < leng; i++) {
      //   // types[i] = []
      //   // if (!hasArr.includes(i)) { //这里!!!!!!!!!!!!!!!!!!!!!!!!
      //   if (i!=tid) { 
      //     mallGoodsSkuResps[i].itemList.forEach(function (item) {
      //       item.changSel = 0   //这里要处理下，出问题了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //     })
      //     canSArr.forEach(function (e) {
      //       // types[i].push(e['sku' + (i+1) + 'Id'])
      //       mallGoodsSkuResps[i].itemList.forEach(function (item) {
      //         if (item.itemId == e['sku' + (i + 1) + 'Id']) {
      //           item.changSel = 1
      //         }

      //       })
      //     })
      //   }
      // }
      // console.log("修改后的", mallGoodsSkuResps)

      this.setData({
        mallGoodsSkuResps:mallGoodsSkuResps,
        // hasArr: hasArr
      })
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let res = {
      "code": 0,
      "data": {
        "mallGoodsSkuResps": [
          {
            "itemList": [
              {
                "isSelect": 0, //0灰色，1正常
                "itemId":197,
                "itemName": "男款"
              },
              {
                "isSelect": 1, //0灰色，1正常
                "itemId": 198,
                "itemName": "女款"
              },
              {
                "isSelect": 1, //0灰色，1正常
                "itemId": 199,
                "itemName": "中性款"
              }
            ],
            "name": "款式"
          },
          {
            "itemList": [
              {
                "isSelect": 1, //0灰色，1正常
                "itemId":201,
                "itemName": "s"
              },
              {
                "isSelect": 0, //0灰色，1正常
                "itemId": 202,
                "itemName": "m"
              },
              {
                "isSelect": 1, //0灰色，1正常
                "itemId": 203,
                "itemName": "l"
              }
            ],
            "name": "尺寸"
          },
          {
            "itemList": [
              {
                "isSelect": 1, //0灰色，1正常
                "itemId": 301,
                "itemName": "哈哈哈"
              },
              {
                "isSelect":1, //0灰色，1正常
                "itemId": 302,
                "itemName": "呵呵呵呵"
              },
              {
                "isSelect": 1, //0灰色，1正常
                "itemId": 303,
                "itemName": "嘿嘿"
              }
            ],
            "name": "其他"
          },
        ],
        "skuListResps": [
          {
            "pic": "../../../img/3.jpg",
            "price": "112",
            "rebatePrice": "3",
            "sku1Id": 198,
            "sku2Id": 201,
            "sku3Id": 301,
            "skuId": 6933,
            "stock": 10
          },
          {
            "pic": "../../../img/3.jpg",
            "price": "112",
            "rebatePrice": "3",
            "sku1Id": 198,
            "sku2Id": 203,
            "sku3Id": 301,
            "skuId": 6934,
            "stock": 10
          },
          {
            "pic": "../../../img/3.jpg",
            "price": "112",
            "rebatePrice": "3",
            "sku1Id": 199,
            "sku2Id": 201,
            "sku3Id": 301,
            "skuId": 6935,
            "stock": 10
          },
          {
            "pic": "../../../img/3.jpg",
            "price": "112",
            "rebatePrice": "3",
            "sku1Id": 199,
            "sku2Id": 201,
            "sku3Id": 303,
            "skuId": 6935,
            "stock": 10
          },
          {
            "pic": "../../../img/3.jpg",
            "price": "112",
            "rebatePrice": "3",
            "sku1Id": 198,
            "sku2Id": 201,
            "sku3Id": 303,
            "skuId": 6935,
            "stock": 10
          }
        ]
      },
      "message": "ok"
    }
    res.data.mallGoodsSkuResps.forEach(function(e){
        e.selIte = ''
      e.itemList.forEach(function(e){e.changSel=1})
        // console.log("e",e)
    })
    this.setData({
      mallGoodsSkuResps: res.data.mallGoodsSkuResps,
      skuListResps: res.data.skuListResps
    })
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