const baseUrl = 'https://m.yaojunrong.com'
export const fetch = {
  get (url, data,cb) {
    let token=wx.getStorageSync('token')
    let header={'content-type': 'application/json'}
    if(token){
      header.token=token
    }
    wx.request({
      url: baseUrl + url,
      method: 'GET',
      data,
      header,
      success (res){
        if(res.header.Token){
          wx.setStorageSync('token',res.header.Token)
        }
        cb(res.data)
      }
    })
  },
  post (url, data,cb) {
    let token=wx.getStorageSync('token')
    let header={'content-type': 'application/json'}
    if(token){
      header.token=token
    }
    wx.request({
      url: baseUrl + url,
      method: 'POST',
      data,
      header,
      success (res){
        if(res.header.Token){
          wx.setStorageSync('token',res.header.Token)
        }
        cb(res.data)
      }
    })
  },
}
export const login=function() {
  return new Promise(resolve=> {
    wx.login({
      success(res) {
        fetch.post('/login',
          {code:res.code,
            appid:	'wx5b602f51ecae95c0',
            secret:'43147787db4e3057dc5552098df8a1c7'
        },function(data) {

          console.log(data);
          resolve(data)
        })
      }
    })
  })
}
