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
async function fetchList(endpoint, params, reccursion = false, limit = 100, progressbarID){
    var start = 0;
    let queryString = "";
    for (var key in params) {
        if (queryString != "") queryString += "&";
        queryString += key + "=" + encodeURIComponent(params[key]);
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
        list = list.concat(response.data.list);
        let totalCount = response.data.totalCount;
        if(totalCount) {
            let completionRatio = list.length / totalCount * 100;
            console.log(completionRatio);
            if(list.length === totalCount) break;
        }
        if(response.data.list.length < limit ) break;
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