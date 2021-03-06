import {sendSMSModal} from "./sendSMSModal.js";

function sendSMSButton(){
    document.body.append(sendSMSModal());
    console.log("Dok32 Fixes extension: Adding new report function button \"Send SMS\"");
    let exportButton = document.createElement("button");
    exportButton.className = "btn btn-dark btn-sm";
    exportButton.id = "send-SMS-button";
    exportButton.setAttribute("onclick", `$("#smsModal").modal();`);
    exportButton.innerText = "Send SMS";
    return exportButton;
}

export {sendSMSButton};