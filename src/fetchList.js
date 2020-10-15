
var renameMap = {
    "gender_name" : "gender",
    "nationality_name" : "nationality",
    "clinic_name" : "clinic",
    "status_name" : "status",
    "formattedTime" : "time",
    "category_name" : "type",
    "patient_addressTO" : "state",
    "patient_documentPasswordNumber" : "patient_passport",
    "patient_documentNationalIdNumber" : "patient_NationalIdNumber",
    "patient_documentDriverLicenseNumber" : "patient_DriverLicenseNumber"
}

function renameFields(obj){
    let renameKeys = Object.keys(renameMap);
    renameKeys.forEach(key => {
        if(obj.hasOwnProperty(key)){
            obj[renameMap[key]] = obj[key];
            delete obj[key];
        }
    });
    return obj;
}

function flattenObject(obj){
    let keys = Object.keys(obj);
    keys.forEach(key => {
        if(typeof obj[key] === "object"){
            let objProp = {};
            Object.assign(objProp, obj[key]);
            delete obj[key];
            let subKeys = Object.keys(objProp);
            subKeys.forEach(subkey => {
                obj[`${key}_${subkey}`] = objProp[subkey];
            });
        }
    });
    return renameFields(obj);
}

function setProgressRatio(loaded, total, progressbarID, counterID){
    let completionRatio = Math.round(loaded / total * 100);
    let progressElement = document.getElementById(progressbarID);
    let counterElement = document.getElementById(counterID);
    if(typeof completionRatio !== 'number' || completionRatio === NaN || completionRatio === Infinity){
        progressElement.style.width = `${100}%`;
        progressElement.setAttribute("aria-valuenow", `${100}`);
        counterElement.innerText = `0/0 (Nothing matches search criteria)`;
        return false;
    }
    else{
        progressElement.style.width = `${completionRatio}%`;
        progressElement.setAttribute("aria-valuenow", `${completionRatio}`);
        counterElement.innerText = `${loaded}/${total}`;
    }
    if(loaded === total) return false;
    return true;
}

/**
 * A function that returns a parsed list of records from a specific server endpoint
 * 
 * @param {string} endpoint The address after 'webapi'. Example:  company/sms/template/list.json
 * @param {object} params parameters to be passed to the api.
 * @param {boolean} reccursion Whether to make mmany requests untill all records are loaded or load only the first page.
 * @param {number} limit Number of records fetched per request.
 * 
 * @return {object[] | false} Returns the list or false on failure.
 */
async function fetchList(endpoint, params, reccursion = false, limit = 100, progressbarID, counterID, mergeFunc){
    var start = 0;
    let queryString = "";
    for (var key in params) {
        if(params[key] !== undefined && params[key] !== null){
            if (queryString != "") queryString += "&";
            queryString += key + "=" + encodeURIComponent(params[key]);
        }
    }
    var list = [];
    while(reccursion){
        let resource = `/webApi/${endpoint}?${queryString}&start=${start}&limit=${limit}`;
        console.log(`Fetching:${resource}`);
        let response = await (await fetch(resource)).json();
        if(!response.status || !response.status === 'success'){
            console.log("Some error occured while trying to fetch the list from the API");
            console.log(response);
            return false;
        }
        let totalCount = response.data.totalCount;
        if(!response.data.list) break;
        if(typeof mergeFunc === "function"){
            var subprogress = 0;
            let results = await Promise.all(response.data.list.map(async p => {
                let r = await mergeFunc(p);
                subprogress += 1;
                setProgressRatio(list.length + subprogress, totalCount, progressbarID, counterID);
                return r;
            }));
            results.filter(r => r !== undefined);
            //console.log(results);
            list = list.concat(results.map(flattenObject));
        }
        else{
            if(response.data.list)
                list = list.concat(response.data.list.map(flattenObject));
        }
        if(totalCount !== undefined && progressbarID) {
            if(!setProgressRatio(list.length, totalCount, progressbarID, counterID)) break;
        }
        if(!response.data) {
            console.log("Error! Server response: ", response);
            break;
        }
        if(response.data.list && response.data.list.length < limit ) break;
        start = start + limit;
    }
    return list;
}

// Patient birthday
//await fetchList("report/patient/list.json", {month:6,reportName:"PATIENTS_BIRTHDAY_REPORT"}, true);

// Patient Contact details
//await fetchList("report/patient/list.json",{reportName:"PATIENT_CONTACT_DETAILS_REPORT"}, true);

// Appointment details
//await fetchList("report/appointment/list.json", {periodEnd:1602100799000,periodStart:1602014400000,reportName:"APPOINTMENT_DETAILS_REPORT"}, true)

export {fetchList};