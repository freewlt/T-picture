// import api from '../config/apiBaseUrl.js';

const Bmob = require('./Bmob-1.6.1.min.js');

Bmob.initialize("f1015a720304468996c2babf5626e471", "e9a26cd617751d63c7856d11a7b58f5e");

// 消息提示框
function showToastTip(title, icon, image) {
  uni.showToast({
    title: title,
    icon: icon,
    image: image,
    mask: true,
    duration: 2000,
  })
}

// 弹窗
function showModalTip(title, content, callback) {
  uni.showModal({
    // title: title,
    content: title,
    confirmText: '是',
    cancelText: "否",
    success(res) {
      callback(res)
    }
  })
}


// 跳转授权页
function herfTo(){
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages/authorizedUserInfo/authorizedUserInfo',
    })
  }, 1000);
}

// token
function fillToken(config){

  if(!config){
    config = {};
  }

  let getToken = wx.getStorageSync("token");
  if(getToken){
    return Object.assign(config,{
      Authorization: "Bearer " + getToken,
    })
  } 
  return config;
}

// 封装请求
function request(url, method, data, config={}){
	
	let defaultConfig = {
	    selfHandleErr: JSON.stringify(false),
	    loading: JSON.stringify(true)
	};
  
	if(config){
		config = Object.assign(defaultConfig,config);
	}else{
		config = defaultConfig;
	}
	config = fillToken(config);
	
	if(JSON.parse(config.loading) ){
		uni.showLoading({
		  title: '加载中...',
		  mask: true,
		});
	}
	return new Promise(function (resolve, reject) {  
		uni.request({
			url: Bmob + url,
			method: method,
			data: data,
			header: config,
			success: (res) => {
				if (res.statusCode == 200 && res.data.result == "SUCCESS") {
					  resolve(res.data);
			
				} else if (res.data.errorCode == 5000) {
		
				  if(!JSON.parse(config.selfHandleErr)){
					showToastTip(res.data.errorMsg, 'none');
				  }
				  
				} else if(res.data.errorCode == 4001){
				  wx.removeStorageSync('userInfo');
				  wx.removeStorageSync('token');
				  herfTo()
				}else {
				  
				  if(!JSON.parse(config.selfHandleErr)){
					showToastTip(res.data.errorMsg, 'none');
				  }
				  
				  reject(res.data);
		
				}
			},
			fail: function (err) {
				if(!JSON.parse(config.selfHandleErr)){
				  showToastTip("请求失败", 'none', '/static/images/info.png');
				}
	
				reject(err)
			},
			complete: () => {
				console.log(url,"url")
				JSON.parse(config.loading) == true ? uni.hideLoading() : '';
				uni.stopPullDownRefresh();
			}
		});
	});
}

/**
 * Promise封装uni.login
 */
function login() {
  return new Promise(function (resolve, reject) {
    uni.login({
      success: function (res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function formatCardId(params){  
  const data = params.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/,  "$1 **** **** $2")
  return data;
}

module.exports = {
  request,
  showToastTip,
  showModalTip,
  login,
  formatCardId,
}