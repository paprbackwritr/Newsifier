/*! fancyBox v2.1.0 fancyapps.com | fancyapps.com/fancybox/#license */
(function(y,d,j,c){var e=j(y),g=j(d),r=j.fancybox=function(){r.open.apply(this,arguments)},l=null,h=d.createTouch!==c,t=function(b){return b&&b.hasOwnProperty&&b instanceof j},A=function(b){return b&&"string"===j.type(b)},a=function(b){return A(b)&&0<b.indexOf("%")},i=function(b,k){var f=parseInt(b,10);k&&a(b)&&(f*=r.getViewport()[k]/100);return Math.ceil(f)},w=function(k,f){return i(k,f)+"px"};j.extend(r,{version:"2.1.0",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!h,autoCenter:!h,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3000,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"'+(j.browser.msie?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{closeClick:!0,speedOut:200,showEarly:!0,css:{}},title:{type:"float"}},onCancel:j.noop,beforeLoad:j.noop,afterLoad:j.noop,beforeShow:j.noop,afterShow:j.noop,beforeChange:j.noop,beforeClose:j.noop,afterClose:j.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(b,f){if(b&&(j.isPlainObject(f)||(f={}),!1!==r.close(!0))){return j.isArray(b)||(b=t(b)?j(b).get():[b]),j.each(b,function(u,v){var o={},s,q,p,m,n;"object"===j.type(v)&&(v.nodeType&&(v=j(v)),t(v)?(o={href:v.attr("href"),title:v.attr("title"),isDom:!0,element:v},j.metadata&&j.extend(!0,o,v.metadata())):o=v);s=f.href||o.href||(A(v)?v:null);q=f.title!==c?f.title:o.title||"";m=(p=f.content||o.content)?"html":f.type||o.type;!m&&o.isDom&&(m=v.data("fancybox-type"),m||(m=(m=v.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));if(A(s)&&(m||(r.isImage(s)?m="image":r.isSWF(s)?m="swf":"#"===s.charAt(0)?m="inline":A(v)&&(m="html",p=v)),"ajax"===m)){n=s.split(/\s+/,2),s=n.shift(),n=n.shift()}p||("inline"===m?s?p=j(A(s)?s.replace(/.*(?=#[^\s]+$)/,""):s):o.isDom&&(p=v):"html"===m?p=s:!m&&(!s&&o.isDom)&&(m="inline",p=v));j.extend(o,{href:s,type:m,content:p,title:q,selector:n});b[u]=o}),r.opts=j.extend(!0,{},r.defaults,f),f.keys!==c&&(r.opts.keys=f.keys?j.extend({},r.defaults.keys,f.keys):!1),r.group=b,r._start(r.opts.index)}},cancel:function(){var b=r.coming;b&&!1!==r.trigger("onCancel")&&(r.hideLoading(),r.ajaxLoad&&r.ajaxLoad.abort(),r.ajaxLoad=null,r.imgPreload&&(r.imgPreload.onload=r.imgPreload.onerror=null),b.wrap&&b.wrap.stop(!0).trigger("onReset").remove(),r.current||r.trigger("afterClose"),r.coming=null)},close:function(b){r.cancel();!1!==r.trigger("beforeClose")&&(r.unbindEvents(),!r.isOpen||!0===b?(j(".fancybox-wrap").stop(!0).trigger("onReset").remove(),r._afterZoomOut()):(r.isOpen=r.isOpened=!1,r.isClosing=!0,j(".fancybox-item, .fancybox-nav").remove(),r.wrap.stop(!0,!0).removeClass("fancybox-opened"),"fixed"===r.wrap.css("position")&&r.wrap.css(r._getPosition(!0)),r.transitions[r.current.closeMethod]()))},play:function(b){var m=function(){clearTimeout(r.player.timer)},f=function(){m();r.current&&r.player.isActive&&(r.player.timer=setTimeout(r.next,r.current.playSpeed))},k=function(){m();j("body").unbind(".player");r.player.isActive=!1;r.trigger("onPlayEnd")};if(!0===b||!r.player.isActive&&!1!==b){if(r.current&&(r.current.loop||r.current.index<r.group.length-1)){r.player.isActive=!0,j("body").bind({"afterShow.player onUpdate.player":f,"onCancel.player beforeClose.player":k,"beforeLoad.player":m}),f(),r.trigger("onPlayStart")}}else{k()}},next:function(b){var f=r.current;f&&(A(b)||(b=f.direction.next),r.jumpto(f.index+1,b,"next"))},prev:function(b){var f=r.current;f&&(A(b)||(b=f.direction.prev),r.jumpto(f.index-1,b,"prev"))},jumpto:function(b,m,f){var k=r.current;if(k&&(b=i(b),r.direction=m||k.direction[b>=k.index?"next":"prev"],r.router=f||"jumpto",k.loop&&(0>b&&(b=k.group.length+b%k.group.length),b%=k.group.length),k.group[b]!==c)){r.cancel(),r._start(b)}},reposition:function(b,k){var f;r.isOpen&&(f=r._getPosition(k),b&&"scroll"===b.type?(delete f.position,r.wrap.stop(!0,!0).animate(f,200)):r.wrap.css(f))},update:function(b){var k=b&&b.type,f=!k||"orientationchange"===k;f&&(clearTimeout(l),l=null);if(r.isOpen&&!l){if(f||h){r.wrap.removeAttr("style").addClass("fancybox-tmp"),r.trigger("onUpdate")}l=setTimeout(function(){var m=r.current;if(m){r.wrap.removeClass("fancybox-tmp");k!=="scroll"&&r._setDimension();k==="scroll"&&m.canShrink||r.reposition(b);r.trigger("onUpdate");l=null}},h?500:f?20:300)}},toggle:function(b){r.isOpen&&(r.current.fitToView="boolean"===j.type(b)?b:!r.current.fitToView,r.update())},hideLoading:function(){g.unbind("keypress.fb");j("#fancybox-loading").remove()},showLoading:function(){var b,f;r.hideLoading();g.bind("keypress.fb",function(k){if(27===(k.which||k.keyCode)){k.preventDefault(),r.cancel()}});b=j('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body");r.defaults.fixed||(f=r.getViewport(),b.css({position:"absolute",top:0.5*f.h+f.y,left:0.5*f.w+f.x}))},getViewport:function(){var b=r.current?r.current.locked:!1,f={x:e.scrollLeft(),y:e.scrollTop()};b?(f.w=b[0].clientWidth,f.h=b[0].clientHeight):(f.w=h&&y.innerWidth?y.innerWidth:e.width(),f.h=h&&y.innerHeight?y.innerHeight:e.height());return f},unbindEvents:function(){r.wrap&&t(r.wrap)&&r.wrap.unbind(".fb");g.unbind(".fb");e.unbind(".fb")},bindEvents:function(){var b=r.current,f;b&&(e.bind("orientationchange.fb"+(h?"":" resize.fb")+(b.autoCenter&&!b.locked?" scroll.fb":""),r.update),(f=b.keys)&&g.bind("keydown.fb",function(m){var n=m.which||m.keyCode,k=m.target||m.srcElement;!m.ctrlKey&&(!m.altKey&&!m.shiftKey&&!m.metaKey&&(!k||!k.type&&!j(k).is("[contenteditable]")))&&j.each(f,function(p,o){if(1<b.group.length&&o[n]!==c){return r[p](o[n]),m.preventDefault(),!1}if(-1<j.inArray(n,o)){return r[p](),m.preventDefault(),!1}})}),j.fn.mousewheel&&b.mouseWheel&&r.wrap.bind("mousewheel.fb",function(q,p,k,o){for(var n=j(q.target||null),m=!1;n.length&&!m&&!n.is(".fancybox-skin")&&!n.is(".fancybox-wrap");){m=n[0]&&!(n[0].style.overflow&&"hidden"===n[0].style.overflow)&&(n[0].clientWidth&&n[0].scrollWidth>n[0].clientWidth||n[0].clientHeight&&n[0].scrollHeight>n[0].clientHeight),n=j(n).parent()}if(0!==p&&!m&&1<r.group.length&&!b.canShrink){if(0<o||0<k){r.prev(0<o?"down":"left")}else{if(0>o||0>k){r.next(0>o?"up":"right")}}q.preventDefault()}}))},trigger:function(b,m){var f,k=m||r.coming||r.current;if(k){j.isFunction(k[b])&&(f=k[b].apply(k,Array.prototype.slice.call(arguments,1)));if(!1===f){return !1}"onCancel"===b&&!r.isOpened&&(r.isActive=!1);k.helpers&&j.each(k.helpers,function(o,n){if(n&&r.helpers[o]&&j.isFunction(r.helpers[o][b])){r.helpers[o][b](n,k)}});j.event.trigger(b+".fb")}},isImage:function(b){return A(b)&&b.match(/\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$/i)},isSWF:function(b){return A(b)&&b.match(/\.(swf)((\?|#).*)?$/i)},_start:function(b){var m={},f,k,b=i(b);f=r.group[b]||null;if(!f){return !1}m=j.extend(!0,{},r.opts,f);f=m.margin;k=m.padding;"number"===j.type(f)&&(m.margin=[f,f,f,f]);"number"===j.type(k)&&(m.padding=[k,k,k,k]);m.modal&&j.extend(!0,m,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});m.autoSize&&(m.autoWidth=m.autoHeight=!0);"auto"===m.width&&(m.autoWidth=!0);"auto"===m.height&&(m.autoHeight=!0);m.group=r.group;m.index=b;r.coming=m;if(!1===r.trigger("beforeLoad")){r.coming=null}else{k=m.type;f=m.href;if(!k){return r.coming=null,r.current&&r.router&&"jumpto"!==r.router?(r.current.index=b,r[r.router](r.direction)):!1}r.isActive=!0;if("image"===k||"swf"===k){m.autoHeight=m.autoWidth=!1,m.scrolling="visible"}"image"===k&&(m.aspectRatio=!0);"iframe"===k&&h&&(m.scrolling="scroll");m.wrap=j(m.tpl.wrap).addClass("fancybox-"+(h?"mobile":"desktop")+" fancybox-type-"+k+" fancybox-tmp "+m.wrapCSS).appendTo(m.parent);j.extend(m,{skin:j(".fancybox-skin",m.wrap),outer:j(".fancybox-outer",m.wrap),inner:j(".fancybox-inner",m.wrap)});j.each(["Top","Right","Bottom","Left"],function(o,n){m.skin.css("padding"+n,w(m.padding[o]))});r.trigger("onReady");if("inline"===k||"html"===k){if(!m.content||!m.content.length){return r._error("content")}}else{if(!f){return r._error("href")}}"image"===k?r._loadImage():"ajax"===k?r._loadAjax():"iframe"===k?r._loadIframe():r._afterLoad()}},_error:function(b){j.extend(r.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:b,content:r.coming.tpl.error});r._afterLoad()},_loadImage:function(){var b=r.imgPreload=new Image;b.onload=function(){this.onload=this.onerror=null;r.coming.width=this.width;r.coming.height=this.height;r._afterLoad()};b.onerror=function(){this.onload=this.onerror=null;r._error("image")};b.src=r.coming.href;(b.complete===c||!b.complete)&&r.showLoading()},_loadAjax:function(){var b=r.coming;r.showLoading();r.ajaxLoad=j.ajax(j.extend({},b.ajax,{url:b.href,error:function(f,k){r.coming&&"abort"!==k?r._error("ajax",f):r.hideLoading()},success:function(k,f){"success"===f&&(b.content=k,r._afterLoad())}}))},_loadIframe:function(){var b=r.coming,f=j(b.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",h?"auto":b.iframe.scrolling).attr("src",b.href);j(b.wrap).bind("onReset",function(){try{j(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(k){}});b.iframe.preload&&(r.showLoading(),f.one("load",function(){j(this).data("ready",1);h||j(this).bind("load.fb",r.update);j(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();r._afterLoad()}));b.content=f.appendTo(b.inner);b.iframe.preload||r._afterLoad()},_preloadImages:function(){var b=r.group,p=r.current,n=b.length,o=p.preload?Math.min(p.preload,n-1):0,m,k;for(k=1;k<=o;k+=1){m=b[(p.index+k)%n],"image"===m.type&&m.href&&((new Image).src=m.href)}},_afterLoad:function(){var b=r.coming,p=r.current,n,o,f,m,k;r.hideLoading();if(b&&!1!==r.isActive){if(!1===r.trigger("afterLoad",b,p)){b.wrap.stop(!0).trigger("onReset").remove(),r.coming=null}else{p&&(r.trigger("beforeChange",p),p.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove(),"fixed"===p.wrap.css("position")&&p.wrap.css(r._getPosition(!0)));r.unbindEvents();n=b.content;o=b.type;f=b.scrolling;j.extend(r,{wrap:b.wrap,skin:b.skin,outer:b.outer,inner:b.inner,current:b,previous:p});m=b.href;switch(o){case"inline":case"ajax":case"html":b.selector?n=j("<div>").html(n).find(b.selector):t(n)&&(n.data("fancybox-placeholder")||n.data("fancybox-placeholder",j('<div class="fancybox-placeholder"></div>').insertAfter(n).hide()),n=n.show().detach(),b.wrap.bind("onReset",function(){j(this).find(n).length&&n.hide().replaceAll(n.data("fancybox-placeholder")).data("fancybox-placeholder",false)}));break;case"image":n=b.tpl.image.replace("{href}",m);break;case"swf":n='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+m+'"></param>',k="",j.each(b.swf,function(s,q){n=n+('<param name="'+s+'" value="'+q+'"></param>');k=k+(" "+s+'="'+q+'"')}),n+='<embed src="'+m+'" type="application/x-shockwave-flash" width="100%" height="100%"'+k+"></embed></object>"}(!t(n)||!n.parent().is(b.inner))&&b.inner.append(n);r.trigger("beforeShow");b.inner.css("overflow","yes"===f?"scroll":"no"===f?"hidden":f);r._setDimension();b.wrap.removeClass("fancybox-tmp");b.pos=j.extend({},b.dim,r._getPosition(!0));r.isOpen=!1;r.coming=null;r.bindEvents();if(r.isOpened){if(p.prevMethod){r.transitions[p.prevMethod]()}}else{j(".fancybox-wrap").not(b.wrap).stop(!0).trigger("onReset").remove()}r.transitions[r.isOpened?b.nextMethod:b.openMethod]();r._preloadImages()}}},_setDimension:function(){var ab=r.getViewport(),aa=0,Y=!1,Z=!1,Y=r.wrap,U=r.skin,X=r.inner,W=r.current,Z=W.width,V=W.height,T=W.minWidth,I=W.minHeight,S=W.maxWidth,R=W.maxHeight,K=W.scrolling,N=W.scrollOutside?W.scrollbarWidth:0,v=W.margin,Q=v[1]+v[3],P=v[0]+v[2],k,L,G,O,f,J,b,M,H;Y.add(U).add(X).width("auto").height("auto");v=U.outerWidth(!0)-U.width();k=U.outerHeight(!0)-U.height();L=Q+v;G=P+k;O=a(Z)?(ab.w-L)*i(Z)/100:Z;f=a(V)?(ab.h-G)*i(V)/100:V;if("iframe"===W.type){if(H=W.content,W.autoHeight&&1===H.data("ready")){try{H[0].contentWindow.document.location&&(X.width(O).height(9999),J=H.contents().find("body"),N&&J.css("overflow-x","hidden"),f=J.height())}catch(C){}}}else{if(W.autoWidth||W.autoHeight){X.addClass("fancybox-tmp"),W.autoWidth||X.width(O),W.autoHeight||X.height(f),W.autoWidth&&(O=X.width()),W.autoHeight&&(f=X.height()),X.removeClass("fancybox-tmp")}}Z=i(O);V=i(f);M=O/f;T=i(a(T)?i(T,"w")-L:T);S=i(a(S)?i(S,"w")-L:S);I=i(a(I)?i(I,"h")-G:I);R=i(a(R)?i(R,"h")-G:R);J=S;b=R;Q=ab.w-Q;P=ab.h-P;if(W.aspectRatio){if(Z>S&&(Z=S,V=Z/M),V>R&&(V=R,Z=V*M),Z<T&&(Z=T,V=Z/M),V<I){V=I,Z=V*M}}else{Z=Math.max(T,Math.min(Z,S)),V=Math.max(I,Math.min(V,R))}if(W.fitToView){if(S=Math.min(ab.w-L,S),R=Math.min(ab.h-G,R),X.width(i(Z)).height(i(V)),Y.width(i(Z+v)),ab=Y.width(),L=Y.height(),W.aspectRatio){for(;(ab>Q||L>P)&&(Z>T&&V>I)&&!(19<aa++);){V=Math.max(I,Math.min(R,V-10)),Z=V*M,Z<T&&(Z=T,V=Z/M),Z>S&&(Z=S,V=Z/M),X.width(i(Z)).height(i(V)),Y.width(i(Z+v)),ab=Y.width(),L=Y.height()}}else{Z=Math.max(T,Math.min(Z,Z-(ab-Q))),V=Math.max(I,Math.min(V,V-(L-P)))}}N&&("auto"===K&&V<f&&Z+v+N<Q)&&(Z+=N);X.width(i(Z)).height(i(V));Y.width(i(Z+v));ab=Y.width();L=Y.height();Y=(ab>Q||L>P)&&Z>T&&V>I;Z=W.aspectRatio?Z<J&&V<b&&Z<O&&V<f:(Z<J||V<b)&&(Z<O||V<f);j.extend(W,{dim:{width:w(ab),height:w(L)},origWidth:O,origHeight:f,canShrink:Y,canExpand:Z,wPadding:v,hPadding:k,wrapSpace:L-U.outerHeight(!0),skinSpace:U.height()-V});!H&&(W.autoHeight&&V>I&&V<R&&!Z)&&X.height("auto")},_getPosition:function(b){var p=r.current,n=r.getViewport(),o=p.margin,m=r.wrap.width()+o[1]+o[3],k=r.wrap.height()+o[0]+o[2],o={position:"absolute",top:o[0],left:o[3]};p.autoCenter&&p.fixed&&!b&&k<=n.h&&m<=n.w?o.position="fixed":p.locked||(o.top+=n.y,o.left+=n.x);o.top=w(Math.max(o.top,o.top+(n.h-k)*p.topRatio));o.left=w(Math.max(o.left,o.left+(n.w-m)*p.leftRatio));return o},_afterZoomIn:function(){var b=r.current;b&&((r.isOpen=r.isOpened=!0,r.wrap.addClass("fancybox-opened").css("overflow","visible"),r.reposition(),(b.closeClick||b.nextClick)&&r.inner.css("cursor","pointer").bind("click.fb",function(f){if(!j(f.target).is("a")&&!j(f.target).parent().is("a")){r[b.closeClick?"close":"next"]()}}),b.closeBtn&&j(b.tpl.closeBtn).appendTo(r.skin).bind("click.fb",r.close),b.arrows&&1<r.group.length&&((b.loop||0<b.index)&&j(b.tpl.prev).appendTo(r.outer).bind("click.fb",r.prev),(b.loop||b.index<r.group.length-1)&&j(b.tpl.next).appendTo(r.outer).bind("click.fb",r.next)),r.trigger("afterShow"),!b.loop&&b.index===b.group.length-1)?r.play(!1):r.opts.autoPlay&&!r.player.isActive&&(r.opts.autoPlay=!1,r.play()))},_afterZoomOut:function(){var b=r.current;j(".fancybox-wrap").stop(!0).trigger("onReset").remove();j.extend(r,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});r.trigger("afterClose",b)}});r.transitions={getOrigPosition:function(){var u=r.current,s=u.element,p=u.orig,q={},o=50,n=50,m=u.hPadding,k=u.wPadding,b=r.getViewport();!p&&(u.isDom&&s.is(":visible"))&&(p=s.find("img:first"),p.length||(p=s));t(p)?(q=p.offset(),p.is("img")&&(o=p.outerWidth(),n=p.outerHeight())):(q.top=b.y+(b.h-n)*u.topRatio,q.left=b.x+(b.w-o)*u.leftRatio);u.locked&&(q.top-=b.y,q.left-=b.x);return q={top:w(q.top-m*u.topRatio),left:w(q.left-k*u.leftRatio),width:w(o+k),height:w(n+m)}},step:function(b,q){var o,p,n=q.prop;p=r.current;var m=p.wrapSpace,k=p.skinSpace;if("width"===n||"height"===n){o=q.end===q.start?1:(b-q.start)/(q.end-q.start),r.isClosing&&(o=1-o),p="width"===n?p.wPadding:p.hPadding,p=b-p,r.skin[n](i("width"===n?p:p-m*o)),r.inner[n](i("width"===n?p:p-m*o-k*o))}},zoomIn:function(){var b=r.current,n=b.pos,k=b.openEffect,m="elastic"===k,f=j.extend({opacity:1},n);delete f.position;m?(n=this.getOrigPosition(),b.openOpacity&&(n.opacity=0.1)):"fade"===k&&(n.opacity=0.1);r.wrap.css(n).animate(f,{duration:"none"===k?0:b.openSpeed,easing:b.openEasing,step:m?this.step:null,complete:r._afterZoomIn})},zoomOut:function(){var b=r.current,m=b.closeEffect,f="elastic"===m,k={opacity:0.1};f&&(k=this.getOrigPosition(),b.closeOpacity&&(k.opacity=0.1));r.wrap.animate(k,{duration:"none"===m?0:b.closeSpeed,easing:b.closeEasing,step:f?this.step:null,complete:r._afterZoomOut})},changeIn:function(){var b=r.current,p=b.nextEffect,n=b.pos,o={opacity:1},m=r.direction,k;n.opacity=0.1;"elastic"===p&&(k="down"===m||"up"===m?"top":"left","down"===m||"right"===m?(n[k]=w(i(n[k])-200),o[k]="+=200px"):(n[k]=w(i(n[k])+200),o[k]="-=200px"));"none"===p?r._afterZoomIn():r.wrap.css(n).animate(o,{duration:b.nextSpeed,easing:b.nextEasing,complete:r._afterZoomIn})},changeOut:function(){var b=r.previous,m=b.prevEffect,f={opacity:0.1},k=r.direction;"elastic"===m&&(f["down"===k||"up"===k?"top":"left"]=("up"===k||"left"===k?"-":"+")+"=200px");b.wrap.animate(f,{duration:"none"===m?0:b.prevSpeed,easing:b.prevEasing,complete:function(){j(this).trigger("onReset").remove()}})}};r.helpers.overlay={overlay:null,update:function(){var k="100%",f;this.overlay.width(k).height("100%");j.browser.msie?(f=Math.max(d.documentElement.offsetWidth,d.body.offsetWidth),g.width()>f&&(k=g.width())):g.width()>e.width()&&(k=g.width());this.overlay.width(k).height(g.height())},onReady:function(k,f){j(".fancybox-overlay").stop(!0,!0);this.overlay||j.extend(this,{overlay:j('<div class="fancybox-overlay"></div>').appendTo(f.parent),margin:g.height()>e.height()||"scroll"===j("body").css("overflow-y")?j("body").css("margin-right"):!1,el:d.all&&!d.querySelector?j("html"):j("body")});f.fixed&&!h&&(this.overlay.addClass("fancybox-overlay-fixed"),f.autoCenter&&(this.overlay.append(f.wrap),f.locked=this.overlay));!0===k.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(b,k){var f=this.overlay.unbind(".fb").width("auto").height("auto").css(b.css);b.closeClick&&f.bind("click.fb",function(m){j(m.target).hasClass("fancybox-overlay")&&r.close()});k.fixed&&!h?k.locked&&(this.el.addClass("fancybox-lock"),!1!==this.margin&&j("body").css("margin-right",i(this.margin)+k.scrollbarWidth)):this.update();f.show()},onUpdate:function(k,f){(!f.fixed||h)&&this.update()},afterClose:function(b){var f=this,b=b.speedOut||0;f.overlay&&!r.isActive&&f.overlay.fadeOut(b||0,function(){j("body").css("margin-right",f.margin);f.el.removeClass("fancybox-lock");f.overlay.remove();f.overlay=null})}};r.helpers.title={beforeShow:function(b){var k=r.current.title,f=b.type;if(A(k)&&""!==j.trim(k)){k=j('<div class="fancybox-title fancybox-title-'+f+'-wrap">'+k+"</div>");switch(f){case"inside":f=r.skin;break;case"outside":f=r.wrap;break;case"over":f=r.inner;break;default:f=r.skin,k.appendTo("body").width(k.width()).wrapInner('<span class="child"></span>'),r.current.margin[2]+=Math.abs(i(k.css("margin-bottom")))}"top"===b.position?k.prependTo(f):k.appendTo(f)}}};j.fn.fancybox=function(b){var n,k=j(this),m=this.selector||"",f=function(u){var s=j(this).blur(),q=n,p,o;!u.ctrlKey&&(!u.altKey&&!u.shiftKey&&!u.metaKey)&&!s.is(".fancybox-wrap")&&(p=b.groupAttr||"data-fancybox-group",o=s.attr(p),o||(p="rel",o=s.get(0)[p]),o&&(""!==o&&"nofollow"!==o)&&(s=m.length?j(m):k,s=s.filter("["+p+'="'+o+'"]'),q=s.index(this)),b.index=q,!1!==r.open(s,b)&&u.preventDefault())},b=b||{};n=b.index||0;!m||!1===b.live?k.unbind("click.fb-start").bind("click.fb-start",f):g.undelegate(m,"click.fb-start").delegate(m+":not('.fancybox-item, .fancybox-nav')","click.fb-start",f);return this};g.ready(function(){j.scrollbarWidth===c&&(j.scrollbarWidth=function(){var n=j('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),m=n.children(),m=m.innerWidth()-m.height(99).innerWidth();n.remove();return m});if(j.support.fixedPosition===c){var b=j.support,k=j('<div style="position:fixed;top:20px;"></div>').appendTo("body"),f=20===k[0].offsetTop||15===k[0].offsetTop;k.remove();b.fixedPosition=f}j.extend(r.defaults,{scrollbarWidth:j.scrollbarWidth(),fixed:j.support.fixedPosition,parent:j("body")})})})(window,document,jQuery);