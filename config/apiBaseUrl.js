// 获取当前帐号信息
// const accountInfo = wx.getAccountInfoSync();

// // env类型
// export const env = accountInfo.miniProgram.envVersion;

// if(!env){
//     console.error("获取运行环境失败!");
// }

// const baseApi = {
//     // 开发版
//     // develop: "http://192.168.0.210:7000",
//     develop: "http://192.168.0.126:7000",
//     // develop: "http://192.168.0.18:7000",
//     // 体验版
//     trial: "https://test.domain.cn",
//     // 正式版
//     release: "https://admin.domain.cn"
// };

// // request请求baseURL
// module.exports = {
//     API_BASE_URL: baseApi[env],
// }

let baseApi;
if (process.env.NODE_ENV === 'development') {
	baseApi="https://api.bmobcloud.com";
}
// uEnvProd
if (process.env.NODE_ENV === 'production') {
    baseApi="http://192.168.0.123:7000";
}

// request请求baseURL
module.exports = {
    API_BASE_URL: baseApi,
}