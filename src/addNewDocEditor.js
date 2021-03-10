import { fetchList } from "./fetchList.js";
import { consectForm, treatmentInstructions } from "./html.js";

/**
 * Waits for the old editor to be initialized and then returns its object
 * @param {HTMLDivElement} div 
 */
async function getEditorObj(div){
    return new Promise(
        (resolve, reject) => {
            var numberOfAttemts = 0;
            var interval = window.setInterval(
                () => {
                    var tinyDiv = div.querySelector('.tox-tinymce');
                    if(!tinyDiv){
                        tinyDiv = div.querySelector('.mce-container');
                        if(tinyDiv){
                            window.clearInterval(interval);
                            resolve(window.tinymcev4.editors.find(e => e.editorContainer == tinyDiv));
                        }
                    }
                    else {
                        window.clearInterval(interval);
                        resolve(window.tinymce.editors.find(e => e.editorContainer == tinyDiv));
                    }
                    numberOfAttemts += 1;
                    if(numberOfAttemts > 25){
                        console.log("Unable to find oldEditorObj");
                        window.clearInterval(interval);
                        reject("Unable to find oldEditorObj");
                    }
                },
                200
            );
        }
    );
}

async function addNewDocEditor(oldEditorDiv) {
    var pageHash = window.location.hash.split("?")[0];
    var shortCodes = [];
    if(pageHash.startsWith('#/Series/Info/0/ConsentForm')){
        shortCodes = await fetchList('consent-form/template/keyword/choose.json');
    }
    else if(pageHash.startsWith('#/Series/Info/0/PostOperationInstruction')){
        shortCodes = await fetchList('post-operation-instruction/template/keyword/choose.json');
    }
    else if(pageHash.startsWith('#/Series/Info/0/FillInForm')){
        return;
    }
    else if(pageHash.startsWith('#/Series/Info/0/Vital')){
        return;
    }
    else return ;
    var oldEditorObj = await getEditorObj(oldEditorDiv);
    console.log("oldEditorObj:", oldEditorObj);
    var currentContent = oldEditorObj.getContent();
    oldEditorDiv.style.display = "none";
    
    var newEditoriFrame = document.createElement("iframe");
    newEditoriFrame.setAttribute("id", "new-mce-editor");
    //console.log("Short codes list: ", shortCodes);
    console.log(" window.tinymce: ", window.tinymce);
    // Remove all editors except the last one
    window.tinymce.editors.forEach(editor => {
        if(editor && editor.remove && editor !== oldEditorObj) editor.remove();
    });
    window.tinymcev4.editors.forEach(editor => {
        //if(editor && editor.remove && editor !== oldEditorObj) editor.remove();
    });
    newEditoriFrame.style = "width: -webkit-fill-available; border: 0;";
    window.addEventListener('message', event => {
        if (event.origin.startsWith('https://everlast.portacode.com')) { 
            console.log(event.data);
            if(event.data.tinyMCENewContent){
                oldEditorObj.setContent(event.data.tinyMCENewContent);
            }
            else if(event.data.pleaseResizeMe){
                //newEditoriFrame.width = event.data.pleaseResizeMe.width;
                newEditoriFrame.height = event.data.pleaseResizeMe.height;
            }
            else if(event.data.sendconfig){
                console.log("Parent senging config after signal");
                newEditoriFrame.contentWindow.postMessage({
                    "initialconfig" : "true",
                    "shortCodes" : shortCodes,
                    "templates" : [
                        {"name" : "Consent Form", "content": consectForm},
                        {"name" : "Treatment Instructions", "content": treatmentInstructions}
                    ]
                }, "*");
            }
            else if(event.data.doneloading){
                newEditoriFrame.contentWindow.postMessage({
                    "tinyMCEInitialContent": currentContent
                }, "*");
            }
        } else {
            return; 
        } 
    }); 
    oldEditorDiv.parentNode.insertBefore(newEditoriFrame, oldEditorDiv);
    console.log('All old editors was cleared from memory');
    newEditoriFrame.src = 'https://everlast.portacode.com/consent-forms';
}

export { addNewDocEditor };