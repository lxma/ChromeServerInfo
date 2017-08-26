/**
 * Created by d048927 on 2017-08-17.
 */
console.log("Hello, I'm your extension!")
console.log("References" + jQuery("a[href^='https']"));
console.log("Document: " + document);

// var script = document.createElement('script');
// script.id = "ajaxObserver";
// // script.appendChild(document.createTextNode("alert('Table' + sap.ui.getCore().byId('__table0').getMetadata().getName());"));
// script.src = chrome.extension.getURL("inject/ajaxObserver.js");
// (document.body || document.head || document.documentElement).appendChild(script);

// chrome.webRequest.onBeforeRequest.addListener(function(request_details){
//     alert("content: caught request");
//     console.log("Call to URL: " + request_details.url);
// });



chrome.runtime.onMessage.addListener(
    function (request) {
        if(request.message === "on-before-request") {
            console.log("Request to url: " + request.url);
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request) {
        if(request.message === "log-in-tab") {
            console.log(request.text);
        }
    }
);

// var popupElement = document.createElement('div');
// popupElement.setAttribute('class', 'selection_bubble');
// popupElement.setAttribute('style', 'visibility: visible;position: absolute;top: 100;left: 100;background:-webkit-gradient(linear, left top, left bottom, from(#2e88c4), to(#075698));');
// popupElement.innerHTML = 'Huhu';
// document.body.appendChild(popupElement);

var popupElement = document.createElement('div');
popupElement.setAttribute('id', 'lxma-info-box');
popupElement.style.overflow = "auto";
popupElement.style.visibility = "hidden";
popupElement.style.display = "block";
popupElement.style.position = "fixed";
// popupElement.style.bottom = "10px";
popupElement.style.top = "0px";
popupElement.style.left = "0px";
popupElement.style.padding = "2px 5px 2px 5px"; // top right bottom left
popupElement.style["z-index"] = "9999999";
popupElement.style.color = "#ffffff";
popupElement.style.background = "-webkit-gradient(linear, left top, left bottom, from(#2e88c4), to(#075698))";
// document.body.insertBefore(popupElement, document.body.firstChild);
// popupElement.setAttribute('style', 'overflow:auto;visibility: visible;position: absolute;top: 100;left: 100;background:-webkit-gradient(linear, left top, left bottom, from(#2e88c4), to(#075698));');
popupElement.innerHTML = 'Huhu';
document.body.appendChild(popupElement);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            popupElement.style.visibility = popupElement.style.visibility == "visible" ? "hidden" : "visible";
            // alert("Browser action clicked");
            // var script = document.createElement('script');
            // script.id = "tmpScript";
            // // script.appendChild(document.createTextNode("alert('Table' + sap.ui.getCore().byId('__table0').getMetadata().getName());"));
            // script.src = chrome.extension.getURL("inject/openChangeProjects.js");
            // (document.body || document.head || document.documentElement).appendChild(script);
            // better: chrome.tabs.executeScript(integer tabId, object details, function callback)

            // chrome.runtime.sendMessage({
            //    message:"do-ui5-stuff"
            // });
            // table = sap.ui.getCore().byId("__table0");
            // console.log("Table found " + table);
            // console.log("Table found " + table.getMetadata().getName());
            // firstRow = table.getRows()[0];
            // linkCell = firstRow.getCells()[2];
            // console.log("Link Cell found: " + linkCell.getMetadata().getName());
            // chrome.runtime.sendMessage({"message": "open_new_tab", "url": "https://www.google.de"});
        }
    }
);