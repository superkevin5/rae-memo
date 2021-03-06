// app.js
App({
  onLaunch: function () {
      console.log('xxx')
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-4ggrpycl7d92f793',
        traceUser: true,

      });
    }

    this.globalData = {};
    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        config: {
            env: 'cloud1-4ggrpycl7d92f793'
        },
        data: {
            type: 'getOpenId'
        }
    }).then((resp) => {
        try {
            wx.setStorageSync('openId', resp.result.openid)
        } catch (e) { }

    }).catch((e) => {
       console.log(e)
    });




      wx.getUserInfo({
          success: function(res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
          }
      })

  }
});
