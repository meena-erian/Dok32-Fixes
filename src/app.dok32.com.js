import {trafficSpoofer} from "./trafficSpoofer.js";

function appDok32Com(){
    console.log("Dok32 Fixes extension loaded.");
    trafficSpoofer(
        function (json, xhr) {
            if(!xhr || !xhr.status){
                //console.log("XHR object not provided! \nXHR:", xhr, "REQUEST:", json);
                return;
            }
            //console.log(`XHR: ${xhr.status} : ${xhr.responseURL} `);
            var request = undefined;
            var response = undefined; 
            try {
                request = JSON.parse(json);
                //console.log("\nRequest: \n", request);
            } catch(e) {
                //console.log("Failed to parse JSON Request");
            }
            try {
                response = JSON.parse(xhr.responseText);
                //console.log("\nResponse: \n", response);
            } catch(e) {
                //console.log("Failed to parse JSON Request");
            }
            if(xhr.responseURL === "https://everlast-office.dok32.com:4443/api/clinic/appointment/item.json"){
                if(response && request){
                    if(response.statusCode === 2){
                        var endpoint = "https://everlast.portacode.com/appointment";
                        var secret = "xJ4gSdyqo2*2sah";
                        console.log("Appointment udated: ", request);
                        fetch(endpoint, {
                            "headers": {
                                "accept": "application/json",
                                "authorization": "Bearer 3a4b50a1-4b8b-4d42-8494-837589ab66a8",
                                "content-type": "application/json;charset=UTF-8",
                            },
                            "referrer": "https://app.dok32.com/",
                            //"referrerPolicy": "strict-origin-when-cross-origin",
                            "body" : JSON.stringify(request),
                            "method" : "POST",
                            "mode": "cors",
                            "credentials": "include"
                        });
                    }
                    else{
                        console.log(response);
                    }
                }
                else {
                    console.log("Missing data: \nRequest: ", request, "\n\nResponse:", response);
                }
            }
            else {
                console.log(xhr.responseURL);
            }
        }
    );
}

export {appDok32Com};