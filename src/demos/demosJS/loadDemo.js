

const DEFAULT_DEMO_CODE_ID = "#demoContent";
const OUTPUT_ID = "#demoOutput";
const INPUT_TEXTAREA_ID = "#userHTMLTextArea";
const APPLY_CHANGES_ID = "#changeHTMLButton";

//Inserts default HTML into output box and loads HTML into the input textbox
function loadDefaultHTML() {

    const defaultHTML = $(DEFAULT_DEMO_CODE_ID).html();

    $(OUTPUT_ID).html(defaultHTML);

    $(INPUT_TEXTAREA_ID).html(defaultHTML);


}

//When the user applies HTML changes, the output HTML is changed to match the textbox input
function modifyHTML() {

    $(OUTPUT_ID).html("");

    const inputHTML = $(INPUT_TEXTAREA_ID).val();

    let parser = new DOMParser();
	let outputContent = parser.parseFromString(inputHTML, 'text/html');

    let tempDiv = document.createElement('div');
    $(tempDiv).append(outputContent.body.innerHTML);


    $(OUTPUT_ID).append(tempDiv);


}



$(document).ready(() => {
    
    loadDefaultHTML();

    $(APPLY_CHANGES_ID).click(() => {
        modifyHTML();
    })


});

