import {trafficSpoofer} from "./trafficSpoofer.js";

function appDok32Com(){
    console.log("Dok32 Fixes extension loaded.");
    trafficSpoofer(
        function (json, xhr) {
            console.log(`XHR: ${xhr.status} : ${xhr.responseURL} `, "\n", JSON.parse(json), "\n\n\nResponse: \n", JSON.parse(xhr.responseText));
        }
    );
}

export {appDok32Com};




import('https://everlast.portacode.com/Dok32-fixes-gitproxy/dev/src/trafficSpoofer.js').then( m => trafficSpoofer = m.trafficSpoofer);

trafficSpoofer(
    function (json, xhr) {
        //console.log(json, xhr);
        console.log(`XHR: ${xhr.status} : ${xhr.responseURL} `);
        var request = undefined;
        var response = undefined; 
        try {
            request = JSON.parse(json);
            console.log("\nRequest: \n", request);
        } catch(e) {
            console.log("Failed to parse JSON Request");
        }
        try {
            response = JSON.parse(xhr.responseText);
            console.log("\nResponse: \n", response);
        } catch(e) {
            console.log("Failed to parse JSON Request");
        }
    }
);