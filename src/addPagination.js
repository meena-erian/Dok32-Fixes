import {analyzeFormStructure} from "./analyzeFormStructure.js";
import {generateForm, insertFormStyle} from "./generateForm.js";

function addPagination(){
    var oldBtn = document.querySelector("[ng-click='getReport()']");
	//oldBtn.disabled = true;
	var form = oldBtn.parentElement;
	if(!form.getAttribute("data-analized")){
	    insertFormStyle();
	    console.log(analyzeFormStructure(form));
	    form.setAttribute("data-analized", true);
	    form.parentElement.parentElement.parentElement.prepend(
	        generateForm(analyzeFormStructure(form))
	    );
	}
}
export {addPagination}