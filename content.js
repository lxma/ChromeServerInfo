var popupElement = document.createElement('div');
popupElement.setAttribute('id', 'lxma-info-box');
popupElement.style.overflow = "auto";
popupElement.style.visibility = "hidden";
popupElement.style.display = "block";
popupElement.style.position = "fixed";
popupElement.style.top = "0px";
popupElement.style.left = "0px";
popupElement.style.padding = "2px 8px 3px 5px"; // top right bottom left
popupElement.style["z-index"] = "9999999";
popupElement.style["font-style"] = "normal";
popupElement.style["font-size"] = "90%";
popupElement.style["font-size-adjust"] = "None";
popupElement.style["font-family"] = "Arial";
popupElement.style["font-variant"] = "normal";
popupElement.style["font-weight"] = "normal";
popupElement.style["font-stretch"] = "normal";
popupElement.style["line-height"] = "normal";
popupElement.style.color = "#ffffff";
popupElement.style.background = "-webkit-gradient(linear, left top, left bottom, from(#2e88c4), to(#075698))";
popupElement.innerHTML = '<empty>';
document.body.appendChild(popupElement);

chrome.runtime.sendMessage({ message: "csi-init-tab" });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "csi-show-popup") {
        console.log("Making popup visible");
        popupElement.style.visibility = "visible";
    }
    if (request.message === "csi-hide-popup") {
        console.log("Hiding popup");
        popupElement.style.visibility = "hidden";
    }
    if (request.message === "csi-set-popup-content") {
        popupElement.innerHTML = request.innerHTML;
        if (request.background) {
            popupElement.style.background = request.background;
        }
    }
});