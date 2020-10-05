import {addFunctionButtons} from "./addFunctionButtons.js";
//import {addPagination} from "./addPagination.js";

function everlastOfficeDok32Com(){ // This function scans the page periodically to make changes.
    if (!document.querySelector("#download-CSV-button")) {
		addFunctionButtons();
    }
	if (document.querySelector("[ng-click='getReport()']")){
	    //addPagination();
	}
}

export {everlastOfficeDok32Com};