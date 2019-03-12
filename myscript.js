var errMsg = "不能输入空值";
$(function(){
	var lang = chrome.i18n.getUILanguage();
	console.log("Chrome UI language is" + lang);

	if(lang != "zh-CN" && lang != "zh-TW")
	{
		SetLabels();
	}

	var qrcodeFun = function(url) {
		console.log("Url:" + url);
		$("#qrcode").html("");
		//$("#url").html(url);
		jQuery('#qrcode').qrcode({
			width: 240,
			height: 240,
			text	: url
		});
		//$("#url").html(url)
	};
	var currTitle, currUrl;
	// chrome.tabs.getSelected(function(tabs) { //this should work, but don't know why disable it...
	//     currUrl = tabs.url; 
	// 	qrcodeFun(currUrl);
	// });
	chrome.tabs.query({
		active: true,
		currentWindow:true //only current window. avoid get the first chorme's active tab.
	}, function(tabs) {
		currUrl = tabs[0].url;
		qrcodeFun(currUrl);
	})

	var eleQrcodeBtn = $("#qrcodebtn");
	var eleHttpinput = $("#httpinput");
	eleQrcodeBtn.bind("click", function() {
		if (eleHttpinput.val() == "" || eleHttpinput.val() == errMsg) {
			eleHttpinput.addClass("error").val(errMsg);
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

	SetLabels = function ()
	{
		title.textContent= "Scan QR Code^_^";
		httpinput.placeholder = "Input content to generate QR Code";
		qrcodebtn.textContent = "Generate QR Code";
		errMsg = 'Please input something!';
	};