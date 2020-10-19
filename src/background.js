chrome.tabs.onUpdated.addListener(function (tabId, changeInfom tab) {
  if(changeInfom.status === 'complete' && tab.url.includes('http')) {
    chrome.tabs.excuteScript(tabId, { file: './inject_script.js' }, function() {
      chrome.tabs.excuteScript(tabId, { file: './foreground.bundle.js' }, function() {
        console.log('INJECTED AND EXCUTED');
      });
    });
  }
});
