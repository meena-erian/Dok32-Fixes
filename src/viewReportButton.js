
function runReport(){
    console.log("Running report");
}

window.runReport = runReport;

function viewReportButton(){
    //document.body.append(sendSMSModal());
    console.log("Dok32 Fixes extension: Adding new report function button \"View Report\"");
    let exportButton = document.createElement("button");
    exportButton.className = "btn btn-success btn-sm";
    exportButton.id = "view-report-button";
    exportButton.setAttribute("onclick", `$("#reportModal").modal(); window.runReport();`);
    exportButton.innerText = "View Report";
    return exportButton;
}

export {viewReportButton};