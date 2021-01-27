import {fetchList} from "./fetchList.js";

async function addNewDocEditor(editorId){
    var shortCodes = await fetchList('consent-form/template/keyword/choose.json');
    console.log("Short codes list: ", shortCodes);
    window.tinymce.init({
        selector: `#${editorId}`
    });
}

export {addNewDocEditor};