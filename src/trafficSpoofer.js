/**
 * A function that binds the monitors XMLHttprequests by binding a function to the request objecct.
 * 
 * @param {function} func A function that will be binded with the XMLHttpRequest. This function
 *  takes two parameters. 1- {string} body: The content being sent. 2- {XMLHttpRequest} this
 */
function trafficSpoofer(func){
    window.XMLHttpRequest.prototype.oldSend = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function (body) {
        func(body, this);
        console.log("Test:", body,"This:", this);
        return this.oldSend(body);
    };
}

export {trafficSpoofer};