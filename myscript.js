$(function(){
	var qrcodeFun = function(url) {
		$("#qrcode").html("");
		jQuery('#qrcode').qrcode({
			width: 240,
			height: 240,
			text	: url
		});
		//$("#url").html(url)
	};
	var currTitle, currUrl;
	// chrome.tabs.getSelected(function(tabs) {
	//     currUrl = tabs.url; 
	// 	qrcodeFun(currUrl);
	// 	console.log(currUrl);
	// });
	chrome.tabs.query({
		active: true
	}, function(tabs) {
		currUrl = tabs[0].url; 
		qrcodeFun(currUrl);
		console.log(currUrl);
	})
	var eleQrcodeBtn = $("#qrcodebtn");
	var eleHttpinput = $("#httpinput");
	eleQrcodeBtn.bind("click", function() {
		if (eleHttpinput.val() == "" || eleHttpinput.val() == "不能输入空值") {
			eleHttpinput.addClass("error").val("不能输入空值");
			setTimeout(function() {
				eleHttpinput.removeClass("error").val("");
			}, 3000);
		} else {
			qrcodeFun(eleHttpinput.val());
		}
	});
	eleHttpinput.bind("focus", function() {
		eleHttpinput.removeClass("error").val("");
	})
})