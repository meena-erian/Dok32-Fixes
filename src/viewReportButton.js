import {reportModal} from "./reportModal.js";
import {fetchList} from "./fetchList.js";

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
        limit: 100,
        additionalParams : {reportName : "PATIENT_CONTACT_DETAILS_REPORT"}
    },
    AppointmentDetailsList : {
        api: "report/appointment/list.json",
        limit: 100,
        additionalParams : {reportName : "APPOINTMENT_DETAILS_REPORT"}
    }
}

function runReport(){
    var inps = [];
    var reportModal = document.getElementById("reportModal");
    var reportHash = document.location.hash.split("/").pop().split("?")[0];
    document.querySelectorAll("[form-input-element]").forEach( inp =>{
        let itype = inp.getAttribute("form-input-type");
        let ikey = inp.getAttribute("form-input-key");
        let value = inp.value;
        if(itype === "date") value = new Date().getTime(value);

        inps.push({key: ikey, value: value, type: itype});
    });
    console.log(inps);
    let reportP = reportsParams[reportHash];
    fetchList(reportP.api, {...inps, ...reportP.additionalParams}, true, reportP.limit).then(res => console.log(res));
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