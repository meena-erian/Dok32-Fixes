function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function analyzeFormStructure(htmlForm){
    var ret = [];
    htmlForm.querySelectorAll(".form-group").forEach(g => {
        let inp = {};
        inp.label = g.querySelector("label").innerText;                    // Label
        let model = g.querySelector("[ng-model]");
        inp.key = model.getAttribute("ng-model");
        if(inp.key.split(".").length > 1) inp.key = inp.key.split(".")[1]; // Key
        switch(model.tagName){
            case "SELECT":
                inp.type = "select";                                       // Type
                inp.options = [];
                let options = model.querySelectorAll("option");
                if(options.length < 3){
                    model.click();
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
        ret.push(inp);
    });
    return ret;
}
export {analyzeFormStructure};