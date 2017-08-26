alert("Creating Panel");
chrome.devtools.panels.create("Server",
    "icon.png",
    "panel/panel.html",
    function(panel) {
        // code invoked on panel creation
        console.log("Panel created");
    }
);