/**
 * A function that monitors XMLHttprequests by binding a function to the request objecct.
 * 
 * @param {function} func A function that will be binded with the XMLHttpRequest. This function
 *  takes two parameters. 1- {string} body: The content being sent. 2- {XMLHttpRequest} this
 */
function trafficSpoofer(func){
    window.XMLHttpRequest.prototype.oldSend = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function (body) {
        var retrys = 0;
        var params = {b: body, xhr: this};
        function checkifitscomplete(){
            if(params.xhr.status){
                func(params.b, params.xhr);
            }
            else{
                if(retrys < 500){
                    window.setTimeout(checkifitscomplete, 100);
                    retrys = retrys + 1;
                }
            }
        }
        checkifitscomplete();
        return this.oldSend(body);
    };
}

export {trafficSpoofer};