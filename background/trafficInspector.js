/**
 * Use Google's chrome.webRequest to inspect network traffic
 http://chrome-apps-doc2.appspot.com/trunk/extensions/webRequest.html
 * (see: https://developer.chrome.com/extensions/webRequest)
 *
 * Run in background
 */

// chrome.webRequest.onBeforeRequest.addListener(function (details) {
// -> cannot access request header
// }, {urls: ["<all_urls>"]}, ['requestBody', 'blocking']);

var requests = {};

logInTab = function (tabId, text) {
    chrome.tabs.sendMessage(tabId, {"message": "log-in-tab", text:text});
};

logForRequest = function (details, text) {
    // log in tab that belongs to given request
    if(!details.tabId || details.tabId < 0) {
        console.log("No TABID! Logging in background: " + text);
    } else {
        logInTab(details.tabId, text);
    }
};

// chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
// -> can access header, can block the request
// }, {urls: ["<all_urls>"]}, ['requestHeaders', 'blocking']);
chrome.webRequest.onSendHeaders.addListener(function (details) {
    // -> called asynchronously, cannot block request
    requests[details.requestId] = "Received";
    // console.log("Rq: " + JSON.stringify(details));
    // logForRequest(details, "Request (" + details.requestId + "): " + details.url);
    // for(var i = 0; i < details.requestHeaders.length; i++) {
    //     var header = details.requestHeaders[i];
    //     if(header.name.toLowerCase() === "cookie" && header.value.indexOf("session") >= 0) {
    //         logForRequest(details, "Used session cookie: " + header.value);
    //     }
    // }
    return {};
}, {urls: ["<all_urls>"]}, ['requestHeaders']);

chrome.webRequest.onCompleted.addListener(function (details) {
    for(var i = 0; i < details.responseHeaders.length; i++) {
        var header = details.responseHeaders[i];
        if(header.name.toLowerCase() === "set-cookie") {
            logForRequest(details, "Setting cookie: " + header.value);
            console.log("Setting cookie: " + header.value);
        }
    }
    // if(!requests[details.requestId]) {
    //     // does happen, but only in special situations (like computer is waking from sleep mode)
    //     // alert("No such request " + details.requestId);
    //     console.log("No request for Response (" + details.requestId + ")");
    // } else {
    //     // console.log("CResponse (" + details.requestId + "): ok; " + JSON.stringify(details));
    //     console.log("Response (" + details.requestId + "): ok; ");
    // }
}, {urls: ["<all_urls>"]}, ['responseHeaders']);
