
//Takes in an array of elements and applies a fade in effect when the page is loaded
function fadeInElements(elements) {

    for (let element of elements) {
        $(element).hide();
        $(element).fadeIn();
    }
   
    
}




$(document).ready( () => {

    jQuery.fx.interval = 10000;

    animatedElements = ['#tutorialsButtonBox', 
                        '#templateButtonBox', 
                        '#demosButtonBox'];

    fadeInElements(animatedElements);

    console.log("ready");
} );

