import {sendSMSModal} from "./sendSMSModal.js";

function sendSMSButton(){
    document.body.append(sendSMSModal());
    eval(`<script>console.log(window); window.jq = $;</script>`);
    console.log("Dok32 Fixes extension: Adding new report function button \"Send SMS\"");
    let exportButton = document.createElement("button");
    exportButton.className = "btn btn-success btn-sm";
    exportButton.id = "send-SMS-button";
    exportButton.onclick = (function (){
        //$("#smsModal").modal();
        console.log(window);
    })
    exportButton.innerText = "Send SMS";
    return exportButton;
}

export {sendSMSButton};