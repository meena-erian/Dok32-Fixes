import {trafficSpoofer} from "./trafficSpoofer.js";

function appDok32Com(){
    trafficSpoofer((json, xhr) => {console.log(`XHR: ${xhr.status} : ${xhr.responseURL} `, "\n", JSON.parse(json), "\n\n\nResponse: \n", JSON.parse(xhr.responseText));});
}

export {appDok32Com};