/*
chrome.webNavigation.onDOMContentLoaded.addListener(function (tab) {
	 for the current tab, inject the "inject.js" file & execute it
	console.log("Chrome Extension: tab: ", tab);
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
});
*/

/**
 * details = {
 * 	{string} requestId,
 *  {string} url,
 *  {string} method,
 *  {integer} frameId,
 *  {integer} parentFrameId,
 *  {integer} tabId,
 *  {ResourceType} type,
 *  {string} (optional) initiator,
 *  {double} timeStamp,
 *  {string} (optional) ip,
 *  {boolean} fromCache,
 *  {integer} statusCode,
 *  {HttpHeaders} (optional) responseHeaders,
 *  {string} statusLine
 * }
 
chrome.webRequest.onCompleted.addListener(
	function (details){
		console.log("weRequest: ", details);
	}
);
*/