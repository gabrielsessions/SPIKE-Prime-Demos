
const DOCUMENTATION_ID = "#documentationOriginalCode";
const DOCUMENTATION_FRAME_ID = "#documentationFrame"

function loadDoc() {

    let docDiv = document.createElement('div');

    $(docDiv).html($(DOCUMENTATION_ID).html());

    $(DOCUMENTATION_FRAME_ID).append(docDiv);

}


$(document).ready(() => {

    loadDoc();

});