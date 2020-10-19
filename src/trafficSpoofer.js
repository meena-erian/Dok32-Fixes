/**
 * A function that binds the monitors XMLHttprequests by binding a function to the request objecct.
 * 
 * @param {function} func A function that will be binded with the XMLHttpRequest. This function
 *  takes two parameters. 1- {string} body: The content being sent. 2- {XMLHttpRequest} this
 */
function trafficSpoofer(func){
    XMLHttpRequest.prototype.oldSend = XMLHttpRequest.prototype.send;
    var newSend = function (body) {
        func(body, this);
        return this.oldSend(body);
    };
    XMLHttpRequest.prototype.send = newSend;
}

export {trafficSpoofer};