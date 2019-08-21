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
    hasArr:[],  //已经选择的规格类型[1,2,3]
    filArr:[],  //经过筛选后的符合的数组
    filArr2: [],  //经过筛选后的符合的数组2
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
    let canSArr = []

    if (!cans||!icans) return   
    
    let mallGoodsSkuResps = this.data.mallGoodsSkuResps
    let skuListResps = this.data.skuListResps
    let hasArr=this.data.hasArr;
    let filArr=this.data.filArr;
    let filArr2=this.data.filArr2
    let leng = mallGoodsSkuResps.length

    console.log("iddddd", id, cans, tid, mallGoodsSkuResps)
    if (!hasArr.includes(tid)){
      hasArr.push(tid);
    }

    if (hasArr.length==1){
      // var types=[];
      filArr = skuListResps.filter(function (item) {      //筛选包含点击的id的数组
        // console.log("id", tid,item["sku"+(tid+1)+"Id"])
        return item['sku' + (tid + 1) + 'Id'] == id
      })

      // for (let i = 0; i < leng; i++) {
      //   // types[i] = []
      //   if (!hasArr.includes(i)) {
      //     mallGoodsSkuResps[i].itemList.forEach(function (item) {
      //       item.changSel = 0   //这里要处理下，出问题了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //     })
      // }}
      canSArr = filArr
    }else{
      console.log("filArr", filArr)
      filArr2 = filArr.filter(function (item) {      //筛选包含点击的id的数组
        // console.log("id", tid,item["sku"+(tid+1)+"Id"])
        return item['sku' + (tid + 1) + 'Id'] == id
      })
      canSArr = filArr2
    }

    console.log("canSArr", canSArr)
    
    

    if (mallGoodsSkuResps[tid].selIte==id){   //取消点击
      mallGoodsSkuResps[tid].selIte=''
      this.setData({
        mallGoodsSkuResps: mallGoodsSkuResps
      })
      return 
    }
    if(cans&&icans){
      mallGoodsSkuResps[tid].selIte=id
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

      for (let i = 0; i < leng; i++) {
        // types[i] = []
        if (!hasArr.includes(i)) { //这里!!!!!!!!!!!!!!!!!!!!!!!!
          mallGoodsSkuResps[i].itemList.forEach(function (item) {
            item.changSel = 0   //这里要处理下，出问题了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          })
          canSArr.forEach(function (e) {
            // types[i].push(e['sku' + (i+1) + 'Id'])
            mallGoodsSkuResps[i].itemList.forEach(function (item) {
              if (item.itemId == e['sku' + (i + 1) + 'Id']) {
                item.changSel = 1
              }

            })
          })
        }
      }
      console.log("修改后的", mallGoodsSkuResps)


      this.setData({
        mallGoodsSkuResps:mallGoodsSkuResps,
        filArr: filArr,
        hasArr: hasArr
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