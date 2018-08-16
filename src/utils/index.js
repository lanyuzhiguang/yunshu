const baseUrl = 'https://m.yaojunrong.com'
export const axios = {
  get (url, data) {
    return new Promise((resolve, reject) => {
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
        success: function (res) {
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
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
        success: function (res) {
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}

