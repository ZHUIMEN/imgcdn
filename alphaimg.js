/**
 * vFramePlayer
 *
 * https://github.com/vmllab-js/FramePlayer | Released under MIT license
 *
 * @author VML-LAB iorilp, RhineLiu
 * @since 2017-06-02
 * @version v1.0.0
 * @link http://vmllab.im20.com.cn
 */
!function(t,e){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e(t,!0):"function"==typeof define&&define.amd?define("vFramePlayer",[],function(){return e(t)}):t.vFramePlayer=e(t)}("undefined"!=typeof window?window:this,function(t,e){"use strict";var i=function(t){if(t){for(var e in this.dom=t.dom,this.startFrame=0,this.endFrame=t.imgArr.length-1,this.curFrame=0,this.prevFrame=0,this.fps=t.fps||25,this.useCanvas=!!t.useCanvas,this.loop=t.loop||0,this.yoyo=!!t.yoyo,this._imgObjArr=[],this._events={},this._isPng=!0,this._isPlay=!1,this._times=0,this._asc=!0,this._temp={},t.imgArr){var i=new Image;i.src=t.imgArr[e],this._imgObjArr.push(i)}this.init()}else console.log("请设置参数！")},r=function(t,e){t.complete?e():t.onload=function(){e()}};return i.prototype={init:function(){var t=this;if(this.dom.textContent="",t.useCanvas){var e=document.createElement("canvas");e.width=e.height=0,e.style.width=e.style.height="100%",this.ctx=e.getContext("2d"),this.dom.appendChild(e);r(this._imgObjArr[0],function(){t._isPng=/(\.png(\?|$))|(image\/png;base64)/.test(t._imgObjArr[0].src),t.width=e.width=t._imgObjArr[0].width,t.height=e.height=t._imgObjArr[0].height})}else{t.mc=document.createElement("div"),t.mc.setAttribute("class","mc"),t.mc.style.width=t.mc.style.height="100%",this.dom.appendChild(t.mc);for(var i=0;i<this._imgObjArr.length;i++)this._imgObjArr[i].style.opacity=0,this._imgObjArr[i].style.position="absolute",this._imgObjArr[i].style.width=this._imgObjArr[i].style.height="100%",this._imgObjArr[i].style.top=this._imgObjArr[i].style.left=0,t.mc.appendChild(this._imgObjArr[i])}},set:function(t,e){var i=this._temp;if(1===arguments.length&&"object"==typeof arguments[0])for(var r in arguments[0])this[r]=arguments[0][r];2===arguments.length&&(this[arguments[0]]=arguments[1]),"useCanvas"===t&&this.init(),"fps"===t&&this._isPlay&&(clearInterval(this._interval),this._process(i.onUpdate,i.onComplete)),"startFrame"===t&&(this._isPlay||(this.curFrame=this.startFrame))},get:function(t){return this[t]},play:function(t,e,i){if(!this._isPlay){var r,s,a=this,n=0;for(var h in arguments)switch(typeof arguments[h]){case"number":0==n?(a.set("startFrame",arguments[h]),n++):a.set("endFrame",arguments[h]);break;case"object":arguments[h].onComplete&&(r=arguments[h].onComplete),delete arguments[h].onComplete,arguments[h].onUpdate&&(s=arguments[h].onUpdate),delete arguments[h].onUpdate,a.set(arguments[h])}a._temp.onComplete=r,a._temp.onUpdate=s,a._asc=a.startFrame<a.endFrame,a._isPlay||this.trigger("play"),this._process(s,r)}},_process:function(t,e){var i=this;this._interval=setInterval(function(){i._imgObjArr[i.curFrame].complete&&(i.useCanvas?(i._isPng&&i.ctx.clearRect(0,0,i.width,i.height),i.ctx.drawImage(i._imgObjArr[i.curFrame],0,0,i.width,i.height)):(i.mc.childNodes[i.prevFrame].style.opacity=0,i.mc.childNodes[i.curFrame].style.opacity=1),i.prevFrame=i.curFrame,i.trigger("update",i.curFrame,i._times+1,i._asc),t&&t(i.curFrame,i._times+1,i._asc),i.curFrame!=i.endFrame&&i.curFrame!=i.startFrame||!i._isPlay||i._temp.repeat?(i._asc?i.curFrame++:i.curFrame--,i._isPlay=!0,i._temp.repeat=!1):i.loop&&(i._times+1<i.loop||-1==i.loop)?(i.yoyo?(i._asc?i.curFrame=Math.max(i.startFrame,i.endFrame)-1:i.curFrame=Math.min(i.startFrame,i.endFrame)+1,i._asc=!i._asc):(i._temp.repeat=!0,i._asc?i.curFrame=Math.min(i.startFrame,i.endFrame):i.curFrame=Math.max(i.startFrame,i.endFrame)),i._times++):(i.stop(),e&&e()))},1e3/this.fps)},goto:function(t){var e=this;this.curFrame=t;r(this._imgObjArr[this.curFrame],function(){e.useCanvas?(e._isPng&&e.ctx.clearRect(0,0,e.width,e.height),e.ctx.drawImage(e._imgObjArr[e.curFrame],0,0,e.width,e.height)):(e.mc.childNodes[e.prevFrame].style.opacity=0,e.mc.childNodes[e.curFrame].style.opacity=1),e.trigger("update",e.curFrame,e._times+1,e._asc)})},pause:function(){this._isPlay=!1,this.trigger("pause"),clearInterval(this._interval)},stop:function(){this._isPlay=!1,this.trigger("stop"),this.curFrame=this.startFrame,clearInterval(this._interval),this._times=0},on:function(t,e){t=t.split(" ");for(var i=0;i<t.length;++i)this._events[t[i]]||(this._events[t[i]]=[]),this._events[t[i]].unshift(e);return this},one:function(t,e){var i=function(){e(),this.off(t,i)};return this.on(t,i)},off:function(t,e){if(t){t=t.split(" ");for(var i=this._events,r=0;r<t.length;++r)if(i[t[r]])if(e)for(var s=i[t[r]].length-1;s>=0;--s)i[t[r]][s]==e&&i[t[r]].splice(s,1);else i[t[r]]=[]}else this._events={};return this},trigger:function(){var t=Array.prototype.shift.call(arguments);t=t.split(" ");for(var e=0;e<t.length;++e)if(this._events[t[e]])for(var i=this._events[t[e]].length-1;i>=0;--i)try{this._events[t[e]][i].apply(this,arguments)}catch(t){console.log(t)}return this},destroy:function(){clearInterval(this._interval),this.off()}},i});