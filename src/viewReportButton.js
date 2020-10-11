import {reportModal} from "./reportModal.js";
import {fetchList} from "./fetchList.js";
import {objArrTOCSV} from "./objArrTOCSV.js";
import {objArrTOTable} from "./objArrTOTable.js";
import {findInAngularApp} from "./findInAngularApp.js";

/**
 * 
 * @param {string} str 
 */
function PascalCaseToNorml(str){
    return str 
    // insert a space before all caps
     .replace(/([a-z])([A-Z])/g, '$1 $2')
     // uppercase the first character
     //.replace(/^./, function(str){ return str.toUpperCase(); })
}



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
    PatientContactDetails : {
        api: "report/patient/list.json",
        limit: 25,
        additionalParams : {reportName : "PATIENT_CONTACT_DETAILS_REPORT"}
    },/*
    AppointmentDetailsList : {
        api: "report/appointment/list.json",
        limit: 100,
        additionalParams : {reportName : "APPOINTMENT_DETAILS_REPORT"}
    }*/
}

function runReport(){
    window.$("#reportModal").modal();
    var downloadButton = document.getElementById("report-download-button");
    var progressLabel = document.getElementById("report-progress-label");
    var progressBar = document.getElementById("report-progress");
    var progressCounter = document.getElementById("report-progress-counter");
    var tableResults = document.getElementById("report-results");
    progressBar.style.width = `${0}%`;
    progressBar.setAttribute("aria-valuenow", `${0}`);
    progressCounter.innerText = "";
    var inps = [];
    var reportModal = document.getElementById("reportModal");
    var reportHash = document.location.hash.split("/").pop().split("?")[0];
    downloadButton.setAttribute("disabled",  "true");
    progressLabel.innerText = "Loading...";
    tableResults.innerHTML = "";
    /*
    document.querySelectorAll("[form-input-element]").forEach( inp =>{
        let itype = inp.getAttribute("form-input-type");
        let ikey = inp.getAttribute("form-input-key");
        let value = inp.value;
        if(itype === "date") {
            let [day, month, year] = value.split("/");
            value = new Date(`${month}/${day}/${year}`).getTime();
        }
        inps.push({key: ikey, value: value, type: itype});
    });
    console.log("Form Analizer Data: ", inps);
    console.log("Angular hacker data: ", findInAngularApp("searchParams"));

    let params = {};
    inps.forEach(inp => {
        params[inp.key] = inp.value;
    });
    */
    let params = findInAngularApp("searchParams");
    if(params.start) delete params.start;
    if(params.limit) delete params.limit;

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
                downloadButton.setAttribute("download", `${PascalCaseToNorml(reportHash)} Report - on ${new Date().toDateString()}.csv`);
                progressLabel.innerText = "Report Completed";
                tableResults.append(objArrTOTable(res));
                var CSVstr = objArrTOCSV(res);
                console.log(CSVstr);

                downloadButton.setAttribute("href", 
                `data:application/octet-stream;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(CSVstr)))}`);
            }
            else{
                progressLabel.innerText = "Report Completed.";
            }
        });
}

window.runReport = runReport;

function viewReportButton(){
    document.body.append(reportModal());
    console.log("Dok32 Fixes extension: Adding new report function button \"View Report\"");
    let exportButton = document.createElement("button");
    exportButton.className = "btn btn-dark btn-sm";
    exportButton.id = "view-report-button";
    //exportButton.setAttribute("onclick", `$("#reportModal").modal();`);
    exportButton.onclick = runReport;
    exportButton.innerText = "Run Report";
    return exportButton;
}


export {viewReportButton};