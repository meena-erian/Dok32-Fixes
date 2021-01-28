import { fetchList } from "./fetchList.js";
import {consectForm} from "./html.js";

async function addNewDocEditor(oldEditorDiv) {
    var shortCodes = await fetchList('consent-form/template/keyword/choose.json');
    var oldEditorObj = window.tinymcev4.editors[0].selection.editor;
    console.log("oldEditorObj:", oldEditorObj);
    var currentContent = oldEditorObj.getContent();
    oldEditorDiv.style.display = "none";
    var newEditorDiv = document.createElement("div");
    newEditorDiv.setAttribute("id", "new-mce-editor");
    oldEditorDiv.parentNode.insertBefore(newEditorDiv, oldEditorDiv);
    console.log("Short codes list: ", shortCodes);
    console.log(" window.tinymce: ", window.tinymce);
    var newEditorObj = (await window.tinymce.init({
        selector: `#new-mce-editor`,
        branding: false,
        height: 600,
        menu: {
            file: { title: 'File', items: 'newdocument templatelist' },
            insert: { title: 'Insert', items: 'image link shortcode media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
        },
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
                                editor.insertContent(`<span style="color: #ea1414;">[[${code.code}]]</span>`);
                            }
                        });
                    });
                    return ret;
                }
            });
        }
    }))[0];
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