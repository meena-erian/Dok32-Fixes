import {reportModal} from "./reportModal.js";
import {fetchList} from "./fetchList.js";
import {objArrTOCSV} from "./objArrTOCSV.js";

const reportsParams = {
    NewPatients : {
        api: "report/patient/new-list.json",
        limit: 100
    },
    PatientsBirthday : {
        api: "report/patient/list.json",
        limit: 100,
        additionalParams : {reportName : "PATIENTS_BIRTHDAY_REPORT"}
    },
    /*PatientContactDetails : {
        api: "report/patient/list.json",
        limit: 100,
        additionalParams : {reportName : "PATIENT_CONTACT_DETAILS_REPORT"}
    },
    AppointmentDetailsList : {
        api: "report/appointment/list.json",
        limit: 100,
        additionalParams : {reportName : "APPOINTMENT_DETAILS_REPORT"}
    }*/
}

function runReport(){
    var downloadButton = document.getElementById("report-download-button");
    var progressLabel = document.getElementById("report-progress-label");
    var progressBar = document.getElementById("report-progress");
    var progressCounter = document.getElementById("report-progress-counter");
    progressBar.style.width = `${0}%`;
    progressBar.setAttribute("aria-valuenow", `${0}`);
    progressCounter.innerText = "";
    var inps = [];
    var reportModal = document.getElementById("reportModal");
    var reportHash = document.location.hash.split("/").pop().split("?")[0];
    downloadButton.setAttribute("disabled",  "true");
    progressLabel.innerText = "Loading...";
    document.querySelectorAll("[form-input-element]").forEach( inp =>{
        let itype = inp.getAttribute("form-input-type");
        let ikey = inp.getAttribute("form-input-key");
        let value = inp.value;
        if(itype === "date") value = new Date(value).getTime();

        inps.push({key: ikey, value: value, type: itype});
    });
    console.log(inps);
    let params = {};
    inps.forEach(inp => {
        params[inp.key] = inp.value;
    });
    let reportP = reportsParams[reportHash];
    if(reportP === undefined ){
        alert("Sorry for inconvenience! This button is not yet compatible with this report :(\n\nKind regards,\nMeena");
    }
    else
    fetchList(reportP.api, {...params, ...reportP.additionalParams}, true, reportP.limit, "report-progress", "report-progress-counter")
        .then(res => {
            console.log(res);
            if(res.length){
                downloadButton.removeAttribute("disabled");
                downloadButton.setAttribute("download", "report.csv");
                progressLabel.innerText = "Report Completed";

                function b64EncodeUnicode(str) {
                    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
                        return String.fromCharCode(parseInt(p1, 16))
                    }))
                }

                var CSVstr = objArrTOCSV(res);
                console.log(CSVstr);

                downloadButton.setAttribute("href", 
                `data:application/octet-stream;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(CSVstr)))}`);
            }
            else{
                progressLabel.innerText = "Report Completed. Nothing matches search criteria!";
            }
        });
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
    exportButton.innerText = "Run Report";
    return exportButton;
}


export {viewReportButton};