// ==UserScript==
// @name         湖北自考成绩查询自动化查询工具
// @namespace    nbu2
// @version      0.0.1
// @description  湖北自考成绩查询自动化查询工具。
// @author       ningbuer
// @icon         http://www.hbea.edu.cn/Templets/202209/images/logo.png
// @match        http://119.36.213.60/zk/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(()=>{"use strict";class e{constructor(){let e=this;e._routerMap={},e.messageId=0,e.messageHandlers={},e._register()}_register(){let e=this;window.addEventListener("message",(t=>{"object"!=typeof t.data||!t.data.action&&"reply"!=t.data.messageType||e._router.bind(e)(t.data,t.source)}))}async _router(e,t){let a=this;await a.waitLoadSuccess(e.action);try{if("reply"==e.messageType){let t=a.messageHandlers[e.messageId];t&&t(e)}else{const s=a._routerMap[e.action],n={status:"success",code:"0000",messageType:"reply",messageId:e.messageId,data:null};if(s){const a=await s(e,t);0,a&&(a.code?(n.code=a.code,n.message=a.message,n.data=a.attachment||a.data):n.data=a)}a._sendMessage(t,n)}}catch(e){0;let s={status:"fail",code:"0001",messsage:e.message};a._sendMessage(t,s)}}_addRouter(e,t){this._routerMap[e]=t}_sendMessage(e,t,a){let s=this;try{let n=s.messageId++;t.messageId=n,a&&(s.messageHandlers[n]=a),e.postMessage(t,"*")}catch(e){console.error("_sendMessage::error::",e)}}async waitLoadSuccess(e){}_sleep(e){return new Promise((t=>{setTimeout(t,e)}))}}class t extends e{constructor(){super();this.manageWin=void 0}init(){let e=this;e._addRouter("SQ_connect",e.SQ_connect.bind(e)),e._addRouter("SQ_execute",e.SQ_execute.bind(e))}SQ_connect(e,t){let a=this;a.manageWin||(a.manageWin=t)}async SQ_execute(e,t){let a=this;if(e.command){let t=e.command.name,s=e.command.data;if("input_basic_data"==t)document.querySelector("#ksbh").value=s.admissionNo,document.querySelector("#zjhm").value=s.idcardNo;else{if("click&get_validCodeImg"==t){return document.querySelector("#valiCode").click(),await a._sleep(200),{checkCodeImg:a._imageToBase64(document.querySelector("#valiCode"))}}if("input_validCode"==t)document.querySelector("#yzm").value=s.checkCode;else if("clickQuery"==t)document.querySelector("#cx").click();else{if("get_slideImg"==t){return{mainImg:document.querySelector(".bg_img").toDataURL().split("base64,")[1],sildeImg:document.querySelector(".bg_slider").toDataURL().split("base64,")[1]}}if("move_silde"==t)a._moveSlide(s.distance);else{if("get_score_result"==t){let e;for(;e=document.querySelector("#msg").textContent,!(e.indexOf("loading")<0);)await a._sleep(200);if(e.indexOf("未找到符合条件的数据，请检查输入是否正确")>=0)return{code:"0002"};if(e.indexOf("验证码错误")>=0||e.indexOf("安全码")>=0)return{code:"0001"};let t=document.querySelector("#msg>div:nth-of-type(1)>div:nth-of-type(1)").textContent.replace("姓名：",""),n=document.querySelector("#msg>div:nth-of-type(1)>div:nth-of-type(2)").textContent.replace("准考证号：",""),o=[],i=document.querySelectorAll("table tbody tr");for(let e=0;e<i.length;e++){let a=i[e],r=a.querySelector("td:nth-of-type(1)").textContent,d=a.querySelector("td:nth-of-type(2)").textContent,c=a.querySelector("td:nth-of-type(3)").textContent;o.push({admissionNo:n,realName:t,idcardNo:s.idcardNo,courseCode:r,courseName:d,score:c})}return{code:"0000",data:o}}"reload_page"==t&&setTimeout((function(){window.location.reload()}),100)}}}}}start(){let e=this;window.location.href.endsWith("#qwert")||GM_registerMenuCommand("Dashboard",(function(t){e.manageWin=window.open("http://175.27.162.198:6789/assets/ScoreQuery2/index.html","",`width=${screen.availWidth},height=${screen.availHeight},left=0,top=0,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`,"_blank"),window.location.href=window.location.href}),"D")}async waitLoadSuccess(e){let t=this;for(;!t.manageWin;)await t._sleep(100)}_imageToBase64(e){var t=document.createElement("canvas");return t.width=e.width,t.height=e.height,t.getContext("2d").drawImage(e,0,0,e.width,e.height),t.toDataURL("image/png").split("base64,")[1]}_moveSlide(e){var t=document.createElement("script");t.type="text/javascript",t.text=`\nisMouseDown = true;\ninitial_x = $(".bg_slider").offset().left;\n$(".bg_slider").offset({\nleft: ${e} + initial_x\n});\noriginX = 20;\nhandleDragEnd({\nclientX: '25',\nscreenX: originX,\nscreenY: '248'\n});\n`,document.head.appendChild(t)}}(async()=>{let e=new t;await e.init(),e.start()})()})();
