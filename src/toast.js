var toastStackWrapper = document.createElement("DIV");
toastStackWrapper.setAttribute("aria-live", "polite");
toastStackWrapper.setAttribute("aria-atomic", "true");
toastStackWrapper.style = "position: relative; min-height: 200px;";
var toastStack = document.createElement("DIV");
toastStack.style = "position: fixed; top: 65px; right: 15px;";
toastStackWrapper.append(toastStack);
document.body.append(toastStackWrapper);

/**
 * 
 * @param {string} title 
 * @param {string} body 
 * @param {"success" | "info" | "warning" | "danger"} type 
 */
function createToast(title,body,type){
    var thisToast = document.createElement("DIV");
    thisToast.className = `alert alert-${type} alert-dismissible`;
    thisToast.setAttribute("role", "alert");
    thisToast.innerHTML = `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong> ${title} </strong> ${body}`;
    return thisToast;
}

function toast(title, body, type = "warning"){
    var thisTost = createToast(title, body, type);
    toastStack.append(thisTost);
}