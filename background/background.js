// background.js
var popupIsVisible = true; // default: popup visible

var togglePopupVisibilty = function () {
    popupIsVisible = !popupIsVisible;
    var request = {
        message: popupIsVisible ? "csi-show-popup" : "csi-hide-popup"
    };
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, request);
        }
    });
};

var popupBackgrounds = {
    default: "-webkit-gradient(linear, left top, left bottom, from(#2288dd), to(#113399))",
    warn: "-webkit-gradient(linear, left top, left bottom, from(#cc8822), to(#996611))"
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    togglePopupVisibilty();
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // if (request.message === "csi-request-show-popup-request") {
    if (request.message === "csi-init-tab") {
        var urlDetails = /http(s?):\/\/([^\/]*)/.exec(sender.tab.url);
        var popupContent    = null;
        var popupBackground = popupBackgrounds.default;
        if(urlDetails) {
            var https_used = urlDetails[1] === "s";
            if(!https_used) {
                popupBackground = popupBackgrounds.warn;
            }
            var hostname = urlDetails[2];
            popupContent = hostname;
        } else {
            popupContent = "no http: URL = " + sender.tab.url;
        }
        chrome.tabs.sendMessage(sender.tab.id, {
            message: "csi-set-popup-content",
            innerHTML: popupContent,
            background: popupBackground
        });
        if (popupIsVisible) {
            chrome.tabs.sendMessage(sender.tab.id, {
                message: "csi-show-popup"
            });
            console.log("Tab: " + JSON.stringify(sender.tab));
        }
    }
});