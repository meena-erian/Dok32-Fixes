import { trafficSpoofer } from "./trafficSpoofer.js";

const clickableStyle = `
.clickable{
    cursor: pointer;
}
.clickable.send-sms{
    background-image: url(https://everlast.portacode.com/fixed-assets/send-sms.png);
    background-size: 40px;
}
.clickable:hover{
    filter: hue-rotate(45deg);
}
.clickable:active{
    filter: invert(1);
}
`;


function insertStyles(){
    var s = document.createElement("style");
    s.innerHTML = clickableStyle;
    document.head.appendChild(s);
}


function removeSMSButton(){
    var header = document.querySelector(".appointment-header");
    var smsButton = document.getElementById("send-sms-button");
    if(smsButton){
        header.removeChild(smsButton);
        //delete smsButton;
    }
}
/**
 * A function the inserts or overwrites the send SMS button
 * 
 * @param {function} onclick The function to be executed when the button is clicked.
 */
function injectSMSButton(onclick/* : function */){
    // Remove old button if any
    removeSMSButton();
    var header = document.querySelector(".appointment-header");
    var sendSMSButton = document.createElement("i");
    sendSMSButton.className = "icon-btn clickable send-sms";
    sendSMSButton.id = "send-sms-button";
    sendSMSButton.addEventListener("click", onclick);
    header.insertBefore(sendSMSButton, header.children[3]);
}





function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function token(){
    var t = undefined;
    try{
        t = JSON.parse(JSON.parse(decodeURIComponent(readCookie("persist%3Aauth"))).token).access_token;
    }catch(e){
        ;
    }
    return t;
}


async function getMemberEmail(id){
    var emailsModule = await import("https://everlast.portacode.com/emails.js");
    return {email: emailsModule.emails[id]};
}

async function getMember(id) {
    return (await fetch(`https://everlast-office.dok32.com:4443/webApi/member/item.json?id=${id}`,{
        "headers": {
          "accept": "application/json",
          "accept-language": "en,ar;q=0.9",
          "api_version": "1.0",
          "authorization": `Bearer ${token()}`,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        "referrer": "https://app.dok32.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      }
    ));
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
    insertStyles();
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
                        //getMemberEmail(response.data.creator.id).then(creator => {
                            //Object.assign(response.data.creator, creator);
                            response.data.creator = {};
                            Object.assign(response.data.creator, {"email": "me@portacode.com", "id": 265, "name": "Meena Erian"});
                            var endpoint = "https://everlast.portacode.com/appointment";
                            var secret = "xJ4gSdyqo2*2sah";
                            var body = JSON.stringify(response);
                            digestMessage(`${body}-${secret}`).then(hash => {
                                injectSMSButton(
                                    () => {
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
                                        window.onbeforeunload = null;
                                        removeSMSButton();
                                    }
                                );
                                window.onbeforeunload = function(e) { 
                                    const msg = "Client was not notified about the Apppointment. Please use the SMS button before closing";
                                    e.returnValue = msg;
                                    return msg;
                                };
                                console.log("Appointment updated: ", request);
                            });
                        //});
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