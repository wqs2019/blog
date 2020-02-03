// module.exports = {
//     runtimeCompiler: true,
//     publicPath: '/', // 设置打包文件相对路径
//     devServer: {
//       // open: process.platform === 'darwin',
//       host: 'localhost',
//       port: 80,
//       // open: true, //配置自动启动浏览器
//       proxy: {
//         '/api/getAvatar': {
//           target: 'http://hn216.api.yesapi.cn?app_key=462088D77D980094F8D23A89E4B00ECD&nickname=李冰&s=Ext.Avatar.Show/', //对应自己的接口
//           changeOrigin: true,
//           ws: true,
//           pathRewrite: {
//             '^/api': ''
//           }
//         }
//       }
//      },
//   }