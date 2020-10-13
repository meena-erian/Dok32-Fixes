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
    return Object.keys(merge);
}

/**
 * 
 * @param {any} val 
 */
function escapeCSVValue(val){
    switch(typeof val){
        case "number":
            if(val > 80000000000 && val < 1999999999999){
                let date = new Date(val);
                return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
            }
            return val.toString();
        case "string":
            if(val.toUpperCase() === "NONE@NONE.COM") return "";
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
            CSVstr += escapeCSVValue(row[key]);
        });
    });
    return CSVstr;
}

export {objArrTOCSV};