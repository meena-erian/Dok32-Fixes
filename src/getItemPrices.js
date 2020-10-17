
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
            list = list.concat(results);
        }
        else{
            if(response.data.list)
                list = list.concat(response.data.list);
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



async function getItemPrices(id){
    var res = await (await fetch(`/webApi/company/accounting/price/item.json?id=${id}`)).json();
    if(!res.data || !res.data.rows) return false;
    console.log(`Fetching: /webApi/company/accounting/price/item.json?id=${id}`, res.data.rows);
    return res.data.rows;
}

//export {getItemPrices};

function propertID(obj, arr){
    arr.forEach(element => {
        if(element.id){
            var id = element.id;
            if(!obj[id]) obj[id] = {};
            delete element.id;
            Object.assign(obj[id], element);
        }
        else console.log(`Error! : No Id property in element : ${element}`);
    });
    return obj;
}

async function getMergeItems(id){
    var treatments = await fetchList('treatment/code/list.json', {}, true, 25);
    if(!treatments) return false;
    var prices = await getItemPrices(id);
    if(!prices) return false;
    var obj = {};
    propertID(obj, treatments);
    propertID(obj, prices);
    return obj;
}