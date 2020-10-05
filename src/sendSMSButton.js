import {sendSMSModal} from "./sendSMSModal.js";

function sendSMSButton(){

    console.log("Dok32 Fixes extension: Adding new report function button \"Send SMS\"");
    let exportButton = document.createElement("button");
    exportButton.className = "btn btn-success btn-sm";
    exportButton.id = "download-CSV-button";
    exportButton.onclick = (function () {
        document.body.append(sendSMSModal());
    });
    exportButton.innerText = "Send SMS";
    return exportButton;
}

export {sendSMSButton};