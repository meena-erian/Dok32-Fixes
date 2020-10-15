function validEmail(email){
    email = email.toUpperCase();
    if(email.includes("@NONE.COM")) return false;
    if(email.includes("@NON.COM")) return false;
    let id = email.split("@")[0];
    let host = id.split("@")[1];
    if(host === "GMAIL.COM" && id.length < 7) return false;
    let sections = id.split(".");
    for(let i=0 ; i< sections.length; i++){
        if(!sections[i].length) return false;
        if(sections[i] === "NONE" || sections[i] === "NON" || sections[i] === "EMAIL") return false;
    }
    return true;
}

/**
 * 
 * @param {string} str 
 */
function camelCaseToNorml(str){
    return str 
    // insert a space before all caps
     .replace(/([A-Z])/g, ' $1')
     // uppercase the first character
     .replace(/^./, function(str){ return str.toUpperCase(); })
}

/**
 * Retives a list of all possible keys in JSON array
 * 
 * @param {object} objArr An array of objects with similar or mutual properties
 * 
 * @returns {object} An array of all possible keys
 */
function getObjArrTableHeader(objArr){
    var merge = {};
    objArr.forEach(element => {
        Object.assign(merge, element);
    });
    //Remove needless fields
    delete merge.hidden;
    delete merge.clinic;
    delete merge.clinic_id;
    //delete merge.category_name;
    delete merge.category_id;
    delete merge.dentalPoint_code;
    delete merge.dentalPoint_id;
    delete merge.dentalPoint_description;
    delete merge.dentist_id;
    delete merge.gender_id;
    delete merge.gender_code;
    delete merge.machine_description;
    delete merge.machine_id;
    delete merge.nationality_id;
    delete merge.status_id;
    delete merge.id;
    //delete merge.createdDate;
    delete merge.companyPatientId;
    delete merge.patientKey;
    delete merge.patient_patientKey;
    delete merge.patient_companyPatientId;
    delete merge.appStatus;
    delete merge.appUsername;
    //delete merge.duration;
    return Object.keys(merge);
}

/**
 * 
 * @param {any} val 
 */
function escapeDataValue(val, key){
    switch(typeof val){
        case "number":
            if(typeof key === "string"){
                if (key.toUpperCase().includes("DATE") || key === "startTime" || key === "checkedIn")
                    return moment(val).format("DD/MM/YYYY");
                if (key === "duration") return val / 60000;
            }
            return val.toString();
        case "string":
            if(key.toUpperCase().includes("PHONENUMBER")){
                val = val.match(/[0-9\+]+/g).join("");
                if(val.length === 13 || val.length === 14) return val;
                return  "";
            }
            if(typeof key === "string" && key.toUpperCase().includes("EMAIL") && !validEmail(val)) return "";
            return val;
        case "object":
            if(typeof key === "string"){
                switch(key){
                    case "state":
                        if(val.state)
                            return val.state.name;
                        else return "";
                }
            }
            return val.name;
        case "undefined":
            return "";
    }
}

/**
 * 
 * @param {object} objArr 
 */
function objArrTOTable(objArr, header){
    if(!header) header = getObjArrTableHeader(objArr);
    //console.log("Header:", header);
    var table = document.createElement("table");
    table.className = "table table-striped";
    var tableHeader = document.createElement("thead");
    var tableHeaderRow = document.createElement("tr");
    var tableBody = document.createElement("tbody");
    tableHeader.append(tableHeaderRow);
    table.append(tableHeader);
    table.append(tableBody);
    header.forEach(column => {
        var th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.innerText = camelCaseToNorml(column);
        tableHeaderRow.append(th);
    })
    objArr.forEach(row => {
        var tr = document.createElement("tr");
        tableBody.append(tr);
        header.forEach((key) => {
            var td = document.createElement("td");
            td.innerText = escapeDataValue(row[key], key);
            tr.append(td);
        });
    });
    return table;
}

export {objArrTOTable};