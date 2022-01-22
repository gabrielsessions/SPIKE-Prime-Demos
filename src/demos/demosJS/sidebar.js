/*

sidebar.js
Gabriel Sessions

Purpose: Provide submenu and toggleable functionality to the sidebar on the demo pages


*/

const NUM_OF_TABS = 2;

const SUBMENU_PREFIX = "demo";
const SUBMENU_SUFFIX = ["remote.html", "local.html", "documentation.html"];

const TAB_ID_PREFIX = "#demo_";
const TAB_ID_SUFFIX = "_button";

const SUBMENU_ID_PREFIX = "demo_";
const SUBMENU_ID_SUFFIX = "_submenu";

const SUBMENU_HTML_ID = "tabLinks";

const ARROW_ID_PREFIX = "#arrow_";

const MENU_ICON_ID = "#hamburger_menu"
const SIDEBAR_ID = "#sidebar";

const ANIMATION_LENGTH = 500;
const SIDEBAR_HIDDEN_MARGIN = "-16rem"; //Tailwind class w-64
const SIDEBAR_DISPLAY_MARGIN = "0rem";

//Returns the demo number from a demo id string
function demoNumber (demoId) {
    return (demoId.split("_")[1]);
}

function createArrayOfTabs () {

    //Creates an array with IDs of all navbar tabs - returns the array when finished appending submenus
    let arrOfTabs = [];

    for (let i = 1; i <= NUM_OF_TABS; i++) {
        arrOfTabs.push(TAB_ID_PREFIX + i + TAB_ID_SUFFIX); //#demo_i_button 
    }

    //Appends submenu links to each tab in the sidebar
    for (let j = 0; j < arrOfTabs.length; j++) {

        let demoNum = demoNumber(arrOfTabs[j]);
        
        let submenu = document.createElement('div');
        submenu.innerHTML = document.getElementById(SUBMENU_HTML_ID).innerHTML;
        submenu.hidden = true;
        
        submenu.id = SUBMENU_ID_PREFIX + demoNum + SUBMENU_ID_SUFFIX; //demo_demoNum_submenu

        //Assigning correct links to each element in the submenu
        //Currently in form "demo1remote.html" for remote files
        for (let k = 0; k < SUBMENU_SUFFIX.length; k++) {
            
            submenu.getElementsByTagName('a')[k].href = SUBMENU_PREFIX + demoNum + SUBMENU_SUFFIX[k]; //demo_demoNum_pageType --> See Submenu Suffix const
            
        }

        //Append after the corresponding main tab
        $(arrOfTabs[j]).after(submenu);
        
    }

    setUpTabToggles(arrOfTabs);


    return arrOfTabs;
}

//When a tab is clicked, the submenu will become unhidden
//Submenu can be rehidden by clicking the parent tab again
function setUpTabToggles (arrOfTabs) {
    for (let i = 0; i < arrOfTabs.length; i++) {

        let demoNum = demoNumber(arrOfTabs[i]);

        $(arrOfTabs[i]).click(function() {

            

            if ($(arrOfTabs[i]).attr("data-dropdown") == "false") {
                $("#" + SUBMENU_ID_PREFIX + demoNum + SUBMENU_ID_SUFFIX).attr('hidden', false); //Note: no # on SUBMENU_ID_PREFIX

                $(arrOfTabs[i]).attr("data-dropdown", "true");

                changeTabArrowDirection(arrOfTabs[i], true);
            }

            else {
                $("#" + SUBMENU_ID_PREFIX + demoNum + SUBMENU_ID_SUFFIX).attr('hidden', true);

                $(arrOfTabs[i]).attr("data-dropdown", "false");

                changeTabArrowDirection(arrOfTabs[i], false);
            }
            
        });
    }
}

//If status is true, arrow will be rotated to face upward
//If status is false, arrow will be rotated to face downward
function changeTabArrowDirection(tabId, status) {

    let demoNum = demoNumber(tabId);
    if (status) {
        $(ARROW_ID_PREFIX + demoNum).addClass('rotate-180');
    }
    else if ($(ARROW_ID_PREFIX + demoNum).hasClass('rotate-180')) {
        $(ARROW_ID_PREFIX + demoNum).removeClass('rotate-180');
    }
    
}


/*
$('#myDiv').animate({
    height: '200px',
    width: '200px'
},
5000);
*/

//When the sidebar icon is clicked, the sidebar is either shown or hidden
function toggleMenu () {
    if ( $(SIDEBAR_ID).hasClass('hidden')) {
        $(SIDEBAR_ID).removeClass('hidden');
        
        moveXAnimation(SIDEBAR_ID, SIDEBAR_DISPLAY_MARGIN);
        
    }
    else {
        setTimeout(() => {
            $(SIDEBAR_ID).addClass('hidden');
        }, ANIMATION_LENGTH);
        
        moveXAnimation(SIDEBAR_ID, SIDEBAR_HIDDEN_MARGIN);
    }
}

function moveXAnimation(elementId, px) {
    $(SIDEBAR_ID).animate({
        'marginLeft': px
      }, ANIMATION_LENGTH);
}

function moveX (elementId, px) {
    $(SIDEBAR_ID).animate({
        'marginLeft': px
      });
}

$(document).ready(() => {

    const sideBarTabs = createArrayOfTabs();

    //Sets up sidebar for initial animation
    moveX(SIDEBAR_ID, SIDEBAR_HIDDEN_MARGIN);

    //When menu icon is clicked, show sidebar
    $(MENU_ICON_ID).click(() => {
        console.log( $(SIDEBAR_ID).hasClass('hidden'));
        toggleMenu();
    })
    
})