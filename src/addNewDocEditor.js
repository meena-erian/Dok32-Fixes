import { fetchList } from "./fetchList.js";
import {consectForm} from "./html.js";

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
    if(pageHash.startsWith('#/Series/Info/0/PostOperationInstruction')){
        shortCodes = await fetchList('post-operation-instruction/template/keyword/choose.json');
    }
    if(pageHash.startsWith('#/Series/Info/0/FillInForm')){
        return;
    }
    var oldEditorObj = await getEditorObj(oldEditorDiv);
    console.log("oldEditorObj:", oldEditorObj);
    var currentContent = oldEditorObj.getContent();
    oldEditorDiv.style.display = "none";
    var newEditorDiv = document.createElement("div");
    newEditorDiv.setAttribute("id", "new-mce-editor");
    oldEditorDiv.parentNode.insertBefore(newEditorDiv, oldEditorDiv);
    console.log("Short codes list: ", shortCodes);
    console.log(" window.tinymce: ", window.tinymce);
    // Remove all editors except the last one
    window.tinymce.editors.forEach(editor => {
        if(editor !== oldEditorObj) editor.remove();
    });
    window.tinymcev4.editors.forEach(editor => {
        if(editor !== oldEditorObj) editor.remove();
    });
    var newEditorObj = (await window.tinymce.init({
        selector: `#new-mce-editor`,
        branding: false,
        height: 600,
        menu: {
            file: { title: 'File', items: 'newdocument templatelist' },
            insert: { title: 'Insert', items: 'image link shortcode media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
        },
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
        menubar: 'file edit insert format tools table',
        onchange_callback: (editor) => {
            var newContent = editor.getContent();
            oldEditorObj.setContent(newContent);
        },
        setup: function (editor) {
            editor.on('change', function (e) {
                var editor = e.target;
                var newContent = editor.getContent();
                oldEditorObj.setContent(newContent);
            });
            editor.on('keypress', function (e) {
                var editor = e.target;
                var newContent = editor.innerHTML;
                oldEditorObj.setContent(newContent);
            });
            editor.ui.registry.addMenuItem('templatelist', {
                text: 'Open Template',
                getSubmenuItems: function () {
                    return [
                        {
                            type: 'menuitem',
                            text: 'Consent Form',
                            onAction: function () {
                                editor.setContent(consectForm);
                            }
                        },
                        {
                            type: 'menuitem',
                            text: 'Fill-in Form',
                            onAction: function () {
                                editor.setContent(consectForm);
                            }
                        }
                    ];
                }
            });
            editor.ui.registry.addMenuItem('shortcode', {
                text: 'Shortcode',
                getSubmenuItems: function () {
                    var ret = [];
                    shortCodes.forEach((code) => {
                        ret.push({
                            type: 'menuitem',
                            text: code.name,
                            onAction: function (){
                                editor.insertContent(`[[${code.code}]]`);
                            }
                        });
                    });
                    return ret;
                }
            });
        }
    }));
    console.log("newEditorObj[]: ", newEditorObj);
    newEditorObj = newEditorObj[0];
    window.editorSyncid = window.setInterval(() => {
        if (oldEditorObj && newEditorObj && oldEditorObj.getContent && newEditorObj.getContent) {
            var newContent = newEditorObj.getContent();
            var oldContent = oldEditorObj.getContent();
            if (newContent !== oldContent) {
                oldEditorObj.setContent(newContent);
            }
        }
        else {
            window.clearInterval(window.editorSyncid);
            console.log("Failed to connect to editors");
        }
    }, 1000);
    console.log("newEditorObj:", newEditorObj);
    if (currentContent.length) {
        newEditorObj.setContent(currentContent);
    }
}

export { addNewDocEditor };