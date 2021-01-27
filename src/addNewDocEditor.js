import {fetchList} from "./fetchList.js";

async function addNewDocEditor(oldEditorDiv){
    var shortCodes = await fetchList('consent-form/template/keyword/choose.json');
    var oldEditorObj = window.tinymce.editors[0].selection.editor;
    console.log("oldEditorObj:", oldEditorObj);
    var currentContent =  oldEditorObj.getContent();
    oldEditorDiv.style.display = "none";
    var newEditorDiv = document.createElement("div");
    newEditorDiv.setAttribute("id", "new-mce-editor");
    oldEditorDiv.parentNode.append(newEditorDiv);
    console.log("Short codes list: ", shortCodes);
    var newEditorObj = (await window.tinymce.init({
        selector: `#new-mce-editor`,
        setup: function(editor) {
            editor.on('change', function(editor) {
                console.log("editor:", editor);
                var newContent = editor.getContent();
                oldEditorObj.setContent(newContent);
            });
        }
    }))[0];
    console.log("newEditorObj:", newEditorObj);
    if(currentContent.length){
        newEditorObj.setContent(currentContent);
    }
}

export {addNewDocEditor};