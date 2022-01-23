
const DEFAULT_DEMO_CODE_ID = "#demoContent";
const OUTPUT_ID = "#demoOutput";
const INPUT_TEXTAREA_ID = "#userHTMLTextArea";
const APPLY_CHANGES_ID = "#changeHTMLButton";
const DOWNLOAD_BUTTON_ID = "#downloadButton";
const DOWNLOAD_SHELL_ID = "#downloadShell";

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

    //Converts string value to a useable DOM element
    let parser = new DOMParser();
	let outputContent = parser.parseFromString(inputHTML, 'text/html');

    let tempDiv = document.createElement('div');
    $(tempDiv).append(outputContent.body.innerHTML);


    $(OUTPUT_ID).append(tempDiv);


}


function generateDoc() {
    //Fetching doc shell and appending the service dock js file
    const newDoc = document.createElement('html');
    newDoc.innerHTML = $(DOWNLOAD_SHELL_ID).html();

    const serviceDockCDN = document.createElement('script');
    $(serviceDockCDN).attr('src', 'https://cdn.jsdelivr.net/gh/tuftsceeo/SPIKE-Web-Interface/cdn/ServiceDock.js');
    $(serviceDockCDN).attr('charset', 'utf-8');

    $(newDoc).children("head").append(serviceDockCDN);


    //Appending user code into the document body
    const inputHTML = $(INPUT_TEXTAREA_ID).val();
    let parser = new DOMParser();
	let outputContent = parser.parseFromString(inputHTML, 'text/html');

    let tempDiv = document.createElement('div');
    $(tempDiv).append(outputContent.body.innerHTML);

    $(newDoc).children("body").append(tempDiv);

    return(newDoc);
}

//Creates an HTML document and sends a download request
function downloadCode() {

    let doc = generateDoc();

    const currentPathArr = window.location.pathname.split('/');
    const fileName = currentPathArr[currentPathArr.length-1];

    let blob = new Blob([$(doc).html()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, fileName);
    
}



$(document).ready(() => {
    
    loadDefaultHTML();

    $(APPLY_CHANGES_ID).click(() => {
        modifyHTML();
    });

    $(DOWNLOAD_BUTTON_ID).click(() => {
        downloadCode();
    });


});

