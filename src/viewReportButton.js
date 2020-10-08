import {reportModal} from "./reportModal.js";

function runReport(){
    var inps = [];
    document.querySelectorAll("[form-input-element]").forEach( inp =>{
        let itype = inp.getAttribute("form-input-type");
        let ikey = inp.getAttribute("form-input-key");
        let value = inp.value;
        if(itype === "date") value = new Date().getTime(value);

        inps.push({key: ikey, value: value, type: itype});
    });
    console.log(inps);
}

window.runReport = runReport;

function viewReportButton(){
    document.body.append(reportModal());
    console.log("Dok32 Fixes extension: Adding new report function button \"View Report\"");
    let exportButton = document.createElement("button");
    exportButton.className = "btn btn-success btn-sm";
    exportButton.id = "view-report-button";
    exportButton.setAttribute("onclick", `$("#reportModal").modal();`);
    exportButton.onclick = runReport;
    exportButton.innerText = "View Report";
    return exportButton;
}

export {viewReportButton};