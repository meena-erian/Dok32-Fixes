import {everlastOfficeDok32Com} from "./everlast-office.dok32.com.js";
export default function(){
    let hn = document.location.hostname;
    if (hn === 'everlast-office.dok32.com' || true) {

        //Import Moment.js
        let s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js";
        document.body.append(s);

        console.log("Dok32 Fixes extension loadeed.");
        setInterval(() => {
            everlastOfficeDok32Com();
        }, 200);
    }
}