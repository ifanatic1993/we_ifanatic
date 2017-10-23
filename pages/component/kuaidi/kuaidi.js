Page({
  data: {
    items: [
      { name: 'shentong', value: '申通' },
      { name: 'ems', value: 'EMS', checked: 'true' },
      { name: 'shunfeng', value: '顺丰' },
      { name: 'yuantong', value: '圆通' },
      { name: 'zhongtong', value: '中通' },
      { name: 'yunda', value: '韵达' },
      { name: 'tiantian', value: '天天' },
      { name: '”huitongkuaidi', value: '汇通' },
      { name: 'quanfengkuaidi', value: '全峰' },
      { name: 'debangwuliu', value: '德邦' },
      { name: 'zhaijisong', value: '宅急送' },
    ],
    data_items:'',
    kuaidi_value:"",
    focus: false,
    kuaidi_data:""
  },
  radioChange: function (e) {
    console.log(e.detail.value )
    this.setData({
      kuaidi_value: e.detail.value
    })
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
   
  kuaidiInput:function(e){
    // console.log(e.detail.value)
    this.setData({
      kuaidi_data: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    console.log(e.detail.value)
    var value = e.detail.value
    console.log(value);
    var pos = e.detail.cursor
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos)
      //计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }
  },
  find:function(){
    var self = this
    // console.log(self.kuaidi_value)
    wx.request({
      url:'https://www.kuaidi100.com/query',
      data: {
        'type': self.data.kuaidi_value,
        'postid': self.data.kuaidi_data
         },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        // console.log(res);
        self.setData({
          data_items : res.data.data
        })
      }

    })
  }

})