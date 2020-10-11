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
    return Object.keys(merge);
}

/**
 * 
 * @param {any} val 
 */
function escapeDateValue(val){
    switch(typeof val){
        case "number":
            if(val > 80000000000 && val < 1999999999999){
                let date = new Date(val);
                return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
            }
            return val.toString();
        case "string":
            return val;
        case "object":
            return val.name;
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
    table.className = "table";
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
            td.innerText = escapeDateValue(row[key]);
            tr.append(td);
        });
    });
    return table;
}

export {objArrTOTable};