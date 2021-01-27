import {addFunctionButtons} from "./addFunctionButtons.js";
import {addNewDocEditor} from "./addNewDocEditor.js";
//import {addPagination} from "./addPagination.js";

function editElementsOnce(query, editor, procedureName){
	var elements = document.querySelectorAll(query);
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
		elem.innerText = "Pre & Post Instruction";
	}, "rename-post-operation-instructions-to-pre-and-post");
	editElementsOnce("head", (head) => {
		var s = document.createElement("script");
		s.setAttribute('referrerpolicy', "origin");
		s.src = 'https://cdn.tiny.cloud/1/8h4nzko5ufwvmspidtxw8cmcao0wcmocv0s9w2y302dqvljs/tinymce/5/tinymce.min.js';
		head.append(s);
	},'editor-script-connected');
	if(window.tinymce.majorVersion === '5') // Don't replace with the new editor untill the library upgrade is complete
		editElementsOnce('#tinyMCEwrapper', addNewDocEditor, 'editor-replaced-by-new-one');
}

export {everlastOfficeDok32Com};