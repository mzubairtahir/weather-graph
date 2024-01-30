

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message) {
        (async () => {
            try{
                const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
                const response = await chrome.tabs.sendMessage(tab.id, message);
                sendResponse({ ERROR: false, DATA: response })
            }
            catch(error){
                sendResponse({ERROR: true})
            }

        })();

    }

    return true;

});