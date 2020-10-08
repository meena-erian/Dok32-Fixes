
/**
 * A function that analizes an input element and returns some information about it.
 * 
 * @param {HTMLDivElement} g The div with class input-group that contains the input element 
 * 
 * @returns {objcet} 
 */
function inspectInput(g){
    let inp = {};
    inp.label = g.querySelector("label").innerText;                    // Label
    let model = g.querySelector("[ng-model]");
    model.setAttribute("form-input-element", "new");
    inp.key = model.getAttribute("ng-model");
    if(inp.key.split(".").length > 1) inp.key = inp.key.split(".")[1]; // Key
    switch(model.tagName){
        case "SELECT":
            inp.type = "select";                                       // Type
            inp.options = [];
            let options = model.querySelectorAll("option");
            if(options.length < 3){
                model.click();
                console.log("Sleeping for 1 second");
                options = model.querySelectorAll("option");
            }
            options.forEach(opt => {
               inp.options.push({name: opt.innerText, value: opt.value}); // Options
            });
        break;
        case "INPUT":
            if(model.getAttribute("datepicker-popup")){
                inp.type = "date";                                     // Type
            }
            else if(model.getAttribute("typeahead") &&
                model.getAttribute("typeahead").includes("nationality")){
                inp.type = "nationality";                              // Type
            }
            else {
                inp.type = "text";                                     // Type
            }
        break;
        default:
            console.log("Dok32 fixes: Invalid input tagName in form inputs");
    }
    model.setAttribute("form-input-type", inp.type);
    model.setAttribute("form-input-key", inp.key);
    return inp;
}


function bindForm(htmlForm){
    var ret = [];
    htmlForm.querySelectorAll(".form-group").forEach(g => {
        ret.push(inspectInput(g));
    });
    return ret;
}
export {bindForm};