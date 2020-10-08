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
 * @param {object} jsonArr An array of objects with similar or mutual properties
 * 
 * @returns {object} An array of all possible keys
 */
function getJSONTableHeader(jsonArr){
    var merge = {};
    jsonArr.forEach(element => {
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
            return val.toString();
        case "string":
            return `"${val.replace(/"/g, `""`)}"`;
        case "object":
            return `"${val.name.replace(/"/g, `""`)}"`;
    }
}

/**
 * 
 * @param {object} jsonArr 
 */
function objArrTOCSV(jsonArr){
    var header = getJSONTableHeader(jsonArr);
    var CSVstr = "";
    header.forEach(column => {
        if(CSVstr.length) CSVstr += ",";
        CSVstr += escapeCSVValue(camelCaseToNorml(column));
    })
    jsonArr.forEach(row => {
        CSVstr += "\n";
        header.forEach((key, index) => {
            if(index !== 0) CSVstr += ",";
            CSVstr += escapeCSVValue(row[key]);
        });
    });
}

export {objArrTOCSV};