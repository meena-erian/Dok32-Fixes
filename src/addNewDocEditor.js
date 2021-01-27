import { fetchList } from "./fetchList.js";

async function addNewDocEditor(oldEditorDiv) {
    var shortCodes = await fetchList('consent-form/template/keyword/choose.json');
    var oldEditorObj = window.tinymce.editors[0].selection.editor;
    console.log("oldEditorObj:", oldEditorObj);
    var currentContent = oldEditorObj.getContent();
    oldEditorDiv.style.display = "none";
    var newEditorDiv = document.createElement("div");
    newEditorDiv.setAttribute("id", "new-mce-editor");
    oldEditorDiv.parentNode.append(newEditorDiv);
    console.log("Short codes list: ", shortCodes);
    var newEditorObj = (await window.tinymce.init({
        selector: `#new-mce-editor`,
        branding: false,
        height: 600,
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
        }
    }, 1000);
    console.log("newEditorObj:", newEditorObj);
    if (currentContent.length) {
        newEditorObj.setContent(currentContent);
    }
}

export { addNewDocEditor };