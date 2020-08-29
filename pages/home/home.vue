
<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="banner swiper-container">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" 
			:interval="interval" :duration="duration" indicator-color="rgba(255, 255, 255, .3)"
			indicator-active-color="#fff">
				<swiper-item v-for="item in banner" :key="item.id">
					<view class="advertise">
						<text class="name">{{item.name}}</text>
						<text class="slogn">{{item.slogn}}</text>
					</view>
					<image class="slide-image" :src="item.pic" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 几度好风景 -->
		<view class="sentence">
			<text class="symbol"></text>
			<text class="up">几度好风景</text>
			<!-- <text class="down">当还看今日。</text> -->
		</view>
		<!-- 类别 -->
		<view class="category">
			<view class="categoryItem" v-for="item in categoryList" :key="item.id">
				<image class="pic" :src="item.pic" />
				<text class="tilte">{{item.title}}</text>
			</view>
		</view>
		<!-- 几度好风景 -->
		<view class="sentence">
			<text class="symbol"></text>
			<text class="up">当还看今日</text>
		</view>
		<!-- 视频 -->
		<view class="media">
			<video id="myVideo" :src="src"
			                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
		</view>
		<!-- 文字变换 -->
		<view class='detailTopTextCon'>
			<label class='detailTopText detailTopText1 detailTopAnimate1'>{{showData.text1}}</label>
			<label class='detailTopText detailTopText2 detailTopAnimate2'>{{showData.text2}}</label>      
			 <label class='detailTopText detailTopText3 detailTopAnimate3'>{{showData.text3}}</label>
			 <label class='detailTopText detailTopText4 detailTopAnimate4'>{{showData.text4}}</label>
			 <label class='detailTopText detailTopText5 detailTopAnimate5'>{{showData.text5}}</label>
			 <label class='detailTopText detailTopText6 detailTopAnimate6'>{{showData.text6}}</label>      
			 <label class='detailTopText detailTopText7 detailTopAnimate7'>{{showData.text7}}</label> 
			 <label class='detailTopText detailTopText8 detailTopAnimate8'>{{showData.text8}}</label>     
		</view>
	</view>
</template>

<script>

	let	topText= ["山间", "人物", "河流", "大地", "填空", "树木", "生命", "心态"];
	
	export default {
		data() {
			return {
				banner: [
					  {
						name: "汽车易生活",
						slogn: "易生活 易优惠 易放心",
						pic: '/static/images/home/hong.png'
					  },
					  {
						name: "汽车易生活",
						slogn: "易生活 易优惠 易放心",
						pic: '/static/images/home/cheng.png'
					  },
					  {
						name: "汽车易生活",
						slogn: "易生活 易优惠 易放心",
						pic: '/static/images/home/haung.png'
				}],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				categoryList:[{
					title: '风景',
					pic: '/static/images/home/cheng.png'
				},{
					title: '人物',
					pic: '/static/images/home/haung.png'
				},{
					title: '动物',
					pic: '/static/images/home/hong.png'
				},{
					title: '建筑作品',
					pic: '/static/images/home/hong.png'
				},{
					title: '独家课程',
					pic: '/static/images/home/hong.png'
				},{
					title: '高端定制',
					pic: '/static/images/home/hong.png'
				},],
				
				src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				
				// start雷达图初始化数据
				allSpaceTime: 50,//线程执行间隔时间
				animateinterval: '',
				rangArr: [
					  {
						endText: '动物',
						texts: topText,
						beginTime: 500,
						spacetime: 10,
						stime: 500
					  }, {
						endText: '海洋',
						texts: topText,
						beginTime: 1000,
						spacetime: 10,
						stime: 1000
					  }, {
						endText: '生物',
						texts: topText,
						beginTime: 1200,
						spacetime: 10,
						stime: 1000
					  }, {
						endText: '微生物',
						texts: topText,
						beginTime: 1400,
						spacetime: 10,
						stime: 1000
					  }, {
						endText: '海藻',
						texts: topText,
						beginTime: 1800,
						spacetime: 10,
						stime: 1000
					  }, {
						endText: '食物',
						texts: topText,
						beginTime: 2000,
						spacetime: 10,
						stime: 1000
					  }, {
						endText: '生命的源泉',
						texts: topText,
						beginTime: 2200,
						spacetime: 10,
						stime: 1000
					  }, {
						endText: '澄澈的心灵',
						texts: topText,
						beginTime: 2400,
						spacetime: 10,
						stime: 1000
					  }
				],
				showData:{},
			}
		},
		created(){
			const that = this;
			topText = ["花草", "溪流", "日出", "建筑", "外拍", "近景", "远景", "人与自然"]
			that.randDomText();
			that.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			// 文字变幻
			randDomText(){
				 var that = this;
				for (var i = 0; i < that.rangArr.length; i++) {
				  var rang = that.rangArr[i];
				  rang['runTime'] = 0;   //累计运行时间
				  rang['isRun'] = false; //是否已经开始在执行了
				  rang['isStop'] = false;//是否已经执行完毕了
				};
				that.animateinterval = setInterval(function () {
				      var stop = true;
				      var showData = {};
				      for (var i = 0; i < that.rangArr.length; i++) {
				        var rangXX = that.rangArr[i];
				        if (!rangXX['isStop']) {
				          stop = false; //只要有一个没执行完就 就继续执行 
				          rangXX['runTime'] = rangXX['runTime'] + that.allSpaceTime; //累计执行时间开始叠加 
				          var changeWord = false; //是否修改词
				          if (!rangXX['isRun']) { //如果还没开始跑，判断下时间是否已经到开始跑的时间
				            if (rangXX['runTime'] >= rangXX['beginTime']) {//
				              rangXX['isRun'] = true;//到开始跑时间了
				            } else {
				              continue;
				            }
				          } else if (rangXX['runTime'] >= (rangXX['stime'] + rangXX['beginTime'])) {   //如果当前队列的已经执行完毕，则显示最后一次的数据         
				            rangXX['isStop'] = true;
				            if (rangXX['lastWord'] != rangXX['endText']) {
				              rangXX['lastWord'] = rangXX['endText'];
				              showData['text' + (i + 1)] = rangXX['endText'];//显示最后的词
				            }
				            continue;
				          }
				          var index = Math.floor((rangXX['runTime'] - rangXX['beginTime']) / rangXX['spacetime']) % rangXX['texts'].length;
				          var showWord = rangXX['texts'][index];
				          if (rangXX['lastWord'] != showWord) {
				            rangXX['lastWord'] = showWord;
				            showData['text' + (i + 1)] = showWord;
				          }
				
				        } else {
				          continue;
				        }
				      }
				
				      if (JSON.stringify(showData) != "{}") {
				        that.showData=showData;
				      }
				      if (stop) {
				        clearInterval(that.animateinterval);
				      }
				    }, that.allSpaceTime);

			}
		}
	}
</script>

<style>
	.banner{  
	    position: relative; 
	    clear: both;
	    width: 100%;
	}
	.banner .slide-image{
	    width: 100%;
	    height: 100%;
	    box-sizing: border-box;
	}
	.banner swiper{
		height: 300rpx;
	}
	.banner .advertise{
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 100%;
	  margin: 0 auto;
	  text-align: center;
	}
	.banner .advertise .name{
	  padding-top: 84rpx;
	  display: block;
	  color: #fff;
	  font-size: 56rpx;
	  font-weight:600;
	}
	.banner .advertise .slogn{
	  padding-top: 70rpx;
	  color: #fff;
	  font-size: 28rpx;
	  font-weight:400;
	}
	.sentence{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		margin: 20rpx 0;
		padding: 20rpx 32rpx;
		background-color: #fff;
	}
	.sentence .up{
		
		display: block;
	}
	.sentence .down{
		padding: 5% 0 0 23%;
	}
	.category{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		padding: 32rpx 0;
		background: #fff;
	}
	.categoryItem{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 33%;
		padding: 18rpx 0;
	}
	.categoryItem .pic{
		width: 128rpx;
		height: 128rpx;
		margin-bottom: 6rpx;
		border-radius: 50%;
		border: 4rpx solid #fff;
	}
	.media, #myVideo{
		width: 100%;
	}
	
	
	.detailTopTextCon{
		position: relative;
		width: 100%;
		height: 300rpx;
		padding: 40rpx;
		margin: 20rpx 0;
		background: #fff;
	}
	.detailTopText{
		color: black;
		position: absolute;
	}
	.detailTopText1{
		margin-left: 271rpx;
		margin-top: 72rpx;
		font-size: 84rpx;
		background: linear-gradient(to right, red, blue);
		-webkit-background-clip: text;
		color: transparent;
	}
	.detailTopText2{
		margin-left: 217rpx;
		font-size: 40rpx;
		background: linear-gradient(to left, red, yellow);
		-webkit-background-clip: text;
		color: transparent;
	}
	.detailTopText3{
		margin-left: 91rpx;
		margin-top: 60rpx;
		font-size: 29rpx;
		background: linear-gradient(to left, green, yellow);
		-webkit-background-clip: text;
		color: transparent;
	}
	.detailTopText4{
		margin-left: 432rpx;
		margin-top: 16rpx;
		font-size: 57rpx;
		background: linear-gradient(to left, purple, red);
		-webkit-background-clip: text;
		color: transparent;
	}
	.detailTopText5{
		margin-left: 126rpx;
		margin-top: 117rpx;
		font-size: 37rpx;
		background: linear-gradient(to left, '#FFC0CB', yellow);
		-webkit-background-clip: text;
		color: transparent;
	}
	.detailTopText6{
		margin-left: 459rpx;
		margin-top: 95rpx;
		font-size: 47rpx;
		background: linear-gradient(to left, grey, green);
		-webkit-background-clip: text;
		color: transparent;
	}
	.detailTopText7{
		margin-left: 82rpx;
		margin-top: 175rpx;
		font-size: 47rpx;
		background: linear-gradient(to left, orange, brown);
		-webkit-background-clip: text;
		color: transparent;
	}
	.detailTopText8{
		margin-left: 341rpx;
		margin-top: 177rpx;
		font-size: 43rpx;
		background: linear-gradient(to right, red, blue);
		-webkit-background-clip: text;
		color: transparent;
	}
</style>
