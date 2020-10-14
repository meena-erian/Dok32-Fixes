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
    delete merge.id;
    delete merge.createdDate;
    delete merge.companyPatientId;
    delete merge.patientKey;
    return Object.keys(merge);
}

/**
 * 
 * @param {any} val 
 */
function escapeDataValue(val, key){
    switch(typeof val){
        case "number":
            if(typeof key === "string" && key.toUpperCase().includes("DATE")){
                return moment(val).format("DD/MM/YYYY");
            }
            return val.toString();
        case "string":
            if(key.toUpperCase().includes("PHONENUMBER")){
                val = val.match(/[0-9\+]+/g).join("");
                if(val.length === 13) return val;
                return  "";
            }
            if(val.toUpperCase().includes("@NONE.COM") || val.toUpperCase() === "NONE@GMAIL.COM" || val.toUpperCase() === "NONE.NONE@GMAIL.COM") return "";
            return val;
        case "object":
            return val.name;
        case "undefined":
            return "";
    }
}

/**
 * 
 * @param {object} objArr 
 */
function objArrTOTable(objArr){
    var header = getObjArrTableHeader(objArr);
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