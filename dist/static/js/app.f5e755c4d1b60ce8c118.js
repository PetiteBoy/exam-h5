webpackJsonp([1],{"/ovG":function(t,e){},"4Y8j":function(t,e){},"BH+H":function(t,e){},DEN3:function(t,e){t.exports={service:{host:"http://47.95.250.247/exam-api"}}},GnXo:function(t,e){},Hunq:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW");s("//Fk");function n(t){sessionStorage.removeItem(t)}var i={name:"App",methods:{logout:function(){n("authKey"),this.$router.push("/login")}}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=s("VU/8")(i,o,!1,function(t){s("Hunq")},null,null).exports,c=s("/ocq"),u=s("Zrlr"),d=s.n(u),l=s("wxAW"),v=s.n(l),m=s("mtWM"),p=s.n(m),h=s("DEN3"),g=s.n(h),f=new(function(){function t(){d()(this,t)}return v()(t,[{key:"login",value:function(t){return p()({url:g.a.service.host+"/user/login",method:"post",params:t})}},{key:"requestUrl",value:function(t){var e,s=""+g.a.service.host+t.url,a=t.method?t.method:"POST",n=t.data?t.data:"";return p()({url:s,method:a,data:n,headers:{authKey:(e="authKey",sessionStorage.getItem(e))}})}}]),t}()),_={name:"Login",data:function(){return{loginData:{username:"130185199003241111",password:"123"},passwordStatus:!1}},methods:{login:function(){var t=this;this.loginData.username&&this.loginData.password?f.login(this.loginData).then(function(e){var s,a;"0x0000"===e.data.status?(s="authKey",a=e.data.data.authKey,sessionStorage.setItem(s,a),t.$router.push("/home")):t.$message({showClose:!0,message:e.data.message,type:"warning"})}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})}):this.$message({showClose:!0,message:"请输入账号密码",type:"warning"})},passwordFouce:function(){this.passwordStatus=!0},passwordBlur:function(){this.passwordStatus=!1}}},w={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"login"}},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"login"},[s("div",{staticClass:"loginform"},[s("div",{staticClass:"title"},[t._v("满分审验教育考试系统")]),t._v(" "),s("div",{staticClass:"pad"},[s("div",{staticClass:"control-group"},[s("div",{staticClass:"controls"},[s("el-input",{attrs:{placeholder:"请输入账号",id:"username",autofocus:""},model:{value:t.loginData.username,callback:function(e){t.$set(t.loginData,"username",e)},expression:"loginData.username"}})],1)]),t._v(" "),s("div",{staticClass:"control-group"},[s("div",{staticClass:"controls"},[s("el-input",{attrs:{type:"password",placeholder:"请输入密码",id:"password"},on:{focus:function(e){t.passwordFouce()},blur:function(e){t.passwordBlur()}},model:{value:t.loginData.password,callback:function(e){t.$set(t.loginData,"password",e)},expression:"loginData.password"}})],1)]),t._v(" "),t._m(0)]),t._v(" "),s("div",{staticClass:"form-actions"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.login()}}},[t._v("登录")])],1)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control-group"},[e("div",{staticClass:"controls"},[e("div",{staticClass:"message"},[this._v("账号或密码错误")])])])}]};var y=s("VU/8")(_,w,!1,function(t){s("Xlic")},"data-v-7d3db5c4",null).exports,C={name:"Header",data:function(){return{userName:""}},mounted:function(){this.getUserInfo()},methods:{getUserInfo:function(){var t=this;f.requestUrl({url:"/user/info"}).then(function(e){var s=e.data;console.log(s),"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.userName=s.data.phone}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})},logout:function(){n("authKey"),this.$router.push("/login")}}},$={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("span",[t._v(t._s(t.userName))]),t._v(" "),s("span",{on:{click:function(e){t.logout()}}},[t._v("退出")])])},staticRenderFns:[]};var x=s("VU/8")(C,$,!1,function(t){s("BH+H")},"data-v-21cdbd80",null).exports,b={name:"Home",components:{Header:x},data:function(){return{notice:""}},mounted:function(){var t=this;f.requestUrl({url:"/notice/find/global",method:"get"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.notice=s.data}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})},methods:{navigation:function(t){this.$router.push(t)},logout:function(){n("authKey"),this.$parent.logout()}}},I={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("Header",{staticClass:"head"}),t._v(" "),s("div",{staticClass:"notice"},[s("div",[t._v(t._s(t.notice.title?t.notice.title:"公告"))]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.notice.content,expression:"notice.content"}],staticStyle:{resize:"none",width:"100%",height:"400px"},attrs:{disabled:""},domProps:{value:t.notice.content},on:{input:function(e){e.target.composing||t.$set(t.notice,"content",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"tools"},[s("el-button",{attrs:{span:8,type:"danger"}},[t._v("满分教育(敬请期待)")]),t._v(" "),s("el-button",{attrs:{type:"success"},on:{click:function(e){t.navigation("/Examine/Index")}}},[t._v("审验教育")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.navigation("/User/Admin")}}},[t._v("个人信息")])],1)],1)},staticRenderFns:[]};var k=s("VU/8")(b,I,!1,function(t){s("GnXo")},"data-v-e9a1a604",null).exports,T={name:"Admin",data:function(){return{userInfo:[{k:"手机号码",v:""},{k:"准驾车型",v:""},{k:"驾驶证号",v:""},{k:"驾驶证有效期",v:""},{k:"证件类型",v:""},{k:"证件号码",v:""},{k:"注册时间",v:""}]}},mounted:function(){var t=this;f.requestUrl({url:"/user/info"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.userInfo[0].v=s.data.phone,t.userInfo[1].v=s.data.licenseType,t.userInfo[2].v=s.data.licenseNo,t.userInfo[3].v=t.time(s.data.licenseBeginDate)+" 至 "+t.time(s.data.licenseEndDate),t.userInfo[4].v=s.data.idType,t.userInfo[5].v=s.data.idNo,t.userInfo[6].v=t.time(s.data.createTime)}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})},methods:{time:function(t){var e=new Date;return e.setTime(t),e.toLocaleDateString()}}},D={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"title"},[t._v("个人信息")]),t._v(" "),t._l(t.userInfo,function(e,a){return s("el-row",{key:a,attrs:{gutter:20}},[s("el-col",{attrs:{span:6}},[t._v(t._s(e.k))]),t._v(" "),s("el-col",{attrs:{span:18}},[t._v(t._s(e.v))])],1)})],2)},staticRenderFns:[]};var U=s("VU/8")(T,D,!1,function(t){s("/ovG")},"data-v-68a24bd7",null).exports,E={name:"Index",methods:{secondToDate:function(t){var e=Number(t),s=parseInt(e/3600)>=10?parseInt(e/3600):"0"+parseInt(e/3600),a=parseInt(e%3600/60)>=10?parseInt(e%3600/60):"0"+parseInt(e%3600/60),n=parseInt(e%60)>=10?parseInt(e%60):"0"+parseInt(e%60);return{date:s+":"+a+":"+n,hour:s,minute:a,second:n}},record:function(t){var e=this,s=t,a=s.videoId,n=parseInt(s.videoTm),i=s.isCompleted;f.requestUrl({url:"/video/record",data:{videoId:a,completedDuration:n,isCompleted:i}}).then(function(t){var s=t.data;"0x0000"!==s.status&&e.$message({showClose:!0,message:t.data.message,type:"warning"}),"0x5002"===s.status&&e.$parent.logout()}).catch(function(t){e.$message({showClose:!0,message:t,type:"warning"})})}}},q={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"index-container"},[e("router-view")],1)},staticRenderFns:[]};var N=s("VU/8")(E,q,!1,function(t){s("4Y8j")},"data-v-4b1c832c",null).exports,R={name:"Notice",data:function(){return{notice:""}},components:{Header:x},mounted:function(){var t=this;f.requestUrl({url:"/notice/find/checkvideo",method:"get"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.notice=s.data}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})},methods:{navigation:function(){this.$router.push("/Examine/Video/List")}}},A={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("Header",{staticClass:"head"}),t._v(" "),s("div",{attrs:{id:"body"}},[s("div",{staticClass:"notice"},[s("div",[t._v(t._s(t.notice.title?t.notice.title:"公告"))]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.notice.content,expression:"notice.content"}],staticStyle:{resize:"none",width:"100%",height:"400px"},attrs:{disabled:""},domProps:{value:t.notice.content},on:{input:function(e){e.target.composing||t.$set(t.notice,"content",e.target.value)}}})]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.navigation()}}},[t._v("开始学习")])],1)],1)},staticRenderFns:[]};var L=s("VU/8")(R,A,!1,function(t){s("u65Q")},"data-v-513a561b",null).exports,H=s("BO1k"),V=s.n(H),F={name:"VideoList",components:{Header:x},data:function(){return{tips:"需完成下列任务才可进行答题",buttonType:1,buttonContent:"进行试题测验",learnDuration:"",completeDuration:"",taskList:"",list:"",defaultListImg:""}},mounted:function(){var t=this;f.requestUrl({url:"/video/learn-info",method:"get"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.learnDuration=t.$parent.secondToDate(s.data.learnDuration).date,t.completeDuration=t.$parent.secondToDate(s.data.completeDuration).date}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})}),f.requestUrl({url:"/video/config/check/state",method:"get"}).then(function(e){var s=t;"0x0000"!==e.data.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===e.data.status&&t.$parent.logout();var a=e.data.data;a.map(function(t,e){t.learnNum?t.learnNum===t.completeNum?t.status=1:(t.status=0,s.buttonType=0):t.status=-1}),t.taskList=a}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})}),f.requestUrl({url:"/category/video/all",method:"get"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout();var a=!0,n=!1,i=void 0;try{for(var o,r=V()(s.data);!(a=(o=r.next()).done);a=!0){var c=o.value;for(var u in c.videos){var d=t.$parent.secondToDate(c.videos[u].duration);c.videos[u].date=d.date}}}catch(t){n=!0,i=t}finally{try{!a&&r.return&&r.return()}finally{if(n)throw i}}t.list=s.data}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})},methods:{showListTips:function(t){this.$nextTick(function(){this.$set(t,"active",!0)})},hideListTips:function(t){this.$set(t,"active",!1)},navigation:function(t){console.log(t),"examine"!==t?"forbid"!==t&&this.$router.push("Info?id="+t):this.$router.push("/Examine/Examine/Notice")}}},B={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("Header",{staticClass:"head"}),t._v(" "),s("div",{attrs:{id:"body"}},[s("div",{staticClass:"task"},[s("div",{staticClass:"taskHeader"},[s("div",[s("div",[t._v("学习要求")]),t._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.tips,placement:"right"}},[s("el-button",{attrs:{type:t.buttonType?"primary":"info"},on:{click:function(e){t.navigation(t.buttonType?"examine":"forbid")}}},[t._v(t._s(t.buttonContent)+"\n            ")])],1)],1),t._v(" "),s("div",[s("div",[t._v("今日至少学习"+t._s(t.learnDuration)+"，目前已经学习"+t._s(t.completeDuration))]),t._v(" "),s("div",[t._v("提示：请务必保证学习时长大于3小时，否则无法生成相应学习记录")])])]),t._v(" "),s("div",{staticClass:"taskList"},t._l(t.taskList,function(e){return s("el-row",{key:e.categoryId,attrs:{gutter:20}},[s("el-col",{attrs:{span:10}},[t._v(t._s(e.categoryName)+" "),s("span",{class:1===e.status?"success":0===e.status?"danger":"info"},[t._v("至少完整学习"+t._s(e.learnNum)+"个视频")])]),t._v(" "),s("el-col",{class:1===e.status?"success":0===e.status?"danger":"info",attrs:{span:3}},[t._v(t._s(1===e.status?"已完成":0===e.status?"未完成":"无要求")+"\n          ")])],1)}))]),t._v(" "),s("div",{staticClass:"list"},t._l(t.list,function(e){return s("div",{key:e.id},[s("div",{staticClass:"listTitle"},[t._v(t._s(e.name))]),t._v(" "),t._l(e.videos,function(a,n){return n%4==0?s("el-row",{key:a.id,staticClass:"listContent",attrs:{gutter:20}},t._l([0,1,2,3],function(a){return e.videos[a+n]?s("el-col",{key:a,attrs:{span:6}},[s("div",{staticClass:"listImg",style:e.videos[a+n].thumbUrl?"background: url("+e.videos[a+n].thumbUrl+") center no-repeat; background-size: cover;":"",on:{click:function(s){t.navigation(e.videos[a+n].id)}}}),t._v(" "),s("div",{staticClass:"listTips l ovh",staticStyle:{"background-color":"rgba(0, 0, 0, .3)"}},[s("div",{staticClass:"l"},[t._v(t._s(e.videos[a+n].date))]),t._v(" "),s("div",{staticClass:"r",style:e.videos[a+n].isCompleted?"background-color: #67C23A;":""},[t._v(t._s(e.videos[a+n].isCompleted?"已完成":"未完成"))])]),t._v(" "),s("el-row",{staticClass:"listTools",attrs:{gutter:10}},[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"listInfo"},[s("div",{staticClass:"name"},[t._v(t._s(e.videos[a+n].name))]),t._v(" "),s("div",{staticClass:"introduction",attrs:{title:e.videos[a+n].introduction}},[t._v(t._s(e.videos[a+n].introduction))])])])],1)],1):t._e()})):t._e()})],2)}))])],1)},staticRenderFns:[]};var S=s("VU/8")(F,B,!1,function(t){s("m2Uu")},"data-v-2b86bd2f",null).exports,M={name:"VideoInfo",data:function(){return{id:1,media:!0,currentTime:0,mediaVolume:70,mediaInfo:"",recordInterval:"",completeDuration:"",duration:""}},mounted:function(){this.getId(),this.webRtc(),this.record();var t=this,e=document.getElementById("videoInfo");e.currentTime=this.currentTime,this.completeDuration=this.$parent.secondToDate(e.currentTime).date,e.addEventListener("timeupdate",function(){t.completeDuration=t.$parent.secondToDate(e.currentTime).date}),e.addEventListener("ended",function(){t.$parent.record({videoId:t.id,videoTm:e.currentTime,isCompleted:!0}),t.$message({showClose:!1,message:"视频已看完，3秒后返回",type:"success"}),setTimeout(function(){window.history.back()},3e3)})},methods:{getId:function(){var t=this;this.id=this.$route.query.id,f.requestUrl({url:"/video/find-by-id?id="+this.$route.query.id,method:"get"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.mediaInfo=s.data,t.currentTime=s.data.completedDuration||0,t.duration=t.$parent.secondToDate(s.data.duration).date}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})},webRtc:function(){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia;var t=document.getElementById("video");navigator.getUserMedia({video:!0},function(e){t.src=window.URL.createObjectURL(e),t.play()},function(t){console.log(t.name||t)})},mediaTools:function(t){var e=document.getElementById("videoInfo");console.log(t),"tools"===t?(this.media?e.play():e.pause(),this.media=!this.media):"full"===t?e.webkitRequestFullScreen():e.volume=t/100,this.$parent.record({videoId:this.id,videoTm:e.currentTime,isCompleted:!1})},record:function(){var t=this,e=document.getElementById("videoInfo");this.recordInterval=setInterval(function(){t.$parent.record({videoId:t.id,videoTm:e.currentTime,isCompleted:!1})},6e5)}},beforeDestroy:function(){clearInterval(this.recordInterval)}},G={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{attrs:{id:"body"}},[s("video",{staticClass:"r",attrs:{id:"video"}}),t._v(" "),s("div",{staticClass:"title"},[t._v(t._s(t.mediaInfo.categoryName))]),t._v(" "),s("div",{staticClass:"content"},[s("div",[t._v("视频标题："+t._s(t.mediaInfo.name))]),t._v(" "),s("div",[t._v("视频描述："+t._s(t.mediaInfo.introduction))])]),t._v(" "),s("video",{attrs:{id:"videoInfo",src:t.mediaInfo.url,width:"100%",height:"640"},on:{click:function(e){t.mediaTools("tools")}}}),t._v(" "),s("el-button",{staticClass:"l",attrs:{type:"primary"},on:{click:function(e){t.mediaTools("tools")}}},[t._v(t._s(t.media?"播放":"暂停"))]),t._v(" "),s("div",{staticClass:"videoDate l"},[t._v(t._s(t.completeDuration)+" / "+t._s(t.duration))]),t._v(" "),s("el-button",{staticClass:"r",attrs:{type:"success"},on:{click:function(e){t.mediaTools("full")}}},[t._v("全屏")]),t._v(" "),s("div",{staticClass:"r ovh"},[s("div",{staticClass:"l"},[t._v("音量")]),t._v(" "),s("div",{staticClass:"block r"},[s("el-slider",{on:{change:t.mediaTools},model:{value:t.mediaVolume,callback:function(e){t.mediaVolume=e},expression:"mediaVolume"}})],1)])],1)])},staticRenderFns:[]};var W=s("VU/8")(M,G,!1,function(t){s("j2D2")},"data-v-703b1c6f",null).exports,j={name:"Notice",data:function(){return{notice:""}},components:{Header:x},mounted:function(){var t=this;f.requestUrl({url:"/notice/find/checkquestion",method:"get"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.notice=s.data}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})},methods:{navigation:function(){var t=this;f.requestUrl({url:"/question/init",method:"get"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.$router.push("Examine?totalNum="+s.data.totalNum+"&period="+s.data.period)}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})}}},O={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("Header",{staticClass:"head"}),t._v(" "),s("div",{attrs:{id:"body"}},[s("div",{staticClass:"notice"},[s("div",[t._v(t._s(t.notice.title?t.notice.title:"公告"))]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.notice.content,expression:"notice.content"}],staticStyle:{resize:"none",width:"100%",height:"400px"},attrs:{disabled:""},domProps:{value:t.notice.content},on:{input:function(e){e.target.composing||t.$set(t.notice,"content",e.target.value)}}})]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.navigation()}}},[t._v("开始测试")])],1)],1)},staticRenderFns:[]};var z=s("VU/8")(j,O,!1,function(t){s("jGqe")},"data-v-5c6f6516",null).exports,K={name:"Examine",data:function(){return{finish:!1,questionNum:0,total:100,time:"00:45:00",timestamp:"",timestampOld:"",img:"",question:"",optionsArr:"",radio:"",answer:1,explains:"",userAnswers:"",answerRight:0,answerWrong:0,countDownInterval:""}},mounted:function(){this.webRtc(),this.total=this.$route.query.totalNum,this.timestampOld=60*this.$route.query.period,this.timestamp=60*this.$route.query.period;var t=this;this.countDownInterval=setInterval(function(){t.timestamp--,t.time=t.$parent.secondToDate(t.timestamp).date,t.timestamp||t.record()},1e3),this.nextQuestion()},methods:{nextQuestion:function(){var t=this;""===this.userAnswers&&this.questionNum||(this.userAnswers="",this.finish=!1,this.questionNum++,f.requestUrl({url:"/question/next",method:"get"}).then(function(e){var s=e.data;"0x0000"!==s.status&&t.$message({showClose:!0,message:e.data.message,type:"warning"}),"0x5002"===s.status&&t.$parent.logout(),t.question=s.data.question,t.img=s.data.url;var a=[];s.data.item1&&a.push({k:"A",v:"A: "+s.data.item1}),s.data.item2&&a.push({k:"B",v:"B: "+s.data.item2}),s.data.item3&&a.push({k:"C",v:"C: "+s.data.item3}),s.data.item4&&a.push({k:"D",v:"D: "+s.data.item4}),t.optionsArr=a,t.answer=s.data.answer,t.explains=s.data.explains}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})}))},record:function(){var t=this,e=this.timestampOld-this.timestamp;clearInterval(this.countDownInterval),f.requestUrl({url:"/question/record",data:{correctNum:this.answerRight,wrongNum:this.answerWrong,costTime:e}}).then(function(s){var a=s.data;"0x0000"!==a.status&&t.$message({showClose:!0,message:s.data.message,type:"warning"}),"0x5002"===a.status&&t.$parent.logout(),e=t.$parent.secondToDate(e).date,t.$router.push("Result?correctNum="+t.answerRight+"&wrongNum="+t.answerWrong+"&costTime="+e)}).catch(function(e){t.$message({showClose:!0,message:e,type:"warning"})})},answers:function(t){this.finish=!0,this.userAnswers=t,this.userAnswers===this.answer?this.answerRight++:this.answerWrong++},webRtc:function(){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia;var t=document.getElementById("video");navigator.getUserMedia({video:!0},function(e){t.src=window.URL.createObjectURL(e),t.play()},function(t){console.log(t.name||t)})},bindCapture:function(){var t=document.getElementById("video"),e=t.videoWidth,s=t.videoHeight;if(e&&s){var a=document.getElementById("canvas");a.width=e,a.height=s,document.getElementById("capture").addEventListener("click",function(){console.log(t),a.getContext("2d").drawImage(t,0,0,e,s)},!1)}else setTimeout(this.bindCapture,200)}}},P={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{attrs:{id:"body"}},[s("video",{staticClass:"r",attrs:{id:"video"}}),t._v(" "),s("div",{staticClass:"title"},[t._v("第"+t._s(t.questionNum)+"题/共"+t._s(t.total)+"题 "),s("span",[t._v("倒计时 "+t._s(t.time))])]),t._v(" "),s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:24}},[t._v(t._s(t.question))])],1),t._v(" "),s("div",{staticClass:"options ovh"},[s("el-radio-group",{staticClass:"l",attrs:{span:t.img?18:24,disabled:t.finish},on:{change:t.answers},model:{value:t.userAnswers,callback:function(e){t.userAnswers=e},expression:"userAnswers"}},t._l(t.optionsArr,function(e){return s("el-radio",{key:e.k,staticClass:"radioItem",attrs:{label:e.k}},[t._v(t._s(e.v))])})),t._v(" "),t.img?s("img",{staticClass:"optionsImg",attrs:{src:t.img}}):t._e()],1),t._v(" "),t.finish?s("div",[s("div",{class:t.userAnswers===t.answer?"success":"danger"},[t._v("您的答案："+t._s(t.userAnswers))]),t._v(" "),s("div",{staticClass:"success"},[t._v(" 正确答案："+t._s(t.answer))]),t._v(" "),s("div",{staticClass:"answerContentTitle"},[t._v("题目详解:")]),t._v(" "),s("div",{staticClass:"answerContent"},[t._v(t._s(t.explains))])]):t._e(),t._v(" "),s("el-button",{attrs:{type:t.finish?"primary":"info"},on:{click:function(e){t.total>t.questionNum?t.nextQuestion():t.record()}}},[t._v(t._s(t.total>t.questionNum?"下一题":"完成"))])],1)])},staticRenderFns:[]};var Q=s("VU/8")(K,P,!1,function(t){s("fW9F")},"data-v-520851b2",null).exports,X={name:"Result",data:function(){return{list:[{k:"考试用时",v:"00:12:34"},{k:"答对",v:""},{k:"答错",v:""}]}},mounted:function(){this.list[0].v=this.$route.query.costTime,this.list[1].v=this.$route.query.correctNum+"题",this.list[2].v=this.$route.query.wrongNum+"题",window.addEventListener("popstate",function(){window.history.forward(1)},!1)},methods:{navback:function(){this.$parent.logout()}}},Y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{attrs:{id:"body"}},[s("div",{staticClass:"result"},[s("div",[t._v("考试结果")]),t._v(" "),t._l(t.list,function(e,a){return s("el-row",{key:a,attrs:{gutter:20}},[s("el-col",{attrs:{offset:9,span:3}},[t._v(t._s(e.k))]),t._v(" "),s("el-col",{attrs:{span:3}},[t._v(t._s(e.v))])],1)}),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.navback}},[t._v("交卷")])],2)])])},staticRenderFns:[]};var J=s("VU/8")(X,Y,!1,function(t){s("bsnT")},"data-v-2f17f7b2",null).exports;a.default.use(c.a);var Z=new c.a({routes:[{path:"/",component:y},{path:"/Login",component:y},{path:"/Home",component:k},{path:"/User/Admin",component:U},{path:"/Examine/Index",component:N,children:[{path:"/",component:L},{path:"/Examine/Video/List",component:S},{path:"/Examine/Video/Info",component:W},{path:"/Examine/Examine/Notice",component:z},{path:"/Examine/Examine/Examine",component:Q},{path:"/Examine/Examine/Result",component:J}]}]}),tt=s("zL8q"),et=s.n(tt);s("tvR6");a.default.use(et.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:Z,components:{App:r},template:"<App/>"})},Xlic:function(t,e){},bsnT:function(t,e){},fW9F:function(t,e){},j2D2:function(t,e){},jGqe:function(t,e){},m2Uu:function(t,e){},tvR6:function(t,e){},u65Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f5e755c4d1b60ce8c118.js.map