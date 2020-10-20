import { trafficSpoofer } from "./trafficSpoofer.js";

async function getMember(id) {
    return (await fetch(`https://everlast-office.dok32.com:4443/webApi/member/item.json?id=${id}`));
}

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

function appDok32Com() {
    console.log("Dok32 Fixes extension loaded.");
    trafficSpoofer(
        function (json, xhr) {
            if (!xhr || !xhr.status) {
                //console.log("XHR object not provided! \nXHR:", xhr, "REQUEST:", json);
                return;
            }
            //console.log(`XHR: ${xhr.status} : ${xhr.responseURL} `);
            var request = undefined;
            var response = undefined;
            try {
                request = JSON.parse(json);
                //console.log("\nRequest: \n", request);
            } catch (e) {
                //console.log("Failed to parse JSON Request");
            }
            try {
                response = JSON.parse(xhr.responseText);
                //console.log("\nResponse: \n", response);
            } catch (e) {
                //console.log("Failed to parse JSON Request");
            }
            if (xhr.responseURL === "https://everlast-office.dok32.com:4443/api/clinic/appointment/item.json") {
                if (response && request) {
                    if (response.statusCode === 2) {
                        getMember(response.data.creator.id).then(creator => {
                            response.data.creator = creator;
                            var endpoint = "https://everlast.portacode.com/appointment";
                            var secret = "xJ4gSdyqo2*2sah";
                            var body = JSON.stringify(response);
                            digestMessage(`${body}-${secret}`).then(hash => {
                                fetch(endpoint, {
                                    "headers": {
                                        "Accept": "application/json",
                                        "Authorization": `token ${hash}`,
                                        "Content-Type": "application/json;charset=UTF-8",
                                    },
                                    "referrer": "https://app.dok32.com/",
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "body": body,
                                    "method": "POST",
                                    "mode": "cors",
                                    //"credentials": "include"
                                });
                                console.log("Appointment udated: ", request);
                            });
                        });
                    }
                    else {
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

export { appDok32Com };