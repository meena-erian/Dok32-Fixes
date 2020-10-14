function validEmail(email){
    email = email.toUpperCase();
    if(email.includes("@NONE.COM")) return false;
    if(email.includes("@NON.COM")) return false;
    let id = email.split("@")[0];
    let host = id.split("@"[1]);
    if(host === "GMAIL.COM" && id.length < 7) return false;
    let sections = id.split(".");
    for(let i=0 ; i< sections.length; i++){
        if(!sections[i].length) return false;
        if(sections[i] === "NONE" || sections[i] === "NON") return false;
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
function getJSONTableHeader(objArr){
    var merge = {};
    objArr.forEach(element => {
        Object.assign(merge, element);
    });
    //Remove needless fields
    delete merge.hidden;
    delete merge.clinic;
    delete merge.id;
    delete merge.createdDate;
    delete merge.companyPatientId;
    delete merge.patientKey;
    delete merge.appStatus;
    delete merge.appUsername;
    return Object.keys(merge);
}

/**
 * 
 * @param {any} val 
 */
function escapeCSVValue(val, key){
    switch(typeof val){
        case "number":
            if(typeof key === "string" && key.toUpperCase().includes("DATE")){
                return moment(val).format("DD/MM/YYYY");
            }
            return val.toString();
        case "string":
            if(typeof key === "string" && key.toUpperCase().includes("PHONENUMBER")){
                val = val.match(/[0-9\+\(\)\-]+/g).join("");
                if(val.length === 15) return `${val}`;
                return  "";
            }
            if(typeof key === "string" && key.toUpperCase().includes("EMAIL") && !validEmail(val)) return "";
            return `"${val.replace(/"/g, `""`)}"`;
        case "object":
            if(typeof val.name === "string") return `"${val.name.replace(/"/g, `""`)}"`;
            else return val.name;
        case "undefined":
            return "";
    }
}

/**
 * 
 * @param {object} objArr 
 */
function objArrTOCSV(objArr){
    var header = getJSONTableHeader(objArr);
    console.log("Header:", header);
    var CSVstr = "";
    header.forEach(column => {
        if(CSVstr.length) CSVstr += ",";
        CSVstr += escapeCSVValue(camelCaseToNorml(column));
    })
    objArr.forEach(row => {
        CSVstr += "\n";
        header.forEach((key, index) => {
            if(index !== 0) CSVstr += ",";
            CSVstr += escapeCSVValue(row[key], key);
        });
    });
    return CSVstr;
}

export {objArrTOCSV};