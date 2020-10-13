import {reportModal} from "./reportModal.js";
import {fetchList} from "./fetchList.js";
import {objArrTOCSV} from "./objArrTOCSV.js";
import {objArrTOTable} from "./objArrTOTable.js";
import {findInAngularApp} from "./findInAngularApp.js";
import {toast} from "./toast.js";

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

if(!window.duplicateCharts) window.duplicateCharts = {};

async function getPatientByChart(patient){
    if(!patient.chartNumber){
        toast("Error!", "Chart number not set!");
    }
    if(window.duplicateCharts[`${patient.chartNumber}`]) {
        toast("Info: ", `Removing duplicate of #${patient.chartNumber}`, "info");
        return undefined;
    }
    else{
        console.log(`No duplicates found for Patient Chart Number ${patient.chartNumber}`);
        console.log("window.duplicateChart: ", window.duplicateChart);
    }
    var results = await fetchList(`patient/list.json`, {chartNumber: patient.chartNumber}, true, 10);
    if(results.length === 1){
        if(results[0].chartNumber === patient.chartNumber){
            Object.assign(patient, results[0]);
        }
        else{
            toast(`Error!`, `No patient found with chart number ${patient.chartNumber}`);
        }
    }
    else{
        results = results.filter(p => p.chartNumber === patient.chartNumber);
        if(results.length === 1) Object.assign(patient, results[0]);
        else if(results.length === 0) toast(`Error!`, `No patient found with chart number ${patient.chartNumber}`);
        else {
            Object.assign(patient, results[results.length - 1]);
            toast(`Error!`, `${results.length} duplicate records found for the chart number ${patient.chartNumber}. <br />The last one was used`);
            console.log("Current window.duplicateCharts: ", window.duplicateCharts);
            window.duplicateCharts[`${patient.chartNumber}`] = true;
        }
    }
    return patient;
}



async function getPatientByKey(patient){
    if(patient === undefined) return undefined;
    if(!patient.patientKey){
        console.warn("Dok32 Fixes- getPatientByKey: Error! patient key not set!");
    } 
    var results = await fetchList(`report/patient/list.json`, {patientKeys: patient.patientKey, reportName:"PATIENT_CONTACT_DETAILS_REPORT"}, true, 10);
    if(results.length === 1){
        Object.assign(patient, results[0]);
    }
    else if(results.length === 0) console.warn(`Dok32 Fixes- getPatientByKey: Error! No patient found with Patient Key: ${patient.patientKey}`);
    else {
        Object.assign(patient, results[results.length - 1]);
        toast(`Warning!`, `Multiple patients found with the Patient Key ${patient.patientKey}. \nThe last one was used`);
    }
    return patient;
}


/**
 * Function that takes an array of objects containing the chartNumber
 *   and assignes to each the patient's contact details.
 * 
 * @note: recordArr allows a maximum size of 10 records
 * 
 * @param {object[]} recordArr DB records containing the chartNumber prop
 * @returns {object[]} DB records after adding contact details to each
 */
/*
async function mergeWithPatientContactDetails(recordArr){
    recordArr.forEach((patient, index) => {
        var patientWithKey = await getPatientByChart(patient);
        if(patientWithKey.patientKey){
            patientWithKey = await getPatientByKey(patientWithKey);
        }
        recordArr[index] = patientWithKey;
    });
    return recordArr;
}*/


/**
 * Function that takes a an object containing the chartNumber of a patient 
 *   and assignes to it the patient's contact details.
 * @param {object} record DB record containing the chartNumber prop
 * @returns {object} The DB record after adding to it its contact details
 */

async function mergeWithPatientContactDetails(record){
    var patientWithKey = await getPatientByChart(record);
    if(patientWithKey.patientKey){
        patientWithKey = await getPatientByKey(patientWithKey);
    }
    if(patientWithKey === undefined)
        toast("Info: ", `Returning undefined at mergeWithPatientContactDetails line 107`, "info");
    return patientWithKey;
}

const reportsParams = {
    NewPatients : {
        api: "report/patient/new-list.json",
        limit: 100,
        mergeFunc: mergeWithPatientContactDetails
    },
    PatientsBirthday : {
        api: "report/patient/list.json",
        limit: 100,
        //additionalParams : {reportName : "PATIENTS_BIRTHDAY_REPORT"}
    },
    PatientContactDetails : {
        api: "report/patient/list.json",
        limit: 25,
        //additionalParams : {reportName : "PATIENT_CONTACT_DETAILS_REPORT"}
    },
    AppointmentDetailsList : {
        api: "report/appointment/list.json",
        limit: 100,
        //additionalParams : {reportName : "APPOINTMENT_DETAILS_REPORT"}
    }
}

function runReport(){
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
    var params = {};
    Object.assign(params, findInAngularApp("searchParams"));
    if(params.start !== undefined) delete params.start;
    if(params.limit !== undefined) delete params.limit;

    let reportP = reportsParams[reportHash];
    if(reportP === undefined ){
        toast("", "Sorry for inconvenience! This button is not yet compatible with this report.(<br /><br /> Kind regards,<br /> Meena", "info");
    }
    else {
        window.$("#reportModal").modal();
        fetchList(reportP.api, {...params, ...reportP.additionalParams}, true, reportP.limit, "report-progress", "report-progress-counter", reportP.mergeFunc)
            .then(res => {
                console.log(res);
                if(res.length){
                    downloadButton.removeAttribute("disabled");
                    let date = new Date();
                    downloadButton.setAttribute("download", `${PascalCaseToNorml(reportHash)} Report - ${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.csv`);
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
}

window.runReport = runReport;

function viewReportButton(){
    document.body.append(reportModal());
    console.log("Dok32 Fixes extension: Adding new report function button \"View Report\"");
    let exportButton = document.createElement("button");
    exportButton.className = "btn btn-dark btn-sm";
    exportButton.id = "view-report-button";
    exportButton.onclick = runReport;
    exportButton.innerText = "Run Report";
    return exportButton;
}


export {viewReportButton};