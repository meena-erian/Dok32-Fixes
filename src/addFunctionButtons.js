//import {downloadCSVButton} from "./downloadCSVButton.js";
import {sendSMSButton} from "./sendSMSButton.js";
import {viewReportButton} from "./viewReportButton.js";
//import {bindForm} from "./bindForm.js";


function addFunctionButtons(){
	let greenButtons = document.querySelectorAll("button.btn-success");
    let defaultBttons = document.querySelectorAll("button.btn-default");
	greenButtons.forEach((btn) => {
		if (btn.innerText.includes("XLS")) {
            let form = btn.parentElement;
            form.setAttribute("Meena-extension-loaded", true);
            //console.log(bindForm(form));
            btn.parentElement.append("  ");
            //btn.parentElement.append(downloadCSVButton());
            //btn.parentElement.append("  ");
            //btn.parentElement.append(sendSMSButton());
            //btn.parentElement.append("  ");
            btn.parentElement.append(viewReportButton());
            btn.parentElement.append("  ");
        }
    });
    defaultBttons.forEach((btn) => {
        if (btn.innerText == 'Search' && btn.getAttribute('ng-click') == 'searchItems()'){
            let form = btn.parentElement;
            form.setAttribute("Meena-extension-loaded", true);
            btn.parentElement.append("  ");
            btn.parentElement.append(viewReportButton());
            btn.parentElement.append("  ");
        }
    });
}

export {addFunctionButtons};