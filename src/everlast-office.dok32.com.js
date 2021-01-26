import {addFunctionButtons} from "./addFunctionButtons.js";
//import {addPagination} from "./addPagination.js";

function editElementsOnce(query, editor, procedureName){
	elements = document.querySelectorAll(query);
	elements.forEach((e) => {
		if(!e.getAttribute(procedureName)){
			editor(e);
			e.setAttribute(procedureName, "true")
		}
	});
}

function everlastOfficeDok32Com(){ // This function scans the page periodically to make changes.
    if (!document.querySelector("[Meena-extension-loaded]")) {
		addFunctionButtons();
    }
	if (document.querySelector("[ng-click='getReport()']")){
	    //addPagination();
	}
	editElementsOnce("[ui-sref='app.series.item.post-operation-instruction']", (elem) => {
		elem.innerText = "Pre & Post Operation";
	}, "rename-post-operation-instructions-to-pre-and-post");
}

export {everlastOfficeDok32Com};