import { request} from '../utils/http.js';



module.exports = {
  // 登录
  login: (data) => {
    return request('/current', 'post', data)
  },

  maUserInfo: (data) => {
    return request('/api-aus/oauth/wxMaUserInfo/token', 'post', data, 
    {
      "Authorization": "Basic bWVtYmVyX21hOm1lbWJlcl9tYQ=="
    }
    )
  },

  // 微信登录
  maMobile: (data) => {
    return request('/api-aus/oauth/wxMaMobile/token', 'post', data,
    {
      "Authorization": "Basic bWVtYmVyX21hOm1lbWJlcl9tYQ=="
    }
    )
  },

  // 会员信息
  memberList: (data) => {
    return request('/api-member/wxMember/member/info', 'get', data,
    // {
    //   "Authorization": "Bearer " + wx.getStorageSync("token"),
    // }
    )
  },

  // home
  getList: (data) => {
    return request('/api-base/organizational/wx/list', 'get', data,{
      selfHandleErr: JSON.stringify(true),
    })
  },

  // 会员绑卡列表
  getCarBag: (data) => {
    return request('/api-member/member-bind-card/member-bind-list', 'get', data)
  },
  // 会员绑卡
  memberBindCard: (data) => {
    return request('/api-member/member-bind-card/bind/ring?mobilePhone=' + data.mobilePhone + 
    '&captcha=' + data.captcha + '&card1No=' + data.card1No, 'post',
    // return request('/api-member/member-bind-card/bind/card', 'post', data,
    {
      "Content-Type": "application/x-www-form-urlencoded",
    })
  },
  // 会员绑车环
  memberBindRing: (data) => {
    return request('/api-member/member-bind-card/bind/ring?mobilePhone=' + data.mobilePhone + 
    '&captcha=' + data.captcha + '&vehicleNo=' + data.vehicleNo + '&card2No=' + data.card2No, 'post',

    // return request('/api-member/member-bind-card/bind/ring', 'post', data,
    {
      "Content-Type": "application/x-www-form-urlencoded",
    })
  },

  // 解绑
  removeBind: (data) =>{
    return request('/api-member/member-bind-card/un-bind/', 'get', data)
  },

  // 单位主卡卡片
  companyCardList: (data) =>{
    return request('/api-member/member-bind-card/card/info', 'get', data)
  },

  // 查询车环详情
  carRingDetail: (data) => {
      return request('/api-member/member-bind-card/ring/info', 'get', data)
  },

  // 加油记录
  oilRecordList: (data) =>{
    return request('/api-trade/transactions/ring/', 'get', data
    // {
    //     "Content-Type": "application/x-www-form-urlencoded"
    // }
    )
  },



  // 验证码
  getVerify: (data) => {
    return request('/api-member/member-bind-card/captcha', 'get', data)
  },

  // 个人资料
  getPersonal: (data) => {
    return request('/api-member/wxMember/member/personal', 'get', data)
  },
  // 性别
  getSex: (data) => {
    return request('/api-member/wxMember/member/sex', 'post', data)
  },
  // 生日
  getBirthday: (data) => {
    return request('/api-member/wxMember/member/birthday', 'post', data)
  },
  // 免密
  switchPwd: (data) => {
    return request('/api-member/wxMember/member/password-switch', 'post', data)
  },
  // 设置密码
  setPwd: (data) => {
    return request('/api-member/wxMember/member/password', 'post', data)
  },


  // 车环系统单位主卡下的附属卡
  ringChildrenList: (data) => {
    return request('/api-member/member-bind-card/ring/children-list', 'get', data)
  },

  // 卡系统单位主卡下的附属卡
  cardChildrenList: (data) => {
    return request('/api-member/member-bind-card/card/children-list', 'get', data)
  },

  // 车环系统消费记录
  consumesRecordList: (data) =>{
      return request('/api-trade/consumes/records', 'get', data)
  },
  // 单位卡下车环系统卡片信息
  childrenRingInfo: (data) =>{
      return request('/api-member/member-bind-card/children/ring/info/', 'get', data)
  },

  // 卡系统附属卡加油记录
  consumeDetailed: (data) => {
      return request('/api-member/member-bind-card/card/consume-detailed', 'get', data)
  },
  // 卡系统附属卡片信息
  childrenCardInfo: (data) =>{
      return request('/api-member/member-bind-card/children/card/info/', 'get', data)
  },

};