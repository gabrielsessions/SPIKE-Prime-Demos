//Intstall jquery type for TS compiler
//npm install --save-dev @types/jquery


//Takes in an array of elements and applies a fade in effect when the page is loaded
//Not currently in use

//TODO: Either implement or delete
/*
function fadeInElements(elements) {

    for (let i = 0; i < elements.length; i++) {
        $(elements[i]).hide();

        setTimeout(() => {
            $(elements[i]).fadeIn();
        }, i*250 + 100);
        
        
    }
    
}
*/

$(document).ready( () => {

    let animatedElements = ['#tutorialsButtonBox', 
                            '#templateButtonBox', 
                            '#demosButtonBox',
                            '#creditsBox'];


    console.log("ready");

    $('#viewDemosButton').click(() => {
        window.location.href = "demoList.html";
    });

    $('#viewTutorialsButton').click(() => {
        window.location.href = "https://canvas.tufts.edu/courses/31584/pages/help-html-css-and-javascript";
    });


} );

