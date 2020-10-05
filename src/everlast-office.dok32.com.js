import {addDownloadCSV} from "./addDownloadCSV.js";
import {addPagination} from "./addPagination.js";

function pageScanner(){
    if (!document.querySelector("#download-CSV-button")) {
	    addDownloadCSV();
    }
	if (document.querySelector("[ng-click='getReport()']")){
	    //addPagination();
	}
}

export {pageScanner};