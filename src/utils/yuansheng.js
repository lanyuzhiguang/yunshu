// login() {
//   wx.login({
//     success(res) {
//       console.log(res);
//       wx.request({
//         url: 'https://m.yaojunrong.com/login',
//         method: 'POST',
//         header: {
//           'Content-Type': 'application/json'
//         },
//         success(data) {
//           console.log(data);
//           console.log(data.header.Token);
//           wx.setStorageSync('token', data.header.Token)
//         }
//       })
//     }
//   })原生
// },
// getData() {
//   let token = wx.getStorageSync('token')
//   wx.request({
//     url: 'https://m.yaojunrong.com/readList',
//     method: 'GET',
//     header: {
//       'Content-Type': 'application/json',
//       token: token
//     },
//     success(data) {
//       console.log(data);
//     }
//
//   })原生
// }
