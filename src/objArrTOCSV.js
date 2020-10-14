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
    //Remove field "hidden"
    delete merge.hidden;
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
                //let date = new Date(val);
                //console.log("escapeCSVValueTest:", window, moment);
                return moment(val).format("DD/MM/YYYY");
                //return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
            }
            return val.toString();
        case "string":
            if(typeof key === "string" && key.toUpperCase().includes("PHONENUMBER")){
                val = val.match(/[0-9\+\(\)\-]+/g).join("");
                if(val.length > 7) return `${val}`;
                return  "";
            }
            if(val.toUpperCase().includes("@NONE.COM") || val.toUpperCase() === "NONE@GMAIL.COM"  || val.toUpperCase() === "NONE.NONE@GMAIL.COM") return "";
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