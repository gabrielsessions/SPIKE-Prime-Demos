/*
 * loadDemo.js
 * Gabriel Sessions
 * January 2022
 * 
 * Generates an HTML editor for SPIKE Prime Demos
*/

const DEFAULT_DEMO_CODE_ID = "#demoContent";
const OUTPUT_ID = "#demoOutput";
const INPUT_TEXTAREA_ID = "#userHTMLTextArea";
const APPLY_CHANGES_ID = "#changeHTMLButton";
const DOWNLOAD_BUTTON_ID = "#downloadButton";
const DOWNLOAD_SHELL_ID = "#downloadShell";
const REVERT_TO_DEFAULT = "#revertToDefault";

const AUTOSAVE_SECONDS = 5;


//Inserts default HTML into output box and loads HTML into the input textbox
function loadDefaultHTML() {
    let defaultHTML = $(DEFAULT_DEMO_CODE_ID).html();
    $(OUTPUT_ID).html(defaultHTML);
    $(INPUT_TEXTAREA_ID).html(defaultHTML);
}


//When the user applies HTML changes, the output HTML is changed to match the textbox input
function modifyHTML() {
    $(OUTPUT_ID).html("");
    let inputHTML = $(INPUT_TEXTAREA_ID).val();

    //Converts string value to a useable DOM element
    let parser = new DOMParser();
    let outputContent = parser.parseFromString(inputHTML, 'text/html');
    let tempDiv = document.createElement('div');
    $(tempDiv).append(outputContent.body.innerHTML);
    $(OUTPUT_ID).append(tempDiv);


    // See saveCode.ts for save implementation
    saveCode(inputHTML, false);
}



function generateDoc() {
    //Fetching doc shell and appending the service dock js file
    let newDoc = document.createElement('html');
    newDoc.innerHTML = $(DOWNLOAD_SHELL_ID).html();
    let serviceDockCDN = document.createElement('script');
    $(serviceDockCDN).attr('src', 'https://cdn.jsdelivr.net/gh/tuftsceeo/SPIKE-Web-Interface/cdn/ServiceDock.js');
    $(serviceDockCDN).attr('charset', 'utf-8');
    $(newDoc).children("head").append(serviceDockCDN);

    //Appending user code into the document body
    let inputHTML = $(INPUT_TEXTAREA_ID).val();
    let parser = new DOMParser();
    let outputContent = parser.parseFromString(inputHTML, 'text/html');
    let tempDiv = document.createElement('div');
    $(tempDiv).append(outputContent.body.innerHTML);
    $(newDoc).children("body").append(tempDiv);
    return (newDoc);
}



//Creates an HTML document and sends a download request
function downloadCode() {
    let doc = generateDoc();
    let currentPathArr = window.location.pathname.split('/');
    let fileName = currentPathArr[currentPathArr.length - 1];
    let blob = new Blob([$(doc).html()], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
}


// Taken from https://stackoverflow.com/questions/6140632/how-to-handle-tab-in-textarea

function enableTabKeyTextarea(textAreaId) {
    $(textAreaId).keydown(function(e) {
        if(e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            let start = this.selectionStart;
            let end = this.selectionEnd;
    
            let $this = $(textAreaId);
            let value = $this.val();
    
            // set textarea value to: text before caret + tab + text after caret
            $this.val(value.substring(0, start)
                        + "\t"
                        + value.substring(end));
    
            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1;
    
            // prevent the focus lose
            e.preventDefault();
        }
    });
}

// Forces user to confirm revert to original demo code
function confirmRevert() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to undo this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, revert to default code'
    }).then((result) => {
        if (result.isConfirmed) {
            activateRevertButton();
            Swal.fire(
                'Project code has been reverted to the original demo code',
                'Your edits has been deleted',
                'success'
            );
            console.log("hello!");
          
        }
    })
}


// Changes code to default value and saves it to local storage
function activateRevertButton() {
    
    let defaultCode = $(DEFAULT_DEMO_CODE_ID).html();
    $(INPUT_TEXTAREA_ID).val(defaultCode);
    modifyHTML();
    
}

// Saves code every 30 seconds
function enableAutosave() {
    setInterval(() => {
        let curCode = $(INPUT_TEXTAREA_ID).val();
        saveCode(curCode, true);
    }, AUTOSAVE_SECONDS * 1000);
    
}

function checkForAutosave() {

}



jQuery(function () {

    loadDefaultHTML();
    $(APPLY_CHANGES_ID).click(function () {
        modifyHTML();
    });

    $(DOWNLOAD_BUTTON_ID).click(function () {
        downloadCode();
    });

    $(REVERT_TO_DEFAULT).click(() => {
        console.log("revert?");
        confirmRevert();
        
    }); 

    enableTabKeyTextarea(INPUT_TEXTAREA_ID);

    enableAutosave();

    let previousCode = getPreviousCode();
    if (previousCode != null && previousCode != "") {
        $(INPUT_TEXTAREA_ID).val(previousCode);
        modifyHTML();
        $(LAST_SAVED_ID).html("Last Saved: No saves in the current session");
        $(SAVING_ICON_ID).attr("style", "display:none");
    }

    
});
