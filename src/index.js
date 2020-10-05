import {pageScanner} from "./everlast-office.dok32.com.js";
export default function(){
    let hn = document.location.hostname;
    if (hn === 'everlast-office.dok32.com' || true) {
        console.log("Dok32 Fixes extension loadeed.");
        setInterval(() => {
            pageScanner();
        }, 200);
    }
}