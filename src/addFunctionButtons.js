import {downloadCSVButton} from "./downloadCSVButton.js";
import {sendSMSButton} from "./sendSMSButton.js";
import {viewReportButton} from "./viewReportButton.js";

function addFunctionButtons(){
	let greenButtons = document.querySelectorAll("button.btn-success");
	greenButtons.forEach((btn) => {
		if (btn.innerText.includes("XLS")) {
            btn.parentElement.append("  ");
            btn.parentElement.append(downloadCSVButton());
            btn.parentElement.append("  ");
            btn.parentElement.append(sendSMSButton());
            btn.parentElement.append("  ");
            btn.parentElement.append(viewReportButton());
            btn.parentElement.append("  ");
        }
    });
}

export {addFunctionButtons};