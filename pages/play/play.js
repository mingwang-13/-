// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      songs:[],// 所有歌曲的信息
      title:[],// 歌曲的名称
      nowindex:0,// 当前是第几首歌曲
      count:0,// 当前歌曲名称的长度
      isall:""// 标记有没有填完
  },
  init:function(){
    // 初始化
    this.setData({
      title : []
    })
    console.log(11111111)
    wx.request({      
        url:"http://mock.studyinghome.com/mock/5e4f79f9ca6994415ce34503/music/getsong",
        success:res=>{
          console.log(res.data)
          for(var i=0;i<res.data.data[this.data.nowindex].name.length;i++){
            this.data.title.push("")
          }
  this.setData({
    songs: res.data.data,
    count:res.data.data[this.data.nowindex].name.length
  })
   }
    })
  },
  cleartxt:function(e){
   this.data.title[e.target.id]=""
   this.setData({
     title:this.data.title
   })
  },
  getitem:function(e){
    // 点击的字
     var word = this.data.songs[this.data.nowindex].keyword[e.target.id]
    // 加到title
    for(var i = 0;i<this.data.title.length;i++){
      // 判断是否为空
      if(this.data.title[i]==""){
        this.data.title[i]=word
        break
      }
      if(i==this.data.title.length-2){
         this.setData({
           isall:"all"
         })
      }
    }
    // this.data.title.push(word)
    this.setData({
      title: this.data.title
    })
    // 比对歌名
    if(this.data.isall=="all"){
      if(this.data.songs[this.data.nowindex].name==this.data.title.join('')){
        wx.showModal({
          title: '提示',
          content: '答对了,进入下一关',
          success:res=> {
            if (res.confirm) {
            // 判断歌曲有没有结束
            if(this.data.songs.length - 1 == this.data.nowindex){
              wx.redirectTo({
                url: '/pages/win/win',
              })
            }else{
              var index = this.data.nowindex+1
              // 改变当前索引
              this.setData({
                nowindex:index,
                isall:""
              })
              wx.setNavigationBarTitle({
                title: '听歌识曲第' + (this.data.nowindex + 1)+"首",
              })
              this.init()
            }
            }
          }
        })
      } else {
        // 猜错了
        wx.showToast({
          title: '答案错误',
          icon: 'none',
          image: "/image/err1.jpg",
          duration: 2000
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        // 判断是否显示引导页
        wx.getStorage({
          key: 'isShow',
          success:res =>{
             this.init(); 
          },
          fail:function(res){
            wx.redirectTo({
              url: '/pages/boot/boot',
            })
          }
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
      return{
        title:"紧急呼叫，我卡在第"+(this.data.nowindex+1)+"关",
        path:'/pages/paly/play'

      }
  }
})