var appID=265731150208872;var offsetHeight;var scrollTop;var scrollHeight;var noOfSelectedFeedBoxes=0;var myId;var accessToken;$(function(){if(window.location.hash.length==0){var d="https://www.facebook.com/dialog/oauth?";var b=["client_id="+appID,"redirect_uri="+window.location,"response_type=token","scope=user_about_me,publish_stream,read_stream"];var c=b.join("&");var a=d+c;window.location=a}accessToken=window.location.hash.substring(1);if(accessToken.indexOf("access_token")!=-1){console.log("Setting accessToken: "+accessToken);localStorage.setItem("accessToken",accessToken)}if(null==accessToken||""==accessToken||accessToken.indexOf("access_token")==-1){console.log("getting accessToken from localStorage: "+localStorage.getItem("accessToken"));accessToken=localStorage.getItem("accessToken")}var d="https://graph.facebook.com/me?";var a=d+accessToken;$.ajax({url:a,async:false,type:"GET",dataType:"json",success:function(e){console.log("data.id: "+e.id);myId=e.id;$("#my_id").val(e.id);$("#app_content").show();showFeedReader("",e.id)},error:function(){console.log("error fetching basic user info")}});$("#feedObjects").bind("scroll",function(f){offsetHeight=$(this)[0].offsetHeight;scrollTop=$(this).scrollTop();scrollHeight=$(this)[0].scrollHeight;if(offsetHeight+scrollTop>=scrollHeight){showFeedReader($("#nextUrl").val(),myId)}});$("#audioBox").bind("play",function(){$(".feedObjectBox.selected").filter(":first").css("border-width","3px");var e=(($(".feedObjectBox.selected").filter(":first")[0].offsetTop)+5)-$(".feedObjectBox.selected").filter(":first").height();$("#feedObjects").animate({scrollTop:e},1000,function(){})});$("#audioBox").bind("ended",function(){$(".feedObjectBox.selected").filter(":first").css("border-width","1px");var e=$(".feedObjectBox.selected").filter(":first");e.find(".overlayImage").css("opacity","0.1");e.removeClass("selected");noOfSelectedFeedBoxes--;if(noOfSelectedFeedBoxes>0){$("#audioBox").attr("autoplay","autoplay")}updateAudioPlayerWithFirstAudioInSelection();$("#audioBox").load();if(noOfSelectedFeedBoxes==0){$("#audioBox").removeAttr("autoplay")}})});function setVerbalizerStyle(){var a=$("#verbalizer");a.css("background-color","#3B5998");a.css("text-align","center");a.css("height","300px");a.css("width","500px");a.css("margin-top","auto");a.css("margin-bottom","auto");a.css("margin-left","auto");a.css("margin-right","auto");a.css("padding","20px")}function showFeedReader(e,b){$.mobile.loading("show",{text:"Loading",textVisible:false,theme:"z",html:""});var a=e;if(a=="noMore"){return}if(null==a||undefined==a||""==a){accessToken=window.location.hash.substring(1);if(null==accessToken||""==accessToken||accessToken.indexOf("access_token")==-1){accessToken=localStorage.getItem("accessToken")}var d="https://graph.facebook.com/"+b+"/home?";var c=accessToken;a=d+c;firstFeeds=true}$.ajax({url:a,type:"GET",dataType:"json",success:function(f){populateFeedBoxes(f);$("#feedObjects").scrollTop(scrollHeight-5);if(!window.subsequentFeeds){$.mobile.changePage("#page-feeds",{transition:"fade"})}window.subsequentFeeds=1;var g;if(!f.paging){alert("No more feeds");g="noMore"}else{g=f.paging.next}$("#nextUrl").val(g);$.mobile.loading("hide")},error:function(){console.log("error in fetching feed data")}})}function populateFeedBoxes(c){for(var b=0;b<c.data.length;b++){var a=$("#feedObjectBoxTemplate").clone();a.attr("id","");switch(c.data[b].type){case"photo":case"link":case"status":case"video":case"question":case"checkin":a.find(".objectContent").html(createBox(c.data[b]).html());break;default:a.find(".objectContent").html(b+1+"-"+c.data[b].type+"@"+c.data[b].updated_time);break}a.addClass("feedObjectBox");a.css("display","block");$("#feedObjects").append(a)}$(".feedObjectBox").unbind("click").bind("click",function(){if($(this).hasClass("selected")){$(this).removeClass("selected");$(this).find(".overlayImage").css("opacity","0.0");noOfSelectedFeedBoxes--}else{$(this).addClass("selected");var d=$(this).height();$(this).find(".overlayImage").css("margin-top",(-1*d));$(this).find(".overlayImage").css("height",d);$(this).find(".overlayImage").css("opacity","0.4");noOfSelectedFeedBoxes++}updateAudioPlayerWithFirstAudioInSelection()})}function updateAudioPlayerWithFirstAudioInSelection(){var b=$(".feedObjectBox.selected").filter(":first");if(null==b||undefined==b||b.length==0){$("#audioBox").attr("src","");return}var c=b.find(".objectContent").text();var a="http://api.naturalreaders.com/v0/tts/?t="+c;$("#audioBox").attr("src",a)}function setCommonBoxData(e,d){d.find(".profilePic").attr("src","http://graph.facebook.com/"+e.from.id+"/picture");var a,f,c,b;if(null!=e.likes&&undefined!=e.likes){a=e.likes.count;if(null!=a&&undefined!=a&&"0"!=a){if(a=="1"){a="1 Like"}else{a=a+" Likes"}d.find(".likesSpan").text(a)}else{d.find(".likesSpan").remove()}}else{d.find(".likesSpan").remove()}if(null!=e.comments&&undefined!=e.comments){f=e.comments.count;if(null!=f&&undefined!=f&&"0"!=f){if(f=="1"){f="1 Comment"}else{f=f+" Comments"}d.find(".commentsSpan").text(f)}else{d.find(".commentsSpan").remove()}}else{d.find(".commentsSpan").remove()}c=$.timeago(e.created_time);d.find(".timeAgoSpan").text(c);if(null!=e.application&&undefined!=e.application){if(null!=e.application.namespace&&undefined!=e.application.namespace){d.find(".viaSpan").text("via "+e.application.name)}else{d.find(".viaSpan").remove()}}else{d.find(".viaSpan").remove()}}function createBox(b){var a=$(".boxTemplate").clone();if(null!=b.story&&undefined!=b.story){a.find(".storyP").text(b.story)}else{a.find(".storyP").text(b.from.name+" shared a "+b.type)}if(b.type=="checkin"){if(null!=b.caption&&undefined!=b.caption){a.find(".storyP").text(b.caption)}}if(null!=b.message&&undefined!=b.message){a.find(".messageP").text(b.message)}else{a.find(".messageP").remove()}if(b.type=="photo"){a.find(".sharedPic").attr("src",b.picture)}else{a.find(".sharedPic").remove()}setCommonBoxData(b,a);a.css("display","block");return a}function postToMyFeed(){console.log("#my_id val: "+$("#my_id").val());if(null==accessToken||""==accessToken||accessToken.indexOf("accessToken")===-1){accessToken=localStorage.getItem("accessToken")}var c=$("#speech_input").val();var d="https://graph.facebook.com/"+myId+"/feed?";var b=accessToken+"&message="+c;var a=d+b;console.log("url: "+a);console.log("myId: "+myId);$.ajax({url:a,type:"POST",dataType:"json",success:function(e){alert("post successful!");console.log(e)},error:function(){alert("error in posting")}})};