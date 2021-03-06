// ==UserScript==
// @name Flag Offtopic button
// @version 1.0
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Adds a self-navigating "Flag-offtopic" button to MSO
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://meta.stackoverflow.com/questions/*

// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
$('document').ready(function(){
window.offtopicReason="You've come to the wrong place for this post, maybe you meant to post it at [Stack Overflow](http://stackoverflow.com)? This place is for _discussing stuff about_ Stack Overflow.";
if($('.question .post-menu a[id^="flag-post"]').length>0){
window.qid=$('.question').attr('data-questionid');
$('<span class="lsep">|</span>').appendTo('.question .post-menu');
$('.question .post-menu a:last').clone().attr("id","flag-offtopic").attr("title","Comment and flag as offtopic").appendTo('.question .post-menu');
$('.question .post-menu a:last')[0].innerHTML="flag offtopic";
$('.question .post-menu a:last').on("click",function(event){
         $('.question .post-menu a[id^="flag-post"]')[0].click();
	 waitUntilExists("flag-load-close",function(){
		setTimeout(function(){
			$('#flag-load-close')[0].click();
			waitUntilExists('close-2',function(){
				setTimeout(function(){
					$('#close-2').attr('checked',true);
					$('#close-2')[0].click();

				},10);

			});

		},10);
	});

$('#question a.vote-down-off:not(.vote-down-on)').click();
	$('#comments-link-'+qid)[0].click();
	setTimeout(function(){
		$('#add-comment-'+qid).find('textarea')[0].value=offtopicReason;
		$('#add-comment-'+qid).find('textarea')[0].focus();
		setTimeout(function(){
			 $('#add-comment-'+qid).find('input[type=submit]')[0].click();
	
		},1000);
	},10);

});
}
});


window.waitUntilExists=function(wbid,wfn){
	if($("#"+wbid).length==0){
   		window.waitFunc=function(){waitUntilExists(wbid,wfn)};
		setTimeout(waitFunc,20);
	}else{
		wfn();
	}
}

});