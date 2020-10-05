import {addDownloadCSV} from "./addDownloadCSV.js";
//import {addPagination} from "./addPagination.js";
import {addSendSMS} from "./addSendSMS.js";

function everlastOfficeDok32Com(){ // This function scans the page periodically to make changes.
    if (!document.querySelector("#download-CSV-button")) {
		addDownloadCSV();
		addSendSMS();
    }
	if (document.querySelector("[ng-click='getReport()']")){
	    //addPagination();
	}
}

export {everlastOfficeDok32Com};